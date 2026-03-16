import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { getEntityBySlug, staticEntities, staticChartEntries, getScoreBreakdown, getScoreHistory } from '@/lib/data/static-charts';
import { PositionBadge } from '@/components/charts/position-badge';
import { ScoreRadar } from '@/components/charts/score-radar';
import { ScoreBar } from '@/components/charts/score-bar';
import { Sparkline } from '@/components/charts/sparkline';
import { EthicsCard } from '@/components/culture/ethics-card';
import { GenerationalChart } from '@/components/culture/generational-chart';
import { ImpactView } from '@/components/culture/impact-view';
import { MentatAnalysis } from '@/components/holo/mentat-analysis';
import { getEthicsProfile, getGenerationalData, getImpactMap } from '@/lib/data/culture';
import { getInsightsForEntity } from '@/lib/data/insights';
import { InsightCard } from '@/components/insights/insight-card';
import { getRankDelta, formatScore } from '@/lib/scoring/engine';
import { notFound } from 'next/navigation';
import { Globe, MapPin, Tag, ExternalLink, BarChart3, TrendingUp } from 'lucide-react';
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

  const scoreData = getScoreBreakdown(slug);
  const history = getScoreHistory(slug);
  const ethicsProfile = getEthicsProfile(slug);
  const genData = getGenerationalData(slug);
  const impactData = getImpactMap(slug);
  const entityInsights = getInsightsForEntity(slug);

  // Find all chart appearances
  const appearances = Object.entries(staticChartEntries).flatMap(([chartSlug, entries]) =>
    entries
      .filter((e) => e.entity?.slug === slug)
      .map((e) => ({ ...e, chartSlug }))
  );

  // Best rank across all charts
  const bestRank = appearances.length > 0
    ? Math.min(...appearances.map((a) => a.rank))
    : null;

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
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
            {entity.country && (
              <>
                <span>&middot;</span>
                <MapPin className="h-3 w-3 inline" />
                <span>{entity.country}</span>
              </>
            )}
          </div>

          <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
            {entity.name}
          </h1>

          {entity.description && (
            <p className="text-lg text-muted-foreground mt-3 leading-relaxed max-w-3xl">
              {entity.description}
            </p>
          )}

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center gap-6 mt-6">
            {bestRank && (
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-electric" />
                <span className="font-mono font-bold text-xl text-electric">#{bestRank}</span>
                <span className="text-xs text-muted-foreground">best rank</span>
              </div>
            )}
            {scoreData && (
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-cyan" />
                <span className="font-mono font-bold text-xl text-foreground">
                  {formatScore(scoreData.composite)}
                </span>
                <span className="text-xs text-muted-foreground">composite</span>
              </div>
            )}
            {history.length > 0 && (
              <div className="flex items-center gap-2">
                <Sparkline data={history} height={28} width={80} />
                <span className="text-xs text-muted-foreground">4-week trend</span>
              </div>
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

        {/* Two Column: Score Breakdown + Chart Rankings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Score Breakdown */}
          {scoreData && Object.keys(scoreData.scores).length > 0 && (
            <section className="rounded-xl bg-surface border border-white/5 p-6">
              <h2 className="font-heading font-semibold text-lg text-foreground mb-4">
                Score Breakdown
              </h2>
              <ScoreRadar scores={scoreData.scores} />
              <div className="mt-4">
                <ScoreBar scores={scoreData.scores} />
              </div>
            </section>
          )}

          {/* Chart Rankings */}
          {appearances.length > 0 && (
            <section className="rounded-xl bg-surface border border-white/5 p-6">
              <h2 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
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
                      className="flex items-center justify-between p-4 rounded-lg bg-surface-raised/50 border border-white/[0.03] hover:border-electric/20 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-2xl font-bold text-electric">
                          #{entry.rank}
                        </span>
                        <div>
                          <span className="font-medium text-foreground capitalize text-sm">
                            {entry.chartSlug.replace(/-/g, ' ')}
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            <PositionBadge status={entry.status} delta={delta} />
                            <span className="text-xs text-muted-foreground">
                              Peak #{entry.peak_rank} &middot; {entry.weeks_on_chart}w
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-foreground">
                        {formatScore(entry.composite_score)}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* Related Insights */}
        {entityInsights.length > 0 && (
          <div className="mb-10">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-spice mb-3">Related Insights</p>
            <div className="space-y-3">
              {entityInsights.slice(0, 3).map((insight) => (
                <InsightCard key={insight.id} insight={insight} compact />
              ))}
            </div>
          </div>
        )}

        {/* Mentat AI Analysis */}
        <div className="mb-10">
          <MentatAnalysis
            entityName={entity.name}
            entityType={entity.type}
            scores={scoreData?.scores}
            ethics={ethicsProfile ? {
              transparency: ethicsProfile.transparency,
              safety: ethicsProfile.safety_commitment,
              privacy: ethicsProfile.data_privacy,
              openness: ethicsProfile.openness,
            } : undefined}
          />
        </div>

        {/* Cultural Intelligence */}
        {(ethicsProfile || genData || impactData) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {ethicsProfile && (
              <EthicsCard profile={ethicsProfile} entityName={entity.name} />
            )}
            {genData && (
              <GenerationalChart data={genData} entityName={entity.name} />
            )}
          </div>
        )}

        {impactData && (
          <div className="mb-10">
            <ImpactView impact={impactData} entityName={entity.name} />
          </div>
        )}

        {/* Metadata Details */}
        {Object.keys(entity.metadata).length > 0 && (
          <section className="rounded-xl bg-surface border border-white/5 p-6">
            <h2 className="font-heading font-semibold text-lg text-foreground mb-4">Details</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {Object.entries(entity.metadata).map(([key, value]) => (
                <div key={key} className="p-3 rounded-lg bg-surface-raised/50 border border-white/[0.03]">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wide">
                    {key.replace(/_/g, ' ')}
                  </span>
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
