'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
 ArrowUpRight, CalendarDays, ChevronRight, ExternalLink, Home, Menu, MoreHorizontal,
 PlayCircle, Plus, Radio, Search, ShieldCheck, Star, Trophy, Tv, User, X, Zap,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import {
 affiliateLinks, featuredSports, heroSlides, scoresBySport, sportsTabs, teamBadges, youtube, youtubeChannels, latestEmbedUrl,
 tips, leagueTabs, standingsByLeague, topScorersByLeague, videos,
 teamSlug, fixturesForTeam, teamLeague,
 type Article, type Fixture, type SportKey, type Tip, type LeagueKey, type VideoItem, type HeroSlide, links,
} from '@/lib/sporty-data'

function SportIcon({ sport, className }: { sport: SportKey; className?: string }) {
 const common = { width: 15, height: 15, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, className }
 switch (sport) {
  case 'football':
   return (
    <svg {...common}>
     <circle cx="12" cy="12" r="9" />
     <path d="M12 7l4 3-1.5 4.5h-5L8 10z" />
     <path d="M12 7V4.2M16 10l2.6-1.6M14.5 14.5l1.9 2.4M9.5 14.5l-1.9 2.4M8 10 5.4 8.4" />
    </svg>
   )
  case 'cricket':
   return (
    <svg {...common}>
     <circle cx="6" cy="18" r="2.2" />
     <path d="M8.6 15.4 18 6" />
     <path d="M15.5 3.5l5 5-2.2 2.2-5-5z" />
    </svg>
   )
  case 'rugby':
   return (
    <svg {...common}>
     <path d="M4.5 12c0-4.5 3.4-7.5 7.5-7.5s7.5 3 7.5 7.5-3.4 7.5-7.5 7.5-7.5-3-7.5-7.5Z" />
     <path d="M7 9.5l10 5M9.5 7l5 10M6 12h12" />
    </svg>
   )
  case 'tennis':
   return (
    <svg {...common}>
     <circle cx="12" cy="12" r="9" />
     <path d="M4 8.5c3 1.5 4.5 3.8 4.7 8.7M20 15.5c-3-1.5-4.5-3.8-4.7-8.7" />
    </svg>
   )
  case 'golf':
   return (
    <svg {...common}>
     <path d="M7 21h6" />
     <path d="M9 21V4" />
     <path d="M9 4l7 3.3L9 10.6z" />
     <circle cx="17.2" cy="21.4" r="1.6" />
    </svg>
   )
 }
}

