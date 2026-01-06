// src/lib/types.ts
// Centralized type definitions for the application
// Matching Supabase PostgreSQL schema

/**
 * Product type matching the Supabase `products` table structure
 * 
 * Table: public.products
 * - id: bigserial (auto-incrementing bigint)
 * - model: generated column (type || ' - ' || brand)
 */
export interface Product {
  id: number;                          // bigserial -> number
  name: string;                        // text NOT NULL
  slug: string;                        // text NOT NULL, unique
  brand: string;                       // text NOT NULL
  type: string;                        // text NOT NULL
  model: string;                       // GENERATED ALWAYS AS (type || ' - ' || brand)
  price: number;                       // numeric NOT NULL
  old_price: number | null;            // numeric NULL
  quantity: number;                    // integer NULL DEFAULT 0
  active: boolean;                     // boolean NULL DEFAULT true
  images: string[];                    // text[] NULL DEFAULT '{}'
  description: string | null;          // text NULL
  tags: string[];                      // text[] NULL DEFAULT '{}'
  created_at: string;                  // timestamp with time zone NULL DEFAULT now()
  updated_at: string;                  // timestamp with time zone NULL DEFAULT now()
}

/**
 * Minimal product data for display in cards/lists
 */
export interface ProductCard {
  id: number;
  slug: string;
  name: string;
  brand: string;
  type: string;
  price: number;
  old_price: number | null;
  images: string[];
  tags?: string[];
}

/**
 * User preference scores for product tags
 * Key: tag name, Value: affinity score
 */
export type UserScore = Record<string, number>;

/**
 * State shape for the userPreferences store
 */
export interface UserPreferencesState {
  scores: UserScore;
}

