
# This file exposes all SQLAlchemy models so that Alembic's env.py can discover them.
from app.db.database import Base
from app.models.user import User
from app.models.mission import Mission
from app.models.projects import Project
from app.models.gamification import UserProgress, XPLog
from app.models.analytics import CodeExecutionLog, Certificate