function useIsActive() {
 const pathname = usePathname()
 return (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`))
}

export function Header() {
 const [open, setOpen] = useState(false)
 const isActive = useIsActive()
 return (
  <header className="site-header">
   <button className="header-icon-btn" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
   <Link href="/" className="brand"><span className="brand-word">sportyinfo</span></Link>
   <p className="header-tagline">World of Champions</p>
   <div className="header-actions">
    <button className="header-icon-btn" aria-label="Search"><Search /></button>
    <DarkModeToggle />
    <button className="avatar-btn" aria-label="Account"><User /></button>
   </div>
   {open && (
    <nav style={{ position: 'absolute', top: 56, left: 0, right: 0, background: 'var(--panel-2)', borderBottom: '1px solid var(--line)', padding: 16, display: 'flex', flexDirection: 'column', gap: 14, zIndex: 25 }}>
     <Link href="/" onClick={() => setOpen(false)} aria-current={isActive('/') ? 'page' : undefined} style={isActive('/') ? { color: 'var(--accent)' } : undefined}>Home</Link>
     <Link href="/matches" onClick={() => setOpen(false)} aria-current={isActive('/matches') ? 'page' : undefined} style={isActive('/matches') ? { color: 'var(--accent)' } : undefined}>Live TV & Scores</Link>
     <Link href="/news" onClick={() => setOpen(false)} aria-current={isActive('/news') ? 'page' : undefined} style={isActive('/news') ? { color: 'var(--accent)' } : undefined}>News</Link>
     <a href={links.whatsapp} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Community</a>
    </nav>
   )}
   <nav className="primary-tabs" aria-label="Primary navigation">
    <Link href="/" className={isActive('/') ? 'active' : ''}>Home</Link>
    <Link href="/matches" className={isActive('/matches') ? 'active' : ''}>Live TV</Link>
    <Link href="/matches" className={isActive('/matches') ? 'active' : ''}>Scores</Link>
    <Link href="/news" className={isActive('/news') ? 'active' : ''}>News</Link>
    <Link href="/tips" className={isActive('/tips') ? 'active' : ''}>Tips</Link>
    <Link href="/leagues" className={isActive('/leagues') ? 'active' : ''}>Leagues</Link>
    <Link href="/video" className={isActive('/video') ? 'active' : ''}>Videos</Link>
   </nav>
  </header>
 )
}

export function BottomNav() {
 const isActive = useIsActive()
 return (
  <nav className="bottom-nav" aria-label="Primary navigation">
   <Link href="/" className={isActive('/') ? 'active' : ''}><Home /><span>Home</span></Link>
   <Link href="/matches" className={isActive('/matches') ? 'active' : ''}><Tv /><span>Live TV</span></Link>
   <Link href="/tips" className={isActive('/tips') ? 'active' : ''}><Zap /><span>Tips</span></Link>
   <Link href="/leagues" className={isActive('/leagues') ? 'active' : ''}><Trophy /><span>Leagues</span></Link>
   <a href={links.whatsapp} target="_blank" rel="noreferrer"><MoreHorizontal /><span>More</span></a>
  </nav>
 )
}

export function TeamCrest({ name, size = 26 }: { name: string; size?: number }) {
 const badge = teamBadges[name]
 const initials = badge?.initials ?? name.slice(0, 3).toUpperCase()
 const bg = badge?.bg ?? '#2b3557'
 const fg = badge?.fg ?? '#ffffff'
 return <span className="crest" style={{ width: size, height: size, background: bg, color: fg, fontSize: size * 0.34 }}>{initials}</span>
}

export function SectionHeading({ eyebrow, title, href }: { eyebrow: string; title: string; href?: string }) {
 return (
  <div className="section-heading">
   <div>
    {eyebrow && <p className="eyebrow" style={{ marginBottom: 4 }}>{eyebrow}</p>}
    <h2>{title}</h2>
   </div>
   {href && <Link className="text-link" href={href}>View All <ChevronRight /></Link>}
  </div>
 )
}

const HERO_INTERVAL_MS = 6000

type NewsArticle = { title: string; description: string | null; url: string; image: string | null; source: string | null; publishedAt: string }

function useLiveFootball() {
 const [matches, setMatches] = useState<LiveMatchRow[] | null>(null)
 const [error, setError] = useState(false)
 useEffect(() => {
  let cancelled = false
  async function load() {
   try {
    const res = await fetch('/api/matches')
    if (!res.ok) throw new Error('bad response')
    const data = await res.json()
    if (!cancelled) setMatches(data.matches ?? [])
   } catch {
    if (!cancelled) setError(true)
   }
  }
  load()
  const id = setInterval(load, 60_000)
  return () => { cancelled = true; clearInterval(id) }
 }, [])
 return { matches, error }
}

function useTopFootballNews(limit = 5) {
 const [articlesList, setArticlesList] = useState<NewsArticle[]>([])

 useEffect(() => {
  let cancelled = false
  fetch('/api/news')
   .then(res => res.json())
   .then(data => { if (!cancelled) setArticlesList((data.articles ?? []).slice(0, limit)) })
   .catch(() => {})
  return () => { cancelled = true }
 }, [limit])

 return articlesList
}

export function Hero() {
 const [index, setIndex] = useState(0)
 const [paused, setPaused] = useState(false)
 const touchStartX = useRef<number | null>(null)
 const { matches: liveMatches } = useLiveFootball()
 const newsArticles = useTopFootballNews(5)

 const liveNow = (liveMatches ?? []).find(m => m.status === 'LIVE')
 const dynamicSlide: HeroSlide | null = liveNow ? {
  badge: 'LIVE NOW',
  title: `${liveNow.home_team}`,
  titleAccent: `${liveNow.home_score ?? 0} — ${liveNow.away_score ?? 0} ${liveNow.away_team}`,
  description: `${liveNow.competition} · ${liveNow.minute ?? 'LIVE'}`,
  primaryCta: { label: 'Watch Live', href: '/matches' },
  secondaryCta: { label: 'All Live Scores', href: '/matches' },
  gradient: 'radial-gradient(circle at 78% 30%,#3a1f5c 0%,#0d0916 62%)',
 } : null

 const newsSlides: HeroSlide[] = newsArticles.map(a => ({
  badge: 'BREAKING',
  title: a.title.length > 60 ? `${a.title.slice(0, 60)}...` : a.title,
  titleAccent: '',
  description: a.source ? `${a.source} - Just in` : 'Just in',
  primaryCta: { label: 'More News', href: '/news' },
  secondaryCta: { label: 'More News', href: '/news' },
  gradient: 'radial-gradient(circle at 72% 72%,#2e1548 0%,#0d0916 62%)',
 }))

 const slides = [dynamicSlide, ...newsSlides, ...heroSlides].filter((s): s is HeroSlide => s !== null)
 const count = slides.length

 const slideImages: (string | null)[] = [
  dynamicSlide ? null : undefined,
  ...newsArticles.map(a => a.image ?? null),
  ...heroSlides.map(() => null),
 ].filter((img): img is string | null => img !== undefined)

 useEffect(() => {
  if (paused) return
  const id = setInterval(() => setIndex(i => (i + 1) % count), HERO_INTERVAL_MS)
  return () => clearInterval(id)
 }, [paused, count])

 function go(next: number) { setIndex(((next % count) + count) % count) }
 function handleTouchStart(e: React.TouchEvent) { touchStartX.current = e.touches[0].clientX }
 function handleTouchEnd(e: React.TouchEvent) {
  if (touchStartX.current === null) return
  const delta = e.changedTouches[0].clientX - touchStartX.current
  if (delta > 40) go(index - 1)
  else if (delta < -40) go(index + 1)
  touchStartX.current = null
 }

 const slide = slides[index % slides.length]
const fallbackImages = newsArticles.map(a => a.image).filter((img): img is string => !!img)
 const bgImage = slideImages[index % slides.length] ?? (fallbackImages.length > 0 ? fallbackImages[index % fallbackImages.length] : null)

 return (
  <section
   className="hero-carousel"
   onMouseEnter={() => setPaused(true)}
   onMouseLeave={() => setPaused(false)}
   onTouchStart={handleTouchStart}
   onTouchEnd={handleTouchEnd}
  >
   <div
    className="hero-card"
    key={index}
    style={{
     backgroundImage: bgImage
      ? `linear-gradient(180deg,rgba(10,8,18,.35) 0%,rgba(10,8,18,.7) 55%,rgba(10,8,18,.95) 100%),url(${bgImage}),${slide.gradient}`
      : `linear-gradient(180deg,rgba(10,8,18,.15) 0%,rgba(10,8,18,.55) 55%,rgba(10,8,18,.92) 100%),${slide.gradient}`,
     backgroundSize: 'cover',
     backgroundPosition: 'center',
    }}
   >
    <span className="hero-badge"><Radio style={{ width: 11, height: 11, display: 'inline', verticalAlign: '-1px', marginRight: 4 }} />{slide.badge}</span>
    <div className="hero-content">
     <h1>{slide.title}<br /><em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>{slide.titleAccent}</em></h1>
     <p>{slide.description}</p>
     <div className="hero-actions">
      <Link className="button button-primary" href={slide.primaryCta.href}><PlayCircle /> {slide.primaryCta.label}</Link>
      <Link className="button button-ghost" href={slide.secondaryCta.href}><CalendarDays /> {slide.secondaryCta.label}</Link>
     </div>
    </div>
    <button className="hero-arrow hero-arrow-prev" aria-label="Previous slide" onClick={() => go(index - 1)}>‹</button>
    <button className="hero-arrow hero-arrow-next" aria-label="Next slide" onClick={() => go(index + 1)}>›</button>
   </div>
   <div className="hero-dots">
    {slides.map((s, i) => (
     <button key={`${s.title}-${i}`} aria-label={`Go to slide ${i + 1}`} aria-current={i === index} className={i === index ? 'active' : ''} onClick={() => go(i)} />
    ))}
   </div>
  </section>
 )
}

type LiveMatchRow = {
 id: string
 competition: string
 home_team: string
 away_team: string
 home_score: number | null
 away_score: number | null
 status: string
 minute: string | null
 kickoff_at: string
 home_team_logo: string | null
 away_team_logo: string | null
}

export function LiveFootballBoard() {
 const { matches, error } = useLiveFootball()

 if (error || matches === null) {
  const rows = scoresBySport.football
  return (
   <div className="score-board">
    {rows.map(f => <ScoreRow key={f.id} fixture={f} />)}
    <div className="demo-note"><ShieldCheck /> {error ? 'Live feed unavailable · showing demo data' : 'Loading live scores…'}</div>
   </div>
  )
 }

 if (matches.length === 0) {
  return (
   <div className="score-board">
    <div className="demo-note"><ShieldCheck /> No synced fixtures yet · run /api/sync/fixtures to pull today's matches</div>
   </div>
  )
 }

 const sorted = [...matches].sort((a, b) => {
  if (a.status === 'LIVE' && b.status !== 'LIVE') return -1
  if (b.status === 'LIVE' && a.status !== 'LIVE') return 1
  return new Date(a.kickoff_at).getTime() - new Date(b.kickoff_at).getTime()
 })

 return (
  <div className="score-board">
   {sorted.slice(0, 8).map(m => <LiveScoreRow key={m.id} match={m} />)}
   <div className="demo-note"><ShieldCheck /> Live feed · API-Football</div>
  </div>
 )
}

function LiveScoreRow({ match: m }: { match: LiveMatchRow }) {
 const kickoff = new Date(m.kickoff_at)
 const kickoffLabel = kickoff.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
 return (
  <div className="score-row">
   <div className="score-comp">
    <span className={m.status === 'LIVE' ? 'status-pill' : 'status-pill upcoming'}>{m.status === 'LIVE' ? 'LIVE' : kickoffLabel}</span>
    <span className="score-comp-text"><span>{m.competition}</span></span>
   </div>
   <div className="crest-row">
    <TeamLogo name={m.home_team} src={m.home_team_logo} />
    <span className="team-name">{m.home_team}</span>
    <span className="score-value">{m.status === 'SCHEDULED' ? 'vs' : `${m.home_score ?? 0} — ${m.away_score ?? 0}`}</span>
    <span className="team-name">{m.away_team}</span>
    <TeamLogo name={m.away_team} src={m.away_team_logo} />
   </div>
   <div className="row-time">{m.status === 'LIVE' ? m.minute : kickoffLabel}<small>{m.status === 'LIVE' ? 'LIVE' : 'Today'}</small></div>
  </div>
 )
}

function TeamLogo({ name, src, size = 26 }: { name: string; src: string | null; size?: number }) {
 const [failed, setFailed] = useState(false)
 if (!src || failed) return <TeamCrest name={name} size={size} />
 // eslint-disable-next-line @next/next/no-img-element
 return <img src={src} alt={name} width={size} height={size} className="team-logo" onError={() => setFailed(true)} />
}

export function SportScoreBoard({ initial = 'football' as SportKey }: { initial?: SportKey }) {
 const [active, setActive] = useState<SportKey>(initial)
 const rows = scoresBySport[active]
 return (
  <>
   <div className="sport-tabs" role="tablist">
    {sportsTabs.map(t => (
     <button key={t.key} role="tab" aria-selected={active === t.key} className={active === t.key ? 'sport-tab active' : 'sport-tab'} onClick={() => setActive(t.key)}>
      <SportIcon sport={t.key} />{t.label}
     </button>
    ))}
   </div>
   {active === 'football' ? (
    <LiveFootballBoard />
   ) : (
    <div className="score-board">
     {rows.map(f => <ScoreRow key={f.id} fixture={f} />)}
     <div className="demo-note"><ShieldCheck /> Demo feed · Connect a live sports data API for real-time odds & scores</div>
    </div>
   )}
  </>
 )
}

export function ScoreRow({ fixture }: { fixture: Fixture }) {
 const isCrestSport = teamBadges[fixture.home] || teamBadges[fixture.away]
 return (
  <div className="score-row">
   <div className="score-comp">
    <span className={fixture.status === 'LIVE' ? 'status-pill' : 'status-pill upcoming'}>{fixture.status === 'LIVE' ? 'LIVE' : fixture.kickoff || 'SOON'}</span>
    <span className="score-comp-text"><span>{fixture.competition}</span></span>
   </div>
   <div className="crest-row">
    {isCrestSport && <TeamCrest name={fixture.home} />}
    <span className="team-name">{fixture.home}</span>
    <span className="score-value">{fixture.score || 'vs'}</span>
    <span className="team-name">{fixture.away}</span>
    {isCrestSport && <TeamCrest name={fixture.away} />}
   </div>
   <div className="row-time">{fixture.status === 'LIVE' ? fixture.minute : fixture.kickoff}<small>{fixture.status === 'LIVE' ? 'LIVE' : 'Today'}</small></div>
  </div>
 )
}

export function YouTubeLive() { const [active, setActive] = useState(0); 
const channel = youtubeChannels[active]; return ( <div className="yt-
card"> <div className="sport-tabs" role="tablist"> 
{youtubeChannels.map((c, i) => ( <button key={c.key} role="tab" aria-
  selected={active === i} className={active === i ? 'sport-tab active' : 
'sport-tab'} onClick={() => setActive(i)}> {c.channelName} </button> ))}
 </div> <div className="yt-frame-wrap"> <iframe src=
{latestEmbedUrl(channel.channelId)} title={`${channel.channelName} 
on YouTube`} allow="accelerometer; autoplay; clipboard-write; 
encrypted-media; gyroscope; picture-in-picture" allowFullScreen /> 
</div> <div className="yt-meta"> <span className="yt-live-dot">
</span> <div> <strong>{channel.channelName} · Official
 Channel</strong> <span>Latest uploads & highlights, straight from 
YouTube</span> </div> <a className="yt-open" href=
{channel.channelUrl} target="_blank" rel="noreferrer">Open 
<ExternalLink /></a> </div> </div> ); }
export function FeaturedSportsGrid() {
 return (
  <div className="sports-grid">
   {featuredSports.map(s => (
    <div className="sport-card" key={s.key}>
     {s.key === 'more' ? <Plus style={{ width: 22, height: 22 }} /> : <SportIcon sport={s.key as SportKey} className="sport-card-icon" />}
     <strong>{s.label}</strong>
     <small>{s.sub}</small>
    </div>
   ))}
  </div>
 )
}

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
 return (
  <Link href={`/news/${article.slug}`} className={featured ? 'article-card featured' : 'article-card'}>
   <div className="article-art" style={{ backgroundImage: `url(https://picsum.photos/seed/${article.slug}/600/400)` }}><span>{article.tag}</span></div>
   <div className="article-copy">
    <p className="kicker">{article.category}</p>
    <h3>{article.title}</h3>
    <p>{article.excerpt}</p>
    <small>{article.author} · {article.readTime}</small>
   </div>
  </Link>
 )
}

export function MatchCard({ fixture }: { fixture: Fixture }) {
 return (
  <article className="match-card">
   <div className="match-top">
    <span>{fixture.competition}</span>
    <span className={fixture.status === 'LIVE' ? 'live-label' : ''}>{fixture.status === 'LIVE' ? '● LIVE' : <><CalendarDays /> {fixture.kickoff}</>}</span>
   </div>
   <div className="match-teams">
    <div className="match-team"><TeamCrest name={fixture.home} size={30} /><strong>{fixture.home}</strong></div>
    <span className="match-vs">{fixture.score || 'VS'}</span>
    <div className="match-team"><TeamCrest name={fixture.away} size={30} /><strong>{fixture.away}</strong></div>
   </div>
   <p>{fixture.preview}</p>
   <div className="affiliate-row">
    {affiliateLinks.map(link => (
     <a key={link.label} href={link.href} target="_blank" rel="noreferrer" style={{ background: link.bg, color: link.fg }}>
      <span className="brand-dot" style={{ background: 'rgba(255,255,255,.2)' }}>{link.mark}</span>{link.label} <ExternalLink />
     </a>
    ))}
   </div>
   <small>Affiliate links · 18+ · Gamble responsibly</small>
  </article>
 )
}

export function AffiliateBanner() {
 return (
  <section className="affiliate-banner">
   <div>
    <p className="eyebrow">MATCHDAY EDGE</p>
    <h2>Make your matchday count.</h2>
    <p>Compare official betting partners before kickoff. Play responsibly and only if you are 18+.</p>
    <p className="responsible-note">18+ only · BeGambleAware · Gambling can be addictive, please play responsibly.</p>
   </div>
   <div className="affiliate-pills">
    {affiliateLinks.map(link => (
     <a key={link.label} className="affiliate-pill" href={link.href} target="_blank" rel="noreferrer" style={{ background: link.bg, color: link.fg }}>
      <span className="brand-dot">{link.mark}</span>{link.label}<ArrowUpRight style={{ width: 13, height: 13 }} />
     </a>
    ))}
   </div>
  </section>
 )
}

export function AdSlot() {
 return <div className="ad-slot"><span>ADVERTISEMENT</span><strong>Space reserved for Google AdSense</strong><small>Ads will appear after approval and account verification.</small></div>
}

export function Footer() {
 return (
  <footer className="footer">
   <div>
    <Link href="/" className="brand"><span className="brand-word">sportyinfo</span></Link>
    <p>Independent football reporting for fans who want more from the beautiful game.</p>
    <p className="disclosure">Affiliate disclosure: Some links on Sporty Info are affiliate links. We may earn a commission at no extra cost to you. Gambling involves risk. 18+.</p>
   </div>
   <div className="footer-links">
    <Link href="/news">News</Link>
    <Link href="/matches">Matches</Link>
    <Link href="/tips">Tips</Link>
    <Link href="/leagues">Leagues</Link>
    <Link href="/video">Videos</Link>
    <Link href="/about">About</Link>
    <Link href="/contact">Contact</Link>
    <Link href="/privacy">Privacy</Link>
    <a href={links.twitter}>Twitter / X</a>
    <a href={links.facebook}>Facebook</a>
   </div>
  </footer>
 )
}

export function DarkModeToggle() {
 const [light, setLight] = useState(false)
 useEffect(() => {
  const stored = typeof window !== 'undefined' ? window.localStorage?.getItem('sporty-theme') : null
  if (stored === 'light') { setLight(true); document.documentElement.setAttribute('data-theme', 'light') }
 }, [])
 function toggle() {
  const next = !light
  setLight(next)
  document.documentElement.setAttribute('data-theme', next ? 'light' : 'dark')
  try { window.localStorage?.setItem('sporty-theme', next ? 'light' : 'dark') } catch {}
 }
 return (
  <button className="header-icon-btn" aria-label="Toggle dark mode" onClick={toggle}>
   {light ? <Radio style={{ width: 18, height: 18 }} /> : <Zap style={{ width: 18, height: 18 }} />}
  </button>
 )
}

export function LiveTicker() {
 const [tick, setTick] = useState(0)
 useEffect(() => {
  const id = setInterval(() => setTick(t => t + 1), 60_000)
  return () => clearInterval(id)
 }, [])
 const live = Object.values(scoresBySport).flat().filter(f => f.status === 'LIVE')
 if (!live.length) return null
 return (
  <div className="live-ticker" aria-live="polite" key={tick}>
   <span className="live-ticker-label"><span className="yt-live-dot" /> LIVE</span>
   <div className="live-ticker-track">
    {live.concat(live).map((f, i) => (
     <span className="live-ticker-item" key={`${f.id}-${i}`}>{f.home} <b>{f.score}</b> {f.away} <small>{f.minute}</small></span>
    ))}
   </div>
  </div>
 )
}

export function ConfidenceBadge({ level }: { level: Tip['confidence'] }) {
 return <span className={`confidence-badge confidence-${level.toLowerCase()}`}>{level}</span>
}

export function ResultBadge({ result }: { result: Tip['result'] }) {
 if (!result || result === 'pending') return <span className="result-badge pending">Pending</span>
 return <span className={`result-badge ${result}`}>{result === 'won' ? 'Won' : 'Lost'}</span>
}

export function TipCard({ tip }: { tip: Tip }) {
 const affiliate = affiliateLinks.find(a => a.label.toLowerCase().replace(/[^a-z]/g, '') === tip.affiliate.toLowerCase().replace(/[^a-z]/g, '')) ?? affiliateLinks[0]
 return (
  <article className="tip-card">
   <div className="tip-top">
    <span>{tip.competition}</span>
    <ResultBadge result={tip.result} />
   </div>
   <div className="tip-teams">{tip.home} <small>vs</small> {tip.away}</div>
   <div className="tip-kickoff">{tip.kickoff}</div>
   <div className="tip-pick">
    <div>
     <p className="tip-market">{tip.market}</p>
     <p className="tip-prediction">{tip.prediction}</p>
    </div>
    <div className="tip-odds">
     <small>Odds</small>
     <strong>{tip.odds}</strong>
    </div>
   </div>
   <div className="tip-bottom">
    <ConfidenceBadge level={tip.confidence} />
    <a href={affiliate.href} target="_blank" rel="noreferrer" className="tip-cta" style={{ background: affiliate.bg, color: affiliate.fg }}>
     <span className="brand-dot" style={{ background: 'rgba(255,255,255,.2)' }}>{affiliate.mark}</span> Bet on {affiliate.label} <ExternalLink style={{ width: 12, height: 12 }} />
    </a>
   </div>
  </article>
 )
}

export function TipsPreview() {
 return (
  <div className="tips-grid">
   {tips.filter(t => t.result === 'pending').slice(0, 3).map(t => <TipCard key={t.id} tip={t} />)}
  </div>
 )
}

export function OddsComparisonTable({ tip }: { tip: Tip }) {
 const base = parseFloat(tip.odds)
 const rows = affiliateLinks.map((a, i) => ({ ...a, price: (base + (i - 1) * 0.06).toFixed(2) }))
 return (
  <div className="odds-table">
   <div className="odds-table-head">
    <span>{tip.market}: {tip.prediction}</span>
   </div>
   {rows.map(r => (
    <a key={r.label} href={r.href} target="_blank" rel="noreferrer" className="odds-row">
     <span className="brand-dot" style={{ background: r.bg, color: r.fg }}>{r.mark}</span>
     <span>{r.label}</span>
     <strong>{r.price}</strong>
    </a>
   ))}
  </div>
 )
}

export function LeagueTabs({ active, onChange }: { active: LeagueKey; onChange: (k: LeagueKey) => void }) {
 return (
  <div className="sport-tabs" role="tablist">
   {leagueTabs.map(t => (
    <button key={t.key} role="tab" aria-selected={active === t.key} className={active === t.key ? 'sport-tab active' : 'sport-tab'} onClick={() => onChange(t.key)}>
     {t.label}
    </button>
   ))}
  </div>
 )
}

export function StandingsTable({ league }: { league: LeagueKey }) {
 const rows = standingsByLeague[league]
 return (
  <div className="standings-table">
   <div className="standings-row standings-head">
    <span>#</span><span>Team</span><span>P</span><span>W</span><span>D</span><span>L</span><span>GD</span><span>Pts</span>
   </div>
   {rows.map(r => (
    <div className="standings-row" key={r.team}>
     <span>{r.pos}</span>
     <Link href={`/leagues/${teamSlug(r.team)}`} className="standings-team">
      <TeamCrest name={r.team} size={20} />{r.team}
     </Link>
     <span>{r.played}</span><span>{r.won}</span><span>{r.drawn}</span><span>{r.lost}</span>
     <span>{r.gd > 0 ? `+${r.gd}` : r.gd}</span>
     <strong>{r.points}</strong>
    </div>
   ))}
  </div>
 )
}

export function TopScorersTable({ league }: { league: LeagueKey }) {
 const rows = topScorersByLeague[league]
 return (
  <div className="scorers-table">
   {rows.map(r => (
    <div className="scorers-row" key={r.player}>
     <span className="scorers-rank">{r.rank}</span>
     <span className="scorers-name"><strong>{r.player}</strong><small>{r.team}</small></span>
     <span className="scorers-goals">{r.goals}</span>
    </div>
   ))}
  </div>
 )
}

const FAVORITES_KEY = 'sporty-favorite-teams'

function readFavorites(): string[] {
 if (typeof window === 'undefined') return []
 try { return JSON.parse(window.localStorage.getItem(FAVORITES_KEY) ?? '[]') } catch { return [] }
}

function useFavoriteTeams() {
 const [favorites, setFavorites] = useState<string[]>([])
 useEffect(() => { setFavorites(readFavorites()) }, [])
 function toggle(team: string) {
  setFavorites(prev => {
   const next = prev.includes(team) ? prev.filter(t => t !== team) : [...prev, team]
   try { window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next)) } catch {}
   return next
  })
 }
 return { favorites, isFavorite: (team: string) => favorites.includes(team), toggle }
}

