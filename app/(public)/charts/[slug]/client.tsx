'use client';

import { useState } from 'react';
import { HistoryChart, buildHistoryData } from '@/components/analytics/history-chart';
import { Heatmap } from '@/components/analytics/heatmap';
import { CsvExport } from '@/components/analytics/csv-export';
import { WeekNavigator } from '@/components/analytics/week-navigator';
import { PositionBadge } from '@/components/charts/position-badge';
import { Sparkline } from '@/components/charts/sparkline';
import { getScoreBreakdown, getScoreHistory } from '@/lib/data/static-charts';
import { getMovementNote, getEntityDesignation, getDesignations } from '@/lib/data/chart-notes';
import { getRankDelta, formatScore } from '@/lib/scoring/engine';
import { CHART_WEEKS } from '@/lib/data/static-charts';
import type { Chart, ChartEntry } from '@/lib/supabase/types';
import { Table2, TrendingUp, Grid3X3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type TabView = 'table' | 'trend' | 'heatmap';

interface ChartDetailClientProps {
  chart: Chart;
  entries: ChartEntry[];
  history: { week_start: string; entries: ChartEntry[] }[];
}

const designationStyles: Record<string, string> = {
  hot_shot_debut: 'bg-rank-hot/15 text-rank-hot border-rank-hot/20',
  biggest_gainer: 'bg-rank-up/15 text-rank-up border-rank-up/20',
  biggest_drop: 'bg-rank-down/15 text-rank-down border-rank-down/20',
  longest_run: 'bg-spice/15 text-spice border-spice/20',
  breakthrough: 'bg-cyan/15 text-cyan border-cyan/20',
};

export function ChartDetailClient({ chart, entries, history }: ChartDetailClientProps) {
  const [tab, setTab] = useState<TabView>('table');
  const [selectedWeek, setSelectedWeek] = useState(CHART_WEEKS[CHART_WEEKS.length - 1]);

  const weekEntries = selectedWeek === CHART_WEEKS[CHART_WEEKS.length - 1]
    ? entries
    : (history.find((h) => h.week_start === selectedWeek)?.entries ?? entries);

  const top5Slugs = entries.slice(0, 5).map((e) => e.entity?.slug).filter(Boolean) as string[];
  const historyForChart: Record<string, typeof history> = { [chart.slug]: history };
  const historyData = buildHistoryData(top5Slugs, historyForChart, chart.slug);

  const dimensions = Object.keys(chart.scoring_weights);
  const heatmapData = entries
    .map((e) => {
      if (!e.entity) return null;
      const scores = getScoreBreakdown(e.entity.slug);
      if (!scores) return null;
      return { entity: e.entity, scores };
    })
    .filter(Boolean) as { entity: NonNullable<ChartEntry['entity']>; scores: NonNullable<ReturnType<typeof getScoreBreakdown>> }[];

  const numberOne = weekEntries[0];
  const numberOneNote = numberOne?.entity ? getMovementNote(numberOne.entity.slug) : null;
  const numberOneScores = numberOne?.entity ? getScoreBreakdown(numberOne.entity.slug) : null;
  const designations = getDesignations(chart.slug);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-spice-dim mb-1">
            {chart.category} &middot; {chart.frequency} &middot; {entries.length} ranked
          </p>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground">
            {chart.name}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* View tabs */}
          <div className="flex items-center gap-0.5 p-0.5 rounded-sm bg-surface border border-spice/[0.06]">
            {[
              { mode: 'table' as const, icon: Table2, label: 'Chart' },
              { mode: 'trend' as const, icon: TrendingUp, label: 'Trends' },
              { mode: 'heatmap' as const, icon: Grid3X3, label: 'Heatmap' },
            ].map(({ mode, icon: Icon, label }) => (
              <button
                key={mode}
                onClick={() => setTab(mode)}
                className={cn(
                  'flex items-center gap-1 px-2.5 py-1.5 rounded-sm text-[11px] font-mono uppercase tracking-wider transition-colors',
                  tab === mode ? 'bg-spice/10 text-spice' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className="h-3 w-3" />
                {label}
              </button>
            ))}
          </div>
          <CsvExport entries={weekEntries} chartName={chart.name} />
        </div>
      </div>

      {tab === 'table' && (
        <>
          {/* Week Navigator */}
          <div className="flex items-center justify-between mb-6">
            <WeekNavigator currentWeek={selectedWeek} onWeekChange={setSelectedWeek} />
            {/* Special designations legend */}
            {designations.length > 0 && (
              <div className="hidden md:flex items-center gap-2">
                {designations.slice(0, 3).map((d) => (
                  <span key={d.slug} className={cn('text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-sm border', designationStyles[d.badge])}>
                    {d.label}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* ═══ #1 SPOTLIGHT ═══ */}
          {numberOne?.entity && (
            <div className="mb-8 p-6 rounded-sm shield-border bg-surface/40 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-spice/30 to-transparent" />

              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Big rank */}
                <div className="text-center md:text-left shrink-0">
                  <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-spice-dim mb-1">{chart.name}</p>
                  <p className="font-mono text-7xl font-black holo-number leading-none">#1</p>
                </div>

                {/* Entity info */}
                <div className="flex-1 min-w-0">
                  <Link href={`/entity/${numberOne.entity.slug}`} className="group">
                    <h2 className="font-heading font-bold text-2xl text-foreground group-hover:text-spice transition-colors">
                      {numberOne.entity.name}
                    </h2>
                  </Link>
                  <p className="text-xs text-muted-foreground mt-1">
                    {numberOne.entity.category} &middot; {numberOne.entity.country}
                    &middot; {numberOne.weeks_on_chart}w on chart &middot; Peak #{numberOne.peak_rank}
                  </p>
                  {/* Editorial note — THIS is what makes it Billboard */}
                  {numberOneNote && (
                    <p className="text-sm text-foreground/70 mt-3 leading-relaxed max-w-xl italic">
                      &ldquo;{numberOneNote}&rdquo;
                    </p>
                  )}
                </div>

                {/* Score + dimensions */}
                <div className="shrink-0 text-right">
                  <p className="font-mono text-4xl font-black holo-number">{formatScore(numberOne.composite_score)}</p>
                  {numberOneScores && (
                    <div className="mt-3 space-y-1">
                      {Object.entries(numberOneScores.scores).map(([dim, val]) => (
                        <div key={dim} className="flex items-center gap-2 justify-end">
                          <span className="text-[9px] text-muted-foreground capitalize w-16 text-right truncate">
                            {dim.replace(/_/g, ' ')}
                          </span>
                          <div className="w-16 h-[3px] rounded-full bg-surface-overlay overflow-hidden">
                            <div className="h-full rounded-full bg-spice/50" style={{ width: `${val}%` }} />
                          </div>
                          <span className="font-mono text-[10px] text-spice-dim w-5">{val}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ═══ THE CHART ═══ */}
          <div className="rounded-sm border border-spice/[0.06] overflow-hidden">
            {/* Scoring weights header */}
            <div className="flex items-center gap-3 px-4 py-2 border-b border-spice/[0.04] bg-surface/30">
              <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-spice-dim">Scoring:</span>
              {Object.entries(chart.scoring_weights).map(([dim, weight]) => (
                <span key={dim} className="text-[9px] font-mono text-muted-foreground">
                  {dim.replace(/_/g, ' ')} <span className="text-spice-dim">{Math.round((weight as number) * 100)}%</span>
                </span>
              ))}
            </div>

            {/* Table */}
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-spice/[0.06]">
                  <th className="text-left py-2 px-3 text-[9px] font-mono uppercase tracking-wider text-spice-dim w-10">#</th>
                  <th className="text-left py-2 px-1 text-[9px] font-mono uppercase tracking-wider text-spice-dim w-12"></th>
                  <th className="text-left py-2 px-3 text-[9px] font-mono uppercase tracking-wider text-spice-dim">Entity</th>
                  <th className="text-center py-2 px-1 text-[9px] font-mono uppercase tracking-wider text-spice-dim hidden md:table-cell w-10">LW</th>
                  <th className="text-center py-2 px-1 text-[9px] font-mono uppercase tracking-wider text-spice-dim hidden md:table-cell w-10">PK</th>
                  <th className="text-center py-2 px-1 text-[9px] font-mono uppercase tracking-wider text-spice-dim hidden md:table-cell w-10">WK</th>
                  <th className="text-center py-2 px-2 w-14"></th>
                  <th className="text-right py-2 px-3 text-[9px] font-mono uppercase tracking-wider text-spice w-14">Score</th>
                </tr>
              </thead>
              <tbody>
                {weekEntries.slice(1).map((entry, idx) => {
                  const delta = getRankDelta(entry.rank, entry.previous_rank);
                  const historyData = entry.entity ? getScoreHistory(entry.entity.slug) : [];
                  const note = entry.entity ? getMovementNote(entry.entity.slug) : null;
                  const designation = entry.entity ? getEntityDesignation(chart.slug, entry.entity.slug) : null;
                  const isGroupBreak = entry.rank === 11;

                  return (
                    <tr
                      key={entry.rank}
                      className={cn(
                        'border-b transition-colors hover:bg-spice/[0.015] group',
                        isGroupBreak ? 'border-spice/[0.08]' : 'border-spice/[0.02]',
                      )}
                    >
                      {/* Rank */}
                      <td className="py-2.5 px-3">
                        <span className={cn(
                          'font-mono text-sm font-bold',
                          entry.rank <= 3 ? 'text-spice' : 'text-muted-foreground'
                        )}>
                          {String(entry.rank).padStart(2, '0')}
                        </span>
                      </td>

                      {/* Movement */}
                      <td className="py-2.5 px-1">
                        <PositionBadge status={entry.status} delta={delta} />
                      </td>

                      {/* Entity + editorial note */}
                      <td className="py-2.5 px-3">
                        {entry.entity ? (
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <Link href={`/entity/${entry.entity.slug}`} className="font-medium text-[13px] text-foreground group-hover:text-spice transition-colors truncate">
                                {entry.entity.name}
                              </Link>
                              {designation && (
                                <span className={cn('text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-sm border shrink-0', designationStyles[designation.badge])}>
                                  {designation.label}
                                </span>
                              )}
                            </div>
                            {note && (
                              <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1 max-w-md">
                                {note}
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>

                      {/* Last Week */}
                      <td className="py-2.5 px-1 text-center hidden md:table-cell">
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {entry.previous_rank ?? '—'}
                        </span>
                      </td>

                      {/* Peak */}
                      <td className="py-2.5 px-1 text-center hidden md:table-cell">
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {entry.peak_rank}
                        </span>
                      </td>

                      {/* Weeks */}
                      <td className="py-2.5 px-1 text-center hidden md:table-cell">
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {entry.weeks_on_chart}
                        </span>
                      </td>

                      {/* Sparkline */}
                      <td className="py-2.5 px-2 text-center">
                        <Sparkline data={historyData} height={16} width={40} color="#D4A843" />
                      </td>

                      {/* Score */}
                      <td className="py-2.5 px-3 text-right">
                        <span className="font-mono text-sm font-bold text-spice">
                          {formatScore(entry.composite_score)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Chart legend */}
            <div className="flex flex-wrap items-center gap-4 px-4 py-3 border-t border-spice/[0.06] bg-surface/20 text-[9px] font-mono text-muted-foreground">
              <span>LW = Last Week</span>
              <span>PK = Peak Position</span>
              <span>WK = Weeks on Chart</span>
              <span className="w-px h-3 bg-spice/[0.06]" />
              <span className="text-rank-up">&#9650; = Rising</span>
              <span className="text-rank-down">&#9660; = Falling</span>
              <span className="text-rank-new">&#9733; = New Entry</span>
              <span className="text-rank-hot">&#9733; = Hot Shot</span>
            </div>
          </div>
        </>
      )}

      {tab === 'trend' && (
        <div className="space-y-6">
          <div className="rounded-sm border border-spice/[0.06] p-6 bg-surface/20">
            <h2 className="font-heading font-semibold text-foreground mb-4">Score Trajectory — Top 5</h2>
            {historyData.length > 0 ? (
              <HistoryChart data={historyData} mode="score" height={400} />
            ) : (
              <p className="text-muted-foreground text-center py-20">No historical data.</p>
            )}
          </div>
          <div className="rounded-sm border border-spice/[0.06] p-6 bg-surface/20">
            <h2 className="font-heading font-semibold text-foreground mb-4">Rank Movement — Top 5</h2>
            {historyData.length > 0 ? (
              <HistoryChart data={historyData} mode="rank" height={400} />
            ) : (
              <p className="text-muted-foreground text-center py-20">No historical data.</p>
            )}
          </div>
        </div>
      )}

      {tab === 'heatmap' && heatmapData.length > 0 && (
        <div className="rounded-sm border border-spice/[0.06] p-6 bg-surface/20">
          <h2 className="font-heading font-semibold text-foreground mb-4">Score Heatmap</h2>
          <Heatmap entities={heatmapData} dimensions={dimensions} />
        </div>
      )}
    </main>
  );
}
