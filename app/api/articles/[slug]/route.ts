import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, supabasePublic } from '@/lib/supabase'

// GET /api/articles/[slug] — fetches the article and increments its view count.
// View-count increment uses the admin client (RLS blocks anon writes by design).
export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
 const { slug } = await params

 const { data: article, error } = await supabasePublic
  .from('articles')
  .select('*')
  .eq('slug', slug)
  .eq('published', true)
  .single()

 if (error || !article) return NextResponse.json({ error: 'Article not found' }, { status: 404 })

 await supabaseAdmin
  .from('articles')
  .update({ view_count: article.view_count + 1 })
  .eq('id', article.id)

 return NextResponse.json({ article })
}
