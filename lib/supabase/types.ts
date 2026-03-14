export type EntityType = 'lab' | 'model' | 'tool' | 'creator' | 'agent' | 'startup';
export type ChartCategory = 'major' | 'genre' | 'regional' | 'industry' | 'power_list';
export type ChartFrequency = 'weekly' | 'monthly' | 'quarterly' | 'annual';
export type PositionStatus = 'up' | 'down' | 'new' | 're_entry' | 'steady' | 'hot_shot';

export interface Entity {
  id: string;
  type: EntityType;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  website: string | null;
  country: string | null;
  region: string | null;
  category: string | null;
  tags: string[];
  social_links: Record<string, string>;
  metadata: Record<string, unknown>;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Chart {
  id: string;
  name: string;
  slug: string;
  category: ChartCategory;
  entity_type: EntityType;
  frequency: ChartFrequency;
  description: string | null;
  max_entries: number;
  scoring_weights: Record<string, number>;
  is_featured: boolean;
  created_at: string;
}

export interface ChartEntry {
  id: string;
  chart_id: string;
  entity_id: string;
  week_start: string;
  rank: number;
  previous_rank: number | null;
  peak_rank: number;
  weeks_on_chart: number;
  composite_score: number;
  score_breakdown: Record<string, number>;
  status: PositionStatus;
  created_at: string;
  // Joined
  entity?: Entity;
}

export interface Score {
  id: string;
  entity_id: string;
  dimension: string;
  value: number;
  normalized_value: number;
  source: string;
  collected_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string;
  author_name: string;
  category: string;
  tags: string[];
  featured_entity_ids: string[];
  cover_image_url: string | null;
  status: 'draft' | 'published';
  published_at: string | null;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

// Database type map for Supabase client
export interface Database {
  public: {
    Tables: {
      entities: { Row: Entity; Insert: Omit<Entity, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Entity> };
      charts: { Row: Chart; Insert: Omit<Chart, 'id' | 'created_at'>; Update: Partial<Chart> };
      chart_entries: { Row: ChartEntry; Insert: Omit<ChartEntry, 'id' | 'created_at'>; Update: Partial<ChartEntry> };
      scores: { Row: Score; Insert: Omit<Score, 'id'>; Update: Partial<Score> };
      articles: { Row: Article; Insert: Omit<Article, 'id' | 'created_at'>; Update: Partial<Article> };
      newsletter_subscribers: { Row: NewsletterSubscriber; Insert: Omit<NewsletterSubscriber, 'id' | 'created_at'>; Update: Partial<NewsletterSubscriber> };
    };
  };
}
