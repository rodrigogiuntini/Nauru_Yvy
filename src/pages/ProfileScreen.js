import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../ui/components/Header';
import Card from '../ui/components/Card';
import Button from '../ui/components/Button';
import Input from '../ui/components/Input';
import Avatar from '../ui/components/Avatar';
import { useAuth } from '../context/AuthContext';
import { profileStyles as styles } from './ProfileScreen.styles';

const ProfileScreen = ({ navigation }) => {
  const { user, signOut, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    age: user?.age ? user.age.toString() : '',
    bio: user?.bio || '',
    role: user?.role || '',
  });

  // Atualizar formData quando user muda
  useEffect(() => {
    if (user) {
      console.log('👤 Dados do usuário carregados:', user);
      setFormData({
        name: user.name || '',
        email: user.email || '',
        age: user.age ? user.age.toString() : '',
        bio: user.bio || '',
        role: user.role || '',
      });
      
      // Atualizar configurações de notificação se disponível
      if (user.notifications_enabled !== undefined) {
        setNotificationsEnabled(user.notifications_enabled);
      }
    }
  }, [user]);

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

  const handleSaveProfile = async () => {
    console.log('🔘 Botão Salvar foi clicado!');
    console.log('💾 Salvando dados do perfil:', formData);
    
    setIsSaving(true);
    
    try {
      // Preparar dados para o backend
      const updateData = {
        name: formData.name,
        age: formData.age ? parseInt(formData.age) : null,
        bio: formData.bio,
        notifications_enabled: notificationsEnabled,
      };
      
      const result = await updateProfile(updateData);
      if (result.success) {
        setIsEditing(false);
        console.log('✅ Perfil atualizado com sucesso!');
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
      } else {
        console.error('❌ Erro ao atualizar perfil:', result.error);
        Alert.alert('Erro', result.error);
      }
    } catch (error) {
      console.error('❌ Erro inesperado:', error);
      Alert.alert('Erro', 'Erro inesperado ao salvar perfil');
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportData = () => {
    Alert.alert('Info', 'Funcionalidade de exportação em desenvolvimento');
  };

  const handleTermsOfUse = () => {
    Alert.alert('Termos de Uso', 'Funcionalidade em desenvolvimento');
  };

  // Função para traduzir roles do inglês para português
  const translateRole = (role) => {
    const roleTranslations = {
      'admin': 'Administrador',
      'community_leader': 'Líder Comunitário',
      'community_member': 'Membro da Comunidade',
      'researcher': 'Pesquisador',
      'Community Member': 'Membro da Comunidade',
      'Community Leader': 'Líder Comunitário',
      'Admin': 'Administrador',
      'Researcher': 'Pesquisador'
    };
    
    return roleTranslations[role] || role;
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
        {/* Avatar e Info Principal */}
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Avatar
              source={user?.avatar}
              name={user?.name}
              size="xlarge"
              style={styles.avatar}
            />
            
            <Text style={styles.userName}>{user?.name || 'Usuário'}</Text>
            <Text style={styles.userRole}>{translateRole(user?.role) || 'Membro da Comunidade'}</Text>
          </View>
        </Card>

        {/* Informações Pessoais */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Informações Pessoais</Text>
            {!isEditing ? (
              <Button
                title="Editar"
                variant="ghost"
                size="small"
                onPress={() => setIsEditing(true)}
              />
            ) : (
              <View style={styles.editButtons}>
                <Button
                  title="Cancelar"
                  variant="outline"
                  size="small"
                  onPress={() => {
                    setIsEditing(false);
                    setFormData({
                      name: user?.name || '',
                      email: user?.email || '',
                      age: user?.age ? user.age.toString() : '',
                      bio: user?.bio || '',
                      role: user?.role || '',
                    });
                  }}
                  style={styles.cancelButton}
                />
                <Button
                  title="Salvar"
                  size="small"
                  onPress={handleSaveProfile}
                  style={styles.saveButton}
                  loading={isSaving}
                  disabled={isSaving}
                />
              </View>
            )}
          </View>

          <Card style={styles.infoCard}>
            <Input
              label="Nome"
              value={isEditing ? formData.name : (user?.name || '')}
              onChangeText={(value) => setFormData(prev => ({ ...prev, name: value }))}
              disabled={!isEditing}
              style={styles.input}
              placeholder="Digite seu nome"
            />

            <Input
              label="Email"
              value={user?.email || ''}
              disabled={true}
              style={styles.input}
              placeholder="Email de acesso"
            />

            <Input
              label="Idade"
              value={isEditing ? formData.age : (user?.age ? user.age.toString() : '')}
              onChangeText={(value) => setFormData(prev => ({ ...prev, age: value }))}
              disabled={!isEditing}
              keyboardType="numeric"
              style={styles.input}
              placeholder="Digite sua idade"
            />

            <Input
              label="Bio"
              value={isEditing ? formData.bio : (user?.bio || '')}
              onChangeText={(value) => setFormData(prev => ({ ...prev, bio: value }))}
              disabled={!isEditing}
              multiline={true}
              numberOfLines={3}
              style={[styles.input, styles.bioInput]}
              placeholder="Conte um pouco sobre você..."
            />

            <Input
              label="Função"
              value={translateRole(user?.role) || ''}
              disabled={true}
              style={styles.input}
              placeholder="Sua função no sistema"
            />
          </Card>
        </View>

        {/* Configurações */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configurações</Text>
          
          <Card style={styles.settingsCard}>
            {/* Idioma */}
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Idioma</Text>
              <Text style={styles.settingValue}>Português</Text>
            </View>

            <View style={styles.settingDivider} />

            {/* Exportar Dados */}
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Exportar Dados</Text>
              <Button
                title="📥"
                variant="ghost"
                size="small"
                onPress={handleExportData}
                style={styles.settingButton}
              />
            </View>

            <View style={styles.settingDivider} />

            {/* Notificações */}
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Notificações</Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#2C2C2E', true: '#4CAF50' }}
                thumbColor={notificationsEnabled ? '#FFFFFF' : '#8E8E93'}
              />
            </View>

            <View style={styles.settingDivider} />

            {/* Termos de Uso */}
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Termos de Uso</Text>
              <Button
                title="→"
                variant="ghost"
                size="small"
                onPress={handleTermsOfUse}
                style={styles.settingButton}
              />
            </View>
          </Card>
        </View>

        {/* Botão de Logout */}
        <Button
          title="Sair"
          variant="outline"
          onPress={handleLogout}
          style={styles.logoutButton}
        />

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen; 