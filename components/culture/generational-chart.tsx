'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, Cell,
} from 'recharts';
import type { GenerationalData } from '@/lib/data/culture';

interface GenerationalChartProps {
  data: GenerationalData;
  entityName: string;
}

const genColors = {
  gen_z: '#8B5CF6',
  millennial: '#3B82F6',
  gen_x: '#06B6D4',
  boomer: '#F59E0B',
};

const genLabels = {
  gen_z: 'Gen Z (14-29)',
  millennial: 'Millennial (30-45)',
  gen_x: 'Gen X (46-61)',
  boomer: 'Boomer (62-80)',
};

export function GenerationalChart({ data, entityName }: GenerationalChartProps) {
  const chartData = [
    { gen: 'Gen Z', value: data.gen_z, color: genColors.gen_z },
    { gen: 'Millennial', value: data.millennial, color: genColors.millennial },
    { gen: 'Gen X', value: data.gen_x, color: genColors.gen_x },
    { gen: 'Boomer', value: data.boomer, color: genColors.boomer },
  ];

  return (
    <div className="rounded-xl bg-surface border border-white/5 p-5">
      <div className="mb-4">
        <h3 className="font-heading font-semibold text-foreground">Generational Adoption</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          {entityName} &middot; Primary: <span className="text-electric">{data.primary_generation}</span>
          &middot; Trend: <span className="text-cyan">{data.adoption_trend}</span>
        </p>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="gen" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 100]} tick={{ fill: '#6B7280', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#12121A',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#E8E8ED',
            }}
            formatter={(value) => [`${value}%`, 'Adoption']}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, i) => (
              <Cell key={i} fill={entry.color} fillOpacity={0.7} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <p className="text-xs text-muted-foreground mt-3 italic">{data.notes}</p>
    </div>
  );
}

// Multi-entity comparison view
interface GenerationalComparisonProps {
  entities: { name: string; data: GenerationalData }[];
}

export function GenerationalComparison({ entities }: GenerationalComparisonProps) {
  const chartData = ['Gen Z', 'Millennial', 'Gen X', 'Boomer'].map((gen) => {
    const point: Record<string, string | number> = { generation: gen };
    const key = gen === 'Gen Z' ? 'gen_z' : gen === 'Millennial' ? 'millennial' : gen === 'Gen X' ? 'gen_x' : 'boomer';
    for (const entity of entities) {
      point[entity.name] = entity.data[key as keyof GenerationalData] as number;
    }
    return point;
  });

  const colors = ['#3B82F6', '#06B6D4', '#22C55E', '#F59E0B', '#8B5CF6'];

  return (
    <div className="rounded-xl bg-surface border border-white/5 p-5">
      <h3 className="font-heading font-semibold text-foreground mb-4">Generational Adoption Comparison</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="generation" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 100]} tick={{ fill: '#6B7280', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ backgroundColor: '#12121A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px', color: '#E8E8ED' }} />
          <Legend wrapperStyle={{ fontSize: '11px' }} />
          {entities.map((entity, i) => (
            <Bar key={entity.name} dataKey={entity.name} fill={colors[i]} fillOpacity={0.7} radius={[2, 2, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
