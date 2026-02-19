import { RootState } from '../index';

export const selectAllDailies = (state: RootState) => state.dailies.items;

export const selectDailyById = (id: string) => (state: RootState) =>
  state.dailies.items.find((d) => d.id === id);

export const selectDueDailies = (state: RootState) => {
  const today = new Date().getDay();
  return state.dailies.items.filter((d) => d.schedule.repeatDays.includes(today));
};

export const selectCompletedDailies = (state: RootState) =>
  state.dailies.items.filter((d) => d.isCompletedToday);

export const selectIncompleteDailies = (state: RootState) =>
  state.dailies.items.filter((d) => !d.isCompletedToday);
