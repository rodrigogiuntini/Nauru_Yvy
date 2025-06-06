import React from 'react';
import { View, Text, Modal as RNModal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../design-system/tokens';
import { modalStyles as styles } from './Modal.styles';

const Modal = ({
  visible,
  onClose,
  title,
  children,
  showCloseButton = true,
  animationType = 'slide',
  transparent = true,
  style,
  contentStyle,
  ...props
}) => {
  return (
    <RNModal
      animationType={animationType}
      transparent={transparent}
      visible={visible}
      onRequestClose={onClose}
      {...props}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, style]}>
          <View style={[styles.content, contentStyle]}>
            {/* Header */}
            {(title || showCloseButton) && (
              <View style={styles.header}>
                {title && <Text style={styles.title}>{title}</Text>}
                {showCloseButton && (
                  <TouchableOpacity
                    onPress={onClose}
                    style={styles.closeButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons name="close" size={24} color={Colors.textPrimary} />
                  </TouchableOpacity>
                )}
              </View>
            )}
            
            {/* Body */}
            <View style={styles.body}>
              {children}
            </View>
          </View>
        </View>
      </View>
    </RNModal>
  );
};

export default Modal; 