import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ScrollView,
  SafeAreaView,
  Modal
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import apiService from '../services/api';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmar_senha: '',
    tipo_usuario: 'membro_comunidade',
    telefone: '',
    idade: '',
    nome_social: '',
    nome_indigena: '',
    principal_atuacao: '',
    aldeia_comunidade: '',
    localizacao_territorio: '',
    aceite_lgpd: false
  });
  const [loading, setLoading] = useState(false);
  const [showLGPDModal, setShowLGPDModal] = useState(false);
  const [showTipoUsuarioModal, setShowTipoUsuarioModal] = useState(false);

  const tiposUsuario = [
    { value: 'membro_comunidade', label: 'Membro da Comunidade' },
    { value: 'monitor_ambiental', label: 'Monitor Ambiental' },
    { value: 'lider_territorial', label: 'Líder Territorial' },
    { value: 'pesquisador', label: 'Pesquisador' }
  ];

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const selectTipoUsuario = (tipo) => {
    updateFormData('tipo_usuario', tipo.value);
    setShowTipoUsuarioModal(false);
  };

  const getTipoUsuarioLabel = () => {
    const tipo = tiposUsuario.find(t => t.value === formData.tipo_usuario);
    return tipo ? tipo.label : 'Selecione...';
  };

  const handleRegister = async () => {
    // Validações básicas
    if (!formData.nome || !formData.email || !formData.senha) {
      Alert.alert('Erro', 'Preencha os campos obrigatórios');
      return;
    }

    if (formData.senha !== formData.confirmar_senha) {
      Alert.alert('Erro', 'Senhas não conferem');
      return;
    }

    if (!formData.aceite_lgpd) {
      Alert.alert('Erro', 'É necessário aceitar as Políticas de Privacidade');
      return;
    }

    setLoading(true);
    
    try {
      console.log('🚀 Tentando cadastrar usuário:', { 
        nome: formData.nome, 
        email: formData.email,
        tipo_usuario: formData.tipo_usuario 
      });
      
      // Fazer cadastro real com a API
      const response = await apiService.register(formData);
      
      console.log('✅ Cadastro bem-sucedido:', response);
      
      Alert.alert(
        'Sucesso!', 
        'Cadastro realizado com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login')
          }
        ]
      );
    } catch (error) {
      console.error('❌ Erro no cadastro:', error);
      
      let errorMessage = 'Erro no cadastro';
      
      if (error.isNetworkError) {
        errorMessage = 'Erro de conexão. Verifique se o servidor está rodando.';
      } else if (error.status === 400 && error.message.includes('Email já cadastrado')) {
        errorMessage = 'Este email já está cadastrado. Tente fazer login.';
      } else if (error.status === 422) {
        errorMessage = 'Dados inválidos. Verifique os campos obrigatórios.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLGPDAccept = () => {
    updateFormData('aceite_lgpd', true);
    setShowLGPDModal(false);
  };

  const handleLGPDReject = () => {
    updateFormData('aceite_lgpd', false);
    setShowLGPDModal(false);
  };

  const renderLGPDModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showLGPDModal}
      onRequestClose={() => setShowLGPDModal(false)}
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}>
        <View style={{
          backgroundColor: '#1C1C1E',
          borderRadius: 16,
          padding: 24,
          width: '100%',
          maxHeight: '80%',
        }}>
          {/* Header */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}>
            <Text style={{
              color: '#FFFFFF',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
              Políticas de Privacidade LGPD
            </Text>
            <TouchableOpacity
              onPress={() => setShowLGPDModal(false)}
              style={{
                padding: 8,
              }}
            >
              <Ionicons name="close" size={24} color="#8E8E93" />
            </TouchableOpacity>
          </View>

          {/* Conteúdo */}
          <ScrollView style={{ maxHeight: 400, marginBottom: 20 }}>
            <Text style={{
              color: '#FFFFFF',
              fontSize: 16,
              lineHeight: 24,
              marginBottom: 16,
            }}>
              <Text style={{ fontWeight: 'bold' }}>Lei Geral de Proteção de Dados (LGPD){'\n\n'}</Text>
              
              <Text style={{ fontWeight: 'bold' }}>1. COLETA DE DADOS{'\n'}</Text>
              O Naurú Yvy coleta dados pessoais necessários para:
              {'\n'}• Monitoramento ambiental de territórios indígenas
              {'\n'}• Gestão de usuários e permissões
              {'\n'}• Comunicação sobre alertas ambientais
              {'\n'}• Relatórios de conservação{'\n\n'}
              
              <Text style={{ fontWeight: 'bold' }}>2. USO DOS DADOS{'\n'}</Text>
              Seus dados serão utilizados para:
              {'\n'}• Autenticação e controle de acesso
              {'\n'}• Personalização da experiência no app
              {'\n'}• Envio de notificações importantes
              {'\n'}• Análises estatísticas agregadas{'\n\n'}
              
              <Text style={{ fontWeight: 'bold' }}>3. COMPARTILHAMENTO{'\n'}</Text>
              Não compartilhamos dados pessoais com terceiros, exceto:
              {'\n'}• Quando exigido por lei
              {'\n'}• Para proteção de direitos e segurança
              {'\n'}• Com consentimento explícito do usuário{'\n\n'}
              
              <Text style={{ fontWeight: 'bold' }}>4. SEUS DIREITOS{'\n'}</Text>
              Você tem direito a:
              {'\n'}• Acessar seus dados pessoais
              {'\n'}• Corrigir informações incorretas
              {'\n'}• Solicitar exclusão de dados
              {'\n'}• Revogar consentimento a qualquer momento{'\n\n'}
              
              <Text style={{ fontWeight: 'bold' }}>5. SEGURANÇA{'\n'}</Text>
              Implementamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição.{'\n\n'}
              
              <Text style={{ fontWeight: 'bold' }}>6. CONTATO{'\n'}</Text>
              Para exercer seus direitos ou esclarecer dúvidas:
              {'\n'}• Email: privacidade@nauruyvy.com
              {'\n'}• Responsável pela proteção de dados pessoais
            </Text>
          </ScrollView>

          {/* Botões */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 12,
          }}>
            <TouchableOpacity
              onPress={handleLGPDReject}
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: '#666666',
                borderRadius: 12,
                padding: 16,
                alignItems: 'center',
              }}
            >
              <Text style={{
                color: '#666666',
                fontSize: 16,
                fontWeight: '600',
              }}>
                Não Aceito
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLGPDAccept}
              style={{
                flex: 1,
                backgroundColor: '#4CAF50',
                borderRadius: 12,
                padding: 16,
                alignItems: 'center',
              }}
            >
              <Text style={{
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: '600',
              }}>
                Aceito
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <LinearGradient
      colors={['#000000', '#1C1C1E', '#000000']}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView 
          contentContainerStyle={{
            flexGrow: 1,
            padding: 20,
          }}
        >
          {/* Header */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 30,
            marginTop: 10,
          }}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              style={{ marginRight: 15 }}
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <View>
              <Text style={{
                color: '#FFFFFF',
                fontSize: 24,
                fontWeight: 'bold',
              }}>
                Cadastro
              </Text>
              <Text style={{
                color: '#8E8E93',
                fontSize: 16,
                marginTop: 5,
              }}>
                Crie sua conta no Naurú Yvy
              </Text>
            </View>
          </View>

          {/* Informações Básicas */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{
              color: '#FFFFFF',
              fontSize: 18,
              fontWeight: '600',
              marginBottom: 15,
            }}>
              Informações Básicas
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nome completo *"
              placeholderTextColor="#666666"
              value={formData.nome}
              onChangeText={(text) => updateFormData('nome', text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Email *"
              placeholderTextColor="#666666"
              value={formData.email}
              onChangeText={(text) => updateFormData('email', text.toLowerCase())}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Senha *"
              placeholderTextColor="#666666"
              value={formData.senha}
              onChangeText={(text) => updateFormData('senha', text)}
              secureTextEntry={true}
            />

            <TextInput
              style={styles.input}
              placeholder="Confirmar senha *"
              placeholderTextColor="#666666"
              value={formData.confirmar_senha}
              onChangeText={(text) => updateFormData('confirmar_senha', text)}
              secureTextEntry={true}
            />

            {/* Tipo de Usuário */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{
                color: '#FFFFFF',
                fontSize: 14,
                marginBottom: 8,
              }}>
                Função no sistema *
              </Text>
              <TouchableOpacity
                onPress={() => setShowTipoUsuarioModal(true)}
                style={{
                  backgroundColor: '#2C2C2E',
                  borderRadius: 12,
                  padding: 16,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text style={{
                  color: '#FFFFFF',
                  fontSize: 16,
                }}>
                  {getTipoUsuarioLabel()}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#666666" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Telefone"
              placeholderTextColor="#666666"
              value={formData.telefone}
              onChangeText={(text) => updateFormData('telefone', text)}
              keyboardType="phone-pad"
            />

            <TextInput
              style={styles.input}
              placeholder="Idade"
              placeholderTextColor="#666666"
              value={formData.idade}
              onChangeText={(text) => updateFormData('idade', text)}
              keyboardType="numeric"
            />
          </View>

          {/* Informações Culturais */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{
              color: '#FFFFFF',
              fontSize: 18,
              fontWeight: '600',
              marginBottom: 15,
            }}>
              Informações Culturais
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nome social (se houver)"
              placeholderTextColor="#666666"
              value={formData.nome_social}
              onChangeText={(text) => updateFormData('nome_social', text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Nome indígena (se houver)"
              placeholderTextColor="#666666"
              value={formData.nome_indigena}
              onChangeText={(text) => updateFormData('nome_indigena', text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Principal atuação/função na aldeia"
              placeholderTextColor="#666666"
              value={formData.principal_atuacao}
              onChangeText={(text) => updateFormData('principal_atuacao', text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Aldeia/comunidade indígena"
              placeholderTextColor="#666666"
              value={formData.aldeia_comunidade}
              onChangeText={(text) => updateFormData('aldeia_comunidade', text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Localização/território"
              placeholderTextColor="#666666"
              value={formData.localizacao_territorio}
              onChangeText={(text) => updateFormData('localizacao_territorio', text)}
            />
          </View>

          {/* Aceite LGPD */}
          <TouchableOpacity
            onPress={() => setShowLGPDModal(true)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 30,
              padding: 10,
            }}
          >
            <View style={{
              width: 24,
              height: 24,
              borderWidth: 2,
              borderColor: formData.aceite_lgpd ? '#4CAF50' : '#666666',
              borderRadius: 4,
              backgroundColor: formData.aceite_lgpd ? '#4CAF50' : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}>
              {formData.aceite_lgpd && (
                <Ionicons name="checkmark" size={16} color="#FFFFFF" />
              )}
            </View>
            <Text style={{
              color: formData.aceite_lgpd ? '#4CAF50' : '#8E8E93',
              fontSize: 14,
              flex: 1,
            }}>
              {formData.aceite_lgpd ? '✓ Aceito as Políticas de Privacidade LGPD *' : 'Clique para ler as Políticas de Privacidade LGPD *'}
            </Text>
          </TouchableOpacity>

          {/* Botões */}
          <View style={{ marginBottom: 20 }}>
            <TouchableOpacity
              onPress={handleRegister}
              disabled={loading}
              style={{
                backgroundColor: '#4CAF50',
                borderRadius: 12,
                padding: 16,
                alignItems: 'center',
                marginBottom: 16,
              }}
            >
              <Text style={{
                color: '#FFFFFF',
                fontSize: 18,
                fontWeight: '600',
              }}>
                {loading ? 'Cadastrando...' : 'Criar Conta'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={{
                alignItems: 'center',
                padding: 10,
              }}
            >
              <Text style={{
                color: '#8E8E93',
                fontSize: 16,
              }}>
                Já tem conta? <Text style={{ color: '#4CAF50' }}>Entrar</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {renderLGPDModal()}
        {/* Modal Tipo de Usuário */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showTipoUsuarioModal}
          onRequestClose={() => setShowTipoUsuarioModal(false)}
        >
          <View style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}>
            <View style={{
              backgroundColor: '#1C1C1E',
              borderRadius: 16,
              padding: 24,
              width: '100%',
              maxWidth: 400,
            }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}>
                <Text style={{
                  color: '#FFFFFF',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                  Selecione sua função
                </Text>
                <TouchableOpacity
                  onPress={() => setShowTipoUsuarioModal(false)}
                  style={{ padding: 8 }}
                >
                  <Ionicons name="close" size={24} color="#8E8E93" />
                </TouchableOpacity>
              </View>

              {tiposUsuario.map((tipo) => (
                <TouchableOpacity
                  key={tipo.value}
                  onPress={() => selectTipoUsuario(tipo)}
                  style={{
                    backgroundColor: formData.tipo_usuario === tipo.value ? '#4CAF50' : '#2C2C2E',
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{
                    color: '#FFFFFF',
                    fontSize: 16,
                    flex: 1,
                  }}>
                    {tipo.label}
                  </Text>
                  {formData.tipo_usuario === tipo.value && (
                    <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = {
  input: {
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 16,
  }
};

export default RegisterScreen; 