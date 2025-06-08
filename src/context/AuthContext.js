import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('@SoloSano:user');
      const storedToken = await AsyncStorage.getItem('@SoloSano:token');
      
      console.log('🔍 Carregando usuário armazenado...', { 
        hasUser: !!storedUser, 
        hasToken: !!storedToken 
      });
      
      if (storedUser && storedToken) {
        const parsedUser = JSON.parse(storedUser);
        console.log('✅ Dados encontrados no storage:');
        console.log('👤 Usuário:', parsedUser);
        console.log('🔑 Token:', storedToken);
        
        setUser(parsedUser);
        setToken(storedToken);
        console.log('✅ Usuário e token carregados do storage');
      } else {
        console.log('❌ Nenhum usuário ou token encontrado no storage');
        console.log('📱 Dados no storage:', { storedUser, storedToken });
      }
    } catch (error) {
      console.error('Erro ao carregar usuário armazenado:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, senha) => {
    try {
      console.log('🔐 Tentando login para:', email);
      
      // Chamar API de login
      const response = await apiService.login(email, senha);
      
      if (response.access_token) {
        console.log('✅ Token recebido:', response.access_token);
        
        // Usar dados do usuário que já vêm na resposta do login
        if (response.user_info) {
          console.log('✅ Dados do usuário recebidos:', response.user_info);
          
          // Função para traduzir tipos de usuário
          const translateUserType = (tipo) => {
            const typeTranslations = {
              'administrador': 'Administrador',
              'lider_territorial': 'Líder Territorial',
              'monitor_ambiental': 'Monitor Ambiental',
              'membro_comunidade': 'Membro da Comunidade',
              'pesquisador': 'Pesquisador'
            };
            return typeTranslations[tipo] || 'Usuário';
          };

          const userInfo = {
            id: response.user_info.id,
            email: response.user_info.email,
            name: response.user_info.nome || 'Usuário',
            role: translateUserType(response.user_info.tipo_usuario),
            age: response.user_info.idade,
            bio: response.user_info.principal_atuacao || '',
            nome_social: response.user_info.nome_social || '',
            nome_indigena: response.user_info.nome_indigena || '',
            aldeia_comunidade: response.user_info.aldeia_comunidade || '',
            localizacao_territorio: response.user_info.localizacao_territorio || '',
            telefone: response.user_info.telefone || '',
            tipo_usuario: response.user_info.tipo_usuario
          };
          
          console.log('🔄 Salvando dados no contexto...');
          console.log('📝 User Info a ser salvo:', userInfo);
          
          // Armazenar token e usuário
          setToken(response.access_token);
          setUser(userInfo);
          
          console.log('💾 Salvando no AsyncStorage...');
          await AsyncStorage.setItem('@SoloSano:token', response.access_token);
          await AsyncStorage.setItem('@SoloSano:user', JSON.stringify(userInfo));
          
          console.log('✅ Login realizado com sucesso! Dados salvos.');
          console.log('👤 Usuário atual no contexto:', userInfo);
          console.log('🔑 Token atual no contexto:', response.access_token);
          
          return { success: true };
        } else {
          // Fallback: criar usuário básico se não há user_info
          console.log('⚠️ Nenhuma informação de usuário recebida, usando dados básicos');
          
          const basicUserInfo = {
            id: Date.now(),
            email: email,
            name: 'Usuário',
            role: 'Membro da Comunidade',
          };
          
          setToken(response.access_token);
          setUser(basicUserInfo);
          await AsyncStorage.setItem('@SoloSano:token', response.access_token);
          await AsyncStorage.setItem('@SoloSano:user', JSON.stringify(basicUserInfo));
          
          return { success: true };
        }
      }
      
      throw new Error('Falha na autenticação');
    } catch (error) {
      console.log('❌ Erro no login:', error.message);
      
      // Para erros de credenciais (401) ou outros erros da API
      if (error.status === 401) {
        return { 
          success: false, 
          error: 'Email ou senha incorretos'
        };
      }
      
      // Para erros de rede
      if (error.isNetworkError) {
        return { 
          success: false, 
          error: 'Erro de conexão. Verifique sua internet e tente novamente.'
        };
      }
      
      return { 
        success: false, 
        error: error.message || 'Erro no login'
      };
    }
  };

  const signUp = async (userData) => {
    try {
      console.log('📝 Tentando registrar usuário:', userData.email);
      
      // Preparar dados para registro conforme o backend espera
      const registerData = {
        nome: userData.nome,
        email: userData.email,
        senha: userData.senha,
        tipo_usuario: userData.tipo_usuario || 'membro_comunidade',
        telefone: userData.telefone || '',
        territorio_id: userData.territorio_id || 1,
        nome_social: userData.nome_social || '',
        nome_indigena: userData.nome_indigena || '',
        idade: userData.idade ? parseInt(userData.idade) : null,
        principal_atuacao: userData.principal_atuacao || '',
        aldeia_comunidade: userData.aldeia_comunidade || '',
        localizacao_territorio: userData.localizacao_territorio || '',
        aceite_lgpd: userData.aceite_lgpd || false
      };

      console.log('📤 Enviando dados de registro:', registerData);

      // Chamar API de registro
      const response = await apiService.register(registerData);
      
      console.log('✅ Usuário registrado com sucesso:', response);
      
      if (response.id) {
        // Fazer login automático após registro
        console.log('🔄 Fazendo login automático...');
        const loginResult = await signIn(userData.email, userData.senha);
        return loginResult;
      }
      
      throw new Error('Falha no registro - resposta inválida do servidor');
    } catch (error) {
      console.error('❌ Erro no registro:', error);
      
      // Para erros de rede
      if (error.isNetworkError) {
        return { 
          success: false, 
          error: 'Erro de conexão. Verifique sua internet e tente novamente.'
        };
      }
      
      // Para erros de validação (422) ou outros erros da API
      if (error.status === 422) {
        return { 
          success: false, 
          error: 'Dados inválidos. Verifique as informações fornecidas.'
        };
      }
      
      if (error.status === 409) {
        return { 
          success: false, 
          error: 'Este email já está em uso.'
        };
      }
      
      // Tratar casos onde error.message pode ser um objeto
      let errorMessage = 'Erro ao criar conta';
      if (error.message && typeof error.message === 'string') {
        errorMessage = error.message;
      } else if (error.data && error.data.detail) {
        if (Array.isArray(error.data.detail)) {
          errorMessage = error.data.detail.map(d => d.msg).join(', ');
        } else {
          errorMessage = error.data.detail;
        }
      }
      
      return { 
        success: false, 
        error: errorMessage
      };
    }
  };

  const signOut = async (navigation = null) => {
    try {
      // Chamar logout da API para invalidar token
      if (token) {
        await apiService.logout();
      }
      
      setUser(null);
      setToken(null);
      await AsyncStorage.removeItem('@SoloSano:user');
      await AsyncStorage.removeItem('@SoloSano:token');
      
      console.log('✅ Logout realizado com sucesso');
      
      // Se a navegação foi fornecida, navegar para a tela de login
      if (navigation) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const updateProfile = async (updatedData) => {
    try {
      console.log('🔄 Atualizando perfil do usuário:', updatedData);
      
      // Por enquanto, vamos atualizar apenas localmente até resolver a autenticação do backend
      console.warn('⚠️ Atualizando perfil localmente (backend em desenvolvimento)');
      
      const updatedUser = { ...user, ...updatedData };
      setUser(updatedUser);
      await AsyncStorage.setItem('@SoloSano:user', JSON.stringify(updatedUser));
      
      console.log('✅ Perfil atualizado localmente:', updatedUser);
      return { success: true };
      
      // TODO: Implementar chamada para API quando autenticação estiver funcionando
      /*
      try {
        const response = await apiService.updateProfile(updatedData);
        console.log('✅ Perfil atualizado no backend:', response);
        
        // Atualizar dados locais com a resposta do backend
        const updatedUser = { ...user, ...response };
        setUser(updatedUser);
        await AsyncStorage.setItem('@SoloSano:user', JSON.stringify(updatedUser));
        
        return { success: true };
      } catch (apiError) {
        console.warn('⚠️ Falha na atualização via API, atualizando localmente:', apiError);
        
        // Se for erro de rede, atualizar localmente
        if (apiError.isNetworkError) {
          const updatedUser = { ...user, ...updatedData };
          setUser(updatedUser);
          await AsyncStorage.setItem('@SoloSano:user', JSON.stringify(updatedUser));
          
          return { success: true };
        }
        
        // Para outros erros, retornar falha
        throw apiError;
      }
      */
    } catch (error) {
      console.error('❌ Erro ao atualizar perfil:', error);
      return { 
        success: false, 
        error: error.message || 'Erro ao atualizar perfil'
      };
    }
  };

  const value = {
    user,
    token,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext }; 