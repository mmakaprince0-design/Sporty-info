export type Article = { slug: string; category: string; title: string; excerpt: string; author: string; date: string; readTime: string; tag: string; body: string[]; coverImage: string }
export type Fixture = { id: string; competition: string; home: string; away: string; kickoff: string; status: string; score?: string; minute?: string; preview: string }
export type SportKey = 'football' | 'cricket' | 'rugby' | 'tennis' | 'golf'
export type HeroSlide = { badge: string; title: string; titleAccent: string; description: string; primaryCta: { label: string; href: string }; secondaryCta: { label: string; href: string }; gradient: string }

export const links = { bet9ja: 'https://bet9ja.com', sportybet: 'https://sportybet.com', oneXBet: 'https://1xbet.com', whatsapp: 'https://chat.whatsapp.com/SPORTY-INFO-PLACEHOLDER', twitter: 'https://x.com/sportyinfo', facebook: 'https://facebook.com/sportyinfo' }

// Rotating hero slides. Each slide gets its own radial gradient (no external images to
// fetch/break) plus its own copy and CTAs so the carousel actually changes content, not
// just a background.
export const heroSlides: HeroSlide[] = [
 {
  badge: 'Live Now', title: 'The Home', titleAccent: 'of Champions',
  description: 'Watch live sports. Get the latest scores. Never miss a moment.',
  primaryCta: { label: 'Watch Live', href: '/matches' }, secondaryCta: { label: 'View TV Guide', href: '/matches' },
  gradient: 'radial-gradient(circle at 78% 30%,#3a1f5c 0%,#0d0916 62%)',
 },
 {
  badge: 'Matchday', title: 'Every Fixture.', titleAccent: 'One Place.',
  description: 'Live scores, previews and highlights across football, cricket, rugby, tennis and golf.',
  primaryCta: { label: 'See Fixtures', href: '/matches' }, secondaryCta: { label: 'Live Scores', href: '/matches' },
  gradient: 'radial-gradient(circle at 22% 26%,#4c1d78 0%,#0d0916 62%)',
 },
 {
  badge: 'The Newsroom', title: 'Football,', titleAccent: 'with context.',
  description: 'Original reporting and sharp analysis from the Sporty Info newsroom.',
  primaryCta: { label: 'Read the News', href: '/news' }, secondaryCta: { label: 'Watch Highlights', href: '/matches' },
  gradient: 'radial-gradient(circle at 72% 72%,#2e1548 0%,#0d0916 62%)',
 },
]

// Real club colors + initials, used to render crest badges without hotlinking external logo
// image files (which break often and carry trademark restrictions on reproduction).
export const teamBadges: Record<string, { initials: string; bg: string; fg: string }> = {
 'Man City': { initials: 'MCI', bg: '#6CABDD', fg: '#1C2C5B' },
 'Liverpool': { initials: 'LIV', bg: '#C8102E', fg: '#F6EB61' },
 'Real Madrid': { initials: 'RMA', bg: '#FEBE10', fg: '#1B1B1B' },
 'Barcelona': { initials: 'BAR', bg: '#A50044', fg: '#004D98' },
 'Atlético Madrid': { initials: 'ATM', bg: '#CB3524', fg: '#272E61' },
 'Arsenal': { initials: 'ARS', bg: '#EF0107', fg: '#FFFFFF' },
 'Bayern': { initials: 'FCB', bg: '#DC052D', fg: '#0066B2' },
 'Dortmund': { initials: 'BVB', bg: '#FDE100', fg: '#1C1C1C' },
 'PSG': { initials: 'PSG', bg: '#004170', fg: '#DA291C' },
 'AC Milan': { initials: 'ACM', bg: '#FB090B', fg: '#1B1B1B' },
 'Inter Milan': { initials: 'INT', bg: '#0068A8', fg: '#1B1B1B' },
 'Marseille': { initials: 'OM', bg: '#2FAEE0', fg: '#FFFFFF' },
}

