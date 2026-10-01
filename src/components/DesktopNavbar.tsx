import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { colors } from '@/theme/colors';
import { globalStyles, radii, shadows } from '@/theme/typography';
import { Home, ShoppingBag, Users, User, Plus, Search, Bell } from 'lucide-react-native';

const NAV_ITEMS = [
  { label: 'Feed', route: '/', icon: Home },
  { label: 'Collect', route: '/marketplace', icon: ShoppingBag },
  { label: 'Community', route: '/community', icon: Users },
  { label: 'Profile', route: '/profile', icon: User },
];

export function DesktopNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.headerWrapper}>
      <View style={styles.headerInner}>
        {/* Logo & Brand */}
        <TouchableOpacity
          style={styles.brand}
          onPress={() => router.push('/')}
          activeOpacity={0.8}
        >
          <Text style={styles.logo}>qultura</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>web</Text>
          </View>
        </TouchableOpacity>

        {/* Center Navigation Links */}
        <View style={styles.navLinks}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.route === '/'
                ? pathname === '/' || pathname === '' || pathname === '/(tabs)' || pathname === '/(tabs)/index'
                : pathname.includes(item.route.replace('/', ''));

            return (
              <TouchableOpacity
                key={item.route}
                style={[styles.navItem, isActive && styles.navItemActive]}
                onPress={() => router.push(item.route as any)}
                activeOpacity={0.7}
              >
                <Icon
                  size={18}
                  color={isActive ? colors.primary.coral : colors.text.secondary}
                  strokeWidth={isActive ? 2 : 1.6}
                />
                <Text style={[styles.navText, isActive && styles.navTextActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Right Actions */}
        <View style={styles.rightActions}>
          {/* Quick Search */}
          <View style={styles.searchBar}>
            <Search size={15} color={colors.text.tertiary} strokeWidth={1.6} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search artworks, creators..."
              placeholderTextColor={colors.text.tertiary}
            />
            <View style={styles.kbdShortcut}>
              <Text style={styles.kbdText}>⌘K</Text>
            </View>
          </View>

          {/* New Post Button */}
          <TouchableOpacity
            style={styles.createBtn}
            onPress={() => router.push('/create')}
            activeOpacity={0.85}
          >
            <Plus size={16} color="#FFFFFF" strokeWidth={2.5} />
            <Text style={styles.createBtnText}>New Post</Text>
          </TouchableOpacity>

          {/* Notifications */}
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Bell size={18} color={colors.text.secondary} strokeWidth={1.6} />
            <View style={styles.notifDot} />
          </TouchableOpacity>

          {/* User Profile Avatar */}
          <TouchableOpacity
            style={styles.avatarBtn}
            onPress={() => router.push('/profile')}
            activeOpacity={0.8}
          >
            <View style={styles.avatar} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
    zIndex: 100,
    ...(Platform.OS === 'web'
      ? {
          position: 'sticky' as any,
          top: 0,
          backdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(255, 255, 255, 0.94)',
        }
      : {}),
  },
  headerInner: {
    maxWidth: 1320,
    width: '100%',
    marginHorizontal: 'auto',
    height: 68,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 26,
    color: colors.text.primary,
    letterSpacing: -0.6,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radii.pill,
    backgroundColor: colors.tints.sage,
  },
  badgeText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 10,
    color: colors.secondary.sage,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    padding: 4,
    borderRadius: radii.pill,
    gap: 4,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radii.pill,
    gap: 8,
  },
  navItemActive: {
    backgroundColor: '#FFFFFF',
    ...shadows.subtle,
  },
  navText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 13,
    color: colors.text.secondary,
  },
  navTextActive: {
    color: colors.primary.coral,
    fontFamily: 'Poppins_700Bold',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: radii.pill,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 8,
    width: 240,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: colors.text.primary,
    paddingVertical: 0,
    outlineWidth: 0,
  } as any,
  kbdShortcut: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border.subtle,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  kbdText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 10,
    color: colors.text.tertiary,
  },
  createBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary.coral,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radii.pill,
    gap: 6,
    ...shadows.subtle,
  },
  createBtnText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: '#FFFFFF',
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary.coral,
  },
  avatarBtn: {
    marginLeft: 2,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 14,
    backgroundColor: colors.primary.coralSoft,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});
