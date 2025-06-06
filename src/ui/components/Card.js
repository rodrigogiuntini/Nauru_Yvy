import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius, Shadows } from '../design-system/tokens';

const Card = ({
  children,
  style,
  variant = 'default',
  padding = 'medium',
  onPress,
  gradient = false,
  ...props
}) => {
  const getPaddingStyle = () => {
    const paddingStyles = {
      none: { padding: 0 },
      small: { padding: Spacing.sm },
      medium: { padding: Spacing.md },
      large: { padding: Spacing.lg },
    };
    return paddingStyles[padding];
  };

  const getCardStyle = () => {
    const baseStyle = {
      borderRadius: BorderRadius.lg,
      backgroundColor: Colors.surface,
      ...Shadows.md,
      ...getPaddingStyle(),
    };

    const variantStyles = {
      default: {
        backgroundColor: Colors.surface,
      },
      dark: {
        backgroundColor: Colors.surfaceLight,
      },
      transparent: {
        backgroundColor: 'rgba(28, 28, 30, 0.8)',
      },
      success: {
        backgroundColor: Colors.surface,
        borderLeftWidth: 4,
        borderLeftColor: Colors.success,
      },
      warning: {
        backgroundColor: Colors.surface,
        borderLeftWidth: 4,
        borderLeftColor: Colors.warning,
      },
      error: {
        backgroundColor: Colors.surface,
        borderLeftWidth: 4,
        borderLeftColor: Colors.error,
      },
    };

    return [
      baseStyle,
      variantStyles[variant],
      style,
    ];
  };

  if (gradient) {
    return (
      <LinearGradient
        colors={[Colors.surface, Colors.surfaceLight]}
        style={[
          {
            borderRadius: BorderRadius.lg,
            ...Shadows.md,
          },
          style,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        {...props}
      >
        <View style={getPaddingStyle()}>
          {children}
        </View>
      </LinearGradient>
    );
  }

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={getCardStyle()}
        activeOpacity={0.8}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={getCardStyle()} {...props}>
      {children}
    </View>
  );
};

export default Card; 