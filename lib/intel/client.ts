/**
 * VISIO INTEL INTEGRATION CLIENT
 *
 * Connects The Visio Index to Visio Intel's intelligence platform.
 * Consumes: entities, market signals, news sentiment, scores, tenders.
 *
 * Visio Intel Supabase: zgsgfghyreaptbpvlhdx (eu-central-1)
 * API: /api/v1/* with Bearer token auth
 */

const INTEL_BASE_URL = process.env.VISIO_INTEL_URL || 'https://visiointel.visioai.co';
const INTEL_API_KEY = process.env.VISIO_INTEL_API_KEY || '';

interface IntelResponse<T> {
  data: T;
  meta?: { total: number; page: number; per_page: number };
}

async function intelFetch<T>(endpoint: string, params?: Record<string, string>): Promise<IntelResponse<T> | null> {
  if (!INTEL_API_KEY) {
    console.warn('[Visio Intel] No API key configured — using static data');
    return null;
  }

  const url = new URL(`/api/v1${endpoint}`, INTEL_BASE_URL);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  try {
    const res = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${INTEL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 43200 }, // 12-hour cache
    });

    if (!res.ok) {
      console.error(`[Visio Intel] ${res.status}: ${res.statusText}`);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error('[Visio Intel] Fetch error:', err);
    return null;
  }
}

// ── ENTITY DATA ─────────────────────────────────────────────────────────

export interface IntelEntity {
  id: string;
  legal_name: string;
  trading_name?: string;
  entity_type: string;
  status: string;
  province?: string;
  city?: string;
  country: string;
  website_url?: string;
  employee_count_est?: number;
  revenue_band?: string;
  overall_score?: number;
  intent_score?: number;
  score_breakdown?: Record<string, number>;
  industry?: { name: string; code: string };
}

export async function searchIntelEntities(query: string, limit = 10): Promise<IntelEntity[]> {
  const res = await intelFetch<IntelEntity[]>('/entities', {
    q: query,
    per_page: String(limit),
  });
  return res?.data ?? [];
}

export async function getIntelEntity(id: string): Promise<IntelEntity | null> {
  const res = await intelFetch<IntelEntity>(`/entities/${id}`);
  return res?.data ?? null;
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
  entity_name?: string;
}

export async function getIntelSignals(limit = 20): Promise<IntelSignal[]> {
  const res = await intelFetch<IntelSignal[]>('/signals', {
    per_page: String(limit),
    sort: 'detected_at:desc',
  });
  return res?.data ?? [];
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
  entity_mentions: string[];
}

export async function getIntelNews(limit = 10): Promise<IntelNews[]> {
  const res = await intelFetch<IntelNews[]>('/news', {
    per_page: String(limit),
    sort: 'published_at:desc',
  });
  return res?.data ?? [];
}

// ── SCORES ──────────────────────────────────────────────────────────────

export interface IntelScore {
  entity_id: string;
  procurement_intent: number;
  growth_signals: number;
  technographic_fit: number;
  ability_to_pay: number;
  risk_quality: number;
  overall_score: number;
  scored_at: string;
}

export async function getIntelScore(entityId: string): Promise<IntelScore | null> {
  const res = await intelFetch<IntelScore>(`/scores/${entityId}`);
  return res?.data ?? null;
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
  is_ict: boolean;
}

export async function getIntelTenders(limit = 10): Promise<IntelTender[]> {
  const res = await intelFetch<IntelTender[]>('/tenders', {
    per_page: String(limit),
    status: 'active',
  });
  return res?.data ?? [];
}

// ── DUE DILIGENCE ───────────────────────────────────────────────────────

export interface IntelDueDiligence {
  entity_id: string;
  executive_summary: string;
  full_report: string;
  score_breakdown: Record<string, number>;
  status: string;
}

export async function getIntelDueDiligence(entityId: string): Promise<IntelDueDiligence | null> {
  const res = await intelFetch<IntelDueDiligence>(`/due-diligence/${entityId}`);
  return res?.data ?? null;
}

// ── HEALTH CHECK ────────────────────────────────────────────────────────

export async function checkIntelConnection(): Promise<boolean> {
  if (!INTEL_API_KEY) return false;
  try {
    const res = await fetch(`${INTEL_BASE_URL}/api/v1/entities?per_page=1`, {
      headers: { 'Authorization': `Bearer ${INTEL_API_KEY}` },
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ── FEED AGGREGATOR ─────────────────────────────────────────────────────
// Combines signals, news, and scores into a unified feed for The Visio Index

export interface IntelFeedItem {
  type: 'signal' | 'news' | 'tender';
  title: string;
  body: string;
  source: string;
  timestamp: string;
  sentiment?: number;
  entity_name?: string;
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
      source: 'Visio Intel Signal',
      timestamp: s.detected_at,
      entity_name: s.entity_name,
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
      source: 'SA Government Procurement',
      timestamp: t.submission_deadline,
      data: { province: t.tender_province, value: `R${(t.tender_value_zar / 1000000).toFixed(1)}M` },
    })),
  ];

  return feed.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, limit);
}
