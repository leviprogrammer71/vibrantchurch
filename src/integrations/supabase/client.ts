// Supabase client — gracefully handles missing environment variables
// so the site works standalone using the default content from siteContent.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

// Only create a real client when credentials are configured
export const supabase: SupabaseClient<Database> = (SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY)
  ? createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        storage: typeof window !== 'undefined' ? localStorage : undefined,
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : createClient<Database>('https://placeholder.supabase.co', 'placeholder-key', {
      auth: { persistSession: false },
    });

/** True when real Supabase credentials are present */
export const hasSupabase = !!(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY);
