import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const url = process.env.VISIO_INTEL_SUPABASE_URL;
  const key = process.env.VISIO_INTEL_SERVICE_KEY;
  if (!url || !key) return NextResponse.json({ error: 'Intel not connected' }, { status: 503 });

  const client = createClient(url, key);

  // Top AI-ready companies
  const { data: companies } = await client
    .from('legal_entities')
    .select('id, legal_name, province, overall_score, intent_score, spend_potential, industry:industries(name)')
    .gt('overall_score', 60)
    .order('overall_score', { ascending: false })
    .limit(30);

  // Tech stacks
  const entityIds = (companies ?? []).map((c: { id: string }) => c.id);
  const { data: webPresences } = await client
    .from('web_presences')
    .select('entity_id, tech_stack, digital_maturity, website_url')
    .in('entity_id', entityIds);

  // Recent signals about these companies
  const { data: signals } = await client
    .from('market_signals')
    .select('title, signal_type, signal_strength, detected_at')
    .order('detected_at', { ascending: false })
    .limit(20);

  // Active tenders (procurement opportunities)
  const { data: tenders } = await client
    .from('procurement_releases')
    .select('tender_title, buyer_name, tender_value_zar, tender_province, tender_status')
    .eq('tender_status', 'active')
    .order('tender_value_zar', { ascending: false })
    .limit(15);

  // Industry breakdown
  const { data: industries } = await client
    .from('industries')
    .select('name, gdp_contribution_pct, priority_rank')
    .order('priority_rank', { ascending: true })
    .limit(15);

  // Merge tech stacks into companies
  const wpMap = new Map<string, { tech_stack: string[]; digital_maturity: string; website_url: string }>();
  for (const wp of (webPresences ?? []) as { entity_id: string; tech_stack: string[]; digital_maturity: string; website_url: string }[]) {
    if (!wpMap.has(wp.entity_id)) {
      wpMap.set(wp.entity_id, wp);
    }
  }

  const enriched = (companies ?? []).map((c: Record<string, unknown>) => {
    const wp = wpMap.get(c.id as string);
    return {
      ...c,
      tech_stack: wp?.tech_stack ?? [],
      digital_maturity: wp?.digital_maturity ?? 'unknown',
      website_url: wp?.website_url ?? null,
      ai_ready: (wp?.tech_stack ?? []).some((t: string) => t.toLowerCase().includes('ai') || t.toLowerCase().includes('ml')),
    };
  });

  return NextResponse.json({
    companies: enriched,
    signals: signals ?? [],
    tenders: tenders ?? [],
    industries: industries ?? [],
    summary: {
      total_companies: enriched.length,
      ai_ready: enriched.filter((c: Record<string, unknown>) => c.ai_ready).length,
      avg_score: Math.round(enriched.reduce((s: number, c: Record<string, unknown>) => s + (c.overall_score as number), 0) / enriched.length),
      top_province: 'Gauteng',
    },
  });
}
