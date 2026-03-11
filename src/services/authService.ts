import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  User,
  AuthTokens,
  AuthResponse,
  LoginCredentials,
  SignupCredentials,
  ValidationResult,
  PasswordStrength,
} from '../types/auth';

const generateUUID = (): string => {
  return Crypto.randomUUID();
};

const SECURE_STORE_KEYS = {
  ACCESS_TOKEN: 'auth_access_token',
  REFRESH_TOKEN: 'auth_refresh_token',
  TOKEN_EXPIRY: 'auth_token_expiry',
  USER_DATA: 'auth_user_data',
};

const STORAGE_KEYS = {
  REGISTERED_USERS: 'auth_registered_users',
};

const TOKEN_EXPIRY_DURATION = 24 * 60 * 60 * 1000; // 24 hours in ms

type StoredUserRecord = {
  id: string;
  email: string;
  username: string;
  password: string;
  createdAt: string;
  lastLoginAt: string;
};

const secureStorage = {
  async setItem(key: string, value: string): Promise<void> {
    try {
      console.log('[SecureStorage] setItem called for key:', key);
      const isAvailable = await SecureStore.isAvailableAsync();
      console.log('[SecureStorage] SecureStore available:', isAvailable);
      if (isAvailable) {
        await SecureStore.setItemAsync(key, value);
        console.log('[SecureStorage] Stored via SecureStore');
      } else {
        await AsyncStorage.setItem(key, value);
        console.log('[SecureStorage] Stored via AsyncStorage (fallback)');
      }
    } catch (error) {
      console.error('[SecureStorage] setItem error:', error);
      await AsyncStorage.setItem(key, value);
    }
  },

  async getItem(key: string): Promise<string | null> {
    try {
      if (await SecureStore.isAvailableAsync()) {
        return await SecureStore.getItemAsync(key);
      }
      return await AsyncStorage.getItem(key);
    } catch {
      return await AsyncStorage.getItem(key);
    }
  },

  async deleteItem(key: string): Promise<void> {
    try {
      if (await SecureStore.isAvailableAsync()) {
        await SecureStore.deleteItemAsync(key);
      } else {
        await AsyncStorage.removeItem(key);
      }
    } catch {
      await AsyncStorage.removeItem(key);
    }
  },
};

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const toPublicUser = (record: StoredUserRecord): User => ({
  id: record.id,
  email: record.email,
  username: record.username,
  createdAt: record.createdAt,
  lastLoginAt: record.lastLoginAt,
});

const getStoredUsers = async (): Promise<StoredUserRecord[]> => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
    if (!raw) return [];
    return JSON.parse(raw) as StoredUserRecord[];
  } catch (error) {
    console.error('[AuthService] Failed to read stored users:', error);
    return [];
  }
};

const saveStoredUsers = async (users: StoredUserRecord[]): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(users));
};

