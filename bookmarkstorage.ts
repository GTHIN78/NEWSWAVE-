export const BOOKMARKS_STORAGE_KEY = 'newswave_saved_articles_v1';

/**
 * Pure function to toggle an article ID in a list of bookmark IDs
 */
export function toggleBookmarkId(bookmarks: string[], articleId: string): string[] {
  if (bookmarks.includes(articleId)) {
    return bookmarks.filter((id) => id !== articleId);
  }
  return [articleId, ...bookmarks];
}

/**
 * Check if an article ID is in the bookmarks list
 */
export function isArticleBookmarked(bookmarks: string[], articleId: string): boolean {
  return bookmarks.includes(articleId);
}

/**
 * Safely load saved bookmark IDs from localStorage
 */
export function loadBookmarksFromStorage(): string[] {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return [];
    }
    const raw = window.localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter((id): id is string => typeof id === 'string');
    }
    return [];
  } catch {
    return [];
  }
}

/**
 * Safely save bookmark IDs to localStorage
 */
export function saveBookmarksToStorage(bookmarks: string[]): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
    }
  } catch (e) {
    console.error('Failed to save bookmarks to localStorage', e);
  }
}
