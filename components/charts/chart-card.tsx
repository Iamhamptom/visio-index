'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { PositionBadge } from './position-badge';
import { getRankDelta, formatScore } from '@/lib/scoring/engine';
import type { ChartEntry, Chart } from '@/lib/supabase/types';
import { ChevronRight } from 'lucide-react';

interface ChartCardProps {
  chart: Chart;
  entries: ChartEntry[];
  maxPreview?: number;
}

export function ChartCard({ chart, entries, maxPreview = 5 }: ChartCardProps) {
  const preview = entries.slice(0, maxPreview);

  return (
    <div className="bg-surface rounded-xl border border-white/5 overflow-hidden hover:border-electric/20 transition-colors group">
      {/* Header */}
      <div className="p-5 border-b border-white/5">
        <Link href={`/charts/${chart.slug}`} className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-electric transition-colors">
              {chart.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-1 capitalize">
              {chart.frequency} &middot; {chart.entity_type}s
            </p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-electric transition-colors" />
        </Link>
      </div>

      {/* Preview Entries */}
      <div className="divide-y divide-white/[0.03]">
        {preview.map((entry) => {
          const delta = getRankDelta(entry.rank, entry.previous_rank);
          return (
            <div
              key={entry.id || entry.rank}
              className={cn(
                'flex items-center gap-3 px-5 py-3 hover:bg-surface-raised/50 transition-colors',
                entry.rank === 1 && 'bg-electric/[0.03]'
              )}
            >
              <span
                className={cn(
                  'font-mono text-sm font-bold w-6 text-right',
                  entry.rank === 1 ? 'text-electric' : 'text-muted-foreground'
                )}
              >
                {entry.rank}
              </span>
              <PositionBadge status={entry.status} delta={delta} />
              <span className="flex-1 text-sm font-medium truncate">
                {entry.entity?.name ?? 'Unknown'}
              </span>
              <span className="font-mono text-sm text-muted-foreground">
                {formatScore(entry.composite_score)}
              </span>
            </div>
          );
        })}
      </div>

      {/* View Full Chart */}
      <Link
        href={`/charts/${chart.slug}`}
        className="block text-center py-3 text-xs font-medium text-electric hover:bg-electric/5 transition-colors border-t border-white/5"
      >
        View Full Chart &rarr;
      </Link>
    </div>
  );
}
