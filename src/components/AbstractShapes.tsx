import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

export function BlobShape({ color, size = 100, style }: { color: string; size?: number; style?: any }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200" style={style}>
      <Path
        fill={color}
        d="M45.7,-76.1C58.9,-69.3,69,-55.4,75.4,-40.5C81.8,-25.6,84.4,-9.7,82.4,5.5C80.4,20.7,73.8,35.2,64.2,46.8C54.6,58.4,42.1,67.1,28.2,73.2C14.3,79.3,-1.1,82.8,-16.4,81.3C-31.7,79.8,-46.9,73.3,-58.5,62.3C-70.1,51.3,-78.1,35.8,-82.1,19.3C-86.1,2.8,-86.1,-14.7,-80.4,-30.5C-74.7,-46.3,-63.3,-60.4,-49.1,-66.8C-34.9,-73.2,-17.5,-71.9,-0.6,-70.8C16.3,-69.7,32.6,-82.9,45.7,-76.1Z"
        transform="translate(100 100)"
      />
    </Svg>
  );
}

export function SquiggleShape({ color, size = 100, style }: { color: string; size?: number; style?: any }) {
  return (
    <Svg width={size} height={size / 2} viewBox="0 0 200 100" style={style}>
      <Path
        stroke={color}
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
        d="M 10 50 Q 30 10 50 50 T 90 50 T 130 50 T 170 50"
      />
    </Svg>
  );
}

export function DoodleStar({ color, size = 50, style }: { color: string; size?: number; style?: any }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" style={style}>
      <Path
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        d="M 50 10 L 55 45 L 90 50 L 55 55 L 50 90 L 45 55 L 10 50 L 45 45 Z"
      />
    </Svg>
  );
}
