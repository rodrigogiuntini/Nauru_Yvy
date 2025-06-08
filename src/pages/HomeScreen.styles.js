import { StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../ui/design-system/tokens';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
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
    alignItems: 'center',
    marginBottom: Spacing.xl,
    paddingTop: Spacing.lg,
  },
  droneAnimation: {
    borderRadius: 16,
    backgroundColor: 'transparent',
    shadowColor: '#4ECDC4',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  titleSection: {
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.sm,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: Typography.fontWeight.bold,
    color: '#FFFFFF',
    textAlign: 'left',
    lineHeight: 28,
  },
  descriptionSection: {
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.sm,
  },
  description: {
    fontSize: 16,
    color: '#CCCCCC',
    lineHeight: 24,
    marginBottom: Spacing.md,
    textAlign: 'justify',
  },
  featuresSection: {
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.sm,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: Typography.fontWeight.semibold,
    color: '#FFFFFF',
    marginBottom: Spacing.lg,
  },
  featuresList: {
    paddingLeft: Spacing.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  bullet: {
    fontSize: 16,
    color: '#4ECDC4',
    marginRight: Spacing.sm,
    marginTop: 2,
    fontWeight: Typography.fontWeight.bold,
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    color: '#CCCCCC',
    lineHeight: 22,
  },
  territoriesSection: {
    paddingHorizontal: Spacing.sm,
  },
  territoriesTitle: {
    fontSize: 18,
    fontWeight: Typography.fontWeight.semibold,
    color: '#FFFFFF',
    marginBottom: Spacing.lg,
  },
  territoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: '#333333',
  },
  territoryInfo: {
    flex: 1,
  },
  territoryName: {
    fontSize: 16,
    fontWeight: Typography.fontWeight.semibold,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  territoryLocation: {
    fontSize: 14,
    color: '#888888',
  },
  territoryImageContainer: {
    marginLeft: Spacing.md,
  },
  territoryImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
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