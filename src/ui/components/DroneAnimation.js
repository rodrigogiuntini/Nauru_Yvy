import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

const DroneAnimation = ({ width = 300, height = 200, autoPlay = true, loop = true, style, ...props }) => {
  return (
    <View style={[{ width, height, alignItems: 'center', justifyContent: 'center' }, style]}>
      <LottieView
        source={require('../../assets/animations/simple-drone-animation.json')}
        style={{ width: '100%', height: '100%' }}
        autoPlay={autoPlay}
        loop={loop}
        {...props}
      />
    </View>
  );
};

export default DroneAnimation; 