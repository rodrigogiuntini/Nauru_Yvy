import { StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../ui/design-system/tokens';

export const occurrenceStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing['6xl'],
  },
  
  // Tipos de Ocorrência
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: Spacing['2xl'],
  },
  typeCard: {
    width: '48%',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  typeCardSelected: {
    borderColor: '#22C55E',
    backgroundColor: '#1F2937',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  typeIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  typeLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: Typography.fontWeight.medium,
    lineHeight: 18,
  },
  
  // Seções
  section: {
    marginBottom: Spacing['2xl'],
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: Typography.fontWeight.semibold,
    color: '#FFFFFF',
    marginBottom: Spacing.lg,
  },
  
  // Localização
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: '#333333',
  },
  locationIcon: {
    fontSize: 20,
    color: '#22C55E',
    marginRight: Spacing.sm,
  },
  locationInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    padding: 0,
  },
  
  // Grau de Severidade
  severityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  severityButton: {
    width: '48%',
    backgroundColor: '#1A1A1A',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: '#333333',
  },
  severityButtonSelected: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  severityText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: Typography.fontWeight.medium,
  },
  severityTextSelected: {
    color: '#FFFFFF',
  },
  
  // Seção de Fotos
  photoSection: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  cameraContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#374151',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  cameraIcon: {
    fontSize: 40,
  },
  addPhotoButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#22C55E',
    borderRadius: 8,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  addPhotoText: {
    fontSize: 16,
    color: '#22C55E',
    fontWeight: Typography.fontWeight.medium,
  },
  photoSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
  
  // Descrição
  descriptionInput: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: Spacing.md,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#333333',
    minHeight: 120,
  },
  
  // Botão Enviar
  submitButton: {
    backgroundColor: '#22C55E',
    borderRadius: 12,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  submitButtonDisabled: {
    backgroundColor: '#6B7280',
    opacity: 0.7,
  },
  submitButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: Typography.fontWeight.semibold,
  },
}); 