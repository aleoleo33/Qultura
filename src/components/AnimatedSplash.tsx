import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  runOnJS,
  Easing,
  withSpring,
} from 'react-native-reanimated';
import { colors } from '@/theme/colors';
import Svg, { Path, Circle, Rect, Polygon } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const TEXT = 'KULTURA'.split('');

// Highly expressive artsy collage background
function ArtsyCollage() {
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ position: 'absolute' }}>
      {/* Massive abstract torn paper / shape */}
      <Path
        d={`M -50 ${height * 0.2} Q ${width * 0.5} -100 ${width * 1.2} ${height * 0.4} T -50 ${height * 0.8} Z`}
        fill={colors.secondary.lavender}
        fillOpacity={0.9}
      />
      {/* Jagged starburst */}
      <Polygon
        points={`${width*0.8},${height*0.2} ${width*0.9},${height*0.3} ${width*1.1},${height*0.25} ${width*0.95},${height*0.4} ${width*1.0},${height*0.6} ${width*0.8},${height*0.45} ${width*0.6},${height*0.5} ${width*0.75},${height*0.35}`}
        fill={colors.secondary.amber}
      />
      {/* Thick chaotic ink squiggle */}
      <Path
        d={`M ${width * 0.1} ${height * 0.8} C ${width * 0.3} ${height * 0.5}, ${width * 0.1} ${height * 0.3}, ${width * 0.5} ${height * 0.1} S ${width * 0.8} ${height * 0.6}, ${width * 0.9} ${height * 0.9}`}
        stroke={colors.primary.coral}
        strokeWidth="18"
        fill="none"
        strokeLinecap="round"
      />
      {/* Random geometric confetti */}
      <Rect x={width * 0.2} y={height * 0.15} width={60} height={60} fill={colors.secondary.sky} transform={`rotate(15 ${width * 0.2} ${height * 0.15})`} />
      <Circle cx={width * 0.75} cy={height * 0.75} r={35} fill={colors.primary.coralDeep} />
      {/* Dotted pattern accents */}
      <Circle cx={width * 0.15} cy={height * 0.6} r={8} fill={colors.text.primary} />
      <Circle cx={width * 0.2} cy={height * 0.62} r={5} fill={colors.text.primary} />
      <Circle cx={width * 0.12} cy={height * 0.65} r={12} fill={colors.text.primary} />
    </Svg>
  );
}

const letterColors = [
  colors.text.primary,
  colors.primary.coral,
  colors.secondary.amber,
  colors.secondary.sky,
  colors.primary.coralDeep,
  colors.secondary.sage,
  colors.text.primary,
];

const letterRotations = [-12, 8, -15, 10, -5, 18, -10];

interface AnimatedSplashProps {
  onAnimationComplete: () => void;
}

export function AnimatedSplash({ onAnimationComplete }: AnimatedSplashProps) {
  const containerOpacity = useSharedValue(1);
  const collageScale = useSharedValue(0.5);
  const collageRot = useSharedValue(-20);

  // Letter entry/exit animations
  const letterY = TEXT.map(() => useSharedValue(-150)); // Drop from top
  const letterOpacity = TEXT.map(() => useSharedValue(0));
  const letterScale = TEXT.map(() => useSharedValue(3)); // Start massive and slam down
  const letterExitY = TEXT.map(() => useSharedValue(0)); // Used for falling out

  useEffect(() => {
    // 1. ENTRY ANIMATION
    // Artsy collage explodes in
    collageScale.value = withSpring(1, { damping: 14, stiffness: 90 });
    collageRot.value = withSpring(0, { damping: 12, stiffness: 70 });

    // Text stagger slam in (dynamic, messy, bouncy)
    const letterStartDelay = 400;
    TEXT.forEach((_, index) => {
      const delay = letterStartDelay + index * 120; 
      letterOpacity[index].value = withDelay(delay, withTiming(1, { duration: 300 }));
      letterY[index].value = withDelay(
        delay,
        withSpring(0, { damping: 8, stiffness: 150 }) // Heavy bounce
      );
      letterScale[index].value = withDelay(
        delay,
        withSpring(1, { damping: 8, stiffness: 150 })
      );
    });

    // 2. HOLD DURATION
    // Keep the splash screen fully visible for much longer (3 seconds)
    const holdDuration = 3000; 
    const startExitTime = letterStartDelay + TEXT.length * 120 + holdDuration;

    // 3. EXIT ANIMATION (Matches the messy Artsy vibe)
    setTimeout(() => {
      // A. Letters fall off the screen aggressively, one by one
      TEXT.forEach((_, index) => {
        letterExitY[index].value = withDelay(
          index * 40,
          withTiming(height, { duration: 500, easing: Easing.in(Easing.poly(3)) })
        );
      });

      // B. After letters start falling, the collage background zooms massively "into" the camera
      const collageZoomDelay = TEXT.length * 40 + 200;
      collageScale.value = withDelay(
        collageZoomDelay,
        withTiming(15, { duration: 700, easing: Easing.in(Easing.cubic) })
      );

      // C. Fade out the whole container right as the background explodes
      const finalFadeDelay = collageZoomDelay + 400;
      containerOpacity.value = withDelay(
        finalFadeDelay,
        withTiming(0, { duration: 300 }, (finished) => {
          if (finished) {
            runOnJS(onAnimationComplete)();
          }
        })
      );
    }, startExitTime);

  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  const collageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: collageScale.value }, { rotate: `${collageRot.value}deg` }],
  }));

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      {/* Exploding Artsy Collage Background */}
      <Animated.View style={[StyleSheet.absoluteFill, collageStyle]}>
        <ArtsyCollage />
      </Animated.View>

      {/* Chaotic, expressive Typography */}
      <View style={styles.textContainer}>
        {TEXT.map((letter, index) => {
          const style = useAnimatedStyle(() => ({
            opacity: letterOpacity[index].value,
            transform: [
              { translateY: letterY[index].value },
              { translateY: letterExitY[index].value }, // Add exit falling translation
              { scale: letterScale[index].value },
              { rotate: `${letterRotations[index]}deg` } // Messy collage rotation
            ],
          }));
          return (
            <Animated.Text 
              key={index} 
              style={[
                styles.letter, 
                { color: letterColors[index] },
                style
              ]}
            >
              {letter}
            </Animated.Text>
          );
        })}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  textContainer: {
    flexDirection: 'row',
    zIndex: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    fontFamily: 'Poppins_700Bold', 
    fontSize: 68, 
    letterSpacing: -5, 
    marginHorizontal: -4,
    // Artsy thick stamp shadow
    textShadowColor: colors.text.primary,
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 0,
  },
});
