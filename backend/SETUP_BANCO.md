# 📊 Configuração do Banco de Dados EcoSolo

Guia completo para configurar o banco de dados PostgreSQL para o backend EcoSolo.

## 🚀 Configuração Rápida (Recomendada)

### Opção 1: Docker Compose (Mais Fácil)

```bash
# 1. Navegue para o diretório backend
cd backend

# 2. Execute com Docker Compose (já inclui PostgreSQL)
docker-compose up -d

# 3. Acesse a API
# http://localhost:8000/api/v1/docs
```

O Docker Compose já configura:
- ✅ PostgreSQL
- ✅ Redis  
- ✅ PgAdmin (interface web)
- ✅ Migrations automáticas
- ✅ Dados de exemplo

### Opção 2: Configuração Manual

```bash
# 1. Instalar dependências
cd backend
pip install -r requirements.txt

# 2. Configurar PostgreSQL manualmente (veja seção abaixo)

# 3. Configurar variáveis de ambiente
cp env_example.txt .env
# Editar .env com suas configurações

# 4. Executar script de configuração
python setup_database.py

# 5. Iniciar servidor
uvicorn app.main:app --reload
```

## 🐘 Instalação do PostgreSQL

### macOS
```bash
# Homebrew
brew install postgresql
brew services start postgresql

# Criar usuário e banco
createuser -s ecosolo
createdb ecosolo_db -O ecosolo
```

### Ubuntu/Debian
```bash
# Instalar PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Configurar usuário
sudo -u postgres createuser --interactive ecosolo
sudo -u postgres createdb ecosolo_db -O ecosolo
```

### Windows
1. Baixar PostgreSQL do site oficial
2. Instalar e configurar
3. Usar pgAdmin para criar banco e usuário

## ⚙️ Configuração de Variáveis

Crie o arquivo `.env` baseado no `env_example.txt`:

```bash
# Banco de dados
DATABASE_URL=postgresql://ecosolo:ecosolo123@localhost:5432/ecosolo_db

# Segurança
SECRET_KEY=sua-chave-secreta-aqui
DEBUG=True

# Opcional
REDIS_URL=redis://localhost:6379/0
```

### Formato da DATABASE_URL

```
postgresql://[usuário]:[senha]@[host]:[porta]/[nome_banco]
```

Exemplos:
- Local: `postgresql://postgres:password@localhost:5432/ecosolo_db`
- Docker: `postgresql://ecosolo:ecosolo123@postgres:5432/ecosolo_db`
- Heroku: `postgresql://user:pass@host:5432/db_name`

## 🗂️ Estrutura do Banco

### Tabelas Criadas

**users** - Usuários do sistema
- 👑 Administradores
- 👤 Líderes comunitários  
- 👥 Membros da comunidade
- 🔬 Pesquisadores

**soil_analyses** - Análises de solo
- Dados químicos (pH, nutrientes)
- Dados físicos (umidade, textura)
- Geolocalização
- Recomendações

**occurrences** - Ocorrências ambientais
- Desmatamento
- Poluição
- Mineração ilegal
- Caça ilegal

**alerts** - Alertas do sistema
- Notificações automáticas
- Diferentes tipos e severidades
- Ações recomendadas

## 🌱 Dados de Exemplo

O script de seed cria:

### Usuários de Teste
```
👑 admin@ecosolo.com / admin123 (Administrador)
👤 priya@example.com / 123456 (Líder Comunitária)
👥 joao.silva@ecosolo.com / 123456 (Membro)
🔬 maria.oliveira@ecosolo.com / 123456 (Pesquisadora)
```

### Dados Realistas
- 3 análises de solo completas
- 4 ocorrências ambientais
- 4 alertas ativos
- Coordenadas de Rondônia, Brasil

## 🛠️ Comandos Úteis

### Migrations
```bash
# Gerar nova migration
alembic revision --autogenerate -m "Descrição da mudança"

# Aplicar migrations
alembic upgrade head

# Verificar status
alembic current

# Voltar migration
alembic downgrade -1
```

### Banco de Dados
```bash
# Conectar ao banco
psql postgresql://ecosolo:ecosolo123@localhost:5432/ecosolo_db

# Backup
pg_dump ecosolo_db > backup.sql

# Restore
psql ecosolo_db < backup.sql

# Reset completo
dropdb ecosolo_db
createdb ecosolo_db
python setup_database.py
```

### Docker
```bash
# Ver logs
docker-compose logs api
docker-compose logs postgres

# Acessar container
docker exec -it ecosolo_postgres psql -U ecosolo -d ecosolo_db

# Rebuild
docker-compose down
docker-compose build
docker-compose up -d
```

## 🌐 Interfaces Web

Com Docker Compose:

- **API Docs**: http://localhost:8000/api/v1/docs
- **PgAdmin**: http://localhost:5050
  - Email: admin@ecosolo.com
  - Senha: admin123

## 🔧 Troubleshooting

### Erro: "database does not exist"
```bash
# Criar banco manualmente
createdb ecosolo_db
# ou
python setup_database.py
```

### Erro: "role does not exist"
```bash
# Criar usuário PostgreSQL
createuser -s ecosolo
# ou definir senha
createuser -P ecosolo
```

### Erro: "connection refused"
```bash
# Verificar se PostgreSQL está rodando
brew services start postgresql  # macOS
sudo systemctl start postgresql  # Linux

# Verificar porta
netstat -an | grep 5432
```

### Erro: "permission denied"
```bash
# Dar permissões ao usuário
sudo -u postgres psql
ALTER USER ecosolo CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE ecosolo_db TO ecosolo;
```

### Reset Completo
```bash
# Opção 1: Docker
docker-compose down -v
docker-compose up -d

# Opção 2: Manual
dropdb ecosolo_db
python setup_database.py
```

## 📊 Verificação da Instalação

Após configurar, teste:

1. **API funcionando**: http://localhost:8000/health
2. **Login funcional**: 
   ```bash
   curl -X POST "http://localhost:8000/api/v1/auth/login" \
        -H "Content-Type: application/json" \
        -d '{"email": "priya@example.com", "password": "123456"}'
   ```
3. **Banco populado**: Verificar se há dados nas tabelas

## 🎯 Próximos Passos

1. ✅ Banco configurado
2. ✅ API funcionando  
3. 🔄 Conectar frontend React Native
4. 🔄 Implementar endpoints específicos
5. 🔄 Deploy em produção

---

**💡 Dica**: Use Docker Compose para desenvolvimento - é mais simples e já inclui tudo configurado! 