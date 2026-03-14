'use client';

import { Download } from 'lucide-react';
import type { ChartEntry } from '@/lib/supabase/types';

interface CsvExportProps {
  entries: ChartEntry[];
  chartName: string;
}

export function CsvExport({ entries, chartName }: CsvExportProps) {
  function handleExport() {
    const headers = ['Rank', 'Entity', 'Type', 'Category', 'Country', 'Score', 'Previous Rank', 'Peak', 'Weeks on Chart', 'Status'];
    const rows = entries.map((e) => [
      e.rank,
      e.entity?.name ?? 'Unknown',
      e.entity?.type ?? '',
      e.entity?.category ?? '',
      e.entity?.country ?? '',
      e.composite_score,
      e.previous_rank ?? 'NEW',
      e.peak_rank,
      e.weeks_on_chart,
      e.status,
    ]);

    // Add score breakdown columns
    const dimensions = entries[0]?.score_breakdown ? Object.keys(entries[0].score_breakdown) : [];
    if (dimensions.length > 0) {
      headers.push(...dimensions.map((d) => d.replace(/_/g, ' ')));
      rows.forEach((row, i) => {
        const breakdown = entries[i]?.score_breakdown ?? {};
        dimensions.forEach((d) => row.push(breakdown[d] ?? ''));
      });
    }

    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `visio-index-${chartName.toLowerCase().replace(/\s/g, '-')}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-white/5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-electric/20 transition-colors"
    >
      <Download className="h-3.5 w-3.5" />
      Export CSV
    </button>
  );
}
