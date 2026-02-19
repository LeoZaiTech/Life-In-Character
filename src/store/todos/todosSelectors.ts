import { RootState } from '../index';

export const selectAllTodos = (state: RootState) => state.todos.items;

export const selectTodoById = (id: string) => (state: RootState) =>
  state.todos.items.find((t) => t.id === id);

export const selectActiveTodos = (state: RootState) =>
  state.todos.items.filter((t) => !t.completed);

export const selectCompletedTodos = (state: RootState) =>
  state.todos.items.filter((t) => t.completed);

export const selectTodosCount = (state: RootState) => state.todos.items.length;
