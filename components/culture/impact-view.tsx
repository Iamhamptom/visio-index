'use client';

import { cn } from '@/lib/utils';
import { AlertCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { EntityImpactMap, AffectedSector } from '@/lib/data/culture';

interface ImpactViewProps {
  impact: EntityImpactMap;
  entityName: string;
}

const directionConfig = {
  displacing: { icon: TrendingDown, color: 'text-rank-down', bg: 'bg-rank-down/10', label: 'Displacing' },
  augmenting: { icon: TrendingUp, color: 'text-rank-up', bg: 'bg-rank-up/10', label: 'Augmenting' },
  creating: { icon: TrendingUp, color: 'text-cyan', bg: 'bg-cyan/10', label: 'Creating Jobs' },
};

const impactColors = {
  high: 'bg-rank-down/20 text-rank-down border-rank-down/20',
  medium: 'bg-rank-new/20 text-rank-new border-rank-new/20',
  low: 'bg-muted text-muted-foreground border-white/5',
};

export function ImpactView({ impact, entityName }: ImpactViewProps) {
  const displacing = impact.sectors.filter((s) => s.direction === 'displacing').length;
  const augmenting = impact.sectors.filter((s) => s.direction === 'augmenting').length;
  const creating = impact.sectors.filter((s) => s.direction === 'creating').length;

  return (
    <div className="rounded-xl bg-surface border border-white/5 overflow-hidden">
      <div className="p-5 border-b border-white/5">
        <h3 className="font-heading font-semibold text-foreground">Who It&apos;s Affecting</h3>
        <p className="text-xs text-muted-foreground mt-1">
          {entityName} &middot; Most affected: <span className="text-electric">{impact.most_affected_demographic}</span>
        </p>
        {/* Summary stats */}
        <div className="flex items-center gap-4 mt-3">
          <span className="flex items-center gap-1 text-xs">
            <TrendingDown className="h-3 w-3 text-rank-down" />
            <span className="text-rank-down font-mono">{displacing}</span>
            <span className="text-muted-foreground">displacing</span>
          </span>
          <span className="flex items-center gap-1 text-xs">
            <TrendingUp className="h-3 w-3 text-rank-up" />
            <span className="text-rank-up font-mono">{augmenting}</span>
            <span className="text-muted-foreground">augmenting</span>
          </span>
          {creating > 0 && (
            <span className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-cyan" />
              <span className="text-cyan font-mono">{creating}</span>
              <span className="text-muted-foreground">creating</span>
            </span>
          )}
          <span className={cn(
            'ml-auto px-2 py-0.5 rounded text-[10px] font-medium',
            impact.net_sentiment === 'positive' ? 'bg-rank-up/10 text-rank-up' :
            impact.net_sentiment === 'negative' ? 'bg-rank-down/10 text-rank-down' :
            'bg-rank-new/10 text-rank-new'
          )}>
            {impact.net_sentiment} net sentiment
          </span>
        </div>
      </div>

      <div className="divide-y divide-white/[0.03]">
        {impact.sectors.map((sector) => {
          const dir = directionConfig[sector.direction];
          const DirIcon = dir.icon;
          return (
            <div key={sector.name} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={cn('px-2 py-0.5 rounded text-[10px] font-medium border', impactColors[sector.impact_level])}>
                    {sector.impact_level}
                  </span>
                  <span className="font-medium text-sm text-foreground">{sector.name}</span>
                </div>
                <span className={cn('flex items-center gap-1 text-xs px-2 py-0.5 rounded', dir.bg, dir.color)}>
                  <DirIcon className="h-3 w-3" />
                  {dir.label}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {sector.affected_roles.map((role) => (
                  <span key={role} className="px-2 py-0.5 rounded bg-surface-overlay text-[11px] text-muted-foreground">
                    {role}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
