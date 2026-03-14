import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'The Visio Index | AI Billboard Charts',
  description: 'The definitive ranking platform for AI — tracking labs, models, tools, and creators with composite scoring methodology. The Billboard for AI.',
  keywords: 'AI rankings, AI charts, AI models, AI companies, AI tools, artificial intelligence, Visio Index',
  openGraph: {
    title: 'The Visio Index | AI Billboard Charts',
    description: 'The definitive ranking platform for AI. Track the top labs, models, tools, and creators weekly.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Visio Index',
    description: 'The Billboard for AI — weekly composite rankings of labs, models, tools, and creators.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-void text-foreground font-sans antialiased selection:bg-electric/30 selection:text-white">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
