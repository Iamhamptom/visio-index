'use client';

import { cn } from '@/lib/utils';
import { PositionBadge } from './position-badge';
import { getRankDelta, formatScore } from '@/lib/scoring/engine';
import type { ChartEntry } from '@/lib/supabase/types';
import Link from 'next/link';

interface ChartTableProps {
  entries: ChartEntry[];
  showScoreBreakdown?: boolean;
}

export function ChartTable({ entries, showScoreBreakdown = false }: ChartTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/5 text-xs text-muted-foreground uppercase tracking-wider">
            <th className="py-3 px-4 text-left w-16">#</th>
            <th className="py-3 px-2 w-20">Move</th>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-right font-mono">Score</th>
            <th className="py-3 px-4 text-right hidden sm:table-cell">Peak</th>
            <th className="py-3 px-4 text-right hidden md:table-cell">Weeks</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => {
            const delta = getRankDelta(entry.rank, entry.previous_rank);
            const isTopThree = entry.rank <= 3;

            return (
              <tr
                key={entry.id || `${entry.rank}-${entry.entity?.slug}`}
                className={cn(
                  'border-b border-white/[0.03] transition-colors hover:bg-surface/60',
                  isTopThree && 'bg-electric/[0.02]'
                )}
              >
                {/* Rank */}
                <td className="py-4 px-4">
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
                </td>

                {/* Position Change */}
                <td className="py-4 px-2">
                  <PositionBadge status={entry.status} delta={delta} />
                </td>

                {/* Entity Name */}
                <td className="py-4 px-4">
                  {entry.entity ? (
                    <Link
                      href={`/entity/${entry.entity.slug}`}
                      className="group flex flex-col"
                    >
                      <span className="font-heading font-semibold text-foreground group-hover:text-electric transition-colors">
                        {entry.entity.name}
                      </span>
                      {entry.entity.category && (
                        <span className="text-xs text-muted-foreground mt-0.5">
                          {entry.entity.category}
                        </span>
                      )}
                    </Link>
                  ) : (
                    <span className="text-muted-foreground">Unknown Entity</span>
                  )}
                </td>

                {/* Score */}
                <td className="py-4 px-4 text-right">
                  <span className="font-mono font-bold text-foreground">
                    {formatScore(entry.composite_score)}
                  </span>
                </td>

                {/* Peak */}
                <td className="py-4 px-4 text-right hidden sm:table-cell">
                  <span className="font-mono text-sm text-muted-foreground">
                    #{entry.peak_rank}
                  </span>
                </td>

                {/* Weeks on Chart */}
                <td className="py-4 px-4 text-right hidden md:table-cell">
                  <span className="font-mono text-sm text-muted-foreground">
                    {entry.weeks_on_chart}w
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
