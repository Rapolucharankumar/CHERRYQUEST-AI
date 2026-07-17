import sys
import subprocess
import tempfile
import os
import time
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from typing import List

from app.db.database import get_db
from app.models.mission import World, Chapter, Mission
from app.models.gamification import UserProgress, XPLog
from app.models.user import User
from app.schemas.mission import WorldSchema, MissionSchema, RunCodeRequest, SubmitSolutionRequest, SubmitSolutionResponse
from app.api.v1.endpoints.users import get_current_user

router = APIRouter()


@router.get("/worlds", response_model=List[WorldSchema])
async def get_worlds(db: AsyncSession = Depends(get_db)):
    """Fetch all worlds, chapters, missions, and challenges."""
    result = await db.execute(
        select(World).options(
            selectinload(World.chapters).selectinload(Chapter.missions).selectinload(Mission.challenges)
        )
    )
    worlds = result.scalars().all()
    return worlds


@router.get("/{mission_id}", response_model=MissionSchema)
async def get_mission(mission_id: int, db: AsyncSession = Depends(get_db)):
    """Fetch a specific mission."""
    result = await db.execute(
        select(Mission)
        .options(selectinload(Mission.challenges))
        .where(Mission.id == mission_id)
    )
    mission = result.scalars().first()
    if not mission:
        raise HTTPException(status_code=404, detail="Mission not found")
    return mission


def execute_python_code(code: str, timeout: int = 5):
    """Safely execute python code in a temporary file and return output."""
    with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as f:
        f.write(code)
        temp_file = f.name

    try:
        start_time = time.time()
        process = subprocess.run(
            [sys.executable, temp_file],
            capture_output=True,
            text=True,
            timeout=timeout
        )
        exec_time = time.time() - start_time
        return {
            "stdout": process.stdout,
            "stderr": process.stderr,
            "exec_time": exec_time,
            "success": process.returncode == 0
        }
    except subprocess.TimeoutExpired:
        return {
            "stdout": "",
            "stderr": f"Execution timed out after {timeout} seconds",
            "exec_time": timeout,
            "success": False
        }
    finally:
        if os.path.exists(temp_file):
            os.remove(temp_file)


@router.post("/execute")
async def execute_code(request: RunCodeRequest):
    """Execute code and return stdout/stderr."""
    result = execute_python_code(request.code)

    output_str = result["stdout"]
    if result["stderr"]:
        output_str += f"\nError:\n{result['stderr']}"

    return {
        "status": "success" if result["success"] else "error",
        "output": output_str,
        "exec_time": f"{result['exec_time']:.2f}s"
    }


@router.post("/{mission_id}/submit", response_model=SubmitSolutionResponse)
async def submit_solution(
    mission_id: int,
    request: SubmitSolutionRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Submit code, run tests, and award XP if successful."""
    # 1. Fetch mission & challenge
    result = await db.execute(
        select(Mission).options(selectinload(Mission.challenges)).where(Mission.id == mission_id)
    )
    mission = result.scalars().first()
    if not mission or not mission.challenges:
        raise HTTPException(status_code=404, detail="Mission or challenge not found")

    challenge = mission.challenges[0]

    # 2. Execute code (ignoring test cases for MVP simplicity, just running it to see if it works and matches expected output)
    exec_result = execute_python_code(request.code)

    passed_tests = False
    error_message = ""

    if not exec_result["success"]:
        error_message = f"Execution failed:\n{exec_result['stderr']}"
    else:
        # Check against test cases
        if challenge.test_cases:
            all_passed = True
            for test in challenge.test_cases:
                # Basic exact match on stdout for now
                if exec_result["stdout"].strip() != test.get("expected_output", "").strip():
                    all_passed = False
                    error_message = f"Test failed. Expected output:\n{test.get('expected_output')}\nBut got:\n{exec_result['stdout']}"
                    break
            passed_tests = all_passed
        else:
            # If no test cases, just passing execution is enough for now
            passed_tests = True

    if not passed_tests:
        return SubmitSolutionResponse(
            status="error",
            message="Your spell failed. Check your logic and syntax.",
            passed_tests=False,
            output=error_message or exec_result["stdout"],
            xp_earned=0,
            coins_earned=0
        )

    # 3. Handle success - Update User Progress
    progress_result = await db.execute(
        select(UserProgress).where(
            UserProgress.user_id == current_user.id,
            UserProgress.mission_id == mission_id
        )
    )
    progress = progress_result.scalars().first()

    # Check if already completed
    already_completed = progress and progress.status == "completed"

    xp_earned = 0
    coins_earned = 0
    level_up = False
    next_mission_id = mission_id + 1

    if not already_completed:
        if progress:
            progress.status = "completed"
        else:
            progress = UserProgress(user_id=current_user.id, mission_id=mission_id, status="completed")
            db.add(progress)

        # Unlock next mission if it exists
        next_mission_result = await db.execute(select(Mission).where(Mission.id == next_mission_id))
        if next_mission_result.scalars().first():
            next_progress_result = await db.execute(
                select(UserProgress).where(
                    UserProgress.user_id == current_user.id,
                    UserProgress.mission_id == next_mission_id
                )
            )
            next_progress = next_progress_result.scalars().first()
            if not next_progress:
                db.add(UserProgress(user_id=current_user.id, mission_id=next_mission_id, status="available"))

        # Add XP and Coins
        xp_earned = mission.xp_reward
        coins_earned = mission.coin_reward

        current_user.profile.xp += xp_earned
        current_user.profile.coins += coins_earned

        # Simple level up logic: 500 XP per level
        new_level = (current_user.profile.xp // 500) + 1
        if new_level > current_user.profile.level:
            current_user.profile.level = new_level
            level_up = True

        # Log XP
        db.add(XPLog(user_id=current_user.id, amount=xp_earned, source=f"mission_{mission_id}_complete"))

        await db.commit()

    return SubmitSolutionResponse(
        status="success",
        message="Excellent! You have completed the mission.",
        passed_tests=True,
        output=exec_result["stdout"],
        xp_earned=xp_earned,
        coins_earned=coins_earned,
        next_mission_id=next_mission_id,
        level_up=level_up
    )
