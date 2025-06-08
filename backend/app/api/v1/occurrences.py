import logging
from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import List, Dict, Any

from ...schemas.occurrence_schemas import (
    OccurrenceCreate, 
    OccurrenceResponse, 
    ApiResponse
)
from ...services.occurrence_service import occurrence_service
from ...services.auth_service import auth_service

# Configuração de logging
logger = logging.getLogger(__name__)

# Router para ocorrências
router = APIRouter(prefix="/occurrences", tags=["Ocorrências"])

# Security scheme
security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Dependência para autenticação JWT"""
    try:
        token = credentials.credentials
        user_data = auth_service.verify_access_token(token)
        return user_data
    except Exception as e:
        logger.error(f"❌ Erro na autenticação: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido ou expirado",
            headers={"WWW-Authenticate": "Bearer"}
        )

@router.post("/", response_model=ApiResponse)
async def create_occurrence(
    occurrence_data: OccurrenceCreate,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Criar nova ocorrência ambiental
    
    **Tipos de ocorrência suportados:**
    - `desmatamento`: Desmatamento ilegal
    - `queimada`: Incêndios e queimadas
    - `caca_pesca`: Caça ou pesca ilegal
    - `enchente`: Enchentes e inundações
    - `poluicao`: Poluição ambiental
    - `mineracao_ilegal`: Atividades de mineração ilegal
    
    **Graus de severidade:**
    - `baixa`: Impacto mínimo
    - `media`: Impacto moderado
    - `alta`: Impacto significativo
    - `critica`: Impacto severo, requer ação imediata
    """
    try:
        logger.info(f"🚨 Nova ocorrência sendo criada por usuário {current_user['id']}: {occurrence_data.tipo_ocorrencia}")
        
        # Criar ocorrência
        result = occurrence_service.create_occurrence(occurrence_data, current_user['id'])
        
        logger.info(f"✅ Ocorrência criada com sucesso: ID {result['data']['id']}")
        
        return ApiResponse(
            success=True,
            message=result['message'],
            data=result['data']
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Erro no endpoint de criação de ocorrência: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erro interno ao criar ocorrência"
        )

@router.get("/", response_model=ApiResponse)
async def get_user_occurrences(
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Buscar todas as ocorrências do usuário autenticado
    """
    try:
        logger.info(f"📋 Buscando ocorrências do usuário {current_user['id']}")
        
        occurrences = occurrence_service.get_user_occurrences(current_user['id'])
        
        return ApiResponse(
            success=True,
            message=f"Encontradas {len(occurrences)} ocorrências",
            data=occurrences
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Erro ao buscar ocorrências do usuário: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erro interno ao buscar ocorrências"
        )

@router.get("/all", response_model=ApiResponse)
async def get_all_occurrences(
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Buscar todas as ocorrências do sistema (apenas administradores)
    """
    try:
        # Verificar se usuário é administrador
        if current_user.get('tipo_usuario') != 'administrador':
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Acesso negado. Apenas administradores podem ver todas as ocorrências"
            )
        
        logger.info(f"📋 Administrador {current_user['id']} buscando todas as ocorrências")
        
        occurrences = occurrence_service.get_all_occurrences()
        
        return ApiResponse(
            success=True,
            message=f"Encontradas {len(occurrences)} ocorrências no sistema",
            data=occurrences
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Erro ao buscar todas as ocorrências: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erro interno ao buscar ocorrências"
        )

@router.get("/stats", response_model=ApiResponse)
async def get_occurrence_stats(
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Obter estatísticas de ocorrências do usuário
    """
    try:
        logger.info(f"📊 Buscando estatísticas de ocorrências para usuário {current_user['id']}")
        
        occurrences = occurrence_service.get_user_occurrences(current_user['id'])
        
        # Calcular estatísticas
        stats = {
            "total": len(occurrences),
            "por_tipo": {},
            "por_severidade": {},
            "por_status": {}
        }
        
        for occ in occurrences:
            # Por tipo
            tipo = occ['tipo_ocorrencia']
            stats['por_tipo'][tipo] = stats['por_tipo'].get(tipo, 0) + 1
            
            # Por severidade
            severidade = occ['grau_severidade']
            stats['por_severidade'][severidade] = stats['por_severidade'].get(severidade, 0) + 1
            
            # Por status
            status_occ = occ['status']
            stats['por_status'][status_occ] = stats['por_status'].get(status_occ, 0) + 1
        
        return ApiResponse(
            success=True,
            message="Estatísticas calculadas com sucesso",
            data=stats
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Erro ao calcular estatísticas: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erro interno ao calcular estatísticas"
        ) 