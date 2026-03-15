'use client';

import { cn } from '@/lib/utils';

interface HoloCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'shield';
  glow?: boolean;
}

export function HoloCard({ children, className, variant = 'default', glow = false }: HoloCardProps) {
  return (
    <div
      className={cn(
        'relative rounded-sm overflow-hidden',
        variant === 'default' && 'holo-panel',
        variant === 'elevated' && 'holo-panel glow-spice',
        variant === 'shield' && 'shield-border holo-panel',
        glow && 'glow-spice',
        className
      )}
    >
      {children}
    </div>
  );
}
