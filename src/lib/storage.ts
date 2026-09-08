/**
 * DAKO Storage Constants and Safe Hydration Utilities
 */

export const STORAGE_KEYS = {
  CURRENT_USER: 'dako_current_user',
  SETTINGS: 'dako_campaign_settings',
  POSTS: 'dako_post_drafts',
  CONVERSATIONS: 'dako_dm_conversations',
  CHANNELS: 'dako_channels',
} as const;

/**
 * Safely parses JSON from localStorage with fallback and self-healing error recovery.
 * Prevents full-app hard crashes from malformed storage writes or extensions.
 */
export function safeLocalStorageParse<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    const parsed = JSON.parse(item);
    return parsed !== null && parsed !== undefined ? (parsed as T) : fallback;
  } catch (error) {
    console.error(`[DAKO Storage Error] Failed to parse key "${key}". Clearing corrupted cache.`, error);
    try {
      localStorage.removeItem(key);
    } catch (removeError) {
      console.error(`[DAKO Storage Error] Failed to remove corrupted key "${key}"`, removeError);
    }
    return fallback;
  }
}