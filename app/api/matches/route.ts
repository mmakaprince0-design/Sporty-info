import { NextRequest, NextResponse } from 'next/server'
import { supabasePublic } from '@/lib/supabase'

// GET /api/matches?date=2026-08-21&league=<uuid>&status=LIVE
export async function GET(req: NextRequest) {
 const { searchParams } = new URL(req.url)
 const date = searchParams.get('date')
 const league = searchParams.get('league')
 const status = searchParams.get('status')

 let query = supabasePublic.from('matches').select('*').order('kickoff_at', { ascending: true })

 if (date) {
  const start = `${date}T00:00:00Z`
  const end = `${date}T23:59:59Z`
  query = query.gte('kickoff_at', start).lte('kickoff_at', end)
 }
 if (league) query = query.eq('league_id', league)
 if (status) query = query.eq('status', status)

 const { data, error } = await query
 if (error) return NextResponse.json({ error: error.message }, { status: 500 })
 return NextResponse.json({ matches: data })
}
