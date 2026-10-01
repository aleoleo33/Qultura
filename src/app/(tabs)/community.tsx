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
import { mockCircles, mockEvents } from '@/data/mockData';
import { Users, Calendar, MapPin, Wifi, Check } from 'lucide-react-native';
import { useResponsive } from '@/hooks/useResponsive';

const SECTIONS = ['Circles', 'Events', 'Mentorship'];

const circleTints = [
  colors.primary.coral, colors.secondary.lavender,
  colors.secondary.sky, colors.secondary.sage,
];

const eventTints = [
  colors.primary.coral, colors.secondary.amber,
  colors.secondary.lavender, colors.secondary.sage,
];

export default function CommunityScreen() {
  const [activeSection, setActiveSection] = useState('Circles');
  const [joined, setJoined] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const { isWide } = useResponsive();

  const toggleJoin = (id: string) =>
    setJoined(prev => ({ ...prev, [id]: !prev[id] }));

  const toggleSave = (id: string) =>
    setSaved(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <SafeAreaView style={styles.container} edges={isWide ? [] : ['top', 'left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentWrapper}>

          {/* Header */}
          <View style={styles.header}>
            <Text style={globalStyles.heading1}>Community</Text>
            <Text style={[globalStyles.body, { color: colors.text.tertiary, marginTop: 2 }]}>
              Find your creative people and artistic circles
            </Text>
          </View>

          {/* Section tabs — soft segmented */}
          <View style={[styles.sectionTabs, isWide && { maxWidth: 440, marginHorizontal: 20 }]}>
            {SECTIONS.map(s => (
              <TouchableOpacity
                key={s}
                style={[styles.sectionTab, activeSection === s && styles.sectionTabActive]}
                onPress={() => setActiveSection(s)}
                activeOpacity={0.8}
              >
                <Text style={[styles.sectionTabText, activeSection === s && styles.sectionTabTextActive]}>
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* CIRCLES */}
          {activeSection === 'Circles' && (
            <View style={[styles.list, isWide && styles.listDesktop]}>
              {/* Intro card — full width */}
              <BrutalCard bgColor={colors.tints.lavender} style={styles.introCard}>
                <View style={{ padding: 24 }}>
                  <Stamp label="New" bgColor={colors.secondary.lavender} textColor="#fff" />
                  <Text style={[globalStyles.heading2, { marginTop: 10, marginBottom: 6 }]}>
                    Creative Circles
                  </Text>
                  <Text style={[globalStyles.body, { maxWidth: 640 }]}>
                    Small, focused communities built around specific art forms and practices. Exchange critique, share resources, and find your tribe.
                  </Text>
                </View>
              </BrutalCard>

              {mockCircles.map((circle, i) => (
                <BrutalCard
                  key={circle.id}
                  bgColor={colors.surface.card}
                  style={[styles.circleCard, isWide && { width: '48.8%' }]}
                >
                  <View style={styles.circleInner}>
                    <View style={[styles.circleSwatch, { backgroundColor: circleTints[i % circleTints.length] }]}>
                      <Users size={22} color="#fff" strokeWidth={1.5} />
                    </View>
                    <View style={styles.circleInfo}>
                      <Text style={[globalStyles.heading3, { fontSize: 17 }]}>{circle.name}</Text>
                      <Text style={[globalStyles.caption, { marginBottom: 6 }]}>
                        {circle.description}
                      </Text>
                      <View style={styles.circleStats}>
                        <Text style={[globalStyles.caption, { color: colors.text.tertiary }]}>
                          {circle.members.toLocaleString()} members
                        </Text>
                        <View style={styles.dot} />
                        <Text style={[globalStyles.caption, { color: colors.text.tertiary }]}>
                          {circle.posts} posts this week
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.circleFooter}>
                    <TouchableOpacity
                      style={[
                        styles.joinBtn,
                        joined[circle.id] && styles.joinBtnActive,
                      ]}
                      onPress={() => toggleJoin(circle.id)}
                      activeOpacity={0.8}
                    >
                      {joined[circle.id] && <Check size={12} color="#fff" strokeWidth={3} style={{ marginRight: 4 }} />}
                      <Text style={[
                        globalStyles.stamp,
                        { color: joined[circle.id] ? '#fff' : colors.text.secondary },
                      ]}>
                        {joined[circle.id] ? 'Joined' : 'Join Circle'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.peekBtn} activeOpacity={0.7}>
                      <Text style={[globalStyles.stamp, { color: colors.primary.coral }]}>
                        Preview
                      </Text>
                    </TouchableOpacity>
                  </View>
                </BrutalCard>
              ))}
            </View>
          )}

          {/* EVENTS */}
          {activeSection === 'Events' && (
            <View style={[styles.list, isWide && styles.listDesktop]}>
              {mockEvents.map((event, i) => {
                const tint = eventTints[i % eventTints.length];
                return (
                  <BrutalCard
                    key={event.id}
                    bgColor={tint}
                    style={[styles.eventCard, isWide && { width: '48.8%' }]}
                  >
                    <View style={styles.eventInner}>
                      <View style={styles.eventTop}>
                        <Stamp
                          label={event.isOnline ? 'Online' : 'In-Person'}
                          bgColor="rgba(255,255,255,0.85)"
                          textColor={colors.text.primary}
                        />
                        {event.isOnline
                          ? <Wifi size={18} color="#fff" strokeWidth={1.5} />
                          : <MapPin size={18} color="#fff" strokeWidth={1.5} />
                        }
                      </View>

                      <Text style={[globalStyles.heading1, { color: '#fff', fontSize: 28, lineHeight: 34, marginTop: 16 }]}>
                        {event.title}
                      </Text>
                      <Text style={[globalStyles.accentText, { color: 'rgba(255,255,255,0.85)', marginBottom: 16, fontStyle: 'italic' }]}>
                        {event.subtitle}
                      </Text>

                      <View style={styles.eventMeta}>
                        <View style={styles.eventMetaRow}>
                          <Calendar size={14} color="rgba(255,255,255,0.8)" strokeWidth={1.5} />
                          <Text style={[globalStyles.caption, { color: 'rgba(255,255,255,0.8)', marginLeft: 6 }]}>
                            {event.date}
                          </Text>
                        </View>
                        <View style={styles.eventMetaRow}>
                          <MapPin size={14} color="rgba(255,255,255,0.8)" strokeWidth={1.5} />
                          <Text style={[globalStyles.caption, { color: 'rgba(255,255,255,0.8)', marginLeft: 6 }]}>
                            {event.location}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.eventActions}>
                        <TouchableOpacity
                          style={styles.rsvpBtn}
                          onPress={() => toggleSave(event.id)}
                          activeOpacity={0.8}
                        >
                          {saved[event.id] && <Check size={12} color={tint} strokeWidth={3} style={{ marginRight: 4 }} />}
                          <Text style={[globalStyles.stamp, { color: tint }]}>
                            {saved[event.id] ? 'Saved' : 'Save Event'}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.shareBtn} activeOpacity={0.7}>
                          <Text style={[globalStyles.stamp, { color: 'rgba(255,255,255,0.85)' }]}>
                            Share
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </BrutalCard>
                );
              })}
            </View>
          )}

          {/* MENTORSHIP */}
          {activeSection === 'Mentorship' && (
            <View style={[styles.list, isWide && styles.listDesktop]}>
              <BrutalCard bgColor={colors.tints.amber} style={styles.mentorHero}>
                <View style={{ padding: 24 }}>
                  <Stamp label="Beta" bgColor={colors.secondary.amber} textColor="#fff" />
                  <Text style={[globalStyles.heading2, { marginTop: 12, marginBottom: 8 }]}>
                    Find a Mentor
                  </Text>
                  <Text style={[globalStyles.body, { maxWidth: 640 }]}>
                    Connect with experienced artists who can guide your practice, offer critique, and open new doors.
                  </Text>
                </View>
              </BrutalCard>

              {['Ceramics', 'Illustration', 'Photography', 'Printmaking'].map((field, i) => {
                const avatarColors = [colors.primary.coral, colors.secondary.lavender, colors.secondary.sage, colors.secondary.sky];
                return (
                  <BrutalCard
                    key={field}
                    bgColor={colors.surface.card}
                    style={[{ width: '100%', marginBottom: 12, ...shadows.card }, isWide && { width: '48.8%', marginBottom: 16 }]}
                  >
                    <View style={styles.mentorRow}>
                      <View style={[styles.mentorAvatar, { backgroundColor: avatarColors[i] }]} />
                      <View style={{ flex: 1 }}>
                        <Text style={[globalStyles.heading3, { fontSize: 17 }]}>{field} Mentor</Text>
                        <Text style={globalStyles.caption}>2 spots available</Text>
                      </View>
                      <TouchableOpacity style={styles.applyBtn} activeOpacity={0.8}>
                        <Text style={[globalStyles.stamp, { color: '#fff' }]}>Apply</Text>
                      </TouchableOpacity>
                    </View>
                  </BrutalCard>
                );
              })}
            </View>
          )}

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
  sectionTabs: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: radii.md,
    overflow: 'hidden',
    backgroundColor: colors.background.secondary,
    padding: 4,
    gap: 4,
  },
  sectionTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  sectionTabActive: { backgroundColor: colors.text.primary },
  sectionTabText: { fontFamily: 'Poppins_500Medium', fontSize: 13, color: colors.text.secondary },
  sectionTabTextActive: { color: '#fff' },
  list: { paddingHorizontal: 20, gap: 14 },
  listDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  introCard: { width: '100%' },
  circleCard: { width: '100%', ...shadows.card },
  circleInner: { flexDirection: 'row', padding: 16, gap: 14 },
  circleSwatch: {
    width: 50,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleInfo: { flex: 1 },
  circleStats: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  dot: { width: 3, height: 3, borderRadius: 2, backgroundColor: colors.text.tertiary },
  circleFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 14,
    gap: 10,
  },
  joinBtn: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    borderRadius: radii.pill,
    backgroundColor: colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinBtnActive: { backgroundColor: colors.secondary.sage },
  peekBtn: { paddingHorizontal: 8 },
  eventCard: { width: '100%' },
  eventInner: { padding: 24 },
  eventTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  eventMeta: { gap: 6, marginBottom: 20 },
  eventMetaRow: { flexDirection: 'row', alignItems: 'center' },
  eventActions: { flexDirection: 'row', gap: 12, alignItems: 'center', flexWrap: 'wrap' },
  rsvpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: radii.pill,
  },
  shareBtn: { paddingHorizontal: 8 },
  mentorHero: { width: '100%' },
  mentorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
  },
  mentorAvatar: {
    width: 46,
    height: 46,
    borderRadius: 14,
  },
  applyBtn: {
    backgroundColor: colors.primary.coral,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radii.pill,
  },
});
