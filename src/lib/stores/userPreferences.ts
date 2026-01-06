// src/lib/stores/userPreferences.ts
// Tracks user affinity scores for product tags
// - Guest users: localStorage only
// - Logged-in users: Supabase + localStorage cache

import { browser } from '$app/environment';
import { writable, get } from 'svelte/store';
import type { UserScore, UserPreferencesState } from '$lib/types';
import { supabase } from '$lib/supabase/client';

const STORAGE_KEY = 'tt_user_prefs_v1';

/**
 * Load initial state from localStorage
 */
function loadFromLocalStorage(): UserPreferencesState {
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
function saveToLocalStorage(state: UserPreferencesState): void {
  if (!browser) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/**
 * Clear localStorage
 */
function clearLocalStorage(): void {
  if (!browser) return;
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Create the userPreferences store with Supabase sync
 */
function createUserPreferences() {
  const { subscribe, set, update } = writable<UserPreferencesState>(loadFromLocalStorage());

  // Sync across browser tabs (localStorage changes)
  if (browser) {
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY) {
        set(loadFromLocalStorage());
      }
    });
  }

  return {
    subscribe,

    /**
     * Track user interaction with product tags
     * Updates localStorage immediately, syncs to Supabase if logged in
     */
    async trackInteraction(tags: string[], weight: number = 1): Promise<void> {
      if (!tags || tags.length === 0) return;

      // 1. Update localStorage immediately (fast UI feedback)
      update((state) => {
        const scores = { ...state.scores };
        for (const tag of tags) {
          const normalizedTag = tag.trim().toLowerCase();
          if (normalizedTag) {
            scores[normalizedTag] = (scores[normalizedTag] ?? 0) + weight;
          }
        }
        const next = { scores };
        saveToLocalStorage(next);
        return next;
      });

      // 2. If logged in, sync to Supabase in background
      if (browser) {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            for (const tag of tags) {
              const normalizedTag = tag.trim().toLowerCase();
              if (normalizedTag) {
                // Upsert: insert or update on conflict
                await supabase
                  .from('user_preferences')
                  .upsert(
                    { 
                      user_id: user.id, 
                      tag: normalizedTag, 
                      score: get({ subscribe }).scores[normalizedTag] ?? weight 
                    },
                    { onConflict: 'user_id,tag' }
                  );
              }
            }
          }
        } catch (e) {
          console.warn('Failed to sync preference to server:', e);
        }
      }
    },

    /**
     * Load preferences from Supabase for logged-in user
     * Call this after login
     */
    async loadFromServer(): Promise<void> {
      if (!browser) return;

      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('user_preferences')
          .select('tag, score')
          .eq('user_id', user.id);

        if (error) {
          console.warn('Failed to load preferences from server:', error);
          return;
        }

        if (data && data.length > 0) {
          const scores: UserScore = {};
          for (const row of data) {
            scores[row.tag] = row.score;
          }
          const next = { scores };
          set(next);
          saveToLocalStorage(next);
        }
      } catch (e) {
        console.warn('Failed to load preferences from server:', e);
      }
    },

    /**
     * Merge localStorage preferences to Supabase
     * Call this after login to preserve guest browsing history
     */
    async mergeToServer(): Promise<void> {
      if (!browser) return;

      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const localState = loadFromLocalStorage();
        const localEntries = Object.entries(localState.scores);

        if (localEntries.length === 0) return;

        // Fetch existing server preferences
        const { data: serverPrefs } = await supabase
          .from('user_preferences')
          .select('tag, score')
          .eq('user_id', user.id);

        const serverMap = new Map<string, number>(
          (serverPrefs ?? []).map((p) => [p.tag, p.score])
        );

        // Merge: add local scores to server scores
        for (const [tag, score] of localEntries) {
          const existingScore = serverMap.get(tag) ?? 0;
          const newScore = existingScore + score;

          await supabase
            .from('user_preferences')
            .upsert(
              { user_id: user.id, tag, score: newScore },
              { onConflict: 'user_id,tag' }
            );
        }

        // Reload from server to get merged state
        await this.loadFromServer();
      } catch (e) {
        console.warn('Failed to merge preferences to server:', e);
      }
    },

    /**
     * Get the top tag (highest score)
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
     * Clear all preferences (local and server)
     */
    async clear(): Promise<void> {
      // Clear localStorage
      set({ scores: {} });
      saveToLocalStorage({ scores: {} });

      // Clear from Supabase if logged in
      if (browser) {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            await supabase
              .from('user_preferences')
              .delete()
              .eq('user_id', user.id);
          }
        } catch (e) {
          console.warn('Failed to clear server preferences:', e);
        }
      }
    },

    /**
     * Get raw scores object
     */
    getScores(): UserScore {
      return get({ subscribe }).scores;
    }
  };
}

export const userPreferences = createUserPreferences();

/**
 * Helper function to track interaction (convenience export)
 */
export function trackInteraction(tags: string[], weight: number = 1): void {
  userPreferences.trackInteraction(tags, weight);
}
