# Sporty Info — expansion notes

What's new in this drop, on top of your existing Home/News/Matches:

## Frontend (demo data, same design system)
- **Pages**: `/tips`, `/leagues`, `/video`, `/about`, `/contact`, `/privacy`
- **New components** (all in `components/sporty-site.tsx`):
  `LiveTicker` (auto-refreshes every 60s), `TipCard` / `TipsPreview`,
  `OddsComparisonTable`, `LeagueExplorer` (`StandingsTable` + `TopScorersTable`),
  `VideoCard`, `SearchBar`, `ShareButtons`, `NewsletterCapture`, `ContactForm`,
  `DarkModeToggle`.
- Header, primary tabs, bottom nav and footer all updated with the new sections.
- All new CSS is appended to the bottom of `app/globals.css` using your existing
  color variables (`--accent`, `--panel`, `--line`, etc.) — no new design tokens.
- `DarkModeToggle` adds a `:root[data-theme='light']` override block; nothing else
  changes, so the dark theme stays the default everywhere it isn't toggled.
- Demo data for tips/leagues/video lives at the bottom of `lib/sporty-data.ts`,
  same pattern as your existing `articles`/`fixtures`.

## Backend (schema + route stubs — not wired to a live project yet)
- `supabase/schema.sql` — full schema: `articles`, `matches`, `tips`, `clicks`,
  `users`, `leagues`, with RLS policies (public read on published content,
  writes only via the service-role key server-side).
- `lib/supabase.ts` — two clients: `supabasePublic` (anon, RLS-respecting) and
  `supabaseAdmin` (service role, server-only — never import it in a Client Component).
- `app/api/*` route handlers matching your spec:
  - `GET /api/articles`, `GET /api/articles/[slug]` (increments view_count)
  - `GET /api/matches`, `GET /api/scores/live`
  - `GET /api/tips`
  - `POST /api/clicks`
  - `POST /api/sync/fixtures` (pulls from API-Football, cron-friendly, secret-gated)
  - `POST /api/admin/articles`, `POST` + `PATCH /api/admin/tips` (secret-gated)

### To go live
1. `npm install @supabase/supabase-js`
2. Create a project at supabase.com, run `supabase/schema.sql` in the SQL editor.
3. Copy `.env.example` to `.env.local` and fill in the values (Supabase keys,
   API-Football key, and two secrets you invent yourself for `SYNC_SECRET` /
   `ADMIN_API_SECRET`).
4. Swap the frontend's demo-data imports (`lib/sporty-data.ts`) for `fetch()` calls
   to the new `/api/*` routes as you're ready — the current pages still run entirely
   on demo data, so nothing breaks in the meantime.

### Not built (flagged, not forgotten)
- Bookmark/favorite teams — you marked this optional in your spec.
- Team pages under `/leagues/[team]` — standings/top-scorers are in place; per-team
  pages are a small follow-on once you tell me what a team page should show.
- Odds comparison currently derives demo prices from the base tip's odds; swap for
  a real odds feed when you have one.
