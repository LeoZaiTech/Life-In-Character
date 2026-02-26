import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Daily } from '../types';
import { TaskCard } from './TaskCard';
import { TaskOptionsMenu } from './TaskOptionsMenu';
import { Checkbox } from './Checkbox';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';

interface DailyCardProps {
  daily: Daily;
  onToggleComplete: () => void;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const DailyCard: React.FC<DailyCardProps> = ({
  daily,
  onToggleComplete,
  onPress,
  onEdit,
  onDelete,
}) => {
  const accentColor = daily.isCompletedToday ? COLORS.dailyComplete : COLORS.dailyActive;

  const renderLeftContent = () => (
    <Checkbox
      checked={daily.isCompletedToday}
      onToggle={onToggleComplete}
      color={COLORS.dailyActive}
      checkedColor={COLORS.dailyComplete}
    />
  );

  const renderRightContent = () => (
    <View style={styles.rightContainer}>
      <View style={styles.streakContainer}>
        {daily.streak > 0 && (
          <>
            <Text style={styles.streakIcon}>🔥</Text>
            <Text style={styles.streakText}>{daily.streak}</Text>
          </>
        )}
      </View>
      {onEdit && onDelete && (
        <TaskOptionsMenu onEdit={onEdit} onDelete={onDelete} />
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
      notes={daily.notes}
      subtitle={getDaysText()}
      accentColor={accentColor}
      onPress={onPress}
      leftContent={renderLeftContent()}
      rightContent={renderRightContent()}
    />
  );
};

const styles = StyleSheet.create({
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
