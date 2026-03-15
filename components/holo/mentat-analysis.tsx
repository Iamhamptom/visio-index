'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Brain, Loader2, Sparkles } from 'lucide-react';

interface MentatAnalysisProps {
  entityName: string;
  entityType: string;
  scores?: Record<string, number>;
  ethics?: Record<string, number>;
}

export function MentatAnalysis({ entityName, entityType, scores, ethics }: MentatAnalysisProps) {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runAnalysis() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entityName, entityType, scores, ethics }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Analysis failed');
      }

      const data = await res.json();
      setAnalysis(data.analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  }

  if (!analysis && !loading) {
    return (
      <button
        onClick={runAnalysis}
        className="w-full flex items-center justify-center gap-2 p-4 rounded-sm holo-panel border border-spice/10 hover:border-spice/25 transition-all group"
      >
        <Brain className="h-5 w-5 text-spice group-hover:text-spice-bright transition-colors" />
        <span className="font-heading font-semibold text-sm text-spice group-hover:text-spice-bright">
          Run Mentat Analysis
        </span>
        <Sparkles className="h-3.5 w-3.5 text-spice-dim group-hover:text-spice animate-pulse-amber" />
      </button>
    );
  }

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-3 p-8 rounded-sm holo-panel border border-spice/10">
        <Loader2 className="h-6 w-6 text-spice animate-spin" />
        <p className="text-xs text-spice-dim font-mono uppercase tracking-[0.2em]">
          Mentat Processing...
        </p>
        <div className="w-32 h-0.5 bg-surface-overlay rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-spice-dim to-spice animate-pulse rounded-full" style={{ width: '60%' }} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-sm holo-panel border border-rank-down/20">
        <p className="text-xs text-rank-down font-mono">{error}</p>
        <button onClick={runAnalysis} className="text-xs text-spice mt-2 hover:underline">Retry</button>
      </div>
    );
  }

  return (
    <div className="rounded-sm holo-panel border border-spice/10 glow-spice overflow-hidden scanlines">
      <div className="p-4 border-b border-spice/8 flex items-center gap-2">
        <Brain className="h-4 w-4 text-spice" />
        <span className="font-heading font-semibold text-sm text-spice">Mentat Analysis</span>
        <span className="text-[10px] text-spice-dim font-mono ml-auto">GEMINI 2.5 FLASH</span>
      </div>
      <div className="p-5 relative z-10">
        <div className="prose prose-sm prose-invert max-w-none text-foreground/90 leading-relaxed text-sm
          [&_strong]:text-spice [&_h1]:text-spice [&_h2]:text-spice [&_h3]:text-spice
          [&_h1]:font-heading [&_h2]:font-heading [&_h3]:font-heading
          [&_h2]:text-base [&_h3]:text-sm
          [&_p]:mb-3 [&_ul]:mb-3">
          {analysis?.split('\n').map((line, i) => {
            if (line.startsWith('**') && line.endsWith('**')) {
              return <h3 key={i} className="text-spice font-heading font-semibold mt-4 mb-1">{line.replace(/\*\*/g, '')}</h3>;
            }
            if (line.includes('**')) {
              const parts = line.split(/\*\*(.*?)\*\*/g);
              return (
                <p key={i}>
                  {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
                </p>
              );
            }
            if (line.trim() === '') return null;
            return <p key={i}>{line}</p>;
          })}
        </div>
      </div>
    </div>
  );
}
