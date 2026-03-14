'use client';

import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface SparklineProps {
  data: number[];
  color?: string;
  height?: number;
  width?: number;
}

export function Sparkline({ data, color, height = 32, width = 80 }: SparklineProps) {
  if (data.length === 0 || data.every((d) => d === 0)) return null;

  const filtered = data.filter((d) => d > 0);
  const isUp = filtered.length >= 2 && filtered[filtered.length - 1] >= filtered[filtered.length - 2];
  const lineColor = color ?? (isUp ? '#22C55E' : '#EF4444');

  const chartData = filtered.map((value, i) => ({ value, idx: i }));

  return (
    <div style={{ width, height }} className="opacity-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={lineColor}
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
