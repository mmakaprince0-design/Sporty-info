import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// All /api/admin/* routes are gated the same way: a bearer token compared against
// ADMIN_API_SECRET (set in your env, never shipped to the client). Swap this for
// proper Supabase Auth + role checks once there's an admin UI.
function isAuthorized(req: NextRequest) {
 return req.headers.get('authorization') === `Bearer ${process.env.ADMIN_API_SECRET}`
}

// POST /api/admin/articles — create an article.
// Body: { slug, title, excerpt, body, category, tag, author, coverImageUrl? }
export async function POST(req: NextRequest) {
 if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

 const body = await req.json().catch(() => null)
 if (!body?.slug || !body?.title || !body?.body) {
  return NextResponse.json({ error: 'slug, title and body are required' }, { status: 400 })
 }

 const { data, error } = await supabaseAdmin
  .from('articles')
  .insert({
   slug: body.slug,
   title: body.title,
   excerpt: body.excerpt ?? null,
   body: body.body,
   category: body.category ?? null,
   tag: body.tag ?? null,
   author: body.author ?? 'Sporty Info Desk',
   cover_image_url: body.coverImageUrl ?? null,
  })
  .select()
  .single()

 if (error) return NextResponse.json({ error: error.message }, { status: 500 })
 return NextResponse.json({ article: data }, { status: 201 })
}
