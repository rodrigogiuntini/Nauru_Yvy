import React, { useState } from 'react';
import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../ui/components/Button';
import Input from '../ui/components/Input';
import Header from '../ui/components/Header';
import { useAuth } from '../context/AuthContext';
import { loginStyles as styles } from './LoginScreen.styles';

const LoginScreen = ({ navigation }) => {
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const result = await signIn(formData.email, formData.password);
      
      if (result.success) {
        navigation.replace('Main');
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

  return (
    <SafeAreaView style={styles.container}>
      <Header
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
              <Text style={styles.title}>Entrar</Text>
              <Text style={styles.subtitle}>
                Acesse sua conta para continuar monitorando
              </Text>
            </View>

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

              <Input
                label="Senha"
                placeholder="Digite sua senha"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                error={errors.password}
                secureTextEntry
                leftIcon="lock-closed-outline"
              />

              <Button
                title="Entrar"
                onPress={handleLogin}
                loading={loading}
                style={styles.loginButton}
                size="large"
              />
            </View>

            {/* Credenciais de teste */}
            <View style={styles.testCredentials}>
              <Text style={styles.testTitle}>Credenciais de Teste:</Text>
              <Text style={styles.testText}>Email: priya@example.com</Text>
              <Text style={styles.testText}>Senha: 123456</Text>
            </View>

            {/* Links */}
            <View style={styles.links}>
              <Button
                title="Esqueceu a senha?"
                variant="ghost"
                size="small"
                onPress={() => navigation.navigate('ForgotPassword')}
              />
              
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Não tem uma conta? </Text>
                <Button
                  title="Cadastre-se"
                  variant="ghost"
                  size="small"
                  onPress={() => navigation.navigate('Register')}
                  style={styles.signupButton}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen; 