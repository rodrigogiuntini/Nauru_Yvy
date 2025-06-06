import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiService from '../services/api';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('@SoloSano:user');
      const token = await AsyncStorage.getItem('@SoloSano:token');
      
      if (storedUser && token) {
        try {
          // Verificar se o token ainda é válido
          const response = await ApiService.verifyToken();
          if (response.valid) {
            setUser(JSON.parse(storedUser));
          } else {
            // Token inválido, limpar dados
            await AsyncStorage.removeItem('@SoloSano:user');
            await AsyncStorage.removeItem('@SoloSano:token');
          }
        } catch (error) {
          // Erro na verificação, usar dados locais
          setUser(JSON.parse(storedUser));
        }
      }
    } catch (error) {
      console.error('Erro ao carregar usuário armazenado:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      console.log('🔐 Tentando login para:', email);
      
      // Chamar API de login
      const response = await ApiService.login(email, password);
      
      if (response.access_token) {
        console.log('✅ Token recebido, obtendo dados do usuário...');
        
        try {
          // Obter dados do usuário
          const userData = await ApiService.getCurrentUser();
          
          // Função para traduzir roles
          const translateRole = (role) => {
            const roleTranslations = {
              'admin': 'Administrador',
              'community_leader': 'Líder Comunitário', 
              'community_member': 'Membro da Comunidade',
              'researcher': 'Pesquisador'
            };
            return roleTranslations[role] || 'Membro da Comunidade';
          };

          const userInfo = {
            id: userData.user_id,
            email: userData.email,
            name: userData.name || 'Usuário',
            role: translateRole(userData.role),
            age: userData.age,
            bio: userData.bio,
          };
          
          setUser(userInfo);
          await AsyncStorage.setItem('@SoloSano:user', JSON.stringify(userInfo));
          
          console.log('✅ Login realizado com sucesso!');
          return { success: true };
        } catch (userError) {
          console.log('⚠️ Erro ao obter dados do usuário, usando dados básicos');
          
          // Se falhar ao obter dados do usuário, criar um usuário básico
          const basicUserInfo = {
            id: Date.now(), // ID temporário
            email: email,
            name: 'Usuário',
            role: 'Membro da Comunidade',
          };
          
          setUser(basicUserInfo);
          await AsyncStorage.setItem('@SoloSano:user', JSON.stringify(basicUserInfo));
          
          return { success: true };
        }
      }
      
      throw new Error('Falha na autenticação');
    } catch (error) {
      console.log('❌ Erro no login:', error.message);
      
      // Se for erro de rede, usar modo offline
      if (error.isNetworkError) {
        console.warn('🌐 Erro de rede detectado, usando modo offline');
        
        // Credenciais de teste para desenvolvimento
        const testCredentials = [
          { email: 'admin@ecosolo.com', password: 'admin123', name: 'Admin EcoSolo', role: 'Administrador' },
          { email: 'priya@example.com', password: '123456', name: 'Priya Santos', role: 'Líder Comunitário' },
          { email: 'joao.silva@ecosolo.com', password: '123456', name: 'João Silva', role: 'Membro da Comunidade' },
          { email: 'maria.oliveira@ecosolo.com', password: '123456', name: 'Maria Oliveira', role: 'Pesquisador' },
        ];
        
        const testUser = testCredentials.find(u => u.email === email && u.password === password);
        
        if (testUser) {
          const userInfo = {
            id: Date.now(),
            email: testUser.email,
            name: testUser.name,
            role: testUser.role,
            age: 35,
            bio: 'Usuário de teste (modo offline)',
          };
          
          setUser(userInfo);
          await AsyncStorage.setItem('@SoloSano:user', JSON.stringify(userInfo));
          
          console.log('✅ Login offline realizado com sucesso!');
          return { success: true };
        } else {
          return { 
            success: false, 
            error: 'Credenciais inválidas (modo offline)'
          };
        }
      }
      
      // Para erros de credenciais (401) ou outros erros da API
      if (error.status === 401) {
        return { 
          success: false, 
          error: 'Email ou senha incorretos'
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
      
      // Preparar dados para registro
      const registerData = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: 'community_member', // Usar enum correto do backend
        age: userData.age || null,
        bio: userData.bio || null,
      };

      console.log('📤 Enviando dados de registro:', registerData);

      // Chamar API de registro
      const response = await ApiService.register(registerData);
      
      console.log('✅ Usuário registrado com sucesso:', response);
      
      if (response.id) {
        // Fazer login automático após registro
        console.log('🔄 Fazendo login automático...');
        const loginResult = await signIn(userData.email, userData.password);
        return loginResult;
      }
      
      throw new Error('Falha no registro - resposta inválida do servidor');
    } catch (error) {
      console.error('❌ Erro no registro:', error);
      
      // Se for erro de rede, usar modo offline
      if (error.isNetworkError) {
        console.warn('🌐 Erro de rede detectado no registro, usando modo offline');
        
        // Simular registro local em modo offline
        const userInfo = {
          id: Date.now(),
          email: userData.email,
          name: userData.name,
          role: 'Membro da Comunidade',
          age: userData.age,
          bio: userData.bio || 'Usuário registrado offline',
        };
        
        setUser(userInfo);
        await AsyncStorage.setItem('@SoloSano:user', JSON.stringify(userInfo));
        
        console.log('✅ Registro offline realizado com sucesso!');
        return { success: true };
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
      await ApiService.logout();
      
      setUser(null);
      await AsyncStorage.removeItem('@SoloSano:user');
      await AsyncStorage.removeItem('@SoloSano:token');
      
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
        const response = await ApiService.updateProfile(updatedData);
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