import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { BarChart3, Scale, Database, Globe, Users, Lightbulb } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Methodology | The Visio Index',
  description: 'How we rank AI labs, models, tools, and creators. Our composite scoring methodology explained.',
};

const dimensions = [
  {
    chart: 'Top Labs',
    weights: [
      { name: 'Model Performance', weight: 25, source: 'LMSYS Arena, HuggingFace benchmarks', icon: BarChart3 },
      { name: 'Adoption/Usage', weight: 25, source: 'Web traffic, downloads, API calls', icon: Users },
      { name: 'Investment/Revenue', weight: 20, source: 'Funding, valuations, revenue signals', icon: Scale },
      { name: 'Cultural Impact', weight: 15, source: 'Media mentions, social buzz, creator adoption', icon: Globe },
      { name: 'Innovation', weight: 15, source: 'Papers, patents, open source contributions', icon: Lightbulb },
    ],
  },
  {
    chart: 'Top Models',
    weights: [
      { name: 'Benchmark Performance', weight: 30, source: 'MMLU, SWE-Bench, HumanEval, Arena Elo', icon: BarChart3 },
      { name: 'Adoption', weight: 25, source: 'API calls, SDK downloads, integrations', icon: Users },
      { name: 'Developer Sentiment', weight: 20, source: 'GitHub stars, Reddit/SO mentions', icon: Scale },
      { name: 'Speed/Cost Efficiency', weight: 15, source: 'Tokens/sec, cost per million tokens', icon: Database },
      { name: 'Cultural Buzz', weight: 10, source: 'Social mentions, memes, creator adoption', icon: Globe },
    ],
  },
  {
    chart: 'Top Tools',
    weights: [
      { name: 'Usage', weight: 30, source: 'MAU, DAU, page views, downloads', icon: Users },
      { name: 'Growth', weight: 25, source: 'Month-over-month user growth', icon: BarChart3 },
      { name: 'Features', weight: 20, source: 'Capability breadth, unique features', icon: Lightbulb },
      { name: 'Developer Love', weight: 15, source: 'NPS, reviews, community sentiment', icon: Scale },
      { name: 'Cultural Buzz', weight: 10, source: 'Social media mentions, creator coverage', icon: Globe },
    ],
  },
  {
    chart: 'Top Creators',
    weights: [
      { name: 'Cross-Platform Reach', weight: 30, source: 'YouTube + X + LinkedIn + TikTok followers', icon: Globe },
      { name: 'Engagement Rate', weight: 25, source: 'Normalized likes, comments, shares', icon: Users },
      { name: 'Content Quality', weight: 20, source: 'Editorial scoring, community ratings', icon: Scale },
      { name: 'Influence', weight: 15, source: 'Citations by peers, media appearances', icon: Lightbulb },
      { name: 'Consistency', weight: 10, source: 'Posting frequency, streak', icon: BarChart3 },
    ],
  },
];

export default function MethodologyPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Scale className="h-4 w-4 text-electric" />
            <span>Transparency</span>
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
            Methodology
          </h1>
          <p className="text-lg text-muted-foreground mt-3 leading-relaxed max-w-2xl">
            The Visio Index uses composite scoring — multiple data dimensions weighted into one
            definitive score, updated weekly. Like Billboard combines streaming + radio + sales
            into the Hot 100, we combine performance + adoption + cultural impact into our charts.
          </p>
        </div>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-6">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { step: '01', title: 'Collect', desc: 'Raw data from 25+ sources — benchmarks, APIs, social media, funding databases, web traffic.' },
              { step: '02', title: 'Normalize', desc: 'All metrics normalized to a 0-100 scale using min-max normalization across the entity set.' },
              { step: '03', title: 'Weight & Rank', desc: 'Weighted composite scoring per chart category. Final scores produce the definitive weekly ranking.' },
            ].map((item) => (
              <div key={item.step} className="p-6 rounded-xl bg-surface border border-white/5">
                <span className="font-mono text-3xl font-bold text-electric/30">{item.step}</span>
                <h3 className="font-heading font-semibold text-foreground mt-2 mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Per-Chart Breakdown */}
        <section>
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-6">
            Scoring by Chart
          </h2>
          <div className="space-y-8">
            {dimensions.map((d) => (
              <div key={d.chart} className="rounded-xl bg-surface border border-white/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5">
                  <h3 className="font-heading font-semibold text-lg text-foreground">{d.chart}</h3>
                </div>
                <div className="divide-y divide-white/[0.03]">
                  {d.weights.map((w) => {
                    const Icon = w.icon;
                    return (
                      <div key={w.name} className="flex items-center gap-4 px-6 py-4">
                        <Icon className="h-4 w-4 text-electric shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-foreground">{w.name}</span>
                            <span className="font-mono text-sm font-bold text-electric">{w.weight}%</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{w.source}</p>
                          {/* Weight bar */}
                          <div className="mt-2 h-1.5 rounded-full bg-surface-overlay overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-electric to-cyan"
                              style={{ width: `${w.weight * 3.33}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Powered By */}
        <section className="mt-16 p-8 rounded-xl bg-gradient-to-br from-electric/5 to-cyan/5 border border-electric/10 text-center">
          <h2 className="font-heading font-semibold text-xl text-foreground mb-2">
            Powered by Visio Research Labs
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Our methodology is developed and maintained by Visio Research Labs, VisioCorp&apos;s
            dedicated AI research and intelligence division. Data intelligence by Visio Intel.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
