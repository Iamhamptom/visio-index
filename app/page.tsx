import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/home/hero';
import { TrendingStrip } from '@/components/home/trending-strip';
import { ChartCard } from '@/components/charts/chart-card';
import { getFeaturedCharts, getEntriesByChartSlug, getAllTrendingEntries } from '@/lib/data/static-charts';

export default function HomePage() {
  const featuredCharts = getFeaturedCharts();
  const trending = getAllTrendingEntries();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrendingStrip entries={trending} />

        {/* Featured Charts Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground">
                Featured Charts
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Updated weekly &middot; Composite scoring methodology
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredCharts.map((chart) => (
              <ChartCard
                key={chart.id}
                chart={chart}
                entries={getEntriesByChartSlug(chart.slug)}
              />
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="border-t border-white/5 bg-surface/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground">
                Why The Visio Index?
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Existing AI rankings serve engineers and investors. The Visio Index serves <strong className="text-foreground">culture</strong> — making AI rankings accessible, regional, and relevant to mainstream audiences the way Billboard does for music.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
                {[
                  { title: 'Composite Scoring', desc: 'Multiple data dimensions weighted into one definitive score.' },
                  { title: 'Cultural Lens', desc: 'Not just benchmarks — cultural impact, buzz, and adoption.' },
                  { title: 'Regional Charts', desc: 'The first African AI rankings. Country-level breakdowns.' },
                ].map((item) => (
                  <div key={item.title} className="p-6 rounded-xl bg-surface border border-white/5">
                    <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
