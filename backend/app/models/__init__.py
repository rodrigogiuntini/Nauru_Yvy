# Importar todos os modelos para que o Alembic possa detectá-los
from .user import User, UserRole
from .soil_analysis import SoilAnalysis, SoilType, AnalysisStatus
from .occurrence import Occurrence, OccurrenceType, SeverityLevel, OccurrenceStatus
from .alert import Alert, AlertType, AlertSeverity, AlertStatus

__all__ = [
    "User", "UserRole",
    "SoilAnalysis", "SoilType", "AnalysisStatus", 
    "Occurrence", "OccurrenceType", "SeverityLevel", "OccurrenceStatus",
    "Alert", "AlertType", "AlertSeverity", "AlertStatus"
] 