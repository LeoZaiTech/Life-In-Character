import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Todo } from '../types';
import { TaskCard } from './TaskCard';
import { TaskOptionsMenu } from './TaskOptionsMenu';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';

interface TodoCardProps {
  todo: Todo;
  onToggleComplete: () => void;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const TodoCard: React.FC<TodoCardProps> = ({
  todo,
  onToggleComplete,
  onPress,
  onEdit,
  onDelete,
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

  const renderRightContent = () => {
    if (!onEdit || !onDelete) return null;
    return <TaskOptionsMenu onEdit={onEdit} onDelete={onDelete} />;
  };

  return (
    <TaskCard
      title={todo.title}
      subtitle={todo.notes || (dueDate ? `Due: ${dueDate}` : undefined)}
      accentColor={accentColor}
      onPress={onPress}
      leftContent={renderLeftContent()}
      rightContent={renderRightContent()}
    />
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 3,
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
