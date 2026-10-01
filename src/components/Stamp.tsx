// Soft badge/pill — replaces the old heavy-bordered Stamp
import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/theme/colors';
import { globalStyles, radii } from '@/theme/typography';

interface StampProps {
  label: string;
  bgColor?: string;
  textColor?: string;
  style?: ViewStyle;
}

export function Stamp({
  label,
  bgColor = colors.tints.coral,
  textColor = colors.primary.coral,
  style,
}: StampProps) {
  return (
    <View style={[styles.badge, { backgroundColor: bgColor }, style]}>
      <Text style={[globalStyles.stamp, { color: textColor, fontSize: 9 }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.pill,
    alignSelf: 'flex-start',
  },
});
