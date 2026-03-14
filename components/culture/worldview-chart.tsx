'use client';

import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, ResponsiveContainer, Tooltip, Legend,
} from 'recharts';
import type { WorldviewRating } from '@/lib/data/culture';

interface WorldviewChartProps {
  ratings: WorldviewRating[];
  entityNames: string[];
}

const worldviewLabels: Record<string, string> = {
  western_liberal: 'Western Liberal',
  european_regulatory: 'EU Regulatory',
  african_ubuntu: 'African Ubuntu',
  asian_pragmatic: 'Asian Pragmatic',
  tech_accelerationist: 'Accelerationist',
  safety_alignment: 'Safety-First',
  open_source_community: 'Open Source',
  labor_worker: 'Worker/Labor',
};

const colors = ['#3B82F6', '#06B6D4', '#22C55E', '#F59E0B'];

export function WorldviewChart({ ratings, entityNames }: WorldviewChartProps) {
  const dimensions = Object.keys(worldviewLabels);

  const data = dimensions.map((dim) => {
    const point: Record<string, string | number> = {
      worldview: worldviewLabels[dim] || dim,
    };
    ratings.forEach((r, i) => {
      point[entityNames[i] || r.slug] = r[dim as keyof WorldviewRating] as number;
    });
    return point;
  });

  return (
    <div className="rounded-xl bg-surface border border-white/5 p-5">
      <h3 className="font-heading font-semibold text-foreground mb-1">Worldview Alignment</h3>
      <p className="text-xs text-muted-foreground mb-4">
        How different cultural and philosophical lenses evaluate these entities
      </p>

      <ResponsiveContainer width="100%" height={380}>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="65%">
          <PolarGrid stroke="rgba(255,255,255,0.06)" />
          <PolarAngleAxis dataKey="worldview" tick={{ fill: '#6B7280', fontSize: 10 }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6B7280', fontSize: 9 }} axisLine={false} />
          {ratings.map((r, i) => (
            <Radar
              key={r.slug}
              name={entityNames[i] || r.slug}
              dataKey={entityNames[i] || r.slug}
              stroke={colors[i]}
              fill={colors[i]}
              fillOpacity={0.08}
              strokeWidth={2}
            />
          ))}
          <Tooltip contentStyle={{ backgroundColor: '#12121A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '11px', color: '#E8E8ED' }} />
          <Legend wrapperStyle={{ fontSize: '11px' }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
