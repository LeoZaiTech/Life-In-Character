export interface Habit {
  id: string;
  title: string;
  notes?: string;
  positive: boolean;
  negative: boolean;
  score: number;
  positiveCount: number;
  negativeCount: number;
  createdAt: string;
}

export interface Daily {
  id: string;
  title: string;
  notes?: string;
  isCompletedToday: boolean;
  streak: number;
  schedule: {
    repeatDays: number[]; // 0-6 (Sun-Sat)
  };
  lastCompletedDate?: string;
  createdAt: string;
}

export interface Todo {
  id: string;
  title: string;
  notes?: string;
  completed: boolean;
  dueDate?: string;
  createdAt: string;
}

export interface PlayerStats {
  xp: number;
  level: number;
  gold: number;
  health: number;
  maxHealth: number;
}

export interface CharacterCustomization {
  bodyType: 'male' | 'female';
  skinTone: number;
  hairStyle: number;
  hairColor: number;
  outfit: number;
}

export type TaskType = 'habit' | 'daily' | 'todo';

export interface CreateHabitPayload {
  title: string;
  notes?: string;
  positive: boolean;
  negative: boolean;
}

export interface CreateDailyPayload {
  title: string;
  notes?: string;
  schedule: {
    repeatDays: number[];
  };
}

export interface CreateTodoPayload {
  title: string;
  notes?: string;
  dueDate?: string;
}
