from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class ProfileSchema(BaseModel):
    level: int
    xp: int
    coins: int
    rank_title: str
    daily_streak: int
    avatar_url: Optional[str] = None
    bio: Optional[str] = None

    class Config:
        orm_mode = True


class UserProgressSchema(BaseModel):
    mission_id: int
    status: str
    completed_at: Optional[datetime] = None

    class Config:
        orm_mode = True


class UserSchema(BaseModel):
    id: str
    email: str
    username: Optional[str] = None
    profile: Optional[ProfileSchema] = None
    progress: List[UserProgressSchema] = []

    class Config:
        orm_mode = True
