import { StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../ui/design-system/tokens';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: Spacing['6xl'],
    flexGrow: 1,
    minHeight: '100%',
  },
  mapCard: {
    marginBottom: Spacing.lg,
    minHeight: 180,
  },
  mapContainer: {
    flex: 1,
  },
  mapTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
  },
  mapIcon: {
    fontSize: 40,
    marginBottom: Spacing.sm,
  },
  mapText: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.medium,
  },
  soilCard: {
    marginBottom: Spacing.lg,
  },
  soilHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
  },
  soilBadge: {
    backgroundColor: Colors.success,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
  },
  soilBadgeText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.medium,
  },
  soilContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  soilImageContainer: {
    width: 80,
    height: 80,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  soilEmoji: {
    fontSize: 32,
  },
  soilDetails: {
    flex: 1,
  },
  soilType: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  soilInfo: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  statusCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  statusCard: {
    flex: 1,
    marginHorizontal: Spacing.xs,
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  statusSuccess: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.success,
  },
  statusWarning: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.warning,
  },
  statusInfo: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.info,
  },
  statusError: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.error,
  },
  statusIcon: {
    fontSize: 24,
    marginBottom: Spacing.sm,
  },
  statusLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  statusValue: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
  },
  recentSection: {
    marginTop: Spacing.lg,
  },
  recentCard: {
    marginBottom: Spacing.sm,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentIcon: {
    fontSize: 24,
    marginRight: Spacing.md,
  },
  recentDetails: {
    flex: 1,
  },
  recentTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  recentDate: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  recentStatus: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 8,
  },
  recentStatusText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.medium,
  },
}); 