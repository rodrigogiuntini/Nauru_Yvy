import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '../design-system/tokens';

const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  autoCapitalize = 'none',
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  inputStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const getContainerStyle = () => {
    const baseStyle = {
      marginBottom: Spacing.md,
    };
    return [baseStyle, style];
  };

  const getInputContainerStyle = () => {
    const baseStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.surface,
      borderRadius: BorderRadius.lg,
      borderWidth: 1,
      borderColor: Colors.surfaceLight,
      paddingHorizontal: Spacing.md,
      minHeight: multiline ? 80 : 48,
    };

    const focusedStyle = isFocused ? {
      borderColor: Colors.primary,
    } : {};

    const errorStyle = error ? {
      borderColor: Colors.error,
    } : {};

    const disabledStyle = disabled ? {
      backgroundColor: Colors.surfaceLight,
      opacity: 0.6,
    } : {};

    return [
      baseStyle,
      focusedStyle,
      errorStyle,
      disabledStyle,
    ];
  };

  const getInputStyle = () => {
    const baseStyle = {
      flex: 1,
      fontSize: Typography.fontSize.base,
      color: Colors.textPrimary,
      paddingVertical: Spacing.sm,
    };

    if (multiline) {
      baseStyle.textAlignVertical = 'top';
      baseStyle.height = numberOfLines * 20;
    }

    return [baseStyle, inputStyle];
  };

  const getLabelStyle = () => ({
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  });

  const getErrorStyle = () => ({
    fontSize: Typography.fontSize.xs,
    color: Colors.error,
    marginTop: Spacing.xs,
    marginLeft: Spacing.xs,
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={getContainerStyle()}>
      {label && <Text style={getLabelStyle()}>{label}</Text>}
      
      <View style={getInputContainerStyle()}>
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color={Colors.textSecondary}
            style={{ marginRight: Spacing.sm }}
          />
        )}
        
        <TextInput
          style={getInputStyle()}
          placeholder={placeholder}
          placeholderTextColor={Colors.textTertiary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          editable={!disabled}
          multiline={multiline}
          numberOfLines={numberOfLines}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {secureTextEntry && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={{ marginLeft: Spacing.sm }}
          >
            <Ionicons
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={20}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
        )}
        
        {rightIcon && !secureTextEntry && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={{ marginLeft: Spacing.sm }}
          >
            <Ionicons
              name={rightIcon}
              size={20}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
      
      {error && <Text style={getErrorStyle()}>{error}</Text>}
    </View>
  );
};

export default Input; 