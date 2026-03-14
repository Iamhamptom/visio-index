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
  { href: '/compare', label: 'Compare' },
  { href: '/editorial', label: 'Editorial' },
  { href: '/methodology', label: 'Methodology' },
  { href: '/africa', label: 'Africa AI' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-void/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <BarChart3 className="h-6 w-6 text-electric group-hover:text-cyan transition-colors" />
            <span className="font-heading font-bold text-lg tracking-tight">
              <span className="text-electric">VISIO</span>
              <span className="text-foreground"> INDEX</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  pathname === link.href || pathname.startsWith(link.href + '/')
                    ? 'text-electric bg-electric/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-surface'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search */}
          <Search />

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'block px-3 py-2 text-sm font-medium rounded-md',
                  pathname === link.href
                    ? 'text-electric bg-electric/10'
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
