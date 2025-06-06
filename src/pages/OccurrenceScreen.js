import React, { useState } from 'react';
import { View, Text, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../ui/components/Header';
import Card from '../ui/components/Card';
import Button from '../ui/components/Button';
import Input from '../ui/components/Input';
import Badge from '../ui/components/Badge';
import { useAlerts } from '../context/AlertsContext';
import { occurrenceStyles as styles } from './OccurrenceScreen.styles';

const OccurrenceScreen = ({ navigation }) => {
  const { createAlertFromOccurrence } = useAlerts();
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    severity: 'Média',
    description: '',
  });

  const occurrenceTypes = [
    { id: 'deforestation', label: 'Desmatamento', icon: '🌳' },
    { id: 'illegal_mining', label: 'Mineração Ilegal', icon: '⛏️' },
    { id: 'poaching', label: 'Caça Ilegal', icon: '🦌' },
    { id: 'pollution', label: 'Poluição', icon: '🏭' },
  ];

  const severityLevels = ['Baixa', 'Média', 'Alta'];

  const handleSubmit = () => {
    if (!formData.type || !formData.location || !formData.description) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
      return;
    }

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

  const selectOccurrenceType = (type) => {
    setFormData(prev => ({ ...prev, type }));
  };

  const selectSeverity = (severity) => {
    setFormData(prev => ({ ...prev, severity }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Nova Ocorrência"
        showBackButton
        navigation={navigation}
        rightIcon="close-outline"
        onRightPress={() => navigation.goBack()}
      />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Tipo de Ocorrência */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tipo de Ocorrência</Text>
          <View style={styles.typeGrid}>
            {occurrenceTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeCard,
                  formData.type === type.id && styles.typeCardSelected
                ]}
                onPress={() => selectOccurrenceType(type.id)}
              >
                <Text style={styles.typeIcon}>{type.icon}</Text>
                <Text style={[
                  styles.typeLabel,
                  formData.type === type.id && styles.typeLabelSelected
                ]}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Localização */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Localização</Text>
          <Input
            placeholder="Digite a localização"
            value={formData.location}
            onChangeText={(value) => setFormData(prev => ({ ...prev, location: value }))}
            leftIcon="location-outline"
            style={styles.locationInput}
          />
        </View>

        {/* Severidade */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Severidade</Text>
          <View style={styles.severityContainer}>
            {severityLevels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.severityButton,
                  formData.severity === level && styles.severityButtonSelected
                ]}
                onPress={() => selectSeverity(level)}
              >
                <Text style={[
                  styles.severityText,
                  formData.severity === level && styles.severityTextSelected
                ]}>
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Fotos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fotos</Text>
          <Card style={styles.photoCard} onPress={() => Alert.alert('Info', 'Funcionalidade de foto em desenvolvimento')}>
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoIcon}>📸</Text>
              <Text style={styles.photoTitle}>Adicionar Fotos</Text>
              <Text style={styles.photoSubtitle}>Capture ou envie fotos da ocorrência</Text>
              <Button
                title="Adicionar Fotos"
                variant="secondary"
                size="small"
                style={styles.photoButton}
                onPress={() => Alert.alert('Info', 'Funcionalidade de foto em desenvolvimento')}
              />
            </View>
          </Card>
        </View>

        {/* Descrição */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descrição</Text>
          <Input
            placeholder="Descreva a ocorrência"
            value={formData.description}
            onChangeText={(value) => setFormData(prev => ({ ...prev, description: value }))}
            multiline
            numberOfLines={4}
            style={styles.descriptionInput}
          />
        </View>

        {/* Botão Submit */}
        <Button
          title="Enviar"
          onPress={handleSubmit}
          size="large"
          style={styles.submitButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default OccurrenceScreen;