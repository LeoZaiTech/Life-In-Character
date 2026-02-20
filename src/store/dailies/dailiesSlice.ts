import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateId } from '../../utils/generateId';
import { Daily, CreateDailyPayload } from '../../types';

interface DailiesState {
  items: Daily[];
  lastResetDate: string | null;
}

const initialState: DailiesState = {
  items: [
    {
      id: 'demo-daily-1',
      title: 'Morning Workout',
      notes: '30 minutes of exercise',
      isCompletedToday: false,
      streak: 7,
      schedule: { repeatDays: [1, 2, 3, 4, 5] },
      createdAt: '2026-02-10T08:00:00.000Z',
    },
    {
      id: 'demo-daily-2',
      title: 'Read for 20 minutes',
      notes: 'Fiction or non-fiction',
      isCompletedToday: true,
      streak: 12,
      schedule: { repeatDays: [0, 1, 2, 3, 4, 5, 6] },
      lastCompletedDate: new Date().toISOString(),
      createdAt: '2026-02-05T08:00:00.000Z',
    },
    {
      id: 'demo-daily-3',
      title: 'Practice Coding',
      notes: 'LeetCode or side project',
      isCompletedToday: false,
      streak: 3,
      schedule: { repeatDays: [1, 2, 3, 4, 5] },
      createdAt: '2026-02-12T08:00:00.000Z',
    },
  ],
  lastResetDate: null,
};

const dailiesSlice = createSlice({
  name: 'dailies',
  initialState,
  reducers: {
    addDaily: (state, action: PayloadAction<CreateDailyPayload>) => {
      const newDaily: Daily = {
        id: generateId(),
        title: action.payload.title,
        notes: action.payload.notes,
        isCompletedToday: false,
        streak: 0,
        schedule: action.payload.schedule,
        createdAt: new Date().toISOString(),
      };
      state.items.push(newDaily);
    },
    updateDaily: (state, action: PayloadAction<{ id: string; updates: Partial<Daily> }>) => {
      const index = state.items.findIndex((d) => d.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload.updates };
      }
    },
    deleteDaily: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((d) => d.id !== action.payload);
    },
    toggleDailyComplete: (state, action: PayloadAction<string>) => {
      const daily = state.items.find((d) => d.id === action.payload);
      if (daily) {
        daily.isCompletedToday = !daily.isCompletedToday;
        if (daily.isCompletedToday) {
          daily.streak += 1;
          daily.lastCompletedDate = new Date().toISOString();
        } else {
          daily.streak = Math.max(0, daily.streak - 1);
        }
      }
    },
    resetDailies: (state) => {
      const today = new Date().toDateString();
      if (state.lastResetDate !== today) {
        state.items.forEach((daily) => {
          if (!daily.isCompletedToday && daily.streak > 0) {
            daily.streak = 0;
          }
          daily.isCompletedToday = false;
        });
        state.lastResetDate = today;
      }
    },
  },
});

export const { addDaily, updateDaily, deleteDaily, toggleDailyComplete, resetDailies } = dailiesSlice.actions;
export default dailiesSlice.reducer;
