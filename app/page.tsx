import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import {
 RealNewsGrid, AffiliateBanner, AdSlot, FeaturedSportsGrid, Hero,
 SectionHeading, SiteFrame, SportScoreBoard, YouTubeLive, LiveTicker, TipsPreview, NewsletterCapture, MyTeams,
} from '@/components/sporty-site'
import { links } from '@/lib/sporty-data'

export default function Home() {
 return (
  <SiteFrame>
   <main>
    <LiveTicker />
    <Hero />

    <section className="page-section">
     <SectionHeading eyebrow="" title="Your Teams" href="/leagues" />
     <MyTeams />
    </section>

    <section className="page-section">
     <SectionHeading eyebrow="" title="Live Scores" href="/matches" />
     <SportScoreBoard />
    </section>

    <section className="page-section">
     <SectionHeading eyebrow="" title="YouTube Live" href={undefined} />
     <YouTubeLive />
    </section>

    <section className="page-section">
     <SectionHeading eyebrow="" title="Featured Sports" />
     <FeaturedSportsGrid />
    </section>

    <section className="page-section">
     <SectionHeading eyebrow="TODAY'S TIPS" title="Predictions worth a look" href="/tips" />
     <TipsPreview />
    </section>

    <section className="page-section">
     <SectionHeading eyebrow="THE LEAD" title="The stories setting the agenda" href="/news" />
     <RealNewsGrid limit={6} />
    </section>

    <AffiliateBanner />

    <section className="page-section">
     <NewsletterCapture />
    </section>

    <section className="community">
     <p className="eyebrow">THE CONVERSATION CONTINUES</p>
     <h2>Never miss the<br /><em>final whistle.</em></h2>
     <p>Join the Sporty Info community for daily headlines, match alerts and a smarter football conversation.</p>
     <Link className="button button-primary" href={links.whatsapp} target="_blank" rel="noreferrer">Join the WhatsApp group <ArrowUpRight /></Link>
    </section>
   </main>
  </SiteFrame>
 )
}