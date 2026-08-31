import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

function isAuthorized(req: NextRequest) {
 return req.headers.get('authorization') === `Bearer ${process.env.ADMIN_API_SECRET}`
}

// POST /api/admin/tips — create a tip.
// Body: { matchId, market, prediction, odds, confidence, affiliateBrand, affiliateUrl }
export async function POST(req: NextRequest) {
 if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

 const body = await req.json().catch(() => null)
 if (!body?.market || !body?.prediction || body?.odds === undefined || !body?.affiliateBrand) {
  return NextResponse.json({ error: 'market, prediction, odds and affiliateBrand are required' }, { status: 400 })
 }

 const { data, error } = await supabaseAdmin
  .from('tips')
  .insert({
   match_id: body.matchId ?? null,
   market: body.market,
   prediction: body.prediction,
   odds: body.odds,
   confidence: body.confidence ?? 'Medium',
   affiliate_brand: body.affiliateBrand,
   affiliate_url: body.affiliateUrl,
  })
  .select()
  .single()

 if (error) return NextResponse.json({ error: error.message }, { status: 500 })
 return NextResponse.json({ tip: data }, { status: 201 })
}

// PATCH /api/admin/tips — settle a tip result once the match finishes.
// Body: { id, result: 'won' | 'lost' }
export async function PATCH(req: NextRequest) {
 if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

 const body = await req.json().catch(() => null)
 if (!body?.id || !body?.result) return NextResponse.json({ error: 'id and result are required' }, { status: 400 })

 const { error } = await supabaseAdmin.from('tips').update({ result: body.result }).eq('id', body.id)
 if (error) return NextResponse.json({ error: error.message }, { status: 500 })
 return NextResponse.json({ ok: true })
}
