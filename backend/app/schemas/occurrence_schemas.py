from pydantic import BaseModel, Field, validator
from typing import Optional, Dict, Any, List
from datetime import datetime
from enum import Enum

class TipoOcorrencia(str, Enum):
    """Tipos de ocorrência ambiental"""
    DESMATAMENTO = "desmatamento"
    QUEIMADA = "queimada" 
    CACA_PESCA = "caca_pesca"
    ENCHENTE = "enchente"
    POLUICAO = "poluicao"
    MINERACAO_ILEGAL = "mineracao_ilegal"

class GrauSeveridade(str, Enum):
    """Grau de severidade da ocorrência"""
    BAIXA = "baixa"
    MEDIA = "media"
    ALTA = "alta"
    CRITICA = "critica"

class StatusOcorrencia(str, Enum):
    """Status da ocorrência"""
    REPORTADA = "reportada"
    INVESTIGANDO = "investigando"
    CONFIRMADA = "confirmada"
    RESOLVIDA = "resolvida"
    DESCARTADA = "descartada"

class OccurrenceBase(BaseModel):
    """Schema base para ocorrências"""
    tipo_ocorrencia: TipoOcorrencia = Field(..., description="Tipo da ocorrência ambiental")
    localizacao: str = Field(..., min_length=5, max_length=200, description="Localização da ocorrência")
    grau_severidade: GrauSeveridade = Field(..., description="Grau de severidade")
    descricao: str = Field(..., min_length=10, max_length=1000, description="Descrição detalhada")
    coordenadas: Optional[Dict[str, float]] = Field(None, description="Coordenadas GPS (lat, lng)")
    imagens: Optional[List[str]] = Field(default_factory=list, description="URLs das imagens")

    @validator('coordenadas')
    def validate_coordenadas(cls, v):
        if v is not None:
            if not isinstance(v, dict):
                raise ValueError('Coordenadas devem ser um objeto')
            if 'lat' not in v or 'lng' not in v:
                raise ValueError('Coordenadas devem conter lat e lng')
            if not (-90 <= v['lat'] <= 90):
                raise ValueError('Latitude deve estar entre -90 e 90')
            if not (-180 <= v['lng'] <= 180):
                raise ValueError('Longitude deve estar entre -180 e 180')
        return v

class OccurrenceCreate(OccurrenceBase):
    """Schema para criação de ocorrência"""
    pass

class OccurrenceResponse(OccurrenceBase):
    """Schema de resposta para ocorrência"""
    id: int
    usuario_id: int
    status: StatusOcorrencia
    data_criacao: datetime
    data_atualizacao: Optional[datetime]
    
    class Config:
        from_attributes = True

class OccurrenceUpdate(BaseModel):
    """Schema para atualização de ocorrência"""
    status: Optional[StatusOcorrencia] = None
    notas_investigacao: Optional[str] = Field(None, max_length=1000)
    notas_resolucao: Optional[str] = Field(None, max_length=1000)

class ApiResponse(BaseModel):
    """Resposta padrão da API"""
    success: bool = True
    message: str
    data: Optional[Any] = None 