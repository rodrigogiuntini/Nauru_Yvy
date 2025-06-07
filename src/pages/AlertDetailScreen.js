import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../ui/components/Header';
import { alertDetailStyles as styles } from './AlertDetailScreen.styles';

const AlertDetailScreen = ({ navigation, route }) => {
  const { alert } = route.params || {};

  const handleMarkResolved = () => {
    console.log('Marcar como resolvido');
    // Implementar lógica para marcar como resolvido
    navigation.goBack();
  };

  const handleContactAuthority = () => {
    console.log('Contactar autoridade');
    // Implementar lógica para contactar autoridade
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Detalhes do Alerta"
        showBackButton
        navigation={navigation}
      />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Data e Hora */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Data e Hora</Text>
          <Text style={styles.sectionValue}>20 de outubro de 2024, 14:30</Text>
        </View>

        {/* Localização */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Localização</Text>
          <Text style={styles.sectionValue}>Aldeia Yanomami, Acre</Text>
        </View>

        {/* Mapa */}
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <View style={styles.mapArea}>
              <Text style={styles.mapText}>🗺️</Text>
            </View>
          </View>
        </View>

        {/* Severidade */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Severidade</Text>
          <View style={styles.severityBadge}>
            <Text style={styles.severityIcon}>⚠️</Text>
            <Text style={styles.severityText}>Alta</Text>
          </View>
        </View>

        {/* Descrição */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Descrição</Text>
          <Text style={styles.descriptionText}>
            Desmatamento detectado próximo à área de cultivo. Árvores derrubadas e solo exposto. 
            Possível atividade ilegal em andamento.
          </Text>
        </View>

        {/* Imagens */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Imagens</Text>
          <View style={styles.imagesContainer}>
            <View style={styles.imageContainer}>
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imageIcon}>🌲</Text>
              </View>
            </View>
            <View style={styles.imageContainer}>
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imageIcon}>🏞️</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Botões de Ação */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.resolvedButton}
            onPress={handleMarkResolved}
          >
            <Text style={styles.resolvedIcon}>✅</Text>
            <Text style={styles.resolvedButtonText}>Marcar como Resolvido</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.contactButton}
            onPress={handleContactAuthority}
          >
            <Text style={styles.contactIcon}>📞</Text>
            <Text style={styles.contactButtonText}>Contactar Autoridade</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AlertDetailScreen; 