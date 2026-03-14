import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Globe, MapPin, TrendingUp, Users, Zap } from 'lucide-react';
import { NewsletterForm } from '@/components/home/newsletter-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Africa AI Hub | The Visio Index',
  description: 'The first comprehensive African AI ranking system. Tracking AI companies, tools, and talent across the continent.',
};

const africaStats = [
  { label: 'SA is the only African country in Stanford\'s Global AI Index', icon: Globe },
  { label: 'Nigeria leads in AI startup funding on the continent', icon: TrendingUp },
  { label: 'Kenya, Egypt, and Rwanda emerging as AI hubs', icon: MapPin },
  { label: 'Growing AI creator community across YouTube and X', icon: Users },
];

const spotlightEntities = [
  { name: 'Lelapa AI', country: 'South Africa', category: 'NLP for African Languages', description: 'Building language models for under-resourced African languages.' },
  { name: 'InstaDeep', country: 'Tunisia/UK', category: 'AI Research', description: 'Decision-making AI acquired by BioNTech. Africa\'s biggest AI acquisition.' },
  { name: 'Zindi', country: 'South Africa', category: 'AI Community', description: 'Africa\'s largest data science competition platform.' },
  { name: 'Masakhane', country: 'Pan-African', category: 'NLP Research', description: 'Open-source NLP community for African languages.' },
  { name: 'Data Science Nigeria', country: 'Nigeria', category: 'AI Education', description: 'Training 1 million Nigerians in AI by 2030.' },
  { name: 'Kibo School', country: 'Pan-African', category: 'AI Education', description: 'Online university teaching computer science across Africa.' },
];

export default function AfricaPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Globe className="h-4 w-4 text-electric" />
            <span>Regional</span>
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
            Africa AI Hub
          </h1>
          <p className="text-lg text-muted-foreground mt-3 leading-relaxed max-w-2xl">
            The first comprehensive African AI ranking system. No one is tracking Africa&apos;s AI ecosystem
            with the depth and methodology it deserves — until now.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {africaStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-white/5"
              >
                <Icon className="h-5 w-5 text-electric shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            );
          })}
        </div>

        {/* Spotlight */}
        <section className="mb-12">
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-6 flex items-center gap-2">
            <Zap className="h-5 w-5 text-electric" />
            Spotlight: African AI Leaders
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {spotlightEntities.map((entity) => (
              <div
                key={entity.name}
                className="p-5 rounded-xl bg-surface border border-white/5 hover:border-electric/20 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-heading font-semibold text-foreground">{entity.name}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-electric/10 text-electric text-xs">
                    {entity.country}
                  </span>
                </div>
                <span className="text-xs text-cyan font-medium">{entity.category}</span>
                <p className="text-sm text-muted-foreground mt-2">{entity.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Coming Soon */}
        <section className="p-8 rounded-xl bg-gradient-to-br from-electric/5 to-cyan/5 border border-electric/10 text-center">
          <h2 className="font-heading font-semibold text-xl text-foreground mb-3">
            Full Africa AI Chart — Coming Phase 5
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-6">
            We&apos;re building the first comprehensive database of African AI companies, tools, and
            talent. With country-level rankings for South Africa, Nigeria, Kenya, Egypt, and more.
          </p>
          <NewsletterForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
