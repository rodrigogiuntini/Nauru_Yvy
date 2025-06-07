import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../ui/components/Header';
import { alertsStyles as styles } from './AlertsScreen.styles';

const AlertsScreen = ({ navigation }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    type: false,
    date: false
  });

  const alerts = [
    {
      id: 1,
      type: 'Risco Crítico de Erosão',
      subtitle: 'Nos próximos 20 dias',
      icon: '✖️',
      iconColor: '#EF4444',
      iconBg: '#1F2937',
      titleColor: '#EF4444'
    },
    {
      id: 2,
      type: 'Risco Médio Contaminação',
      subtitle: 'Nos próximos 20 dias',
      icon: '⚠️',
      iconColor: '#EC4899',
      iconBg: '#1F2937',
      titleColor: '#F97316'
    },
    {
      id: 3,
      type: 'Risco Alto de Erosão',
      subtitle: 'Nos próximos 20 dias',
      icon: '🔥',
      iconColor: '#F97316',
      iconBg: '#1F2937',
      titleColor: '#F97316'
    },
    {
      id: 4,
      type: 'Risco Baixo de Erosão',
      subtitle: 'Nos próximos 20 dias',
      icon: '🔔',
      iconColor: '#EAB308',
      iconBg: '#1F2937',
      titleColor: '#EAB308'
    }
  ];

  const handleFilterPress = (filterType) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      type: false,
      date: false
    });
  };

  const handleAlertDetails = (alert) => {
    navigation.navigate('AlertDetail', { alert });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Alertas"
        showBackButton
        navigation={navigation}
      />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Título */}
        <Text style={styles.pageTitle}>Alertas</Text>

        {/* Filtros */}
        <View style={styles.filtersContainer}>
          <TouchableOpacity 
            style={[
              styles.filterButton,
              selectedFilters.type && styles.filterButtonSelected
            ]}
            onPress={() => handleFilterPress('type')}
          >
            <Text style={styles.filterIcon}>🔽</Text>
            <Text style={styles.filterText}>Tipo</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.filterButton,
              selectedFilters.date && styles.filterButtonSelected
            ]}
            onPress={() => handleFilterPress('date')}
          >
            <Text style={styles.filterIcon}>📅</Text>
            <Text style={styles.filterText}>Data</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.filterButton}
            onPress={handleClearFilters}
          >
            <Text style={styles.filterIcon}>🧹</Text>
            <Text style={styles.filterText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Alertas */}
        <View style={styles.alertsList}>
          {alerts.map((alert) => (
            <View key={alert.id} style={styles.alertCard}>
              <View style={styles.alertContent}>
                <View style={styles.alertLeft}>
                  <View style={[styles.alertIconContainer, { backgroundColor: alert.iconBg }]}>
                    <Text style={[styles.alertIcon, { color: alert.iconColor }]}>
                      {alert.icon}
                    </Text>
                  </View>
                  
                  <View style={styles.alertInfo}>
                    <Text style={[styles.alertTitle, { color: alert.titleColor }]}>
                      {alert.type}
                    </Text>
                    <Text style={styles.alertSubtitle}>{alert.subtitle}</Text>
                  </View>
                </View>
                
                <TouchableOpacity 
                  style={styles.detailsButton}
                  onPress={() => handleAlertDetails(alert)}
                >
                  <Text style={styles.detailsButtonText}>Detalhes</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AlertsScreen; 