export function FavoriteButton({ team }: { team: string }) {
 const { isFavorite, toggle } = useFavoriteTeams()
 const active = isFavorite(team)
 return (
  <button
   type="button"
   className={active ? 'favorite-btn active' : 'favorite-btn'}
   aria-pressed={active}
   aria-label={active ? `Remove ${team} from favorites` : `Add ${team} to favorites`}
   onClick={() => toggle(team)}
  >
   <Star fill={active ? 'currentColor' : 'none'} />
  </button>
 )
}

export function MyTeams() {
 const { favorites } = useFavoriteTeams()
 if (favorites.length === 0) {
  return (
   <div className="my-teams-empty">
    <Star style={{ width: 16, height: 16 }} />
    <span>Tap the star on any team to follow them here.</span>
   </div>
  )
 }
 return (
  <div className="my-teams-grid">
   {favorites.map(team => {
    const upcoming = fixturesForTeam(team).find(f => f.status !== 'LIVE') ?? fixturesForTeam(team)[0]
    return (
     <Link key={team} href={`/leagues/${teamSlug(team)}`} className="my-team-card">
      <TeamCrest name={team} size={28} />
      <div>
       <strong>{team}</strong>
       {upcoming && <small>{upcoming.status === 'LIVE' ? `LIVE · ${upcoming.score}` : `Next: ${upcoming.away === team ? upcoming.home : upcoming.away}`}</small>}
      </div>
     </Link>
    )
   })}
  </div>
 )
}

