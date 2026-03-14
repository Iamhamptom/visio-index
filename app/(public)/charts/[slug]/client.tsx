'use client';

import { useState } from 'react';
import { ChartTable } from '@/components/charts/chart-table';
import { HistoryChart, buildHistoryData } from '@/components/analytics/history-chart';
import { Heatmap } from '@/components/analytics/heatmap';
import { CsvExport } from '@/components/analytics/csv-export';
import { WeekNavigator } from '@/components/analytics/week-navigator';
import { getScoreBreakdown } from '@/lib/data/static-charts';
import { CHART_WEEKS } from '@/lib/data/static-charts';
import type { Chart, ChartEntry } from '@/lib/supabase/types';
import { BarChart3, Calendar, Table2, TrendingUp, Grid3X3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type TabView = 'table' | 'trend' | 'heatmap';

interface ChartDetailClientProps {
  chart: Chart;
  entries: ChartEntry[];
  history: { week_start: string; entries: ChartEntry[] }[];
}

export function ChartDetailClient({ chart, entries, history }: ChartDetailClientProps) {
  const [tab, setTab] = useState<TabView>('table');
  const [selectedWeek, setSelectedWeek] = useState(CHART_WEEKS[CHART_WEEKS.length - 1]);

  // Get entries for selected week
  const weekEntries = selectedWeek === CHART_WEEKS[CHART_WEEKS.length - 1]
    ? entries
    : (history.find((h) => h.week_start === selectedWeek)?.entries ?? entries);

  // Build history data for top 5
  const top5Slugs = entries.slice(0, 5).map((e) => e.entity?.slug).filter(Boolean) as string[];
  const historyForChart: Record<string, typeof history> = { [chart.slug]: history };
  const historyData = buildHistoryData(top5Slugs, historyForChart, chart.slug);

  // Build heatmap data
  const dimensions = Object.keys(chart.scoring_weights);
  const heatmapData = entries
    .map((e) => {
      if (!e.entity) return null;
      const scores = getScoreBreakdown(e.entity.slug);
      if (!scores) return null;
      return { entity: e.entity, scores };
    })
    .filter(Boolean) as { entity: NonNullable<ChartEntry['entity']>; scores: NonNullable<ReturnType<typeof getScoreBreakdown>> }[];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Chart Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <BarChart3 className="h-4 w-4 text-electric" />
          <span className="capitalize">{chart.category} chart</span>
          <span>&middot;</span>
          <span className="capitalize">{chart.frequency}</span>
        </div>
        <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
          {chart.name}
        </h1>
        {chart.description && (
          <p className="text-muted-foreground mt-2 max-w-2xl">{chart.description}</p>
        )}
      </div>

      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-4">
          {/* View Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-surface border border-white/5">
            {[
              { mode: 'table' as const, icon: Table2, label: 'Table' },
              { mode: 'trend' as const, icon: TrendingUp, label: 'Trends' },
              { mode: 'heatmap' as const, icon: Grid3X3, label: 'Heatmap' },
            ].map(({ mode, icon: Icon, label }) => (
              <button
                key={mode}
                onClick={() => setTab(mode)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                  tab === mode ? 'bg-electric/10 text-electric' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>

          {/* Week Navigator (table only) */}
          {tab === 'table' && (
            <WeekNavigator currentWeek={selectedWeek} onWeekChange={setSelectedWeek} />
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Scoring Weights */}
          <div className="hidden lg:flex flex-wrap gap-1.5">
            {Object.entries(chart.scoring_weights).map(([dim, weight]) => (
              <span
                key={dim}
                className="px-2 py-0.5 rounded-full bg-surface border border-white/5 text-[10px] font-mono text-muted-foreground"
              >
                {dim.replace(/_/g, ' ')}: {Math.round((weight as number) * 100)}%
              </span>
            ))}
          </div>

          {/* Actions */}
          <CsvExport entries={weekEntries} chartName={chart.name} />
          <Link
            href={`/compare?entities=${top5Slugs.join(',')}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-white/5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-electric/20 transition-colors"
          >
            Compare Top 5
          </Link>
        </div>
      </div>

      {/* Content */}
      {tab === 'table' && (
        <div className="bg-surface rounded-xl border border-white/5 overflow-hidden">
          <ChartTable entries={weekEntries} weights={chart.scoring_weights} />
        </div>
      )}

      {tab === 'trend' && (
        <div className="space-y-6">
          <div className="bg-surface rounded-xl border border-white/5 p-6">
            <h2 className="font-heading font-semibold text-foreground mb-4">
              Top 5 Score Trend (4 Weeks)
            </h2>
            {historyData.length > 0 ? (
              <HistoryChart data={historyData} mode="score" height={400} />
            ) : (
              <p className="text-muted-foreground text-center py-20">No historical data available.</p>
            )}
          </div>
          <div className="bg-surface rounded-xl border border-white/5 p-6">
            <h2 className="font-heading font-semibold text-foreground mb-4">
              Rank Movement (4 Weeks)
            </h2>
            {historyData.length > 0 ? (
              <HistoryChart data={historyData} mode="rank" height={400} />
            ) : (
              <p className="text-muted-foreground text-center py-20">No historical data available.</p>
            )}
          </div>
        </div>
      )}

      {tab === 'heatmap' && heatmapData.length > 0 && (
        <div className="bg-surface rounded-xl border border-white/5 p-6">
          <h2 className="font-heading font-semibold text-foreground mb-4">
            Score Heatmap — All Dimensions
          </h2>
          <Heatmap entities={heatmapData} dimensions={dimensions} />
        </div>
      )}
    </main>
  );
}
