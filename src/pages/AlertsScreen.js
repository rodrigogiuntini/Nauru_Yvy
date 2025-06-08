import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../ui/components/Header';
import { alertsStyles as styles } from './AlertsScreen.styles';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/api';

const AlertsScreen = ({ navigation }) => {
  const { user, token, isAuthenticated } = useAuth();
  const [selectedFilters, setSelectedFilters] = useState({
    type: false,
    date: false
  });
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mapeamento de tipos de ocorrência para exibição como alertas
  const getAlertFromOccurrence = (occurrence) => {
    const typeMap = {
      'desmatamento': {
        icon: '🌳',
        iconColor: '#10B981',
        title: 'Desmatamento Detectado'
      },
      'queimada': {
        icon: '🔥',
        iconColor: '#EF4444',
        title: 'Incêndio/Queimada'
      },
      'caca_pesca': {
        icon: '🎣',
        iconColor: '#8B5CF6',
        title: 'Caça/Pesca Ilegal'
      },
      'enchente': {
        icon: '🌊',
        iconColor: '#3B82F6',
        title: 'Inundação/Enchente'
      },
      'poluicao': {
        icon: '☠️',
        iconColor: '#6B7280',
        title: 'Poluição Ambiental'
      },
      'mineracao_ilegal': {
        icon: '⛏️',
        iconColor: '#F59E0B',
        title: 'Mineração Ilegal'
      }
    };

    const severityMap = {
      'baixa': { color: '#10B981' },
      'media': { color: '#F59E0B' },
      'alta': { color: '#F97316' },
      'critica': { color: '#EF4444' }
    };

    const typeInfo = typeMap[occurrence.tipo_ocorrencia] || {
      icon: '⚠️',
      iconColor: '#6B7280',
      title: 'Ocorrência Ambiental'
    };

    const severityInfo = severityMap[occurrence.grau_severidade] || { color: '#6B7280' };

    const formatDate = (dateString) => {
      try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
          return 'Data inválida';
        }
        return date.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch (error) {
        return 'Data inválida';
      }
    };

    return {
      id: occurrence.id,
      type: typeInfo.title,
      subtitle: `${occurrence.localizacao} • ${formatDate(occurrence.data_criacao)}`,
      description: occurrence.descricao,
      severity: occurrence.grau_severidade,
      status: occurrence.status,
      icon: typeInfo.icon,
      iconColor: typeInfo.iconColor,
      iconBg: '#1F2937',
      titleColor: severityInfo.color,
      occurrence: occurrence
    };
  };

  useEffect(() => {
    loadOccurrences();
  }, [isAuthenticated]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Recarregar alertas quando a tela receber foco
      if (isAuthenticated) {
        loadOccurrences();
      }
    });

    return unsubscribe;
  }, [navigation, isAuthenticated]);

  const loadOccurrences = async () => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    try {
      console.log('📋 Carregando ocorrências como alertas...');
      const response = await apiService.getUserOccurrences();
      
      if (response.success && response.data) {
        const alertsFromOccurrences = response.data.map(getAlertFromOccurrence);
        setAlerts(alertsFromOccurrences);
        console.log(`✅ ${alertsFromOccurrences.length} alertas carregados do banco`);
      } else {
        console.log('⚠️ Nenhuma ocorrência encontrada');
        setAlerts([]);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar ocorrências:', error);
      Alert.alert(
        'Erro',
        'Não foi possível carregar os alertas. Verifique sua conexão.',
        [{ text: 'OK' }]
      );
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  };

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
    console.log('🔗 Navegando para detalhes do alerta:', {
      alertId: alert.id,
      alertType: alert.type,
      hasOccurrence: !!alert.occurrence,
      occurrenceId: alert.occurrence?.id,
      fullAlert: alert
    });
    navigation.navigate('AlertDetail', { alert });
  };

  const handleRefresh = () => {
    setLoading(true);
    loadOccurrences();
  };

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Alertas"
          showBackButton
          navigation={navigation}
        />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Faça login para ver seus alertas</Text>
        </View>
      </SafeAreaView>
    );
  }

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
        <View style={styles.titleContainer}>
          <Text style={styles.pageTitle}>Alertas</Text>
          <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
            <Text style={styles.refreshIcon}>🔄</Text>
          </TouchableOpacity>
        </View>

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
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#22C55E" />
            <Text style={styles.loadingText}>Carregando alertas...</Text>
          </View>
        ) : alerts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyTitle}>Nenhum alerta</Text>
            <Text style={styles.emptyText}>
              Suas ocorrências reportadas aparecerão aqui como alertas
            </Text>
            <TouchableOpacity 
              style={styles.createButton}
              onPress={() => navigation.navigate('Occurrence')}
            >
              <Text style={styles.createButtonText}>Reportar Ocorrência</Text>
            </TouchableOpacity>
          </View>
        ) : (
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
                      <Text style={styles.alertDescription} numberOfLines={2}>
                        {alert.description}
                      </Text>
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
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AlertsScreen; 