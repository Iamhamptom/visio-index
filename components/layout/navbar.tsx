'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { BarChart3, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Search } from './search';

const navLinks = [
  { href: '/charts', label: 'Charts' },
  { href: '/explore', label: 'Explore' },
  { href: '/culture', label: 'Culture' },
  { href: '/compare', label: 'Compare' },
  { href: '/methodology', label: 'Methodology' },
  { href: '/africa', label: 'Africa AI' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-spice/[0.06] bg-void/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <BarChart3 className="h-5 w-5 text-spice group-hover:text-spice-bright transition-colors" />
              <div className="absolute -inset-1 rounded-full bg-spice/5 group-hover:bg-spice/10 transition-colors" />
            </div>
            <span className="font-heading font-bold text-sm tracking-[0.08em] uppercase">
              <span className="holo-number">Visio</span>
              <span className="text-foreground/80 ml-1">Index</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium tracking-wide uppercase rounded-sm transition-all',
                  pathname === link.href || pathname.startsWith(link.href + '/')
                    ? 'text-spice bg-spice/8 border border-spice/15'
                    : 'text-muted-foreground hover:text-foreground hover:bg-surface border border-transparent'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <Search />

            {/* Live indicator */}
            <div className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded-sm border border-spice/10">
              <span className="w-1.5 h-1.5 rounded-full bg-rank-up animate-pulse" />
              <span className="text-[10px] font-mono text-spice-dim uppercase tracking-wider">Live</span>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-1 border-t border-spice/5 pt-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'block px-3 py-2 text-sm font-medium rounded-sm',
                  pathname === link.href
                    ? 'text-spice bg-spice/8'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
