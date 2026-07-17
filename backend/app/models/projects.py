from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.db.database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    xp_reward = Column(Integer, default=500)
    coin_reward = Column(Integer, default=100)

    checkpoints = relationship("ProjectCheckpoint", back_populates="project", cascade="all, delete-orphan")


class ProjectCheckpoint(Base):
    __tablename__ = "project_checkpoints"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    title = Column(String, nullable=False)
    instructions = Column(Text, nullable=False)
    order_index = Column(Integer, default=0)

    project = relationship("Project", back_populates="checkpoints")


class UserProjectProgress(Base):
    __tablename__ = "user_project_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    current_checkpoint_id = Column(Integer, ForeignKey("project_checkpoints.id"), nullable=True)

    status = Column(String, default="in_progress")  # in_progress, completed
    completed_at = Column(DateTime(timezone=True), nullable=True)

    user = relationship("User")
    project = relationship("Project")
