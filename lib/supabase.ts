import { createClient } from '@supabase/supabase-js'

// Public client — safe to use in Server Components / anon reads. Respects RLS
// policies in supabase/schema.sql (published articles/tips, all matches/leagues).
export const supabasePublic = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Service-role client — SERVER ONLY. Bypasses RLS. Used by /api/admin/* and
// /api/sync/* route handlers. Never import this from a Client Component or expose
// SUPABASE_SERVICE_ROLE_KEY to the browser.
export const supabaseAdmin = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!,
 { auth: { persistSession: false } }
)
