'use client';

import { cn } from '@/lib/utils';
import { PositionBadge } from './position-badge';
import { Sparkline } from './sparkline';
import { ScoreBar } from './score-bar';
import { getRankDelta, formatScore } from '@/lib/scoring/engine';
import { getScoreHistory } from '@/lib/data/static-charts';
import type { ChartEntry } from '@/lib/supabase/types';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ChartTableProps {
  entries: ChartEntry[];
  weights?: Record<string, number>;
}

export function ChartTable({ entries, weights }: ChartTableProps) {
  const [expandedRank, setExpandedRank] = useState<number | null>(null);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="grid grid-cols-[3rem_4.5rem_1fr_5rem_5rem_4rem] md:grid-cols-[3rem_4.5rem_1fr_5rem_5rem_4rem_4rem_4rem] items-center px-4 py-3 border-b border-white/5 text-xs text-muted-foreground uppercase tracking-wider">
        <span>#</span>
        <span>Move</span>
        <span>Name</span>
        <span className="text-right">Score</span>
        <span className="text-right">Trend</span>
        <span className="text-right">Peak</span>
        <span className="text-right hidden md:block">Wks</span>
        <span className="text-right hidden md:block"></span>
      </div>

      {/* Rows */}
      {entries.map((entry) => {
        const delta = getRankDelta(entry.rank, entry.previous_rank);
        const isTopThree = entry.rank <= 3;
        const isExpanded = expandedRank === entry.rank;
        const history = entry.entity ? getScoreHistory(entry.entity.slug) : [];
        const breakdown = entry.score_breakdown && Object.keys(entry.score_breakdown).length > 0;

        return (
          <div key={entry.id || `${entry.rank}-${entry.entity?.slug}`}>
            {/* Main Row */}
            <div
              className={cn(
                'grid grid-cols-[3rem_4.5rem_1fr_5rem_5rem_4rem] md:grid-cols-[3rem_4.5rem_1fr_5rem_5rem_4rem_4rem_4rem] items-center px-4 py-3.5 border-b border-white/[0.03] transition-all hover:bg-surface/60 cursor-pointer',
                isTopThree && 'bg-electric/[0.02]',
                isExpanded && 'bg-surface/80'
              )}
              onClick={() => setExpandedRank(isExpanded ? null : entry.rank)}
            >
              {/* Rank */}
              <span
                className={cn(
                  'font-mono text-lg font-bold',
                  entry.rank === 1 && 'text-electric text-glow-blue',
                  entry.rank === 2 && 'text-cyan',
                  entry.rank === 3 && 'text-rank-new',
                  entry.rank > 3 && 'text-muted-foreground'
                )}
              >
                {String(entry.rank).padStart(2, '0')}
              </span>

              {/* Position Change */}
              <PositionBadge status={entry.status} delta={delta} />

              {/* Entity */}
              {entry.entity ? (
                <Link
                  href={`/entity/${entry.entity.slug}`}
                  className="group flex flex-col min-w-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="font-heading font-semibold text-foreground group-hover:text-electric transition-colors truncate">
                    {entry.entity.name}
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5 truncate">
                    {entry.entity.category}
                    {entry.entity.country ? ` · ${entry.entity.country}` : ''}
                  </span>
                </Link>
              ) : (
                <span className="text-muted-foreground">Unknown</span>
              )}

              {/* Score */}
              <span className="font-mono font-bold text-right text-foreground">
                {formatScore(entry.composite_score)}
              </span>

              {/* Sparkline */}
              <div className="flex justify-end">
                <Sparkline data={history} height={24} width={64} />
              </div>

              {/* Peak */}
              <span className="font-mono text-sm text-muted-foreground text-right">
                #{entry.peak_rank}
              </span>

              {/* Weeks */}
              <span className="font-mono text-sm text-muted-foreground text-right hidden md:block">
                {entry.weeks_on_chart}
              </span>

              {/* Expand */}
              <div className="hidden md:flex justify-end">
                {breakdown ? (
                  isExpanded
                    ? <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    : <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : null}
              </div>
            </div>

            {/* Expanded Score Breakdown */}
            {isExpanded && breakdown && (
              <div className="px-4 py-4 bg-surface/50 border-b border-white/[0.03]">
                <div className="max-w-md ml-[7.5rem]">
                  <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wide">
                    Score Breakdown
                  </p>
                  <ScoreBar scores={entry.score_breakdown} weights={weights} />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
