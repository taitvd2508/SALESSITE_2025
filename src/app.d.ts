import type { SupabaseClient, Session } from '@supabase/supabase-js';

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient;
      tt_sid: string;
      getSession: () => Promise<Session | null>;
    }
  }
}

export {};
