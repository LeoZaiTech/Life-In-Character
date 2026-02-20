import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateId } from '../../utils/generateId';
import { Habit, CreateHabitPayload } from '../../types';

interface HabitsState {
  items: Habit[];
}

const initialState: HabitsState = {
  items: [
    {
      id: 'demo-habit-1',
      title: 'Drink Water',
      notes: 'Stay hydrated throughout the day',
      positive: true,
      negative: false,
      score: 5,
      positiveCount: 5,
      negativeCount: 0,
      createdAt: '2026-02-15T10:00:00.000Z',
    },
    {
      id: 'demo-habit-2',
      title: 'Social Media',
      notes: 'Track mindless scrolling',
      positive: false,
      negative: true,
      score: -3,
      positiveCount: 0,
      negativeCount: 3,
      createdAt: '2026-02-15T10:00:00.000Z',
    },
    {
      id: 'demo-habit-3',
      title: 'Take the Stairs',
      notes: 'Choose stairs over elevator',
      positive: true,
      negative: true,
      score: 2,
      positiveCount: 4,
      negativeCount: 2,
      createdAt: '2026-02-16T10:00:00.000Z',
    },
  ],
};

const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    addHabit: (state, action: PayloadAction<CreateHabitPayload>) => {
      const newHabit: Habit = {
        id: generateId(),
        title: action.payload.title,
        notes: action.payload.notes,
        positive: action.payload.positive,
        negative: action.payload.negative,
        score: 0,
        positiveCount: 0,
        negativeCount: 0,
        createdAt: new Date().toISOString(),
      };
      state.items.push(newHabit);
    },
    updateHabit: (state, action: PayloadAction<{ id: string; updates: Partial<Habit> }>) => {
      const index = state.items.findIndex((h) => h.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload.updates };
      }
    },
    deleteHabit: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((h) => h.id !== action.payload);
    },
    incrementHabit: (state, action: PayloadAction<string>) => {
      const habit = state.items.find((h) => h.id === action.payload);
      if (habit && habit.positive) {
        habit.score += 1;
        habit.positiveCount += 1;
      }
    },
    decrementHabit: (state, action: PayloadAction<string>) => {
      const habit = state.items.find((h) => h.id === action.payload);
      if (habit && habit.negative) {
        habit.score -= 1;
        habit.negativeCount += 1;
      }
    },
  },
});

export const { addHabit, updateHabit, deleteHabit, incrementHabit, decrementHabit } = habitsSlice.actions;
export default habitsSlice.reducer;
