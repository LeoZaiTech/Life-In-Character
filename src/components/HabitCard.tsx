import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Habit } from '../types';
import { TaskCard } from './TaskCard';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';

interface HabitCardProps {
  habit: Habit;
  onIncrement: () => void;
  onDecrement: () => void;
  onPress?: () => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  onIncrement,
  onDecrement,
  onPress,
}) => {
  const getAccentColor = () => {
    if (habit.positive && habit.negative) return COLORS.habitBoth;
    if (habit.positive) return COLORS.habitPositive;
    return COLORS.habitNegative;
  };

  const renderLeftContent = () => (
    <View style={styles.buttonContainer}>
      {habit.positive && (
        <TouchableOpacity
          style={[styles.actionButton, styles.positiveButton]}
          onPress={onIncrement}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderRightContent = () => (
    <View style={styles.buttonContainer}>
      {habit.negative && (
        <TouchableOpacity
          style={[styles.actionButton, styles.negativeButton]}
          onPress={onDecrement}
        >
          <Text style={styles.buttonText}>−</Text>
        </TouchableOpacity>
      )}
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>{habit.score}</Text>
      </View>
    </View>
  );

  return (
    <TaskCard
      title={habit.title}
      subtitle={habit.notes}
      accentColor={getAccentColor()}
      onPress={onPress}
      leftContent={renderLeftContent()}
      rightContent={renderRightContent()}
    />
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  actionButton: {
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  positiveButton: {
    backgroundColor: COLORS.habitPositive,
  },
  negativeButton: {
    backgroundColor: COLORS.habitNegative,
  },
  buttonText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
  },
  scoreContainer: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.sm,
    minWidth: 48,
    alignItems: 'center',
  },
  scoreText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
});
