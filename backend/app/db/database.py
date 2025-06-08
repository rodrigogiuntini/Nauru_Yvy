from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
import oracledb

# Criar URL de conexão forçando o uso do driver oracledb
database_url = settings.DATABASE_URL
if database_url.startswith("oracle://"):
    database_url = database_url.replace("oracle://", "oracle+oracledb://")

# Criar engine do banco de dados
# Nota: oracledb usa modo "thin" por padrão (puro Python, sem Oracle Client)
engine = create_engine(
    database_url,
    pool_pre_ping=True,
    echo=settings.DEBUG,
    module=oracledb,  # Forçar o uso do módulo oracledb
)

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