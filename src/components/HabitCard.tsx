import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Habit, Difficulty } from '../types';
import { TaskCard } from './TaskCard';
import { TaskOptionsMenu } from './TaskOptionsMenu';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';

interface HabitCardProps {
  habit: Habit;
  onIncrement: () => void;
  onDecrement: () => void;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const getDifficultyColor = (difficulty: Difficulty): string => {
  switch (difficulty) {
    case 'trivial': return COLORS.difficultyTrivial;
    case 'easy': return COLORS.difficultyEasy;
    case 'medium': return COLORS.difficultyMedium;
    case 'hard': return COLORS.difficultyHard;
    default: return COLORS.difficultyEasy;
  }
};

export const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  onIncrement,
  onDecrement,
  onPress,
  onEdit,
  onDelete,
}) => {
  const accentColor = getDifficultyColor(habit.difficulty);

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
      {onEdit && onDelete && (
        <TaskOptionsMenu onEdit={onEdit} onDelete={onDelete} />
      )}
    </View>
  );

  const getSubtitle = () => {
    return `⚡ streak ${habit.score}`;
  };

  return (
    <TaskCard
      title={habit.title}
      notes={habit.notes}
      subtitle={getSubtitle()}
      accentColor={accentColor}
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
  });
