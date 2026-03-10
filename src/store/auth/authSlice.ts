import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  AuthState,
  User,
  LoginCredentials,
  SignupCredentials,
} from '../../types/auth';
import { authService } from '../../services/authService';
import { userDataService, UserGameData } from '../../services/userDataService';
import { clearUserData, loadUserData } from '../index';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isInitialized: false,
};

export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const result = await authService.checkAuthStatus();
      
      // If user is authenticated, load their data
      if (result.isAuthenticated && result.user) {
        console.log('[AuthSlice] User already authenticated, loading data for:', result.user.id);
        const userData = await userDataService.loadUserData(result.user.id);
        if (userData) {
          dispatch(loadUserData(userData));
          console.log('[AuthSlice] User data loaded on init');
        }
      }
      
      return result;
    } catch (error) {
      return rejectWithValue('Failed to initialize authentication');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue, dispatch }) => {
    try {
      const response = await authService.login(credentials);
      console.log('[AuthSlice] === LOGIN START ===');
      console.log('[AuthSlice] User ID:', response.user.id);
      
      const userData = await userDataService.loadUserData(response.user.id);
      console.log('[AuthSlice] User data found:', userData ? 'YES' : 'NO (new user)');
      
      // Load user data into state if found
      if (userData) {
        console.log('[AuthSlice] Loading player stats:', JSON.stringify((userData as any).player?.stats));
        console.log('[AuthSlice] Loading character:', (userData as any).character?.name);
        dispatch(loadUserData(userData));
        console.log('[AuthSlice] === LOGIN LOAD COMPLETE ===');
      }
      
      return response.user;
    } catch (error) {
      return rejectWithValue('Invalid email or password');
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (credentials: SignupCredentials, { rejectWithValue, dispatch }) => {
    console.log('[AuthSlice] signup thunk started');
    try {
      // Clear existing user data so new user starts fresh
      dispatch(clearUserData());
      console.log('[AuthSlice] Cleared state for new user');
      
      const response = await authService.signup(credentials);
      console.log('[AuthSlice] signup successful, user:', response.user);
      return response.user;
    } catch (error) {
      console.error('[AuthSlice] signup thunk error:', error);
      console.error('[AuthSlice] error message:', error instanceof Error ? error.message : String(error));
      return rejectWithValue('Failed to create account. Please try again.');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState() as any;
      const userId = state.auth?.user?.id;
      
      if (userId) {
        console.log('[AuthSlice] === LOGOUT SAVE START ===');
        console.log('[AuthSlice] User ID:', userId);
        console.log('[AuthSlice] Current player stats:', JSON.stringify(state.player?.stats));
        console.log('[AuthSlice] Current character:', state.character?.name);
        
        const userData: UserGameData = {
          habits: state.habits,
          dailies: state.dailies,
          todos: state.todos,
          player: state.player,
          character: state.character,
          inventory: state.inventory,
        };
        
        await userDataService.saveUserData(userId, userData);
        console.log('[AuthSlice] === LOGOUT SAVE COMPLETE ===');
        
        // Debug: Verify what's in storage
        await userDataService.debugDumpStorage();
      }
      
      await authService.logout();
      
      // Clear user data after saving
      dispatch(clearUserData());
      console.log('[AuthSlice] Logout complete, state cleared');
    } catch (error) {
      console.error('[AuthSlice] Logout error:', error);
      return rejectWithValue('Failed to logout');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = action.payload !== null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Initialize Auth
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isInitialized = true;
        state.user = action.payload.user;
        state.isAuthenticated = action.payload.isAuthenticated;
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isInitialized = true;
        state.error = action.payload as string;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Signup
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logout.pending, (state) => {
        console.log('[AuthSlice] logout.pending');
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        console.log('[AuthSlice] logout.fulfilled');
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
        state.isInitialized = true; // Keep initialized
      })
      .addCase(logout.rejected, (state, action) => {
        console.log('[AuthSlice] logout.rejected:', action.payload);
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