const articleSeeds = [
 ['Champions League', 'The new European nights: five storylines shaping this season', 'From ambitious rebuilds to old rivals meeting again, the Champions League is ready for another chapter.', 'Maya Okafor'],
 ['Premier League', 'Why the title race could go down to the final weekend', 'The early table is tight, but the details behind the numbers point to a fascinating spring finish.', 'Daniel Reed'],
 ['La Liga', 'The midfield evolution changing football in Spain', 'Technical control is back at the centre of the conversation as Spain\'s best sides redraw their blueprints.', 'Ibrahim Cole'],
 ['Tactical board', 'The high press is back — and smarter than ever', 'Modern pressing is less about running and more about knowing exactly when to trap an opponent.', 'Maya Okafor'],
 ['World football', 'Three young captains redefining leadership', 'A new generation is leading with clarity, courage and a willingness to take responsibility early.', 'Nia Williams'],
 ['Serie A', 'What makes this season\'s defensive systems so difficult to break', 'Compact blocks and brave full-backs are producing some of Europe\'s most compelling matches.', 'Luca Moretti'],
 ['Bundesliga', 'The away-day advantage is disappearing across Germany', 'Travel, pressing and a new approach to home support are changing the balance of fixtures.', 'Daniel Reed'],
 ['Women\'s football', 'The next era of the global game is already here', 'Record crowds and a deeper talent pool are turning every major tournament into an event.', 'Nia Williams'],
 ['Transfer watch', 'The market signals worth watching before the window opens', 'Clubs are planning earlier, scouting smarter and looking beyond the obvious headline names.', 'Ibrahim Cole'],
 ['Fan culture', 'Why matchday rituals still matter in a digital-first game', 'The chants, colours and journeys around football remain as powerful as the ninety minutes.', 'Maya Okafor'],
 ['International', 'A new tactical identity is emerging across national teams', 'Coaches are blending club football\'s detail with the freedom that makes international nights unique.', 'Luca Moretti'],
 ['Premier League', 'The numbers behind football\'s most valuable set pieces', 'Dead-ball situations are no longer an afterthought; they are carefully rehearsed routes to points.', 'Daniel Reed'],
 ['Champions League', 'The quarter-final contenders who can change a game in five minutes', 'Momentum is a weapon, and these teams know how to turn a small opening into a decisive spell.', 'Maya Okafor'],
 ['Opinion', 'Football is better when the risk is visible', 'The best matches reward teams willing to leave their comfort zone and play with intent.', 'Nia Williams'],
 ['Matchday', 'Your weekend guide: the fixtures we cannot wait to watch', 'Big rivalries, tactical contrasts and players in form make this a weekend for the calendar.', 'Sporty Info Desk'],
]
export const articles: Article[] = articleSeeds.map(([category, title, excerpt, author], index) => ({ slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), category, title, excerpt, author, date: `Aug ${18 - Math.min(index, 12)}, 2026`, readTime: `${5 + index % 4} min read`, tag: ['FEATURE', 'ANALYSIS', 'PREVIEW'][index % 3], coverImage: `https://picsum.photos/seed/sportyinfo${index}/800/500`, body: [excerpt, 'The shape of the game is always moving. For supporters, that means more to understand before kickoff and more to discuss when the final whistle goes. We follow the details that turn a fixture into a story: the spaces, the choices and the moments that decide momentum.', 'Sporty Info brings a global view to the world\'s game, with clear reporting, thoughtful analysis and match previews built for fans who want to know what comes next.'] }))
export const fixtures: Fixture[] = [
 { id: 'ucl-01', competition: 'UEFA Champions League', home: 'Man City', away: 'Real Madrid', kickoff: '20:00', status: 'UPCOMING', preview: 'Two possession-heavy giants meet with a place in the next round in sight.' },
 { id: 'epl-01', competition: 'Premier League', home: 'Arsenal', away: 'Liverpool', kickoff: '17:30', status: 'UPCOMING', preview: 'A high-tempo meeting between two of the league\'s most ambitious attacks.' },
 { id: 'lal-01', competition: 'La Liga', home: 'Barcelona', away: 'Atlético Madrid', kickoff: '21:00', status: 'LIVE', score: '1 — 1', minute: "58'", preview: 'One point separates these rivals in a game built on contrasting control.' },
 { id: 'bun-01', competition: 'Bundesliga', home: 'Bayern', away: 'Dortmund', kickoff: '18:30', status: 'UPCOMING', preview: 'The Klassiker returns with both sides chasing a statement performance.' },
]

