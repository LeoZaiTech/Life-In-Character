import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAppSelector } from '../store/hooks';
import { selectPlayerStats, selectXPProgress } from '../store/player/playerSelectors';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';
import { CharacterAvatar } from './CharacterAvatar';
import { SHOP_ITEMS } from '../store/inventory/inventorySlice';

export const StatsBar: React.FC = () => {
  const stats = useAppSelector(selectPlayerStats);
  const xpProgress = useAppSelector(selectXPProgress);
  const characterConfig = useAppSelector((state) => state.character.config);
  const equippedArmorId = useAppSelector((state) => state.inventory?.equippedArmor);
  const equippedHeadId = useAppSelector((state) => state.inventory?.equippedHead);

  // Look up sprite key from shop items catalog
  const getEquippedSpriteKey = (itemId: string | undefined): string | undefined => {
    if (!itemId) return undefined;
    const item = SHOP_ITEMS.find((i) => i.id === itemId);
    return item?.spriteKey;
  };

  const healthPercent = (stats.health / stats.maxHealth) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <CharacterAvatar 
          config={characterConfig} 
          size={120}
          equippedArmor={getEquippedSpriteKey(equippedArmorId)}
          equippedHead={getEquippedSpriteKey(equippedHeadId)}
        />
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>Lv {stats.level}</Text>
        </View>
      </View>

      <View style={styles.barsContainer}>
        <View style={styles.barWrapper}>
          <View style={styles.barLabelRow}>
            <Text style={styles.barLabel}>❤️ HP</Text>
            <Text style={styles.barValue}>
              {stats.health}/{stats.maxHealth}
            </Text>
          </View>
          <View style={styles.barBackground}>
            <View
              style={[
                styles.barFill,
                styles.healthBar,
                { width: `${healthPercent}%` },
              ]}
            />
          </View>
        </View>

        <View style={styles.barWrapper}>
          <View style={styles.barLabelRow}>
            <Text style={styles.barLabel}>⭐ XP</Text>
            <Text style={styles.barValue}>{stats.xp % 100}/100</Text>
          </View>
          <View style={styles.barBackground}>
            <View
              style={[
                styles.barFill,
                styles.xpBar,
                { width: `${xpProgress}%` },
              ]}
            />
          </View>
        </View>
      </View>

      <View style={styles.goldContainer}>
        <FontAwesome5 name="coins" size={36} color={COLORS.gold} />
        <Text style={styles.goldText}>{stats.gold}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatarContainer: {
    alignItems: 'center',
    marginRight: SPACING.lg,
  },
  levelBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    marginTop: -SPACING.sm,
  },
  levelText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
  },
  barsContainer: {
    flex: 1,
    gap: SPACING.sm,
  },
  barWrapper: {
    gap: 6,
  },
  barLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  barLabel: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.sm,
  },
  barValue: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.sm,
  },
  barBackground: {
    height: 24,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: BORDER_RADIUS.sm,
  },
  healthBar: {
    backgroundColor: COLORS.health,
  },
  xpBar: {
    backgroundColor: COLORS.xp,
  },
  goldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: SPACING.lg,
    gap: SPACING.sm,
  },
    goldText: {
    color: COLORS.gold,
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
  },
});
