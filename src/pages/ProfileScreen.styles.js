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

  // Configurações
  configItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  configLabel: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  configValue: {
    fontSize: 16,
    color: '#888888',
  },
  downloadIcon: {
    fontSize: 20,
  },
  arrowIcon: {
    fontSize: 18,
    color: '#888888',
  },

  // Botão Logout
  logoutButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    marginTop: Spacing.xl,
    borderWidth: 1,
    borderColor: '#333333',
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: Typography.fontWeight.medium,
  },
}); 