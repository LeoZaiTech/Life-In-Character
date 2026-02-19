/**
 * Generates a unique ID compatible with React Native.
 * Uses timestamp + random string instead of crypto.getRandomValues()
 * which isn't available in RN's JS runtime.
 */
export const generateId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${randomPart}`;
};
