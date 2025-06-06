from typing import Any, Dict, Optional, Union
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from app.core.security import get_password_hash, verify_password
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate


class UserService:
    def get(self, db: Session, user_id: int) -> Optional[User]:
        """
        Obter usuário por ID
        """
        return db.query(User).filter(User.id == user_id).first()

    def get_by_email(self, db: Session, *, email: str) -> Optional[User]:
        """
        Obter usuário por email
        """
        return db.query(User).filter(User.email == email).first()

    def get_multi(
        self, db: Session, *, skip: int = 0, limit: int = 100
    ) -> list[User]:
        """
        Obter múltiplos usuários com paginação
        """
        return db.query(User).offset(skip).limit(limit).all()

    def create(self, db: Session, *, obj_in: UserCreate) -> User:
        """
        Criar novo usuário
        """
        db_obj = User(
            email=obj_in.email,
            hashed_password=get_password_hash(obj_in.password),
            name=obj_in.name,
            role=obj_in.role,
            age=obj_in.age,
            bio=obj_in.bio,
            notifications_enabled=obj_in.notifications_enabled,
            language=obj_in.language,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db: Session,
        *,
        db_obj: User,
        obj_in: Union[UserUpdate, Dict[str, Any]]
    ) -> User:
        """
        Atualizar usuário existente
        """
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        
        for field in update_data:
            if hasattr(db_obj, field):
                setattr(db_obj, field, update_data[field])
        
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def authenticate(
        self, db: Session, *, email: str, password: str
    ) -> Optional[User]:
        """
        Autenticar usuário com email e senha
        """
        user = self.get_by_email(db, email=email)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user

    def is_active(self, user: User) -> bool:
        """
        Verificar se usuário está ativo
        """
        return user.is_active

    def is_admin(self, user: User) -> bool:
        """
        Verificar se usuário é administrador
        """
        return user.role == "admin"

    def update_password(
        self, db: Session, *, user: User, new_password: str
    ) -> User:
        """
        Atualizar senha do usuário
        """
        user.hashed_password = get_password_hash(new_password)
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    def update_last_login(self, db: Session, *, user_id: int) -> User:
        """
        Atualizar timestamp do último login
        """
        user = self.get(db, user_id=user_id)
        if user:
            user.last_login = func.now()
            db.add(user)
            db.commit()
            db.refresh(user)
        return user

    def deactivate(self, db: Session, *, user: User) -> User:
        """
        Desativar usuário
        """
        user.is_active = False
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    def activate(self, db: Session, *, user: User) -> User:
        """
        Ativar usuário
        """
        user.is_active = True
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    def verify_email(self, db: Session, *, user: User) -> User:
        """
        Marcar email como verificado
        """
        user.is_verified = True
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    def search_users(
        self, 
        db: Session, 
        *, 
        query: str, 
        skip: int = 0, 
        limit: int = 100
    ) -> list[User]:
        """
        Buscar usuários por nome ou email
        """
        return (
            db.query(User)
            .filter(
                (User.name.ilike(f"%{query}%")) | 
                (User.email.ilike(f"%{query}%"))
            )
            .offset(skip)
            .limit(limit)
            .all()
        )

    def count_users(self, db: Session) -> int:
        """
        Contar total de usuários
        """
        return db.query(User).count()

    def get_users_by_role(
        self, 
        db: Session, 
        *, 
        role: str, 
        skip: int = 0, 
        limit: int = 100
    ) -> list[User]:
        """
        Obter usuários por role
        """
        return (
            db.query(User)
            .filter(User.role == role)
            .offset(skip)
            .limit(limit)
            .all()
        )


user_service = UserService() 