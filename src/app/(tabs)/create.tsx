import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrutalCard } from '@/components/BrutalCard';
import { colors } from '@/theme/colors';
import { globalStyles, shadows, radii } from '@/theme/typography';
import { Image as ImageIcon, Film, FileText, X, Check } from 'lucide-react-native';

const POST_TYPES = [
  { id: 'artwork', icon: ImageIcon, label: 'Artwork' },
  { id: 'video', icon: Film, label: 'Process Video' },
  { id: 'text', icon: FileText, label: 'Written Post' },
];

const TAGS = ['Painting', 'Illustration', 'Ceramics', 'Photography', 'Print', 'Digital', 'Sculpture', 'Collage'];

const tagTints = [
  colors.tints.coral, colors.tints.lavender, colors.tints.amber,
  colors.tints.sky, colors.tints.blush, colors.tints.sage,
  colors.tints.coral, colors.tints.lavender,
];

export default function CreateScreen() {
  const [postType, setPostType] = useState('artwork');
  const [caption, setCaption] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={globalStyles.heading2}>New Post</Text>
          <TouchableOpacity style={styles.publishBtn} activeOpacity={0.8}>
            <Text style={[globalStyles.stamp, { color: '#fff' }]}>Publish</Text>
          </TouchableOpacity>
        </View>

        {/* Post type selector — soft segmented control */}
        <View style={styles.typePicker}>
          {POST_TYPES.map(type => {
            const Icon = type.icon;
            const isActive = postType === type.id;
            return (
              <TouchableOpacity
                key={type.id}
                style={[styles.typeBtn, isActive && styles.typeBtnActive]}
                onPress={() => setPostType(type.id)}
              >
                <Icon size={16} color={isActive ? '#fff' : colors.text.tertiary} strokeWidth={1.5} />
                <Text
                  style={[styles.typeLabel, isActive && { color: '#fff' }]}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Upload zone — airy, elegant */}
        <View style={styles.section}>
          <View style={styles.uploadZone}>
            <ImageIcon size={32} color={colors.text.tertiary} strokeWidth={1.2} />
            <Text style={[globalStyles.body, { color: colors.text.secondary, marginTop: 12 }]}>
              Tap to upload image
            </Text>
            <Text style={[globalStyles.caption, { color: colors.text.tertiary, marginTop: 4 }]}>
              JPG, PNG, WEBP up to 20MB
            </Text>
            <TouchableOpacity style={styles.uploadBtn} activeOpacity={0.8}>
              <Text style={[globalStyles.stamp, { color: colors.primary.coral }]}>
                Browse Files
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Caption */}
        <View style={styles.section}>
          <Text style={[globalStyles.stamp, styles.fieldLabel]}>
            Caption
          </Text>
          <View style={styles.inputCard}>
            <TextInput
              style={styles.captionInput}
              placeholder="Write about your work, your process, your inspiration..."
              placeholderTextColor={colors.text.tertiary}
              multiline
              value={caption}
              onChangeText={setCaption}
              textAlignVertical="top"
            />
            <Text style={[globalStyles.caption, styles.charCount]}>
              {caption.length} / 500
            </Text>
          </View>
        </View>

        {/* Tags — soft pill chips */}
        <View style={styles.section}>
          <Text style={[globalStyles.stamp, styles.fieldLabel]}>
            Tags
          </Text>
          <View style={styles.tagGrid}>
            {TAGS.map((tag, i) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <TouchableOpacity
                  key={tag}
                  style={[
                    styles.tagChip,
                    isSelected
                      ? styles.tagChipActive
                      : { backgroundColor: tagTints[i % tagTints.length] },
                  ]}
                  onPress={() => toggleTag(tag)}
                >
                  {isSelected && (
                    <Check size={10} color="#fff" strokeWidth={3} style={{ marginRight: 4 }} />
                  )}
                  <Text style={[styles.tagText, isSelected && styles.tagTextActive]}>
                    {tag}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Post Visibility */}
        <View style={styles.section}>
          <Text style={[globalStyles.stamp, styles.fieldLabel]}>
            Visibility
          </Text>
          <View style={styles.inputCard}>
            <View style={{ padding: 16, gap: 14 }}>
              {['Public', 'Followers only', 'Circles only'].map(opt => {
                const isSelected = opt === 'Public';
                return (
                  <TouchableOpacity key={opt} style={styles.visibilityOption}>
                    <View style={[styles.radioOuter, isSelected && styles.radioOuterActive]}>
                      {isSelected && <View style={styles.radioInner} />}
                    </View>
                    <Text style={[globalStyles.body, { color: colors.text.primary }]}>{opt}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  publishBtn: {
    backgroundColor: colors.primary.coral,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: radii.pill,
    ...shadows.subtle,
  },
  typePicker: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: radii.md,
    overflow: 'hidden',
    backgroundColor: colors.background.secondary,
    padding: 4,
    gap: 4,
  },
  typeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
    gap: 4,
    borderRadius: 10,
  },
  typeBtnActive: {
    backgroundColor: colors.text.primary,
  },
  typeLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 11,
    color: colors.text.secondary,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  fieldLabel: {
    marginBottom: 10,
    color: colors.text.tertiary,
  },
  uploadZone: {
    padding: 36,
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    borderStyle: 'dashed',
  },
  uploadBtn: {
    marginTop: 16,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.tints.coral,
  },
  inputCard: {
    backgroundColor: colors.surface.card,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    overflow: 'hidden',
  },
  captionInput: {
    padding: 16,
    minHeight: 120,
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: colors.text.primary,
  },
  charCount: {
    textAlign: 'right',
    padding: 12,
    paddingTop: 0,
  },
  tagGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radii.pill,
  },
  tagChipActive: {
    backgroundColor: colors.primary.coral,
  },
  tagText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: colors.text.secondary,
  },
  tagTextActive: { color: '#fff' },
  visibilityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.border.medium,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
  },
  radioOuterActive: { borderColor: colors.primary.coral },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary.coral,
  },
});
