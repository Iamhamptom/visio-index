'use client';

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import { CHART_WEEKS } from '@/lib/data/static-charts';
import type { ChartEntry } from '@/lib/supabase/types';

interface HistoryChartProps {
  /** Map of entity slug → array of { week, rank, score } */
  data: { slug: string; name: string; color: string; points: { week: string; score: number; rank: number }[] }[];
  mode?: 'score' | 'rank';
  height?: number;
}

const weekLabels = CHART_WEEKS.map((w) => {
  const d = new Date(w + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
});

export function HistoryChart({ data, mode = 'score', height = 320 }: HistoryChartProps) {
  // Build merged data for recharts (one entry per week)
  const merged = CHART_WEEKS.map((week, i) => {
    const point: Record<string, string | number> = { week: weekLabels[i] };
    for (const entity of data) {
      const p = entity.points.find((pt) => pt.week === week);
      point[entity.slug] = p ? (mode === 'score' ? p.score : p.rank) : 0;
    }
    return point;
  });

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={merged} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
        <XAxis
          dataKey="week"
          tick={{ fill: '#6B7280', fontSize: 11 }}
          axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#6B7280', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          domain={mode === 'rank' ? ['dataMax + 2', 'dataMin - 1'] : ['auto', 'auto']}
          reversed={mode === 'rank'}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#12121A',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            fontSize: '12px',
            color: '#E8E8ED',
          }}
        />
        <Legend
          wrapperStyle={{ fontSize: '11px', color: '#6B7280' }}
        />
        {data.map((entity) => (
          <Area
            key={entity.slug}
            type="monotone"
            dataKey={entity.slug}
            name={entity.name}
            stroke={entity.color}
            fill={entity.color}
            fillOpacity={0.08}
            strokeWidth={2}
            dot={{ r: 3, fill: entity.color }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

// Helper to build history data from chart entries
export function buildHistoryData(
  entitySlugs: string[],
  chartHistory: Record<string, { week_start: string; entries: ChartEntry[] }[]>,
  chartSlug: string,
  colors: string[] = ['#3B82F6', '#06B6D4', '#22C55E', '#F59E0B', '#8B5CF6']
) {
  const weeks = chartHistory[chartSlug] ?? [];

  return entitySlugs.map((slug, i) => {
    const points = weeks.map((week) => {
      const entry = week.entries.find((e) => e.entity?.slug === slug);
      return {
        week: week.week_start,
        score: entry?.composite_score ?? 0,
        rank: entry?.rank ?? 0,
      };
    });

    const entity = weeks[0]?.entries.find((e) => e.entity?.slug === slug)?.entity
      ?? weeks[weeks.length - 1]?.entries.find((e) => e.entity?.slug === slug)?.entity;

    return {
      slug,
      name: entity?.name ?? slug,
      color: colors[i % colors.length],
      points,
    };
  });
}
