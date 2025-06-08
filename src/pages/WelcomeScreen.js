import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const WelcomeScreen = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  return (
    <LinearGradient
      colors={['#000000', '#1C1C1E', '#000000']}
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView 
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo Temporário */}
          <View style={{
            alignItems: 'center',
            marginBottom: 60,
          }}>
            <Ionicons name="leaf" size={120} color="#4CAF50" />
            <Text style={{
              fontSize: 32,
              fontWeight: 'bold',
              color: '#FFFFFF',
              textAlign: 'center',
              marginTop: 20,
            }}>
              NAURÚ YVY
            </Text>
            <Text style={{
              fontSize: 16,
              color: '#8E8E93',
              textAlign: 'center',
              marginTop: 10,
            }}>
              Monitoramento Ambiental Indígena
            </Text>
          </View>

          {/* Título Principal */}
          <View style={{
            alignItems: 'center',
            marginBottom: 40,
          }}>
            <Text style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: '#FFFFFF',
              textAlign: 'center',
              lineHeight: 36,
            }}>
              Bem-vindo ao{'\n'}Naurú Yvy!
            </Text>
            <Text style={{
              fontSize: 16,
              color: '#8E8E93',
              textAlign: 'center',
              marginTop: 15,
              paddingHorizontal: 30,
            }}>
              Proteja e monitore o meio ambiente dos territórios indígenas
            </Text>
          </View>

          {/* Botões */}
          <View style={{
            width: '100%',
            alignItems: 'center',
          }}>
            <TouchableOpacity
              onPress={handleGetStarted}
              style={{
                backgroundColor: '#4CAF50',
                height: 56,
                width: '90%',
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 4,
              }}
            >
              <Text style={{
                color: '#FFFFFF',
                fontSize: 18,
                fontWeight: '600',
              }}>
                Começar
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={{
                backgroundColor: 'transparent',
                height: 48,
                width: '90%',
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{
                color: '#4CAF50',
                fontSize: 16,
                fontWeight: '500',
              }}>
                Já tenho uma conta
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default WelcomeScreen; 