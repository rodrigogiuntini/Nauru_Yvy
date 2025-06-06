# EcoSolo Backend API

API Backend em Python/FastAPI para a plataforma de monitoramento ambiental EcoSolo.

## 🚀 Tecnologias

- **FastAPI** - Framework web moderno e rápido
- **SQLAlchemy** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **Alembic** - Migrations de banco de dados
- **JWT** - Autenticação com tokens
- **Pydantic** - Validação de dados
- **Uvicorn** - Servidor ASGI

## 📋 Pré-requisitos

- Python 3.11+
- PostgreSQL 13+
- Redis (opcional, para cache)

## ⚙️ Instalação

### 1. Clone o projeto e navegue para o backend

```bash
cd backend
```

### 2. Crie um ambiente virtual

```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows
```

### 3. Instale as dependências

```bash
pip install -r requirements.txt
```

### 4. Configure as variáveis de ambiente

```bash
# Copie o arquivo de exemplo
cp env_example.txt .env

# Edite o arquivo .env com suas configurações
nano .env
```

### 5. Configure o banco de dados

```bash
# Crie o banco de dados PostgreSQL
createdb ecosolo_db

# Execute as migrations
alembic upgrade head
```

## 🏃 Executando

### Desenvolvimento

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Produção

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## 📖 Documentação da API

Com o servidor rodando, acesse:

- **Swagger UI**: http://localhost:8000/api/v1/docs
- **ReDoc**: http://localhost:8000/api/v1/redoc

## 🗂️ Estrutura do Projeto

```
backend/
├── app/
│   ├── api/                    # Endpoints da API
│   │   ├── deps.py            # Dependências (auth, db)
│   │   └── v1/
│   │       └── endpoints/
│   │           ├── auth.py    # Autenticação
│   │           ├── users.py   # Usuários
│   │           ├── soil.py    # Análises de solo
│   │           ├── occurrences.py  # Ocorrências
│   │           └── alerts.py  # Alertas
│   ├── core/                  # Configurações principais
│   │   ├── config.py         # Settings da aplicação
│   │   └── security.py       # JWT e senhas
│   ├── db/                   # Banco de dados
│   │   └── database.py       # Configuração SQLAlchemy
│   ├── models/               # Modelos SQLAlchemy
│   │   ├── user.py
│   │   ├── soil_analysis.py
│   │   ├── occurrence.py
│   │   └── alert.py
│   ├── schemas/              # Schemas Pydantic
│   │   ├── user.py
│   │   ├── soil.py
│   │   ├── occurrence.py
│   │   └── alert.py
│   ├── services/             # Lógica de negócio
│   │   ├── user.py
│   │   ├── soil.py
│   │   ├── occurrence.py
│   │   ├── alert.py
│   │   └── email.py
│   └── main.py              # Aplicação principal
├── alembic/                 # Migrations
├── tests/                   # Testes
├── requirements.txt         # Dependências
├── env_example.txt         # Exemplo de .env
└── README.md               # Este arquivo
```

## 🔐 Autenticação

A API usa autenticação JWT. Para acessar endpoints protegidos:

1. **Registre-se**: `POST /api/v1/auth/register`
2. **Faça login**: `POST /api/v1/auth/login`
3. **Use o token**: Inclua no header `Authorization: Bearer <token>`

### Exemplo de uso:

```bash
# Registrar usuário
curl -X POST "http://localhost:8000/api/v1/auth/register" \
     -H "Content-Type: application/json" \
     -d '{
       "email": "user@example.com",
       "password": "123456",
       "name": "João Silva",
       "role": "community_member"
     }'

# Fazer login
curl -X POST "http://localhost:8000/api/v1/auth/login" \
     -H "Content-Type: application/json" \
     -d '{
       "email": "user@example.com",
       "password": "123456"
     }'

# Usar token em requisições
curl -X GET "http://localhost:8000/api/v1/users/me" \
     -H "Authorization: Bearer <seu_token_aqui>"
```

## 🏗️ Modelos de Dados

### User (Usuário)
- **id**: Identificador único
- **email**: Email único
- **name**: Nome completo
- **role**: admin | community_leader | community_member | researcher
- **is_active**: Status ativo
- **created_at**: Data de criação

### SoilAnalysis (Análise de Solo)
- **id**: Identificador único
- **title**: Título da análise
- **location**: Localização
- **soil_type**: Tipo de solo (clay, sandy, loamy, etc.)
- **ph_level**: Nível de pH (0-14)
- **humidity**: Umidade (%)
- **temperature**: Temperatura (°C)
- **fertility_level**: Nível de fertilidade
- **status**: pending | processing | completed | failed

### Occurrence (Ocorrência)
- **id**: Identificador único
- **title**: Título da ocorrência
- **occurrence_type**: deforestation | illegal_mining | poaching | pollution
- **severity**: low | medium | high | critical
- **location**: Localização
- **description**: Descrição detalhada
- **status**: reported | investigating | confirmed | resolved

### Alert (Alerta)
- **id**: Identificador único
- **title**: Título do alerta
- **alert_type**: Tipo de alerta
- **severity**: low | medium | high | critical
- **description**: Descrição
- **status**: active | acknowledged | resolved

## 🧪 Testes

```bash
# Executar todos os testes
pytest

# Executar com coverage
pytest --cov=app

# Executar testes específicos
pytest tests/test_auth.py
```

## 🚀 Deploy

### Docker

```bash
# Build da imagem
docker build -t ecosolo-api .

# Executar container
docker run -p 8000:8000 --env-file .env ecosolo-api
```

### Docker Compose

```bash
# Executar toda a stack (API + PostgreSQL + Redis)
docker-compose up -d
```

## 🔧 Configurações de Produção

### Variáveis de Ambiente Importantes

```bash
# Produção
ENVIRONMENT=production
DEBUG=False

# Banco de dados
DATABASE_URL=postgresql://user:pass@host:port/db

# Segurança
SECRET_KEY=sua-chave-secreta-super-forte-aqui
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
BACKEND_CORS_ORIGINS=["https://app.ecosolo.com","https://ecosolo.com"]
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🔗 Links Relacionados

- **Frontend React Native**: `../src/`
- **Documentação API**: http://localhost:8000/api/v1/docs
- **Cainvest**: https://cainvest.com

---

**Desenvolvido com ❤️ para o monitoramento ambiental brasileiro** 