'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { StatsBar } from '@/components/analytics/stats-bar';
import { ScatterPlot } from '@/components/analytics/scatter-plot';
import { Heatmap } from '@/components/analytics/heatmap';
import { HistoryChart, buildHistoryData } from '@/components/analytics/history-chart';
import { staticEntities, getScoreBreakdown, chartHistory } from '@/lib/data/static-charts';
import { labScores, modelScores, toolScores } from '@/lib/data/seed';
import type { EntityType } from '@/lib/supabase/types';
import { BarChart3, Grid3X3, GitCompare, TrendingUp, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

type ViewMode = 'scatter' | 'heatmap' | 'trend';

const entityTypeOptions: { value: EntityType | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'lab', label: 'Labs' },
  { value: 'model', label: 'Models' },
  { value: 'tool', label: 'Tools' },
  { value: 'creator', label: 'Creators' },
];

const labDimensions = ['performance', 'adoption', 'investment', 'cultural_impact', 'innovation'];
const modelDimensions = ['benchmarks', 'adoption', 'developer_sentiment', 'efficiency', 'buzz'];
const toolDimensions = ['usage', 'growth', 'features', 'developer_love', 'buzz'];

export default function ExplorePage() {
  const [view, setView] = useState<ViewMode>('scatter');
  const [entityType, setEntityType] = useState<EntityType | 'all'>('lab');
  const [xDim, setXDim] = useState('adoption');
  const [yDim, setYDim] = useState('performance');

  // Get entities with scores
  const filteredEntities = staticEntities
    .filter((e) => entityType === 'all' || e.type === entityType)
    .map((entity) => {
      const scores = getScoreBreakdown(entity.slug);
      return scores ? { entity, scores } : null;
    })
    .filter(Boolean) as { entity: typeof staticEntities[0]; scores: NonNullable<ReturnType<typeof getScoreBreakdown>> }[];

  // Get dimensions for current type
  const dimensions =
    entityType === 'lab' ? labDimensions :
    entityType === 'model' ? modelDimensions :
    entityType === 'tool' ? toolDimensions :
    labDimensions;

  // Top 5 for history chart
  const top5Slugs = filteredEntities.slice(0, 5).map((e) => e.entity.slug);
  const chartSlug =
    entityType === 'lab' ? 'top-labs' :
    entityType === 'model' ? 'top-models' :
    entityType === 'tool' ? 'top-tools' :
    'top-labs';
  const historyData = buildHistoryData(top5Slugs, chartHistory, chartSlug);

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <BarChart3 className="h-4 w-4 text-electric" />
            <span>Analytics</span>
          </div>
          <h1 className="font-heading font-bold text-3xl text-foreground">Explore</h1>
          <p className="text-muted-foreground mt-1">Interactive analytics across all AI entities and dimensions.</p>
        </div>

        {/* Stats Dashboard */}
        <div className="mb-8">
          <StatsBar />
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-white/5">
          {/* View Mode */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-surface border border-white/5">
            {[
              { mode: 'scatter' as const, icon: GitCompare, label: 'Scatter' },
              { mode: 'heatmap' as const, icon: Grid3X3, label: 'Heatmap' },
              { mode: 'trend' as const, icon: TrendingUp, label: 'Trends' },
            ].map(({ mode, icon: Icon, label }) => (
              <button
                key={mode}
                onClick={() => setView(mode)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                  view === mode ? 'bg-electric/10 text-electric' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>

          {/* Entity Type Filter */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-surface border border-white/5">
            {entityTypeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setEntityType(opt.value as EntityType | 'all');
                  // Reset dimensions for new type
                  if (opt.value === 'model') { setXDim('adoption'); setYDim('benchmarks'); }
                  else if (opt.value === 'tool') { setXDim('growth'); setYDim('usage'); }
                  else { setXDim('adoption'); setYDim('performance'); }
                }}
                className={cn(
                  'px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                  entityType === opt.value ? 'bg-cyan/10 text-cyan' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Dimension Selectors (scatter only) */}
          {view === 'scatter' && (
            <>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">X:</span>
                <select
                  value={xDim}
                  onChange={(e) => setXDim(e.target.value)}
                  className="bg-surface border border-white/5 rounded-md px-2 py-1 text-xs text-foreground outline-none"
                >
                  {dimensions.map((d) => (
                    <option key={d} value={d}>{d.replace(/_/g, ' ')}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Y:</span>
                <select
                  value={yDim}
                  onChange={(e) => setYDim(e.target.value)}
                  className="bg-surface border border-white/5 rounded-md px-2 py-1 text-xs text-foreground outline-none"
                >
                  {dimensions.map((d) => (
                    <option key={d} value={d}>{d.replace(/_/g, ' ')}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          <span className="text-xs text-muted-foreground ml-auto flex items-center gap-1">
            <Layers className="h-3 w-3" />
            {filteredEntities.length} entities
          </span>
        </div>

        {/* Visualization */}
        <div className="rounded-xl bg-surface border border-white/5 p-6">
          {view === 'scatter' && (
            <>
              <h2 className="font-heading font-semibold text-foreground mb-4">
                {yDim.replace(/_/g, ' ')} vs {xDim.replace(/_/g, ' ')}
              </h2>
              <ScatterPlot
                entities={filteredEntities}
                xDimension={xDim}
                yDimension={yDim}
                height={500}
              />
            </>
          )}

          {view === 'heatmap' && (
            <>
              <h2 className="font-heading font-semibold text-foreground mb-4">
                Score Heatmap — {entityType === 'all' ? 'All Entities' : entityType + 's'}
              </h2>
              <Heatmap entities={filteredEntities} dimensions={dimensions} />
            </>
          )}

          {view === 'trend' && (
            <>
              <h2 className="font-heading font-semibold text-foreground mb-4">
                Top 5 Score Trend (4 Weeks)
              </h2>
              {historyData.length > 0 ? (
                <HistoryChart data={historyData} mode="score" height={400} />
              ) : (
                <p className="text-muted-foreground text-center py-20">No trend data for this category.</p>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
