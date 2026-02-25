import React from 'react';
import { Todo } from '../types';
import { TaskCard } from './TaskCard';
import { TaskOptionsMenu } from './TaskOptionsMenu';
import { Checkbox } from './Checkbox';
import { COLORS } from '../constants/theme';

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
    <Checkbox
      checked={todo.completed}
      onToggle={onToggleComplete}
      color={COLORS.todoActive}
      checkedColor={COLORS.todoComplete}
    />
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
