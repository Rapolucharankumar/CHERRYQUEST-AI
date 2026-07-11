from app.db.database import Base
from app.models.user import User, Profile
from app.models.mission import World, Chapter, Mission, CodingChallenge
from app.models.gamification import UserProgress, XPLog
from app.models.projects import Project, ProjectCheckpoint, UserProjectProgress
from app.models.analytics import CodeExecutionLog, Certificate

# This file exposes all SQLAlchemy models so that Alembic's env.py can discover them.
