from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.database import Base
import enum


class UserRole(str, enum.Enum):
    ADMIN = "admin"
    COMMUNITY_LEADER = "community_leader" 
    COMMUNITY_MEMBER = "community_member"
    RESEARCHER = "researcher"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    name = Column(String, nullable=False)
    role = Column(Enum(UserRole), default=UserRole.COMMUNITY_MEMBER)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    
    # Informações de perfil
    age = Column(Integer, nullable=True)
    bio = Column(Text, nullable=True)
    avatar_url = Column(String, nullable=True)
    
    # Configurações
    notifications_enabled = Column(Boolean, default=True)
    language = Column(String, default="pt-BR")
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    last_login = Column(DateTime(timezone=True), nullable=True)
    
    # Relacionamentos
    soil_analyses = relationship("SoilAnalysis", back_populates="user")
    occurrences = relationship("Occurrence", back_populates="reported_by")
    alerts = relationship("Alert", back_populates="user") 