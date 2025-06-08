import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha email e senha');
      return;
    }

    setLoading(true);
    
    try {
      console.log('🚀 Tentando fazer login com:', { email });
      
      // Usar o signIn do AuthContext
      const result = await signIn(email, senha);
      
      if (result.success) {
        console.log('✅ Login bem-sucedido via AuthContext');
        
        Alert.alert(
          'Sucesso!', 
          'Login realizado com sucesso!',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Main')
            }
          ]
        );
      } else {
        throw new Error(result.error || 'Erro no login');
      }
    } catch (error) {
      console.error('❌ Erro no login:', error);
      
      let errorMessage = 'Erro no login';
      
      if (error.message) {
        errorMessage = error.message;
      }
      
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#000000', '#1C1C1E', '#000000']}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView 
          contentContainerStyle={{
            flex: 1,
            padding: 20,
            justifyContent: 'center',
          }}
        >
          {/* Header */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 40,
          }}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              style={{
                marginRight: 15,
              }}
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <View>
              <Text style={{
                color: '#FFFFFF',
                fontSize: 24,
                fontWeight: 'bold',
              }}>
                Entrar
              </Text>
              <Text style={{
                color: '#8E8E93',
                fontSize: 16,
                marginTop: 5,
              }}>
                Acesse sua conta no Naurú Yvy
              </Text>
            </View>
          </View>

          {/* Formulário */}
          <View style={{ marginBottom: 30 }}>
            {/* Email */}
            <TextInput
              style={{
                backgroundColor: '#2C2C2E',
                borderRadius: 12,
                padding: 16,
                color: '#FFFFFF',
                fontSize: 16,
                marginBottom: 16,
              }}
              placeholder="Email"
              placeholderTextColor="#666666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* Senha */}
            <TextInput
              style={{
                backgroundColor: '#2C2C2E',
                borderRadius: 12,
                padding: 16,
                color: '#FFFFFF',
                fontSize: 16,
                marginBottom: 20,
              }}
              placeholder="Senha"
              placeholderTextColor="#666666"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={true}
            />

            {/* Botão Login */}
            <TouchableOpacity
              onPress={handleLogin}
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
                {loading ? 'Entrando...' : 'Entrar'}
              </Text>
            </TouchableOpacity>

            {/* Botão Cadastro */}
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              style={{
                alignItems: 'center',
                padding: 10,
              }}
            >
              <Text style={{
                color: '#8E8E93',
                fontSize: 16,
              }}>
                Não tem conta? <Text style={{ color: '#4CAF50' }}>Cadastre-se</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen; 