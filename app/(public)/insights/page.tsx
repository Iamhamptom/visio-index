import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { InsightCard } from '@/components/insights/insight-card';
import { getAllInsights, getBreakingInsights } from '@/lib/data/insights';
import { Brain, Radio } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Insights | The Visio Index',
  description: 'Real-time analysis of the AI industry. Breaking developments, market shifts, and cultural signals.',
};

export default function InsightsPage() {
  const breaking = getBreakingInsights();
  const all = getAllInsights();

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="h-4 w-4 text-spice" />
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-spice">Visio Research Labs</span>
          </div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground">Live Insights</h1>
          <p className="text-xs text-muted-foreground mt-1">
            What the charts tell us. Breaking analysis, market shifts, and cultural signals from the AI industry.
          </p>
        </div>

        {/* Breaking */}
        {breaking.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Radio className="h-3.5 w-3.5 text-rank-down animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-rank-down">Breaking & Shifts</span>
              <div className="flex-1 h-px bg-rank-down/10" />
            </div>
            <div className="space-y-4">
              {breaking.map((insight) => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </div>
          </section>
        )}

        {/* All Insights */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-spice">All Intelligence</span>
            <div className="flex-1 h-px bg-spice/[0.06]" />
            <span className="text-[10px] font-mono text-muted-foreground">{all.length} insights</span>
          </div>
          <div className="space-y-4 stagger-children">
            {all.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
