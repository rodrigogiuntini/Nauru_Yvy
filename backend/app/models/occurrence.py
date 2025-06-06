from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, JSON, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.database import Base
import enum


class OccurrenceType(str, enum.Enum):
    DEFORESTATION = "deforestation"    # Desmatamento
    ILLEGAL_MINING = "illegal_mining"  # Mineração Ilegal
    POACHING = "poaching"              # Caça Ilegal
    POLLUTION = "pollution"            # Poluição
    FIRE = "fire"                      # Incêndio
    EROSION = "erosion"                # Erosão
    CONTAMINATION = "contamination"    # Contaminação


class SeverityLevel(str, enum.Enum):
    LOW = "low"        # Baixa
    MEDIUM = "medium"  # Média
    HIGH = "high"      # Alta
    CRITICAL = "critical"  # Crítica


class OccurrenceStatus(str, enum.Enum):
    REPORTED = "reported"      # Reportado
    INVESTIGATING = "investigating"  # Investigando
    CONFIRMED = "confirmed"    # Confirmado
    RESOLVED = "resolved"      # Resolvido
    DISMISSED = "dismissed"    # Descartado


class Occurrence(Base):
    __tablename__ = "occurrences"

    id = Column(Integer, primary_key=True, index=True)
    
    # Identificação
    title = Column(String, nullable=False)
    occurrence_type = Column(Enum(OccurrenceType), nullable=False)
    severity = Column(Enum(SeverityLevel), nullable=False)
    status = Column(Enum(OccurrenceStatus), default=OccurrenceStatus.REPORTED)
    
    # Localização
    location = Column(String, nullable=False)
    coordinates = Column(JSON, nullable=True)  # {"lat": -23.5, "lng": -46.6}
    
    # Descrição
    description = Column(Text, nullable=False)
    additional_notes = Column(Text, nullable=True)
    
    # Evidências
    images = Column(JSON, nullable=True)       # Array de URLs das imagens
    evidence_files = Column(JSON, nullable=True)  # Array de URLs de arquivos
    
    # Data da ocorrência
    occurred_at = Column(DateTime(timezone=True), nullable=True)
    
    # Seguimento
    investigation_notes = Column(Text, nullable=True)
    resolution_notes = Column(Text, nullable=True)
    resolved_at = Column(DateTime(timezone=True), nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relacionamentos
    reported_by_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    reported_by = relationship("User", back_populates="occurrences") 