import { StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../ui/design-system/tokens';

export const occurrenceStyles = StyleSheet.create({
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
  section: {
    marginBottom: Spacing['2xl'],
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  typeCard: {
    width: '48%',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    alignItems: 'center',
    marginBottom: Spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  typeCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.surfaceLight,
  },
  typeIcon: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  typeLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontWeight: Typography.fontWeight.medium,
  },
  typeLabelSelected: {
    color: Colors.textPrimary,
  },
  locationInput: {
    marginBottom: 0,
  },
  severityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  severityButton: {
    flex: 1,
    backgroundColor: Colors.surface,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: 8,
    marginHorizontal: Spacing.xs,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.surfaceLight,
  },
  severityButtonSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  severityText: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.medium,
  },
  severityTextSelected: {
    color: Colors.textPrimary,
  },
  photoCard: {
    borderWidth: 2,
    borderColor: Colors.surfaceLight,
    borderStyle: 'dashed',
  },
  photoPlaceholder: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  photoIcon: {
    fontSize: 48,
    marginBottom: Spacing.md,
  },
  photoTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  photoSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  photoButton: {
    paddingHorizontal: Spacing.xl,
  },
  descriptionInput: {
    marginBottom: 0,
  },
  submitButton: {
    marginTop: Spacing.lg,
  },
}); 