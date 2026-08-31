import { notFound } from 'next/navigation'
import { ArticleCard, AffiliateBanner, SiteFrame, ShareButtons } from '@/components/sporty-site'
import { articles, findArticle } from '@/lib/sporty-data'

export function generateStaticParams() { return articles.map(article => ({ slug: article.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
 const { slug } = await params
 const article = findArticle(slug)
 return { title: article ? `${article.title} | Sporty Info` : 'Article | Sporty Info', description: article?.excerpt }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
 const { slug } = await params
 const article = findArticle(slug)
 if (!article) notFound()
 return (
  <SiteFrame>
   <main className="article-page">
    <div className="article-header">
     <p className="eyebrow">{article.category} · {article.tag}</p>
     <h1>{article.title}</h1>
     <p className="article-dek">{article.excerpt}</p>
     <div className="byline">By <strong>{article.author}</strong> · {article.date} · {article.readTime}</div>
    </div>
    <div className="article-layout">
     <article className="article-body">
      <div className="article-art large"><span>SPORTY INFO / {article.tag}</span></div>
      {article.body.map((paragraph, i) => i === 0 ? <p className="lead-paragraph" key={paragraph}>{paragraph}</p> : <p key={paragraph}>{paragraph}</p>)}
      <p className="editor-note">This is an original Sporty Info feature. Our newsroom covers global football with independence and clarity.</p>
      <ShareButtons title={article.title} />
     </article>
     <aside>
      <div className="sidebar-card">
       <p className="eyebrow">MORE TO READ</p>
       {articles.filter(a => a.slug !== article.slug).slice(0, 3).map(a => <ArticleCard key={a.slug} article={a} />)}
      </div>
     </aside>
    </div>
    <AffiliateBanner />
   </main>
  </SiteFrame>
 )
}
