import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import habitsReducer from './habits/habitsSlice';
import dailiesReducer from './dailies/dailiesSlice';
import todosReducer from './todos/todosSlice';
import playerReducer from './player/playerSlice';
import characterReducer from './character/characterSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['habits', 'dailies', 'todos', 'player', 'character'],
};

const rootReducer = combineReducers({
  habits: habitsReducer,
  dailies: dailiesReducer,
  todos: todosReducer,
  player: playerReducer,
  character: characterReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
