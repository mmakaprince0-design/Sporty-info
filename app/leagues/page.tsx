import { Trophy } from 'lucide-react'
import { LeagueExplorer, SectionHeading, SiteFrame } from '@/components/sporty-site'

export const metadata = { title: 'Leagues, Standings & Top Scorers | Sporty Info', description: 'League tables, standings and top scorers from Europe\'s biggest competitions.' }

export default function LeaguesPage() {
 return (
  <SiteFrame>
   <main className="inner-page">
    <div className="page-hero">
     <p className="eyebrow"><Trophy /> LEAGUE TABLES</p>
     <h1>Standings that<br /><em>tell the story.</em></h1>
     <p>Live tables and top scorers from the Premier League, La Liga, Bundesliga and Serie A.</p>
    </div>

    <section className="page-section">
     <SectionHeading eyebrow="" title="Standings & Top Scorers" />
     <LeagueExplorer />
    </section>
   </main>
  </SiteFrame>
 )
}
