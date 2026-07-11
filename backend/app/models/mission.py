from sqlalchemy import Column, String, Integer, Boolean, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from app.db.database import Base

class World(Base):
    __tablename__ = "worlds"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    order_index = Column(Integer, default=0)
    
    chapters = relationship("Chapter", back_populates="world", cascade="all, delete-orphan")

class Chapter(Base):
    __tablename__ = "chapters"
    
    id = Column(Integer, primary_key=True, index=True)
    world_id = Column(Integer, ForeignKey("worlds.id"), nullable=False)
    title = Column(String, nullable=False)
    order_index = Column(Integer, default=0)
    
    world = relationship("World", back_populates="chapters")
    missions = relationship("Mission", back_populates="chapter", cascade="all, delete-orphan")

class Mission(Base):
    __tablename__ = "missions"
    
    id = Column(Integer, primary_key=True, index=True)
    chapter_id = Column(Integer, ForeignKey("chapters.id"), nullable=False)
    
    title = Column(String, nullable=False)
    story_intro = Column(Text, nullable=True)
    learning_objective = Column(Text, nullable=True)
    explanation = Column(Text, nullable=True)
    
    # Gamification
    xp_reward = Column(Integer, default=100)
    coin_reward = Column(Integer, default=10)
    is_boss = Column(Boolean, default=False)
    order_index = Column(Integer, default=0)
    
    chapter = relationship("Chapter", back_populates="missions")
    challenges = relationship("CodingChallenge", back_populates="mission", cascade="all, delete-orphan")
    progress = relationship("UserProgress", back_populates="mission", cascade="all, delete-orphan")

class CodingChallenge(Base):
    __tablename__ = "coding_challenges"
    
    id = Column(Integer, primary_key=True, index=True)
    mission_id = Column(Integer, ForeignKey("missions.id"), nullable=False)
    
    language = Column(String, default="python")
    starter_code = Column(Text, nullable=True)
    solution_code = Column(Text, nullable=True)
    
    # Store test cases as JSON: [{"input": "...", "expected_output": "..."}]
    test_cases = Column(JSON, nullable=True) 
    
    mission = relationship("Mission", back_populates="challenges")
