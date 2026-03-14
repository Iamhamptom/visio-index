'use client';

import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { CHART_WEEKS } from '@/lib/data/static-charts';

interface WeekNavigatorProps {
  currentWeek: string;
  onWeekChange: (week: string) => void;
}

function formatWeek(w: string) {
  const d = new Date(w + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function WeekNavigator({ currentWeek, onWeekChange }: WeekNavigatorProps) {
  const currentIdx = CHART_WEEKS.indexOf(currentWeek);
  const hasPrev = currentIdx > 0;
  const hasNext = currentIdx < CHART_WEEKS.length - 1;
  const isLatest = currentIdx === CHART_WEEKS.length - 1;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => hasPrev && onWeekChange(CHART_WEEKS[currentIdx - 1])}
        disabled={!hasPrev}
        className={cn(
          'p-1.5 rounded-md transition-colors',
          hasPrev ? 'text-muted-foreground hover:text-foreground hover:bg-surface' : 'text-muted-foreground/30 cursor-not-allowed'
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface border border-white/5 min-w-[180px] justify-center">
        <Calendar className="h-3.5 w-3.5 text-electric" />
        <span className="text-sm font-medium text-foreground">{formatWeek(currentWeek)}</span>
        {isLatest && (
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-electric/10 text-electric font-medium">
            LATEST
          </span>
        )}
      </div>

      <button
        onClick={() => hasNext && onWeekChange(CHART_WEEKS[currentIdx + 1])}
        disabled={!hasNext}
        className={cn(
          'p-1.5 rounded-md transition-colors',
          hasNext ? 'text-muted-foreground hover:text-foreground hover:bg-surface' : 'text-muted-foreground/30 cursor-not-allowed'
        )}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
