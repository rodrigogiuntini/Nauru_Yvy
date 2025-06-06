from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import get_current_user, get_db
from app.models.user import User
from app.schemas.user import UserUpdate, UserResponse
from sqlalchemy import select

router = APIRouter()

@router.get("/test")
async def test_endpoint():
    """Endpoint de teste"""
    return {"message": "Endpoint funcionando"}

@router.get("/me")
async def get_current_user_profile(
    current_user: User = Depends(get_current_user)
):
    """Obter perfil do usuário atual"""
    return {
        "id": current_user.id,
        "email": current_user.email,
        "name": current_user.name,
        "role": current_user.role,
        "age": current_user.age,
        "bio": current_user.bio,
        "notifications_enabled": current_user.notifications_enabled,
        "language": current_user.language,
        "created_at": current_user.created_at.isoformat() if current_user.created_at else None,
        "last_login": current_user.last_login.isoformat() if current_user.last_login else None
    }

@router.put("/me", response_model=UserResponse)
async def update_user_profile(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Atualizar perfil do usuário atual"""
    
    # Atualizar apenas os campos fornecidos
    update_data = user_update.model_dump(exclude_unset=True)
    
    for field, value in update_data.items():
        if hasattr(current_user, field):
            setattr(current_user, field, value)
    
    # Salvar no banco
    db.add(current_user)
    await db.commit()
    await db.refresh(current_user)
    
    return current_user 