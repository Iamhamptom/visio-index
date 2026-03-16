import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BarChart3, Zap, DollarSign, Brain, Code, Calculator } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Benchmarks & Pricing | The Visio Index',
  description: 'AI model benchmarks, Arena Elo ratings, SWE-Bench scores, and API pricing comparison. The most comprehensive AI model intelligence.',
};

interface BenchmarkRow {
  model_name: string;
  model_slug: string;
  lab: string;
  benchmark_name: string;
  benchmark_category: string;
  score: number;
  score_unit: string;
  rank_in_benchmark: number;
}

interface PricingRow {
  model_name: string;
  model_slug: string;
  lab: string;
  input_price_per_mtok: number;
  output_price_per_mtok: number;
  context_window: number;
  tier: string;
  notes: string;
}

async function getData() {
  const url = process.env.VISIO_INTEL_SUPABASE_URL;
  const key = process.env.VISIO_INTEL_SERVICE_KEY;
  if (!url || !key) return { benchmarks: {}, pricing: [] };

  const client = createClient(url, key);

  const [benchRes, priceRes] = await Promise.all([
    client.from('ai_benchmarks').select('*').order('score', { ascending: false }),
    client.from('ai_pricing').select('*').order('input_price_per_mtok', { ascending: true }),
  ]);

  const grouped: Record<string, BenchmarkRow[]> = {};
  for (const row of (benchRes.data ?? []) as BenchmarkRow[]) {
    if (!grouped[row.benchmark_name]) grouped[row.benchmark_name] = [];
    grouped[row.benchmark_name].push(row);
  }

  return { benchmarks: grouped, pricing: (priceRes.data ?? []) as PricingRow[] };
}

const benchmarkMeta: Record<string, { icon: typeof Brain; desc: string; color: string }> = {
  'LMSYS Arena': { icon: Brain, desc: 'Human preference voting. The gold standard.', color: 'text-spice' },
  'SWE-Bench Verified': { icon: Code, desc: 'Real-world software engineering. Can it actually code?', color: 'text-cyan' },
  'ARC-AGI-2': { icon: Calculator, desc: 'Novel reasoning. Can it think beyond training data?', color: 'text-rank-up' },
};

