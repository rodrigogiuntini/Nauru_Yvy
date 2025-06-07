import { StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../ui/design-system/tokens';

export const registerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    justifyContent: 'center',
    minHeight: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.base,
  },
  form: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  registerButton: {
    marginTop: Spacing.xl,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.lg,
  },
  loginText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  loginButton: {
    paddingHorizontal: 0,
  },
  
  // Políticas de Privacidade
  privacyContainer: {
    marginBottom: 24,
  },
  
  privacyCheckbox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#333333',
    borderRadius: 4,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  
  checkboxChecked: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  
  privacyText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#CCCCCC',
  },
  
  privacyLink: {
    color: '#22C55E',
    fontWeight: '500',
  },
  
  errorText: {
    marginTop: 8,
    fontSize: 12,
    color: '#EF4444',
  },
  
  // Modal de Políticas
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F1F',
  },
  
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  
  closeButton: {
    padding: 8,
  },
  
  modalContent: {
    flex: 1,
    paddingHorizontal: 24,
  },
  
  modalSectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 24,
    marginBottom: 16,
  },
  
  modalSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#22C55E',
    marginTop: 24,
    marginBottom: 12,
  },
  
  modalText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#CCCCCC',
    marginBottom: 16,
  },
  
  modalFooter: {
    fontSize: 12,
    lineHeight: 18,
    color: '#999999',
    fontStyle: 'italic',
    marginTop: 24,
    marginBottom: 32,
    textAlign: 'center',
  },
  
  modalFooterActions: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#1F1F1F',
    gap: 16,
  },
  
  modalCheckbox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  
  modalCheckboxText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#CCCCCC',
    fontWeight: '500',
  },
  
  acceptButton: {
    marginTop: 8,
  },
}); 