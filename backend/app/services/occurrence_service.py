import logging
import json
from datetime import datetime
from typing import List, Optional, Dict, Any
from sqlalchemy import text
from fastapi import HTTPException, status

from ..core.oracle_config import oracle_manager
from ..schemas.occurrence_schemas import (
    OccurrenceCreate, 
    OccurrenceResponse, 
    TipoOcorrencia, 
    GrauSeveridade, 
    StatusOcorrencia
)

# Configuração de logging
logger = logging.getLogger(__name__)

class OccurrenceService:
    """Serviço para gerenciar ocorrências ambientais no Oracle"""
    
    def __init__(self):
        self.ensure_table_exists()
    
    def ensure_table_exists(self):
        """Garantir que a tabela OCORRENCIAS existe no Oracle"""
        try:
            if not oracle_manager.check_table_exists("OCORRENCIAS"):
                logger.warning("⚠️ Tabela OCORRENCIAS não encontrada, criando...")
                self.create_occurrences_table()
            else:
                logger.info("✅ Tabela OCORRENCIAS existe")
        except Exception as e:
            logger.error(f"❌ Erro ao verificar tabela OCORRENCIAS: {e}")
    
    def create_occurrences_table(self):
        """Criar tabela OCORRENCIAS no Oracle"""
        try:
            # Primeiro, verificar e remover constraints se existirem
            try:
                constraint_queries = [
                    "ALTER TABLE OCORRENCIAS DROP CONSTRAINT FK_OCORRENCIAS_USUARIO",
                    "ALTER TABLE OCORRENCIAS DROP CONSTRAINT CHK_TIPO_OCORRENCIA", 
                    "ALTER TABLE OCORRENCIAS DROP CONSTRAINT CHK_SEVERIDADE",
                    "ALTER TABLE OCORRENCIAS DROP CONSTRAINT CHK_STATUS",
                    "ALTER TABLE OCORRENCIAS DROP CONSTRAINT FK_OCORRENCIAS_USR_V2",
                    "ALTER TABLE OCORRENCIAS DROP CONSTRAINT CHK_TIPO_OCORR_V2",
                    "ALTER TABLE OCORRENCIAS DROP CONSTRAINT CHK_SEVERIDADE_V2",
                    "ALTER TABLE OCORRENCIAS DROP CONSTRAINT CHK_STATUS_V2"
                ]
                
                for query in constraint_queries:
                    try:
                        oracle_manager.execute_insert(query, {})
                    except Exception:
                        # Ignorar se constraint não existir
                        pass
                        
                logger.info("🔧 Constraints antigas removidas")
            except Exception:
                # Ignorar erros de constraints
                pass
            
            # Remover tabela se existir
            try:
                drop_table_query = "DROP TABLE OCORRENCIAS"
                oracle_manager.execute_insert(drop_table_query, {})
                logger.info("🗑️ Tabela OCORRENCIAS anterior removida")
            except Exception:
                # Ignorar erro se tabela não existir
                pass
            
            # Criar tabela com constraints únicos
            import time
            timestamp = str(int(time.time()))[-6:]  # Últimos 6 dígitos do timestamp
            
            create_table_query = f"""
            CREATE TABLE OCORRENCIAS (
                ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                USUARIO_ID NUMBER NOT NULL,
                TIPO_OCORRENCIA VARCHAR2(50) NOT NULL,
                LOCALIZACAO VARCHAR2(200) NOT NULL,
                GRAU_SEVERIDADE VARCHAR2(20) NOT NULL,
                DESCRICAO CLOB NOT NULL,
                COORDENADAS CLOB,
                IMAGENS CLOB,
                STATUS VARCHAR2(20) DEFAULT 'reportada',
                NOTAS_INVESTIGACAO CLOB,
                NOTAS_RESOLUCAO CLOB,
                DATA_CRIACAO TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                DATA_ATUALIZACAO TIMESTAMP,
                CONSTRAINT FK_OCORR_USR_{timestamp} FOREIGN KEY (USUARIO_ID) REFERENCES USUARIOS(ID),
                CONSTRAINT CHK_TIPO_{timestamp} CHECK (TIPO_OCORRENCIA IN ('desmatamento', 'queimada', 'caca_pesca', 'enchente', 'poluicao', 'mineracao_ilegal')),
                CONSTRAINT CHK_SEV_{timestamp} CHECK (GRAU_SEVERIDADE IN ('baixa', 'media', 'alta', 'critica')),
                CONSTRAINT CHK_STAT_{timestamp} CHECK (STATUS IN ('reportada', 'investigando', 'confirmada', 'resolvida', 'descartada'))
            )
            """
            
            oracle_manager.execute_insert(create_table_query, {})
            logger.info("✅ Tabela OCORRENCIAS criada com sucesso")
            
        except Exception as e:
            logger.error(f"❌ Erro ao criar tabela OCORRENCIAS: {e}")
            raise
    
    def create_occurrence(self, occurrence_data: OccurrenceCreate, usuario_id: int) -> Dict[str, Any]:
        """Criar nova ocorrência no Oracle"""
        try:
            # Preparar dados
            coordenadas_json = json.dumps(occurrence_data.coordenadas) if occurrence_data.coordenadas else None
            imagens_json = json.dumps(occurrence_data.imagens) if occurrence_data.imagens else None
            
            # Query de inserção
            insert_query = """
            INSERT INTO OCORRENCIAS (
                USUARIO_ID, TIPO_OCORRENCIA, LOCALIZACAO, GRAU_SEVERIDADE, 
                DESCRICAO, COORDENADAS, IMAGENS, STATUS
            ) VALUES (
                :usuario_id, :tipo_ocorrencia, :localizacao, :grau_severidade,
                :descricao, :coordenadas, :imagens, :status
            )
            """
            
            params = {
                "usuario_id": usuario_id,
                "tipo_ocorrencia": occurrence_data.tipo_ocorrencia.value,
                "localizacao": occurrence_data.localizacao,
                "grau_severidade": occurrence_data.grau_severidade.value,
                "descricao": occurrence_data.descricao,
                "coordenadas": coordenadas_json,
                "imagens": imagens_json,
                "status": StatusOcorrencia.REPORTADA.value
            }
            
            # Executar inserção
            oracle_manager.execute_insert(insert_query, params)
            
            # Buscar ocorrência criada
            select_query = """
            SELECT ID, USUARIO_ID, TIPO_OCORRENCIA, LOCALIZACAO, GRAU_SEVERIDADE,
                   DESCRICAO, COORDENADAS, IMAGENS, STATUS, DATA_CRIACAO, DATA_ATUALIZACAO
            FROM OCORRENCIAS 
            WHERE USUARIO_ID = :usuario_id 
            ORDER BY DATA_CRIACAO DESC 
            FETCH FIRST 1 ROWS ONLY
            """
            
            result = oracle_manager.execute_query(select_query, {"usuario_id": usuario_id})
            
            if not result:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Erro ao recuperar ocorrência criada"
                )
            
            occurrence = result[0]
            
            logger.info(f"✅ Ocorrência criada: ID {occurrence[0]} - Tipo: {occurrence[2]}")
            
            return {
                "success": True,
                "message": "Ocorrência reportada com sucesso",
                "data": {
                    "id": occurrence[0],
                    "usuario_id": occurrence[1],
                    "tipo_ocorrencia": occurrence[2],
                    "localizacao": occurrence[3],
                    "grau_severidade": occurrence[4],
                    "descricao": occurrence[5],
                    "coordenadas": json.loads(occurrence[6]) if occurrence[6] else None,
                    "imagens": json.loads(occurrence[7]) if occurrence[7] else [],
                    "status": occurrence[8],
                    "data_criacao": occurrence[9],
                    "data_atualizacao": occurrence[10]
                }
            }
            
        except Exception as e:
            logger.error(f"❌ Erro ao criar ocorrência: {e}")
            if isinstance(e, HTTPException):
                raise
            
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Erro interno ao criar ocorrência"
            )
    
    def get_user_occurrences(self, usuario_id: int) -> List[Dict[str, Any]]:
        """Buscar ocorrências do usuário"""
        try:
            query = """
            SELECT ID, USUARIO_ID, TIPO_OCORRENCIA, LOCALIZACAO, GRAU_SEVERIDADE,
                   DESCRICAO, COORDENADAS, IMAGENS, STATUS, DATA_CRIACAO, DATA_ATUALIZACAO
            FROM OCORRENCIAS 
            WHERE USUARIO_ID = :usuario_id 
            ORDER BY DATA_CRIACAO DESC
            """
            
            results = oracle_manager.execute_query(query, {"usuario_id": usuario_id})
            
            occurrences = []
            for row in results:
                occurrences.append({
                    "id": row[0],
                    "usuario_id": row[1],
                    "tipo_ocorrencia": row[2],
                    "localizacao": row[3],
                    "grau_severidade": row[4],
                    "descricao": row[5],
                    "coordenadas": json.loads(row[6]) if row[6] else None,
                    "imagens": json.loads(row[7]) if row[7] else [],
                    "status": row[8],
                    "data_criacao": row[9],
                    "data_atualizacao": row[10]
                })
            
            return occurrences
            
        except Exception as e:
            logger.error(f"❌ Erro ao buscar ocorrências: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Erro ao buscar ocorrências"
            )
    
    def get_all_occurrences(self) -> List[Dict[str, Any]]:
        """Buscar todas as ocorrências (admin)"""
        try:
            query = """
            SELECT o.ID, o.USUARIO_ID, u.NOME as USUARIO_NOME, o.TIPO_OCORRENCIA, 
                   o.LOCALIZACAO, o.GRAU_SEVERIDADE, o.DESCRICAO, o.COORDENADAS, 
                   o.IMAGENS, o.STATUS, o.DATA_CRIACAO, o.DATA_ATUALIZACAO
            FROM OCORRENCIAS o
            LEFT JOIN USUARIOS u ON o.USUARIO_ID = u.ID
            ORDER BY o.DATA_CRIACAO DESC
            """
            
            results = oracle_manager.execute_query(query, {})
            
            occurrences = []
            for row in results:
                occurrences.append({
                    "id": row[0],
                    "usuario_id": row[1],
                    "usuario_nome": row[2],
                    "tipo_ocorrencia": row[3],
                    "localizacao": row[4],
                    "grau_severidade": row[5],
                    "descricao": row[6],
                    "coordenadas": json.loads(row[7]) if row[7] else None,
                    "imagens": json.loads(row[8]) if row[8] else [],
                    "status": row[9],
                    "data_criacao": row[10],
                    "data_atualizacao": row[11]
                })
            
            return occurrences
            
        except Exception as e:
            logger.error(f"❌ Erro ao buscar todas as ocorrências: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Erro ao buscar ocorrências"
            )

# Instância global do serviço
occurrence_service = OccurrenceService() 