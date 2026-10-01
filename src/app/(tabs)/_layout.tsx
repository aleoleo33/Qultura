import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, ShoppingBag, PlusSquare, Users, User } from 'lucide-react-native';
import { colors } from '@/theme/colors';
import { shadows, radii } from '@/theme/typography';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, Platform.OS === 'ios' ? 16 : 8);
  const barHeight = 56 + bottomPadding;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary.coral,
        tabBarInactiveTintColor: colors.text.tertiary,
        tabBarStyle: [
          styles.tabBar,
          {
            height: barHeight,
            paddingBottom: bottomPadding,
          },
        ],
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              <Home size={22} color={focused ? colors.primary.coral : color} strokeWidth={focused ? 2 : 1.5} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="marketplace"
        options={{
          title: 'Collect',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              <ShoppingBag size={22} color={focused ? colors.primary.coral : color} strokeWidth={focused ? 2 : 1.5} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color }) => (
            <View style={styles.createButton}>
              <PlusSquare size={24} color={colors.text.inverse} strokeWidth={2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              <Users size={22} color={focused ? colors.primary.coral : color} strokeWidth={focused ? 2 : 1.5} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              <User size={22} color={focused ? colors.primary.coral : color} strokeWidth={focused ? 2 : 1.5} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface.card,
    borderTopWidth: 1,
    borderTopColor: colors.border.subtle,
    paddingTop: 6,
    elevation: 0,
    shadowOpacity: 0,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapActive: {
    backgroundColor: colors.tints.coral,
  },
  createButton: {
    backgroundColor: colors.primary.coral,
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    ...shadows.elevated,
  },
});
