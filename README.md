# 🌱 Naurú Yvy - Plataforma de Monitoramento Ambiental

## 📱 Sobre o Projeto

Naurú Yvy é uma aplicação móvel desenvolvida em React Native com backend FastAPI para monitoramento ambiental e análise de solo. A plataforma permite aos usuários:

- 🔐 **Autenticação completa** (login/registro)
- 👤 **Perfil de usuário** editável
- 📱 **Scanner QR Code** para detecção de ocorrências
- 🌍 **Monitoramento ambiental** em tempo real
- 📊 **Análise de solo** com dados detalhados
- 🚨 **Sistema de alertas** para ocorrências
- 🌡️ **Métricas ambientais** (umidade, temperatura, pH, nutrientes)

## 🏗️ Arquitetura

### Frontend (React Native + Expo)
- **Framework**: React Native com Expo SDK 53
- **Navegação**: React Navigation v6
- **Estado Global**: Context API
- **Estilização**: StyleSheet nativo
- **Componentes**: Design System modular

### Backend (FastAPI + PostgreSQL)
- **Framework**: FastAPI
- **Banco de Dados**: PostgreSQL
- **ORM**: SQLAlchemy
- **Autenticação**: JWT
- **Validação**: Pydantic

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- Python 3.11+
- PostgreSQL
- Expo CLI

### Frontend
```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npx expo start
```

### Backend
```bash
# Navegar para o backend
cd backend

# Criar ambiente virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows

# Instalar dependências
pip install -r requirements.txt

# Executar servidor
uvicorn app.main:app --reload --host 0.0.0.0 --port 8001
```

## 📱 Funcionalidades Principais

### 🔐 Autenticação
- Login com email/senha
- Registro de novos usuários
- Diferentes perfis (Admin, Líder Comunitário, Membro, Pesquisador)
- Persistência de sessão

### 👤 Perfil de Usuário
- Edição de informações pessoais
- Configurações de notificações
- Tradução de funções para português

### 📊 Dashboard
- Análise de solo em tempo real
- Métricas ambientais
- Histórico de análises
- Cards de status coloridos

### 📱 Scanner QR Code
- Detecção automática de ocorrências
- Parsing de dados JSON ou texto
- Criação automática de alertas
- Interface fullscreen

### 🚨 Sistema de Alertas
- Criação manual de alertas
- Alertas automáticos via QR Code
- Categorização por tipo e severidade
- Histórico completo

## 🎨 Design System

O projeto segue as diretrizes de design da **Bityx/CAInvest** com:
- Tipografia financeira profissional
- Sistema de cores institucional
- Componentes modulares reutilizáveis
- Grid de 8px para espaçamentos
- Suporte a modo claro/escuro

## 🔧 Estrutura do Projeto

```
/
├── src/
│   ├── ui/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── layouts/        # Layouts base
│   │   └── styles/         # Estilos globais
│   ├── pages/              # Telas da aplicação
│   ├── context/            # Context API
│   ├── services/           # APIs e serviços
│   └── utils/              # Utilitários
├── backend/
│   ├── app/
│   │   ├── api/            # Rotas da API
│   │   ├── models/         # Modelos do banco
│   │   ├── schemas/        # Schemas Pydantic
│   │   └── core/           # Configurações
│   └── alembic/            # Migrações
└── assets/                 # Recursos estáticos
```

## 🧪 Credenciais de Teste

```
Admin:
- Email: admin@ecosolo.com
- Senha: admin123

Usuário Comum:
- Email: rodrigo.giuntini@gmail.com
- Senha: 123456

Líder Comunitário:
- Email: priya@example.com
- Senha: 123456
```

## 🌐 Endpoints da API

- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/register` - Registro
- `POST /api/v1/auth/verify-token` - Verificar token
- `GET /api/v1/users/me` - Dados do usuário
- `PUT /api/v1/users/me` - Atualizar perfil

## 📋 Status do Projeto

✅ **Concluído:**
- Sistema de autenticação completo
- Perfil de usuário editável
- Scanner QR Code funcional
- Sistema de alertas
- Design system implementado
- Backend com PostgreSQL
- Tradução para português

🔄 **Em Desenvolvimento:**
- Integração com sensores IoT
- Relatórios avançados
- Notificações push
- Modo offline completo

## 🤝 Contribuição

Este projeto segue as **Diretrizes de Qualidade Bityx** para desenvolvimento Web3 e fintech, garantindo:
- Código auditável e seguro
- Testes de cobertura completa
- Design system escalável
- Arquitetura modular
- Documentação técnica

## 📄 Licença

Projeto desenvolvido por Rodrigo,Morena,Pedro - Todos os direitos reservados.

---

**Desenvolvido com ❤️ para monitoramento ambiental sustentável** 