export function LeagueExplorer({ initial = 'epl' as LeagueKey }: { initial?: LeagueKey }) {
 const [active, setActive] = useState<LeagueKey>(initial)
 return (
  <>
   <LeagueTabs active={active} onChange={setActive} />
   <div className="league-panels">
    <div>
     <p className="panel-label">Standings</p>
     <StandingsTable league={active} />
    </div>
    <div>
     <p className="panel-label">Top Scorers</p>
     <TopScorersTable league={active} />
    </div>
   </div>
  </>
 )
}

export function TeamHeader({ team }: { team: string }) {
 const league = teamLeague(team)
 return (
  <div className="team-header">
   <TeamCrest name={team} size={56} />
   <div>
    <h1>{team}</h1>
    {league && <p className="team-header-league">{leagueTabs.find(l => l.key === league)?.label}</p>}
   </div>
   <FavoriteButton team={team} />
  </div>
 )
}

export function TeamFixtureList({ team }: { team: string }) {
 const rows = fixturesForTeam(team)
 if (rows.length === 0) return <p style={{ color: 'var(--muted)', fontSize: 13 }}>No fixtures on file for this team yet.</p>
 return (
  <div className="score-board">
   {rows.map(f => <ScoreRow key={f.id} fixture={f} />)}
  </div>
 )
}

