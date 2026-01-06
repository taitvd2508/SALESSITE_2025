// src/lib/stores/userPreferences.ts
// Tracks user affinity scores for product tags with localStorage persistence

import { browser } from '$app/environment';
import { writable, get } from 'svelte/store';
import type { UserScore, UserPreferencesState } from '$lib/types';

const STORAGE_KEY = 'tt_user_prefs_v1';

/**
 * Load initial state from localStorage
 */
function loadInitial(): UserPreferencesState {
  if (!browser) return { scores: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { scores: {} };
    const parsed = JSON.parse(raw);
    if (!parsed?.scores || typeof parsed.scores !== 'object') {
      return { scores: {} };
    }
    return { scores: parsed.scores };
  } catch {
    return { scores: {} };
  }
}

/**
 * Save state to localStorage
 */
function save(state: UserPreferencesState): void {
  if (!browser) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/**
 * Create the userPreferences store
 */
function createUserPreferences() {
  const { subscribe, set, update } = writable<UserPreferencesState>(loadInitial());

  // Sync across browser tabs
  if (browser) {
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY) {
        set(loadInitial());
      }
    });
  }

  return {
    subscribe,

    /**
     * Track user interaction with product tags
     * Increments the score for each provided tag
     */
    trackInteraction(tags: string[], weight: number = 1): void {
      if (!tags || tags.length === 0) return;

      update((state) => {
        const scores = { ...state.scores };
        for (const tag of tags) {
          const normalizedTag = tag.trim().toLowerCase();
          if (normalizedTag) {
            scores[normalizedTag] = (scores[normalizedTag] ?? 0) + weight;
          }
        }
        const next = { scores };
        save(next);
        return next;
      });
    },

    /**
     * Get the top tag (highest score)
     * Returns null if no preferences exist
     */
    getTopTag(): string | null {
      const state = get({ subscribe });
      const entries = Object.entries(state.scores);
      if (entries.length === 0) return null;

      let topTag: string | null = null;
      let topScore = 0;

      for (const [tag, score] of entries) {
        if (score > topScore) {
          topScore = score;
          topTag = tag;
        }
      }

      return topTag;
    },

    /**
     * Get top N tags sorted by score
     */
    getTopTags(n: number = 3): string[] {
      const state = get({ subscribe });
      return Object.entries(state.scores)
        .sort(([, a], [, b]) => b - a)
        .slice(0, n)
        .map(([tag]) => tag);
    },

    /**
     * Check if user has any preferences
     */
    hasPreferences(): boolean {
      const state = get({ subscribe });
      return Object.keys(state.scores).length > 0;
    },

    /**
     * Clear all preferences
     */
    clear(): void {
      const next = { scores: {} };
      set(next);
      save(next);
    },

    /**
     * Get raw scores object (for debugging)
     */
    getScores(): UserScore {
      return get({ subscribe }).scores;
    }
  };
}

export const userPreferences = createUserPreferences();

/**
 * Helper function to track interaction from components
 */
export function trackInteraction(tags: string[], weight: number = 1): void {
  userPreferences.trackInteraction(tags, weight);
}
