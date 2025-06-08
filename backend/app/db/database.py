from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
import oracledb

# Configuração específica para Oracle com oracledb
import oracledb

def create_oracle_engine():
    """
    Cria engine Oracle de forma mais robusta
    """
    try:
        # Garantir que usamos o driver correto
        database_url = settings.DATABASE_URL
        
        # Converter para formato oracledb se necessário
        if database_url.startswith("oracle://"):
            database_url = database_url.replace("oracle://", "oracle+oracledb://", 1)
        
        # Criar engine com configurações específicas
        engine = create_engine(
            database_url,
            poolclass=StaticPool,
            connect_args={
                "check_same_thread": False
            },
            echo=settings.DEBUG,
            # Forçar uso do oracledb
            module=oracledb
        )
        
        print(f"✅ Oracle engine criada com sucesso: {database_url}")
        return engine
        
    except Exception as e:
        print(f"❌ Erro ao criar Oracle engine: {e}")
        # Fallback para SQLite em caso de erro
        fallback_url = "sqlite:///./test.db"
        print(f"🔄 Usando fallback SQLite: {fallback_url}")
        return create_engine(fallback_url, connect_args={"check_same_thread": False})

# Usar a função para criar o engine
engine = create_oracle_engine()

# Criar SessionLocal para gerenciar sessões do banco
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class para modelos SQLAlchemy
Base = declarative_base()


def get_db():
    """
    Dependency para obter sessão do banco de dados
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close() 