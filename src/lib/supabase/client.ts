// TODO: Replace with actual Supabase client when keys are available
// import { createBrowserClient } from '@supabase/ssr'

/**
 * Supabase Client (Browser)
 * 
 * When Supabase keys are available, uncomment and configure:
 * 
 * export const supabase = createBrowserClient(
 *   process.env.NEXT_PUBLIC_SUPABASE_URL!,
 *   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
 * )
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = !!(SUPABASE_URL && SUPABASE_KEY);

if (!isSupabaseConfigured) {
  console.log(
    '%c[Rec\'d] Running in mock data mode. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local to connect Supabase.',
    'color: #FACC15; font-weight: bold;'
  );
}

// Placeholder export - replace with real client
export const supabase = null;
