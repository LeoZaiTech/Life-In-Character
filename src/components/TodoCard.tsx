import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Todo } from '../types';
import { TaskCard } from './TaskCard';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';

interface TodoCardProps {
  todo: Todo;
  onToggleComplete: () => void;
  onPress?: () => void;
}

export const TodoCard: React.FC<TodoCardProps> = ({
  todo,
  onToggleComplete,
  onPress,
}) => {
  const accentColor = todo.completed ? COLORS.todoComplete : COLORS.todoActive;

  const renderLeftContent = () => (
    <TouchableOpacity
      style={[
        styles.checkbox,
        todo.completed && styles.checkboxChecked,
      ]}
      onPress={onToggleComplete}
    >
      {todo.completed && <Text style={styles.checkmark}>✓</Text>}
    </TouchableOpacity>
  );

  const formatDueDate = () => {
    if (!todo.dueDate) return null;
    const date = new Date(todo.dueDate);
    return date.toLocaleDateString();
  };

  const dueDate = formatDueDate();

  return (
    <TaskCard
      title={todo.title}
      subtitle={todo.notes || (dueDate ? `Due: ${dueDate}` : undefined)}
      accentColor={accentColor}
      onPress={onPress}
      leftContent={renderLeftContent()}
    />
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 2,
    borderColor: COLORS.todoActive,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.todoComplete,
    borderColor: COLORS.todoComplete,
  },
  checkmark: {
    color: COLORS.text,
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
  },
});
