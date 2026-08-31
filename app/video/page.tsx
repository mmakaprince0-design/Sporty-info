import { PlayCircle } from 'lucide-react'
import { SectionHeading, SiteFrame, VideoCard } from '@/components/sporty-site'
import { videos } from '@/lib/sporty-data'

export const metadata = { title: 'Highlights & Analysis | Sporty Info', description: 'Match highlights, tactical breakdowns and previews from Sporty Info.' }

export default function VideoPage() {
 return (
  <SiteFrame>
   <main className="inner-page">
    <div className="page-hero">
     <p className="eyebrow"><PlayCircle /> WATCH</p>
     <h1>Highlights &<br /><em>analysis.</em></h1>
     <p>Every big moment, broken down and explained.</p>
    </div>

    <section className="page-section">
     <SectionHeading eyebrow="" title="Latest Videos" />
     <div className="video-grid">
      {videos.map(v => <VideoCard key={v.id} video={v} />)}
     </div>
    </section>
   </main>
  </SiteFrame>
 )
}
