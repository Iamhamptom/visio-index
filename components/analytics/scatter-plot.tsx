'use client';

import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ZAxis, Cell,
} from 'recharts';
import type { Entity } from '@/lib/supabase/types';
import type { ScoredRanking } from '@/lib/data/seed';

interface ScatterPlotProps {
  entities: { entity: Entity; scores: ScoredRanking }[];
  xDimension: string;
  yDimension: string;
  sizeDimension?: string;
  height?: number;
}

const typeColors: Record<string, string> = {
  lab: '#3B82F6',
  model: '#06B6D4',
  tool: '#22C55E',
  creator: '#F59E0B',
  agent: '#8B5CF6',
  startup: '#EC4899',
};

export function ScatterPlot({
  entities, xDimension, yDimension, sizeDimension, height = 400,
}: ScatterPlotProps) {
  const data = entities
    .filter((e) => e.scores.scores[xDimension] !== undefined && e.scores.scores[yDimension] !== undefined)
    .map((e) => ({
      x: e.scores.scores[xDimension],
      y: e.scores.scores[yDimension],
      z: sizeDimension ? (e.scores.scores[sizeDimension] ?? 50) : 50,
      name: e.entity.name,
      type: e.entity.type,
      composite: e.scores.composite,
      slug: e.entity.slug,
    }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
        <XAxis
          type="number"
          dataKey="x"
          name={xDimension.replace(/_/g, ' ')}
          domain={[0, 100]}
          tick={{ fill: '#6B7280', fontSize: 11 }}
          axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
          label={{ value: xDimension.replace(/_/g, ' '), position: 'bottom', fill: '#6B7280', fontSize: 12 }}
        />
        <YAxis
          type="number"
          dataKey="y"
          name={yDimension.replace(/_/g, ' ')}
          domain={[0, 100]}
          tick={{ fill: '#6B7280', fontSize: 11 }}
          axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
          label={{ value: yDimension.replace(/_/g, ' '), angle: -90, position: 'left', fill: '#6B7280', fontSize: 12 }}
        />
        <ZAxis type="number" dataKey="z" range={[60, 400]} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#12121A',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            fontSize: '12px',
            color: '#E8E8ED',
          }}
          content={({ payload }) => {
            if (!payload?.length) return null;
            const d = payload[0]?.payload;
            if (!d) return null;
            return (
              <div className="bg-surface border border-white/10 rounded-lg p-3 text-sm shadow-xl">
                <p className="font-heading font-semibold text-foreground">{d.name}</p>
                <p className="text-muted-foreground text-xs mt-1 capitalize">{d.type}</p>
                <div className="mt-2 space-y-1 font-mono text-xs">
                  <p><span className="text-muted-foreground">{xDimension.replace(/_/g, ' ')}:</span> <span className="text-electric">{d.x}</span></p>
                  <p><span className="text-muted-foreground">{yDimension.replace(/_/g, ' ')}:</span> <span className="text-cyan">{d.y}</span></p>
                  <p><span className="text-muted-foreground">Composite:</span> <span className="text-foreground">{d.composite}</span></p>
                </div>
              </div>
            );
          }}
        />
        <Scatter data={data}>
          {data.map((entry, i) => (
            <Cell key={i} fill={typeColors[entry.type] ?? '#3B82F6'} fillOpacity={0.7} />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
}
