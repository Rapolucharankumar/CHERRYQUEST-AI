from pydantic import BaseModel

class CodeReviewRequest(BaseModel):
    code: str
    mission_id: int
    language: str = "python"

class CodeReviewResponse(BaseModel):
    hint: str
    is_correct: bool = False
