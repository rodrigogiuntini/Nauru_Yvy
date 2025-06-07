import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../ui/components/Button';
import { Colors } from '../ui/design-system/tokens';
import { welcomeStyles as styles } from './WelcomeScreen.styles';

const WelcomeScreen = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  return (
    <LinearGradient
      colors={Colors.gradient.background}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo Principal */}
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>S</Text>
            </View>
          </View>

          {/* Título Principal */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Bem-vindo ao{'\n'}Naurú Yvy!</Text>
            <Text style={styles.subtitle}>
              Monitore a saúde do solo com precisão e{'\n'}facilidade.
            </Text>
          </View>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>🌱</Text>
              <Text style={styles.featureText}>Análise de Solo em Tempo Real</Text>
            </View>
            
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>📊</Text>
              <Text style={styles.featureText}>Relatórios Detalhados</Text>
            </View>
            
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>🔔</Text>
              <Text style={styles.featureText}>Alertas Inteligentes</Text>
            </View>
          </View>

          {/* Botão de Ação */}
          <View style={styles.buttonContainer}>
            <Button
              title="Começar"
              onPress={handleGetStarted}
              size="large"
              style={styles.startButton}
            />
            
            <Button
              title="Já tenho uma conta"
              onPress={() => navigation.navigate('Login')}
              variant="ghost"
              style={styles.loginButton}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default WelcomeScreen; 