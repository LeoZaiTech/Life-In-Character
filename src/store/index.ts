import { configureStore, combineReducers, createAction } from '@reduxjs/toolkit';
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

export const loadUserData = createAction<UserGameData>('global/loadUserData');
export const clearUserData = createAction('global/clearUserData');

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['habits', 'dailies', 'todos', 'player', 'character', 'inventory'],
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
    console.log('[Store] Clearing user data from state');
    return appReducer(undefined, action);
  }
  
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'global/loadUserData', 'global/clearUserData'],
      },
    }),
});

export const persistor = persistStore(store);

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
