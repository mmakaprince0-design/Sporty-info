import { RealNewsGrid, AdSlot, SectionHeading, SiteFrame, SearchBar } from '@/components/sporty-site'

export const metadata = { title: 'News | Sporty Info', description: 'Global football news, analysis and stories from Sporty Info.' }

export default function NewsPage() {
 return (
  <SiteFrame>
   <main className="inner-page">
    <div className="page-hero">
     <p className="eyebrow">THE NEWSROOM</p>
     <h1>Football,<br /><em>with context.</em></h1>
     <p>Original reporting, considered analysis and the stories that make the world's game worth watching.</p>
    </div>
    <div style={{ padding: '0 16px 8px' }}><SearchBar placeholder="Search articles" /></div>
    <section className="page-section">
     <SectionHeading eyebrow="LATEST STORIES" title="What we're watching" />
     <RealNewsGrid limit={20} />
     <AdSlot />
    </section>
   </main>
  </SiteFrame>
 )
}