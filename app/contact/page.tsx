import { ContactForm, SiteFrame } from '@/components/sporty-site'

export const metadata = { title: 'Contact | Sporty Info', description: 'Get in touch with the Sporty Info team.' }

export default function ContactPage() {
 return (
  <SiteFrame>
   <main className="inner-page">
    <div className="page-hero">
     <p className="eyebrow">CONTACT</p>
     <h1>Talk to<br /><em>the newsroom.</em></h1>
     <p>Tips, corrections, partnerships — we read everything that comes in.</p>
    </div>
    <section className="page-section">
     <ContactForm />
    </section>
   </main>
  </SiteFrame>
 )
}
