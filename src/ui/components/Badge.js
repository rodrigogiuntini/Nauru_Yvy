import React from 'react';
import { View, Text } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../design-system/tokens';

const Badge = ({
  children,
  variant = 'default',
  size = 'medium',
  style,
  textStyle,
  ...props
}) => {
  const getSizeStyle = () => {
    const sizes = {
      small: {
        paddingHorizontal: Spacing.xs,
        paddingVertical: 2,
        minHeight: 16,
      },
      medium: {
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.xs,
        minHeight: 20,
      },
      large: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        minHeight: 24,
      },
    };
    return sizes[size];
  };

  const getVariantStyle = () => {
    const variants = {
      default: {
        backgroundColor: Colors.surface,
      },
      primary: {
        backgroundColor: Colors.primary,
      },
      success: {
        backgroundColor: Colors.success,
      },
      warning: {
        backgroundColor: Colors.warning,
      },
      error: {
        backgroundColor: Colors.error,
      },
      info: {
        backgroundColor: Colors.info,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors.textSecondary,
      },
    };
    return variants[variant];
  };

  const getTextSize = () => {
    const textSizes = {
      small: Typography.fontSize.xs,
      medium: Typography.fontSize.sm,
      large: Typography.fontSize.base,
    };
    return textSizes[size];
  };

  const getTextColor = () => {
    if (variant === 'outline' || variant === 'default') {
      return Colors.textSecondary;
    }
    return Colors.textPrimary;
  };

  const getBadgeStyle = () => {
    const baseStyle = {
      borderRadius: BorderRadius.full,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-start',
      ...getSizeStyle(),
      ...getVariantStyle(),
    };

    return [baseStyle, style];
  };

  const getBadgeTextStyle = () => {
    const baseTextStyle = {
      fontSize: getTextSize(),
      fontWeight: Typography.fontWeight.medium,
      color: getTextColor(),
      textAlign: 'center',
    };

    return [baseTextStyle, textStyle];
  };

  return (
    <View style={getBadgeStyle()} {...props}>
      {typeof children === 'string' ? (
        <Text style={getBadgeTextStyle()}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
};

export default Badge; 