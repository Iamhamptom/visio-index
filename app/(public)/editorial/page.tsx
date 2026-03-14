import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Newspaper, Clock } from 'lucide-react';
import { NewsletterForm } from '@/components/home/newsletter-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editorial | The Visio Index',
  description: 'Analysis, insights, and commentary on the AI industry from Visio Research Labs.',
};

// Placeholder articles for MVP
const articles = [
  {
    title: 'The Rise of Agentic AI: Why 2026 Is the Year of the AI Engineer',
    excerpt: 'Claude Code, Codex CLI, and Devin are reshaping how software gets built. Our analysis of the Top Code AI chart reveals a fundamental shift in developer tooling.',
    category: 'Analysis',
    date: 'March 10, 2026',
    readTime: '8 min read',
  },
  {
    title: 'Anthropic Overtakes Google: What the Top Labs Chart Tells Us',
    excerpt: 'For the first time, Anthropic has climbed to #2 on the Top Labs chart, overtaking Google DeepMind. Here\'s what the data shows about this shift.',
    category: 'Chart Analysis',
    date: 'March 9, 2026',
    readTime: '5 min read',
  },
  {
    title: 'Africa\'s AI Moment: Building the First Continental AI Rankings',
    excerpt: 'South Africa is the only African country in Stanford\'s global AI index. We\'re changing that with the first comprehensive African AI ranking system.',
    category: 'Regional',
    date: 'March 7, 2026',
    readTime: '10 min read',
  },
  {
    title: 'The Llama 4 Effect: Meta\'s Open-Weight Strategy Pays Off',
    excerpt: 'Llama 4 Maverick debuts as a NEW entry at #7 on our Top Models chart. We break down why Meta\'s open-weight approach is reshaping the AI landscape.',
    category: 'Model Analysis',
    date: 'March 5, 2026',
    readTime: '6 min read',
  },
];

export default function EditorialPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Newspaper className="h-4 w-4 text-electric" />
            <span>Visio Research Labs</span>
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
            Editorial
          </h1>
          <p className="text-muted-foreground mt-2">
            Analysis, insights, and commentary on the AI industry.
          </p>
        </div>

        {/* Articles */}
        <div className="space-y-6">
          {articles.map((article) => (
            <article
              key={article.title}
              className="p-6 rounded-xl bg-surface border border-white/5 hover:border-electric/20 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-electric/10 text-electric text-xs font-medium">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {article.readTime}
                </span>
              </div>
              <h2 className="font-heading font-bold text-xl text-foreground group-hover:text-electric transition-colors mb-2">
                {article.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {article.excerpt}
              </p>
              <p className="text-xs text-muted-foreground mt-3">{article.date}</p>
            </article>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-12 p-8 rounded-xl bg-surface border border-white/5 text-center">
          <p className="text-muted-foreground mb-4">
            Full editorial content launching soon. Subscribe to get notified.
          </p>
          <NewsletterForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
