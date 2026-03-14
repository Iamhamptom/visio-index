'use client';

import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus, Flame, Star, RotateCcw } from 'lucide-react';
import type { PositionStatus } from '@/lib/supabase/types';

interface PositionBadgeProps {
  status: PositionStatus;
  delta: number | null;
  className?: string;
}

export function PositionBadge({ status, delta, className }: PositionBadgeProps) {
  const config = {
    up: { icon: TrendingUp, color: 'text-rank-up', bg: 'bg-rank-up/10', label: `+${delta}` },
    down: { icon: TrendingDown, color: 'text-rank-down', bg: 'bg-rank-down/10', label: `${delta}` },
    steady: { icon: Minus, color: 'text-muted-foreground', bg: 'bg-muted/50', label: '—' },
    new: { icon: Star, color: 'text-rank-new', bg: 'bg-rank-new/10', label: 'NEW' },
    re_entry: { icon: RotateCcw, color: 'text-cyan', bg: 'bg-cyan/10', label: 'RE' },
    hot_shot: { icon: Flame, color: 'text-rank-hot', bg: 'bg-rank-hot/10', label: `+${delta}` },
  };

  const { icon: Icon, color, bg, label } = config[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono font-medium',
        color,
        bg,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}
