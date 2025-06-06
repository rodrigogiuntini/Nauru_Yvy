import { StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../ui/design-system/tokens';

export const profileStyles = StyleSheet.create({
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
  profileCard: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  profileHeader: {
    alignItems: 'center',
  },
  avatar: {
    marginBottom: Spacing.lg,
  },
  userName: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  userRole: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
  },
  section: {
    marginBottom: Spacing['2xl'],
  },
  sectionHeader: {
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
  editButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexShrink: 0,
  },
  cancelButton: {
    marginRight: Spacing.sm,
    minWidth: 80,
  },
  saveButton: {
    minWidth: 80,
  },
  infoCard: {
    paddingBottom: 0,
  },
  input: {
    marginBottom: Spacing.sm,
  },
  bioInput: {
    minHeight: 80,
  },
  settingsCard: {
    padding: 0,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  settingLabel: {
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.medium,
  },
  settingValue: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
  },
  settingButton: {
    paddingHorizontal: 0,
    minWidth: 32,
  },
  settingDivider: {
    height: 1,
    backgroundColor: Colors.surfaceLight,
    marginHorizontal: Spacing.md,
  },
  logoutButton: {
    marginTop: Spacing.lg,
    borderColor: Colors.error,
  },
  bottomSpacing: {
    height: Spacing['4xl'],
  },
}); 