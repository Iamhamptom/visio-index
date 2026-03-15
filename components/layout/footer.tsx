import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-spice/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-heading font-bold text-xs tracking-[0.1em] uppercase">
              <span className="holo-number">Visio</span>
              <span className="text-foreground/60 ml-1">Index</span>
            </Link>
            <div className="hidden sm:flex items-center gap-4 text-[10px] text-muted-foreground font-mono">
              <Link href="/charts" className="hover:text-spice transition-colors">Charts</Link>
              <Link href="/explore" className="hover:text-spice transition-colors">Explore</Link>
              <Link href="/culture" className="hover:text-spice transition-colors">Culture</Link>
              <Link href="/methodology" className="hover:text-spice transition-colors">Methodology</Link>
              <Link href="/compare" className="hover:text-spice transition-colors">Compare</Link>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[10px] text-muted-foreground/60 font-mono">
            <span>Visio Research Labs</span>
            <span className="w-px h-3 bg-spice/[0.06]" />
            <span>VisioCorp</span>
            <span className="w-px h-3 bg-spice/[0.06]" />
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
