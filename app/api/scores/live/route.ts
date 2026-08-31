import { NextResponse } from 'next/server'
import { supabasePublic } from '@/lib/supabase'

// GET /api/scores/live — matches currently in progress. Reads from the local `matches`
// table (kept fresh by /api/sync/fixtures polling API-Football on a cron), rather than
// calling API-Football directly on every page load.
export async function GET() {
 const { data, error } = await supabasePublic
  .from('matches')
  .select('*')
  .eq('status', 'LIVE')
  .order('kickoff_at', { ascending: true })

 if (error) return NextResponse.json({ error: error.message }, { status: 500 })
 return NextResponse.json({ live: data.length > 0, matches: data })
}
