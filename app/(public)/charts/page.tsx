import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { staticCharts, getEntriesByChartSlug } from '@/lib/data/static-charts';
import { formatScore } from '@/lib/scoring/engine';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Charts | The Visio Index',
  description: 'Browse all AI ranking charts — labs, models, tools, creators, CEOs, scientists, teams, communities, campaigns.',
};

export default function ChartsPage() {
  const categories = [
    { key: 'major', label: 'Major Charts', desc: 'The flagship weekly rankings' },
    { key: 'genre', label: 'Genre Charts', desc: 'Specialist rankings by category' },
    { key: 'power_list', label: 'Power Lists', desc: 'CEOs, scientists, and teams shaping AI' },
    { key: 'industry', label: 'Industry Charts', desc: 'Marketing, campaigns, and business impact' },
  ];

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-spice-dim mb-1">{staticCharts.length} Charts</p>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground">All Charts</h1>
        </div>

        {categories.map(({ key, label, desc }) => {
          const charts = staticCharts.filter((c) => c.category === key);
          if (charts.length === 0) return null;

          return (
            <section key={key} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-spice" />
                <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-spice">{label}</h2>
                <div className="flex-1 h-px bg-spice/[0.06]" />
                <span className="text-[10px] text-muted-foreground font-mono">{desc}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 stagger-children">
                {charts.map((chart) => {
                  const entries = getEntriesByChartSlug(chart.slug);
                  return (
                    <Link
                      key={chart.id}
                      href={`/charts/${chart.slug}`}
                      className="group p-4 rounded-sm border border-spice/[0.06] hover:border-spice/15 holo-interactive"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-heading font-semibold text-sm text-foreground group-hover:text-spice transition-colors">
                          {chart.name}
                        </h3>
                        <ChevronRight className="h-3.5 w-3.5 text-spice-dim group-hover:text-spice transition-colors" />
                      </div>

                      {entries.slice(0, 3).map((entry) => (
                        <div key={entry.rank} className="flex items-center gap-2 py-1">
                          <span className={cn(
                            'font-mono text-[11px] font-bold w-4',
                            entry.rank === 1 ? 'text-spice' : 'text-muted-foreground'
                          )}>
                            {entry.rank}
                          </span>
                          <span className="text-xs text-foreground/80 flex-1 truncate">{entry.entity?.name}</span>
                          <span className="font-mono text-[10px] text-spice-dim">{formatScore(entry.composite_score)}</span>
                        </div>
                      ))}

                      <div className="mt-2 pt-2 border-t border-spice/[0.04] flex items-center justify-between">
                        <span className="text-[9px] text-muted-foreground font-mono">{entries.length} ranked</span>
                        <span className="text-[9px] text-spice-dim font-mono uppercase">{chart.frequency}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>
      <Footer />
    </>
  );
}
