import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Ticker } from '@/components/home/ticker';
import { SpiceParticles } from '@/components/holo/spice-particles';
import { PositionBadge } from '@/components/charts/position-badge';
import { Sparkline } from '@/components/charts/sparkline';
import { getRankDelta, formatScore } from '@/lib/scoring/engine';
import { NewsletterForm } from '@/components/home/newsletter-form';
import {
  getFeaturedCharts, getGenreCharts, getEntriesByChartSlug,
  getAllTrendingEntries, getBiggestMovers, getScoreBreakdown,
  getScoreHistory, staticEntities, CHART_WEEKS,
} from '@/lib/data/static-charts';
import { getMovementNote } from '@/lib/data/chart-notes';
import Link from 'next/link';
import { ChevronRight, BarChart3, Brain, Globe, Shield, Users, TrendingUp, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const featuredCharts = getFeaturedCharts();
  const genreCharts = getGenreCharts();
  const trending = getAllTrendingEntries();
  const movers = getBiggestMovers();

  // Featured #1 from each major chart
  const topLabs = getEntriesByChartSlug('top-labs');
  const topModels = getEntriesByChartSlug('top-models');
  const topTools = getEntriesByChartSlug('top-tools');

  const numberOne = topLabs[0];
  const numberOneScores = numberOne?.entity ? getScoreBreakdown(numberOne.entity.slug) : null;

  return (
    <>
      <Navbar />
      <main>
        {/* ── TICKER ── Live ranking marquee */}
        <Ticker entries={[...topLabs.slice(0, 5), ...topModels.slice(0, 5), ...topTools.slice(0, 5)]} />

        {/* ── COMMAND CENTER ── Split hero */}
        <section className="relative overflow-hidden">
          <SpiceParticles count={30} />
          <div className="absolute inset-0 hex-grid opacity-20" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[520px]">

              {/* LEFT — Featured #1 entity */}
              <div className="lg:col-span-5 py-12 lg:py-16 lg:pr-8 lg:border-r border-spice/[0.06] flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-spice animate-pulse-amber" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-spice-dim">
                    Week of {new Date(CHART_WEEKS[CHART_WEEKS.length - 1]).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-spice/60 mb-2">
                  #1 Top Labs
                </p>

                {numberOne?.entity && (
                  <Link href={`/entity/${numberOne.entity.slug}`} className="group">
                    <h1 className="font-heading font-bold text-4xl md:text-5xl holo-number leading-[1.1] group-hover:opacity-80 transition-opacity">
                      {numberOne.entity.name}
                    </h1>
                  </Link>
                )}

                {/* Editorial note — Billboard-style narrative */}
                {numberOne?.entity && getMovementNote(numberOne.entity.slug) && (
                  <p className="text-sm text-foreground/70 mt-3 leading-relaxed max-w-md italic">
                    &ldquo;{getMovementNote(numberOne.entity.slug)}&rdquo;
                  </p>
                )}

                {/* Score readout */}
                <div className="flex items-end gap-8 mt-8">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-spice-dim mb-1">Composite</p>
                    <p className="font-mono text-5xl font-black holo-number leading-none">
                      {numberOne ? formatScore(numberOne.composite_score) : '—'}
                    </p>
                  </div>
                  {numberOneScores && (
                    <div className="flex-1 max-w-[200px]">
                      {Object.entries(numberOneScores.scores).slice(0, 4).map(([dim, val]) => (
                        <div key={dim} className="flex items-center gap-2 mb-1.5">
                          <span className="text-[9px] text-muted-foreground w-16 truncate capitalize">
                            {dim.replace(/_/g, ' ')}
                          </span>
                          <div className="flex-1 h-[3px] rounded-full bg-surface-overlay overflow-hidden">
                            <div className="h-full rounded-full bg-spice/60" style={{ width: `${val}%` }} />
                          </div>
                          <span className="font-mono text-[10px] text-spice-dim w-5 text-right">{val}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT — Live chart preview */}
              <div className="lg:col-span-7 py-8 lg:py-10 lg:pl-8">
                {/* Chart tabs */}
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-spice">
                    Top Labs
                  </h2>
                  <div className="flex-1 h-px bg-spice/[0.06]" />
                  <Link href="/charts/top-labs" className="text-[10px] font-mono uppercase tracking-wider text-spice-dim hover:text-spice transition-colors flex items-center gap-1">
                    Full Chart <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>

                {/* Dense table — top 10 */}
                <div className="space-y-0">
                  {topLabs.slice(0, 10).map((entry) => {
                    const delta = getRankDelta(entry.rank, entry.previous_rank);
                    const history = entry.entity ? getScoreHistory(entry.entity.slug) : [];
                    const scores = entry.entity ? getScoreBreakdown(entry.entity.slug) : null;
                    return (
                      <Link
                        key={entry.rank}
                        href={entry.entity ? `/entity/${entry.entity.slug}` : '#'}
                        className={cn(
                          'grid grid-cols-[2rem_3.5rem_1fr_auto_4rem] items-center py-2.5 px-2 border-b border-spice/[0.03] hover:bg-spice/[0.02] transition-colors group',
                          entry.rank <= 3 && 'bg-spice/[0.01]'
                        )}
                      >
                        <span className={cn(
                          'font-mono text-sm font-bold',
                          entry.rank === 1 ? 'holo-number' : 'text-muted-foreground'
                        )}>
                          {String(entry.rank).padStart(2, '0')}
                        </span>

                        <PositionBadge status={entry.status} delta={delta} />

                        <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-sm text-foreground group-hover:text-spice transition-colors truncate">
                            {entry.entity?.name}
                          </span>
                          <span className="text-[10px] text-muted-foreground hidden sm:inline">{entry.entity?.country}</span>
                        </div>
                          {/* Editorial note — Billboard-style micro-narrative */}
                          {entry.entity && getMovementNote(entry.entity.slug) && (
                            <p className="text-[10px] text-muted-foreground line-clamp-1 hidden lg:block mt-0.5">
                              {getMovementNote(entry.entity.slug)}
                            </p>
                          )}
                        </div>

                        <Sparkline data={history} height={18} width={48} color="#D4A843" />

                        <span className="font-mono text-xs font-bold text-right text-spice">
                          {formatScore(entry.composite_score)}
                        </span>
                      </Link>
                    );
                  })}
                </div>

                {/* Quick chart links */}
                <div className="flex gap-2 mt-4">
                  {['top-models', 'top-tools', 'top-creators'].map((slug) => (
                    <Link
                      key={slug}
                      href={`/charts/${slug}`}
                      className="flex-1 px-3 py-2 rounded-sm border border-spice/[0.06] hover:border-spice/15 hover:bg-spice/[0.02] transition-all text-center"
                    >
                      <span className="text-[10px] font-mono uppercase tracking-wider text-spice-dim">
                        {slug.replace('top-', '').replace(/-/g, ' ')}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── METRICS STRIP ── Bloomberg-style numbers */}
        <section className="border-y border-spice/[0.06] bg-surface/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 divide-x divide-spice/[0.04]">
              {[
                { label: 'Entities', value: staticEntities.length },
                { label: 'Labs', value: staticEntities.filter(e => e.type === 'lab').length },
                { label: 'Models', value: staticEntities.filter(e => e.type === 'model').length },
                { label: 'Tools', value: staticEntities.filter(e => e.type === 'tool').length },
                { label: 'Charts', value: '8' },
                { label: 'Dimensions', value: '25+' },
                { label: 'Countries', value: new Set(staticEntities.map(e => e.country).filter(Boolean)).size },
                { label: 'Updated', value: 'Weekly' },
              ].map((stat) => (
                <div key={stat.label} className="py-4 px-4 text-center">
                  <p className="font-mono text-lg font-bold text-foreground">{stat.value}</p>
                  <p className="text-[9px] font-mono uppercase tracking-[0.15em] text-spice-dim">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BIGGEST MOVERS ── Dense horizontal cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-3 mb-5">
            <TrendingUp className="h-4 w-4 text-rank-up" />
            <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-spice">Biggest Movers</h2>
            <div className="flex-1 h-px bg-spice/[0.06]" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {movers.slice(0, 8).map((entry) => {
              const delta = getRankDelta(entry.rank, entry.previous_rank);
              const history = entry.entity ? getScoreHistory(entry.entity.slug) : [];
              const isUp = entry.status === 'up' || entry.status === 'hot_shot' || entry.status === 'new';
              return (
                <Link
                  key={entry.id}
                  href={entry.entity ? `/entity/${entry.entity.slug}` : '#'}
                  className={cn(
                    'p-3 rounded-sm border transition-all hover:bg-spice/[0.02]',
                    isUp ? 'border-rank-up/10' : 'border-rank-down/10'
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs text-muted-foreground">#{entry.rank}</span>
                    <PositionBadge status={entry.status} delta={delta} />
                  </div>
                  <p className="font-medium text-sm text-foreground truncate">{entry.entity?.name}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-mono text-[11px] text-spice">{formatScore(entry.composite_score)}</span>
                    <Sparkline data={history} height={16} width={44} />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── CHART GRID ── Three columns, not two */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 border-t border-spice/[0.06]">
          <div className="flex items-center gap-3 mb-5">
            <BarChart3 className="h-4 w-4 text-spice" />
            <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-spice">All Charts</h2>
            <div className="flex-1 h-px bg-spice/[0.06]" />
            <Link href="/charts" className="text-[10px] font-mono uppercase tracking-wider text-spice-dim hover:text-spice flex items-center gap-1">
              Browse All <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[...featuredCharts, ...genreCharts].map((chart) => {
              const entries = getEntriesByChartSlug(chart.slug);
              return (
                <Link
                  key={chart.id}
                  href={`/charts/${chart.slug}`}
                  className="group p-4 rounded-sm border border-spice/[0.06] hover:border-spice/15 hover:bg-spice/[0.02] transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-heading font-semibold text-sm text-foreground group-hover:text-spice transition-colors">
                      {chart.name}
                    </h3>
                    <span className="text-[9px] font-mono text-spice-dim uppercase">{chart.frequency}</span>
                  </div>

                  {/* Top 3 mini list */}
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

                  <div className="mt-2 pt-2 border-t border-spice/[0.04] text-[10px] text-spice-dim font-mono">
                    {entries.length} ranked &middot; {chart.category}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── INTELLIGENCE MODULES ── What makes us different */}
        <section className="border-t border-spice/[0.06] bg-surface/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <div className="flex items-center gap-3 mb-8">
              <Brain className="h-4 w-4 text-spice" />
              <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-spice">Intelligence Modules</h2>
              <div className="flex-1 h-px bg-spice/[0.06]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: BarChart3, title: 'Composite Scoring', desc: '5 weighted dimensions per chart. Not benchmarks — composite intelligence across performance, adoption, investment, cultural impact, and innovation.', href: '/methodology' },
                { icon: Shield, title: 'Ethics & Values', desc: 'Transparency, safety, privacy, openness, accountability scored for every entity. Letter grades from A to F. No other platform tracks this.', href: '/culture' },
                { icon: Users, title: 'Generational Data', desc: 'Gen Z, Millennial, Gen X, Boomer adoption rates. Who uses what, and why. The demographic intelligence layer.', href: '/culture' },
                { icon: Globe, title: 'Cultural Impact', desc: 'Media influence, education disruption, creative disruption, workforce impact, meme culture. The human cost and benefit.', href: '/culture' },
              ].map(({ icon: Icon, title, desc, href }) => (
                <Link
                  key={title}
                  href={href}
                  className="group p-5 rounded-sm shield-border hover:bg-spice/[0.02] transition-all"
                >
                  <Icon className="h-4 w-4 text-spice mb-3" />
                  <h3 className="font-heading font-semibold text-sm text-foreground group-hover:text-spice transition-colors mb-2">
                    {title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER ── Minimal, end of page */}
        <section className="border-t border-spice/[0.06]">
          <div className="max-w-xl mx-auto px-4 sm:px-6 py-16 text-center">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-spice-dim mb-3">Weekly Intelligence</p>
            <h2 className="font-heading font-bold text-xl text-foreground mb-2">
              The Visio Index Newsletter
            </h2>
            <p className="text-xs text-muted-foreground mb-6">
              Charts, analysis, and cultural intelligence. Every Monday.
            </p>
            <NewsletterForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
