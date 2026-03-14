'use client';

import { motion } from 'motion/react';
import { PositionBadge } from '@/components/charts/position-badge';
import { getRankDelta } from '@/lib/scoring/engine';
import type { ChartEntry } from '@/lib/supabase/types';
import Link from 'next/link';
import { TrendingUp, Flame } from 'lucide-react';

interface TrendingStripProps {
  entries: ChartEntry[];
}

export function TrendingStrip({ entries }: TrendingStripProps) {
  // Show entries that are trending up or new (hot movers)
  const trending = entries
    .filter((e) => e.status === 'up' || e.status === 'hot_shot' || e.status === 'new')
    .slice(0, 8);

  if (trending.length === 0) return null;

  return (
    <section className="border-y border-white/5 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center gap-3 mb-3">
          <Flame className="h-4 w-4 text-rank-hot" />
          <h2 className="font-heading font-semibold text-sm text-foreground">Trending This Week</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {trending.map((entry, i) => {
            const delta = getRankDelta(entry.rank, entry.previous_rank);
            return (
              <motion.div
                key={entry.id || i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Link
                  href={entry.entity ? `/entity/${entry.entity.slug}` : '#'}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-white/5 hover:border-electric/20 transition-colors whitespace-nowrap"
                >
                  <TrendingUp className="h-3.5 w-3.5 text-rank-up shrink-0" />
                  <span className="text-sm font-medium">{entry.entity?.name ?? 'Unknown'}</span>
                  <PositionBadge status={entry.status} delta={delta} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
