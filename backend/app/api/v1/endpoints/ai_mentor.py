from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.db.database import get_db
from app.models.mission import Mission
from app.schemas.ai_mentor import CodeReviewRequest, CodeReviewResponse
from app.services.ai_mentor import analyze_code

router = APIRouter()


@router.post("/review", response_model=CodeReviewResponse)
async def review_code(request: CodeReviewRequest, db: AsyncSession = Depends(get_db)):
    """Ask the AI Mentor to review the user's code for a specific mission."""

    # Fetch mission details for context
    result = await db.execute(select(Mission).where(Mission.id == request.mission_id))
    mission = result.scalars().first()

    if not mission:
        raise HTTPException(status_code=404, detail="Mission not found")

    mission_context = f"Mission Title: {mission.title}\nObjective: {mission.learning_objective}\nExplanation: {mission.explanation}"

    hint = await analyze_code(request.code, mission_context)

    return CodeReviewResponse(
        hint=hint,
        is_correct=False  # We still rely on the actual code execution for real correctness
    )
