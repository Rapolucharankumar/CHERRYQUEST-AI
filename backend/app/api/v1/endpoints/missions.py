from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from typing import List

from app.db.database import get_db
from app.models.mission import World, Chapter, Mission
from app.schemas.mission import WorldSchema, MissionSchema, RunCodeRequest

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

@router.post("/execute")
async def execute_code(request: RunCodeRequest):
    """
    Mock implementation of Code Execution for MVP.
    In a real app, this would send `request.code` to Judge0 or Piston API.
    """
    import asyncio
    await asyncio.sleep(1) # Simulate network delay
    
    # Mock validation for Mission 1
    if "print" in request.code and "CherryQuest" in request.code:
        return {
            "status": "success",
            "output": "CherryQuest\n\nProcess finished with exit code 0.",
            "passed_tests": True,
            "message": "Excellent! You have stored the magical energy correctly."
        }
    
    return {
        "status": "error",
        "output": "SyntaxError: Missing print statement or wrong variable.",
        "passed_tests": False,
        "message": "Your spell failed. Check your syntax."
    }
