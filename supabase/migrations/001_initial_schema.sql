-- The Visio Index — Initial Schema
-- AI Billboard Charts Platform

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ========== ENTITIES ==========
create table entities (
  id uuid primary key default uuid_generate_v4(),
  type text not null check (type in ('lab', 'model', 'tool', 'creator', 'agent', 'startup')),
  name text not null,
  slug text unique not null,
  description text,
  logo_url text,
  website text,
  country text,
  region text,
  category text,
  tags text[] default '{}',
  social_links jsonb default '{}',
  metadata jsonb default '{}',
  is_verified boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_entities_type on entities(type);
create index idx_entities_slug on entities(slug);
create index idx_entities_region on entities(region);

-- ========== CHARTS ==========
create table charts (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  category text not null check (category in ('major', 'genre', 'regional', 'industry', 'power_list')),
  entity_type text not null,
  frequency text not null check (frequency in ('weekly', 'monthly', 'quarterly', 'annual')),
  description text,
  max_entries int default 25,
  scoring_weights jsonb default '{}',
  is_featured boolean default false,
  created_at timestamptz default now()
);

create index idx_charts_slug on charts(slug);
create index idx_charts_category on charts(category);

-- ========== CHART ENTRIES ==========
create table chart_entries (
  id uuid primary key default uuid_generate_v4(),
  chart_id uuid not null references charts(id) on delete cascade,
  entity_id uuid not null references entities(id) on delete cascade,
  week_start date not null,
  rank int not null,
  previous_rank int,
  peak_rank int not null,
  weeks_on_chart int default 1,
  composite_score numeric(6,2) not null,
  score_breakdown jsonb default '{}',
  status text not null check (status in ('up', 'down', 'new', 're_entry', 'steady', 'hot_shot')),
  created_at timestamptz default now(),
  unique(chart_id, entity_id, week_start)
);

create index idx_chart_entries_chart_week on chart_entries(chart_id, week_start);
create index idx_chart_entries_rank on chart_entries(rank);

-- ========== RAW SCORES ==========
create table scores (
  id uuid primary key default uuid_generate_v4(),
  entity_id uuid not null references entities(id) on delete cascade,
  dimension text not null,
  value numeric not null,
  normalized_value numeric not null default 0,
  source text not null,
  collected_at timestamptz default now()
);

create index idx_scores_entity on scores(entity_id);
create index idx_scores_dimension on scores(dimension);

-- ========== ARTICLES ==========
create table articles (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  excerpt text,
  body text not null,
  author_name text not null default 'Visio Research Labs',
  category text not null default 'analysis',
  tags text[] default '{}',
  featured_entity_ids uuid[] default '{}',
  cover_image_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz default now()
);

create index idx_articles_slug on articles(slug);
create index idx_articles_status on articles(status);

-- ========== NEWSLETTER ==========
create table newsletter_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- ========== RLS POLICIES ==========
alter table entities enable row level security;
alter table charts enable row level security;
alter table chart_entries enable row level security;
alter table scores enable row level security;
alter table articles enable row level security;
alter table newsletter_subscribers enable row level security;

-- Public read access
create policy "entities_public_read" on entities for select using (true);
create policy "charts_public_read" on charts for select using (true);
create policy "chart_entries_public_read" on chart_entries for select using (true);
create policy "articles_public_read" on articles for select using (status = 'published');

-- Newsletter insert for anonymous
create policy "newsletter_insert" on newsletter_subscribers for insert with check (true);

-- Updated_at trigger
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger entities_updated_at
  before update on entities
  for each row execute function update_updated_at();
