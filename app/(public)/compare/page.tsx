'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ScoreRadar } from '@/components/charts/score-radar';
import { ScoreBar } from '@/components/charts/score-bar';
import { Sparkline } from '@/components/charts/sparkline';
import { HistoryChart, buildHistoryData } from '@/components/analytics/history-chart';
import { searchEntities, getScoreBreakdown, getScoreHistory, chartHistory, staticChartEntries } from '@/lib/data/static-charts';
import { formatScore } from '@/lib/scoring/engine';
import { Search, X, Plus, Scale } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function ComparePage() {
  const [selected, setSelected] = useState<string[]>(['claude-opus-4-6', 'gpt-4-5']);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const searchResults = searchQuery.length >= 2
    ? searchEntities(searchQuery).filter((e) => !selected.includes(e.slug)).slice(0, 6)
    : [];

  const compareData = selected.map((slug) => {
    const score = getScoreBreakdown(slug);
    const history = getScoreHistory(slug);
    return { slug, score, history };
  }).filter((d) => d.score);

  // Find common chart for history
  const commonChart = Object.entries(staticChartEntries).find(([, entries]) =>
    selected.every((slug) => entries.some((e) => e.entity?.slug === slug))
  );
  const historyData = commonChart
    ? buildHistoryData(selected, chartHistory, commonChart[0], ['#3B82F6', '#06B6D4', '#22C55E', '#F59E0B'])
    : [];

  // Merge dimensions from all selected
  const allDimensions = new Set<string>();
  compareData.forEach((d) => {
    if (d.score) Object.keys(d.score.scores).forEach((k) => allDimensions.add(k));
  });

  const colors = ['#3B82F6', '#06B6D4', '#22C55E', '#F59E0B'];

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Scale className="h-4 w-4 text-electric" />
            <span>Analytics</span>
          </div>
          <h1 className="font-heading font-bold text-3xl text-foreground">Compare Entities</h1>
          <p className="text-muted-foreground mt-1">Side-by-side analysis across all scoring dimensions.</p>
        </div>

        {/* Selected Entities */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {selected.map((slug, i) => {
            const data = compareData.find((d) => d.slug === slug);
            return (
              <div
                key={slug}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface border border-white/5"
                style={{ borderColor: `${colors[i]}30` }}
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors[i] }} />
                <span className="text-sm font-medium text-foreground">{data?.score?.slug.replace(/-/g, ' ') ?? slug}</span>
                {data?.score && (
                  <span className="font-mono text-xs text-muted-foreground">{formatScore(data.score.composite)}</span>
                )}
                <button onClick={() => setSelected(selected.filter((s) => s !== slug))}>
                  <X className="h-3.5 w-3.5 text-muted-foreground hover:text-rank-down" />
                </button>
              </div>
            );
          })}

          {selected.length < 4 && (
            <div className="relative">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-white/10 text-xs text-muted-foreground hover:border-electric/30 hover:text-electric transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Entity
              </button>
              {showSearch && (
                <div className="absolute top-full mt-2 left-0 w-72 bg-surface border border-white/10 rounded-xl shadow-2xl z-50">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="flex-1 bg-transparent text-sm text-foreground outline-none"
                      autoFocus
                    />
                  </div>
                  {searchResults.length > 0 && (
                    <div className="max-h-48 overflow-y-auto">
                      {searchResults.map((entity) => (
                        <button
                          key={entity.slug}
                          onClick={() => {
                            setSelected([...selected, entity.slug]);
                            setShowSearch(false);
                            setSearchQuery('');
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-surface-raised text-sm text-foreground transition-colors"
                        >
                          {entity.name}
                          <span className="text-xs text-muted-foreground ml-2">{entity.type}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {compareData.length >= 2 && (
          <div className="space-y-8">
            {/* Score Overview Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {compareData.map((d, i) => (
                <Link
                  key={d.slug}
                  href={`/entity/${d.slug}`}
                  className="p-4 rounded-xl bg-surface border border-white/5 hover:border-electric/20 transition-colors"
                  style={{ borderTopColor: colors[i], borderTopWidth: '2px' }}
                >
                  <p className="font-heading font-semibold text-foreground text-sm truncate">
                    {d.score?.slug.replace(/-/g, ' ')}
                  </p>
                  <p className="font-mono text-2xl font-bold text-foreground mt-1">
                    {d.score ? formatScore(d.score.composite) : '—'}
                  </p>
                  <Sparkline data={d.history} height={24} width={80} color={colors[i]} />
                </Link>
              ))}
            </div>

            {/* History Chart */}
            {historyData.length > 0 && (
              <div className="rounded-xl bg-surface border border-white/5 p-6">
                <h2 className="font-heading font-semibold text-foreground mb-4">Score Trend (4 Weeks)</h2>
                <HistoryChart data={historyData} mode="score" />
              </div>
            )}

            {/* Dimension-by-Dimension Comparison */}
            <div className="rounded-xl bg-surface border border-white/5 p-6">
              <h2 className="font-heading font-semibold text-foreground mb-4">Dimension Comparison</h2>
              <div className="space-y-4">
                {[...allDimensions].map((dim) => (
                  <div key={dim}>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                      {dim.replace(/_/g, ' ')}
                    </p>
                    <div className="space-y-1.5">
                      {compareData.map((d, i) => {
                        const val = d.score?.scores[dim] ?? 0;
                        const max = Math.max(...compareData.map((c) => c.score?.scores[dim] ?? 0));
                        const isMax = val === max && val > 0;
                        return (
                          <div key={d.slug} className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: colors[i] }} />
                            <div className="flex-1 h-2 rounded-full bg-surface-overlay overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{ width: `${val}%`, backgroundColor: colors[i], opacity: isMax ? 1 : 0.5 }}
                              />
                            </div>
                            <span className={cn(
                              'font-mono text-xs w-8 text-right',
                              isMax ? 'font-bold text-foreground' : 'text-muted-foreground'
                            )}>
                              {val}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Radar Overlay */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {compareData.map((d, i) => (
                d.score && (
                  <div key={d.slug} className="rounded-xl bg-surface border border-white/5 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors[i] }} />
                      <h3 className="font-heading font-semibold text-foreground text-sm">
                        {d.slug.replace(/-/g, ' ')}
                      </h3>
                    </div>
                    <ScoreRadar scores={d.score.scores} />
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {compareData.length < 2 && (
          <div className="text-center py-20 text-muted-foreground">
            <Scale className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
            <p>Select at least 2 entities to compare</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
