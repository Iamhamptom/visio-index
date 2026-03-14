import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ChartDetailClient } from './client';
import { getChartBySlug, getEntriesByChartSlug, staticCharts, chartHistory } from '@/lib/data/static-charts';
import { notFound } from 'next/navigation';
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
  const history = chartHistory[slug] ?? [];

  return (
    <>
      <Navbar />
      <ChartDetailClient chart={chart} entries={entries} history={history} />
      <Footer />
    </>
  );
}
