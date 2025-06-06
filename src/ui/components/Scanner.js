import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, Dimensions } from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import Button from './Button';
import { Colors, Spacing, Typography } from '../design-system/tokens';

const { width, height } = Dimensions.get('window');

const Scanner = ({ onScan, onClose }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    setScanning(false);
    
    Alert.alert(
      'QR Code Escaneado',
      `Dados: ${data}`,
      [
        { text: 'Escanear Novamente', onPress: () => setScanned(false) },
        { text: 'Usar Dados', onPress: () => onScan?.(data) },
      ]
    );
  };

  const startScanning = () => {
    setScanning(true);
    setScanned(false);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Solicitando permissão para câmera...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Sem acesso à câmera. Por favor, habilite nas configurações.
        </Text>
        <Button 
          title="Fechar" 
          onPress={onClose}
          style={styles.button}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {scanning ? (
        <>
          <CameraView
            style={styles.scanner}
            barcodeScannerSettings={{
              barcodeTypes: ['qr'],
            }}
            onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          />
          <View style={styles.overlay}>
            <View style={styles.scanFrame} />
            <Text style={styles.scanText}>
              Posicione o QR Code dentro do quadro
            </Text>
            <Button 
              title="Cancelar" 
              variant="secondary"
              onPress={() => setScanning(false)}
              style={styles.cancelButton}
            />
          </View>
        </>
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.scannerIcon}>📱</Text>
          <Text style={styles.title}>Scanner de QR Code</Text>
          <Text style={styles.subtitle}>
            Escaneie códigos QR para detectar ocorrências ambientais automaticamente
          </Text>
          <Button 
            title="Iniciar Scanner"
            onPress={startScanning}
            style={styles.startButton}
          />
          {onClose && (
            <Button 
              title="Fechar"
              variant="ghost"
              onPress={onClose}
              style={styles.closeButton}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scanner: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  scanFrame: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: 'transparent',
    marginBottom: Spacing.xl,
  },
  scanText: {
    color: Colors.white,
    fontSize: Typography.fontSize.md,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  cancelButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: Colors.white,
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  scannerIcon: {
    fontSize: 64,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 22,
  },
  startButton: {
    marginBottom: Spacing.md,
    width: '100%',
  },
  closeButton: {
    width: '100%',
  },
  message: {
    fontSize: Typography.fontSize.md,
    color: Colors.textPrimary,
    textAlign: 'center',
    margin: Spacing.xl,
  },
  button: {
    margin: Spacing.lg,
  },
});

export default Scanner; 