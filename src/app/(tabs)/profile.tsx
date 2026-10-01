import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrutalCard } from '@/components/BrutalCard';
import { Stamp } from '@/components/Stamp';
import { colors } from '@/theme/colors';
import { globalStyles, shadows, radii } from '@/theme/typography';
import { mockProfile } from '@/data/mockData';
import { MapPin, Settings, Share2, Bookmark, Check } from 'lucide-react-native';

const PROFILE_TABS = ['Portfolio', 'Artworks', 'Saved'];

const portfolioTints = [
  colors.primary.coral, colors.secondary.amber, colors.secondary.lavender,
  colors.secondary.sky, colors.secondary.sage, colors.primary.coralSoft,
];

function chunkArray<T>(arr: T[], size: number): (T | null)[][] {
  const result: (T | null)[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    const chunk: (T | null)[] = arr.slice(i, i + size);
    while (chunk.length < size) {
      chunk.push(null);
    }
    result.push(chunk);
  }
  return result;
}

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('Portfolio');
  const [following, setFollowing] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Top bar */}
        <View style={styles.topBar}>
          <Text style={[globalStyles.stamp, { color: colors.text.tertiary }]}>
            {mockProfile.handle}
          </Text>
          <View style={styles.topActions}>
            <TouchableOpacity style={styles.iconBtn}>
              <Share2 size={18} color={colors.text.secondary} strokeWidth={1.5} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Settings size={18} color={colors.text.secondary} strokeWidth={1.5} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile hero — elegant, soft gradient card */}
        <View style={styles.heroBannerWrapper}>
          <View style={styles.heroBanner}>
            {/* Soft gradient background */}
            <View style={styles.heroGradient} />

            <View style={styles.heroInner}>
              {/* Avatar */}
              <View style={styles.avatarWrapper}>
                <View style={styles.avatar} />
                <View style={styles.verifiedBadge}>
                  <Check size={10} color="#fff" strokeWidth={3} />
                </View>
              </View>

              <Text style={[globalStyles.heading1, { color: '#fff', marginTop: 14, fontSize: 30 }]}>
                {mockProfile.name}
              </Text>
              <Text style={[globalStyles.body, { color: 'rgba(255,255,255,0.8)', marginTop: 4 }]}>
                {mockProfile.bio}
              </Text>
              <View style={styles.locationRow}>
                <MapPin size={13} color="rgba(255,255,255,0.6)" strokeWidth={1.5} />
                <Text style={[globalStyles.caption, { color: 'rgba(255,255,255,0.6)', marginLeft: 4 }]}>
                  {mockProfile.location}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Stats strip — clean, no heavy borders, responsive text */}
        <View style={styles.statsRow}>
          {[
            { label: 'Works', value: mockProfile.artworks },
            { label: 'Followers', value: mockProfile.followers.toLocaleString() },
            { label: 'Following', value: mockProfile.following },
            { label: 'Shows', value: mockProfile.exhibitions },
          ].map(({ label, value }) => (
            <View key={label} style={styles.statItem}>
              <Text
                style={[globalStyles.heading2, { fontSize: 18 }]}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {value}
              </Text>
              <Text style={[globalStyles.caption, { color: colors.text.tertiary, marginTop: 2 }]}>
                {label}
              </Text>
            </View>
          ))}
        </View>

        {/* Action buttons — soft, elegant */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.followBtn, following && styles.followBtnActive]}
            onPress={() => setFollowing(f => !f)}
            activeOpacity={0.8}
          >
            {following && <Check size={12} color="#fff" strokeWidth={3} style={{ marginRight: 4 }} />}
            <Text style={[globalStyles.stamp, { color: following ? '#fff' : colors.text.primary }]}>
              {following ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageBtn} activeOpacity={0.8}>
            <Text style={[globalStyles.stamp, { color: colors.primary.coral }]}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.collectBtn} activeOpacity={0.8}>
            <Bookmark size={18} color={colors.text.secondary} strokeWidth={1.5} />
          </TouchableOpacity>
        </View>

        {/* Profile tabs — soft segmented */}
        <View style={styles.profileTabs}>
          {PROFILE_TABS.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.profileTab, activeTab === tab && styles.profileTabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.profileTabText, activeTab === tab && styles.profileTabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Portfolio Grid — row-based 3-column grid that never wraps unexpectedly */}
        {activeTab === 'Portfolio' && (
          <View style={styles.portfolioGrid}>
            {chunkArray(mockProfile.portfolioColors, 3).map((row, rowIndex) => (
              <View key={rowIndex} style={styles.portfolioRow}>
                {row.map((color, colIndex) => {
                  if (!color) {
                    return <View key={colIndex} style={styles.portfolioTilePlaceholder} />;
                  }
                  const itemIndex = rowIndex * 3 + colIndex;
                  return (
                    <TouchableOpacity
                      key={colIndex}
                      style={[
                        styles.portfolioTile,
                        { backgroundColor: portfolioTints[itemIndex % portfolioTints.length] },
                      ]}
                      activeOpacity={0.9}
                    >
                      {itemIndex === 0 && (
                        <Stamp
                          label="Featured"
                          bgColor="rgba(255,255,255,0.85)"
                          textColor={colors.text.primary}
                          style={{ margin: 8 }}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>
        )}

        {/* Artworks for sale */}
        {activeTab === 'Artworks' && (
          <View style={styles.artworkList}>
            {['Terracotta No. 3', 'Ceramic Bowl Series', 'Field Study IV'].map((title, i) => {
              const artColors = [colors.primary.coral, colors.secondary.amber, colors.secondary.sage];
              return (
                <BrutalCard key={i} bgColor={colors.surface.card} style={{ width: '100%', marginBottom: 14, ...shadows.card }}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.artworkThumb, { backgroundColor: artColors[i] }]} />
                    <View style={{ flex: 1, padding: 16 }}>
                      <Text style={[globalStyles.heading3, { fontSize: 17 }]}>{title}</Text>
                      <Text style={[globalStyles.caption, { color: colors.text.tertiary, marginTop: 2, marginBottom: 10 }]}>
                        2024 / Ceramics
                      </Text>
                      <Stamp label="For Sale" bgColor={colors.tints.sage} textColor={colors.secondary.sage} />
                    </View>
                  </View>
                </BrutalCard>
              );
            })}
          </View>
        )}

        {/* Saved */}
        {activeTab === 'Saved' && (
          <View style={styles.portfolioGrid}>
            {chunkArray(
              [colors.secondary.lavender, colors.secondary.sky, colors.primary.coralSoft, colors.secondary.amber],
              3
            ).map((row, rowIndex) => (
              <View key={rowIndex} style={styles.portfolioRow}>
                {row.map((color, colIndex) => {
                  if (!color) {
                    return <View key={colIndex} style={styles.portfolioTilePlaceholder} />;
                  }
                  return (
                    <TouchableOpacity
                      key={colIndex}
                      style={[styles.portfolioTile, { backgroundColor: color }]}
                      activeOpacity={0.9}
                    />
                  );
                })}
              </View>
            ))}
          </View>
        )}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  topActions: { flexDirection: 'row', gap: 8 },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroBannerWrapper: { paddingHorizontal: 20, marginBottom: 0 },
  heroBanner: {
    width: '100%',
    borderRadius: radii.xl,
    overflow: 'hidden',
    position: 'relative',
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.primary.coral,
    opacity: 0.9,
  },
  heroInner: {
    padding: 24,
    paddingTop: 28,
    alignItems: 'center',
    position: 'relative',
  },
  avatarWrapper: { position: 'relative' },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 8,
    backgroundColor: colors.secondary.sage,
    borderWidth: 2,
    borderColor: colors.primary.coral,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface.card,
    borderRadius: radii.lg,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 16,
    overflow: 'hidden',
    ...shadows.card,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
  },
  actionRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 10,
  },
  followBtn: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    borderRadius: radii.pill,
    backgroundColor: colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  followBtnActive: { backgroundColor: colors.primary.coral },
  messageBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: radii.pill,
    backgroundColor: colors.tints.coral,
    alignItems: 'center',
  },
  collectBtn: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileTabs: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: radii.md,
    overflow: 'hidden',
    backgroundColor: colors.background.secondary,
    padding: 4,
    gap: 4,
  },
  profileTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  profileTabActive: { backgroundColor: colors.text.primary },
  profileTabText: { fontFamily: 'Poppins_500Medium', fontSize: 13, color: colors.text.secondary },
  profileTabTextActive: { color: '#fff' },
  portfolioGrid: {
    paddingHorizontal: 20,
  },
  portfolioRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  portfolioTile: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: radii.lg,
    ...shadows.card,
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  portfolioTilePlaceholder: {
    flex: 1,
    aspectRatio: 1,
  },
  artworkList: { paddingHorizontal: 20 },
  artworkThumb: {
    width: 100,
    height: 120,
    borderTopLeftRadius: radii.lg,
    borderBottomLeftRadius: radii.lg,
  },
});
