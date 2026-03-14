import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ChartCard } from '@/components/charts/chart-card';
import { staticCharts, getEntriesByChartSlug } from '@/lib/data/static-charts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Charts | The Visio Index',
  description: 'Browse all AI ranking charts — labs, models, tools, creators, and more.',
};

export default function ChartsPage() {
  const majorCharts = staticCharts.filter((c) => c.category === 'major');
  const genreCharts = staticCharts.filter((c) => c.category === 'genre');

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10">
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground">All Charts</h1>
          <p className="text-muted-foreground mt-2">
            Composite rankings updated weekly by Visio Research Labs.
          </p>
        </div>

        {/* Major Charts */}
        <section className="mb-12">
          <h2 className="font-heading font-semibold text-xl text-foreground mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-electric" />
            Major Charts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {majorCharts.map((chart) => (
              <ChartCard
                key={chart.id}
                chart={chart}
                entries={getEntriesByChartSlug(chart.slug)}
              />
            ))}
          </div>
        </section>

        {/* Genre Charts */}
        {genreCharts.length > 0 && (
          <section>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan" />
              Genre Charts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {genreCharts.map((chart) => (
                <ChartCard
                  key={chart.id}
                  chart={chart}
                  entries={getEntriesByChartSlug(chart.slug)}
                />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
