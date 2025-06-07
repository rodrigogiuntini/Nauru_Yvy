import React, { useState } from 'react';
import { View, Text, Alert, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../ui/components/Header';
import { useAlerts } from '../context/AlertsContext';
import { occurrenceStyles as styles } from './OccurrenceScreen.styles';

const OccurrenceScreen = ({ navigation }) => {
  const { createAlertFromOccurrence } = useAlerts();
  const [selectedType, setSelectedType] = useState('');
  const [location, setLocation] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('');
  const [description, setDescription] = useState('');

  const occurrenceTypes = [
    { 
      id: 'enchente', 
      label: 'Enchente/\nInundação', 
      icon: '💧',
      color: '#8B5CF6'
    },
    { 
      id: 'desmatamento', 
      label: 'Desmatamento', 
      icon: '🌲',
      color: '#10B981'
    },
    { 
      id: 'caca_pesca', 
      label: 'Caça/pesca\nilegal', 
      icon: '🐟',
      color: '#3B82F6'
    },
    { 
      id: 'queimada', 
      label: 'Queimada', 
      icon: '🔥',
      color: '#EF4444'
    }
  ];

  const severityLevels = [
    { id: 'baixa', label: 'Baixa' },
    { id: 'media', label: 'Média' },
    { id: 'alta', label: 'Alta' },
    { id: 'critica', label: 'Crítica' }
  ];

  const handleSubmit = () => {
    if (!selectedType || !location || !selectedSeverity || !description) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const formData = {
      type: selectedType,
      location: location,
      severity: selectedSeverity,
      description: description
    };

    // Criar alerta a partir da ocorrência
    const newAlert = createAlertFromOccurrence(formData);

    Alert.alert(
      'Sucesso',
      'Ocorrência reportada com sucesso! Um alerta foi criado automaticamente.',
      [
        {
          text: 'Ver Alertas',
          onPress: () => {
            navigation.navigate('Alerts');
          }
        },
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Nova Ocorrência"
        showBackButton
        navigation={navigation}
      />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Tipos de Ocorrência */}
        <View style={styles.typesContainer}>
          {occurrenceTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeCard,
                selectedType === type.id && styles.typeCardSelected
              ]}
              onPress={() => setSelectedType(type.id)}
            >
              <View style={[styles.iconContainer, { backgroundColor: type.color }]}>
                <Text style={styles.typeIcon}>{type.icon}</Text>
              </View>
              <Text style={styles.typeLabel}>{type.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Localização */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Localização:</Text>
          <View style={styles.locationContainer}>
            <Text style={styles.locationIcon}>📍</Text>
            <TextInput
              style={styles.locationInput}
              placeholder="Digite a localização"
              placeholderTextColor="#666666"
              value={location}
              onChangeText={setLocation}
            />
          </View>
        </View>

        {/* Grau de Severidade */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Grau de severidade:</Text>
          <View style={styles.severityContainer}>
            {severityLevels.map((level) => (
              <TouchableOpacity
                key={level.id}
                style={[
                  styles.severityButton,
                  selectedSeverity === level.id && styles.severityButtonSelected
                ]}
                onPress={() => setSelectedSeverity(level.id)}
              >
                <Text style={[
                  styles.severityText,
                  selectedSeverity === level.id && styles.severityTextSelected
                ]}>
                  {level.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Fotos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fotos:</Text>
          <View style={styles.photoSection}>
            <View style={styles.cameraContainer}>
              <Text style={styles.cameraIcon}>📷</Text>
            </View>
            <TouchableOpacity 
              style={styles.addPhotoButton}
              onPress={() => Alert.alert('Info', 'Funcionalidade de foto em desenvolvimento')}
            >
              <Text style={styles.addPhotoText}>Adicionar foto</Text>
            </TouchableOpacity>
            <Text style={styles.photoSubtitle}>
              Capture ou adicione{'\n'}fotos da ocorrência
            </Text>
          </View>
        </View>

        {/* Descrição */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descrição:</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Descreva a ocorrência"
            placeholderTextColor="#666666"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Botão Enviar */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Enviar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OccurrenceScreen;