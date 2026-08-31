import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// POST /api/clicks — fire-and-forget affiliate click tracking. Call this with
// navigator.sendBeacon or a fetch(..., { keepalive: true }) right before the affiliate
// link opens, so it fires even as the page navigates away.
// Body: { brand: string, destinationUrl: string, tipId?: string, referrer?: string }
export async function POST(req: NextRequest) {
 const body = await req.json().catch(() => null)
 if (!body?.brand || !body?.destinationUrl) {
  return NextResponse.json({ error: 'brand and destinationUrl are required' }, { status: 400 })
 }

 const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null
 const userAgent = req.headers.get('user-agent')

 const { error } = await supabaseAdmin.from('clicks').insert({
  brand: body.brand,
  destination_url: body.destinationUrl,
  tip_id: body.tipId ?? null,
  referrer: body.referrer ?? req.headers.get('referer'),
  ip_address: ip,
  user_agent: userAgent,
 })

 if (error) return NextResponse.json({ error: error.message }, { status: 500 })
 return NextResponse.json({ ok: true })
}
