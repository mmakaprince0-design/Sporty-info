import { NextRequest, NextResponse } from 'next/server'
import { supabasePublic } from '@/lib/supabase'

// GET /api/tips?result=pending — today's tips, joined with their match row.
export async function GET(req: NextRequest) {
 const { searchParams } = new URL(req.url)
 const result = searchParams.get('result')

 let query = supabasePublic
  .from('tips')
  .select('*, match:matches(*)')
  .eq('published', true)
  .order('created_at', { ascending: false })

 if (result) query = query.eq('result', result)

 const { data, error } = await query
 if (error) return NextResponse.json({ error: error.message }, { status: 500 })
 return NextResponse.json({ tips: data })
}
