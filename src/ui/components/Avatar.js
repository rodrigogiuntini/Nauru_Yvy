import React from 'react';
import { View, Image, Text } from 'react-native';
import { Colors, Typography, BorderRadius } from '../design-system/tokens';

const Avatar = ({
  source,
  name,
  size = 'medium',
  variant = 'circle',
  style,
  ...props
}) => {
  const getSizeStyle = () => {
    const sizes = {
      small: { width: 32, height: 32 },
      medium: { width: 48, height: 48 },
      large: { width: 64, height: 64 },
      xlarge: { width: 80, height: 80 },
    };
    return sizes[size];
  };

  const getContainerStyle = () => {
    const baseStyle = {
      ...getSizeStyle(),
      backgroundColor: Colors.surfaceLight,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    };

    const variantStyle = {
      circle: {
        borderRadius: BorderRadius.full,
      },
      rounded: {
        borderRadius: BorderRadius.lg,
      },
      square: {
        borderRadius: 0,
      },
    };

    return [
      baseStyle,
      variantStyle[variant],
      style,
    ];
  };

  const getInitials = () => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getTextSize = () => {
    const textSizes = {
      small: Typography.fontSize.xs,
      medium: Typography.fontSize.sm,
      large: Typography.fontSize.base,
      xlarge: Typography.fontSize.lg,
    };
    return textSizes[size];
  };

  return (
    <View style={getContainerStyle()} {...props}>
      {source ? (
        <Image
          source={source}
          style={{
            width: '100%',
            height: '100%',
          }}
          resizeMode="cover"
        />
      ) : (
        <Text
          style={{
            fontSize: getTextSize(),
            fontWeight: Typography.fontWeight.semibold,
            color: Colors.textPrimary,
          }}
        >
          {getInitials()}
        </Text>
      )}
    </View>
  );
};

export default Avatar; 