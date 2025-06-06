#!/usr/bin/env python3
"""
Script de configuração completa do banco de dados EcoSolo

Este script:
1. Cria o banco de dados PostgreSQL
2. Executa as migrations com Alembic
3. Popula o banco com dados de exemplo (seed)

Usage:
    python setup_database.py
"""

import os
import sys
import subprocess
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
from app.core.config import settings
from app.db.seed import seed_database


def run_command(command, description):
    """Executar comando e verificar resultado"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} - Concluído!")
        if result.stdout:
            print(f"   📝 {result.stdout.strip()}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} - Falhou!")
        print(f"   Erro: {e.stderr}")
        return False


def create_database():
    """Criar banco de dados PostgreSQL se não existir"""
    
    # Parse da URL do banco para extrair configurações
    db_url = settings.DATABASE_URL
    print(f"🔗 URL do banco: {db_url}")
    
    # Extrair parâmetros da URL postgresql://user:password@host:port/database
    try:
        import urllib.parse as urlparse
        url_parts = urlparse.urlparse(db_url)
        
        db_host = url_parts.hostname or "localhost"
        db_port = url_parts.port or 5432
        db_user = url_parts.username or "postgres"
        db_password = url_parts.password or ""
        db_name = url_parts.path[1:]  # Remove o primeiro '/'
        
        print(f"📊 Configurações do banco:")
        print(f"   Host: {db_host}")
        print(f"   Porta: {db_port}")
        print(f"   Usuário: {db_user}")
        print(f"   Banco: {db_name}")
        
        # Conectar ao PostgreSQL (banco postgres padrão)
        print(f"\n🔄 Conectando ao PostgreSQL...")
        conn = psycopg2.connect(
            host=db_host,
            port=db_port,
            user=db_user,
            password=db_password,
            database="postgres"  # Conectar ao banco padrão primeiro
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursor = conn.cursor()
        
        # Verificar se banco já existe
        cursor.execute("SELECT 1 FROM pg_database WHERE datname = %s", (db_name,))
        exists = cursor.fetchone()
        
        if exists:
            print(f"✅ Banco de dados '{db_name}' já existe!")
        else:
            # Criar banco de dados
            print(f"🔄 Criando banco de dados '{db_name}'...")
            cursor.execute(f'CREATE DATABASE "{db_name}"')
            print(f"✅ Banco de dados '{db_name}' criado com sucesso!")
        
        cursor.close()
        conn.close()
        return True
        
    except Exception as e:
        print(f"❌ Erro ao criar banco de dados: {e}")
        print(f"💡 Certifique-se de que o PostgreSQL está rodando e as credenciais estão corretas")
        return False


def run_migrations():
    """Executar migrations do Alembic"""
    
    # Verificar se Alembic está configurado
    if not os.path.exists("alembic.ini"):
        print("❌ Arquivo alembic.ini não encontrado!")
        return False
    
    # Verificar revisão atual
    print("🔍 Verificando estado das migrations...")
    current_cmd = "alembic current"
    if not run_command(current_cmd, "Verificando revisão atual"):
        # Se não há tabela de migrations, inicializar
        print("📝 Inicializando Alembic...")
        init_cmd = "alembic stamp head"
        if not run_command(init_cmd, "Inicializando Alembic"):
            return False
    
    # Executar migrations
    upgrade_cmd = "alembic upgrade head"
    return run_command(upgrade_cmd, "Executando migrations")


def check_prerequisites():
    """Verificar pré-requisitos"""
    
    print("🔍 Verificando pré-requisitos...")
    
    # Verificar se PostgreSQL está acessível
    try:
        import psycopg2
        print("✅ psycopg2 instalado")
    except ImportError:
        print("❌ psycopg2 não instalado. Execute: pip install psycopg2-binary")
        return False
    
    # Verificar se Alembic está instalado
    try:
        import alembic
        print("✅ Alembic instalado")
    except ImportError:
        print("❌ Alembic não instalado. Execute: pip install alembic")
        return False
    
    # Verificar variáveis de ambiente
    if not settings.DATABASE_URL:
        print("❌ DATABASE_URL não configurada")
        print("💡 Configure no arquivo .env ou como variável de ambiente")
        return False
    
    print("✅ DATABASE_URL configurada")
    
    return True


def main():
    """Função principal"""
    
    print("🚀 EcoSolo - Configuração do Banco de Dados")
    print("=" * 50)
    
    # Verificar pré-requisitos
    if not check_prerequisites():
        print("\n❌ Pré-requisitos não atendidos. Abortando.")
        sys.exit(1)
    
    # Criar banco de dados
    print("\n📊 ETAPA 1: Criação do Banco de Dados")
    print("-" * 30)
    if not create_database():
        print("\n❌ Falha na criação do banco. Abortando.")
        sys.exit(1)
    
    # Executar migrations
    print("\n🗂️ ETAPA 2: Migrations")
    print("-" * 20)
    if not run_migrations():
        print("\n❌ Falha nas migrations. Abortando.")
        sys.exit(1)
    
    # Executar seed
    print("\n🌱 ETAPA 3: Seed dos Dados")
    print("-" * 25)
    try:
        seed_database()
    except Exception as e:
        print(f"❌ Falha no seed: {e}")
        sys.exit(1)
    
    # Sucesso!
    print("\n" + "=" * 50)
    print("🎉 CONFIGURAÇÃO CONCLUÍDA COM SUCESSO!")
    print("=" * 50)
    
    print(f"\n📊 Banco de dados configurado e populado!")
    print(f"🚀 Execute o servidor: uvicorn app.main:app --reload")
    print(f"📖 Documentação: http://localhost:8000/api/v1/docs")
    
    print(f"\n🔐 Credenciais de teste:")
    print(f"   👑 Admin: admin@ecosolo.com / admin123")
    print(f"   👤 Líder: priya@example.com / 123456")
    print(f"   👥 Usuário: joao.silva@ecosolo.com / 123456")
    
    print(f"\n💡 Para resetar o banco: python setup_database.py --reset")


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--reset":
        print("⚠️ Funcionalidade de reset não implementada ainda")
        print("💡 Para resetar manualmente:")
        print("   1. DROP DATABASE ecosolo_db;")
        print("   2. python setup_database.py")
    else:
        main() 