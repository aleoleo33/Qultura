import { TextStyle } from 'react-native';
import { colors } from './colors';

export const typography = {
  fonts: {
    heading: 'Poppins_700Bold',
    headingMedium: 'Poppins_500Medium',
    body: 'Poppins_400Regular',
    accent: 'Poppins_500Medium',
  },
  sizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    xxl: 26,
    hero: 34,
    mega: 48,
  },
  weights: {
    regular: '400',
    medium: '500',
    bold: '700',
    black: '900',
  } as const,
};

export const globalStyles = {
  // Elegant, breathing headings
  heading1: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.hero,
    fontWeight: typography.weights.bold as TextStyle['fontWeight'],
    color: colors.text.primary,
    letterSpacing: -0.8,
    lineHeight: 40,
  },
  heading2: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold as TextStyle['fontWeight'],
    color: colors.text.primary,
    letterSpacing: -0.4,
    lineHeight: 32,
  },
  heading3: {
    fontFamily: typography.fonts.headingMedium,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.medium as TextStyle['fontWeight'],
    color: colors.text.primary,
    letterSpacing: -0.2,
  },
  body: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.regular as TextStyle['fontWeight'],
    color: colors.text.secondary,
    lineHeight: 22,
  },
  bodyLarge: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.regular as TextStyle['fontWeight'],
    color: colors.text.secondary,
    lineHeight: 24,
  },
  caption: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.regular as TextStyle['fontWeight'],
    color: colors.text.tertiary,
    lineHeight: 18,
  },
  // Refined label — replaces the old heavy "stamp"
  label: {
    fontFamily: typography.fonts.headingMedium,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium as TextStyle['fontWeight'],
    letterSpacing: 1.2,
    textTransform: 'uppercase' as TextStyle['textTransform'],
    color: colors.text.secondary,
  },
  // Keep "stamp" as alias for backwards compat but point to label style
  stamp: {
    fontFamily: typography.fonts.headingMedium,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium as TextStyle['fontWeight'],
    letterSpacing: 1.2,
    textTransform: 'uppercase' as TextStyle['textTransform'],
    color: colors.text.secondary,
  },
  accentText: {
    fontFamily: typography.fonts.accent,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.medium as TextStyle['fontWeight'],
    color: colors.text.secondary,
  },
} as const;

// Shared design tokens
export const radii = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
} as const;

export const shadows = {
  subtle: {
    shadowColor: '#1E2530',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  card: {
    shadowColor: '#1E2530',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  elevated: {
    shadowColor: '#1E2530',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  float: {
    shadowColor: '#1E2530',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 24,
    elevation: 6,
  },
} as const;
