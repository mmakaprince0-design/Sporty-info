import { SiteFrame } from '@/components/sporty-site'

export const metadata = { title: 'Privacy Policy | Sporty Info', description: 'How Sporty Info collects and uses data.' }

export default function PrivacyPage() {
 return (
  <SiteFrame>
   <main className="inner-page">
    <div className="page-hero">
     <p className="eyebrow">PRIVACY</p>
     <h1>Your data,<br /><em>handled plainly.</em></h1>
     <p>Last updated August 2026.</p>
    </div>
    <section className="page-section static-copy">
     <h2>What we collect</h2>
     <p>We collect the email address you provide when subscribing to our newsletter or WhatsApp community, and basic analytics about how you use the site (pages viewed, device type, approximate location).</p>
     <h2>Affiliate links</h2>
     <p>Sporty Info earns a commission when you click through to a betting partner and sign up. We log clicks (timestamp and which partner) to measure this — we do not sell this data.</p>
     <h2>Your choices</h2>
     <p>You can unsubscribe from the newsletter at any time via the link in any email, and leave the WhatsApp community at any time.</p>
     <h2>Contact</h2>
     <p>Questions about this policy can be sent through our Contact page.</p>
    </section>
   </main>
  </SiteFrame>
 )
}
