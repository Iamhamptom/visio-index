import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { labDimensions, scoringIntegrity, chartMethodologies } from '@/lib/scoring/methodology';
import { Scale, Database, AlertTriangle, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Methodology | The Visio Index',
  description: 'How we score AI entities. Our data sources, what each dimension measures, and our honesty about what is editorial vs automated.',
};

const qualityColors = { high: 'text-rank-up', medium: 'text-rank-new', low: 'text-rank-down' };

export default function MethodologyPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Scale className="h-4 w-4 text-spice" />
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-spice">Transparency</span>
          </div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground">Methodology</h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl leading-relaxed">
            We publish exactly how we score. What data feeds each dimension. What we measure today vs what we plan to automate. Where our scores are strong and where they&apos;re editorial judgment.
          </p>
        </div>

        {/* ── HONESTY DECLARATION ── */}
        <section className="mb-10 p-5 rounded-sm border border-rank-new/15 bg-rank-new/[0.02]">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-rank-new" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-rank-new font-semibold">Honest Declaration</span>
          </div>
          <p className="text-sm text-foreground leading-relaxed mb-4">
            {scoringIntegrity.description}
          </p>
          <ul className="space-y-2">
            {scoringIntegrity.what_this_means.map((point, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle className="h-3 w-3 text-rank-new mt-1 shrink-0" />
                <span className="text-xs text-muted-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── SCORING ROADMAP ── */}
        <section className="mb-10">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-spice mb-4">Scoring Evolution</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {scoringIntegrity.roadmap.map((phase) => (
              <div key={phase.phase} className={cn(
                'p-4 rounded-sm border',
                phase.status === 'current' ? 'border-spice/20 bg-spice/[0.03]' : 'border-spice/[0.06]'
              )}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={cn(
                    'text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-sm',
                    phase.status === 'current' ? 'bg-spice/15 text-spice' :
                    phase.status === 'planned' ? 'bg-cyan/10 text-cyan' : 'bg-surface text-muted-foreground'
                  )}>
                    {phase.status === 'current' ? 'CURRENT' : phase.status === 'planned' ? 'NEXT' : 'FUTURE'}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">Phase {phase.phase}</span>
                </div>
                <h3 className="font-heading font-semibold text-sm text-foreground mb-1">{phase.name}</h3>
                <p className="text-[10px] text-muted-foreground leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── DIMENSION DEEP DIVE (Top Labs example) ── */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Database className="h-4 w-4 text-spice" />
            <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-spice">Dimension Deep Dive — Top Labs</h2>
          </div>

          <div className="space-y-4">
            {labDimensions.map((dim) => (
              <div key={dim.name} className="rounded-sm border border-spice/[0.06] overflow-hidden">
                <div className="px-4 py-3 border-b border-spice/[0.04] bg-surface/30 flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-semibold text-sm text-foreground capitalize">{dim.name.replace(/_/g, ' ')}</h3>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{dim.description}</p>
                  </div>
                  <span className="font-mono text-lg font-bold text-spice">{dim.weight * 100}%</span>
                </div>

                <div className="p-4 space-y-4">
                  {/* What we measure */}
                  <div>
                    <p className="text-[9px] font-mono uppercase tracking-wider text-spice-dim mb-2">What We Measure</p>
                    <ul className="space-y-1">
                      {dim.what_we_measure.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[8px] text-spice mt-1">&#9632;</span>
                          <span className="text-[11px] text-foreground/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Current data sources */}
                  <div>
                    <p className="text-[9px] font-mono uppercase tracking-wider text-cyan mb-2">Data Sources (Current)</p>
                    <ul className="space-y-1">
                      {dim.data_sources_current.map((source, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-2.5 w-2.5 text-cyan mt-1 shrink-0" />
                          <span className="text-[10px] text-muted-foreground">{source}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Planned data sources */}
                  <div>
                    <p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground/50 mb-2">Data Sources (Planned)</p>
                    <ul className="space-y-1">
                      {dim.data_sources_planned.map((source, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Clock className="h-2.5 w-2.5 text-muted-foreground/40 mt-1 shrink-0" />
                          <span className="text-[10px] text-muted-foreground/60">{source}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Scoring guide */}
                  <div className="p-2 rounded-sm bg-void/50 border border-spice/[0.04]">
                    <p className="text-[9px] font-mono text-spice-dim">{dim.scoring_guide}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PER-CHART METHODOLOGY ── */}
        <section className="mb-10">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-spice mb-4">Chart-by-Chart Scoring</h2>
          <div className="space-y-3">
            {chartMethodologies.map((chart) => (
              <div key={chart.chart_slug} className="rounded-sm border border-spice/[0.06] p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading font-semibold text-sm text-foreground">{chart.chart_name}</h3>
                  <span className={cn('text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-sm border',
                    chart.data_quality === 'high' ? 'border-rank-up/20 text-rank-up bg-rank-up/5' :
                    chart.data_quality === 'medium' ? 'border-rank-new/20 text-rank-new bg-rank-new/5' :
                    'border-rank-down/20 text-rank-down bg-rank-down/5'
                  )}>
                    {chart.data_quality} confidence
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2 mb-3">
                  {chart.dimensions.map((dim) => (
                    <div key={dim.name} className="text-center">
                      <p className="font-mono text-sm font-bold text-spice">{dim.weight}%</p>
                      <p className="text-[8px] text-foreground font-medium">{dim.name}</p>
                      <p className="text-[7px] text-muted-foreground mt-0.5 leading-tight">{dim.measures}</p>
                    </div>
                  ))}
                </div>

                <p className="text-[9px] text-muted-foreground italic">{chart.data_quality_note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── HONESTY PLEDGE ── */}
        <section className="p-5 rounded-sm shield-border bg-spice/[0.02] text-center">
          <p className="text-sm text-foreground/80 leading-relaxed max-w-lg mx-auto italic">
            &ldquo;{scoringIntegrity.honesty_pledge}&rdquo;
          </p>
          <p className="text-[9px] font-mono text-spice-dim mt-3">— Visio Research Labs</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
