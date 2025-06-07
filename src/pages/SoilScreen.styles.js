import { StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../ui/design-system/tokens';

export const soilStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xl * 2,
  },

  // Mapa do Brasil
  mapContainer: {
    padding: Spacing.lg,
    alignItems: 'center',
  },
  brazilMap: {
    width: '100%',
    height: 120,
    backgroundColor: '#4ECDC4',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapIcon: {
    fontSize: 48,
  },

  // Territórios Monitorados
  territorySection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  territoryTitle: {
    fontSize: 18,
    fontWeight: Typography.fontWeight.semibold,
    color: '#FFFFFF',
    marginBottom: Spacing.md,
  },
  territoryCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  territoryInfo: {
    flex: 1,
  },
  territoryDetail: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 4,
  },
  soilImageContainer: {
    marginLeft: Spacing.md,
  },
  soilImage: {
    width: 60,
    height: 60,
    backgroundColor: '#8B4513',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  soilImagePlaceholder: {
    fontSize: 24,
  },

  // Métricas
  metricsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    justifyContent: 'space-between',
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: Spacing.lg,
    alignItems: 'center',
    borderLeftWidth: 4,
  },
  metricBlue: {
    borderLeftColor: '#3B82F6',
  },
  metricYellow: {
    borderLeftColor: '#F59E0B',
  },
  metricGreen: {
    borderLeftColor: '#10B981',
  },
  metricRed: {
    borderLeftColor: '#EF4444',
  },
  metricIcon: {
    fontSize: 24,
    marginBottom: Spacing.sm,
  },
  metricLabel: {
    fontSize: 14,
    color: '#888888',
    marginBottom: Spacing.xs,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: Typography.fontWeight.bold,
    color: '#FFFFFF',
  },

  // Análise Recente
  analysisSection: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: Typography.fontWeight.semibold,
    color: '#FFFFFF',
    marginBottom: Spacing.lg,
  },
  analysisCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  analysisCardTitle: {
    fontSize: 16,
    fontWeight: Typography.fontWeight.medium,
    color: '#FFFFFF',
    marginBottom: Spacing.sm,
  },
  analysisNumber: {
    fontSize: 32,
    fontWeight: Typography.fontWeight.bold,
    color: '#22C55E',
    marginBottom: Spacing.xs,
  },
  analysisPercentage: {
    fontSize: 32,
    fontWeight: Typography.fontWeight.bold,
    color: '#22C55E',
    marginBottom: Spacing.xs,
  },
  analysisSubtitle: {
    fontSize: 14,
    color: '#888888',
    marginBottom: Spacing.lg,
  },

  // Gráfico de Linha
  chartPlaceholder: {
    height: 80,
    justifyContent: 'flex-end',
  },
  chartBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 60,
  },
  chartBar: {
    width: 8,
    backgroundColor: '#22C55E',
    borderRadius: 2,
    marginHorizontal: 2,
  },

  // Gráfico de Barras
  barChartContainer: {
    gap: Spacing.sm,
  },
  barChart: {
    height: 12,
    backgroundColor: '#22C55E',
    borderRadius: 6,
    marginBottom: Spacing.xs,
  },

  // Risco Ambiental
  riskStatus: {
    fontSize: 24,
    fontWeight: Typography.fontWeight.bold,
    color: '#22C55E',
    marginBottom: Spacing.xs,
  },
  riskBars: {
    gap: Spacing.md,
  },
  riskBar: {
    marginBottom: Spacing.sm,
  },
  riskLabel: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: Spacing.xs,
  },
  riskProgress: {
    height: 8,
    backgroundColor: '#333333',
    borderRadius: 4,
    overflow: 'hidden',
  },
  riskFill: {
    height: '100%',
    backgroundColor: '#22C55E',
    borderRadius: 4,
  },
}); 