import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateId } from '../../utils/generateId';
import { Habit, CreateHabitPayload } from '../../types';

interface HabitsState {
  items: Habit[];
}

const initialState: HabitsState = {
  items: [],
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
