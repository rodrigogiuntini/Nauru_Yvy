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

  // Severidade
  severityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7F1D1D',
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
    color: '#EF4444',
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
}); 