// Sport-switcher data for the Live Scores module — mirrors the tabbed scoreboard pattern
// (Football / Cricket / Rugby / Tennis / Golf) with a clear "demo feed" label per the
// existing project convention until a live odds/scores API key is connected.
export const sportsTabs: { key: SportKey; label: string; icon: string }[] = [
 { key: 'football', label: 'Football', icon: 'football' },
 { key: 'cricket', label: 'Cricket', icon: 'cricket' },
 { key: 'rugby', label: 'Rugby', icon: 'rugby' },
 { key: 'tennis', label: 'Tennis', icon: 'tennis' },
 { key: 'golf', label: 'Golf', icon: 'golf' },
]

export const scoresBySport: Record<SportKey, Fixture[]> = {
 football: [
  { id: 'sb-epl', competition: 'Premier League', home: 'Man City', away: 'Liverpool', kickoff: '', status: 'LIVE', score: '2 — 1', minute: "72'", preview: '' },
  { id: 'sb-lal', competition: 'La Liga', home: 'Real Madrid', away: 'Barcelona', kickoff: '', status: 'LIVE', score: '1 — 1', minute: "58'", preview: '' },
  { id: 'sb-ucl', competition: 'UEFA Champions League', home: 'Bayern', away: 'PSG', kickoff: '20:00', status: 'UPCOMING', preview: '' },
 ],
 cricket: [
  { id: 'sb-cr1', competition: 'ODI Series', home: 'South Africa', away: 'India', kickoff: '', status: 'LIVE', score: '214/4', minute: '38 ov', preview: '' },
  { id: 'sb-cr2', competition: 'T20 Series', home: 'Australia', away: 'England', kickoff: '14:00', status: 'UPCOMING', preview: '' },
 ],
 rugby: [
  { id: 'sb-rg1', competition: 'United Rugby Championship', home: 'Stormers', away: 'Bulls', kickoff: '', status: 'LIVE', score: '17 — 12', minute: "64'", preview: '' },
  { id: 'sb-rg2', competition: 'Premiership Rugby', home: 'Saracens', away: 'Leicester', kickoff: '15:00', status: 'UPCOMING', preview: '' },
 ],
 tennis: [
  { id: 'sb-tn1', competition: 'WTA Toronto Open', home: 'Sabalenka', away: 'Gauff', kickoff: '', status: 'LIVE', score: '6-4, 3-2', minute: 'Set 2', preview: '' },
  { id: 'sb-tn2', competition: 'ATP Masters', home: 'Alcaraz', away: 'Sinner', kickoff: '17:00', status: 'UPCOMING', preview: '' },
 ],
 golf: [
  { id: 'sb-gf1', competition: 'PGA Tour', home: 'Round 3', away: 'Leaderboard', kickoff: '', status: 'LIVE', score: '-12', minute: 'Hole 14', preview: '' },
 ],
}

export const competitions = ['All football', 'Premier League', 'Champions League', 'La Liga', 'Serie A', 'Bundesliga']
export const findArticle = (slug: string) => articles.find(article => article.slug === slug)
export const getLiveFixtures = async () => ({ live: Boolean(process.env.API_FOOTBALL_KEY), fixtures })

// YouTube source channels for the video module. Each entry is a real, verifiable channel;
// the "uploads" playlist (UU + channel id without the UC prefix) always has current content,
// unlike a live_stream embed which goes blank whenever nothing is live.
export type YoutubeChannel = { key: string; channelId: string; channelName: string; channelUrl: string }
export const youtubeChannels: YoutubeChannel[] = [
 { key: 'epl', channelId: 'UCG5qGWdu8nIRZqJ_GgDwQ-w', channelName: 'Premier League', channelUrl: 'https://www.youtube.com/@premierleague' },
 { key: 'laliga', channelId: 'UCTv-XvfzLX3i4IGWAm4sbmA', channelName: 'LALIGA', channelUrl: 'https://www.youtube.com/@LaLiga' },
 { key: 'supersport', channelId: 'UCZH6G3Z5XINU6r92QN1l5Lw', channelName: 'SuperSport (DStv/GOtv)', channelUrl: 'https://www.youtube.com/@supersport' },
 { key: 'bundesliga', channelId: 'UC6UL29enLNe4mqwTfAyeNuw', channelName: 'Bundesliga', channelUrl: 'https://www.youtube.com/@Bundesliga' },
]
function uploadsPlaylistId(channelId: string) { return `UU${channelId.slice(2)}` }
export function latestEmbedUrl(channelId: string) { return `https://www.youtube.com/embed/videoseries?list=${uploadsPlaylistId(channelId)}` }
export const youtube = {
 channelId: youtubeChannels[0].channelId,
 channelName: youtubeChannels[0].channelName,
 get uploadsPlaylistId() { return uploadsPlaylistId(this.channelId) },
 get latestEmbedUrl() { return latestEmbedUrl(this.channelId) },
 channelUrl: youtubeChannels[0].channelUrl,
}

