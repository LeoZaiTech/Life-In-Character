import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setSkin,
  setHairStyle,
  setShirt,
  setBodySize,
} from '../store/character/characterSlice';
import { CharacterAvatar } from '../components/CharacterAvatar';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';
import { SKIN_OPTIONS, HAIR_COLORS, SHIRT_COLORS, HairColor } from '../types/character';

type CategoryKey = 'skin' | 'hair' | 'shirt' | 'body';

export const CharacterScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const config = useAppSelector((state) => state.character.config);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('skin');

  const categories: { key: CategoryKey; label: string }[] = [
    { key: 'skin', label: '👤 Skin' },
    { key: 'hair', label: '💇 Hair' },
    { key: 'shirt', label: '👕 Shirt' },
    { key: 'body', label: '🏋️ Body' },
  ];

  const handleSkinSelect = (skin: string) => {
    dispatch(setSkin(skin));
  };

  const handleHairBaseSelect = (base: number) => {
    dispatch(setHairStyle({ base }));
  };

  const handleHairBangsSelect = (bangs: number) => {
    dispatch(setHairStyle({ bangs }));
  };

  const handleHairColorSelect = (color: HairColor) => {
    dispatch(setHairStyle({ color }));
  };

  const handleShirtSelect = (shirt: string) => {
    dispatch(setShirt(shirt));
  };

  const handleBodySizeSelect = (size: 'slim' | 'broad') => {
    dispatch(setBodySize(size));
  };

  const renderSkinOptions = () => (
    <View style={styles.optionsContainer}>
      <Text style={styles.sectionTitle}>Natural</Text>
      <View style={styles.optionGrid}>
        {SKIN_OPTIONS.natural.map((skin) => (
          <TouchableOpacity
            key={skin}
            style={[
              styles.colorOption,
              { backgroundColor: `#${skin}` },
              config.skin === skin && styles.selectedOption,
            ]}
            onPress={() => handleSkinSelect(skin)}
          />
        ))}
      </View>

      <Text style={styles.sectionTitle}>Rainbow</Text>
      <View style={styles.optionGrid}>
        {SKIN_OPTIONS.rainbow.map((skin) => (
          <TouchableOpacity
            key={skin}
            style={[
              styles.colorOption,
              { backgroundColor: skin === 'rainbow' ? '#ff69b4' : `#${skin}` },
              config.skin === skin && styles.selectedOption,
            ]}
            onPress={() => handleSkinSelect(skin)}
          >
            {skin === 'rainbow' && <Text style={styles.specialLabel}>🌈</Text>}
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Animal</Text>
      <View style={styles.optionGrid}>
        {SKIN_OPTIONS.animal.map((skin) => (
          <TouchableOpacity
            key={skin}
            style={[
              styles.textOption,
              config.skin === skin && styles.selectedTextOption,
            ]}
            onPress={() => handleSkinSelect(skin)}
          >
            <Text style={styles.optionText}>{skin}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Special</Text>
      <View style={styles.optionGrid}>
        {SKIN_OPTIONS.special.map((skin) => (
          <TouchableOpacity
            key={skin}
            style={[
              styles.textOption,
              config.skin === skin && styles.selectedTextOption,
            ]}
            onPress={() => handleSkinSelect(skin)}
          >
            <Text style={styles.optionText}>{skin}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderHairOptions = () => (
    <View style={styles.optionsContainer}>
      <Text style={styles.sectionTitle}>Hair Color</Text>
      <View style={styles.optionGrid}>
        {HAIR_COLORS.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.textOption,
              config.hairColor === color && styles.selectedTextOption,
            ]}
            onPress={() => handleHairColorSelect(color)}
          >
            <Text style={styles.optionText}>{color}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Hair Style (1-10)</Text>
      <View style={styles.optionGrid}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <TouchableOpacity
            key={num}
            style={[
              styles.numberOption,
              config.hairBase === num && styles.selectedNumberOption,
            ]}
            onPress={() => handleHairBaseSelect(num)}
          >
            <Text
              style={[
                styles.numberText,
                config.hairBase === num && styles.selectedNumberText,
              ]}
            >
              {num}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Bangs Style (0-4)</Text>
      <View style={styles.optionGrid}>
        {[0, 1, 2, 3, 4].map((num) => (
          <TouchableOpacity
            key={num}
            style={[
              styles.numberOption,
              config.hairBangs === num && styles.selectedNumberOption,
            ]}
            onPress={() => handleHairBangsSelect(num)}
          >
            <Text
              style={[
                styles.numberText,
                config.hairBangs === num && styles.selectedNumberText,
              ]}
            >
              {num === 0 ? 'None' : num}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderShirtOptions = () => (
    <View style={styles.optionsContainer}>
      <Text style={styles.sectionTitle}>Shirt Style</Text>
      <View style={styles.optionGrid}>
        {SHIRT_COLORS.map((shirt) => (
          <TouchableOpacity
            key={shirt}
            style={[
              styles.textOption,
              config.shirt === shirt && styles.selectedTextOption,
            ]}
            onPress={() => handleShirtSelect(shirt)}
          >
            <Text style={styles.optionText}>{shirt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderBodyOptions = () => (
    <View style={styles.optionsContainer}>
      <Text style={styles.sectionTitle}>Body Type</Text>
      <View style={styles.bodyToggle}>
        <TouchableOpacity
          style={[
            styles.bodyOption,
            config.size === 'slim' && styles.selectedBodyOption,
          ]}
          onPress={() => handleBodySizeSelect('slim')}
        >
          <Text
            style={[
              styles.bodyOptionText,
              config.size === 'slim' && styles.selectedBodyOptionText,
            ]}
          >
            Slim
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.bodyOption,
            config.size === 'broad' && styles.selectedBodyOption,
          ]}
          onPress={() => handleBodySizeSelect('broad')}
        >
          <Text
            style={[
              styles.bodyOptionText,
              config.size === 'broad' && styles.selectedBodyOptionText,
            ]}
          >
            Broad
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderOptions = () => {
    switch (activeCategory) {
      case 'skin':
        return renderSkinOptions();
      case 'hair':
        return renderHairOptions();
      case 'shirt':
        return renderShirtOptions();
      case 'body':
        return renderBodyOptions();
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.previewContainer}>
        <CharacterAvatar config={config} size={200} />
        <Text style={styles.previewLabel}>Preview</Text>
      </View>

      <View style={styles.categoryTabs}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.key}
            style={[
              styles.categoryTab,
              activeCategory === cat.key && styles.activeCategoryTab,
            ]}
            onPress={() => setActiveCategory(cat.key)}
          >
            <Text
              style={[
                styles.categoryTabText,
                activeCategory === cat.key && styles.activeCategoryTabText,
              ]}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scrollContainer}>
        {renderOptions()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  previewContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  previewLabel: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.sm,
    marginTop: SPACING.sm,
  },
  categoryTabs: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
    gap: SPACING.xs,
  },
  categoryTab: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  activeCategoryTab: {
    backgroundColor: COLORS.primary,
  },
  categoryTabText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  activeCategoryTabText: {
    color: COLORS.text,
  },
  scrollContainer: {
    flex: 1,
  },
  optionsContainer: {
    padding: SPACING.md,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
    marginTop: SPACING.md,
  },
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  colorOption: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedOption: {
    borderColor: COLORS.primary,
    borderWidth: 3,
  },
  specialLabel: {
    fontSize: FONT_SIZES.lg,
  },
  textOption: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surfaceLight,
  },
  selectedTextOption: {
    backgroundColor: COLORS.primary,
  },
  optionText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.sm,
    textTransform: 'capitalize',
  },
  numberOption: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedNumberOption: {
    backgroundColor: COLORS.primary,
  },
  numberText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  selectedNumberText: {
    color: COLORS.text,
  },
  bodyToggle: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  bodyOption: {
    flex: 1,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.surfaceLight,
    alignItems: 'center',
  },
  selectedBodyOption: {
    backgroundColor: COLORS.primary,
  },
  bodyOptionText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
  },
  selectedBodyOptionText: {
    color: COLORS.text,
  },
});
