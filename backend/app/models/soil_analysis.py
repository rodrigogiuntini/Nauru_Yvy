from sqlalchemy import Column, Integer, String, Float, DateTime, Text, ForeignKey, JSON, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.database import Base
import enum


class SoilType(str, enum.Enum):
    CLAY = "clay"              # Argiloso
    SANDY = "sandy"            # Arenoso  
    LOAMY = "loamy"           # Franco
    SILTY = "silty"           # Siltoso
    PEAT = "peat"             # Turfoso
    CHALKY = "chalky"         # Calcário


class AnalysisStatus(str, enum.Enum):
    PENDING = "pending"        # Pendente
    PROCESSING = "processing"  # Processando
    COMPLETED = "completed"    # Concluído
    FAILED = "failed"         # Falhou


class SoilAnalysis(Base):
    __tablename__ = "soil_analyses"

    id = Column(Integer, primary_key=True, index=True)
    
    # Identificação
    title = Column(String, nullable=False)
    location = Column(String, nullable=False)
    coordinates = Column(JSON, nullable=True)  # {"lat": -23.5, "lng": -46.6}
    sector = Column(String, nullable=True)     # ex: "Sector A"
    
    # Status e metadata
    status = Column(Enum(AnalysisStatus), default=AnalysisStatus.PENDING)
    analysis_date = Column(DateTime(timezone=True), nullable=True)
    
    # Dados do solo
    soil_type = Column(Enum(SoilType), nullable=True)
    ph_level = Column(Float, nullable=True)           # 0-14
    humidity = Column(Float, nullable=True)           # % 0-100
    temperature = Column(Float, nullable=True)        # Celsius
    
    # Nutrientes (mg/kg)
    nitrogen = Column(Float, nullable=True)           # N
    phosphorus = Column(Float, nullable=True)         # P
    potassium = Column(Float, nullable=True)          # K
    calcium = Column(Float, nullable=True)            # Ca
    magnesium = Column(Float, nullable=True)          # Mg
    sulfur = Column(Float, nullable=True)             # S
    
    # Características físicas
    texture = Column(String, nullable=True)           # Fina, Média, Grossa
    water_retention = Column(String, nullable=True)   # Alta, Média, Baixa
    drainage = Column(String, nullable=True)          # Boa, Moderada, Ruim
    organic_matter = Column(Float, nullable=True)     # % 0-100
    
    # Avaliação geral
    fertility_level = Column(String, nullable=True)   # Alta, Moderada, Baixa
    recommendations = Column(Text, nullable=True)
    
    # Observações e notas
    notes = Column(Text, nullable=True)
    images = Column(JSON, nullable=True)              # Array de URLs das imagens
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relacionamentos
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    user = relationship("User", back_populates="soil_analyses") 