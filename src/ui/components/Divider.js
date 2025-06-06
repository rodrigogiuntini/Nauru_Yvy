import React from 'react';
import { View } from 'react-native';
import { Colors, Spacing } from '../design-system/tokens';

const Divider = ({
  orientation = 'horizontal',
  thickness = 1,
  color = Colors.surfaceLight,
  spacing = Spacing.md,
  style,
  ...props
}) => {
  const getDividerStyle = () => {
    const baseStyle = {
      backgroundColor: color,
    };

    if (orientation === 'horizontal') {
      return {
        ...baseStyle,
        height: thickness,
        marginVertical: spacing,
      };
    } else {
      return {
        ...baseStyle,
        width: thickness,
        marginHorizontal: spacing,
      };
    }
  };

  return (
    <View
      style={[getDividerStyle(), style]}
      {...props}
    />
  );
};

export default Divider; 