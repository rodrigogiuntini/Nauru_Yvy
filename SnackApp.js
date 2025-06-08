import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Alert,
  TextInput,
  Image
} from 'react-native';

const NauruYvyApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: ''
  });

  const territories = [
    { name: 'Aldeia Jaraguá', status: 'Monitorado', type: 'Guarani' },
    { name: 'Guarani Nhandeva', status: 'Ativo', type: 'Guarani' },
    { name: 'Parelheiros', status: 'Alerta', type: 'Guarani' },
    { name: 'Tenondé Porã', status: 'Monitorado', type: 'Guarani' },
    { name: 'Tekoa Pyau', status: 'Ativo', type: 'Guarani' }
  ];

  const alerts = [
    { id: 1, title: 'Risco Crítico de Erosão', level: 'Alto', date: '20/06/2025' },
    { id: 2, title: 'Risco Médio Contaminação', level: 'Médio', date: '19/06/2025' },
    { id: 3, title: 'Risco Alto de Erosão', level: 'Alto', date: '18/06/2025' }
  ];

  const HomeScreen = () => (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Naurú Yvy</Text>
        <Text style={styles.subtitle}>Scanner de Solo via Drone para Monitoramento Ambiental em Territórios Indígenas</Text>
      </View>

      <View style={styles.mapContainer}>
        <Text style={styles.mapTitle}>🗺️ Mapa do Brasil</Text>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>Territórios Monitorados</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Territórios Indígenas</Text>
        {territories.map((territory, index) => (
          <View key={index} style={styles.territoryCard}>
            <View style={styles.territoryInfo}>
              <Text style={styles.territoryName}>{territory.name}</Text>
              <Text style={styles.territoryType}>{territory.type}</Text>
              <Text style={[styles.territoryStatus, { color: getStatusColor(territory.status) }]}>
                {territory.status}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const AlertsScreen = () => (
    <ScrollView style={styles.container}>
      <Text style={styles.screenTitle}>Alertas</Text>
      
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Tipo 🔽</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Data 📅</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Limpar 🧹</Text>
        </TouchableOpacity>
      </View>

      {alerts.map((alert) => (
        <View key={alert.id} style={styles.alertCard}>
          <View style={styles.alertHeader}>
            <Text style={styles.alertIcon}>⚠️</Text>
            <View style={styles.alertInfo}>
              <Text style={styles.alertTitle}>{alert.title}</Text>
              <Text style={styles.alertDate}>Nos próximos 20 dias</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.alertButton}>
            <Text style={styles.alertButtonText}>Detalhes</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );

  const SoilScreen = () => (
    <ScrollView style={styles.container}>
      <Text style={styles.screenTitle}>Análise de Solo</Text>
      
      <View style={styles.mapContainer}>
        <Text style={styles.mapTitle}>🗺️ Territórios Monitorados</Text>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>Solo Monitorado</Text>
        </View>
      </View>

      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Umidade</Text>
          <Text style={styles.metricValue}>75%</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Temperatura</Text>
          <Text style={styles.metricValue}>24°C</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>pH</Text>
          <Text style={styles.metricValue}>6.8</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Nutrientes</Text>
          <Text style={styles.metricValue}>Bom</Text>
        </View>
      </View>
    </ScrollView>
  );

  const ProfileScreen = () => (
    <ScrollView style={styles.container}>
      <Text style={styles.screenTitle}>Perfil</Text>
      
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👩🏻</Text>
        </View>
        <Text style={styles.profileName}>Priya Patel</Text>
        <Text style={styles.profileRole}>Líder Comunitário</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações Pessoais</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Nome social"
          value={formData.nome}
          onChangeText={(text) => setFormData({...formData, nome: text})}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ativo': return '#22C55E';
      case 'Alerta': return '#EF4444';
      default: return '#22C55E';
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'alerts': return <AlertsScreen />;
      case 'soil': return <SoilScreen />;
      case 'profile': return <ProfileScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.app}>
      {renderScreen()}
      
      <View style={styles.navbar}>
        <TouchableOpacity 
          style={[styles.navButton, currentScreen === 'home' && styles.navButtonActive]}
          onPress={() => setCurrentScreen('home')}
        >
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navButton, currentScreen === 'alerts' && styles.navButtonActive]}
          onPress={() => setCurrentScreen('alerts')}
        >
          <Text style={styles.navIcon}>🚨</Text>
          <Text style={styles.navText}>Alertas</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navButton, currentScreen === 'soil' && styles.navButtonActive]}
          onPress={() => setCurrentScreen('soil')}
        >
          <Text style={styles.navIcon}>🌱</Text>
          <Text style={styles.navText}>Solo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navButton, currentScreen === 'profile' && styles.navButtonActive]}
          onPress={() => setCurrentScreen('profile')}
        >
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginVertical: 20,
  },
  mapContainer: {
    backgroundColor: '#4ECDC4',
    borderRadius: 12,
    padding: 20,
    marginVertical: 16,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
  },
  mapPlaceholder: {
    height: 120,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    color: '#000000',
    fontWeight: '500',
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  territoryCard: {
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  territoryInfo: {
    flex: 1,
  },
  territoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  territoryType: {
    fontSize: 14,
    color: '#CCCCCC',
    marginTop: 4,
  },
  territoryStatus: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '500',
  },
  alertCard: {
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  alertIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  alertInfo: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  alertDate: {
    fontSize: 12,
    color: '#CCCCCC',
    marginTop: 4,
  },
  alertButton: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  alertButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '500',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  metricCard: {
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    borderLeftWidth: 4,
    borderLeftColor: '#22C55E',
  },
  metricTitle: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F5E6D3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 40,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileRole: {
    fontSize: 16,
    color: '#CCCCCC',
    marginTop: 4,
  },
  input: {
    backgroundColor: '#1F1F1F',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    color: '#FFFFFF',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    flexDirection: 'row',
    backgroundColor: '#1F1F1F',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  navButtonActive: {
    backgroundColor: '#22C55E',
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    color: '#CCCCCC',
  },
});

export default NauruYvyApp; 