export function TeamStandingRow({ team }: { team: string }) {
 const league = teamLeague(team)
 if (!league) return null
 const row = standingsByLeague[league].find(r => r.team === team)
 if (!row) return null
 return (
  <div className="standings-table">
   <div className="standings-row standings-head">
    <span>#</span><span>Team</span><span>P</span><span>W</span><span>D</span><span>L</span><span>GD</span><span>Pts</span>
   </div>
   <div className="standings-row">
    <span>{row.pos}</span>
    <span className="standings-team"><TeamCrest name={row.team} size={20} />{row.team}</span>
    <span>{row.played}</span><span>{row.won}</span><span>{row.drawn}</span><span>{row.lost}</span>
    <span>{row.gd > 0 ? `+${row.gd}` : row.gd}</span>
    <strong>{row.points}</strong>
   </div>
  </div>
 )
}

export function VideoCard({ video }: { video: VideoItem }) {
 return (
  <div className="video-card">
   <div className="yt-frame-wrap">
    <iframe src={video.embedUrl} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
   </div>
   <div className="video-meta">
    <p className="kicker">{video.category} · {video.duration}</p>
    <h3>{video.title}</h3>
   </div>
  </div>
 )
}

export function SearchBar({ placeholder = 'Search Sporty Info' }: { placeholder?: string }) {
 const [q, setQ] = useState('')
 return (
  <form className="search-bar" onSubmit={e => e.preventDefault()} role="search">
   <Search style={{ width: 16, height: 16 }} />
   <input value={q} onChange={e => setQ(e.target.value)} type="search" placeholder={placeholder} aria-label={placeholder} />
  </form>
 )
}

