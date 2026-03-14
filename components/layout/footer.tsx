import Link from 'next/link';
import { BarChart3 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-void mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5 text-electric" />
              <span className="font-heading font-bold">
                <span className="text-electric">VISIO</span> INDEX
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The definitive ranking platform for AI. Tracking labs, models, tools, and creators with composite scoring methodology.
            </p>
          </div>

          {/* Charts */}
          <div>
            <h3 className="font-heading font-semibold text-sm mb-3 text-foreground">Charts</h3>
            <ul className="space-y-2">
              {['Top Labs', 'Top Models', 'Top Tools', 'Top Creators', 'Top Code AI'].map((chart) => (
                <li key={chart}>
                  <Link
                    href={`/charts/${chart.toLowerCase().replace(/\s/g, '-')}`}
                    className="text-sm text-muted-foreground hover:text-electric transition-colors"
                  >
                    {chart}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-heading font-semibold text-sm mb-3 text-foreground">Platform</h3>
            <ul className="space-y-2">
              {[
                { label: 'Methodology', href: '/methodology' },
                { label: 'Editorial', href: '/editorial' },
                { label: 'Africa AI', href: '/africa' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-electric transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Research */}
          <div>
            <h3 className="font-heading font-semibold text-sm mb-3 text-foreground">Powered By</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Visio Research Labs</li>
              <li>Visio Intel</li>
              <li>VisioCorp</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} VisioCorp. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Charts update weekly. Scores are composite editorial rankings.
          </p>
        </div>
      </div>
    </footer>
  );
}
