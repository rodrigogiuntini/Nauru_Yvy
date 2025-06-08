import os
import logging
from typing import Optional, Dict, Any
import oracledb
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.exc import SQLAlchemyError
from contextlib import contextmanager
from pydantic_settings import BaseSettings

# Configurar logging para auditoria
logger = logging.getLogger(__name__)

class OracleSettings(BaseSettings):
    """Configurações seguras para Oracle Database"""
    
    oracle_host: str = os.getenv("ORACLE_HOST", "oracle.fiap.com.br")
    oracle_port: int = int(os.getenv("ORACLE_PORT", "1521"))
    oracle_service_name: str = os.getenv("ORACLE_SERVICE_NAME", "ORCL")
    oracle_username: str = os.getenv("ORACLE_USERNAME", "rm98044")
    oracle_password: str = os.getenv("ORACLE_PASSWORD", "070305")
    oracle_dsn: str = os.getenv("ORACLE_DSN", "oracle.fiap.com.br:1521/ORCL")
    
    # Pool de conexões
    pool_size: int = 5
    max_overflow: int = 10
    pool_timeout: int = 30
    
    class Config:
        env_file = "config.env"
        extra = "ignore"

oracle_settings = OracleSettings()

class OracleConnectionManager:
    """Gerenciador de conexões Oracle com padrão bancário"""
    
    def __init__(self):
        self.engine = None
        self.SessionLocal = None
        self._initialize_connection()
    
    def _initialize_connection(self):
        """Inicializa a conexão Oracle com tratamento de erros"""
        try:
            # Configurar Oracle Instant Client (se necessário)
            # oracledb.init_oracle_client()
            
            # String de conexão Oracle
            connection_string = (
                f"oracle+oracledb://{oracle_settings.oracle_username}:"
                f"{oracle_settings.oracle_password}@"
                f"{oracle_settings.oracle_host}:"
                f"{oracle_settings.oracle_port}/"
                f"{oracle_settings.oracle_service_name}"
            )
            
            # Criar engine SQLAlchemy
            self.engine = create_engine(
                connection_string,
                pool_size=oracle_settings.pool_size,
                max_overflow=oracle_settings.max_overflow,
                pool_timeout=oracle_settings.pool_timeout,
                pool_pre_ping=True,  # Verificar conexão antes de usar
                echo=False  # Set True para debug SQL
            )
            
            # Criar session factory
            self.SessionLocal = sessionmaker(
                autocommit=False,
                autoflush=False,
                bind=self.engine
            )
            
            # Testar conexão
            self._test_connection()
            
            logger.info("✅ Conexão Oracle estabelecida com sucesso")
            
        except Exception as e:
            logger.error(f"❌ Erro ao conectar Oracle: {e}")
            raise ConnectionError(f"Falha na conexão Oracle: {e}")
    
    def _test_connection(self):
        """Testa a conexão Oracle"""
        try:
            with self.engine.connect() as conn:
                result = conn.execute(text("SELECT 1 FROM DUAL"))
                if result.fetchone()[0] == 1:
                    logger.info("🔍 Teste de conexão Oracle: OK")
                else:
                    raise Exception("Teste de conexão falhou")
                    
        except Exception as e:
            logger.error(f"❌ Teste de conexão Oracle falhou: {e}")
            raise
    
    @contextmanager
    def get_db_session(self):
        """Context manager para sessões Oracle com tratamento de erros"""
        if not self.SessionLocal:
            raise ConnectionError("Oracle não inicializado")
            
        session = self.SessionLocal()
        try:
            yield session
            session.commit()
            logger.debug("✅ Transação Oracle commitada")
        except Exception as e:
            session.rollback()
            logger.error(f"❌ Erro na transação Oracle: {e}")
            raise
        finally:
            session.close()
    
    def get_raw_connection(self):
        """Obter conexão raw Oracle para operações específicas"""
        try:
            return oracledb.connect(
                user=oracle_settings.oracle_username,
                password=oracle_settings.oracle_password,
                dsn=oracle_settings.oracle_dsn,
                encoding="UTF-8"
            )
        except Exception as e:
            logger.error(f"❌ Erro ao obter conexão raw Oracle: {e}")
            raise
    
    def execute_query(self, query: str, params: Optional[Dict[str, Any]] = None) -> list:
        """Executar query SELECT de forma segura"""
        try:
            with self.get_db_session() as session:
                result = session.execute(text(query), params or {})
                return result.fetchall()
        except Exception as e:
            logger.error(f"❌ Erro ao executar query: {e}")
            raise
    
    def execute_insert(self, query: str, params: Dict[str, Any]) -> bool:
        """Executar INSERT de forma segura"""
        try:
            with self.get_db_session() as session:
                session.execute(text(query), params)
                session.commit()
                logger.info(f"✅ INSERT executado com sucesso")
                return True
        except Exception as e:
            logger.error(f"❌ Erro ao executar INSERT: {e}")
            raise
    
    def check_table_exists(self, table_name: str) -> bool:
        """Verificar se tabela existe"""
        try:
            query = """
                SELECT COUNT(*) as count 
                FROM USER_TABLES 
                WHERE TABLE_NAME = UPPER(:table_name)
            """
            result = self.execute_query(query, {"table_name": table_name})
            return result[0][0] > 0 if result else False
        except Exception as e:
            logger.error(f"❌ Erro ao verificar tabela {table_name}: {e}")
            return False
    
    def get_table_structure(self, table_name: str) -> list:
        """Obter estrutura da tabela"""
        try:
            query = """
                SELECT COLUMN_NAME, DATA_TYPE, NULLABLE, DATA_DEFAULT
                FROM USER_TAB_COLUMNS 
                WHERE TABLE_NAME = UPPER(:table_name)
                ORDER BY COLUMN_ID
            """
            return self.execute_query(query, {"table_name": table_name})
        except Exception as e:
            logger.error(f"❌ Erro ao obter estrutura da tabela {table_name}: {e}")
            return []

# Instância global do gerenciador Oracle
oracle_manager = OracleConnectionManager()

def get_oracle_session():
    """Dependency para FastAPI - obtém sessão Oracle"""
    with oracle_manager.get_db_session() as session:
        yield session

def test_oracle_connection() -> Dict[str, Any]:
    """Função para testar conexão Oracle"""
    try:
        # Testar conexão básica
        with oracle_manager.get_db_session() as session:
            result = session.execute(text("SELECT SYSDATE FROM DUAL"))
            current_time = result.fetchone()[0]
        
        # Obter informações do banco
        info_query = """
            SELECT 
                SYS_CONTEXT('USERENV', 'DB_NAME') as db_name,
                SYS_CONTEXT('USERENV', 'SESSION_USER') as current_user,
                SYS_CONTEXT('USERENV', 'SERVER_HOST') as server_host
            FROM DUAL
        """
        db_info = oracle_manager.execute_query(info_query)
        
        return {
            "status": "success",
            "message": "Conexão Oracle estabelecida com sucesso",
            "timestamp": current_time,
            "database_info": {
                "db_name": db_info[0][0] if db_info else None,
                "current_user": db_info[0][1] if db_info else None,
                "server_host": db_info[0][2] if db_info else None
            }
        }
        
    except Exception as e:
        logger.error(f"❌ Teste de conexão Oracle falhou: {e}")
        return {
            "status": "error",
            "message": f"Erro na conexão Oracle: {str(e)}"
        } 