from app.db.database import Base
from app.models.user import User, Profile
from app.models.mission import World, Chapter, Mission, CodingChallenge
from app.models.gamification import UserProgress, XPLog

# This file exposes all SQLAlchemy models so that Alembic's env.py can discover them.
