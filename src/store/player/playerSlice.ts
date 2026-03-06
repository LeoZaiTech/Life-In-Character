import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerStats, Difficulty } from '../../types';

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

const getXPMultiplier = (difficulty: Difficulty): number => {
  switch (difficulty) {
    case 'trivial': return 0.5;
    case 'easy': return 1;
    case 'medium': return 2;
    case 'hard': return 3;
    default: return 1;
  }
};

const getStreakMultiplier = (streak: number): number => {
  // Bonus starts at streak 2, caps at 2x multiplier at streak 10+
  if (streak <= 1) return 1;
  return Math.min(1 + (streak - 1) * 0.1, 2);
};

interface TaskCompletionPayload {
  difficulty: Difficulty;
  streak: number;
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    addXP: (state, action: PayloadAction<number>) => {
      const previousLevel = state.stats.level;
      state.stats.xp = Math.max(0, state.stats.xp + action.payload);
      state.stats.level = calculateLevel(state.stats.xp);
      if (state.stats.level > previousLevel) {
        state.stats.health = state.stats.maxHealth;
      }
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
    completeDaily: (state, action: PayloadAction<TaskCompletionPayload>) => {
      const previousLevel = state.stats.level;
      const { difficulty, streak } = action.payload;
      const baseXP = 10;
      const baseGold = 5;
      const diffMultiplier = getXPMultiplier(difficulty);
      const streakMultiplier = getStreakMultiplier(streak);
      state.stats.xp += Math.round(baseXP * diffMultiplier * streakMultiplier);
      state.stats.gold += Math.round(baseGold * streakMultiplier);
      state.stats.level = calculateLevel(state.stats.xp);
      if (state.stats.level > previousLevel) {
        state.stats.health = state.stats.maxHealth;
      }
    },
    completePositiveHabit: (state, action: PayloadAction<TaskCompletionPayload>) => {
      const previousLevel = state.stats.level;
      const { difficulty, streak } = action.payload;
      const baseXP = 5;
      const baseGold = 10;
      const diffMultiplier = getXPMultiplier(difficulty);
      const streakMultiplier = getStreakMultiplier(streak);
      state.stats.xp += Math.round(baseXP * diffMultiplier * streakMultiplier);
      state.stats.gold += Math.round(baseGold * streakMultiplier);
      state.stats.level = calculateLevel(state.stats.xp);
      if (state.stats.level > previousLevel) {
        state.stats.health = state.stats.maxHealth;
      }
    },
    completeNegativeHabit: (state) => {
      state.stats.health = Math.max(0, state.stats.health - 5);
    },
    completeTodo: (state, action: PayloadAction<Difficulty>) => {
      const previousLevel = state.stats.level;
      const baseXP = 15;
      const baseGold = 10;
      const diffMultiplier = getXPMultiplier(action.payload);
      // Todos don't have streaks, just difficulty
      state.stats.xp += Math.round(baseXP * diffMultiplier);
      state.stats.gold += baseGold;
      state.stats.level = calculateLevel(state.stats.xp);
      if (state.stats.level > previousLevel) {
        state.stats.health = state.stats.maxHealth;
      }
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
