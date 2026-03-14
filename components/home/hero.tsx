'use client';

import { motion } from 'motion/react';
import { BarChart3, TrendingUp, Zap } from 'lucide-react';
import { NewsletterForm } from './newsletter-form';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Data grid background */}
      <div className="absolute inset-0 data-grid-bg opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-electric/5 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-electric/10 border border-electric/20 mb-8"
          >
            <Zap className="h-3.5 w-3.5 text-electric" />
            <span className="text-xs font-medium text-electric">
              Week of March 9, 2026
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1]"
          >
            The Billboard{' '}
            <span className="text-electric text-glow-blue">for AI</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            Composite rankings of AI labs, models, tools, and creators.
            Updated weekly with data-driven methodology.
          </motion.p>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-8 mt-10"
          >
            {[
              { icon: BarChart3, label: 'Entities Tracked', value: '100+' },
              { icon: TrendingUp, label: 'Weekly Charts', value: '5' },
              { icon: Zap, label: 'Data Dimensions', value: '25+' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1.5">
                  <Icon className="h-4 w-4 text-electric" />
                  <span className="font-mono font-bold text-xl text-foreground">{value}</span>
                </div>
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12"
          >
            <NewsletterForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
