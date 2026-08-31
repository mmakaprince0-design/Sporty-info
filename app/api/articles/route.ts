import { NextRequest, NextResponse } from 'next/server'
import { supabasePublic } from '@/lib/supabase'

// GET /api/articles?category=Premier+League&limit=12
export async function GET(req: NextRequest) {
 const { searchParams } = new URL(req.url)
 const category = searchParams.get('category')
 const limit = Number(searchParams.get('limit') ?? 20)

 let query = supabasePublic
  .from('articles')
  .select('slug, title, excerpt, category, tag, author, cover_image_url, published_at')
  .eq('published', true)
  .order('published_at', { ascending: false })
  .limit(limit)

 if (category) query = query.eq('category', category)

 const { data, error } = await query
 if (error) return NextResponse.json({ error: error.message }, { status: 500 })
 return NextResponse.json({ articles: data })
}