export default async function BenchmarksPage() {
  const { benchmarks, pricing } = await getData();
  const benchmarkNames = Object.keys(benchmarks);

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="h-4 w-4 text-spice" />
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-spice">Model Intelligence</span>
          </div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground">Benchmarks & Pricing</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Every major AI model scored across Arena Elo, SWE-Bench, ARC-AGI, and more. Plus API pricing comparison.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-8">
          {[
            { label: 'Benchmarks', value: benchmarkNames.length },
            { label: 'Entries', value: Object.values(benchmarks).flat().length },
            { label: 'Models Priced', value: pricing.length },
            { label: '#1 Arena', value: benchmarks['LMSYS Arena']?.[0]?.model_name?.split(' ').slice(0, 2).join(' ') || '—' },
            { label: '#1 SWE-Bench', value: benchmarks['SWE-Bench Verified']?.[0]?.model_name?.split(' ').slice(0, 2).join(' ') || '—' },
            { label: 'Cheapest', value: pricing[0]?.model_name?.split(' ').slice(0, 2).join(' ') || '—' },
          ].map((s) => (
            <div key={s.label} className="p-2.5 rounded-sm border border-spice/[0.06] text-center">
              <p className="font-mono text-sm font-bold text-spice truncate">{s.value}</p>
              <p className="text-[8px] font-mono text-muted-foreground uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Benchmark Tables */}
        {benchmarkNames.map((name) => {
          const entries = benchmarks[name];
          const meta = benchmarkMeta[name] || { icon: Brain, desc: '', color: 'text-spice' };
          const Icon = meta.icon;

          return (
            <section key={name} className="mb-8">
              <div className="flex items-center gap-3 mb-3 pb-2 border-b border-spice/[0.06]">
                <Icon className={cn('h-4 w-4', meta.color)} />
                <h2 className="text-[11px] font-mono uppercase tracking-[0.15em] text-spice font-semibold">{name}</h2>
                <span className="text-[9px] text-muted-foreground font-mono">{meta.desc}</span>
                <span className="text-[9px] font-mono text-muted-foreground ml-auto">{entries.length} models</span>
              </div>

              <div className="rounded-sm border border-spice/[0.06] overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-spice/[0.06] bg-surface/30">
                      <th className="text-left py-2 px-3 text-[9px] font-mono uppercase tracking-wider text-spice-dim w-8">#</th>
                      <th className="text-left py-2 px-3 text-[9px] font-mono uppercase tracking-wider text-spice-dim">Model</th>
                      <th className="text-left py-2 px-3 text-[9px] font-mono uppercase tracking-wider text-spice-dim">Lab</th>
                      <th className="text-right py-2 px-3 text-[9px] font-mono uppercase tracking-wider text-spice">Score</th>
                    </tr>
                  </thead>
                  <tbody className="stagger-children">
                    {entries.map((entry, i) => (
                      <tr key={`${entry.model_slug}-${i}`} className={cn(
                        'border-b border-spice/[0.02] hover:bg-spice/[0.015] scan-hover',
                        i === 0 && 'bg-spice/[0.02]'
                      )}>
                        <td className="py-2 px-3">
                          <span className={cn('font-mono text-xs font-bold', i === 0 ? 'holo-number' : 'text-muted-foreground')}>
                            {entry.rank_in_benchmark || i + 1}
                          </span>
                        </td>
                        <td className="py-2 px-3">
                          <Link href={`/entity/${entry.model_slug}`} className="font-medium text-xs text-foreground hover:text-spice transition-colors">
                            {entry.model_name}
                          </Link>
                        </td>
                        <td className="py-2 px-3 text-xs text-muted-foreground">{entry.lab}</td>
                        <td className="py-2 px-3 text-right">
                          <span className={cn('font-mono text-sm font-bold', i === 0 ? 'holo-number' : 'text-spice')}>
                            {entry.score_unit === 'elo' ? entry.score.toFixed(0) : `${entry.score}%`}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}

        {/* Pricing Table */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-3 pb-2 border-b border-spice/[0.06]">
            <DollarSign className="h-4 w-4 text-rank-up" />
            <h2 className="text-[11px] font-mono uppercase tracking-[0.15em] text-spice font-semibold">API Pricing Comparison</h2>
            <span className="text-[9px] text-muted-foreground font-mono">$ per million tokens</span>
            <span className="text-[9px] font-mono text-muted-foreground ml-auto">{pricing.length} models</span>
          </div>

          <div className="rounded-sm border border-spice/[0.06] overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-spice/[0.06] bg-surface/30">
                  <th className="text-left py-2 px-3 text-[9px] font-mono uppercase tracking-wider text-spice-dim">Model</th>
                  <th className="text-left py-2 px-3 text-[9px] font-mono uppercase tracking-wider text-spice-dim">Lab</th>
                  <th className="text-right py-2 px-3 text-[9px] font-mono uppercase tracking-wider text-rank-up">Input $/M</th>
                  <th className="text-right py-2 px-3 text-[9px] font-mono uppercase tracking-wider text-rank-hot">Output $/M</th>
                  <th className="text-right py-2 px-3 text-[9px] font-mono uppercase tracking-wider text-spice-dim hidden sm:table-cell">Context</th>
                  <th className="text-left py-2 px-3 text-[9px] font-mono uppercase tracking-wider text-spice-dim hidden md:table-cell">Tier</th>
                </tr>
              </thead>
              <tbody className="stagger-children">
                {pricing.map((model, i) => {
                  const isFree = model.input_price_per_mtok === 0;
                  const isCheap = model.input_price_per_mtok <= 1;
                  const isExpensive = model.input_price_per_mtok >= 10;
                  return (
                    <tr key={model.model_slug} className={cn(
                      'border-b border-spice/[0.02] hover:bg-spice/[0.015] scan-hover',
                      isFree && 'bg-rank-up/[0.02]'
                    )}>
                      <td className="py-2 px-3">
                        <Link href={`/entity/${model.model_slug}`} className="font-medium text-xs text-foreground hover:text-spice transition-colors">
                          {model.model_name}
                        </Link>
                      </td>
                      <td className="py-2 px-3 text-xs text-muted-foreground">{model.lab}</td>
                      <td className="py-2 px-3 text-right">
                        <span className={cn('font-mono text-xs font-bold',
                          isFree ? 'text-rank-up' : isCheap ? 'text-cyan' : isExpensive ? 'text-rank-down' : 'text-foreground'
                        )}>
                          {isFree ? 'FREE' : `$${model.input_price_per_mtok.toFixed(2)}`}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right">
                        <span className={cn('font-mono text-xs',
                          isFree ? 'text-rank-up' : 'text-muted-foreground'
                        )}>
                          {isFree ? 'FREE' : `$${model.output_price_per_mtok.toFixed(2)}`}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right hidden sm:table-cell">
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {model.context_window >= 1000000
                            ? `${(model.context_window / 1000000).toFixed(0)}M`
                            : `${(model.context_window / 1000).toFixed(0)}K`}
                        </span>
                      </td>
                      <td className="py-2 px-3 hidden md:table-cell">
                        <span className={cn('text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-sm',
                          model.tier === 'frontier' ? 'bg-spice/10 text-spice' :
                          model.tier === 'open-weight' ? 'bg-rank-up/10 text-rank-up' :
                          model.tier === 'speed' ? 'bg-cyan/10 text-cyan' :
                          'bg-surface text-muted-foreground'
                        )}>
                          {model.tier}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Data source note */}
        <div className="text-center py-6 border-t border-spice/[0.06]">
          <p className="text-[9px] font-mono text-muted-foreground">
            Data sourced from LMSYS Arena, SWE-Bench, ARC Prize, and provider pricing pages.
            Updated weekly. Powered by Visio Intel (zgsgfghyreaptbpvlhdx).
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
