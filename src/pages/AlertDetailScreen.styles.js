import { StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../ui/design-system/tokens';

export const alertDetailStyles = StyleSheet.create({
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

  // Seções
  section: {
    marginBottom: Spacing.xl,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#22C55E',
    marginBottom: Spacing.xs,
    fontWeight: Typography.fontWeight.medium,
  },
  sectionValue: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: Typography.fontWeight.medium,
  },

  // Mapa
  mapContainer: {
    marginBottom: Spacing.xl,
    borderRadius: 12,
    overflow: 'hidden',
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#F5F5DC',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mapArea: {
    width: '70%',
    height: '80%',
    backgroundColor: '#4ECDC4',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontSize: 32,
  },
  coordinatesText: {
    fontSize: 12,
    color: '#1F2937',
    marginTop: Spacing.xs,
    textAlign: 'center',
  },

  // Error state
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
  },

  // Tipo de Ocorrência
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  typeIcon: {
    fontSize: 16,
    marginRight: Spacing.xs,
  },
  typeText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: Typography.fontWeight.medium,
  },

  // Status
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  statusIcon: {
    fontSize: 16,
    marginRight: Spacing.xs,
  },
  statusText: {
    fontSize: 14,
    fontWeight: Typography.fontWeight.medium,
  },

  // Severidade
  severityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  severityIcon: {
    fontSize: 16,
    marginRight: Spacing.xs,
  },
  severityText: {
    fontSize: 14,
    fontWeight: Typography.fontWeight.medium,
  },

  // Descrição
  descriptionText: {
    fontSize: 16,
    color: '#CCCCCC',
    lineHeight: 24,
  },

  // Imagens
  imagesContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  imageContainer: {
    flex: 1,
  },
  imagePlaceholder: {
    height: 120,
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  imageIcon: {
    fontSize: 32,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },

  // No images state
  noImagesContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  noImagesIcon: {
    fontSize: 24,
    marginBottom: Spacing.xs,
  },
  noImagesText: {
    fontSize: 14,
    color: '#6B7280',
  },

  // Botões de Ação
  actionsContainer: {
    marginTop: Spacing.xl,
    gap: Spacing.md,
  },
  resolvedButton: {
    backgroundColor: '#22C55E',
    borderRadius: 12,
    paddingVertical: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resolvedIcon: {
    fontSize: 20,
    marginRight: Spacing.sm,
  },
  resolvedButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: Typography.fontWeight.semibold,
  },
  contactButton: {
    backgroundColor: '#374151',
    borderRadius: 12,
    paddingVertical: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactIcon: {
    fontSize: 20,
    marginRight: Spacing.sm,
  },
  contactButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: Typography.fontWeight.semibold,
  },

  // Button states
  buttonDisabled: {
    opacity: 0.6,
  },

  // Resolved indicator
  resolvedIndicator: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resolvedIndicatorIcon: {
    fontSize: 20,
    marginRight: Spacing.sm,
  },
  resolvedIndicatorText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: Typography.fontWeight.semibold,
  },

  // Debug styles (development only)
  debugContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  debugTitle: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: Spacing.xs,
  },
  debugText: {
    fontSize: 12,
    color: '#CCCCCC',
    fontFamily: 'monospace',
    lineHeight: 16,
  },
}); 