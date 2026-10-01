// Elegant card — soft shadow, generous radius, no hard borders
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/theme/colors';
import { shadows, radii } from '@/theme/typography';

interface ElegantCardProps {
  children: React.ReactNode;
  bgColor?: string;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'flat' | 'tinted';
  tintColor?: string;
}

export function BrutalCard({
  children,
  bgColor,
  style,
  variant = 'default',
  tintColor,
  // Ignore legacy props silently
  ...rest
}: ElegantCardProps & { shadowColor?: string; rotate?: number; shadowOffset?: number }) {
  const resolvedBg = bgColor || (variant === 'flat' ? 'transparent' : colors.surface.card);
  const shadowStyle = variant === 'elevated' ? shadows.elevated :
                      variant === 'flat' ? {} :
                      shadows.card;

  return (
    <View
      style={[
        styles.card,
        shadowStyle,
        {
          backgroundColor: tintColor || resolvedBg,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
});
