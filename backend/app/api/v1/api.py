from fastapi import APIRouter
from app.api.v1.endpoints import missions, ai_mentor

api_router = APIRouter()
api_router.include_router(missions.router, prefix="/missions", tags=["missions"])
api_router.include_router(ai_mentor.router, prefix="/mentor", tags=["ai_mentor"])
