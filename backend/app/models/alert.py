from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, JSON, Enum, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.database import Base
import enum


class AlertType(str, enum.Enum):
    SOIL_CONTAMINATION = "soil_contamination"      # Contaminação do Solo
    WATER_POLLUTION = "water_pollution"            # Poluição da Água
    AIR_QUALITY = "air_quality"                    # Qualidade do Ar
    DEFORESTATION = "deforestation"                # Desmatamento
    ILLEGAL_LOGGING = "illegal_logging"            # Corte Ilegal
    ILLEGAL_MINING = "illegal_mining"              # Mineração Ilegal
    POACHING = "poaching"                          # Caça Ilegal
    FIRE_RISK = "fire_risk"                        # Risco de Incêndio
    FLOOD_RISK = "flood_risk"                      # Risco de Enchente
    DROUGHT = "drought"                            # Seca
    PEST_OUTBREAK = "pest_outbreak"                # Surto de Pragas
    DISEASE_OUTBREAK = "disease_outbreak"          # Surto de Doenças


class AlertSeverity(str, enum.Enum):
    LOW = "low"        # Baixa
    MEDIUM = "medium"  # Moderada
    HIGH = "high"      # Alta
    CRITICAL = "critical"  # Crítica


class AlertStatus(str, enum.Enum):
    ACTIVE = "active"        # Ativo
    ACKNOWLEDGED = "acknowledged"  # Reconhecido
    RESOLVED = "resolved"    # Resolvido
    DISMISSED = "dismissed"  # Descartado


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    
    # Identificação
    title = Column(String, nullable=False)
    alert_type = Column(Enum(AlertType), nullable=False)
    severity = Column(Enum(AlertSeverity), nullable=False)
    status = Column(Enum(AlertStatus), default=AlertStatus.ACTIVE)
    
    # Localização
    location = Column(String, nullable=True)
    coordinates = Column(JSON, nullable=True)  # {"lat": -23.5, "lng": -46.6}
    affected_area = Column(String, nullable=True)  # ex: "Setor A-C"
    
    # Descrição
    description = Column(Text, nullable=False)
    details = Column(Text, nullable=True)
    
    # Dados do alerta
    source = Column(String, nullable=True)     # Sistema, Usuário, Sensor, etc.
    confidence_level = Column(Integer, nullable=True)  # 0-100%
    
    # Ações recomendadas
    recommended_actions = Column(Text, nullable=True)
    emergency_contact = Column(String, nullable=True)
    
    # Timing
    triggered_at = Column(DateTime(timezone=True), server_default=func.now())
    expires_at = Column(DateTime(timezone=True), nullable=True)
    acknowledged_at = Column(DateTime(timezone=True), nullable=True)
    resolved_at = Column(DateTime(timezone=True), nullable=True)
    
    # Notificações
    notifications_sent = Column(Boolean, default=False)
    notification_channels = Column(JSON, nullable=True)  # ["email", "sms", "push"]
    
    # Evidências e dados relacionados
    images = Column(JSON, nullable=True)       # Array de URLs das imagens
    data_sources = Column(JSON, nullable=True)  # Fontes de dados que geraram o alerta
    related_occurrence_id = Column(Integer, ForeignKey("occurrences.id"), nullable=True)
    related_analysis_id = Column(Integer, ForeignKey("soil_analyses.id"), nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relacionamentos
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)  # Usuário que receberá o alerta
    user = relationship("User", back_populates="alerts") 