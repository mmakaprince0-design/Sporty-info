import { Zap } from 'lucide-react'
import { AffiliateBanner, OddsComparisonTable, SectionHeading, SiteFrame, TipCard } from '@/components/sporty-site'
import { tips } from '@/lib/sporty-data'

export const metadata = { title: 'Betting Tips & Predictions | Sporty Info', description: "Today's football predictions, odds and results from Sporty Info." }

export default function TipsPage() {
 const pending = tips.filter(t => t.result === 'pending')
 const settled = tips.filter(t => t.result && t.result !== 'pending')
 const headline = pending[0]
 return (
  <SiteFrame>
   <main className="inner-page">
    <div className="page-hero">
     <p className="eyebrow"><Zap /> TIPS DESK</p>
     <h1>Today's tips,<br /><em>backed by form.</em></h1>
     <p>Predictions, odds and confidence ratings across the week's biggest fixtures. 18+ only — please gamble responsibly.</p>
    </div>

    <section className="page-section">
     <SectionHeading eyebrow="" title="Today's Predictions" />
     <div className="tips-grid">
      {pending.map(t => <TipCard key={t.id} tip={t} />)}
     </div>
    </section>

    {headline && (
     <section className="page-section">
      <SectionHeading eyebrow="ODDS COMPARISON" title="Best price for today's top pick" />
      <OddsComparisonTable tip={headline} />
     </section>
    )}

    {settled.length > 0 && (
     <section className="page-section">
      <SectionHeading eyebrow="TRACK RECORD" title="Recent results" />
      <div className="tips-grid">
       {settled.map(t => <TipCard key={t.id} tip={t} />)}
      </div>
     </section>
    )}

    <AffiliateBanner />
   </main>
  </SiteFrame>
 )
}
