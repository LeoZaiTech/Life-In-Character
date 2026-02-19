import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Daily } from '../types';
import { TaskCard } from './TaskCard';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';

interface DailyCardProps {
  daily: Daily;
  onToggleComplete: () => void;
  onPress?: () => void;
}

export const DailyCard: React.FC<DailyCardProps> = ({
  daily,
  onToggleComplete,
  onPress,
}) => {
  const accentColor = daily.isCompletedToday ? COLORS.dailyComplete : COLORS.dailyActive;

  const renderLeftContent = () => (
    <TouchableOpacity
      style={[
        styles.checkbox,
        daily.isCompletedToday && styles.checkboxChecked,
      ]}
      onPress={onToggleComplete}
    >
      {daily.isCompletedToday && <Text style={styles.checkmark}>✓</Text>}
    </TouchableOpacity>
  );

  const renderRightContent = () => (
    <View style={styles.streakContainer}>
      {daily.streak > 0 && (
        <>
          <Text style={styles.streakIcon}>🔥</Text>
          <Text style={styles.streakText}>{daily.streak}</Text>
        </>
      )}
    </View>
  );

  const getDaysText = () => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    if (daily.schedule.repeatDays.length === 7) return 'Every day';
    if (daily.schedule.repeatDays.length === 0) return 'No schedule';
    return daily.schedule.repeatDays.map((d) => dayNames[d]).join(', ');
  };

  return (
    <TaskCard
      title={daily.title}
      subtitle={daily.notes || getDaysText()}
      accentColor={accentColor}
      onPress={onPress}
      leftContent={renderLeftContent()}
      rightContent={renderRightContent()}
    />
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 2,
    borderColor: COLORS.dailyActive,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.dailyComplete,
    borderColor: COLORS.dailyComplete,
  },
  checkmark: {
    color: COLORS.text,
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.sm,
  },
  streakIcon: {
    fontSize: FONT_SIZES.md,
  },
  streakText: {
    color: COLORS.warning,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
});
