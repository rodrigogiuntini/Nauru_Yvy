import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const DroneLandscape = ({ width = 350, height = 200, style }) => {
  return (
    <View style={[{ width, height, borderRadius: 16, overflow: 'hidden' }, style]}>
      {/* Background Sky Gradient */}
      <LinearGradient
        colors={['#87CEEB', '#98D8E8', '#B0E6FF']}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* Mountains Background */}
      <View style={{
        position: 'absolute',
        bottom: '45%',
        left: 0,
        right: 0,
        height: '30%',
        backgroundColor: '#D3E8D3',
        overflow: 'hidden'
      }}>
        {/* Mountain Peaks */}
        <View style={{
          position: 'absolute',
          bottom: 0,
          left: '-10%',
          width: '40%',
          height: '120%',
          backgroundColor: '#C8DCC8',
          transform: [{ rotate: '15deg' }]
        }} />
        <View style={{
          position: 'absolute',
          bottom: 0,
          left: '20%',
          width: '35%',
          height: '100%',
          backgroundColor: '#BED6BE',
          transform: [{ rotate: '-10deg' }]
        }} />
        <View style={{
          position: 'absolute',
          bottom: 0,
          right: '10%',
          width: '45%',
          height: '110%',
          backgroundColor: '#D3E8D3',
          transform: [{ rotate: '8deg' }]
        }} />
      </View>

      {/* Ground/Terrain */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '45%',
        backgroundColor: '#90C695'
      }}>
        {/* Rolling Hills */}
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '40%',
          backgroundColor: '#A8D4A8',
          borderTopLeftRadius: 200,
          borderTopRightRadius: 150
        }} />
        
        {/* Trees scattered across terrain */}
        {[...Array(8)].map((_, i) => (
          <View
            key={i}
            style={{
              position: 'absolute',
              bottom: '20%',
              left: `${15 + i * 10}%`,
              width: 8,
              height: 12,
              backgroundColor: '#228B22',
              borderRadius: 6,
              transform: [{ scale: 0.8 + Math.random() * 0.4 }]
            }}
          />
        ))}
        
        {/* River/Stream */}
        <View style={{
          position: 'absolute',
          bottom: '15%',
          left: '20%',
          right: '20%',
          height: 4,
          backgroundColor: '#6BB6FF',
          borderRadius: 2,
          opacity: 0.8
        }} />
      </View>

      {/* Drone */}
      <View style={{
        position: 'absolute',
        top: '25%',
        left: '50%',
        width: 16,
        height: 12,
        backgroundColor: '#333',
        borderRadius: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        transform: [{ translateX: -8 }]
      }}>
        {/* Propellers */}
        <View style={{
          position: 'absolute',
          top: -2,
          left: -4,
          width: 6,
          height: 2,
          backgroundColor: '#666',
          borderRadius: 1
        }} />
        <View style={{
          position: 'absolute',
          top: -2,
          right: -4,
          width: 6,
          height: 2,
          backgroundColor: '#666',
          borderRadius: 1
        }} />
        <View style={{
          position: 'absolute',
          bottom: -2,
          left: -4,
          width: 6,
          height: 2,
          backgroundColor: '#666',
          borderRadius: 1
        }} />
        <View style={{
          position: 'absolute',
          bottom: -2,
          right: -4,
          width: 6,
          height: 2,
          backgroundColor: '#666',
          borderRadius: 1
        }} />
      </View>

      {/* Telemetry Panel */}
      <View style={{
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        borderRadius: 8,
        minWidth: 120
      }}>
        <Text style={{
          color: '#FF6B35',
          fontSize: 10,
          fontWeight: 'bold',
          marginBottom: 2
        }}>Altitude: 25.0m</Text>
        <Text style={{
          color: '#FF6B35',
          fontSize: 10,
          fontWeight: 'bold',
          marginBottom: 2
        }}>Velocidade: 24.5 m/s</Text>
        <Text style={{
          color: '#FF6B35',
          fontSize: 10,
          fontWeight: 'bold',
          marginBottom: 2
        }}>Bateria: 65%</Text>
        <Text style={{
          color: '#FF6B35',
          fontSize: 10,
          fontWeight: 'bold'
        }}>Pontos Scan: 3505</Text>
      </View>
    </View>
  );
};

export default DroneLandscape; 