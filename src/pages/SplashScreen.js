import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { Colors } from '../ui/design-system/tokens';
import { splashStyles as styles } from './SplashScreen.styles';

const SplashScreen = ({ navigation }) => {
  const { loading, isAuthenticated } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading) {
        if (isAuthenticated) {
          navigation.replace('Main');
        } else {
          navigation.replace('Welcome');
        }
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [loading, isAuthenticated, navigation]);

  return (
    <LinearGradient
      colors={Colors.gradient.background}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.content}>
        {/* Logo/Ícone do App */}
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>S</Text>
          </View>
        </View>

        {/* Título e Subtítulo */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Naurú Yvy</Text>
          <Text style={styles.subtitle}>
            Monitore a saúde do solo com precisão e facilidade
          </Text>
        </View>

        {/* Indicador de carregamento */}
        <View style={styles.loadingContainer}>
          <View style={styles.loadingDot} />
          <View style={[styles.loadingDot, styles.loadingDotDelay1]} />
          <View style={[styles.loadingDot, styles.loadingDotDelay2]} />
        </View>
      </View>
    </LinearGradient>
  );
};

export default SplashScreen; 