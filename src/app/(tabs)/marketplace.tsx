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
import { mockArtworks } from '@/data/mockData';
import { Heart, Gavel, Clock, ChevronRight } from 'lucide-react-native';
import { useResponsive } from '@/hooks/useResponsive';

const TABS = ['All', 'Paintings', 'Prints', 'Ceramics', 'Digital', 'Commission'];

const artworkTints = [
  colors.primary.coral,
  colors.secondary.sky,
  colors.secondary.sage,
  colors.secondary.lavender,
];

function formatPrice(n: number) {
  return `Rp ${(n / 1000).toFixed(0)}K`;
}

export default function MarketplaceScreen() {
  const [activeTab, setActiveTab] = useState('All');
  const [savedItems, setSavedItems] = useState<Record<string, boolean>>({});
  const { isWide, isDesktop } = useResponsive();

  const toggleSave = (id: string) => {
    setSavedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <SafeAreaView style={styles.container} edges={isWide ? [] : ['top', 'left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentWrapper}>

          {/* Header */}
          <View style={styles.header}>
            <Text style={globalStyles.heading1}>Collect</Text>
            <Text style={[globalStyles.body, { color: colors.text.tertiary, marginTop: 2 }]}>
              Artworks from independent artists
            </Text>
          </View>

          {/* Tabs — pill style */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll} contentContainerStyle={styles.tabsContent}>
            {TABS.map(tab => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.tabActive]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.8}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Live Auctions */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <View style={styles.liveIndicator} />
                <Text style={[globalStyles.heading3, { marginLeft: 8 }]}>Live Auctions</Text>
              </View>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={[globalStyles.stamp, { color: colors.primary.coral }]}>All auctions</Text>
              </TouchableOpacity>
            </View>

            {mockArtworks.filter(a => a.isAuction).map((artwork, i) => (
              <BrutalCard key={artwork.id} bgColor={artworkTints[i % artworkTints.length]} style={styles.auctionCard}>
                <View style={styles.auctionInner}>
                  <View style={styles.auctionTop}>
                    <Stamp label="Live" bgColor="rgba(255,255,255,0.25)" textColor="#fff" />
                    <View style={styles.timerBadge}>
                      <Clock size={12} color={colors.text.primary} strokeWidth={2} />
                      <Text style={[globalStyles.stamp, { marginLeft: 4, color: colors.text.primary }]}>{artwork.timeLeft}</Text>
                    </View>
                  </View>
                  <View style={[styles.auctionContentRow, isWide && styles.auctionContentRowDesktop]}>
                    <View style={[styles.auctionImagePlaceholder, isWide && { flex: 1.2, height: 240, marginBottom: 0 }]} />
                    <View style={[styles.auctionBottom, isWide && styles.auctionBottomDesktop]}>
                      <View style={{ flex: 1 }}>
                        <Text style={[globalStyles.heading2, { color: '#fff', fontSize: isWide ? 26 : 20 }]}>{artwork.title}</Text>
                        <Text style={[globalStyles.caption, { color: 'rgba(255,255,255,0.85)', marginTop: 4 }]}>by {artwork.artist}</Text>
                        {isWide && (
                          <Text style={[globalStyles.caption, { color: 'rgba(255,255,255,0.7)', marginTop: 10, lineHeight: 18 }]}>
                            Original studio artwork with physical certificate of authenticity and archival framing.
                          </Text>
                        )}
                      </View>
                      <View style={styles.auctionBidInfo}>
                        <Text style={[globalStyles.caption, { color: 'rgba(255,255,255,0.65)' }]}>
                          {artwork.bids} bids
                        </Text>
                        <Text style={[globalStyles.heading3, { color: '#fff' }]}>
                          {formatPrice(artwork.price)}
                        </Text>
                        <TouchableOpacity style={styles.bidBtn} activeOpacity={0.85}>
                          <Text style={[globalStyles.stamp, { color: colors.text.primary }]}>Place Bid</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </BrutalCard>
            ))}
          </View>

          {/* Available Works */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={globalStyles.heading3}>For Sale</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={[globalStyles.stamp, { color: colors.primary.coral }]}>Filter</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.forSaleContainer, isWide && styles.forSaleContainerDesktop]}>
              {mockArtworks.filter(a => !a.isAuction).map((artwork) => (
                <BrutalCard
                  key={artwork.id}
                  bgColor={colors.surface.card}
                  style={[
                    styles.productCard,
                    isWide && { width: (isDesktop ? '31.8%' : '48.5%') as any, marginBottom: 18 },
                  ]}
                >
                  <View style={[styles.productRow, isWide && { flexDirection: 'column' }]}>
                    <View style={[
                      styles.productImage,
                      { backgroundColor: artworkTints[(parseInt(artwork.id)) % artworkTints.length] },
                      isWide && { width: '100%', height: 180, borderBottomLeftRadius: 0, borderTopRightRadius: radii.lg },
                    ]}>
                      {artwork.isSold && (
                        <View style={styles.soldOverlay}>
                          <Text style={[globalStyles.stamp, { color: '#fff' }]}>SOLD</Text>
                        </View>
                      )}
                    </View>
                    <View style={[styles.productInfo, isWide && { padding: 18 }]}>
                      <Stamp
                        label={artwork.isSold ? 'Sold' : 'Available'}
                        bgColor={artwork.isSold ? colors.background.tertiary : colors.tints.sage}
                        textColor={artwork.isSold ? colors.text.tertiary : colors.secondary.sage}
                      />
                      <Text style={[globalStyles.heading3, { marginTop: 8, fontSize: 17 }]}>{artwork.title}</Text>
                      <Text style={[globalStyles.caption, { marginBottom: 8 }]}>by {artwork.artist}</Text>
                      <Text style={[globalStyles.heading3, { color: colors.primary.coral, fontSize: 17 }]}>
                        {formatPrice(artwork.price)}
                      </Text>
                      <View style={styles.productActions}>
                        <TouchableOpacity
                          style={[styles.buyBtn, artwork.isSold && styles.buyBtnDisabled]}
                          disabled={artwork.isSold}
                          activeOpacity={0.8}
                        >
                          <Text style={[globalStyles.stamp, { color: artwork.isSold ? colors.text.tertiary : '#fff' }]}>
                            {artwork.isSold ? 'Unavailable' : 'Buy Now'}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => toggleSave(artwork.id)} style={styles.saveBtn} activeOpacity={0.7}>
                          <Heart
                            size={16}
                            color={savedItems[artwork.id] ? colors.primary.coral : colors.text.tertiary}
                            fill={savedItems[artwork.id] ? colors.primary.coral : 'transparent'}
                            strokeWidth={1.5}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </BrutalCard>
              ))}
            </View>
          </View>

        {/* Commission Banner */}
        <View style={styles.section}>
          <BrutalCard bgColor={colors.secondary.sage} style={styles.commissionCard}>
            <View style={{ padding: 24 }}>
              <Stamp label="Open for Commission" bgColor="rgba(255,255,255,0.25)" textColor="#fff" />
              <Text style={[globalStyles.heading2, { color: '#fff', marginTop: 12, marginBottom: 8 }]}>
                Commission a{'\n'}custom artwork
              </Text>
              <Text style={[globalStyles.body, { color: 'rgba(255,255,255,0.85)', marginBottom: 20 }]}>
                Work directly with your favorite artist to create something made just for you.
              </Text>
              <TouchableOpacity style={styles.commissionBtn} activeOpacity={0.8}>
                <Text style={[globalStyles.stamp, { color: colors.secondary.sage }]}>
                  Browse Artists
                </Text>
              </TouchableOpacity>
            </View>
          </BrutalCard>
        </View>

        <View style={{ height: 48 }} />
      </View>
    </ScrollView>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  scrollContent: { paddingBottom: 24 },
  contentWrapper: { maxWidth: 1280, width: '100%', marginHorizontal: 'auto' },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  tabsScroll: { marginBottom: 20 },
  tabsContent: { paddingHorizontal: 20, gap: 8 },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.background.secondary,
  },
  tabActive: { backgroundColor: colors.text.primary },
  tabText: { fontFamily: 'Poppins_500Medium', fontSize: 12, color: colors.text.secondary },
  tabTextActive: { color: '#fff' },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center' },
  liveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.status.error,
  },
  auctionCard: { width: '100%' },
  auctionInner: { padding: 24 },
  auctionTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.pill,
  },
  auctionContentRow: {},
  auctionContentRowDesktop: {
    flexDirection: 'row',
    gap: 24,
    alignItems: 'center',
  },
  auctionImagePlaceholder: {
    height: 200,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: radii.md,
    marginBottom: 16,
  },
  auctionBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 12,
  },
  auctionBottomDesktop: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 20,
  },
  auctionBidInfo: { alignItems: 'flex-end', gap: 4, flexShrink: 0 },
  bidBtn: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radii.pill,
    marginTop: 4,
  },
  forSaleContainer: { width: '100%' },
  forSaleContainerDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  productCard: { width: '100%', marginBottom: 14, ...shadows.card },
  productRow: { flexDirection: 'row', gap: 0 },
  productImage: {
    width: 108,
    height: 144,
    position: 'relative',
    overflow: 'hidden',
    borderTopLeftRadius: radii.lg,
    borderBottomLeftRadius: radii.lg,
  },
  soldOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: { flex: 1, padding: 14, justifyContent: 'center' },
  productActions: { flexDirection: 'row', gap: 8, marginTop: 10, alignItems: 'center', flexWrap: 'wrap' },
  buyBtn: {
    backgroundColor: colors.text.primary,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radii.pill,
  },
  buyBtnDisabled: { backgroundColor: colors.background.tertiary },
  saveBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commissionCard: { width: '100%' },
  commissionBtn: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: radii.pill,
  },
});
