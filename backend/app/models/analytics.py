from sqlalchemy import Column, String, Integer, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.database import Base


class CodeExecutionLog(Base):
    __tablename__ = "code_execution_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    mission_id = Column(Integer, ForeignKey("missions.id"), nullable=True)

    language = Column(String, nullable=False)
    code = Column(String, nullable=False)
    output = Column(String, nullable=True)
    has_error = Column(Boolean, default=False)
    execution_time_ms = Column(Integer, default=0)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    user = relationship("User")


class Certificate(Base):
    __tablename__ = "certificates"

    id = Column(String, primary_key=True, index=True)  # UUID
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    world_id = Column(Integer, ForeignKey("worlds.id"), nullable=False)

    issued_at = Column(DateTime(timezone=True), server_default=func.now())
    pdf_url = Column(String, nullable=True)

    user = relationship("User")
