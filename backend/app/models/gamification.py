from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.database import Base


class UserProgress(Base):
    __tablename__ = "user_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    mission_id = Column(Integer, ForeignKey("missions.id"), nullable=False)

    status = Column(String, default="locked")  # locked, in_progress, completed
    completed_at = Column(DateTime(timezone=True), nullable=True)

    user = relationship("User", back_populates="progress")
    mission = relationship("Mission", back_populates="progress")


class XPLog(Base):
    __tablename__ = "xp_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)

    amount = Column(Integer, nullable=False)
    source = Column(String, nullable=False)  # e.g., "mission_1_complete", "daily_streak"
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="xp_logs")
