import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';
import { Difficulty } from '../types';

interface DifficultySelectorProps {
  value: Difficulty;
  onChange: (difficulty: Difficulty) => void;
}

const DIFFICULTY_OPTIONS: { value: Difficulty; label: string; color: string }[] = [
  { value: 'trivial', label: 'Trivial', color: COLORS.difficultyTrivial },
  { value: 'easy', label: 'Easy', color: COLORS.difficultyEasy },
  { value: 'medium', label: 'Medium', color: COLORS.difficultyMedium },
  { value: 'hard', label: 'Hard', color: COLORS.difficultyHard },
];

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Difficulty</Text>
      <View style={styles.optionsRow}>
        {DIFFICULTY_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.option,
              { borderColor: option.color },
              value === option.value && { backgroundColor: option.color },
            ]}
            onPress={() => onChange(option.value)}
          >
            <Text
              style={[
                styles.optionText,
                value === option.value && styles.selectedText,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    color: COLORS.text,
    fontSize: FONT_SIZES.md,
    marginBottom: SPACING.sm,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  option: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2,
    alignItems: 'center',
  },
  optionText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  selectedText: {
    color: COLORS.text,
  },
});

export default DifficultySelector;