export const authService = {
  async storeTokens(tokens: AuthTokens): Promise<void> {
    await secureStorage.setItem(SECURE_STORE_KEYS.ACCESS_TOKEN, tokens.accessToken);
    await secureStorage.setItem(SECURE_STORE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
    await secureStorage.setItem(SECURE_STORE_KEYS.TOKEN_EXPIRY, tokens.expiresAt.toString());
  },

  async getStoredTokens(): Promise<AuthTokens | null> {
    try {
      const accessToken = await secureStorage.getItem(SECURE_STORE_KEYS.ACCESS_TOKEN);
      const refreshToken = await secureStorage.getItem(SECURE_STORE_KEYS.REFRESH_TOKEN);
      const expiresAtStr = await secureStorage.getItem(SECURE_STORE_KEYS.TOKEN_EXPIRY);

      if (!accessToken || !refreshToken || !expiresAtStr) {
        return null;
      }

      return {
        accessToken,
        refreshToken,
        expiresAt: parseInt(expiresAtStr, 10),
      };
    } catch {
      return null;
    }
  },

  async clearTokens(): Promise<void> {
    await secureStorage.deleteItem(SECURE_STORE_KEYS.ACCESS_TOKEN);
    await secureStorage.deleteItem(SECURE_STORE_KEYS.REFRESH_TOKEN);
    await secureStorage.deleteItem(SECURE_STORE_KEYS.TOKEN_EXPIRY);
    await secureStorage.deleteItem(SECURE_STORE_KEYS.USER_DATA);
  },

  async storeUser(user: User): Promise<void> {
    await secureStorage.setItem(SECURE_STORE_KEYS.USER_DATA, JSON.stringify(user));
  },

  async getStoredUser(): Promise<User | null> {
    try {
      const userData = await secureStorage.getItem(SECURE_STORE_KEYS.USER_DATA);
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  },

  isTokenExpired(expiresAt: number): boolean {
    return Date.now() >= expiresAt;
  },

  generateMockTokens(): AuthTokens {
    return {
      accessToken: `access_${generateUUID()}`,
      refreshToken: `refresh_${generateUUID()}`,
      expiresAt: Date.now() + TOKEN_EXPIRY_DURATION,
    };
  },

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const normalizedEmail = normalizeEmail(credentials.email);
    const users = await getStoredUsers();

    const existingUser = users.find(
      (user) => user.email === normalizedEmail && user.password === credentials.password
    );

    if (!existingUser) {
      throw new Error('Invalid email or password');
    }

    // Update last login time
    existingUser.lastLoginAt = new Date().toISOString();
    await saveStoredUsers(users);

    const user = toPublicUser(existingUser);
    const tokens = this.generateMockTokens();

    console.log('[AuthService] Login using existing user:', {
      id: user.id,
      email: user.email,
    });

    // Store securely
    await this.storeTokens(tokens);
    await this.storeUser(user);

    return { user, tokens };
  },

  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    console.log('[AuthService] signup called with:', { email: credentials.email, username: credentials.username });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('[AuthService] API delay complete');

      const normalizedEmail = normalizeEmail(credentials.email);
      const users = await getStoredUsers();

      // Check if user already exists
      const existingUser = users.find((user) => user.email === normalizedEmail);
      if (existingUser) {
        throw new Error('An account with this email already exists');
      }

      const now = new Date().toISOString();

      // Create new user record with stable ID
      const newUserRecord: StoredUserRecord = {
        id: generateUUID(),
        email: normalizedEmail,
        username: credentials.username,
        password: credentials.password,
        createdAt: now,
        lastLoginAt: now,
      };

      // Save to registered users list
      users.push(newUserRecord);
      await saveStoredUsers(users);

      const user = toPublicUser(newUserRecord);
      const tokens = this.generateMockTokens();

      console.log('[AuthService] Signup created persistent user:', {
        id: user.id,
        email: user.email,
      });

      await this.storeTokens(tokens);
      await this.storeUser(user);

      console.log('[AuthService] Signup complete, returning response');
      return { user, tokens };
    } catch (error) {
      console.error('[AuthService] Signup error:', error);
      throw error;
    }
  },

  async logout(): Promise<void> {
    await this.clearTokens();
  },

  async refreshSession(): Promise<AuthTokens | null> {
    const tokens = await this.getStoredTokens();
    if (!tokens) return null;

    // In production, call refresh endpoint with refreshToken
    const newTokens = this.generateMockTokens();
    await this.storeTokens(newTokens);
    return newTokens;
  },

  async checkAuthStatus(): Promise<{ user: User | null; isAuthenticated: boolean }> {
    console.log('[AuthService] ========== AUTH STATUS CHECK ==========');
    const tokens = await this.getStoredTokens();
    const user = await this.getStoredUser();
    
    console.log('[AuthService] Stored tokens:', tokens ? {
      accessToken: tokens.accessToken.substring(0, 20) + '...',
      expiresAt: new Date(tokens.expiresAt).toISOString(),
      isExpired: this.isTokenExpired(tokens.expiresAt)
    } : 'No tokens found');
    
    console.log('[AuthService] Stored user:', user ? {
      id: user.id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt
    } : 'No user found');

    if (!tokens || !user) {
      console.log('[AuthService] ❌ Not authenticated - missing tokens or user');
      return { user: null, isAuthenticated: false };
    }

    if (this.isTokenExpired(tokens.expiresAt)) {
      console.log('[AuthService] ⚠️ Token expired, attempting refresh...');
      const newTokens = await this.refreshSession();
      if (!newTokens) {
        console.log('[AuthService] ❌ Token refresh failed, clearing auth');
        await this.clearTokens();
        return { user: null, isAuthenticated: false };
      }
      console.log('[AuthService] ✅ Token refreshed successfully');
    }

    console.log('[AuthService] ✅ User authenticated:', user.email);
    console.log('[AuthService] ==========================================');
    return { user, isAuthenticated: true };
  },
};

export const validationService = {
  validateEmail(email: string): string | null {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return null;
  },

  validatePassword(password: string): string | null {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    return null;
  },

  validateUsername(username: string): string | null {
    if (!username) return 'Username is required';
    if (username.length < 3) return 'Username must be at least 3 characters';
    if (username.length > 20) return 'Username must be less than 20 characters';
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return 'Username can only contain letters, numbers, and underscores';
    }
    return null;
  },

  checkPasswordStrength(password: string): PasswordStrength {
    const suggestions: string[] = [];
    let score = 0;

    if (password.length >= 8) score++;
    else suggestions.push('Use at least 8 characters');

    if (password.length >= 12) score++;
    else if (password.length >= 8) suggestions.push('Consider using 12+ characters');

    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    else suggestions.push('Include both uppercase and lowercase letters');

    if (/\d/.test(password)) score++;
    else suggestions.push('Include at least one number');

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
    else suggestions.push('Include at least one special character');

    const labels: Record<number, PasswordStrength['label']> = {
      0: 'weak',
      1: 'weak',
      2: 'fair',
      3: 'good',
      4: 'strong',
    };

    return {
      score: Math.min(score, 4),
      label: labels[Math.min(score, 4)],
      suggestions: suggestions.slice(0, 3),
    };
  },

  validateLoginForm(credentials: LoginCredentials): ValidationResult {
    const errors: Record<string, string> = {};

    const emailError = this.validateEmail(credentials.email);
    if (emailError) errors.email = emailError;

    const passwordError = this.validatePassword(credentials.password);
    if (passwordError) errors.password = passwordError;

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },

  validateSignupForm(credentials: SignupCredentials): ValidationResult {
    const errors: Record<string, string> = {};

    const emailError = this.validateEmail(credentials.email);
    if (emailError) errors.email = emailError;

    const usernameError = this.validateUsername(credentials.username);
    if (usernameError) errors.username = usernameError;

    const passwordError = this.validatePassword(credentials.password);
    if (passwordError) errors.password = passwordError;

    const strength = this.checkPasswordStrength(credentials.password);
    if (strength.score < 2) {
      errors.password = 'Password is too weak. ' + strength.suggestions[0];
    }

    if (credentials.password !== credentials.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },
};
