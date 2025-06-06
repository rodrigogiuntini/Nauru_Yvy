from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.api.deps import get_db, get_current_user
from app.core import security
from app.core.config import settings
from app.models.user import User
from app.schemas.user import (
    Token, UserCreate, User as UserSchema, UserLogin, 
    PasswordResetRequest, PasswordReset
)
from app.services.user import user_service
from app.services.email import send_reset_password_email

router = APIRouter()


@router.post("/login", response_model=Token)
def login(
    user_credentials: UserLogin,
    db: Session = Depends(get_db)
) -> Any:
    """
    Login do usuário e geração de token JWT
    """
    user = user_service.authenticate(
        db, email=user_credentials.email, password=user_credentials.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha incorretos"
        )
    elif not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Usuário inativo"
        )
    
    # Atualizar último login
    user_service.update_last_login(db, user_id=user.id)
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        user.id, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
    }


@router.post("/register", response_model=UserSchema)
def register(
    user_in: UserCreate,
    db: Session = Depends(get_db)
) -> Any:
    """
    Registrar novo usuário
    """
    # Verificar se usuário já existe
    user = user_service.get_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email já cadastrado no sistema"
        )
    
    # Criar usuário
    user = user_service.create(db, obj_in=user_in)
    return user


@router.post("/refresh", response_model=Token)
def refresh_token(
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Renovar token de acesso
    """
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        current_user.id, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
    }


@router.post("/password-reset-request")
def request_password_reset(
    reset_request: PasswordResetRequest,
    db: Session = Depends(get_db)
) -> Any:
    """
    Solicitar reset de senha por email
    """
    user = user_service.get_by_email(db, email=reset_request.email)
    if not user:
        # Por segurança, não informamos se o email existe ou não
        return {"message": "Se o email existir, você receberá instruções para reset"}
    
    # Gerar token de reset
    reset_token = security.create_reset_password_token(user.email)
    
    # Enviar email (implementação futura)
    send_reset_password_email(
        email_to=user.email,
        username=user.name,
        token=reset_token
    )
    
    return {"message": "Se o email existir, você receberá instruções para reset"}


@router.post("/password-reset")
def reset_password(
    reset_data: PasswordReset,
    db: Session = Depends(get_db)
) -> Any:
    """
    Reset de senha com token
    """
    email = security.verify_reset_password_token(reset_data.token)
    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Token inválido ou expirado"
        )
    
    user = user_service.get_by_email(db, email=email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não encontrado"
        )
    
    # Atualizar senha
    user_service.update_password(db, user=user, new_password=reset_data.new_password)
    
    return {"message": "Senha atualizada com sucesso"}


@router.post("/verify-token")
def verify_token(
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Verificar se token é válido
    """
    return {
        "valid": True,
        "user_id": current_user.id,
        "email": current_user.email
    } 