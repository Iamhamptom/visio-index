import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { getEntityBySlug, staticEntities, staticChartEntries } from '@/lib/data/static-charts';
import { PositionBadge } from '@/components/charts/position-badge';
import { getRankDelta, formatScore } from '@/lib/scoring/engine';
import { notFound } from 'next/navigation';
import { Globe, MapPin, Tag, ExternalLink, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entity = getEntityBySlug(slug);
  if (!entity) return { title: 'Entity Not Found' };
  return {
    title: `${entity.name} | The Visio Index`,
    description: entity.description ?? `${entity.name} profile on The Visio Index.`,
  };
}

export function generateStaticParams() {
  return staticEntities.map((e) => ({ slug: e.slug }));
}

export default async function EntityProfilePage({ params }: Props) {
  const { slug } = await params;
  const entity = getEntityBySlug(slug);
  if (!entity) notFound();

  // Find all chart appearances
  const appearances = Object.entries(staticChartEntries).flatMap(([chartSlug, entries]) =>
    entries
      .filter((e) => e.entity?.slug === slug)
      .map((e) => ({ ...e, chartSlug }))
  );

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Entity Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <span className="px-2 py-0.5 rounded bg-electric/10 text-electric text-xs font-medium uppercase">
              {entity.type}
            </span>
            {entity.category && (
              <>
                <span>&middot;</span>
                <span>{entity.category}</span>
              </>
            )}
          </div>

          <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
            {entity.name}
          </h1>

          {entity.description && (
            <p className="text-lg text-muted-foreground mt-3 leading-relaxed">
              {entity.description}
            </p>
          )}

          {/* Meta Row */}
          <div className="flex flex-wrap gap-4 mt-6">
            {entity.country && (
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {entity.country} &middot; {entity.region}
              </span>
            )}
            {entity.website && (
              <a
                href={entity.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-electric hover:text-cyan transition-colors"
              >
                <Globe className="h-3.5 w-3.5" />
                Website
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          {/* Tags */}
          {entity.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {entity.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface border border-white/5 text-xs text-muted-foreground"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Chart Appearances */}
        {appearances.length > 0 && (
          <section>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-electric" />
              Chart Rankings
            </h2>
            <div className="space-y-3">
              {appearances.map((entry) => {
                const delta = getRankDelta(entry.rank, entry.previous_rank);
                return (
                  <Link
                    key={entry.chartSlug}
                    href={`/charts/${entry.chartSlug}`}
                    className="flex items-center justify-between p-4 rounded-xl bg-surface border border-white/5 hover:border-electric/20 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-2xl font-bold text-electric">
                        #{entry.rank}
                      </span>
                      <div>
                        <span className="font-medium text-foreground capitalize">
                          {entry.chartSlug.replace(/-/g, ' ')}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <PositionBadge status={entry.status} delta={delta} />
                          <span className="text-xs text-muted-foreground">
                            Peak: #{entry.peak_rank} &middot; {entry.weeks_on_chart}w on chart
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-lg text-foreground">
                      {formatScore(entry.composite_score)}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Metadata */}
        {Object.keys(entity.metadata).length > 0 && (
          <section className="mt-10">
            <h2 className="font-heading font-semibold text-xl text-foreground mb-4">Details</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(entity.metadata).map(([key, value]) => (
                <div key={key} className="p-3 rounded-lg bg-surface border border-white/5">
                  <span className="text-xs text-muted-foreground capitalize">{key.replace(/_/g, ' ')}</span>
                  <p className="font-mono text-sm font-medium text-foreground mt-1">{String(value)}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
