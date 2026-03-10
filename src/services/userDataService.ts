import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_DATA_PREFIX = 'user_data_';

export interface UserGameData {
  habits: unknown;
  dailies: unknown;
  todos: unknown;
  player: unknown;
  character: unknown;
  inventory: unknown;
}

export const userDataService = {
  getStorageKey(userId: string): string {
    return `${USER_DATA_PREFIX}${userId}`;
  },

  async saveUserData(userId: string, data: UserGameData): Promise<void> {
    const key = this.getStorageKey(userId);
    console.log('[UserDataService] Saving data for user:', userId);
    await AsyncStorage.setItem(key, JSON.stringify(data));
    console.log('[UserDataService] Data saved successfully');
  },

  async loadUserData(userId: string): Promise<UserGameData | null> {
    const key = this.getStorageKey(userId);
    console.log('[UserDataService] Loading data for user:', userId);
    const data = await AsyncStorage.getItem(key);
    if (data) {
      console.log('[UserDataService] Found existing data for user');
      return JSON.parse(data);
    }
    console.log('[UserDataService] No existing data found for user');
    return null;
  },

  async deleteUserData(userId: string): Promise<void> {
    const key = this.getStorageKey(userId);
    console.log('[UserDataService] Deleting data for user:', userId);
    await AsyncStorage.removeItem(key);
  },

  async listAllUsers(): Promise<string[]> {
    const keys = await AsyncStorage.getAllKeys();
    return keys
      .filter(key => key.startsWith(USER_DATA_PREFIX))
      .map(key => key.replace(USER_DATA_PREFIX, ''));
  },

  async debugDumpStorage(): Promise<void> {
    console.log('[UserDataService] === DEBUG STORAGE DUMP ===');
    const keys = await AsyncStorage.getAllKeys();
    console.log('[UserDataService] All keys:', keys);
    
    for (const key of keys) {
      if (key.startsWith(USER_DATA_PREFIX)) {
        const data = await AsyncStorage.getItem(key);
        if (data) {
          const parsed = JSON.parse(data);
          console.log(`[UserDataService] ${key}:`);
          console.log('  - Player stats:', JSON.stringify(parsed.player?.stats));
          console.log('  - Character:', parsed.character?.name);
          console.log('  - Habits count:', parsed.habits?.items?.length || 0);
        }
      }
    }
    console.log('[UserDataService] === END DUMP ===');
  },
};
