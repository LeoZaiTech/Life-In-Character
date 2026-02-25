import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';

interface CheckboxProps {
  checked: boolean;
  onToggle: () => void;
  color: string;
  checkedColor?: string;
  size?: number;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onToggle,
  color,
  checkedColor,
  size = 44,
}) => {
  const resolvedCheckedColor = checkedColor || color;

  return (
    <TouchableOpacity
      style={[
        styles.checkbox,
        {
          width: size,
          height: size,
          borderColor: color,
        },
        checked && {
          backgroundColor: resolvedCheckedColor,
          borderColor: resolvedCheckedColor,
        },
      ]}
      onPress={onToggle}
    >
      {checked && <Text style={styles.checkmark}>✓</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: COLORS.text,
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
  },
});