// Custom badge marks (brand color + a short monogram), not the operators' actual
// trademarked logos — those are copyrighted marks we can't reproduce. This keeps each
// badge visually distinct and on-brand for its operator without lifting real artwork.
export const affiliateLinks = [
 { label: 'Bet9ja', href: links.bet9ja, bg: '#00A651', fg: '#FFFFFF', mark: 'B9' },
 { label: 'SportyBet', href: links.sportybet, bg: '#E4002B', fg: '#FFFFFF', mark: 'SB' },
 { label: '1xBet', href: links.oneXBet, bg: '#1E3A8A', fg: '#FFFFFF', mark: '1X' },
]

export const featuredSports = [
 { key: 'football', label: 'Football', sub: 'Live & Highlights' },
 { key: 'cricket', label: 'Cricket', sub: 'Live & Highlights' },
 { key: 'rugby', label: 'Rugby', sub: 'Live & Highlights' },
 { key: 'tennis', label: 'Tennis', sub: 'Live & Highlights' },
 { key: 'more', label: 'More Sports', sub: 'Browse All' },
]
// ===== Tips (predictions) =====
export type Tip = { id: string; competition: string; home: string; away: string; kickoff: string; market: string; prediction: string; odds: string; confidence: 'Low' | 'Medium' | 'High'; result?: 'won' | 'lost' | 'pending'; affiliate: 'bet9ja' | 'sportybet' | 'oneXBet' }
export const tips: Tip[] = [
 { id: 'tip-01', competition: 'Premier League', home: 'Man City', away: 'Liverpool', kickoff: 'Today, 17:30', market: 'Match Result', prediction: 'Man City to win', odds: '1.85', confidence: 'High', result: 'pending', affiliate: 'sportybet' },
 { id: 'tip-02', competition: 'La Liga', home: 'Real Madrid', away: 'Barcelona', kickoff: 'Today, 21:00', market: 'Both Teams to Score', prediction: 'Yes', odds: '1.62', confidence: 'High', result: 'pending', affiliate: 'bet9ja' },
 { id: 'tip-03', competition: 'Bundesliga', home: 'Bayern', away: 'Dortmund', kickoff: 'Tomorrow, 18:30', market: 'Over/Under 2.5', prediction: 'Over 2.5 goals', odds: '1.71', confidence: 'Medium', result: 'pending', affiliate: 'oneXBet' },
 { id: 'tip-04', competition: 'UEFA Champions League', home: 'Man City', away: 'Real Madrid', kickoff: 'Fri, 20:00', market: 'Double Chance', prediction: 'Man City or Draw', odds: '1.40', confidence: 'Medium', result: 'pending', affiliate: 'sportybet' },
 { id: 'tip-05', competition: 'Premier League', home: 'Arsenal', away: 'Liverpool', kickoff: 'Sat, 17:30', market: 'Match Result', prediction: 'Draw', odds: '3.40', confidence: 'Low', result: 'pending', affiliate: 'bet9ja' },
 { id: 'tip-06', competition: 'Serie A', home: 'AC Milan', away: 'Inter Milan', kickoff: 'Yesterday', market: 'Match Result', prediction: 'Inter Milan to win', odds: '2.10', confidence: 'Medium', result: 'won', affiliate: 'oneXBet' },
]

