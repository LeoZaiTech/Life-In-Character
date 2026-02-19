import { RootState } from '../index';

export const selectPlayerStats = (state: RootState) => state.player.stats;

export const selectPlayerLevel = (state: RootState) => state.player.stats.level;

export const selectPlayerXP = (state: RootState) => state.player.stats.xp;

export const selectPlayerGold = (state: RootState) => state.player.stats.gold;

export const selectPlayerHealth = (state: RootState) => state.player.stats.health;

export const selectXPProgress = (state: RootState) => {
  const xp = state.player.stats.xp;
  const currentLevelXP = (state.player.stats.level - 1) * 100;
  return ((xp - currentLevelXP) / 100) * 100;
};
