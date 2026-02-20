import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharacterConfig, DEFAULT_CHARACTER } from '../../types/character';

interface CharacterState {
  config: CharacterConfig;
}

const initialState: CharacterState = {
  config: DEFAULT_CHARACTER,
};

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    updateCharacter: (state, action: PayloadAction<Partial<CharacterConfig>>) => {
      state.config = { ...state.config, ...action.payload };
    },
    resetCharacter: (state) => {
      state.config = DEFAULT_CHARACTER;
    },
    setSkin: (state, action: PayloadAction<string>) => {
      state.config.skin = action.payload;
    },
    setHairStyle: (state, action: PayloadAction<{ base?: number; bangs?: number; color?: string }>) => {
      if (action.payload.base !== undefined) state.config.hairBase = action.payload.base;
      if (action.payload.bangs !== undefined) state.config.hairBangs = action.payload.bangs;
      if (action.payload.color !== undefined) state.config.hairColor = action.payload.color as any;
    },
    setShirt: (state, action: PayloadAction<string>) => {
      state.config.shirt = action.payload;
    },
    setBodySize: (state, action: PayloadAction<'slim' | 'broad'>) => {
      state.config.size = action.payload;
    },
    setArmor: (state, action: PayloadAction<string | undefined>) => {
      state.config.armor = action.payload;
    },
    setHead: (state, action: PayloadAction<string | undefined>) => {
      state.config.head = action.payload;
    },
  },
});

export const {
  updateCharacter,
  resetCharacter,
  setSkin,
  setHairStyle,
  setShirt,
  setBodySize,
  setArmor,
  setHead,
} = characterSlice.actions;

export default characterSlice.reducer;
