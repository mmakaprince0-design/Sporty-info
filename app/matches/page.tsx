import { Radio, ShieldCheck } from 'lucide-react'
import { AffiliateBanner, MatchCard, SectionHeading, SiteFrame, SportScoreBoard, YouTubeLive, SearchBar } from '@/components/sporty-site'
import { fixtures } from '@/lib/sporty-data'

export const metadata = { title: 'Matches & Live Scores | Sporty Info', description: 'Live football scores and match previews from around the world.' }

export default function MatchesPage() {
 return (
  <SiteFrame>
   <main className="inner-page">
    <div className="page-hero matches-hero">
     <p className="eyebrow"><Radio /> LIVE CENTRE</p>
     <h1>Every fixture.<br /><em>One place.</em></h1>
     <p>Follow the matches shaping the week across football, cricket, rugby, tennis and golf.</p>
    </div>

    <div style={{ padding: '0 16px 8px' }}><SearchBar placeholder="Search teams or competitions" /></div>

    <section className="page-section">
     <SectionHeading eyebrow="" title="Today's Scoreboard" />
     <SportScoreBoard />
    </section>

    <section className="page-section">
     <SectionHeading eyebrow="" title="Watch Live" />
     <YouTubeLive />
    </section>

    <section className="page-section">
     <SectionHeading eyebrow="THE PREVIEW DESK" title="Know before kickoff" />
     <div className="match-grid">
      {fixtures.map(f => <MatchCard key={f.id} fixture={f} />)}
     </div>
     <p style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--muted)', marginTop: 12 }}>
      <ShieldCheck style={{ width: 14, height: 14 }} /> API-Football ready · demo feed active
     </p>
    </section>

    <AffiliateBanner />
   </main>
  </SiteFrame>
 )
}
