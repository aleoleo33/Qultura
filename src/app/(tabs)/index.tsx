import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, TextInput, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrutalCard } from '@/components/BrutalCard';
import { Stamp } from '@/components/Stamp';
import { colors } from '@/theme/colors';
import { globalStyles, shadows, radii } from '@/theme/typography';
import { mockPosts, mockStories } from '@/data/mockData';
import { Heart, Search, Bell } from 'lucide-react-native';
import { useResponsive } from '@/hooks/useResponsive';

const categories = ['All', 'Painting', 'Illustration', 'Photography', 'Print', 'Digital', 'Ceramics'];

// Soft muted tones for cards instead of loud primaries
const cardTints = [
  colors.primary.coral,
  colors.secondary.lavender,
  colors.secondary.sage,
  colors.secondary.amber,
  colors.secondary.sky,
  colors.primary.coralSoft,
];

export default function HomeFeedScreen() {
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchFocused, setSearchFocused] = useState(false);
  const { isWide, feedColumns } = useResponsive();

  const toggleLike = (id: string) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filtered = activeCategory === 'All'
    ? mockPosts
    : mockPosts.filter(p => p.category === activeCategory);

  // Dynamically partition items into N columns (2 on mobile, 3 on tablet, 4 on desktop)
  const columnsData = Array.from({ length: feedColumns }, () => [] as typeof filtered);
  filtered.forEach((post, i) => {
    columnsData[i % feedColumns].push(post);
  });

  return (
    <SafeAreaView style={styles.container} edges={isWide ? [] : ['top', 'left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentWrapper}>

          {/* Mobile Header — hidden on desktop since DesktopNavbar displays brand */}
          {!isWide && (
            <View style={styles.header}>
              <View>
                <Text style={styles.logo}>qultura</Text>
                <Text style={[globalStyles.caption, { color: colors.text.tertiary }]}>
                  creative culture platform
                </Text>
              </View>
              <TouchableOpacity style={styles.iconBtn}>
                <Bell size={20} color={colors.text.primary} strokeWidth={1.5} />
                <View style={styles.notifDot} />
              </TouchableOpacity>
            </View>
          )}

          {/* Mobile Search bar — hidden on desktop */}
          {!isWide && (
            <View style={styles.searchRow}>
              <View style={[styles.searchBox, searchFocused && styles.searchFocused]}>
                <Search size={16} color={colors.text.tertiary} strokeWidth={1.5} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search artists, artworks..."
                  placeholderTextColor={colors.text.tertiary}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
              </View>
            </View>
          )}

          {/* Stories row */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[styles.storiesScroll, isWide && { marginTop: 24, marginBottom: 24 }]}
            contentContainerStyle={styles.storiesContent}
          >
            {mockStories.map((story, i) => (
              <TouchableOpacity key={story.id} style={styles.storyItem} activeOpacity={0.8}>
                <View style={[styles.storyRing, { borderColor: cardTints[i % cardTints.length] }]}>
                  <View style={[styles.storyAvatar, { backgroundColor: cardTints[i % cardTints.length] }]} />
                </View>
                <Text style={[globalStyles.caption, styles.storyName]} numberOfLines={1}>
                  {story.name.split(' ')[0]}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.storyItem} activeOpacity={0.8}>
              <View style={[styles.storyRing, { borderColor: colors.border.subtle }]}>
                <View style={[styles.storyAvatar, { backgroundColor: colors.background.tertiary }]}>
                  <Text style={{ fontSize: 18, color: colors.text.tertiary }}>+</Text>
                </View>
              </View>
              <Text style={[globalStyles.caption, styles.storyName]}>Your story</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Category chips */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
            contentContainerStyle={styles.categoriesContent}
          >
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.chip, activeCategory === cat && styles.chipActive]}
                onPress={() => setActiveCategory(cat)}
                activeOpacity={0.8}
              >
                <Text style={[styles.chipText, activeCategory === cat && styles.chipTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Featured Artist — responsive layout */}
          <View style={styles.featuredWrapper}>
            <BrutalCard bgColor={colors.primary.coral} style={styles.featuredCard}>
              <View style={[styles.featuredInner, isWide && styles.featuredInnerDesktop]}>
                <View style={{ flex: 1 }}>
                  <Stamp label="Featured Artist" bgColor="rgba(255,255,255,0.2)" textColor="#fff" />
                  <Text style={[globalStyles.heading1, styles.featuredTitle, isWide && { fontSize: 36, lineHeight: 44 }]}>
                    Studio Genta
                  </Text>
                  <Text style={[globalStyles.body, { color: 'rgba(255,255,255,0.85)', maxWidth: 540 }]}>
                    Ceramics and analog objects from Yogyakarta. Creating timeless functional art from clay and earth.
                  </Text>
                  <TouchableOpacity style={styles.featuredBtn} activeOpacity={0.85}>
                    <Text style={[globalStyles.stamp, { color: colors.primary.coral }]}>
                      View Profile & Works
                    </Text>
                  </TouchableOpacity>
                </View>
                {isWide && (
                  <View style={styles.featuredDesktopVisual}>
                    <View style={styles.featuredVisualArt}>
                      <Text style={styles.featuredVisualEmoji}>🏺</Text>
                      <Text style={styles.featuredVisualCaption}>Studio Series / 2026</Text>
                    </View>
                  </View>
                )}
              </View>
            </BrutalCard>
          </View>

          {/* Section heading */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={globalStyles.heading2}>Fresh Works</Text>
              {isWide && (
                <Text style={[globalStyles.caption, { color: colors.text.tertiary, marginTop: 2 }]}>
                  Curated submissions from contemporary Indonesian artists
                </Text>
              )}
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={[globalStyles.stamp, { color: colors.primary.coral }]}>See All</Text>
            </TouchableOpacity>
          </View>

          {/* Masonry feed — dynamic 2 to 4 responsive columns */}
          {filtered.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={[globalStyles.heading3, { color: colors.text.secondary }]}>
                No artworks found
              </Text>
              <Text style={[globalStyles.caption, { color: colors.text.tertiary, marginTop: 4, textAlign: 'center' }]}>
                Try selecting another category or check back later.
              </Text>
              <TouchableOpacity
                style={styles.resetFilterBtn}
                onPress={() => setActiveCategory('All')}
                activeOpacity={0.8}
              >
                <Text style={[globalStyles.stamp, { color: colors.primary.coral }]}>
                  Show All
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[styles.masonry, isWide && { gap: 16 }]}>
              {columnsData.map((colPosts, colIndex) => (
                <View
                  key={colIndex}
                  style={[
                    styles.masonryCol,
                    colIndex % 2 !== 0 && { marginTop: isWide ? 28 : 20 },
                  ]}
                >
                  {colPosts.map((post) => (
                    <View
                      key={post.id}
                      style={[
                        styles.masonryCard,
                        {
                          height: post.height,
                          backgroundColor: cardTints[parseInt(post.id) % cardTints.length],
                        },
                      ]}
                    >
                      <View style={styles.masonryInner}>
                        <Stamp
                          label={post.category}
                          bgColor="rgba(255,255,255,0.85)"
                          textColor={colors.text.primary}
                        />
                        <View>
                          <Text style={[globalStyles.heading3, { color: '#fff', marginBottom: 2 }]} numberOfLines={2}>
                            {post.title}
                          </Text>
                          <Text style={[globalStyles.caption, { color: 'rgba(255,255,255,0.8)' }]} numberOfLines={1}>
                            {post.artist}
                          </Text>
                          <TouchableOpacity
                            style={styles.likeRow}
                            onPress={() => toggleLike(post.id)}
                            activeOpacity={0.7}
                          >
                            <Heart
                              size={14}
                              color={liked[post.id] || post.isLiked ? colors.primary.coralSoft : 'rgba(255,255,255,0.9)'}
                              fill={liked[post.id] || post.isLiked ? colors.primary.coralSoft : 'transparent'}
                              strokeWidth={1.5}
                            />
                            <Text style={[globalStyles.caption, { color: 'rgba(255,255,255,0.9)', marginLeft: 4 }]}>
                              {post.likes + (liked[post.id] ? 1 : 0)}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          <View style={{ height: 48 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  logo: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 28,
    color: colors.text.primary,
    letterSpacing: -0.5,
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.primary.coral,
  },
  searchRow: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    borderRadius: radii.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: colors.background.secondary,
  },
  searchFocused: {
    borderColor: colors.primary.coral,
    backgroundColor: colors.surface.card,
    ...shadows.subtle,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: colors.text.primary,
    paddingVertical: 0,
  },
  storiesScroll: { marginBottom: 16 },
  storiesContent: { paddingHorizontal: 20, gap: 14 },
  storyItem: { alignItems: 'center', width: 60 },
  storyRing: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    padding: 2,
    marginBottom: 4,
  },
  storyAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyName: {
    textAlign: 'center',
    width: 60,
  },
  categoriesScroll: { marginBottom: 20 },
  categoriesContent: { paddingHorizontal: 20, gap: 8 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.background.secondary,
  },
  chipActive: {
    backgroundColor: colors.text.primary,
  },
  chipText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: colors.text.secondary,
  },
  chipTextActive: {
    color: colors.text.inverse,
  },
  featuredWrapper: {
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  featuredCard: {
    width: '100%',
  },
  contentWrapper: {
    maxWidth: 1280,
    width: '100%',
    marginHorizontal: 'auto',
  },
  featuredInner: {
    padding: 24,
    zIndex: 2,
  },
  featuredInnerDesktop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 36,
    gap: 32,
  },
  featuredDesktopVisual: {
    width: 220,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  featuredVisualArt: {
    alignItems: 'center',
  },
  featuredVisualEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  featuredVisualCaption: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    letterSpacing: 0.5,
  },
  featuredTitle: {
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 8,
    lineHeight: 40,
  },
  featuredBtn: {
    marginTop: 20,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: radii.pill,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  masonry: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  masonryCol: {
    flex: 1,
  },
  masonryCard: {
    width: '100%',
    borderRadius: radii.lg,
    overflow: 'hidden',
    marginBottom: 12,
    ...shadows.card,
  },
  masonryInner: {
    flex: 1,
    padding: 14,
    justifyContent: 'space-between',
  },
  likeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  emptyState: {
    padding: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    backgroundColor: colors.background.secondary,
    borderRadius: radii.lg,
    marginTop: 8,
  },
  resetFilterBtn: {
    marginTop: 16,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.surface.card,
    ...shadows.subtle,
  },
});
