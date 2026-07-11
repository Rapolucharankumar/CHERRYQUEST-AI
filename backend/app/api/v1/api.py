from fastapi import APIRouter
from app.api.v1.endpoints import missions

api_router = APIRouter()
api_router.include_router(missions.router, prefix="/missions", tags=["missions"])
