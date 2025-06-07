import React, { useState } from 'react';
import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../ui/components/Button';
import Input from '../ui/components/Input';
import Header from '../ui/components/Header';
import { forgotPasswordStyles as styles } from './ForgotPasswordScreen.styles';

const ForgotPasswordScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [emailSent, setEmailSent] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendResetEmail = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      // Simular envio de email de recuperação
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setEmailSent(true);
      Alert.alert(
        'Email Enviado',
        'Um link para redefinir sua senha foi enviado para o seu email. Verifique sua caixa de entrada e spam.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
      
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao enviar o email. Tente novamente.');
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

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Esqueceu a Senha"
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
              <View style={styles.iconContainer}>
                <Text style={styles.iconText}>🔐</Text>
              </View>
              
              <Text style={styles.title}>Redefinir Senha</Text>
              <Text style={styles.subtitle}>
                Digite seu email e enviaremos um link para redefinir sua senha
              </Text>
            </View>

            {!emailSent ? (
              <>
                {/* Formulário */}
                <View style={styles.form}>
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

                  <Button
                    title="Enviar Link de Recuperação"
                    onPress={handleSendResetEmail}
                    loading={loading}
                    style={styles.sendButton}
                    size="large"
                  />
                </View>

                {/* Informações adicionais */}
                <View style={styles.infoContainer}>
                  <Text style={styles.infoTitle}>Não recebeu o email?</Text>
                  <Text style={styles.infoText}>
                    • Verifique sua caixa de spam{'\n'}
                    • Certifique-se de que digitou o email correto{'\n'}
                    • Aguarde alguns minutos e tente novamente
                  </Text>
                </View>
              </>
            ) : (
              /* Confirmação de envio */
              <View style={styles.successContainer}>
                <View style={styles.successIcon}>
                  <Text style={styles.successIconText}>✅</Text>
                </View>
                
                <Text style={styles.successTitle}>Email Enviado!</Text>
                <Text style={styles.successText}>
                  Verifique sua caixa de entrada e siga as instruções no email para redefinir sua senha.
                </Text>
                
                <Button
                  title="Voltar ao Login"
                  onPress={() => navigation.goBack()}
                  style={styles.backButton}
                  size="large"
                />
              </View>
            )}

            {/* Links */}
            <View style={styles.links}>
              <Button
                title="Lembrou da senha? Fazer login"
                variant="ghost"
                size="small"
                onPress={() => navigation.goBack()}
                style={styles.loginButton}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen; 