import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { getCurrentBriefing } from '@/lib/data/weekly-briefing';
import { getEntityBySlug } from '@/lib/data/static-charts';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Radio, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Weekly Intelligence Briefing | The Visio Index',
  description: 'The definitive weekly AI intelligence report. Models, funding, products, policy, culture — everything that moved.',
};

const importanceStyles = {
  critical: 'border-l-2 border-l-rank-down bg-rank-down/[0.02]',
  high: 'border-l-2 border-l-spice bg-spice/[0.01]',
  medium: 'border-l-2 border-l-spice/30',
  low: 'border-l-2 border-l-surface-overlay',
};

const outlookColors = {
  bullish: 'text-rank-up bg-rank-up/8',
  bearish: 'text-rank-down bg-rank-down/8',
  neutral: 'text-muted-foreground bg-surface',
  volatile: 'text-rank-new bg-rank-new/8',
};

export default function BriefingPage() {
  const briefing = getCurrentBriefing();

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Radio className="h-3.5 w-3.5 text-rank-down animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-rank-down">Weekly Intelligence Briefing</span>
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
            {briefing.title}
          </h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-xs font-mono text-muted-foreground">
              {new Date(briefing.week_start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — {new Date(briefing.week_end).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <span className={cn('text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-sm', outlookColors[briefing.verdict.outlook])}>
              Outlook: {briefing.verdict.outlook}
            </span>
          </div>
        </div>

        {/* Week Stats */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-8">
          {[
            { label: 'Models', value: briefing.stats.models_released },
            { label: 'Funding', value: briefing.stats.funding_total },
            { label: 'Moved', value: briefing.stats.entities_moved },
            { label: 'New', value: briefing.stats.new_entries },
            { label: 'ArXiv Papers', value: briefing.stats.arxiv_papers.toLocaleString() },
            { label: 'GH Trending', value: briefing.stats.github_trending },
          ].map((stat) => (
            <div key={stat.label} className="p-2.5 rounded-sm border border-spice/[0.06] text-center">
              <p className="font-mono text-base font-bold text-spice">{stat.value}</p>
              <p className="text-[8px] font-mono text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Chairman's Signal */}
        <section className="mb-8 p-5 rounded-sm bg-spice/[0.03] border border-spice/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-spice/40 to-transparent" />
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-spice font-semibold">Chairman&apos;s Signal</span>
          </div>
          <h3 className="font-heading font-bold text-lg text-foreground leading-snug mb-3">
            {briefing.chairmans_signal.headline}
          </h3>
          <p className="text-sm text-foreground/80 leading-relaxed">
            {briefing.chairmans_signal.body}
          </p>
        </section>

        {/* Executive Summary */}
        <section className="mb-10 p-5 rounded-sm shield-border bg-surface/30">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-spice mb-4">Executive Summary</h2>
          <ol className="space-y-3">
            {briefing.executive_summary.map((point, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-mono text-sm font-bold text-spice shrink-0 w-5">{i + 1}.</span>
                <p className="text-sm text-foreground leading-relaxed">{point}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Sections */}
        {briefing.sections.map((section) => (
          <section key={section.id} className="mb-10">
            <div className="flex items-center gap-3 mb-4 pb-2 border-b border-spice/[0.06]">
              <span className="text-lg">{section.icon}</span>
              <h2 className="text-[11px] font-mono uppercase tracking-[0.15em] text-spice font-semibold">{section.title}</h2>
              <span className="text-[9px] font-mono text-muted-foreground ml-auto">{section.items.length} items</span>
            </div>

            <div className="space-y-4">
              {section.items.map((item, i) => (
                <div key={i} className={cn('p-4 rounded-sm', importanceStyles[item.importance])}>
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-semibold text-sm text-foreground leading-snug">
                        {item.headline}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">
                        {item.body}
                      </p>

                      {/* Data points */}
                      {item.data && item.data.length > 0 && (
                        <div className="flex flex-wrap gap-3 mt-3">
                          {item.data.map((dp) => (
                            <div key={dp.label} className="flex items-center gap-1.5">
                              <span className="text-[9px] font-mono text-muted-foreground uppercase">{dp.label}:</span>
                              <span className="text-[11px] font-mono font-bold text-spice">{dp.value}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Related entities */}
                      {item.entities.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {item.entities.map((slug) => {
                            const entity = getEntityBySlug(slug);
                            return (
                              <Link
                                key={slug}
                                href={`/entity/${slug}`}
                                className="text-[9px] font-mono text-spice-dim hover:text-spice px-1.5 py-0.5 rounded-sm border border-spice/[0.04] hover:border-spice/15 transition-colors"
                              >
                                {entity?.name ?? slug.replace(/-/g, ' ')}
                              </Link>
                            );
                          })}
                        </div>
                      )}

                      {/* Source */}
                      {item.source && (
                        <p className="text-[9px] font-mono text-muted-foreground/60 mt-2">Source: {item.source}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Contrarian Corner */}
        <section className="mb-8 p-5 rounded-sm border border-rank-new/10 bg-rank-new/[0.02]">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-rank-new font-semibold">Contrarian Corner</span>
            <span className="text-[9px] text-muted-foreground font-mono">— The take nobody wants to hear</span>
          </div>
          <h3 className="font-heading font-bold text-base text-foreground leading-snug mb-2">
            {briefing.contrarian_corner.headline}
          </h3>
          <p className="text-xs text-foreground/70 leading-relaxed">
            {briefing.contrarian_corner.body}
          </p>
        </section>

        {/* Week Ahead */}
        <section className="mb-8 p-5 rounded-sm border border-spice/[0.06]">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-spice mb-4">Week Ahead</h2>
          <ul className="space-y-2">
            {briefing.week_ahead.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-spice-dim font-mono text-xs shrink-0">→</span>
                <p className="text-xs text-foreground/80 leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* The Visio Verdict */}
        <section className="p-6 rounded-sm shield-border bg-spice/[0.02] mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-spice">The Visio Verdict</span>
            <span className={cn('text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-sm ml-auto', outlookColors[briefing.verdict.outlook])}>
              {briefing.verdict.outlook}
            </span>
          </div>
          <h3 className="font-heading font-bold text-xl text-foreground mb-3">{briefing.verdict.title}</h3>
          <p className="text-sm text-foreground/80 leading-relaxed">{briefing.verdict.body}</p>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between py-4 border-t border-spice/[0.06]">
          <Link href="/insights" className="text-[10px] font-mono text-spice-dim hover:text-spice flex items-center gap-1">
            Live Insights <ChevronRight className="h-3 w-3" />
          </Link>
          <Link href="/charts" className="text-[10px] font-mono text-spice-dim hover:text-spice flex items-center gap-1">
            All Charts <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
