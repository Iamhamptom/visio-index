'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { EthicsCard } from '@/components/culture/ethics-card';
import { GenerationalComparison } from '@/components/culture/generational-chart';
import { WorldviewChart } from '@/components/culture/worldview-chart';
import { ImpactView } from '@/components/culture/impact-view';
import {
  ethicsProfiles, generationalData, worldviewRatings, impactMaps, culturalImpactData,
  type EthicsProfile, type CulturalImpact,
} from '@/lib/data/culture';
import { getEntityBySlug } from '@/lib/data/static-charts';
import { cn } from '@/lib/utils';
import { Heart, Users, Globe, AlertTriangle, TrendingDown, BarChart3, Shield } from 'lucide-react';

type Tab = 'ethics' | 'generations' | 'worldviews' | 'impact' | 'cultural';

export default function CulturePage() {
  const [tab, setTab] = useState<Tab>('ethics');

  // Sort ethics by composite
  const sortedEthics = [...ethicsProfiles].sort((a, b) => b.composite - a.composite);

  // Top cultural impact entities
  const sortedCultural = [...culturalImpactData].sort((a, b) => {
    const avgA = Object.values(a).filter((v): v is number => typeof v === 'number').reduce((s, v) => s + v, 0) / 7;
    const avgB = Object.values(b).filter((v): v is number => typeof v === 'number').reduce((s, v) => s + v, 0) / 7;
    return avgB - avgA;
  });

  // Gen comparison — top 5 most adopted
  const topGenEntities = generationalData
    .sort((a, b) => Math.max(b.gen_z, b.millennial) - Math.max(a.gen_z, a.millennial))
    .slice(0, 5)
    .map((d) => ({ name: getEntityBySlug(d.slug)?.name ?? d.slug, data: d }));

  // Worldview comparison — top 4 labs
  const topWorldview = ['openai', 'anthropic', 'meta-ai', 'deepseek']
    .map((slug) => worldviewRatings.find((w) => w.slug === slug))
    .filter(Boolean) as typeof worldviewRatings;
  const worldviewNames = topWorldview.map((w) => getEntityBySlug(w.slug)?.name ?? w.slug);

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Heart className="h-4 w-4 text-electric" />
            <span>Cultural Intelligence</span>
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
            Culture & Impact
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            What no other AI ranking tracks — ethics, generational adoption, worldview alignment,
            workforce impact, and who AI is actually affecting. The human side of the AI revolution.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-surface border border-white/5 mb-8 w-fit">
          {[
            { mode: 'ethics' as const, icon: Shield, label: 'Ethics & Values' },
            { mode: 'generations' as const, icon: Users, label: 'Generations' },
            { mode: 'worldviews' as const, icon: Globe, label: 'Worldviews' },
            { mode: 'impact' as const, icon: AlertTriangle, label: 'Who It Affects' },
            { mode: 'cultural' as const, icon: BarChart3, label: 'Cultural Impact' },
          ].map(({ mode, icon: Icon, label }) => (
            <button
              key={mode}
              onClick={() => setTab(mode)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-colors',
                tab === mode ? 'bg-electric/10 text-electric' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        {tab === 'ethics' && (
          <div>
            <div className="mb-6">
              <h2 className="font-heading font-semibold text-xl text-foreground">Ethics Scorecard</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Observable signals: published policies, safety research, data practices, open-source contributions,
                incident response. Not opinions — documented actions.
              </p>
            </div>

            {/* Ethics leaderboard */}
            <div className="bg-surface rounded-xl border border-white/5 p-4 mb-8">
              <div className="flex flex-wrap gap-3">
                {sortedEthics.slice(0, 10).map((profile, i) => {
                  const name = getEntityBySlug(profile.slug)?.name ?? profile.slug;
                  const grade = profile.composite >= 75 ? 'A' : profile.composite >= 60 ? 'B' : profile.composite >= 45 ? 'C' : 'D';
                  return (
                    <div key={profile.slug} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-raised/50 border border-white/[0.03]">
                      <span className="font-mono text-xs text-muted-foreground">#{i + 1}</span>
                      <span className="text-sm font-medium text-foreground">{name}</span>
                      <span className={cn(
                        'px-1.5 py-0.5 rounded text-[10px] font-mono font-bold',
                        grade === 'A' ? 'bg-rank-up/10 text-rank-up' :
                        grade === 'B' ? 'bg-cyan/10 text-cyan' :
                        grade === 'C' ? 'bg-rank-new/10 text-rank-new' :
                        'bg-rank-down/10 text-rank-down'
                      )}>
                        {profile.composite.toFixed(1)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedEthics.slice(0, 6).map((profile) => (
                <EthicsCard
                  key={profile.slug}
                  profile={profile}
                  entityName={getEntityBySlug(profile.slug)?.name ?? profile.slug}
                />
              ))}
            </div>
          </div>
        )}

        {tab === 'generations' && (
          <div>
            <div className="mb-6">
              <h2 className="font-heading font-semibold text-xl text-foreground">Generational Adoption</h2>
              <p className="text-sm text-muted-foreground mt-1">
                How different generations are adopting AI tools. Gen Z is the most AI-native generation,
                but Millennials dominate professional tools. Gen X and Boomers are the emerging frontier.
              </p>
            </div>

            <GenerationalComparison entities={topGenEntities} />

            {/* Generation insights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {[
                { gen: 'Gen Z', age: '14-29', color: '#8B5CF6', insight: 'AI-native. Use AI for creative work, education, entertainment. Highest Suno/Midjourney adoption.' },
                { gen: 'Millennial', age: '30-45', color: '#3B82F6', insight: 'Power users. Dominate professional tools (Cursor, Claude, Copilot). Driving enterprise adoption.' },
                { gen: 'Gen X', age: '46-61', color: '#06B6D4', insight: 'Pragmatic adopters. Highest Google Gemini share (ecosystem loyalty). Growing fast via workplace mandates.' },
                { gen: 'Boomer', age: '62-80', color: '#F59E0B', insight: 'Emerging frontier. ChatGPT and Gemini lead. Driven by curiosity and family recommendations.' },
              ].map((g) => (
                <div key={g.gen} className="p-4 rounded-xl bg-surface border border-white/5" style={{ borderTopColor: g.color, borderTopWidth: '2px' }}>
                  <h3 className="font-heading font-semibold text-foreground">{g.gen}</h3>
                  <p className="text-[10px] text-muted-foreground">{g.age}</p>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{g.insight}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'worldviews' && (
          <div>
            <div className="mb-6">
              <h2 className="font-heading font-semibold text-xl text-foreground">Worldview Alignment</h2>
              <p className="text-sm text-muted-foreground mt-1">
                How different cultural and philosophical frameworks view AI entities.
                An accelerationist sees OpenAI differently than a safety researcher.
                An African Ubuntu lens values accessibility differently than Silicon Valley.
              </p>
            </div>

            <WorldviewChart ratings={topWorldview} entityNames={worldviewNames} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {[
                { view: 'Western Liberal', key: 'Favors innovation, free markets, individual choice', winner: 'OpenAI' },
                { view: 'EU Regulatory', key: 'Precautionary principle, digital sovereignty, GDPR', winner: 'Mistral' },
                { view: 'African Ubuntu', key: 'Communal benefit, accessibility, inclusion', winner: 'Hugging Face' },
                { view: 'Safety-First', key: 'Existential risk, alignment research, careful deployment', winner: 'Anthropic' },
                { view: 'Accelerationist', key: 'Speed to AGI, capability maximization', winner: 'OpenAI' },
                { view: 'Open Source', key: 'Freedom, transparency, decentralization', winner: 'Hugging Face' },
                { view: 'Asian Pragmatic', key: 'National competitiveness, practical utility', winner: 'DeepSeek' },
                { view: 'Worker/Labor', key: 'Job preservation, worker rights, economic impact', winner: 'Hugging Face' },
              ].map((wv) => (
                <div key={wv.view} className="p-3 rounded-lg bg-surface border border-white/5">
                  <h4 className="font-heading font-semibold text-foreground text-sm">{wv.view}</h4>
                  <p className="text-[10px] text-muted-foreground mt-1">{wv.key}</p>
                  <p className="text-xs text-electric mt-2 font-medium">Top pick: {wv.winner}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'impact' && (
          <div>
            <div className="mb-6">
              <h2 className="font-heading font-semibold text-xl text-foreground">Who AI Is Affecting</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Sector-by-sector breakdown of which jobs and industries are being displaced,
                augmented, or created by each AI entity. Real impact, not hype.
              </p>
            </div>

            {/* Impact summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-rank-down/[0.05] border border-rank-down/10">
                <TrendingDown className="h-5 w-5 text-rank-down mb-2" />
                <h3 className="font-heading font-semibold text-foreground">Displacing</h3>
                <p className="text-xs text-muted-foreground mt-1">Stock illustration, content writing, voice acting, junior dev roles, customer service, music licensing</p>
              </div>
              <div className="p-4 rounded-xl bg-rank-up/[0.05] border border-rank-up/10">
                <TrendingDown className="h-5 w-5 text-rank-up mb-2 rotate-180" />
                <h3 className="font-heading font-semibold text-foreground">Augmenting</h3>
                <p className="text-xs text-muted-foreground mt-1">Senior developers (3-10x), architects, consultants, art directors, researchers, journalists</p>
              </div>
              <div className="p-4 rounded-xl bg-cyan/[0.05] border border-cyan/10">
                <Users className="h-5 w-5 text-cyan mb-2" />
                <h3 className="font-heading font-semibold text-foreground">Creating</h3>
                <p className="text-xs text-muted-foreground mt-1">AI engineers, prompt engineers, AI safety researchers, accessibility engineers, AI-native creators</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {impactMaps.map((impact) => (
                <ImpactView
                  key={impact.slug}
                  impact={impact}
                  entityName={getEntityBySlug(impact.slug)?.name ?? impact.slug}
                />
              ))}
            </div>
          </div>
        )}

        {tab === 'cultural' && (
          <div>
            <div className="mb-6">
              <h2 className="font-heading font-semibold text-xl text-foreground">Cultural Impact Scores</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Beyond buzz — how AI entities are actually changing media, education,
                creative industries, workforce, and public discourse.
              </p>
            </div>

            <div className="bg-surface rounded-xl border border-white/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left py-3 px-4 text-xs text-muted-foreground uppercase">Entity</th>
                      <th className="text-center py-3 px-3 text-[10px] text-muted-foreground uppercase">Media</th>
                      <th className="text-center py-3 px-3 text-[10px] text-muted-foreground uppercase">Education</th>
                      <th className="text-center py-3 px-3 text-[10px] text-muted-foreground uppercase">Creative</th>
                      <th className="text-center py-3 px-3 text-[10px] text-muted-foreground uppercase">Workforce</th>
                      <th className="text-center py-3 px-3 text-[10px] text-muted-foreground uppercase">Discourse</th>
                      <th className="text-center py-3 px-3 text-[10px] text-muted-foreground uppercase">Memes</th>
                      <th className="text-center py-3 px-3 text-[10px] text-muted-foreground uppercase">Global</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedCultural.map((ci) => {
                      const name = getEntityBySlug(ci.slug)?.name ?? ci.slug;
                      return (
                        <tr key={ci.slug} className="border-t border-white/[0.03] hover:bg-surface-raised/50">
                          <td className="py-2.5 px-4 font-medium text-foreground">{name}</td>
                          {[ci.media_influence, ci.education_disruption, ci.creative_disruption, ci.workforce_impact, ci.public_discourse, ci.meme_culture, ci.global_reach].map((val, i) => (
                            <td key={i} className="py-2.5 px-3 text-center">
                              <span className={cn(
                                'inline-block w-full py-1 rounded text-[11px] font-mono font-medium',
                                val >= 80 ? 'bg-electric/40 text-white' :
                                val >= 60 ? 'bg-cyan/20 text-foreground' :
                                val >= 40 ? 'bg-surface-overlay text-muted-foreground' :
                                'bg-surface-overlay/50 text-muted-foreground/60'
                              )}>
                                {val}
                              </span>
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
