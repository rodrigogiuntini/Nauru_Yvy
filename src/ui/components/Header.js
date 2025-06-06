import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../design-system/tokens';
import { headerStyles as styles } from './Header.styles';

const Header = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  style,
  titleStyle,
  backgroundColor = Colors.background,
  showBackButton = false,
  navigation,
  ...props
}) => {
  const handleBackPress = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    } else if (onLeftPress) {
      onLeftPress();
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]} edges={['top']}>
      <View style={[styles.container, style]} {...props}>
        {/* Botão esquerdo */}
        <View style={styles.leftContainer}>
          {(showBackButton || leftIcon) && (
            <TouchableOpacity
              onPress={showBackButton ? handleBackPress : onLeftPress}
              style={styles.iconButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name={showBackButton ? 'arrow-back' : leftIcon}
                size={24}
                color={Colors.textPrimary}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Área central com título */}
        <View style={styles.centerContainer}>
          {title && (
            <Text style={[styles.title, titleStyle]} numberOfLines={1}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>

        {/* Botão direito */}
        <View style={styles.rightContainer}>
          {rightIcon && (
            <TouchableOpacity
              onPress={onRightPress}
              style={styles.iconButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name={rightIcon}
                size={24}
                color={Colors.textPrimary}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header; 