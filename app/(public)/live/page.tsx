import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { getBreakingNews, getTrendSignals, getSegments } from '@/lib/data/breaking-news';
import { getEntityBySlug } from '@/lib/data/static-charts';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Radio, TrendingUp, TrendingDown, Minus, Zap, BarChart3, ArrowUpRight, ArrowDownRight, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Intelligence | The Visio Index',
  description: 'Breaking AI news, trend signals, and market segment analysis. Real-time intelligence.',
};

const urgencyStyles = {
  flash: { bg: 'bg-rank-down/[0.04]', border: 'border-rank-down/15', badge: 'bg-rank-down/15 text-rank-down', label: 'FLASH' },
  alert: { bg: 'bg-spice/[0.02]', border: 'border-spice/10', badge: 'bg-spice/15 text-spice', label: 'ALERT' },
  update: { bg: '', border: 'border-spice/[0.06]', badge: 'bg-surface text-muted-foreground', label: 'UPDATE' },
};

const categoryBadge: Record<string, string> = {
  launch: 'text-cyan', funding: 'text-rank-up', acquisition: 'text-purple-400',
  policy: 'text-rank-new', safety: 'text-rank-down', benchmark: 'text-spice',
  milestone: 'text-rank-up', controversy: 'text-rank-down',
};

const directionConfig = {
  accelerating: { icon: ArrowUpRight, color: 'text-rank-up', label: 'Accelerating' },
  emerging: { icon: TrendingUp, color: 'text-cyan', label: 'Emerging' },
  peaking: { icon: Zap, color: 'text-rank-new', label: 'Peaking' },
  declining: { icon: TrendingDown, color: 'text-rank-down', label: 'Declining' },
  reversing: { icon: ArrowDownRight, color: 'text-rank-hot', label: 'Reversing' },
};

function timeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function LivePage() {
  const breaking = getBreakingNews();
  const trends = getTrendSignals();
  const segments = getSegments();

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Radio className="h-3.5 w-3.5 text-rank-down animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-rank-down">Live Intelligence</span>
            </div>
            <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground">Breaking + Trends + Segments</h1>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-mono text-muted-foreground">Last updated</p>
            <p className="text-xs font-mono text-spice">March 16, 2026 19:00 UTC</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── LEFT COLUMN: Breaking News ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Breaking Feed */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Radio className="h-3 w-3 text-rank-down" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-rank-down">Breaking</span>
                <div className="flex-1 h-px bg-rank-down/10" />
                <span className="text-[9px] font-mono text-muted-foreground">{breaking.length} stories</span>
              </div>

              <div className="space-y-3 stagger-children">
                {breaking.map((story) => {
                  const urg = urgencyStyles[story.urgency];
                  return (
                    <div key={story.id} className={cn('p-4 rounded-sm border scan-hover', urg.border, urg.bg)}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={cn('text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-sm', urg.badge)}>
                          {urg.label}
                        </span>
                        <span className={cn('text-[8px] font-mono uppercase tracking-wider', categoryBadge[story.category])}>
                          {story.category}
                        </span>
                        {story.verified && <span className="text-[8px] font-mono text-rank-up">✓ verified</span>}
                        <span className="text-[9px] font-mono text-muted-foreground ml-auto">{timeAgo(story.timestamp)}</span>
                      </div>

                      <h3 className="font-heading font-bold text-sm text-foreground leading-snug mb-1.5">
                        {story.headline}
                      </h3>

                      <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                        {story.body}
                      </p>

                      {story.data && (
                        <div className="flex flex-wrap gap-3 mb-2">
                          {story.data.map((d) => (
                            <div key={d.label} className="flex items-center gap-1">
                              <span className="text-[8px] font-mono text-muted-foreground uppercase">{d.label}:</span>
                              <span className="text-[10px] font-mono font-bold text-spice">{d.value}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        {story.entities.slice(0, 3).map((slug) => (
                          <Link key={slug} href={`/entity/${slug}`} className="text-[8px] font-mono text-spice-dim hover:text-spice px-1 py-0.5 rounded-sm border border-spice/[0.04] hover:border-spice/15">
                            {getEntityBySlug(slug)?.name ?? slug}
                          </Link>
                        ))}
                        <span className="text-[8px] font-mono text-muted-foreground/50 ml-auto">{story.source}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* ── RIGHT COLUMN: Trends + Segments ── */}
          <div className="space-y-6">
            {/* Trend Signals */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-3 w-3 text-spice" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-spice">Trend Signals</span>
                <div className="flex-1 h-px bg-spice/[0.06]" />
              </div>

              <div className="space-y-3">
                {trends.map((trend) => {
                  const dir = directionConfig[trend.direction];
                  const DirIcon = dir.icon;
                  return (
                    <div key={trend.id} className="p-3 rounded-sm border border-spice/[0.06] holo-interactive">
                      <div className="flex items-center gap-2 mb-2">
                        <DirIcon className={cn('h-3 w-3', dir.color)} />
                        <span className={cn('text-[8px] font-mono uppercase tracking-wider', dir.color)}>{dir.label}</span>
                        <div className="flex gap-0.5 ml-auto">
                          {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className={cn('w-1 h-3 rounded-full', i < trend.strength ? 'bg-spice/60' : 'bg-surface-overlay')} />
                          ))}
                        </div>
                      </div>
                      <h4 className="font-heading font-semibold text-xs text-foreground mb-1">{trend.title}</h4>
                      <p className="text-[10px] text-muted-foreground leading-relaxed mb-2">{trend.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {trend.entities.slice(0, 3).map((slug) => (
                          <Link key={slug} href={`/entity/${slug}`} className="text-[7px] font-mono text-spice-dim hover:text-spice px-1 py-0.5 rounded-sm border border-spice/[0.04]">
                            {getEntityBySlug(slug)?.name ?? slug}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Market Segments */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="h-3 w-3 text-cyan" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan">Segments</span>
                <div className="flex-1 h-px bg-cyan/10" />
              </div>

              <div className="space-y-3">
                {segments.map((seg) => (
                  <div key={seg.id} className="p-3 rounded-sm border border-spice/[0.06] holo-interactive">
                    <h4 className="font-heading font-semibold text-xs text-foreground mb-1.5">{seg.name}</h4>

                    <div className="space-y-1 mb-2">
                      {seg.metrics.slice(0, 3).map((m) => (
                        <div key={m.label} className="flex items-center justify-between">
                          <span className="text-[9px] text-muted-foreground">{m.label}</span>
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] font-mono font-bold text-spice">{m.value}</span>
                            {m.trend === 'up' && <ArrowUpRight className="h-2.5 w-2.5 text-rank-up" />}
                            {m.trend === 'down' && <ArrowDownRight className="h-2.5 w-2.5 text-rank-down" />}
                            {m.trend === 'flat' && <Minus className="h-2.5 w-2.5 text-muted-foreground" />}
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="text-[9px] text-spice-dim italic leading-relaxed">{seg.hot_take}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Intel Feed Status */}
        <section className="mt-8 p-4 rounded-sm border border-cyan/10 bg-cyan/[0.02]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-cyan font-semibold">Visio Intel Integration</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Market signals, news sentiment, procurement data, and entity scores from Visio Intel&apos;s 100K+ entity database.
            Feeds: company registry, government tenders (OCDS), market signals, news with sentiment analysis, ESG scores.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { label: 'Entities', value: '100K+' },
              { label: 'Signals', value: '50K+' },
              { label: 'News Articles', value: '100K+' },
              { label: 'Tenders', value: '10K+' },
              { label: 'Sync', value: '12h cadence' },
            ].map((s) => (
              <div key={s.label} className="p-2 rounded-sm bg-void/50 border border-cyan/[0.06] text-center">
                <p className="font-mono text-sm font-bold text-cyan">{s.value}</p>
                <p className="text-[8px] font-mono text-muted-foreground uppercase">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[8px] font-mono text-muted-foreground">API: /api/intel/feed | /api/intel/status</span>
            <span className="text-[8px] font-mono text-cyan ml-auto">Powered by Visio Intel (zgsgfghyreaptbpvlhdx)</span>
          </div>
        </section>

        {/* Links */}
        <div className="flex items-center justify-center gap-6 mt-10 pt-6 border-t border-spice/[0.06]">
          <Link href="/briefing" className="text-[10px] font-mono text-spice-dim hover:text-spice flex items-center gap-1">
            Weekly Briefing <ChevronRight className="h-3 w-3" />
          </Link>
          <Link href="/insights" className="text-[10px] font-mono text-spice-dim hover:text-spice flex items-center gap-1">
            Insights <ChevronRight className="h-3 w-3" />
          </Link>
          <Link href="/charts" className="text-[10px] font-mono text-spice-dim hover:text-spice flex items-center gap-1">
            Charts <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
