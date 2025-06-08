import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../ui/components/Header';
import { alertDetailStyles as styles } from './AlertDetailScreen.styles';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/api';

const AlertDetailScreen = ({ navigation, route }) => {
  const { alert } = route.params || {};
  const { user, token, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [occurrence, setOccurrence] = useState(alert?.occurrence || null);

  useEffect(() => {
    console.log('🔍 AlertDetailScreen - Dados recebidos:', {
      alert: alert ? 'presente' : 'ausente',
      alertId: alert?.id,
      alertType: alert?.type,
      occurrence: alert?.occurrence ? 'presente' : 'ausente',
      occurrenceId: alert?.occurrence?.id
    });
  }, [alert]);

  // Mapear dados da ocorrência para exibição
  const getDisplayData = () => {
    if (!alert && !occurrence) {
      console.log('❌ AlertDetailScreen - Nenhum dado disponível');
      return null;
    }

    const data = occurrence || alert.occurrence || alert;
    console.log('📊 AlertDetailScreen - Dados a serem exibidos:', {
      dataId: data?.id,
      dataType: data?.tipo_ocorrencia,
      dataSeverity: data?.grau_severidade,
      dataStatus: data?.status,
      dataLocation: data?.localizacao
    });
    
    const typeMap = {
      'desmatamento': { icon: '🌳', name: 'Desmatamento' },
      'queimada': { icon: '🔥', name: 'Incêndio/Queimada' },
      'caca_pesca': { icon: '🎣', name: 'Caça/Pesca Ilegal' },
      'enchente': { icon: '🌊', name: 'Inundação/Enchente' },
      'poluicao': { icon: '☠️', name: 'Poluição Ambiental' },
      'mineracao_ilegal': { icon: '⛏️', name: 'Mineração Ilegal' }
    };

    const severityMap = {
      'baixa': { icon: '🟢', name: 'Baixa', color: '#10B981' },
      'media': { icon: '🟡', name: 'Média', color: '#F59E0B' },
      'alta': { icon: '🟠', name: 'Alta', color: '#F97316' },
      'critica': { icon: '🔴', name: 'Crítica', color: '#EF4444' }
    };

    const statusMap = {
      'reportada': { icon: '📝', name: 'Reportada', color: '#6B7280' },
      'investigando': { icon: '🔍', name: 'Investigando', color: '#3B82F6' },
      'confirmada': { icon: '✅', name: 'Confirmada', color: '#F59E0B' },
      'resolvida': { icon: '✅', name: 'Resolvida', color: '#10B981' },
      'descartada': { icon: '❌', name: 'Descartada', color: '#EF4444' }
    };

    const formatDate = (dateString) => {
      try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Data inválida';
        
        return date.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch (error) {
        return 'Data inválida';
      }
    };

    const displayData = {
      id: data.id,
      type: typeMap[data.tipo_ocorrencia] || { icon: '⚠️', name: 'Ocorrência' },
      severity: severityMap[data.grau_severidade] || { icon: '⚠️', name: 'Desconhecida', color: '#6B7280' },
      status: statusMap[data.status] || { icon: '⚠️', name: 'Desconhecido', color: '#6B7280' },
      location: data.localizacao || 'Localização não informada',
      description: data.descricao || 'Sem descrição',
      date: formatDate(data.data_criacao),
      coordinates: data.coordenadas,
      images: data.imagens || []
    };

    console.log('✅ AlertDetailScreen - Dados mapeados para exibição:', {
      id: displayData.id,
      type: displayData.type.name,
      severity: displayData.severity.name,
      status: displayData.status.name
    });

    return displayData;
  };

  const displayData = getDisplayData();

  const handleMarkResolved = async () => {
    if (!isAuthenticated || !occurrence?.id) {
      Alert.alert('Erro', 'Não é possível atualizar o status da ocorrência');
      return;
    }

    Alert.alert(
      'Confirmar',
      'Deseja marcar esta ocorrência como resolvida?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            setLoading(true);
            try {
              // Por enquanto, vamos simular a atualização
              console.log('🔄 Marcando ocorrência como resolvida:', occurrence.id);
              
              // TODO: Implementar endpoint para atualizar status
              // await apiService.updateOccurrenceStatus(occurrence.id, 'resolvida');
              
              Alert.alert('Sucesso', 'Ocorrência marcada como resolvida!');
              navigation.goBack();
            } catch (error) {
              console.error('❌ Erro ao marcar como resolvida:', error);
              Alert.alert('Erro', 'Não foi possível atualizar o status da ocorrência');
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  const handleContactAuthority = () => {
    Alert.alert(
      'Contactar Autoridade',
      'Esta funcionalidade conectará com autoridades competentes para relatórios ambientais.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Contactar',
          onPress: () => {
            console.log('📞 Contactando autoridade para ocorrência:', occurrence?.id);
            Alert.alert('Em breve', 'Esta funcionalidade será implementada em breve');
          }
        }
      ]
    );
  };

  if (!displayData) {
    return (
      <SafeAreaView style={styles.container}>
        <Header 
          title="Detalhes do Alerta"
          showBackButton
          navigation={navigation}
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Dados do alerta não encontrados</Text>
        </View>
      </SafeAreaView>
    );
  }

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
        {/* Tipo de Ocorrência */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Tipo de Ocorrência</Text>
          <View style={styles.typeBadge}>
            <Text style={styles.typeIcon}>{displayData.type.icon}</Text>
            <Text style={styles.typeText}>{displayData.type.name}</Text>
          </View>
        </View>

        {/* Data e Hora */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Data e Hora</Text>
          <Text style={styles.sectionValue}>{displayData.date}</Text>
        </View>

        {/* Localização */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Localização</Text>
          <Text style={styles.sectionValue}>{displayData.location}</Text>
        </View>

        {/* Mapa - Exibir coordenadas se disponíveis */}
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <View style={styles.mapArea}>
              <Text style={styles.mapText}>🗺️</Text>
              {displayData.coordinates && (
                <Text style={styles.coordinatesText}>
                  Lat: {displayData.coordinates.lat}, Lng: {displayData.coordinates.lng}
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* Status */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Status</Text>
          <View style={[styles.statusBadge, { backgroundColor: displayData.status.color + '20' }]}>
            <Text style={styles.statusIcon}>{displayData.status.icon}</Text>
            <Text style={[styles.statusText, { color: displayData.status.color }]}>
              {displayData.status.name}
            </Text>
          </View>
        </View>

        {/* Severidade */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Severidade</Text>
          <View style={[styles.severityBadge, { backgroundColor: displayData.severity.color + '20' }]}>
            <Text style={styles.severityIcon}>{displayData.severity.icon}</Text>
            <Text style={[styles.severityText, { color: displayData.severity.color }]}>
              {displayData.severity.name}
            </Text>
          </View>
        </View>

        {/* Descrição */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Descrição</Text>
          <Text style={styles.descriptionText}>{displayData.description}</Text>
        </View>

        {/* ID da Ocorrência */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ID da Ocorrência</Text>
          <Text style={styles.sectionValue}>#{displayData.id}</Text>
        </View>

        {/* Imagens */}
        {displayData.images && displayData.images.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Imagens</Text>
            <View style={styles.imagesContainer}>
              {displayData.images.map((image, index) => (
                <View key={index} style={styles.imageContainer}>
                  <Image source={{ uri: image }} style={styles.image} />
                </View>
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Imagens</Text>
            <View style={styles.noImagesContainer}>
              <Text style={styles.noImagesIcon}>📷</Text>
              <Text style={styles.noImagesText}>Nenhuma imagem anexada</Text>
            </View>
          </View>
        )}

       

        {/* Botões de Ação */}
        <View style={styles.actionsContainer}>
          {displayData.status.name !== 'Resolvida' && (
            <TouchableOpacity 
              style={[styles.resolvedButton, loading && styles.buttonDisabled]}
              onPress={handleMarkResolved}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <Text style={styles.resolvedIcon}>✅</Text>
                  <Text style={styles.resolvedButtonText}>Marcar como Resolvido</Text>
                </>
              )}
            </TouchableOpacity>
          )}

          <TouchableOpacity 
            style={[styles.contactButton, loading && styles.buttonDisabled]}
            onPress={handleContactAuthority}
            disabled={loading}
          >
            <Text style={styles.contactIcon}>📞</Text>
            <Text style={styles.contactButtonText}>Contactar Autoridade</Text>
          </TouchableOpacity>

          {displayData.status.name === 'Resolvida' && (
            <View style={styles.resolvedIndicator}>
              <Text style={styles.resolvedIndicatorIcon}>✅</Text>
              <Text style={styles.resolvedIndicatorText}>Ocorrência Resolvida</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AlertDetailScreen; 