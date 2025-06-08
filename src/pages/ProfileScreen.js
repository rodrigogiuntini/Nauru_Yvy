import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Switch, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../ui/components/Header';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '../services/api';
import { profileStyles as styles } from './ProfileScreen.styles';

const ProfileScreen = ({ navigation }) => {
  const { user, token, signOut, updateProfile } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Estados para edição do perfil
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    nome_social: '',
    nome_indigena: '',
    idade: '',
    principal_atuacao: '',
    aldeia_comunidade: '',
    localizacao_territorio: ''
  });

  // Carregar dados do usuário
  useEffect(() => {
    console.log('🔍 ProfileScreen - Estado atual:', { 
      hasUser: !!user, 
      hasToken: !!token,
      user: user 
    });
    
    if (user) {
      // Usar dados do contexto como base
      setUserData(user);
      setProfileData({
        nome_social: user.nome_social || '',
        nome_indigena: user.nome_indigena || '',
        idade: user.age ? user.age.toString() : '',
        principal_atuacao: user.bio || '',
        aldeia_comunidade: user.aldeia_comunidade || '',
        localizacao_territorio: user.localizacao_territorio || ''
      });
    }
  }, [user, token]);

  const handleSaveProfile = async () => {
    try {
      console.log('💾 Salvando dados do perfil...');
      
      const updateData = {
        ...profileData,
        idade: profileData.idade ? parseInt(profileData.idade) : null
      };

      // Por enquanto, atualizar apenas localmente até resolver completamente a API
      const updatedUser = { 
        ...user, 
        ...updateData,
        age: updateData.idade,
        bio: updateData.principal_atuacao 
      };
      
      // Usar o método updateProfile do AuthContext
      const result = await updateProfile(updatedUser);
      
      if (result.success) {
        setUserData(updatedUser);
        setIsEditing(false);
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
        console.log('✅ Perfil atualizado');
      } else {
        throw new Error(result.error || 'Erro ao atualizar perfil');
      }
    } catch (error) {
      console.error('❌ Erro ao salvar perfil:', error);
      Alert.alert('Erro', 'Não foi possível salvar as alterações');
    }
  };

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

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Perfil" showBackButton navigation={navigation} />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Você precisa estar logado para ver o perfil.</Text>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginButtonText}>Fazer Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

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
              <Text style={styles.avatarIcon}>
                {userData?.role === 'Administrador' ? '⚙️' :
                 userData?.role === 'Líder Comunitário' ? '👨‍💼' :
                 userData?.role === 'Pesquisador' ? '📊' : '👤'}
              </Text>
            </View>
          </View>
          
          <Text style={styles.userName}>
            {userData?.name || 'Nome não informado'}
          </Text>
          <Text style={styles.userRole}>
            {userData?.role || 'Usuário'}
          </Text>
          <Text style={styles.userEmail}>
            {userData?.email || 'Email não informado'}
          </Text>
          
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => setIsEditing(!isEditing)}
          >
            <Text style={styles.editButtonText}>
              {isEditing ? 'Cancelar' : 'Editar Perfil'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Informações Pessoais */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nome social (se tenha)</Text>
            <TextInput
              style={[styles.textInput, !isEditing && styles.textInputDisabled]}
              placeholder="Não informado"
              placeholderTextColor="#666666"
              value={profileData.nome_social}
              onChangeText={(text) => setProfileData({...profileData, nome_social: text})}
              editable={isEditing}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nome indígena (se tenha)</Text>
            <TextInput
              style={[styles.textInput, !isEditing && styles.textInputDisabled]}
              placeholder="Não informado"
              placeholderTextColor="#666666"
              value={profileData.nome_indigena}
              onChangeText={(text) => setProfileData({...profileData, nome_indigena: text})}
              editable={isEditing}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Idade</Text>
            <TextInput
              style={[styles.textInput, !isEditing && styles.textInputDisabled]}
              placeholder="Não informado"
              placeholderTextColor="#666666"
              value={profileData.idade}
              onChangeText={(text) => setProfileData({...profileData, idade: text})}
              editable={isEditing}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Principal atuação</Text>
            <TextInput
              style={[styles.textInput, !isEditing && styles.textInputDisabled]}
              placeholder="Não informado"
              placeholderTextColor="#666666"
              value={profileData.principal_atuacao}
              onChangeText={(text) => setProfileData({...profileData, principal_atuacao: text})}
              editable={isEditing}
              multiline
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Aldeia/Comunidade</Text>
            <TextInput
              style={[styles.textInput, !isEditing && styles.textInputDisabled]}
              placeholder="Não informado"
              placeholderTextColor="#666666"
              value={profileData.aldeia_comunidade}
              onChangeText={(text) => setProfileData({...profileData, aldeia_comunidade: text})}
              editable={isEditing}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Localização do território</Text>
            <TextInput
              style={[styles.textInput, !isEditing && styles.textInputDisabled]}
              placeholder="Não informado"
              placeholderTextColor="#666666"
              value={profileData.localizacao_territorio}
              onChangeText={(text) => setProfileData({...profileData, localizacao_territorio: text})}
              editable={isEditing}
            />
          </View>

          {isEditing && (
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSaveProfile}
            >
              <Text style={styles.saveButtonText}>Salvar Alterações</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Configurações */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configurações</Text>
          
          <View style={styles.settingsRow}>
            <Text style={styles.settingsLabel}>Notificações</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#767577', true: '#2ECC71' }}
              thumbColor={notificationsEnabled ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Ações */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacidade e Dados</Text>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleDownloadData}>
            <Text style={styles.actionButtonText}>📥 Baixar meus dados</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handlePrivacyPolicy}>
            <Text style={styles.actionButtonText}>📄 Políticas de Privacidade</Text>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>🚪 Sair da conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen; 