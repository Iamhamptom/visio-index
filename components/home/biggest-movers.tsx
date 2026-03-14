'use client';

import { motion } from 'motion/react';
import { PositionBadge } from '@/components/charts/position-badge';
import { Sparkline } from '@/components/charts/sparkline';
import { getRankDelta, formatScore } from '@/lib/scoring/engine';
import { getScoreHistory } from '@/lib/data/static-charts';
import type { ChartEntry } from '@/lib/supabase/types';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BiggestMoversProps {
  entries: ChartEntry[];
}

export function BiggestMovers({ entries }: BiggestMoversProps) {
  if (entries.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center gap-2 mb-6">
        <ArrowUpRight className="h-5 w-5 text-rank-up" />
        <h2 className="font-heading font-bold text-xl text-foreground">Biggest Movers</h2>
        <span className="text-xs text-muted-foreground ml-2">Largest position changes this week</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {entries.slice(0, 8).map((entry, i) => {
          const delta = getRankDelta(entry.rank, entry.previous_rank);
          const history = entry.entity ? getScoreHistory(entry.entity.slug) : [];
          const isPositive = entry.status === 'up' || entry.status === 'hot_shot' || entry.status === 'new';

          return (
            <motion.div
              key={entry.id || i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Link
                href={entry.entity ? `/entity/${entry.entity.slug}` : '#'}
                className={cn(
                  'block p-4 rounded-xl border transition-colors',
                  isPositive
                    ? 'bg-rank-up/[0.03] border-rank-up/10 hover:border-rank-up/30'
                    : 'bg-rank-down/[0.03] border-rank-down/10 hover:border-rank-down/30'
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="font-mono text-xl font-bold text-muted-foreground">
                    #{entry.rank}
                  </span>
                  <PositionBadge status={entry.status} delta={delta} />
                </div>
                <h3 className="font-heading font-semibold text-foreground truncate">
                  {entry.entity?.name ?? 'Unknown'}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-mono text-sm text-muted-foreground">
                    {formatScore(entry.composite_score)}
                  </span>
                  <Sparkline data={history} height={20} width={56} />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
