'use client';

import { cn } from '@/lib/utils';

interface MentatDisplayProps {
  value: string | number;
  label: string;
  sublabel?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/** Dune-style holographic number readout — like a Mentat processing data */
export function MentatDisplay({ value, label, sublabel, size = 'md', className }: MentatDisplayProps) {
  return (
    <div className={cn('text-center', className)}>
      <p className="text-[10px] uppercase tracking-[0.2em] text-spice-dim font-mono mb-1">{label}</p>
      <p className={cn(
        'holo-number font-mono font-black leading-none',
        size === 'sm' && 'text-2xl',
        size === 'md' && 'text-4xl',
        size === 'lg' && 'text-6xl',
      )}>
        {value}
      </p>
      {sublabel && (
        <p className="text-[10px] text-muted-foreground mt-1 font-mono">{sublabel}</p>
      )}
    </div>
  );
}
