import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { createClient } from '@supabase/supabase-js';
import { cn } from '@/lib/utils';
import { BarChart3, Building2, Zap, FileText, Globe, TrendingUp, Shield, Radio, DollarSign } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Intel Terminal | The Visio Index',
  description: 'Bloomberg-grade intelligence terminal. AI adoption readiness, market signals, opportunities, and benchmarks. Powered by Visio Intel.',
};

async function getTerminalData() {
  const url = process.env.VISIO_INTEL_SUPABASE_URL;
  const key = process.env.VISIO_INTEL_SERVICE_KEY;
  if (!url || !key) return null;
  const client = createClient(url, key);

  const [companies, signals, tenders, industries, benchmarks, pricing, news, aiEntities] = await Promise.all([
    client.from('legal_entities').select('id, legal_name, province, overall_score, intent_score, spend_potential, industry:industries(name)').gt('overall_score', 60).order('overall_score', { ascending: false }).limit(20),
    client.from('market_signals').select('title, signal_type, signal_strength, detected_at, source_system').order('detected_at', { ascending: false }).limit(15),
    client.from('procurement_releases').select('tender_title, buyer_name, tender_value_zar, tender_province, tender_status').eq('tender_status', 'active').order('tender_value_zar', { ascending: false }).limit(8),
    client.from('industries').select('name, gdp_contribution_pct, priority_rank').order('priority_rank', { ascending: true }).limit(10),
    client.from('ai_benchmarks').select('model_name, lab, benchmark_name, score, score_unit, rank_in_benchmark').order('score', { ascending: false }).limit(30),
    client.from('ai_pricing').select('model_name, lab, input_price_per_mtok, output_price_per_mtok, context_window, tier').order('input_price_per_mtok', { ascending: true }).limit(10),
    client.from('news_articles').select('title, source_name, published_at, sentiment_score, sentiment_label, category').order('published_at', { ascending: false }).limit(10),
    client.from('index_entities').select('name, slug, entity_type, category, composite_score, score_breakdown, chart_appearances, country, description, metadata').not('composite_score', 'is', null).order('composite_score', { ascending: false }).limit(30),
  ]);

  // Get web presences for tech stack info
  const ids = (companies.data ?? []).map((c: { id: string }) => c.id);
  const { data: wp } = await client.from('web_presences').select('entity_id, tech_stack, digital_maturity').in('entity_id', ids);
  const wpMap = new Map((wp ?? []).map((w: { entity_id: string; tech_stack: string[]; digital_maturity: string }) => [w.entity_id, w]));

  const enrichedCompanies = (companies.data ?? []).map((c: Record<string, unknown>) => ({
    ...c,
    tech_stack: (wpMap.get(c.id as string) as { tech_stack: string[] } | undefined)?.tech_stack ?? [],
    digital_maturity: (wpMap.get(c.id as string) as { digital_maturity: string } | undefined)?.digital_maturity ?? 'unknown',
  }));

  // Group benchmarks
  const benchmarkGroups: Record<string, Array<Record<string, unknown>>> = {};
  for (const b of (benchmarks.data ?? []) as Record<string, unknown>[]) {
    const name = b.benchmark_name as string;
    if (!benchmarkGroups[name]) benchmarkGroups[name] = [];
    if (benchmarkGroups[name].length < 5) benchmarkGroups[name].push(b);
  }

  return {
    companies: enrichedCompanies,
    signals: signals.data ?? [],
    tenders: tenders.data ?? [],
    industries: industries.data ?? [],
    benchmarkGroups,
    pricing: pricing.data ?? [],
    news: news.data ?? [],
    aiEntities: aiEntities.data ?? [],
    counts: {
      signals: signals.data?.length ?? 0,
      companies: enrichedCompanies.length,
      tenders: tenders.data?.length ?? 0,
      benchmarks: benchmarks.data?.length ?? 0,
      news: news.data?.length ?? 0,
    },
  };
}

