import { StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../ui/design-system/tokens';

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing['6xl'],
  },

  // Header do Perfil
  profileHeader: {
    alignItems: 'center',
    marginBottom: Spacing.xl * 2,
    marginTop: Spacing.lg,
  },
  avatarContainer: {
    marginBottom: Spacing.lg,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F5DEB3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarIcon: {
    fontSize: 60,
  },
  userName: {
    fontSize: 24,
    fontWeight: Typography.fontWeight.bold,
    color: '#FFFFFF',
    marginBottom: Spacing.xs,
  },
  userRole: {
    fontSize: 16,
    color: '#888888',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  
  // Botão de editar
  editButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
  },
  editButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: Typography.fontWeight.medium,
  },
  
  // Loading
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  loadingText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
  },
  loginButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: Typography.fontWeight.semibold,
  },

  // Seções
  section: {
    marginBottom: Spacing.xl * 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: Typography.fontWeight.semibold,
    color: '#FFFFFF',
    marginBottom: Spacing.lg,
  },

  // Inputs
  inputContainer: {
    marginBottom: Spacing.lg,
  },
  inputLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: Spacing.sm,
  },
  textInput: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: Spacing.md,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#333333',
    minHeight: 48,
  },
  textInputDisabled: {
    backgroundColor: '#0D1117',
    color: '#9CA3AF',
  },
  
  // Botão Salvar
  saveButton: {
    backgroundColor: '#22C55E',
    borderRadius: 12,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: Typography.fontWeight.semibold,
  },

  // Configurações
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: '#333333',
  },
  settingsLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: Typography.fontWeight.medium,
  },
  settingsValue: {
    fontSize: 14,
    color: '#9CA3AF',
  },

  // Ações de Privacidade
  actionButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: '#333333',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: Typography.fontWeight.medium,
  },
  actionButtonIcon: {
    fontSize: 18,
    color: '#9CA3AF',
  },

  // Informações de Privacidade
  privacyCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: '#333333',
  },
  privacyTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: Spacing.sm,
  },
  privacyDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
  privacyLink: {
    color: '#3B82F6',
    textDecorationLine: 'underline',
  },

  // Seção de Estatísticas
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  statCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: Spacing.md,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  statNumber: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: Typography.fontWeight.bold,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },

  // Botão Logout
  logoutButton: {
    backgroundColor: '#DC2626',
    borderRadius: 12,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: Typography.fontWeight.semibold,
  },
}); 