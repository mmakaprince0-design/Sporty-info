import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// Only sync fixtures from these leagues — keeps the table focused on what the site
// actually covers (and keeps row counts sane). API-Football league IDs:
// 39 Premier League, 140 La Liga, 78 Bundesliga, 135 Serie A, 61 Ligue 1,
// 2 UEFA Champions League, 3 UEFA Europa League, 88 Eredivisie, 94 Primeira Liga,
// 253 MLS, 71 Brazil Serie A
const TRACKED_LEAGUE_IDS = new Set([39, 140, 78, 135, 61, 2, 3, 88, 94, 253, 71])

// POST /api/sync/fixtures — pulls today's fixtures from API-Football and upserts them
// into `matches`. Meant to be called by a scheduled job (Vercel Cron / GitHub Action),
// not by users — guarded with a shared secret header.
//
// Suggested cron (vercel.json):
// { "crons": [{ "path": "/api/sync/fixtures", "schedule": "0 */6 * * *" }] }
export async function POST(req: NextRequest) {
 const auth = req.headers.get('authorization')
 if (auth !== `Bearer ${process.env.SYNC_SECRET}`) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
 }
 if (!process.env.API_FOOTBALL_KEY) {
  return NextResponse.json({ error: 'API_FOOTBALL_KEY not configured' }, { status: 500 })
 }

 const today = new Date().toISOString().slice(0, 10)
 const res = await fetch(`https://v3.football.api-sports.io/fixtures?date=${today}`, {
  headers: { 'x-apisports-key': process.env.API_FOOTBALL_KEY },
 })
 if (!res.ok) return NextResponse.json({ error: `API-Football responded ${res.status}` }, { status: 502 })

 const payload = await res.json()
 const rows = (payload.response ?? [])
  .filter((f: any) => TRACKED_LEAGUE_IDS.has(f.league.id))
  .map((f: any) => ({
   api_football_fixture_id: f.fixture.id,
   sport: 'football',
   competition: f.league.name,
   home_team: f.teams.home.name,
   away_team: f.teams.away.name,
   home_team_logo: f.teams.home.logo,
   away_team_logo: f.teams.away.logo,
   home_score: f.goals.home,
   away_score: f.goals.away,
   status: mapStatus(f.fixture.status.short),
   minute: f.fixture.status.elapsed ? `${f.fixture.status.elapsed}'` : null,
   kickoff_at: f.fixture.date,
  }))

 if (rows.length === 0) return NextResponse.json({ synced: 0 })

 const { error } = await supabaseAdmin.from('matches').upsert(rows, { onConflict: 'api_football_fixture_id' })
 if (error) return NextResponse.json({ error: error.message }, { status: 500 })

 return NextResponse.json({ synced: rows.length })
}

function mapStatus(short: string): 'SCHEDULED' | 'LIVE' | 'FINISHED' | 'POSTPONED' {
 if (['1H', '2H', 'HT', 'ET', 'P', 'LIVE'].includes(short)) return 'LIVE'
 if (['FT', 'AET', 'PEN'].includes(short)) return 'FINISHED'
 if (['PST', 'CANC', 'ABD'].includes(short)) return 'POSTPONED'
 return 'SCHEDULED'
}