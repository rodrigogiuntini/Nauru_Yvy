import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../ui/components/Header';
import { useAuth } from '../context/AuthContext';
import { profileStyles as styles } from './ProfileScreen.styles';

const ProfileScreen = ({ navigation }) => {
  const { signOut } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sair', 
          style: 'destructive',
          onPress: () => signOut(navigation)
        }
      ]
    );
  };

  const handleDownloadData = () => {
    Alert.alert('Info', 'Funcionalidade de download em desenvolvimento');
  };

  const handlePrivacyPolicy = () => {
    Alert.alert('Políticas de Privacidade LGPD', 'Funcionalidade em desenvolvimento');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Perfil"
        showBackButton
        navigation={navigation}
      />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar e Informações Principais */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarIcon}>👩🏻</Text>
            </View>
          </View>
          
          <Text style={styles.userName}>Priya Patel</Text>
          <Text style={styles.userRole}>Líder Comunitário</Text>
        </View>

        {/* Informações Pessoais */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nome social (se tenha)</Text>
            <TextInput
              style={styles.textInput}
              placeholder=""
              placeholderTextColor="#666666"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nome indígena (se tenha)</Text>
            <TextInput
              style={styles.textInput}
              placeholder=""
              placeholderTextColor="#666666"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Idade</Text>
            <TextInput
              style={styles.textInput}
              placeholder=""
              placeholderTextColor="#666666"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Principal atuação/ função na aldeia</Text>
            <TextInput
              style={styles.textInput}
              placeholder=""
              placeholderTextColor="#666666"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Aldeia/ comunidade indígena</Text>
            <TextInput
              style={styles.textInput}
              placeholder=""
              placeholderTextColor="#666666"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Localização/ território</Text>
            <TextInput
              style={styles.textInput}
              placeholder=""
              placeholderTextColor="#666666"
            />
          </View>
        </View>

        {/* Configurações */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configurações</Text>
          
          <View style={styles.configItem}>
            <Text style={styles.configLabel}>Linguagem</Text>
            <Text style={styles.configValue}>Português</Text>
          </View>

          <View style={styles.configItem}>
            <Text style={styles.configLabel}>Baixar Dados</Text>
            <TouchableOpacity onPress={handleDownloadData}>
              <Text style={styles.downloadIcon}>⬇️</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.configItem}>
            <Text style={styles.configLabel}>Notificações de alerta</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#2C2C2E', true: '#4CAF50' }}
              thumbColor={notificationsEnabled ? '#FFFFFF' : '#8E8E93'}
            />
          </View>

          <TouchableOpacity style={styles.configItem} onPress={handlePrivacyPolicy}>
            <Text style={styles.configLabel}>Políticas de privacidade LGPD</Text>
            <Text style={styles.arrowIcon}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Botão Sair */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen; 