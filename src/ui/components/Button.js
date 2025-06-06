import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../design-system/tokens';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
  ...props
}) => {
  const getButtonStyle = () => {
    const baseStyle = {
      borderRadius: BorderRadius.lg,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      ...Shadows.sm,
    };

    const sizeStyles = {
      small: {
        height: 40,
        paddingHorizontal: Spacing.md,
      },
      medium: {
        height: 48,
        paddingHorizontal: Spacing.lg,
      },
      large: {
        height: 56,
        paddingHorizontal: Spacing.xl,
      },
    };

    const variantStyles = {
      primary: {
        backgroundColor: Colors.primary,
      },
      secondary: {
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.primary,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors.textSecondary,
      },
      ghost: {
        backgroundColor: 'transparent',
      },
    };

    const disabledStyle = disabled ? {
      backgroundColor: Colors.surfaceLight,
      borderColor: Colors.surfaceLight,
    } : {};

    return [
      baseStyle,
      sizeStyles[size],
      variantStyles[variant],
      disabledStyle,
      style,
    ];
  };

  const getTextStyle = () => {
    const baseTextStyle = {
      fontWeight: Typography.fontWeight.semibold,
      textAlign: 'center',
    };

    const sizeTextStyles = {
      small: {
        fontSize: Typography.fontSize.sm,
      },
      medium: {
        fontSize: Typography.fontSize.base,
      },
      large: {
        fontSize: Typography.fontSize.lg,
      },
    };

    const variantTextStyles = {
      primary: {
        color: Colors.textPrimary,
      },
      secondary: {
        color: Colors.primary,
      },
      outline: {
        color: Colors.textSecondary,
      },
      ghost: {
        color: Colors.primary,
      },
    };

    const disabledTextStyle = disabled ? {
      color: Colors.textTertiary,
    } : {};

    return [
      baseTextStyle,
      sizeTextStyles[size],
      variantTextStyles[variant],
      disabledTextStyle,
      textStyle,
    ];
  };

  if (variant === 'primary' && !disabled) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={getButtonStyle()}
        {...props}
      >
        <LinearGradient
          colors={Colors.gradient.primary}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            borderRadius: BorderRadius.lg,
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {loading ? (
            <ActivityIndicator color={Colors.textPrimary} size="small" />
          ) : (
            <>
              {icon && <Text style={[getTextStyle(), { marginRight: Spacing.sm }]}>{icon}</Text>}
              <Text style={getTextStyle()}>{title}</Text>
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={getButtonStyle()}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? Colors.textPrimary : Colors.primary} 
          size="small" 
        />
      ) : (
        <>
          {icon && <Text style={[getTextStyle(), { marginRight: Spacing.sm }]}>{icon}</Text>}
          <Text style={getTextStyle()}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button; 