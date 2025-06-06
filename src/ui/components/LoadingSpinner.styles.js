import { StyleSheet } from 'react-native';
import { Typography, Spacing } from '../design-system/tokens';

export const loadingSpinnerStyles = StyleSheet.create({
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
  },
  message: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    marginTop: Spacing.md,
    textAlign: 'center',
  },
}); 