import { RootState } from '../index';

export const selectAllHabits = (state: RootState) => state.habits.items;

export const selectHabitById = (id: string) => (state: RootState) =>
  state.habits.items.find((h) => h.id === id);

export const selectHabitsCount = (state: RootState) => state.habits.items.length;
