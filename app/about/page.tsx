import { SiteFrame } from '@/components/sporty-site'

export const metadata = { title: 'About | Sporty Info', description: 'What Sporty Info is and what we cover.' }

export default function AboutPage() {
 return (
  <SiteFrame>
   <main className="inner-page">
    <div className="page-hero">
     <p className="eyebrow">ABOUT US</p>
     <h1>Football,<br /><em>told straight.</em></h1>
     <p>Sporty Info is a global football destination covering news, live scores and match previews for fans who want more from the game.</p>
    </div>
    <section className="page-section static-copy">
     <p>We started Sporty Info to bring fans one place for the stories, numbers and predictions that shape a matchday — without the noise. Our newsroom covers the world's biggest leagues with original reporting and clear analysis, alongside live scores across football, cricket, rugby, tennis and golf.</p>
     <p>Sporty Info also partners with licensed betting operators to bring you odds and predictions. Where you see a betting link, it's clearly marked, and we always encourage responsible play. 18+ only.</p>
    </section>
   </main>
  </SiteFrame>
 )
}