const signalTypeColors: Record<string, string> = {
  funding: 'text-rank-up', launch: 'text-cyan', m_and_a: 'text-purple-400',
  partnership: 'text-spice', regulatory: 'text-rank-new', risk_event: 'text-rank-down',
  hiring: 'text-rank-up', expansion: 'text-cyan', market_move: 'text-spice',
  technology: 'text-electric', tech_change: 'text-electric', tender: 'text-rank-new',
};

export default async function TerminalPage() {
  const data = await getTerminalData();
  if (!data) return <div className="p-20 text-center text-muted-foreground">Intel not connected</div>;

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Radio className="h-3.5 w-3.5 text-rank-up animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-rank-up">Intel Terminal</span>
            <span className="text-[9px] font-mono text-muted-foreground">— Visio Intel × Visio Index</span>
          </div>
          <div className="flex items-center gap-3 text-[8px] font-mono text-muted-foreground">
            <span>{data.counts.signals} signals</span>
            <span>{data.counts.companies} companies</span>
            <span>{data.counts.benchmarks} benchmarks</span>
            <span>{data.counts.news} news</span>
          </div>
        </div>

        {/* ═══ TOP STRIP: AI Entity Rankings (full width) ═══ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
          {(data.aiEntities as Record<string, unknown>[]).slice(0, 12).map((entity, i) => {
            const charts = (entity.chart_appearances as { chart: string; rank: number; score: number }[]) ?? [];
            const bestChart = charts.sort((a, b) => a.rank - b.rank)[0];
            return (
              <a key={i} href={`/entity/${entity.slug}`} className={cn(
                'p-2.5 rounded-sm border holo-interactive',
                i < 3 ? 'border-spice/15 bg-spice/[0.02]' : 'border-spice/[0.06]'
              )}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[8px] font-mono uppercase text-spice-dim">{entity.entity_type as string}</span>
                  {entity.composite_score != null && (
                    <span className={cn('font-mono text-xs font-bold', i === 0 ? 'holo-number' : 'text-spice')}>
                      {Number(entity.composite_score).toFixed(1)}
                    </span>
                  )}
                </div>
                <p className="text-[11px] font-medium text-foreground truncate">{entity.name as string}</p>
                <p className="text-[9px] text-muted-foreground truncate">{entity.category as string}</p>
                {bestChart && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-[8px] font-mono text-spice">#{bestChart.rank}</span>
                    <span className="text-[7px] text-muted-foreground truncate">{bestChart.chart.replace(/-/g, ' ')}</span>
                  </div>
                )}
              </a>
            );
          })}
        </div>

        {/* 4-PANEL GRID — Bloomberg style */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">

          {/* ═══ PANEL 1: SA Company Intelligence (left, 5 cols) ═══ */}
          <div className="lg:col-span-5 space-y-3">
            <div className="rounded-sm border border-spice/[0.06] overflow-hidden">
              <div className="px-3 py-2 border-b border-spice/[0.06] bg-surface/30 flex items-center gap-2">
                <Building2 className="h-3 w-3 text-spice" />
                <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-spice font-semibold">SA AI Adoption Readiness</span>
                <span className="text-[8px] font-mono text-muted-foreground ml-auto">{data.companies.length} scored</span>
              </div>
              <div className="divide-y divide-spice/[0.02]">
                {(data.companies as Record<string, unknown>[]).slice(0, 12).map((c, i) => {
                  const techStack = (c.tech_stack as string[]) || [];
                  const hasAI = techStack.some((t) => t.toLowerCase().includes('ai') || t.toLowerCase().includes('ml'));
                  const industry = c.industry as { name: string } | null;
                  return (
                    <div key={i} className={cn('px-3 py-2 hover:bg-spice/[0.015] scan-hover', i < 3 && 'bg-spice/[0.01]')}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={cn('font-mono text-[10px] font-bold w-5', i === 0 ? 'holo-number' : 'text-muted-foreground')}>
                            {i + 1}
                          </span>
                          <span className="text-xs font-medium text-foreground truncate">{c.legal_name as string}</span>
                          {hasAI && <span className="text-[7px] font-mono text-rank-up bg-rank-up/10 px-1 rounded">AI</span>}
                        </div>
                        <span className="font-mono text-xs font-bold text-spice">{c.overall_score as number}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[9px] text-muted-foreground">{industry?.name}</span>
                        <span className="text-[9px] text-muted-foreground">·</span>
                        <span className="text-[9px] text-muted-foreground">{c.province as string}</span>
                        <span className="text-[9px] text-muted-foreground">·</span>
                        <span className="text-[9px] text-spice-dim">Intent: {c.intent_score as number}</span>
                        <span className="text-[9px] text-muted-foreground">·</span>
                        <span className="text-[9px] text-cyan">{c.digital_maturity as string}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Industries */}
            <div className="rounded-sm border border-spice/[0.06] overflow-hidden">
              <div className="px-3 py-2 border-b border-spice/[0.06] bg-surface/30 flex items-center gap-2">
                <Globe className="h-3 w-3 text-cyan" />
                <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-cyan font-semibold">SA Industries</span>
              </div>
              <div className="px-3 py-2 space-y-1.5">
                {(data.industries as Record<string, unknown>[]).map((ind, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-[9px] text-muted-foreground w-3">{i + 1}</span>
                    <span className="text-[10px] text-foreground flex-1 truncate">{ind.name as string}</span>
                    <div className="w-16 h-1 rounded-full bg-surface-overlay overflow-hidden">
                      <div className="h-full rounded-full bg-cyan/50" style={{ width: `${(ind.gdp_contribution_pct as number) * 5}%` }} />
                    </div>
                    <span className="text-[9px] font-mono text-cyan">{ind.gdp_contribution_pct as number}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ═══ PANEL 2: Signals + News (center, 4 cols) ═══ */}
          <div className="lg:col-span-4 space-y-3">
            {/* Live Signals */}
            <div className="rounded-sm border border-spice/[0.06] overflow-hidden">
              <div className="px-3 py-2 border-b border-spice/[0.06] bg-surface/30 flex items-center gap-2">
                <Zap className="h-3 w-3 text-rank-new" />
                <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-rank-new font-semibold">Live Signals</span>
              </div>
              <div className="divide-y divide-spice/[0.02] max-h-[320px] overflow-y-auto">
                {(data.signals as Record<string, unknown>[]).map((sig, i) => (
                  <div key={i} className="px-3 py-2 hover:bg-spice/[0.015]">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className={cn('text-[7px] font-mono uppercase', signalTypeColors[sig.signal_type as string] ?? 'text-muted-foreground')}>
                        {sig.signal_type as string}
                      </span>
                      <span className={cn('text-[7px] font-mono', (sig.signal_strength as string) === 'strong' ? 'text-spice' : 'text-muted-foreground')}>
                        {sig.signal_strength as string}
                      </span>
                    </div>
                    <p className="text-[10px] text-foreground leading-snug line-clamp-2">{sig.title as string}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* News Sentiment */}
            <div className="rounded-sm border border-spice/[0.06] overflow-hidden">
              <div className="px-3 py-2 border-b border-spice/[0.06] bg-surface/30 flex items-center gap-2">
                <FileText className="h-3 w-3 text-spice" />
                <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-spice font-semibold">News + Sentiment</span>
              </div>
              <div className="divide-y divide-spice/[0.02] max-h-[250px] overflow-y-auto">
                {(data.news as Record<string, unknown>[]).map((article, i) => (
                  <div key={i} className="px-3 py-2 hover:bg-spice/[0.015]">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className={cn('w-1.5 h-1.5 rounded-full',
                        (article.sentiment_label as string) === 'positive' ? 'bg-rank-up' :
                        (article.sentiment_label as string) === 'negative' ? 'bg-rank-down' : 'bg-rank-new'
                      )} />
                      <span className="text-[8px] font-mono text-muted-foreground">{article.source_name as string}</span>
                      <span className="text-[8px] font-mono text-muted-foreground ml-auto">{article.category as string}</span>
                    </div>
                    <p className="text-[10px] text-foreground leading-snug line-clamp-2">{article.title as string}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ═══ PANEL 3: Benchmarks + Pricing (right, 3 cols) ═══ */}
          <div className="lg:col-span-3 space-y-3">
            {/* Benchmark Leaderboards (compact) */}
            {Object.entries(data.benchmarkGroups).slice(0, 4).map(([name, entries]) => (
              <div key={name} className="rounded-sm border border-spice/[0.06] overflow-hidden">
                <div className="px-3 py-1.5 border-b border-spice/[0.06] bg-surface/30">
                  <span className="text-[8px] font-mono uppercase tracking-[0.15em] text-spice font-semibold">{name}</span>
                </div>
                <div className="divide-y divide-spice/[0.02]">
                  {(entries as Record<string, unknown>[]).slice(0, 3).map((b, i) => (
                    <div key={i} className="px-3 py-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className={cn('font-mono text-[9px] font-bold', i === 0 ? 'holo-number' : 'text-muted-foreground')}>{i + 1}</span>
                        <span className="text-[10px] text-foreground truncate">{(b.model_name as string).split(' ').slice(0, 3).join(' ')}</span>
                      </div>
                      <span className={cn('font-mono text-[10px] font-bold', i === 0 ? 'text-spice' : 'text-muted-foreground')}>
                        {(b.score_unit as string) === 'elo' ? (b.score as number).toFixed(0) : `${b.score}%`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Pricing (compact) */}
            <div className="rounded-sm border border-spice/[0.06] overflow-hidden">
              <div className="px-3 py-1.5 border-b border-spice/[0.06] bg-surface/30 flex items-center gap-1.5">
                <DollarSign className="h-3 w-3 text-rank-up" />
                <span className="text-[8px] font-mono uppercase tracking-[0.15em] text-rank-up font-semibold">API Pricing $/M</span>
              </div>
              <div className="divide-y divide-spice/[0.02]">
                {(data.pricing as Record<string, unknown>[]).slice(0, 6).map((m, i) => {
                  const isFree = (m.input_price_per_mtok as number) === 0;
                  return (
                    <div key={i} className="px-3 py-1.5 flex items-center justify-between">
                      <span className="text-[10px] text-foreground truncate flex-1">{(m.model_name as string).split(' ').slice(0, 3).join(' ')}</span>
                      <span className={cn('font-mono text-[9px] font-bold', isFree ? 'text-rank-up' : 'text-muted-foreground')}>
                        {isFree ? 'FREE' : `$${(m.input_price_per_mtok as number).toFixed(2)}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tenders */}
            <div className="rounded-sm border border-spice/[0.06] overflow-hidden">
              <div className="px-3 py-1.5 border-b border-spice/[0.06] bg-surface/30 flex items-center gap-1.5">
                <Shield className="h-3 w-3 text-cyan" />
                <span className="text-[8px] font-mono uppercase tracking-[0.15em] text-cyan font-semibold">Active SA Tenders</span>
              </div>
              <div className="divide-y divide-spice/[0.02]">
                {(data.tenders as Record<string, unknown>[]).slice(0, 4).map((t, i) => (
                  <div key={i} className="px-3 py-1.5">
                    <p className="text-[9px] text-foreground leading-snug line-clamp-1">{t.tender_title as string}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[8px] text-muted-foreground">{t.buyer_name as string}</span>
                      <span className="text-[8px] text-cyan ml-auto">{t.tender_province as string}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-spice/[0.06] flex items-center justify-between">
          <span className="text-[8px] font-mono text-muted-foreground">
            Visio Intel (zgsgfghyreaptbpvlhdx) × Visio Index — VisioCorp Intelligence Terminal
          </span>
          <span className="text-[8px] font-mono text-spice-dim">
            Live data · Updated every 12h
          </span>
        </div>
      </main>
      <Footer />
    </>
  );
}
