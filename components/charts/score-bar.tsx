'use client';

import { cn } from '@/lib/utils';

interface ScoreBarProps {
  scores: Record<string, number>;
  weights?: Record<string, number>;
  compact?: boolean;
}

const dimensionColors: Record<string, string> = {
  performance: 'bg-electric',
  adoption: 'bg-cyan',
  investment: 'bg-rank-new',
  cultural_impact: 'bg-rank-hot',
  innovation: 'bg-purple-500',
  benchmarks: 'bg-electric',
  developer_sentiment: 'bg-cyan',
  efficiency: 'bg-rank-up',
  buzz: 'bg-rank-new',
  usage: 'bg-electric',
  growth: 'bg-rank-up',
  features: 'bg-cyan',
  developer_love: 'bg-purple-500',
  reach: 'bg-electric',
  engagement: 'bg-cyan',
  quality: 'bg-rank-up',
  influence: 'bg-rank-new',
  consistency: 'bg-purple-500',
  developer_adoption: 'bg-electric',
  code_quality: 'bg-cyan',
  speed: 'bg-rank-up',
  output_quality: 'bg-electric',
  versatility: 'bg-cyan',
  accessibility: 'bg-rank-up',
  downloads: 'bg-electric',
  community: 'bg-cyan',
  capability: 'bg-rank-up',
  documentation: 'bg-rank-new',
  momentum: 'bg-purple-500',
};

export function ScoreBar({ scores, weights, compact = false }: ScoreBarProps) {
  const entries = Object.entries(scores);

  if (compact) {
    return (
      <div className="flex gap-0.5 h-2 rounded-full overflow-hidden bg-surface-overlay">
        {entries.map(([dim, val]) => (
          <div
            key={dim}
            className={cn('h-full', dimensionColors[dim] ?? 'bg-electric')}
            style={{ width: `${val}%`, opacity: 0.6 + (val / 250) }}
            title={`${dim}: ${val}`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {entries.map(([dim, val]) => (
        <div key={dim}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground capitalize">
              {dim.replace(/_/g, ' ')}
            </span>
            <div className="flex items-center gap-2">
              {weights && weights[dim] && (
                <span className="text-[10px] text-muted-foreground/60">
                  {Math.round(weights[dim] * 100)}%w
                </span>
              )}
              <span className="font-mono text-xs font-medium text-foreground">{val}</span>
            </div>
          </div>
          <div className="h-1.5 rounded-full bg-surface-overlay overflow-hidden">
            <div
              className={cn('h-full rounded-full transition-all duration-500', dimensionColors[dim] ?? 'bg-electric')}
              style={{ width: `${val}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
