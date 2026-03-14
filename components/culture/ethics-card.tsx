'use client';

import { cn } from '@/lib/utils';
import { Shield, Eye, Lock, Globe, Users, Scale, AlertTriangle } from 'lucide-react';
import type { EthicsProfile } from '@/lib/data/culture';

interface EthicsCardProps {
  profile: EthicsProfile;
  entityName: string;
}

const dimensions = [
  { key: 'transparency' as const, label: 'Transparency', icon: Eye, desc: 'Openness about capabilities and limitations' },
  { key: 'safety_commitment' as const, label: 'Safety', icon: Shield, desc: 'Published safety research and alignment work' },
  { key: 'data_privacy' as const, label: 'Privacy', icon: Lock, desc: 'User data handling and opt-out options' },
  { key: 'openness' as const, label: 'Openness', icon: Globe, desc: 'Open-source/weight contributions' },
  { key: 'accessibility' as const, label: 'Accessibility', icon: Users, desc: 'Free tiers, multilingual, global access' },
  { key: 'bias_mitigation' as const, label: 'Bias Mitigation', icon: Scale, desc: 'Fairness work and bias audits' },
  { key: 'accountability' as const, label: 'Accountability', icon: AlertTriangle, desc: 'Incident response and governance' },
];

function getGrade(score: number): { label: string; color: string } {
  if (score >= 85) return { label: 'A', color: 'text-rank-up bg-rank-up/10' };
  if (score >= 70) return { label: 'B', color: 'text-cyan bg-cyan/10' };
  if (score >= 55) return { label: 'C', color: 'text-rank-new bg-rank-new/10' };
  if (score >= 40) return { label: 'D', color: 'text-rank-hot bg-rank-hot/10' };
  return { label: 'F', color: 'text-rank-down bg-rank-down/10' };
}

export function EthicsCard({ profile, entityName }: EthicsCardProps) {
  const overall = getGrade(profile.composite);

  return (
    <div className="rounded-xl bg-surface border border-white/5 overflow-hidden">
      <div className="p-5 border-b border-white/5 flex items-center justify-between">
        <div>
          <h3 className="font-heading font-semibold text-foreground">Ethics & Values</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{entityName}</p>
        </div>
        <div className="text-center">
          <span className={cn('inline-flex items-center justify-center w-10 h-10 rounded-lg font-mono font-bold text-lg', overall.color)}>
            {overall.label}
          </span>
          <p className="text-[10px] text-muted-foreground mt-1">{profile.composite.toFixed(1)}</p>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {dimensions.map(({ key, label, icon: Icon }) => {
          const val = profile[key];
          const grade = getGrade(val);
          return (
            <div key={key} className="flex items-center gap-3">
              <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">{label}</span>
                  <span className={cn('px-1.5 py-0.5 rounded text-[10px] font-mono font-bold', grade.color)}>
                    {val}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-surface-overlay overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-500',
                      val >= 70 ? 'bg-rank-up' : val >= 50 ? 'bg-rank-new' : 'bg-rank-down'
                    )}
                    style={{ width: `${val}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
