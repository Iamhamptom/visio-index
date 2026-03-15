'use client';

import { cn } from '@/lib/utils';
import { PositionBadge } from './position-badge';
import { Sparkline } from './sparkline';
import { getRankDelta, formatScore } from '@/lib/scoring/engine';
import { getScoreHistory, getScoreBreakdown } from '@/lib/data/static-charts';
import type { ChartEntry } from '@/lib/supabase/types';
import Link from 'next/link';

interface ChartTableProps {
  entries: ChartEntry[];
  weights?: Record<string, number>;
}

export function ChartTable({ entries, weights }: ChartTableProps) {
  // Get dimension names from first entry
  const dimensions = entries[0]?.score_breakdown
    ? Object.keys(entries[0].score_breakdown)
    : [];

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-spice/[0.06]">
            <th className="text-left py-2.5 px-3 text-[10px] font-mono uppercase tracking-wider text-spice-dim w-10">#</th>
            <th className="text-left py-2.5 px-2 text-[10px] font-mono uppercase tracking-wider text-spice-dim w-14">Move</th>
            <th className="text-left py-2.5 px-3 text-[10px] font-mono uppercase tracking-wider text-spice-dim">Entity</th>
            {/* Inline dimension columns — visible by default */}
            {dimensions.slice(0, 5).map((dim) => (
              <th key={dim} className="text-center py-2.5 px-1 text-[9px] font-mono uppercase tracking-wider text-spice-dim hidden lg:table-cell w-14">
                {dim.replace(/_/g, ' ').slice(0, 6)}
              </th>
            ))}
            <th className="text-center py-2.5 px-2 text-[10px] font-mono uppercase tracking-wider text-spice-dim w-12">Trend</th>
            <th className="text-right py-2.5 px-3 text-[10px] font-mono uppercase tracking-wider text-spice w-16">Score</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => {
            const delta = getRankDelta(entry.rank, entry.previous_rank);
            const history = entry.entity ? getScoreHistory(entry.entity.slug) : [];

            return (
              <tr
                key={entry.id || entry.rank}
                className={cn(
                  'border-b border-spice/[0.02] transition-colors hover:bg-spice/[0.02] group',
                  entry.rank <= 3 && 'bg-spice/[0.015]'
                )}
              >
                {/* Rank */}
                <td className="py-2.5 px-3">
                  <span className={cn(
                    'font-mono text-sm font-bold',
                    entry.rank === 1 && 'holo-number text-base',
                    entry.rank === 2 && 'text-spice/70',
                    entry.rank === 3 && 'text-spice/50',
                    entry.rank > 3 && 'text-muted-foreground'
                  )}>
                    {String(entry.rank).padStart(2, '0')}
                  </span>
                </td>

                {/* Movement */}
                <td className="py-2.5 px-2">
                  <PositionBadge status={entry.status} delta={delta} />
                </td>

                {/* Entity info — dense */}
                <td className="py-2.5 px-3">
                  {entry.entity ? (
                    <Link href={`/entity/${entry.entity.slug}`} className="block min-w-0">
                      <span className="font-medium text-foreground group-hover:text-spice transition-colors block truncate text-[13px]">
                        {entry.entity.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground block truncate">
                        {entry.entity.category}{entry.entity.country ? ` · ${entry.entity.country}` : ''}
                        {entry.weeks_on_chart > 1 ? ` · ${entry.weeks_on_chart}w` : ''}
                        {entry.peak_rank < entry.rank ? ` · peak #${entry.peak_rank}` : ''}
                      </span>
                    </Link>
                  ) : (
                    <span className="text-muted-foreground">Unknown</span>
                  )}
                </td>

                {/* Dimension score cells — colored intensity */}
                {dimensions.slice(0, 5).map((dim) => {
                  const val = entry.score_breakdown?.[dim] ?? 0;
                  return (
                    <td key={dim} className="py-2.5 px-1 text-center hidden lg:table-cell">
                      <div className="relative">
                        <div
                          className="absolute inset-0 rounded-[2px]"
                          style={{
                            backgroundColor: `rgba(212, 168, 67, ${val / 300})`,
                          }}
                        />
                        <span className={cn(
                          'relative font-mono text-[11px] font-medium px-1 py-0.5',
                          val >= 90 ? 'text-spice-bright' :
                          val >= 70 ? 'text-foreground/80' :
                          'text-muted-foreground'
                        )}>
                          {val}
                        </span>
                      </div>
                    </td>
                  );
                })}

                {/* Sparkline */}
                <td className="py-2.5 px-2 text-center">
                  <Sparkline data={history} height={18} width={44} color="#D4A843" />
                </td>

                {/* Composite Score */}
                <td className="py-2.5 px-3 text-right">
                  <span className={cn(
                    'font-mono font-bold text-sm',
                    entry.rank === 1 ? 'holo-number' : 'text-spice'
                  )}>
                    {formatScore(entry.composite_score)}
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
