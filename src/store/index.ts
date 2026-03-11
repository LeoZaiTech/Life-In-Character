import { configureStore, combineReducers, createAction, Middleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import habitsReducer from './habits/habitsSlice';
import dailiesReducer from './dailies/dailiesSlice';
import todosReducer from './todos/todosSlice';
import playerReducer from './player/playerSlice';
import characterReducer from './character/characterSlice';
import inventoryReducer from './inventory/inventorySlice';
import authReducer from './auth/authSlice';
import { userDataService, UserGameData } from '../services/userDataService';

// Slices that contain user game data (should trigger auto-save)
const USER_DATA_SLICES = ['habits', 'dailies', 'todos', 'player', 'character', 'inventory'];

// Debounce timer for auto-save
let saveTimeout: NodeJS.Timeout | null = null;
const SAVE_DEBOUNCE_MS = 1000;

export const loadUserData = createAction<UserGameData>('global/loadUserData');
export const clearUserData = createAction('global/clearUserData');

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [], // User data persisted via userDataService per-user
};

const appReducer = combineReducers({
  habits: habitsReducer,
  dailies: dailiesReducer,
  todos: todosReducer,
  player: playerReducer,
  character: characterReducer,
  inventory: inventoryReducer,
  auth: authReducer,
});

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: any) => {
  if (loadUserData.match(action)) {
    console.log('[Store] Loading user data into state');
    return {
      ...state,
      habits: action.payload.habits ?? state?.habits,
      dailies: action.payload.dailies ?? state?.dailies,
      todos: action.payload.todos ?? state?.todos,
      player: action.payload.player ?? state?.player,
      character: action.payload.character ?? state?.character,
      inventory: action.payload.inventory ?? state?.inventory,
      auth: state?.auth,
    } as ReturnType<typeof appReducer>;
  }

  if (clearUserData.match(action)) {
    console.log('[Store] Clearing user data from state (preserving auth)');
    const freshState = appReducer(undefined, action);
    return {
      ...freshState,
      auth: state?.auth ?? freshState.auth,
    };
  }

  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Auto-save middleware - saves user data when game state changes
const autoSaveMiddleware: Middleware = (storeApi) => (next) => (action: any) => {
  const result = next(action);

  const actionType = action?.type as string;
  if (!actionType) return result;

  const sliceName = actionType.split('/')[0];
  const isUserDataAction = USER_DATA_SLICES.includes(sliceName);

  if (isUserDataAction) {
    console.log('[AutoSave] Detected game action:', actionType);
  }

  // Skip if not a user data action or if it's a global load/clear action
  if (!isUserDataAction || actionType.startsWith('global/')) {
    return result;
  }

  const state = storeApi.getState() as any;
  const userId = state.auth?.user?.id;

  if (!userId || !state.auth?.isAuthenticated) {
    console.log(
      '[AutoSave] Skipping - not authenticated. userId:',
      userId,
      'isAuth:',
      state.auth?.isAuthenticated
    );
    return result;
  }

  console.log('[AutoSave] Scheduling save for user:', userId, 'action:', actionType);

  // Debounce the save
  if (saveTimeout) {
    clearTimeout(saveTimeout);
    saveTimeout = null;
  }

  saveTimeout = setTimeout(async () => {
    // Mark timer as consumed immediately so future logic knows there is no pending timer
    saveTimeout = null;

    try {
      const currentState = storeApi.getState() as any;

      const currentUserId = currentState.auth?.user?.id;
      const isAuthenticated = currentState.auth?.isAuthenticated;

      // Extra safety: do not save if auth state is no longer valid
      if (!currentUserId || !isAuthenticated) {
        console.log('[AutoSave] Aborting timed save - auth no longer valid');
        return;
      }

      // Extra safety: if the authenticated user changed since scheduling, do not save under stale identity
      if (currentUserId !== userId) {
        console.log(
          '[AutoSave] Aborting timed save - user changed from',
          userId,
          'to',
          currentUserId
        );
        return;
      }

      const userData: UserGameData = {
        habits: currentState.habits,
        dailies: currentState.dailies,
        todos: currentState.todos,
        player: currentState.player,
        character: currentState.character,
        inventory: currentState.inventory,
      };

      console.log(
        '[AutoSave] Executing save for:',
        userId,
        'player gold:',
        currentState.player?.stats?.gold
      );

      await userDataService.saveUserData(userId, userData);
      console.log('[AutoSave] ✓ Save completed for:', userId);
    } catch (error) {
      console.error('[AutoSave] ✗ Failed to save user data:', error);
    }
  }, SAVE_DEBOUNCE_MS);

  return result;
};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'global/loadUserData',
          'global/clearUserData',
        ],
      },
    }).concat(autoSaveMiddleware),
});

export const persistor = persistStore(store);

export const cancelPendingAutoSave = () => {
  if (saveTimeout) {
    clearTimeout(saveTimeout);
    saveTimeout = null;
    console.log('[AutoSave] Pending autosave cancelled');
  }
};

export const flushCurrentUserData = async () => {
  cancelPendingAutoSave();

  const state = store.getState() as any;
  const userId = state.auth?.user?.id;
  const isAuthenticated = state.auth?.isAuthenticated;

  if (!userId || !isAuthenticated) {
    console.log('[AutoSave] Flush skipped - no authenticated user');
    return;
  }

  const userData: UserGameData = {
    habits: state.habits,
    dailies: state.dailies,
    todos: state.todos,
    player: state.player,
    character: state.character,
    inventory: state.inventory,
  };

  console.log(
    '[AutoSave] Flushing immediate save for user:',
    userId,
    'player gold:',
    state.player?.stats?.gold
  );

  await userDataService.saveUserData(userId, userData);
  console.log('[AutoSave] Immediate flush complete for:', userId);
};

export const saveCurrentUserData = async (userId: string) => {
  const state = store.getState();

  const userData: UserGameData = {
    habits: state.habits,
    dailies: state.dailies,
    todos: state.todos,
    player: state.player,
    character: state.character,
    inventory: state.inventory,
  };

  await userDataService.saveUserData(userId, userData);
};

export const loadUserDataForUser = async (userId: string) => {
  const userData = await userDataService.loadUserData(userId);
  if (userData) {
    store.dispatch(loadUserData(userData));
    return true;
  }
  return false;
};

export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;
