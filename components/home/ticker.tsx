'use client';

import { cn } from '@/lib/utils';
import { PositionBadge } from '@/components/charts/position-badge';
import { getRankDelta, formatScore } from '@/lib/scoring/engine';
import type { ChartEntry } from '@/lib/supabase/types';
import Link from 'next/link';

interface TickerProps {
  entries: ChartEntry[];
}

export function Ticker({ entries }: TickerProps) {
  // Double the entries for seamless loop
  const doubled = [...entries, ...entries];

  return (
    <div className="w-full overflow-hidden border-y border-spice/[0.06] bg-void relative">
      <div className="flex animate-[scroll_60s_linear_infinite] hover:[animation-play-state:paused]">
        {doubled.map((entry, i) => {
          const delta = getRankDelta(entry.rank, entry.previous_rank);
          return (
            <Link
              key={`${entry.id}-${i}`}
              href={entry.entity ? `/entity/${entry.entity.slug}` : '#'}
              className="flex items-center gap-3 px-5 py-2 shrink-0 border-r border-spice/[0.04] hover:bg-spice/[0.03] transition-colors"
            >
              <span className="font-mono text-[11px] text-spice-dim">#{entry.rank}</span>
              <span className="text-xs font-medium text-foreground whitespace-nowrap">
                {entry.entity?.name ?? 'Unknown'}
              </span>
              <span className="font-mono text-xs text-spice font-bold">
                {formatScore(entry.composite_score)}
              </span>
              <PositionBadge status={entry.status} delta={delta} />
            </Link>
          );
        })}
      </div>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-void to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-void to-transparent z-10 pointer-events-none" />

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
