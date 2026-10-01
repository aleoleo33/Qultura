import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/theme/colors';
import { globalStyles, shadows, radii } from '@/theme/typography';

interface EditorialCardProps {
  title: string;
  subtitle?: string;
  category?: string;
  color?: string;
  style?: ViewStyle;
  height?: number;
}

export function EditorialCard({
  title,
  subtitle,
  category,
  color = colors.primary.coral,
  style,
  height = 250,
}: EditorialCardProps) {
  return (
    <View style={[styles.card, { backgroundColor: color, height }, style]}>
      {category && (
        <View style={styles.tag}>
          <Text style={styles.tagText}>{category}</Text>
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,
    padding: 16,
    justifyContent: 'space-between',
    marginBottom: 16,
    ...shadows.elevated,
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radii.pill,
  },
  tagText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 10,
    letterSpacing: 1.2,
    color: colors.text.primary,
    textTransform: 'uppercase',
  },
  content: {
    marginTop: 'auto',
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontFamily: 'Poppins_400Regular',
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
});
