import type { SupabaseClient } from '@supabase/supabase-js';

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient;
      tt_sid: string;
    }
  }
}

export {};
