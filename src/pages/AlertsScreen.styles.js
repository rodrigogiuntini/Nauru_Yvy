import { StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../ui/design-system/tokens';

export const alertsStyles = StyleSheet.create({
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
  timeGroup: {
    marginBottom: Spacing.xl,
  },
  timeGroupTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  alertCard: {
    marginBottom: Spacing.md,
    padding: Spacing.md,
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
    borderRadius: 24,
    backgroundColor: Colors.surfaceLight,
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
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  alertTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  alertDetails: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  alertLocation: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    marginTop: Spacing.xs,
  },
  alertRight: {
    marginLeft: Spacing.md,
  },
  alertImageContainer: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: Colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertImage: {
    fontSize: 28,
  },
  bottomSpacing: {
    height: Spacing['4xl'],
  },
}); 