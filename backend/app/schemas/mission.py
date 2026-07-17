from pydantic import BaseModel
from typing import List, Optional


class CodingChallengeSchema(BaseModel):
    id: int
    language: str
    starter_code: str

    class Config:
        orm_mode = True


class MissionSchema(BaseModel):
    id: int
    title: str
    story_intro: str
    learning_objective: str
    explanation: str
    xp_reward: int
    coin_reward: int
    is_boss: bool
    challenges: List[CodingChallengeSchema]

    class Config:
        orm_mode = True


class ChapterSchema(BaseModel):
    id: int
    title: str
    missions: List[MissionSchema]

    class Config:
        orm_mode = True


class WorldSchema(BaseModel):
    id: int
    title: str
    description: str
    chapters: List[ChapterSchema]

    class Config:
        orm_mode = True


class RunCodeRequest(BaseModel):
    code: str
    language: str = "python"


class SubmitSolutionRequest(BaseModel):
    code: str
    language: str = "python"


class SubmitSolutionResponse(BaseModel):
    status: str
    message: str
    passed_tests: bool
    output: Optional[str] = None
    xp_earned: Optional[int] = 0
    coins_earned: Optional[int] = 0
    next_mission_id: Optional[int] = None
    level_up: Optional[bool] = False