export function ShareButtons({ title }: { title: string }) {
 const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
 const items = [
  { label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`${title} ${shareUrl}`)}` },
  { label: 'Twitter / X', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}` },
  { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
 ]
 return (
  <div className="share-row">
   <span>Share:</span>
   {items.map(i => <a key={i.label} href={i.href} target="_blank" rel="noreferrer">{i.label}</a>)}
  </div>
 )
}

export function ContactForm() {
 const [sent, setSent] = useState(false)
 function submit(e: React.FormEvent) { e.preventDefault(); setSent(true) }
 if (sent) return <p className="newsletter-confirm"><ShieldCheck style={{ width: 14, height: 14 }} /> Thanks — we'll be in touch.</p>
 return (
  <form className="contact-form" onSubmit={submit}>
   <label>Name<input type="text" required /></label>
   <label>Email<input type="email" required /></label>
   <label>Message<textarea rows={5} required /></label>
   <button className="button button-primary" type="submit">Send message</button>
  </form>
 )
}

export function NewsletterCapture() {
 const [email, setEmail] = useState('')
 const [sent, setSent] = useState(false)
 function submit(e: React.FormEvent) {
  e.preventDefault()
  if (!email) return
  setSent(true)
 }
 return (
  <form className="newsletter-card" onSubmit={submit}>
   <div>
    <p className="eyebrow">STAY AHEAD OF KICKOFF</p>
    <h3>Get the Sporty Info newsletter</h3>
    <p>Top headlines and today's tips, once a day.</p>
   </div>
   {sent ? (
    <p className="newsletter-confirm"><ShieldCheck style={{ width: 14, height: 14 }} /> You're on the list.</p>
   ) : (
    <div className="newsletter-form">
     <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" aria-label="Email address" />
     <button className="button button-primary" type="submit">Subscribe</button>
    </div>
   )}
  </form>
 )
}

