import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';

interface AddButtonProps {
  onPress: () => void;
  label?: string;
}

export const AddButton: React.FC<AddButtonProps> = ({ onPress, label = 'Add' }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.plus}>+</Text>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surfaceLight,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  plus: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    marginRight: SPACING.sm,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.md,
  },
});
