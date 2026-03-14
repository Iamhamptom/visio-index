'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import type { ScoredRanking } from '@/lib/data/seed';
import type { Entity } from '@/lib/supabase/types';

interface HeatmapProps {
  entities: { entity: Entity; scores: ScoredRanking }[];
  dimensions: string[];
}

function getHeatColor(value: number): string {
  if (value >= 90) return 'bg-electric/60';
  if (value >= 80) return 'bg-electric/40';
  if (value >= 70) return 'bg-cyan/30';
  if (value >= 60) return 'bg-cyan/20';
  if (value >= 50) return 'bg-surface-overlay';
  if (value >= 40) return 'bg-rank-down/10';
  return 'bg-rank-down/20';
}

function getTextColor(value: number): string {
  if (value >= 80) return 'text-white';
  if (value >= 60) return 'text-foreground';
  return 'text-muted-foreground';
}

export function Heatmap({ entities, dimensions }: HeatmapProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left py-2 px-3 text-xs text-muted-foreground uppercase tracking-wider sticky left-0 bg-void z-10 min-w-[140px]">
              Entity
            </th>
            {dimensions.map((dim) => (
              <th
                key={dim}
                className="text-center py-2 px-2 text-[10px] text-muted-foreground uppercase tracking-wider min-w-[70px]"
              >
                {dim.replace(/_/g, ' ')}
              </th>
            ))}
            <th className="text-center py-2 px-3 text-[10px] text-muted-foreground uppercase tracking-wider font-bold">
              Score
            </th>
          </tr>
        </thead>
        <tbody>
          {entities.map(({ entity, scores }, i) => (
            <tr key={entity.slug} className={cn('border-t border-white/[0.03]', i < 3 && 'bg-electric/[0.02]')}>
              <td className="py-2 px-3 sticky left-0 bg-void z-10">
                <Link
                  href={`/entity/${entity.slug}`}
                  className="font-medium text-foreground hover:text-electric transition-colors text-xs truncate block max-w-[140px]"
                >
                  {entity.name}
                </Link>
              </td>
              {dimensions.map((dim) => {
                const val = scores.scores[dim] ?? 0;
                return (
                  <td key={dim} className="py-1.5 px-1 text-center">
                    <span
                      className={cn(
                        'inline-block w-full py-1 rounded text-[11px] font-mono font-medium',
                        getHeatColor(val),
                        getTextColor(val)
                      )}
                    >
                      {val}
                    </span>
                  </td>
                );
              })}
              <td className="py-1.5 px-3 text-center">
                <span className="font-mono font-bold text-xs text-electric">
                  {scores.composite.toFixed(1)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