export function SiteFrame({ children }: { children: React.ReactNode }) {
 return <><Header />{children}<Footer /><BottomNav /></>
}

export function TrophyIcon() { return <Trophy className="trophy" /> }
export { Zap }

function useRealNews() {
 const [articles, setArticles] = useState<NewsArticle[] | null>(null)
 const [error, setError] = useState(false)
 useEffect(() => {
  let cancelled = false
  fetch('/api/news')
   .then(res => { if (!res.ok) throw new Error('bad response'); return res.json() })
   .then(data => { if (!cancelled) setArticles(data.articles ?? []) })
   .catch(() => { if (!cancelled) setError(true) })
  return () => { cancelled = true }
 }, [])
 return { articles, error }
}

export function RealNewsGrid({ limit = 9 }: { limit?: number }) {
 const { articles, error } = useRealNews()
 if (error) return <p className="demo-note"><ShieldCheck /> News feed unavailable — check your NEWS_API_KEY</p>
 if (articles === null) return <p className="demo-note">Loading news…</p>
 if (articles.length === 0) return <p className="demo-note">No articles found.</p>
 return (
  <div className="article-grid">
   {articles.slice(0, limit).map(a => (
    <a key={a.url} href={a.url} target="_blank" rel="noreferrer" className="article-card">
     <div className="article-art" style={{ backgroundImage: a.image ? `url(${a.image})` : undefined }}><span>NEWS</span></div>
     <div className="article-copy">
      <p className="kicker">{a.source}</p>
      <h3>{a.title}</h3>
      <p>{a.description}</p>
      <small>{new Date(a.publishedAt).toLocaleDateString()}</small>
     </div>
    </a>
   ))}
  </div>
 )
}