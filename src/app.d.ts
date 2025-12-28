import type { SupabaseClient, Session, User } from '@supabase/supabase-js';

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient;
      tt_sid: string;
      getSession: () => Promise<{ session: Session | null; user: User | null }>;
    }
  }
}

export {};
