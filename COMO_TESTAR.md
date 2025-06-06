# 📱 Como Testar o SoloSano MVP

## ✅ Problemas Corrigidos

1. ✅ **SDK 53**: Projeto atualizado para ser compatível com Expo Go atual
2. ✅ **expo-status-bar**: Dependência adicionada
3. ✅ **Dependências**: Todas atualizadas para versões compatíveis
4. ✅ **Cache limpo**: node_modules reinstalado

## 🚀 Como Executar

### Opção 1: Expo Go (Recomendado)

1. **Abra o Expo Go** no seu celular
2. **Escaneie o QR code** que aparece no terminal
3. **Aguarde o carregamento** do bundle JavaScript

### Opção 2: Web Browser

1. **Pressione 'w'** no terminal para abrir no browser
2. **Acesse**: http://localhost:19006

### Opção 3: iOS Simulator (se tiver Xcode)

1. **Pressione 'i'** no terminal
2. **Aguarde** o simulador abrir

## 📱 Testando no Expo Go

### 1. **Instalação do Expo Go**
```bash
# iOS: App Store
# Android: Google Play Store
```

### 2. **Conectar na Mesma Rede**
- Certifique-se que seu computador e celular estão na mesma rede WiFi

### 3. **Escanear QR Code**
- **iOS**: Use a câmera nativa do iPhone
- **Android**: Use o scanner dentro do app Expo Go

## 🧪 Fluxo de Testes

### 1. **Splash Screen**
- ✅ Logo "S" aparece
- ✅ Animação de loading dots
- ✅ Redirecionamento automático

### 2. **Welcome Screen**
- ✅ Logo principal
- ✅ Features listadas
- ✅ Botões "Começar" e "Já tenho conta"

### 3. **Login Screen**
- ✅ Campos email e senha
- ✅ Credenciais de teste funcionam:
  - **Email**: priya@example.com
  - **Senha**: 123456
- ✅ Redirecionamento para Home

### 4. **Navegação por Tabs**
- ✅ **Home**: Dashboard com mapa do Brasil
- ✅ **Solo**: Análise de solo
- ✅ **Ocorrências**: Formulário de registro
- ✅ **Alertas**: Lista de notificações
- ✅ **Perfil**: Informações do usuário

### 5. **Funcionalidades**
- ✅ Autenticação persistente
- ✅ Logout funcional
- ✅ Navegação entre telas
- ✅ Formulários responsivos

## 🎨 Verificações Visuais

### ✅ Design System
- **Tema escuro** aplicado
- **Cores primárias** (#4CAF50) da Cainvest
- **Tipografia** financeira
- **Espaçamentos** 8px system
- **Gradientes** funcionando

### ✅ Componentes
- **Botões** com variantes
- **Cards** com sombras
- **Inputs** com validação
- **Modal** responsivo
- **Header** padronizado

## 🐛 Soluções para Problemas Comuns

### **"Network error" ou "Something went wrong"**
```bash
# Verifique se estão na mesma rede WiFi
# Reinicie o Expo
npx expo start --clear --reset-cache
```

### **"Unable to resolve module"**
```bash
# Limpe o cache Metro
npx expo start --clear
```

### **App não carrega no Expo Go**
```bash
# Verifique a versão do Expo Go
# Deve ser compatível com SDK 53
```

### **Erro de JavaScript**
```bash
# Verifique os logs no terminal
# Pressione 'r' para reload
```

## 📊 Performance Esperada

### ✅ Métricas
- **Startup**: < 3 segundos
- **Navegação**: Instantânea
- **Formulários**: Responsivos
- **Carregamento**: Suave

### ✅ Compatibilidade
- **iOS**: 13.0+
- **Android**: API 21+
- **Expo Go**: SDK 53
- **Web**: Chrome, Safari, Firefox

## 🎯 Próximos Testes

### Após funcionar básicamente:

1. **Registro de usuário**
2. **Persistência de dados**
3. **Validação de formulários**
4. **Estados de loading**
5. **Tratamento de erros**

## 📞 Comandos Úteis

```bash
# Iniciar projeto
npx expo start

# Limpar cache
npx expo start --clear

# Reset completo
npx expo start --clear --reset-cache

# Verificar saúde do projeto
npx expo doctor

# Ver logs detalhados
npx expo start --dev-client
```

## 🎉 Sucesso!

Se você conseguir:
- ✅ Abrir o app no Expo Go
- ✅ Ver a splash screen
- ✅ Fazer login com credenciais de teste
- ✅ Navegar entre as tabs

**Parabéns! O MVP está funcionando perfeitamente! 🚀**

---

**Status**: ✅ Pronto para testes - Compatível com Expo Go SDK 53 

# Opção 1: Docker Compose (Recomendado)
cd backend
docker-compose up -d

# Opção 2: Desenvolvimento Local
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp env_example.txt .env
# Configure .env com suas credenciais do PostgreSQL
uvicorn app.main:app --reload 