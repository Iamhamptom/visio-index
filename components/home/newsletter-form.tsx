'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-rank-up/10 border border-rank-up/20 text-rank-up text-sm font-medium font-mono">
        <Send className="h-4 w-4" />
        Subscribed. The spice will flow.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 px-4 py-2.5 rounded-sm bg-surface border border-spice/10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-spice/30 focus:ring-1 focus:ring-spice/10 transition-colors font-mono"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-5 py-2.5 rounded-sm bg-spice text-void text-sm font-heading font-semibold hover:bg-spice-bright transition-colors disabled:opacity-50 flex items-center gap-2 tracking-wide uppercase"
      >
        <Send className="h-3.5 w-3.5" />
        Subscribe
      </button>
    </form>
  );
}
