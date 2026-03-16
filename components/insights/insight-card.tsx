'use client';

import { cn } from '@/lib/utils';
import type { Insight } from '@/lib/data/insights';
import Link from 'next/link';
import { AlertCircle, TrendingUp, Zap, Radio } from 'lucide-react';

const severityConfig = {
  breaking: { icon: Radio, color: 'text-rank-down', bg: 'bg-rank-down/8', border: 'border-rank-down/15', label: 'BREAKING' },
  shift: { icon: Zap, color: 'text-spice', bg: 'bg-spice/8', border: 'border-spice/15', label: 'MARKET SHIFT' },
  trend: { icon: TrendingUp, color: 'text-cyan', bg: 'bg-cyan/8', border: 'border-cyan/10', label: 'TREND' },
  signal: { icon: AlertCircle, color: 'text-muted-foreground', bg: 'bg-surface', border: 'border-spice/[0.06]', label: 'SIGNAL' },
};

const categoryColors: Record<string, string> = {
  market: 'text-spice',
  model: 'text-cyan',
  funding: 'text-rank-up',
  culture: 'text-purple-400',
  safety: 'text-rank-down',
  geopolitics: 'text-rank-new',
  product: 'text-spice-bright',
  talent: 'text-rank-up',
};

interface InsightCardProps {
  insight: Insight;
  compact?: boolean;
}

export function InsightCard({ insight, compact = false }: InsightCardProps) {
  const sev = severityConfig[insight.severity];
  const SevIcon = sev.icon;

  if (compact) {
    return (
      <div className={cn('p-3 rounded-sm border', sev.border, sev.bg)}>
        <div className="flex items-center gap-2 mb-1">
          <SevIcon className={cn('h-3 w-3', sev.color)} />
          <span className={cn('text-[9px] font-mono uppercase tracking-wider', sev.color)}>{sev.label}</span>
          <span className="text-[9px] font-mono text-muted-foreground ml-auto">{insight.published_at}</span>
        </div>
        <p className="text-xs font-medium text-foreground leading-snug">{insight.title}</p>
      </div>
    );
  }

  return (
    <div className={cn('p-5 rounded-sm border scan-hover holo-interactive', sev.border, sev.bg)}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <SevIcon className={cn('h-3.5 w-3.5', sev.color)} />
        <span className={cn('text-[9px] font-mono uppercase tracking-[0.15em]', sev.color)}>{sev.label}</span>
        <span className={cn('text-[9px] font-mono uppercase tracking-wider', categoryColors[insight.category] || 'text-muted-foreground')}>
          {insight.category}
        </span>
        <span className="text-[9px] font-mono text-muted-foreground ml-auto">{insight.published_at}</span>
      </div>

      {/* Title */}
      <h3 className="font-heading font-bold text-base text-foreground leading-snug mb-2">
        {insight.title}
      </h3>

      {/* Body */}
      <p className="text-xs text-muted-foreground leading-relaxed mb-4">
        {insight.body}
      </p>

      {/* Data Points */}
      {insight.data_points.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
          {insight.data_points.map((dp) => (
            <div key={dp.label} className="p-2 rounded-sm bg-void/50 border border-spice/[0.04]">
              <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">{dp.label}</p>
              <p className="font-mono text-sm font-bold text-spice mt-0.5">{dp.value}</p>
              {dp.delta && <p className="text-[9px] text-muted-foreground">{dp.delta}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Related entities */}
      <div className="flex flex-wrap gap-1.5">
        {insight.related_entities.slice(0, 5).map((slug) => (
          <Link
            key={slug}
            href={`/entity/${slug}`}
            className="text-[9px] font-mono text-spice-dim hover:text-spice px-1.5 py-0.5 rounded-sm border border-spice/[0.06] hover:border-spice/15 transition-colors"
          >
            {slug.replace(/-/g, ' ')}
          </Link>
        ))}
      </div>
    </div>
  );
}
