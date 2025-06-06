import { StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../ui/design-system/tokens';

export const globalStyles = StyleSheet.create({
  // Containers
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Spacing.md,
  },
  
  // Layout
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
  
  // Spacing
  marginXs: { margin: Spacing.xs },
  marginSm: { margin: Spacing.sm },
  marginMd: { margin: Spacing.md },
  marginLg: { margin: Spacing.lg },
  marginXl: { margin: Spacing.xl },
  
  paddingXs: { padding: Spacing.xs },
  paddingSm: { padding: Spacing.sm },
  paddingMd: { padding: Spacing.md },
  paddingLg: { padding: Spacing.lg },
  paddingXl: { padding: Spacing.xl },
  
  // Typography
  textPrimary: {
    color: Colors.textPrimary,
  },
  textSecondary: {
    color: Colors.textSecondary,
  },
  textCenter: {
    textAlign: 'center',
  },
  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },
  
  // Font Sizes
  textXs: { fontSize: Typography.fontSize.xs },
  textSm: { fontSize: Typography.fontSize.sm },
  textBase: { fontSize: Typography.fontSize.base },
  textLg: { fontSize: Typography.fontSize.lg },
  textXl: { fontSize: Typography.fontSize.xl },
  text2xl: { fontSize: Typography.fontSize['2xl'] },
  text3xl: { fontSize: Typography.fontSize['3xl'] },
  text4xl: { fontSize: Typography.fontSize['4xl'] },
  
  // Font Weights
  fontNormal: { fontWeight: Typography.fontWeight.normal },
  fontMedium: { fontWeight: Typography.fontWeight.medium },
  fontSemibold: { fontWeight: Typography.fontWeight.semibold },
  fontBold: { fontWeight: Typography.fontWeight.bold },
  
  // Borders
  borderRadius: { borderRadius: BorderRadius.md },
  borderRadiusSm: { borderRadius: BorderRadius.sm },
  borderRadiusLg: { borderRadius: BorderRadius.lg },
  borderRadiusXl: { borderRadius: BorderRadius.xl },
  borderRadiusFull: { borderRadius: BorderRadius.full },
  
  // Shadows
  shadow: Shadows.md,
  shadowSm: Shadows.sm,
  shadowLg: Shadows.lg,
  shadowXl: Shadows.xl,
  
  // Background Colors
  bgPrimary: { backgroundColor: Colors.primary },
  bgSecondary: { backgroundColor: Colors.secondary },
  bgSurface: { backgroundColor: Colors.surface },
  bgSurfaceLight: { backgroundColor: Colors.surfaceLight },
  bgSuccess: { backgroundColor: Colors.success },
  bgWarning: { backgroundColor: Colors.warning },
  bgError: { backgroundColor: Colors.error },
  bgInfo: { backgroundColor: Colors.info },
  
  // Form Elements
  input: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.surfaceLight,
  },
  inputFocused: {
    borderColor: Colors.primary,
  },
  inputError: {
    borderColor: Colors.error,
  },
  
  // Buttons
  button: {
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: Colors.primary,
  },
  buttonSecondary: {
    backgroundColor: Colors.secondary,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  buttonGhost: {
    backgroundColor: 'transparent',
  },
  
  // Cards
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    ...Shadows.md,
  },
  cardElevated: {
    ...Shadows.lg,
  },
  
  // Dividers
  divider: {
    height: 1,
    backgroundColor: Colors.surfaceLight,
  },
  dividerVertical: {
    width: 1,
    backgroundColor: Colors.surfaceLight,
  },
  
  // Status Colors
  statusSuccess: { color: Colors.success },
  statusWarning: { color: Colors.warning },
  statusError: { color: Colors.error },
  statusInfo: { color: Colors.info },
  
  // Utilities
  flex1: { flex: 1 },
  flex2: { flex: 2 },
  flex3: { flex: 3 },
  flexGrow: { flexGrow: 1 },
  flexShrink: { flexShrink: 1 },
  
  // Positioning
  absolute: { position: 'absolute' },
  relative: { position: 'relative' },
  
  // Overflow
  hidden: { overflow: 'hidden' },
  visible: { overflow: 'visible' },
  
  // Opacity
  opacity25: { opacity: 0.25 },
  opacity50: { opacity: 0.5 },
  opacity75: { opacity: 0.75 },
  opacity100: { opacity: 1 },
}); 