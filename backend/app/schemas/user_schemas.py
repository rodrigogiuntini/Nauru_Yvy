from typing import Optional, List
from pydantic import BaseModel, EmailStr, validator, Field
from datetime import datetime
from enum import Enum

class TipoUsuario(str, Enum):
    """Tipos de usuário no sistema Naurú Yvy"""
    ADMINISTRADOR = "administrador"
    LIDER_TERRITORIAL = "lider_territorial"
    MONITOR_AMBIENTAL = "monitor_ambiental"
    MEMBRO_COMUNIDADE = "membro_comunidade"
    PESQUISADOR = "pesquisador"

class StatusUsuario(str, Enum):
    """Status do usuário"""
    ATIVO = "ativo"
    INATIVO = "inativo"
    PENDENTE = "pendente"
    BLOQUEADO = "bloqueado"

# Schemas Base
class UserBase(BaseModel):
    """Schema base para usuário"""
    nome: str = Field(..., min_length=2, max_length=100, description="Nome completo do usuário")
    email: EmailStr = Field(..., description="Email único do usuário")
    tipo_usuario: TipoUsuario = Field(..., description="Tipo/função do usuário")
    territorio_id: Optional[int] = Field(None, description="ID do território associado")
    telefone: Optional[str] = Field(None, max_length=20, description="Telefone de contato")
    nome_social: Optional[str] = Field(None, max_length=100, description="Nome social (se houver)")
    nome_indigena: Optional[str] = Field(None, max_length=100, description="Nome indígena (se houver)")
    idade: Optional[int] = Field(None, ge=0, le=150, description="Idade do usuário")
    principal_atuacao: Optional[str] = Field(None, max_length=200, description="Principal atuação/função na aldeia")
    aldeia_comunidade: Optional[str] = Field(None, max_length=200, description="Nome da aldeia/comunidade indígena")
    localizacao_territorio: Optional[str] = Field(None, max_length=200, description="Localização/território")
    aceite_lgpd: bool = Field(True, description="Aceite das políticas de privacidade LGPD")
    
    @validator('nome')
    def validate_nome(cls, v):
        if not v.strip():
            raise ValueError('Nome não pode estar vazio')
        return v.strip().title()
    
    @validator('telefone')
    def validate_telefone(cls, v):
        if v and not v.replace('(', '').replace(')', '').replace('-', '').replace(' ', '').isdigit():
            raise ValueError('Formato de telefone inválido')
        return v

class UserCreate(UserBase):
    """Schema para criação de usuário"""
    senha: str = Field(..., min_length=8, max_length=128, description="Senha do usuário")
    confirmar_senha: str = Field(..., description="Confirmação da senha")
    
    @validator('senha')
    def validate_senha(cls, v):
        if len(v) < 8:
            raise ValueError('Senha deve ter pelo menos 8 caracteres')
        if not any(c.isdigit() for c in v):
            raise ValueError('Senha deve conter pelo menos um número')
        if not any(c.isalpha() for c in v):
            raise ValueError('Senha deve conter pelo menos uma letra')
        return v
    
    @validator('confirmar_senha')
    def validate_confirmar_senha(cls, v, values):
        if 'senha' in values and v != values['senha']:
            raise ValueError('Senhas não conferem')
        return v

class UserUpdate(BaseModel):
    """Schema para atualização de usuário"""
    nome: Optional[str] = Field(None, min_length=2, max_length=100)
    email: Optional[EmailStr] = None
    tipo_usuario: Optional[TipoUsuario] = None
    territorio_id: Optional[int] = None
    telefone: Optional[str] = Field(None, max_length=20)
    status: Optional[StatusUsuario] = None

class UserProfileUpdate(BaseModel):
    """Schema para atualização de perfil do usuário"""
    nome_social: Optional[str] = Field(None, max_length=100)
    nome_indigena: Optional[str] = Field(None, max_length=100) 
    idade: Optional[int] = Field(None, ge=0, le=150)
    principal_atuacao: Optional[str] = Field(None, max_length=200)
    aldeia_comunidade: Optional[str] = Field(None, max_length=200)
    localizacao_territorio: Optional[str] = Field(None, max_length=200)

class UserChangePassword(BaseModel):
    """Schema para alteração de senha"""
    senha_atual: str = Field(..., description="Senha atual")
    nova_senha: str = Field(..., min_length=8, description="Nova senha")
    confirmar_nova_senha: str = Field(..., description="Confirmação da nova senha")
    
    @validator('nova_senha')
    def validate_nova_senha(cls, v):
        if len(v) < 8:
            raise ValueError('Nova senha deve ter pelo menos 8 caracteres')
        if not any(c.isdigit() for c in v):
            raise ValueError('Nova senha deve conter pelo menos um número')
        if not any(c.isalpha() for c in v):
            raise ValueError('Nova senha deve conter pelo menos uma letra')
        return v
    
    @validator('confirmar_nova_senha')
    def validate_confirmar_nova_senha(cls, v, values):
        if 'nova_senha' in values and v != values['nova_senha']:
            raise ValueError('Senhas não conferem')
        return v

class UserResponse(BaseModel):
    """Schema de resposta do usuário (sem dados sensíveis)"""
    id: int
    nome: str
    email: str
    tipo_usuario: TipoUsuario
    territorio_id: Optional[int] = None
    telefone: Optional[str] = None
    nome_social: Optional[str] = None
    nome_indigena: Optional[str] = None
    idade: Optional[int] = None
    principal_atuacao: Optional[str] = None
    aldeia_comunidade: Optional[str] = None
    localizacao_territorio: Optional[str] = None
    aceite_lgpd: bool = True
    status: StatusUsuario
    data_criacao: datetime
    ultima_atualizacao: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    """Schema para login"""
    email: EmailStr = Field(..., description="Email do usuário")
    senha: str = Field(..., description="Senha do usuário")

class Token(BaseModel):
    """Schema para token de acesso"""
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    user_info: UserResponse

class TokenData(BaseModel):
    """Schema para dados do token"""
    user_id: Optional[int] = None
    email: Optional[str] = None

# Schemas para territórios
class TerritorioBase(BaseModel):
    """Schema base para território"""
    nome: str = Field(..., min_length=2, max_length=200)
    estado: str = Field(..., min_length=2, max_length=50)
    municipio: str = Field(..., min_length=2, max_length=100)
    area_hectares: Optional[float] = Field(None, ge=0)
    populacao: Optional[int] = Field(None, ge=0)
    coordenadas_lat: Optional[float] = Field(None, ge=-90, le=90)
    coordenadas_lng: Optional[float] = Field(None, ge=-180, le=180)

class TerritorioCreate(TerritorioBase):
    """Schema para criação de território"""
    pass

class TerritorioResponse(TerritorioBase):
    """Schema de resposta do território"""
    id: int
    data_criacao: datetime
    
    class Config:
        from_attributes = True

# Schemas para API responses
class ApiResponse(BaseModel):
    """Schema padrão para respostas da API"""
    success: bool
    message: str
    data: Optional[dict] = None
    errors: Optional[List[str]] = None

class PaginatedResponse(BaseModel):
    """Schema para respostas paginadas"""
    items: List[dict]
    total: int
    page: int
    per_page: int
    total_pages: int 