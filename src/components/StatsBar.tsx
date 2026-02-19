import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppSelector } from '../store/hooks';
import { selectPlayerStats, selectXPProgress } from '../store/player/playerSelectors';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';

export const StatsBar: React.FC = () => {
  const stats = useAppSelector(selectPlayerStats);
  const xpProgress = useAppSelector(selectXPProgress);

  const healthPercent = (stats.health / stats.maxHealth) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.levelBadge}>
        <Text style={styles.levelText}>Lv {stats.level}</Text>
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
        <Text style={styles.goldIcon}>🪙</Text>
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
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  levelBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
    marginRight: SPACING.md,
  },
  levelText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.sm,
    fontWeight: 'bold',
  },
  barsContainer: {
    flex: 1,
    gap: SPACING.xs,
  },
  barWrapper: {
    gap: 4,
  },
  barLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  barLabel: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.xs,
  },
  barValue: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.xs,
  },
  barBackground: {
    height: 16,
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
    marginLeft: SPACING.md,
    gap: SPACING.xs,
  },
  goldIcon: {
    fontSize: FONT_SIZES.md,
  },
  goldText: {
    color: COLORS.gold,
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
  },
});
