import { StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../ui/design-system/tokens';

export const alertsStyles = StyleSheet.create({
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

  // Título Principal
  pageTitle: {
    fontSize: 28,
    fontWeight: Typography.fontWeight.bold,
    color: '#FFFFFF',
    marginBottom: Spacing.xl,
    marginTop: Spacing.lg,
  },

  // Filtros
  filtersContainer: {
    flexDirection: 'row',
    marginBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  filterButton: {
    backgroundColor: '#22C55E',
    borderRadius: 8,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 80,
    justifyContent: 'center',
  },
  filterButtonSelected: {
    backgroundColor: '#16A34A',
  },
  filterIcon: {
    fontSize: 16,
    marginRight: Spacing.xs,
  },
  filterText: {
    fontSize: 14,
    fontWeight: Typography.fontWeight.medium,
    color: '#FFFFFF',
  },

  // Lista de Alertas
  alertsList: {
    gap: Spacing.md,
  },
  alertCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: '#333333',
  },
  alertContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  alertLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  alertIcon: {
    fontSize: 24,
  },
  alertInfo: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: 4,
  },
  alertSubtitle: {
    fontSize: 14,
    color: '#888888',
  },

  // Botão Detalhes
  detailsButton: {
    backgroundColor: '#22C55E',
    borderRadius: 8,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    marginLeft: Spacing.md,
  },
  detailsButtonText: {
    fontSize: 14,
    fontWeight: Typography.fontWeight.medium,
    color: '#FFFFFF',
  },
}); 