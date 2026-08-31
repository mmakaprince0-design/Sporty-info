-- Sporty Info — Supabase schema
-- Run this in the Supabase SQL editor (or via `supabase db push`) on a fresh project.
-- Enable pgcrypto for gen_random_uuid() if not already on.
create extension if not exists pgcrypto;

-- ===== leagues =====
create table if not exists leagues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  country text,
  api_football_id integer, -- external id from API-Football, used by the sync job
  logo_url text,
  created_at timestamptz not null default now()
);

-- ===== articles =====
create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body text not null,
  category text,
  tag text,
  author text,
  cover_image_url text,
  seo_title text,
  seo_description text,
  view_count integer not null default 0,
  published boolean not null default true,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists articles_published_idx on articles (published, published_at desc);
create index if not exists articles_category_idx on articles (category);

-- ===== matches (fixtures / scores) =====
create table if not exists matches (
  id uuid primary key default gen_random_uuid(),
  api_football_fixture_id integer unique, -- external id, upserted by /api/sync/fixtures
  league_id uuid references leagues(id),
  sport text not null default 'football', -- football | cricket | rugby | tennis | golf
  competition text not null,
  home_team text not null,
  away_team text not null,
  home_score integer,
  away_score integer,
  status text not null default 'SCHEDULED', -- SCHEDULED | LIVE | FINISHED | POSTPONED
  minute text,
  kickoff_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists matches_kickoff_idx on matches (kickoff_at);
create index if not exists matches_status_idx on matches (status);
create index if not exists matches_league_idx on matches (league_id);

-- ===== tips (predictions) =====
create table if not exists tips (
  id uuid primary key default gen_random_uuid(),
  match_id uuid references matches(id),
  market text not null, -- e.g. "Match Result", "Over/Under 2.5"
  prediction text not null,
  odds numeric(5,2) not null,
  confidence text not null default 'Medium', -- Low | Medium | High
  affiliate_brand text not null, -- bet9ja | sportybet | oneXBet
  affiliate_url text not null,
  result text not null default 'pending', -- pending | won | lost
  published boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists tips_result_idx on tips (result);
create index if not exists tips_match_idx on tips (match_id);

-- ===== clicks (affiliate click tracking) =====
create table if not exists clicks (
  id uuid primary key default gen_random_uuid(),
  tip_id uuid references tips(id),
  brand text not null,
  destination_url text not null,
  ip_address text,
  user_agent text,
  referrer text,
  created_at timestamptz not null default now()
);
create index if not exists clicks_brand_idx on clicks (brand);
create index if not exists clicks_created_idx on clicks (created_at desc);

-- ===== users (newsletter / WhatsApp opt-ins, premium status) =====
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  newsletter_opt_in boolean not null default true,
  whatsapp_opt_in boolean not null default false,
  is_premium boolean not null default false,
  created_at timestamptz not null default now()
);

-- ===== updated_at trigger =====
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists articles_set_updated_at on articles;
create trigger articles_set_updated_at before update on articles
  for each row execute function set_updated_at();

drop trigger if exists matches_set_updated_at on matches;
create trigger matches_set_updated_at before update on matches
  for each row execute function set_updated_at();

-- ===== Row Level Security =====
-- Public (anon) can read published content; only the service role (used by /api/admin/*
-- and /api/sync/*, never exposed to the browser) can write.
alter table articles enable row level security;
alter table matches enable row level security;
alter table tips enable row level security;
alter table leagues enable row level security;
alter table clicks enable row level security;
alter table users enable row level security;

create policy "public read published articles" on articles for select using (published = true);
create policy "public read matches" on matches for select using (true);
create policy "public read published tips" on tips for select using (published = true);
create policy "public read leagues" on leagues for select using (true);
-- No public select/insert policy on clicks or users: all access goes through API routes
-- using the service-role key server-side, which bypasses RLS by design.
