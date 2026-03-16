/**
 * VISIO INTEL INTEGRATION CLIENT
 *
 * Direct Supabase connection to Visio Intel's database.
 * No API proxy needed — direct DB access with service role key.
 *
 * Visio Intel Supabase: zgsgfghyreaptbpvlhdx (eu-central-1)
 */

import { createClient } from '@supabase/supabase-js';

function getIntelClient() {
  const url = process.env.VISIO_INTEL_SUPABASE_URL;
  const key = process.env.VISIO_INTEL_SERVICE_KEY;

  if (!url || !key) return null;
  return createClient(url, key);
}

// ── ENTITY DATA ─────────────────────────────────────────────────────────

export interface IntelEntity {
  id: string;
  legal_name: string;
  trading_name: string | null;
  entity_type: string;
  status: string;
  province: string | null;
  city: string | null;
  overall_score: number | null;
  intent_score: number | null;
  spend_potential: number | null;
  industry: { name: string } | null;
}

export async function searchIntelEntities(query: string, limit = 10): Promise<IntelEntity[]> {
  const client = getIntelClient();
  if (!client) return [];

  const { data } = await client
    .from('legal_entities')
    .select('id, legal_name, trading_name, entity_type, status, province, city, overall_score, intent_score, spend_potential, industry:industries(name)')
    .or(`legal_name.ilike.%${query}%,trading_name.ilike.%${query}%`)
    .order('overall_score', { ascending: false })
    .limit(limit);

  return (data as unknown as IntelEntity[]) ?? [];
}

export async function getIntelEntityCount(): Promise<number> {
  const client = getIntelClient();
  if (!client) return 0;

  const { count } = await client
    .from('legal_entities')
    .select('id', { count: 'exact', head: true });

  return count ?? 0;
}

// ── MARKET SIGNALS ──────────────────────────────────────────────────────

export interface IntelSignal {
  id: string;
  entity_id: string;
  signal_type: string;
  signal_strength: string;
  title: string;
  description: string;
  detected_at: string;
}

export async function getIntelSignals(limit = 20): Promise<IntelSignal[]> {
  const client = getIntelClient();
  if (!client) return [];

  const { data } = await client
    .from('market_signals')
    .select('id, entity_id, signal_type, signal_strength, title, description, detected_at')
    .order('detected_at', { ascending: false })
    .limit(limit);

  return (data as IntelSignal[]) ?? [];
}

export async function getIntelSignalCount(): Promise<number> {
  const client = getIntelClient();
  if (!client) return 0;

  const { count } = await client
    .from('market_signals')
    .select('id', { count: 'exact', head: true });

  return count ?? 0;
}

// ── NEWS & SENTIMENT ────────────────────────────────────────────────────

export interface IntelNews {
  id: string;
  title: string;
  summary: string;
  source_name: string;
  published_at: string;
  category: string;
  sentiment_score: number;
  sentiment_label: string;
}

export async function getIntelNews(limit = 10): Promise<IntelNews[]> {
  const client = getIntelClient();
  if (!client) return [];

  const { data } = await client
    .from('news_articles')
    .select('id, title, summary, source_name, published_at, category, sentiment_score, sentiment_label')
    .order('published_at', { ascending: false })
    .limit(limit);

  return (data as IntelNews[]) ?? [];
}

export async function getIntelNewsCount(): Promise<number> {
  const client = getIntelClient();
  if (!client) return 0;

  const { count } = await client
    .from('news_articles')
    .select('id', { count: 'exact', head: true });

  return count ?? 0;
}

// ── TENDERS ─────────────────────────────────────────────────────────────

export interface IntelTender {
  id: string;
  tender_title: string;
  buyer_name: string;
  tender_status: string;
  tender_value_zar: number;
  submission_deadline: string;
  tender_province: string;
}

export async function getIntelTenders(limit = 10): Promise<IntelTender[]> {
  const client = getIntelClient();
  if (!client) return [];

  const { data } = await client
    .from('procurement_releases')
    .select('id, tender_title, buyer_name, tender_status, tender_value_zar, submission_deadline, tender_province')
    .eq('tender_status', 'active')
    .order('submission_deadline', { ascending: true })
    .limit(limit);

  return (data as IntelTender[]) ?? [];
}

// ── CONNECTION STATUS ───────────────────────────────────────────────────

export async function checkIntelConnection(): Promise<{
  connected: boolean;
  entities: number;
  signals: number;
  news: number;
}> {
  const client = getIntelClient();
  if (!client) {
    return { connected: false, entities: 0, signals: 0, news: 0 };
  }

  try {
    const [entities, signals, news] = await Promise.all([
      getIntelEntityCount(),
      getIntelSignalCount(),
      getIntelNewsCount(),
    ]);

    return { connected: true, entities, signals, news };
  } catch {
    return { connected: false, entities: 0, signals: 0, news: 0 };
  }
}

// ── FEED AGGREGATOR ─────────────────────────────────────────────────────

export interface IntelFeedItem {
  type: 'signal' | 'news' | 'tender';
  title: string;
  body: string;
  source: string;
  timestamp: string;
  sentiment?: number;
  data?: Record<string, string>;
}

export async function getIntelFeed(limit = 20): Promise<IntelFeedItem[]> {
  const [signals, news, tenders] = await Promise.all([
    getIntelSignals(limit),
    getIntelNews(limit),
    getIntelTenders(5),
  ]);

  const feed: IntelFeedItem[] = [
    ...signals.map((s) => ({
      type: 'signal' as const,
      title: s.title,
      body: s.description,
      source: `Visio Intel — ${s.signal_type}`,
      timestamp: s.detected_at,
    })),
    ...news.map((n) => ({
      type: 'news' as const,
      title: n.title,
      body: n.summary,
      source: n.source_name,
      timestamp: n.published_at,
      sentiment: n.sentiment_score,
    })),
    ...tenders.map((t) => ({
      type: 'tender' as const,
      title: t.tender_title,
      body: `${t.buyer_name} — R${(t.tender_value_zar / 1000000).toFixed(1)}M`,
      source: 'SA Government',
      timestamp: t.submission_deadline,
      data: { province: t.tender_province, value: `R${(t.tender_value_zar / 1000000).toFixed(1)}M` },
    })),
  ];

  return feed
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
}
