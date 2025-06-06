import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { Colors } from '../design-system/tokens';
import { loadingSpinnerStyles as styles } from './LoadingSpinner.styles';

const LoadingSpinner = ({
  size = 'medium',
  color = Colors.primary,
  message,
  style,
  fullScreen = false,
  ...props
}) => {
  const getSizeValue = () => {
    const sizes = {
      small: 20,
      medium: 36,
      large: 48,
    };
    return sizes[size] || size;
  };

  const getContainerStyle = () => {
    const baseStyle = {
      alignItems: 'center',
      justifyContent: 'center',
    };

    if (fullScreen) {
      return [
        baseStyle,
        styles.fullScreen,
        style,
      ];
    }

    return [baseStyle, style];
  };

  return (
    <View style={getContainerStyle()} {...props}>
      <ActivityIndicator size={getSizeValue()} color={color} />
      {message && (
        <Text style={[styles.message, { color }]}>
          {message}
        </Text>
      )}
    </View>
  );
};

export default LoadingSpinner; 