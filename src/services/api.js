// Para dispositivos móveis, usar o IP da máquina em vez de localhost
const API_BASE_URL = 'http://192.168.0.24:8000/api/v1';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async healthCheck() {
    console.log('🔗 Fazendo requisição: GET', `${this.baseURL}/auth/health`);
    try {
      const response = await this.request('/auth/health', {
        method: 'GET',
      });
      console.log('🏥 Health check:', response);
      console.log('✅ API está funcionando');
      return response;
    } catch (error) {
      console.error('❌ Health check falhou:', error);
      console.warn('⚠️ API indisponível, modo offline ativado');
      throw error;
    }
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Adicionar token de autorização se disponível
    const token = await this.getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      console.log('🔗 Fazendo requisição:', options.method || 'GET', url);
      
      // Criar promise com timeout manual para React Native
      const fetchPromise = fetch(url, config);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), 15000)
      );
      
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || errorData.detail || `HTTP ${response.status}: ${response.statusText}`;
        
        // Criar erro com informações detalhadas
        const error = new Error(errorMessage);
        error.status = response.status;
        error.data = errorData;
        
        throw error;
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return await response.text();
    } catch (error) {
      console.error('❌ Erro na requisição', endpoint + ':', error);
      
      // Se for erro de rede (não conseguiu fazer a requisição)
      if (error.message.includes('Network request failed') || 
          error.message.includes('Request timeout') ||
          error.message.includes('fetch') ||
          error.name === 'TypeError' ||
          error.code === 'NETWORK_ERROR' ||
          !error.status) {
        const networkError = new Error('Erro de conexão. Verifique sua internet e se o servidor está rodando.');
        networkError.isNetworkError = true;
        throw networkError;
      }
      
      // Para outros erros (incluindo 401, 404, 500, etc.), manter original
      throw error;
    }
  }

  async getStoredToken() {
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      const token = await AsyncStorage.getItem('@SoloSano:token');
      return token;
    } catch (error) {
      console.error('Error getting stored token:', error);
      return null;
    }
  }

  async setStoredToken(token) {
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      await AsyncStorage.setItem('@SoloSano:token', token);
    } catch (error) {
      console.error('Error storing token:', error);
    }
  }

  async removeStoredToken() {
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      await AsyncStorage.removeItem('@SoloSano:token');
    } catch (error) {
      console.error('Error removing token:', error);
    }
  }

  // Métodos de Autenticação
  async login(email, senha) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    });

    if (response.access_token) {
      await this.setStoredToken(response.access_token);
    }

    return response;
  }

  async register(userData) {
    try {
      const response = await this.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      return response;
    } catch (error) {
      // Para registro, é importante passar os detalhes de validação
      if (error.status === 422 && error.data && error.data.detail) {
        // Criar um erro mais amigável para problemas de validação
        const validationError = new Error('Erro de validação');
        validationError.status = 422;
        validationError.data = error.data;
        validationError.validationDetails = error.data.detail;
        throw validationError;
      }
      
      throw error;
    }
  }

  async refreshToken() {
    const response = await this.request('/auth/refresh', {
      method: 'POST',
    });

    if (response.access_token) {
      await this.setStoredToken(response.access_token);
    }

    return response;
  }

  async verifyToken() {
    return await this.request('/auth/verify-token', {
      method: 'POST',
    });
  }

  async logout() {
    await this.removeStoredToken();
  }

  // Métodos de Usuário
  async getCurrentUser() {
    return await this.request('/auth/me', {
      method: 'GET',
    });
  }

  async updateProfile(userData) {
    return await this.request('/auth/update-profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Métodos de Análise de Solo
  async getSoilAnalyses() {
    return await this.request('/soil-analyses');
  }

  async createSoilAnalysis(analysisData) {
    return await this.request('/soil-analyses', {
      method: 'POST',
      body: JSON.stringify(analysisData),
    });
  }

  // Métodos de Ocorrências
  async getOccurrences() {
    return await this.request('/occurrences/');
  }

  async createOccurrence(occurrenceData) {
    return await this.request('/occurrences/', {
      method: 'POST',
      body: JSON.stringify(occurrenceData),
    });
  }

  async getUserOccurrences() {
    return await this.request('/occurrences/', {
      method: 'GET',
    });
  }

  async getOccurrenceStats() {
    return await this.request('/occurrences/stats/', {
      method: 'GET',
    });
  }

  // Métodos de Perfil
  async getUserProfile() {
    return await this.request('/auth/me', {
      method: 'GET',
    });
  }

  async updateUserProfile(profileData) {
    return await this.request('/auth/update-profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Métodos de Alertas
  async getAlerts() {
    return await this.request('/alerts');
  }

  async createAlert(alertData) {
    return await this.request('/alerts', {
      method: 'POST',
      body: JSON.stringify(alertData),
    });
  }
}

export default new ApiService(); 