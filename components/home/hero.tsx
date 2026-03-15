'use client';

import { motion } from 'motion/react';
import { BarChart3, TrendingUp, Zap, Brain } from 'lucide-react';
import { SpiceParticles } from '@/components/holo/spice-particles';
import { MentatDisplay } from '@/components/holo/mentat-display';
import { NewsletterForm } from './newsletter-form';

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center">
      {/* Ambient layers */}
      <SpiceParticles count={50} />
      <div className="absolute inset-0 data-grid-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-spice/[0.03] via-transparent to-transparent" />
      <div className="absolute inset-0 hex-grid opacity-30" />

      {/* Radial glow from center */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-spice/[0.02] blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-32 w-full">
        <div className="max-w-3xl mx-auto text-center">
          {/* Terminal badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm shield-border mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-spice animate-pulse-amber" />
            <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-spice">
              Week of March 9, 2026 &middot; Live
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05]"
          >
            <span className="text-foreground">The </span>
            <span className="holo-number">Visio Index</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-2 font-heading text-lg md:text-xl text-spice-dim tracking-wide"
          >
            The Billboard for Artificial Intelligence
          </motion.p>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto"
          >
            Composite rankings of AI labs, models, tools, and creators.
            Ethics tracking. Cultural impact analysis. Generational data.
          </motion.p>

          {/* Mentat Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-12 mt-12"
          >
            <MentatDisplay value="75+" label="Entities" sublabel="Tracked" size="sm" />
            <div className="w-px h-10 bg-spice/10" />
            <MentatDisplay value="8" label="Charts" sublabel="Weekly" size="sm" />
            <div className="w-px h-10 bg-spice/10" />
            <MentatDisplay value="25+" label="Dimensions" sublabel="Per Entity" size="sm" />
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <NewsletterForm />
          </motion.div>

          {/* Powered by */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex items-center justify-center gap-2 text-[10px] text-spice-dim/60 font-mono uppercase tracking-[0.2em]"
          >
            <Brain className="h-3 w-3" />
            <span>Powered by Visio Research Labs &middot; Gemini AI</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
