import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerStats } from '../../types';

interface PlayerState {
  stats: PlayerStats;
}

const initialState: PlayerState = {
  stats: {
    xp: 245,
    level: 3,
    gold: 87,
    health: 42,
    maxHealth: 50,
  },
};

const XP_PER_LEVEL = 100;

const calculateLevel = (xp: number): number => {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    addXP: (state, action: PayloadAction<number>) => {
      state.stats.xp = Math.max(0, state.stats.xp + action.payload);
      state.stats.level = calculateLevel(state.stats.xp);
    },
    addGold: (state, action: PayloadAction<number>) => {
      state.stats.gold = Math.max(0, state.stats.gold + action.payload);
    },
    takeDamage: (state, action: PayloadAction<number>) => {
      state.stats.health = Math.max(0, state.stats.health - action.payload);
    },
    heal: (state, action: PayloadAction<number>) => {
      state.stats.health = Math.min(state.stats.maxHealth, state.stats.health + action.payload);
    },
    resetHealth: (state) => {
      state.stats.health = state.stats.maxHealth;
    },
    completeDaily: (state) => {
      state.stats.xp += 10;
      state.stats.gold += 5;
      state.stats.level = calculateLevel(state.stats.xp);
    },
    completePositiveHabit: (state) => {
      state.stats.xp += 5;
      state.stats.gold += 2;
      state.stats.level = calculateLevel(state.stats.xp);
    },
    completeNegativeHabit: (state) => {
      state.stats.xp = Math.max(0, state.stats.xp - 5);
      state.stats.health = Math.max(0, state.stats.health - 5);
      state.stats.level = calculateLevel(state.stats.xp);
    },
    completeTodo: (state) => {
      state.stats.xp += 15;
      state.stats.gold += 10;
      state.stats.level = calculateLevel(state.stats.xp);
    },
    missDaily: (state) => {
      state.stats.health = Math.max(0, state.stats.health - 10);
    },
  },
});

export const {
  addXP,
  addGold,
  takeDamage,
  heal,
  resetHealth,
  completeDaily,
  completePositiveHabit,
  completeNegativeHabit,
  completeTodo,
  missDaily,
} = playerSlice.actions;

export default playerSlice.reducer;
