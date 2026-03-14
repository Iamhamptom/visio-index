'use client';

import { motion } from 'motion/react';
import { BarChart3, Users, TrendingUp, Globe, Zap, Layers } from 'lucide-react';
import { staticEntities, staticCharts, getAllTrendingEntries } from '@/lib/data/static-charts';

export function StatsBar() {
  const totalEntities = staticEntities.length;
  const labs = staticEntities.filter((e) => e.type === 'lab').length;
  const models = staticEntities.filter((e) => e.type === 'model').length;
  const tools = staticEntities.filter((e) => e.type === 'tool').length;
  const creators = staticEntities.filter((e) => e.type === 'creator').length;
  const totalCharts = staticCharts.length;
  const trending = getAllTrendingEntries().length;
  const countries = new Set(staticEntities.map((e) => e.country).filter(Boolean)).size;

  const stats = [
    { icon: Layers, label: 'Entities', value: totalEntities, sub: `${labs}L · ${models}M · ${tools}T · ${creators}C` },
    { icon: BarChart3, label: 'Charts', value: totalCharts, sub: 'Updated weekly' },
    { icon: TrendingUp, label: 'Trending', value: trending, sub: 'This week' },
    { icon: Globe, label: 'Countries', value: countries, sub: 'Tracked' },
    { icon: Users, label: 'Creators', value: creators, sub: 'Ranked' },
    { icon: Zap, label: 'Dimensions', value: '25+', sub: 'Data signals' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="p-3 rounded-lg bg-surface border border-white/5"
          >
            <div className="flex items-center gap-2 mb-1">
              <Icon className="h-3.5 w-3.5 text-electric" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wide">{stat.label}</span>
            </div>
            <p className="font-mono font-bold text-lg text-foreground">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground">{stat.sub}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
