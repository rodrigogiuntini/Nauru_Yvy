import React from 'react';
import { View } from 'react-native';
import Svg, { 
  G, 
  Ellipse, 
  Circle, 
  Rect, 
  Path, 
  Text 
} from 'react-native-svg';

const NauruLogo = ({ width = 240, height = 320, ...props }) => {
  const scale = Math.min(width / 300, height / 400);
  
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg 
        width={width} 
        height={height} 
        viewBox="0 0 300 400" 
        {...props}
      >
        {/* Drone */}
        <G transform="translate(150, 80)">
          {/* Propellers */}
          <Ellipse cx="-60" cy="-20" rx="25" ry="8" fill="#2D3A2D"/>
          <Ellipse cx="60" cy="-20" rx="25" ry="8" fill="#2D3A2D"/>
          
          {/* Propeller centers */}
          <Circle cx="-60" cy="-20" r="4" fill="#1A1A1A"/>
          <Circle cx="60" cy="-20" r="4" fill="#1A1A1A"/>
          
          {/* Drone body */}
          <Rect x="-50" y="-10" width="100" height="25" rx="12" fill="#2D3A2D"/>
          
          {/* Camera */}
          <Rect x="-15" y="-5" width="30" height="15" rx="8" fill="#1A1A1A"/>
          <Circle cx="0" cy="2.5" r="8" fill="#FFFFFF"/>
          <Circle cx="0" cy="2.5" r="5" fill="#1A1A1A"/>
          
          {/* Arms */}
          <Rect x="-70" y="-5" width="25" height="8" rx="4" fill="#2D3A2D"/>
          <Rect x="45" y="-5" width="25" height="8" rx="4" fill="#2D3A2D"/>
        </G>
        
        {/* Leaf */}
        <G transform="translate(150, 250)">
          {/* Main leaf shape */}
          <Path 
            d="M0,-80 Q-40,-60 -50,-20 Q-45,20 -30,50 Q-10,70 0,75 Q5,70 8,65 Q15,45 20,25 Q25,5 22,-15 Q18,-35 10,-55 Q5,-70 0,-80 Z" 
            fill="#2D5A2D"
          />
          
          {/* Leaf veins */}
          <Path 
            d="M0,-75 Q-35,-55 -45,-15 Q-40,25 -25,55" 
            stroke="#4A7C4A" 
            strokeWidth="1" 
            fill="none"
          />
          <Path 
            d="M0,-70 Q-30,-50 -35,-10 Q-32,20 -20,45" 
            stroke="#4A7C4A" 
            strokeWidth="1" 
            fill="none"
          />
          <Path 
            d="M0,-65 Q-25,-45 -25,-5 Q-22,15 -15,35" 
            stroke="#4A7C4A" 
            strokeWidth="1" 
            fill="none"
          />
          <Path 
            d="M0,-60 Q-20,-40 -15,0 Q-12,10 -8,25" 
            stroke="#4A7C4A" 
            strokeWidth="1" 
            fill="none"
          />
          
          {/* Central vein */}
          <Path 
            d="M0,-75 L0,70" 
            stroke="#FFFFFF" 
            strokeWidth="2" 
            fill="none"
          />
          
          {/* Leaf stem curl */}
          <Path 
            d="M0,75 Q10,80 15,85 Q18,88 16,92 Q12,95 8,92" 
            stroke="#2D5A2D" 
            strokeWidth="3" 
            fill="none"
          />
        </G>
        
        {/* Text */}
        <G transform="translate(150, 340)">
          <Text 
            x="0" 
            y="0" 
            textAnchor="middle" 
            fontFamily="Arial, sans-serif" 
            fontSize="36" 
            fontWeight="bold" 
            fill="#2D3A2D"
          >
            NAURÚ
          </Text>
          <Text 
            x="0" 
            y="45" 
            textAnchor="middle" 
            fontFamily="Arial, sans-serif" 
            fontSize="36" 
            fontWeight="bold" 
            fill="#2D3A2D"
          >
            YVY
          </Text>
        </G>
      </Svg>
    </View>
  );
};

export default NauruLogo; 