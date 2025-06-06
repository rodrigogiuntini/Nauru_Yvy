import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../ui/components/Header';
import Card from '../ui/components/Card';
import Scanner from '../ui/components/Scanner';
import { useAlerts } from '../context/AlertsContext';
import { homeStyles as styles } from './HomeScreen.styles';

const SoilScreen = () => {
  const [showScanner, setShowScanner] = useState(false);
  const { createAlertFromOccurrence } = useAlerts();

  const parseQRCodeData = (data) => {
    try {
      // Tentar parsear como JSON
      const parsed = JSON.parse(data);
      return parsed;
    } catch {
      // Se não for JSON, tentar interpretar como texto simples
      // Formato esperado: "tipo:localização:severidade:descrição"
      const parts = data.split(':');
      if (parts.length >= 4) {
        return {
          type: parts[0],
          location: parts[1],
          severity: parts[2],
          description: parts[3]
        };
      }
      
      // Fallback: criar ocorrência genérica
      return {
        type: 'pollution',
        location: 'Local detectado via QR Code',
        severity: 'Média',
        description: `Dados escaneados: ${data}`
      };
    }
  };

  const handleScanResult = (data) => {
    console.log('QR Code escaneado:', data);
    setShowScanner(false);
    
    try {
      const occurrenceData = parseQRCodeData(data);
      const newAlert = createAlertFromOccurrence(occurrenceData);
      
      Alert.alert(
        'Ocorrência Detectada!',
        `Uma nova ocorrência foi criada automaticamente a partir do QR Code escaneado.\n\nTipo: ${newAlert.type}\nLocal: ${newAlert.location}`,
        [
          {
            text: 'Ver Alertas',
            onPress: () => {
              // Navegar para alertas se tiver navegação disponível
              console.log('Navegar para alertas');
            }
          },
          { text: 'OK' }
        ]
      );
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível processar os dados do QR Code. Verifique o formato e tente novamente.'
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Análise de Solo"
      />
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Scanner QR Code */}
        <Card style={styles.mapCard} gradient onPress={() => setShowScanner(true)}>
          <View style={styles.mapContainer}>
            <Text style={styles.mapTitle}>Scanner de QR Code</Text>
            <View style={styles.mapPlaceholder}>
              <Text style={styles.mapIcon}>📱</Text>
              <Text style={styles.mapText}>Escaneie para detectar ocorrências</Text>
            </View>
          </View>
        </Card>

        {/* Modal do Scanner */}
        <Modal
          visible={showScanner}
          animationType="slide"
          presentationStyle="fullScreen"
        >
          <Scanner
            onScan={handleScanResult}
            onClose={() => setShowScanner(false)}
          />
        </Modal>

        {/* Análise de Solo */}
        <Card style={styles.soilCard}>
          <View style={styles.soilHeader}>
            <Text style={styles.sectionTitle}>Análise do Solo</Text>
            <View style={styles.soilBadge}>
              <Text style={styles.soilBadgeText}>Atualizado</Text>
            </View>
          </View>
          
          <View style={styles.soilContent}>
            <View style={styles.soilImageContainer}>
              <Text style={styles.soilEmoji}>🌱</Text>
            </View>
            
            <View style={styles.soilDetails}>
              <Text style={styles.soilType}>Tipo: Argiloso</Text>
              <Text style={styles.soilInfo}>Umidade: 25%</Text>
              <Text style={styles.soilInfo}>Textura: Fina</Text>
              <Text style={styles.soilInfo}>Retenção de Água: Alta</Text>
              <Text style={styles.soilInfo}>Fertilidade: Moderada</Text>
              <Text style={styles.soilInfo}>Drenagem: Boa</Text>
            </View>
          </View>
        </Card>

        {/* Cards de Status */}
        <View style={styles.statusCards}>
          <Card style={[styles.statusCard, styles.statusSuccess]} onPress={() => {}}>
            <Text style={styles.statusIcon}>💧</Text>
            <Text style={styles.statusLabel}>Umidade</Text>
            <Text style={styles.statusValue}>25%</Text>
          </Card>
          
          <Card style={[styles.statusCard, styles.statusWarning]} onPress={() => {}}>
            <Text style={styles.statusIcon}>🌡️</Text>
            <Text style={styles.statusLabel}>Temperatura</Text>
            <Text style={styles.statusValue}>23°C</Text>
          </Card>
        </View>

        <View style={styles.statusCards}>
          <Card style={[styles.statusCard, styles.statusInfo]} onPress={() => {}}>
            <Text style={styles.statusIcon}>🧪</Text>
            <Text style={styles.statusLabel}>pH</Text>
            <Text style={styles.statusValue}>6.8</Text>
          </Card>
          
          <Card style={[styles.statusCard, styles.statusError]} onPress={() => {}}>
            <Text style={styles.statusIcon}>🌿</Text>
            <Text style={styles.statusLabel}>Nutrientes</Text>
            <Text style={styles.statusValue}>Baixo</Text>
          </Card>
        </View>

        {/* Últimas Análises */}
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Análises Recentes</Text>
          
          <Card style={styles.recentCard} onPress={() => {}}>
            <View style={styles.recentItem}>
              <Text style={styles.recentIcon}>📊</Text>
              <View style={styles.recentDetails}>
                <Text style={styles.recentTitle}>Análise Completa - Sector A</Text>
                <Text style={styles.recentDate}>Hoje, 14:30</Text>
              </View>
              <View style={styles.recentStatus}>
                <Text style={styles.recentStatusText}>Concluído</Text>
              </View>
            </View>
          </Card>

          <Card style={styles.recentCard} onPress={() => {}}>
            <View style={styles.recentItem}>
              <Text style={styles.recentIcon}>🔬</Text>
              <View style={styles.recentDetails}>
                <Text style={styles.recentTitle}>Teste de Fertilidade</Text>
                <Text style={styles.recentDate}>Ontem, 09:15</Text>
              </View>
              <View style={styles.recentStatus}>
                <Text style={styles.recentStatusText}>Processando</Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SoilScreen; 