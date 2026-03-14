import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ChartTable } from '@/components/charts/chart-table';
import { getChartBySlug, getEntriesByChartSlug, staticCharts } from '@/lib/data/static-charts';
import { notFound } from 'next/navigation';
import { Calendar, BarChart3 } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const chart = getChartBySlug(slug);
  if (!chart) return { title: 'Chart Not Found' };
  return {
    title: `${chart.name} | The Visio Index`,
    description: chart.description ?? `${chart.name} — weekly AI rankings.`,
  };
}

export function generateStaticParams() {
  return staticCharts.map((c) => ({ slug: c.slug }));
}

export default async function ChartDetailPage({ params }: Props) {
  const { slug } = await params;
  const chart = getChartBySlug(slug);
  if (!chart) notFound();

  const entries = getEntriesByChartSlug(slug);

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Chart Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <BarChart3 className="h-4 w-4 text-electric" />
            <span className="capitalize">{chart.category} chart</span>
            <span>&middot;</span>
            <Calendar className="h-3.5 w-3.5" />
            <span>Week of March 9, 2026</span>
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
            {chart.name}
          </h1>
          {chart.description && (
            <p className="text-muted-foreground mt-2 max-w-2xl">{chart.description}</p>
          )}
        </div>

        {/* Scoring Weights */}
        <div className="flex flex-wrap gap-2 mb-8">
          {Object.entries(chart.scoring_weights).map(([dim, weight]) => (
            <span
              key={dim}
              className="px-3 py-1 rounded-full bg-surface border border-white/5 text-xs font-mono text-muted-foreground"
            >
              {dim.replace(/_/g, ' ')}: {Math.round((weight as number) * 100)}%
            </span>
          ))}
        </div>

        {/* The Chart Table */}
        <div className="bg-surface rounded-xl border border-white/5 overflow-hidden">
          <ChartTable entries={entries} weights={chart.scoring_weights} />
        </div>
      </main>
      <Footer />
    </>
  );
}
