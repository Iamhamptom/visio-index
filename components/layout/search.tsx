'use client';

import { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { searchEntities } from '@/lib/data/static-charts';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Search() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = query.length >= 2 ? searchEntities(query).slice(0, 8) : [];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
      if (e.key === 'Escape') {
        setOpen(false);
        setQuery('');
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!open) {
    return (
      <button
        onClick={() => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 50); }}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-white/5 text-sm text-muted-foreground hover:border-electric/20 transition-colors"
      >
        <SearchIcon className="h-3.5 w-3.5" />
        <span>Search</span>
        <kbd className="ml-2 text-[10px] bg-surface-raised px-1.5 py-0.5 rounded font-mono">
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-void/80 backdrop-blur-sm z-50"
        onClick={() => { setOpen(false); setQuery(''); }}
      />

      {/* Search Dialog */}
      <div className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-lg z-50">
        <div className="bg-surface border border-white/10 rounded-xl shadow-2xl overflow-hidden">
          {/* Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
            <SearchIcon className="h-5 w-5 text-electric shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search entities, models, tools..."
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
              autoFocus
            />
            <button onClick={() => { setOpen(false); setQuery(''); }}>
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="max-h-80 overflow-y-auto">
              {results.map((entity) => (
                <Link
                  key={entity.id}
                  href={`/entity/${entity.slug}`}
                  onClick={() => { setOpen(false); setQuery(''); }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-surface-raised transition-colors"
                >
                  <span className={cn(
                    'px-1.5 py-0.5 rounded text-[10px] font-medium uppercase',
                    entity.type === 'lab' && 'bg-electric/10 text-electric',
                    entity.type === 'model' && 'bg-cyan/10 text-cyan',
                    entity.type === 'tool' && 'bg-rank-up/10 text-rank-up',
                    entity.type === 'creator' && 'bg-rank-new/10 text-rank-new',
                  )}>
                    {entity.type}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-foreground block truncate">
                      {entity.name}
                    </span>
                    <span className="text-xs text-muted-foreground truncate block">
                      {entity.category} {entity.country ? `· ${entity.country}` : ''}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {query.length >= 2 && results.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              No results for &quot;{query}&quot;
            </div>
          )}

          {query.length < 2 && (
            <div className="px-4 py-6 text-center text-xs text-muted-foreground">
              Type 2+ characters to search across {75}+ AI entities
            </div>
          )}
        </div>
      </div>
    </>
  );
}