// ===== Leagues / standings / top scorers =====
export type StandingRow = { pos: number; team: string; played: number; won: number; drawn: number; lost: number; gd: number; points: number }
export type ScorerRow = { rank: number; player: string; team: string; goals: number }
export type LeagueKey = 'epl' | 'laliga' | 'bundesliga' | 'seriea'
export const leagueTabs: { key: LeagueKey; label: string }[] = [
 { key: 'epl', label: 'Premier League' },
 { key: 'laliga', label: 'La Liga' },
 { key: 'bundesliga', label: 'Bundesliga' },
 { key: 'seriea', label: 'Serie A' },
]
export const standingsByLeague: Record<LeagueKey, StandingRow[]> = {
 epl: [
  { pos: 1, team: 'Man City', played: 5, won: 4, drawn: 1, lost: 0, gd: 9, points: 13 },
  { pos: 2, team: 'Liverpool', played: 5, won: 4, drawn: 0, lost: 1, gd: 7, points: 12 },
  { pos: 3, team: 'Arsenal', played: 5, won: 3, drawn: 2, lost: 0, gd: 6, points: 11 },
  { pos: 4, team: 'Man City', played: 5, won: 3, drawn: 1, lost: 1, gd: 4, points: 10 },
 ],
 laliga: [
  { pos: 1, team: 'Real Madrid', played: 5, won: 5, drawn: 0, lost: 0, gd: 11, points: 15 },
  { pos: 2, team: 'Barcelona', played: 5, won: 4, drawn: 0, lost: 1, gd: 8, points: 12 },
  { pos: 3, team: 'Atlético Madrid', played: 5, won: 3, drawn: 1, lost: 1, gd: 5, points: 10 },
 ],
 bundesliga: [
  { pos: 1, team: 'Bayern', played: 5, won: 5, drawn: 0, lost: 0, gd: 14, points: 15 },
  { pos: 2, team: 'Dortmund', played: 5, won: 3, drawn: 1, lost: 1, gd: 6, points: 10 },
 ],
 seriea: [
  { pos: 1, team: 'Inter Milan', played: 5, won: 4, drawn: 1, lost: 0, gd: 8, points: 13 },
  { pos: 2, team: 'AC Milan', played: 5, won: 3, drawn: 2, lost: 0, gd: 5, points: 11 },
 ],
}
export const topScorersByLeague: Record<LeagueKey, ScorerRow[]> = {
 epl: [
  { rank: 1, player: 'E. Haaland', team: 'Man City', goals: 9 },
  { rank: 2, player: 'M. Salah', team: 'Liverpool', goals: 7 },
  { rank: 3, player: 'B. Saka', team: 'Arsenal', goals: 5 },
 ],
 laliga: [
  { rank: 1, player: 'K. Mbappé', team: 'Real Madrid', goals: 10 },
  { rank: 2, player: 'R. Lewandowski', team: 'Barcelona', goals: 8 },
 ],
 bundesliga: [
  { rank: 1, player: 'H. Kane', team: 'Bayern', goals: 11 },
 ],
 seriea: [
  { rank: 1, player: 'L. Martínez', team: 'Inter Milan', goals: 6 },
 ],
}

// ===== Video / highlights =====
export type VideoItem = { id: string; title: string; category: string; duration: string; embedUrl: string }
export const videos: VideoItem[] = [
 { id: 'v1', title: 'Premier League: latest highlights & goals', category: 'Highlights', duration: 'Playlist', embedUrl: latestEmbedUrl(youtubeChannels[0].channelId) },
 { id: 'v2', title: 'LALIGA: latest highlights & goals', category: 'Highlights', duration: 'Playlist', embedUrl: latestEmbedUrl(youtubeChannels[1].channelId) },
 { id: 'v3', title: 'SuperSport (DStv/GOtv): latest sports coverage', category: 'Multi-sport', duration: 'Playlist', embedUrl: latestEmbedUrl(youtubeChannels[2].channelId) },
 { id: 'v4', title: 'Bundesliga: latest highlights & goals', category: 'Highlights', duration: 'Playlist', embedUrl: latestEmbedUrl(youtubeChannels[3].channelId) },
]
// ===== Team helpers (used by sporty-site.tsx) =====
export const teamSlug = (team: string) =>
 team.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export const teamLeague = (team: string): string => {
 for (const [key, rows] of Object.entries(standingsByLeague)) {
  if (rows.some(row => row.team === team)) {
   const label = leagueTabs.find(l => l.key === key)?.label
   if (label) return label
  }
 }
 // fallback: check fixtures/scores for a competition this team appears in
 const allFixtures = [...fixtures, ...Object.values(scoresBySport).flat()]
 const match = allFixtures.find(f => f.home === team || f.away === team)
 return match?.competition ?? 'Football'
}

export const fixturesForTeam = (team: string): Fixture[] => {
 const allFixtures = [...fixtures, ...Object.values(scoresBySport).flat()]
 return allFixtures.filter(f => f.home === team || f.away === team)
}