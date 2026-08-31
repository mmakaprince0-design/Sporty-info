import { NextResponse } from 'next/server'

export async function GET() {
 if (!process.env.NEWS_API_KEY) {
  return NextResponse.json({ error: 'NEWS_API_KEY not configured' }, { status: 500 })
 }

 const query = encodeURIComponent('"premier league" OR "champions league" OR "la liga" OR "serie a" OR "bundesliga" OR "transfer news" OR soccer OR "Arsenal FC" OR "Real Madrid"')
const url = `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&pageSize=20&apiKey=${process.env.NEWS_API_KEY}`

 const res = await fetch(url, { next: { revalidate: 900 } })
 if (!res.ok) {
  const body = await res.json().catch(() => null)
  return NextResponse.json({ error: body?.message ?? `NewsAPI responded ${res.status}` }, { status: 502 })
 }

 const data = await res.json()
 const articles = (data.articles ?? [])
  .filter((a: any) => a.title && a.title !== '[Removed]')
  .map((a: any) => ({
   title: a.title,
   description: a.description,
   url: a.url,
   image: a.urlToImage,
   source: a.source?.name ?? null,
   publishedAt: a.publishedAt,
  }))

 return NextResponse.json({ articles })
}