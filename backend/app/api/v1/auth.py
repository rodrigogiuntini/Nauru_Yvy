import logging
from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Dict, Any

from ...schemas.user_schemas import UserCreate, UserLogin, Token, ApiResponse, UserProfileUpdate
from ...services.auth_service import auth_service
from ...core.oracle_config import test_oracle_connection

# Configuração de logging
logger = logging.getLogger(__name__)

# Router para autenticação
router = APIRouter(prefix="/auth", tags=["Autenticação"])

# Security scheme
security = HTTPBearer()

@router.get("/health", response_model=Dict[str, Any])
async def health_check():
    """Verificar saúde da conexão Oracle"""
    try:
        oracle_status = test_oracle_connection()
        
        return {
            "status": "healthy",
            "service": "Naurú Yvy Authentication Service",
            "version": "1.0.0",
            "oracle_connection": oracle_status,
            "endpoints": [
                "/auth/register - Registro de usuários",
                "/auth/login - Login de usuários", 
                "/auth/me - Informações do usuário logado",
                "/auth/health - Status do serviço"
            ]
        }
        
    except Exception as e:
        logger.error(f"❌ Health check falhou: {e}")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Serviço indisponível"
        )

@router.post("/register", response_model=Token)
async def register_user(user_data: UserCreate):
    """
    Registrar novo usuário no sistema Naurú Yvy
    
    **Tipos de usuário disponíveis:**
    - `administrador`: Acesso total ao sistema
    - `lider_territorial`: Gerencia território específico  
    - `monitor_ambiental`: Coleta e análise de dados ambientais
    - `membro_comunidade`: Acesso básico para membros da comunidade
    - `pesquisador`: Acesso para pesquisa e análise de dados
    
    **Validações aplicadas:**
    - Email único no sistema
    - Senha com pelo menos 8 caracteres, 1 número e 1 letra
    - Nome com pelo menos 2 caracteres
    - Telefone em formato válido (opcional)
    """
    try:
        logger.info(f"🔐 Tentativa de registro: {user_data.email} - Tipo: {user_data.tipo_usuario}")
        
        # Registrar usuário
        result = auth_service.register_user(user_data)
        
        logger.info(f"✅ Registro bem-sucedido: {user_data.email}")
        
        return Token(**result)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Erro no endpoint de registro: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erro interno no registro"
        )

@router.post("/login", response_model=Token)
async def login_user(login_data: UserLogin):
    """
    Autenticar usuário no sistema
    
    **Processo de autenticação:**
    1. Verificação do email no banco Oracle
    2. Validação da senha com hash bcrypt
    3. Verificação do status do usuário (deve estar 'ativo')
    4. Geração de token JWT com validade de 8 horas
    5. Log de auditoria da sessão
    
    **Retorna:**
    - Token de acesso JWT
    - Informações básicas do usuário
    - Tempo de expiração do token
    """
    try:
        logger.info(f"🔐 Tentativa de login: {login_data.email}")
        
        # Autenticar usuário
        result = auth_service.authenticate_user(login_data)
        
        logger.info(f"✅ Login bem-sucedido: {login_data.email}")
        
        return Token(**result)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Erro no endpoint de login: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erro interno na autenticação"
        )

@router.get("/me")
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Obter informações do usuário logado
    
    **Requer:** Token JWT válido no header Authorization
    
    **Retorna:** Informações completas do usuário (sem dados sensíveis)
    """
    try:
        # Extrair token
        token = credentials.credentials
        
        # Verificar token
        payload = auth_service.verify_token(token)
        if not payload:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token inválido ou expirado",
                headers={"WWW-Authenticate": "Bearer"}
            )
        
        # Buscar usuário
        user_email = payload.get("email")
        if not user_email:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token malformado",
                headers={"WWW-Authenticate": "Bearer"}
            )
        
        user = auth_service.get_user_by_email(user_email)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Usuário não encontrado",
                headers={"WWW-Authenticate": "Bearer"}
            )
        
        # Remover dados sensíveis
        user_info = {
            "id": user["id"],
            "nome": user["nome"],
            "email": user["email"],
            "tipo_usuario": user["tipo_usuario"],
            "territorio_id": user["territorio_id"],
            "territorio_nome": user.get("territorio_nome"),
            "telefone": user["telefone"],
            "status": user["status"],
            "data_criacao": user["data_criacao"]
        }
        
        return {
            "success": True,
            "message": "Usuário encontrado",
            "data": user_info
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Erro ao obter usuário atual: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erro interno"
        )

@router.post("/logout")
async def logout_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Fazer logout do usuário
    
    **Nota:** Como usamos JWT stateless, o logout é principalmente 
    do lado cliente (remover token). Este endpoint serve para logs de auditoria.
    """
    try:
        # Extrair token
        token = credentials.credentials
        
        # Verificar token
        payload = auth_service.verify_token(token)
        if not payload:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token inválido",
                headers={"WWW-Authenticate": "Bearer"}
            )
        
        user_email = payload.get("email")
        logger.info(f"🔓 Logout realizado: {user_email}")
        
        return {
            "success": True,
            "message": "Logout realizado com sucesso"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Erro no logout: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erro interno"
        )

@router.get("/tipos-usuario")
async def get_user_types():
    """
    Listar tipos de usuário disponíveis no sistema
    
    **Retorna:** Lista com todos os tipos de usuário e suas descrições
    """
    return {
        "success": True,
        "message": "Tipos de usuário disponíveis",
        "data": {
            "tipos": [
                {
                    "value": "administrador",
                    "label": "Administrador",
                    "description": "Acesso total ao sistema e gerenciamento de usuários"
                },
                {
                    "value": "lider_territorial", 
                    "label": "Líder Territorial",
                    "description": "Gerencia território específico e suas atividades"
                },
                {
                    "value": "monitor_ambiental",
                    "label": "Monitor Ambiental", 
                    "description": "Coleta e análise de dados ambientais"
                },
                {
                    "value": "membro_comunidade",
                    "label": "Membro da Comunidade",
                    "description": "Acesso básico para membros da comunidade"
                },
                {
                    "value": "pesquisador",
                    "label": "Pesquisador",
                    "description": "Acesso para pesquisa e análise de dados"
                }
            ]
        }
    }

@router.put("/update-profile", response_model=ApiResponse)
async def update_user_profile(
    profile_data: UserProfileUpdate,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """
    Atualizar perfil do usuário autenticado
    
    **Campos atualizáveis:**
    - `nome_social`: Nome social (opcional)
    - `nome_indigena`: Nome indígena (opcional)
    - `idade`: Idade (0-150 anos)
    - `principal_atuacao`: Principal atuação/função na aldeia
    - `aldeia_comunidade`: Nome da aldeia/comunidade indígena
    - `localizacao_territorio`: Localização/território
    """
    try:
        # Verificar token
        token = credentials.credentials
        user_data = auth_service.verify_access_token(token)
        
        logger.info(f"👤 Atualizando perfil do usuário {user_data['id']}")
        
        # Atualizar perfil
        result = auth_service.update_user_profile(user_data['id'], profile_data)
        
        logger.info(f"✅ Perfil atualizado com sucesso: {user_data['id']}")
        
        return ApiResponse(
            success=True,
            message="Perfil atualizado com sucesso",
            data=result
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Erro no endpoint de atualização de perfil: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erro interno ao atualizar perfil"
        ) 