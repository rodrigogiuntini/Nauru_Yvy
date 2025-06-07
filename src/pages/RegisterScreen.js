import React, { useState } from 'react';
import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Button from '../ui/components/Button';
import Input from '../ui/components/Input';
import Header from '../ui/components/Header';
import { useAuth } from '../context/AuthContext';
import { registerStyles as styles } from './RegisterScreen.styles';

const RegisterScreen = ({ navigation }) => {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    socialName: '',
    indigenousName: '',
    age: '',
    roleInVillage: '',
    village: '',
    territory: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [modalPrivacyAccepted, setModalPrivacyAccepted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }

    if (formData.age && (isNaN(formData.age) || parseInt(formData.age) < 1 || parseInt(formData.age) > 120)) {
      newErrors.age = 'Idade deve ser um número válido entre 1 e 120';
    }

    if (!privacyAccepted) {
      newErrors.privacy = 'Você deve aceitar as Políticas de Privacidade LGPD';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const result = await signUp({
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        role: 'Community Member',
        socialName: formData.socialName.trim(),
        indigenousName: formData.indigenousName.trim(),
        age: formData.age ? parseInt(formData.age) : null,
        roleInVillage: formData.roleInVillage.trim(),
        village: formData.village.trim(),
        territory: formData.territory.trim(),
        privacyAccepted: true,
      });
      
      if (result.success) {
        Alert.alert(
          'Sucesso',
          'Conta criada com sucesso!',
          [{ text: 'OK', onPress: () => navigation.replace('Main') }]
        );
      } else {
        Alert.alert('Erro', result.error);
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro inesperado');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePrivacyToggle = () => {
    if (!privacyAccepted) {
      setShowPrivacyModal(true);
    } else {
      setPrivacyAccepted(false);
      if (errors.privacy) {
        setErrors(prev => ({ ...prev, privacy: '' }));
      }
    }
  };

  const handleAcceptPrivacy = () => {
    if (modalPrivacyAccepted) {
      setPrivacyAccepted(true);
      setShowPrivacyModal(false);
      setModalPrivacyAccepted(false);
      if (errors.privacy) {
        setErrors(prev => ({ ...prev, privacy: '' }));
      }
    } else {
      Alert.alert('Atenção', 'Você deve marcar o checkbox para aceitar as políticas.');
    }
  };

  const handleCloseModal = () => {
    setShowPrivacyModal(false);
    setModalPrivacyAccepted(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Criar Conta"
        showBackButton
        navigation={navigation}
      />
      
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Cabeçalho */}
            <View style={styles.header}>
              <Text style={styles.title}>Cadastre-se</Text>
              <Text style={styles.subtitle}>
                Crie sua conta para começar a monitorar o solo
              </Text>
            </View>

            {/* Formulário */}
            <View style={styles.form}>
              {/* Informações Básicas */}
              <Text style={styles.sectionTitle}>Informações Básicas</Text>
              
              <Input
                label="Nome completo"
                placeholder="Digite seu nome"
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                error={errors.name}
                leftIcon="person-outline"
                autoCapitalize="words"
              />

              <Input
                label="Email"
                placeholder="Digite seu email"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                error={errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon="mail-outline"
              />

              <Input
                label="Senha"
                placeholder="Digite sua senha"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                error={errors.password}
                secureTextEntry
                leftIcon="lock-closed-outline"
              />

              <Input
                label="Confirmar senha"
                placeholder="Confirme sua senha"
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                error={errors.confirmPassword}
                secureTextEntry
                leftIcon="lock-closed-outline"
              />

              {/* Informações Pessoais */}
              <Text style={styles.sectionTitle}>Informações Pessoais</Text>

              <Input
                label="Nome social (se tenha)"
                placeholder="Digite seu nome social"
                value={formData.socialName}
                onChangeText={(value) => handleInputChange('socialName', value)}
                error={errors.socialName}
                autoCapitalize="words"
              />

              <Input
                label="Nome indígena (se tenha)"
                placeholder="Digite seu nome indígena"
                value={formData.indigenousName}
                onChangeText={(value) => handleInputChange('indigenousName', value)}
                error={errors.indigenousName}
                autoCapitalize="words"
              />

              <Input
                label="Idade"
                placeholder="Digite sua idade"
                value={formData.age}
                onChangeText={(value) => handleInputChange('age', value)}
                error={errors.age}
                keyboardType="numeric"
              />

              <Input
                label="Principal atuação/ função na aldeia"
                placeholder="Ex: Liderança, Educação, Saúde..."
                value={formData.roleInVillage}
                onChangeText={(value) => handleInputChange('roleInVillage', value)}
                error={errors.roleInVillage}
                autoCapitalize="words"
              />

              <Input
                label="Aldeia/ comunidade indígena"
                placeholder="Digite o nome da sua aldeia"
                value={formData.village}
                onChangeText={(value) => handleInputChange('village', value)}
                error={errors.village}
                autoCapitalize="words"
              />

              <Input
                label="Localização/ território"
                placeholder="Ex: Estado, região, território"
                value={formData.territory}
                onChangeText={(value) => handleInputChange('territory', value)}
                error={errors.territory}
                autoCapitalize="words"
              />

              {/* Políticas de Privacidade */}
              <View style={styles.privacyContainer}>
                <TouchableOpacity 
                  style={styles.privacyCheckbox} 
                  onPress={handlePrivacyToggle}
                >
                  <View style={[styles.checkbox, privacyAccepted && styles.checkboxChecked]}>
                    {privacyAccepted && (
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    )}
                  </View>
                  <Text style={styles.privacyText}>
                    Eu aceito as{' '}
                    <Text style={styles.privacyLink}>Políticas de Privacidade LGPD</Text>
                  </Text>
                </TouchableOpacity>
                {errors.privacy && (
                  <Text style={styles.errorText}>{errors.privacy}</Text>
                )}
              </View>

              <Button
                title="Criar Conta"
                onPress={handleRegister}
                loading={loading}
                style={styles.registerButton}
                size="large"
              />
            </View>

            {/* Link para login */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Já tem uma conta? </Text>
              <Button
                title="Entrar"
                variant="ghost"
                size="small"
                onPress={() => navigation.navigate('Login')}
                style={styles.loginButton}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal de Políticas de Privacidade */}
      <Modal
        visible={showPrivacyModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleCloseModal}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Políticas de Privacidade LGPD</Text>
            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#666666" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.modalSectionTitle}>Segurança e Privacidade (LGPD)</Text>
            
            <Text style={styles.modalText}>
              A plataforma Naurú Yvy está comprometida com a proteção dos seus dados pessoais e o cumprimento da Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).
            </Text>

            <Text style={styles.modalSubtitle}>Consentimento Esclarecido</Text>
            <Text style={styles.modalText}>
              • Coletamos apenas dados necessários para o funcionamento da plataforma{'\n'}
              • Você tem controle total sobre seus dados pessoais{'\n'}
              • O consentimento pode ser revogado a qualquer momento{'\n'}
              • Dados são utilizados exclusivamente para monitoramento ambiental
            </Text>

            <Text style={styles.modalSubtitle}>Dados Comunitários</Text>
            <Text style={styles.modalText}>
              • Dados comunitários são anonimizados antes do processamento{'\n'}
              • Utilizamos criptografia de ponta para proteger informações sensíveis{'\n'}
              • Territórios indígenas são identificados apenas por códigos{'\n'}
              • Informações pessoais nunca são compartilhadas publicamente
            </Text>

            <Text style={styles.modalSubtitle}>Armazenamento Seguro</Text>
            <Text style={styles.modalText}>
              • Servidores seguros com certificação internacional{'\n'}
              • Permissões de acesso hierárquico por função{'\n'}
              • Backup automático e redundância de dados{'\n'}
              • Auditoria constante de segurança
            </Text>

            <Text style={styles.modalSubtitle}>Seus Direitos</Text>
            <Text style={styles.modalText}>
              • Acesso aos seus dados pessoais{'\n'}
              • Correção de informações incorretas{'\n'}
              • Exclusão de dados (direito ao esquecimento){'\n'}
              • Portabilidade dos dados{'\n'}
              • Revogação do consentimento
            </Text>

            <Text style={styles.modalFooter}>
              Para exercer seus direitos ou esclarecer dúvidas, entre em contato através do email: privacidade@nauru-yvy.com
            </Text>
          </ScrollView>

          <View style={styles.modalFooterActions}>
            <TouchableOpacity 
              style={styles.modalCheckbox} 
              onPress={() => setModalPrivacyAccepted(!modalPrivacyAccepted)}
            >
              <View style={[styles.checkbox, modalPrivacyAccepted && styles.checkboxChecked]}>
                {modalPrivacyAccepted && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.modalCheckboxText}>
                Eu li e aceito as Políticas de Privacidade LGPD
              </Text>
            </TouchableOpacity>

            <Button
              title="Aceitar e Continuar"
              onPress={handleAcceptPrivacy}
              size="large"
              style={styles.acceptButton}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default RegisterScreen; 