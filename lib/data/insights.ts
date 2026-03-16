/**
 * THE VISIO INDEX — Live Insights Engine
 *
 * This is what makes us THE authority. Not just rankings —
 * ANALYSIS. Every chart tells a story. Every movement has a why.
 * Every week produces insights no one else is publishing.
 *
 * Billboard doesn't just show the Hot 100. They publish
 * "Chart Beat" — WHY songs move. We do the same for AI.
 */

export interface Insight {
  id: string;
  title: string;
  body: string;
  category: 'market' | 'model' | 'funding' | 'culture' | 'safety' | 'geopolitics' | 'product' | 'talent';
  severity: 'signal' | 'trend' | 'shift' | 'breaking';
  related_entities: string[]; // slugs
  related_charts: string[]; // chart slugs
  data_points: { label: string; value: string; delta?: string }[];
  published_at: string;
  source?: string;
}

export const liveInsights: Insight[] = [
  // ── BREAKING ──────────────────────────────────────────────────────────
  {
    id: 'insight-001',
    title: 'Anthropic hits $19B ARR — fastest enterprise AI growth ever',
    body: 'Anthropic\'s annualized revenue reached $19B in March 2026, up from $87M just 22 months ago. That\'s 218x growth. 8 of the Fortune 10 are customers. 500+ companies spend >$1M/year. Claude\'s enterprise penetration is now rivaling ChatGPT\'s consumer dominance. The safety-first brand strategy is paying off at scale.',
    category: 'funding',
    severity: 'breaking',
    related_entities: ['anthropic', 'claude-app', 'claude-opus-4-6', 'dario-amodei', 'daniela-amodei'],
    related_charts: ['top-labs', 'top-tools', 'top-ceos'],
    data_points: [
      { label: 'ARR', value: '$19B', delta: '+218x in 22 months' },
      { label: 'Valuation', value: '$380B', delta: '+517% YoY' },
      { label: 'Enterprise', value: '300K+ customers', delta: '' },
      { label: 'Fortune 10', value: '8 of 10', delta: '' },
    ],
    published_at: '2026-03-15',
  },
  {
    id: 'insight-002',
    title: 'Cursor doubles revenue to $2B ARR in just 3 months',
    body: 'Cursor (Anysphere) hit $2B in annualized revenue in February 2026, doubling from $1B in just 3 months. It\'s the fastest SaaS revenue trajectory in history. Over 1M paying developers. $29.3B valuation. Zero traditional marketing spend. The AI IDE category is real — and Cursor owns it.',
    category: 'product',
    severity: 'breaking',
    related_entities: ['cursor', 'claude-code', 'github-copilot', 'windsurf', 'codex-cli'],
    related_charts: ['top-tools', 'top-code-ai'],
    data_points: [
      { label: 'ARR', value: '$2B', delta: '+100% in 3 months' },
      { label: 'Valuation', value: '$29.3B', delta: '' },
      { label: 'Paying devs', value: '1M+', delta: '' },
      { label: 'Marketing spend', value: '$0', delta: '' },
    ],
    published_at: '2026-03-14',
  },
  {
    id: 'insight-003',
    title: 'OpenAI crosses 910M weekly active users — approaching 1B',
    body: 'ChatGPT now has 910M weekly active users as of February 2026. The $25B annualized revenue makes it the fastest-growing consumer product in history. But market share is declining (65%, down from 87% in 2024) as Claude, Gemini, and Perplexity gain ground. Being first doesn\'t mean being forever.',
    category: 'market',
    severity: 'trend',
    related_entities: ['openai', 'chatgpt', 'sam-altman', 'claude-app', 'gemini-app', 'perplexity-app'],
    related_charts: ['top-labs', 'top-tools'],
    data_points: [
      { label: 'WAU', value: '910M', delta: '+203% YoY' },
      { label: 'ARR', value: '$25B', delta: '' },
      { label: 'Market share', value: '65%', delta: '-22pp from 87%' },
      { label: 'Employees', value: '7,216', delta: '' },
    ],
    published_at: '2026-03-13',
  },

  // ── SHIFTS ────────────────────────────────────────────────────────────
  {
    id: 'insight-004',
    title: 'The Great AI Valuation Explosion: Feb 2026 was the biggest startup funding month ever',
    body: 'February 2026 saw $189B in startup funding — 83% going to just three companies: OpenAI ($110B), Anthropic ($30B), and Waymo ($16B). AI is now consuming the entire VC industry. a16z is raising a $20B AI megafund. Thrive closed a $10B fund. Tiger Global warns valuations are "elevated and sometimes unsupported by fundamentals."',
    category: 'funding',
    severity: 'shift',
    related_entities: ['openai', 'anthropic', 'a16z', 'thrive-capital', 'sequoia'],
    related_charts: ['top-investors', 'top-labs'],
    data_points: [
      { label: 'Feb 2026 funding', value: '$189B', delta: 'Largest month ever' },
      { label: 'AI share', value: '83%', delta: '' },
      { label: 'a16z AI fund', value: '$20B', delta: 'Raising' },
      { label: 'Thrive X', value: '$10B', delta: 'Closed Feb 2026' },
    ],
    published_at: '2026-03-12',
  },
  {
    id: 'insight-005',
    title: 'Nvidia hits $4.49T — now the world\'s most valuable company',
    body: 'Nvidia\'s market cap reached $4.49T in March 2026. 85% GPU market share. $130B+ in annual AI revenue. Jensen Huang\'s net worth: $164.1B. But competition is coming — AMD MI355X is 4x faster than its predecessor, Groq was acquired by Nvidia for $20B (removing a competitor), and Tenstorrent raised $700M with legendary chip architect Jim Keller at the helm.',
    category: 'market',
    severity: 'trend',
    related_entities: ['nvidia', 'jensen-huang', 'amd-ai', 'groq', 'cerebras', 'tenstorrent'],
    related_charts: ['ai-hardware', 'top-labs', 'top-ceos'],
    data_points: [
      { label: 'Market cap', value: '$4.49T', delta: '#1 globally' },
      { label: 'GPU share', value: '85%', delta: 'Projected 75% by end 2026' },
      { label: 'AI revenue', value: '$130B+', delta: 'Annual' },
      { label: 'Huang net worth', value: '$164.1B', delta: '#7 globally' },
    ],
    published_at: '2026-03-12',
  },
  {
    id: 'insight-006',
    title: 'The open-source model war: Llama 4 vs DeepSeek V3 vs Qwen 2.5',
    body: 'Meta\'s Llama 4 Maverick (400B MoE) debuted in March beating GPT-4o benchmarks. DeepSeek V3 (685B MoE) trained for $5.6M. Qwen 2.5 Max dominates coding benchmarks. The open-weight models are now competitive with closed-source frontiers — and the cost advantage is 10-100x. This reshapes every AI business model built on API margins.',
    category: 'model',
    severity: 'shift',
    related_entities: ['meta-ai', 'llama-4-maverick', 'deepseek', 'deepseek-v3', 'alibaba-qwen', 'qwen-2-5-max'],
    related_charts: ['top-models', 'top-open-source'],
    data_points: [
      { label: 'Llama downloads', value: '1B+', delta: '~1M/day' },
      { label: 'DeepSeek V3 cost', value: '$5.6M', delta: '1/100th of GPT-4' },
      { label: 'Open-weight share', value: 'Growing', delta: 'vs closed-source' },
    ],
    published_at: '2026-03-11',
  },

  // ── TRENDS ────────────────────────────────────────────────────────────
  {
    id: 'insight-007',
    title: 'Agentic AI is the #1 investment category in 2026',
    body: 'Agentic AI startups raised $2.8B in H1 2025 alone. ~$700M in seed rounds. Cognition (Devin) hit $10.2B valuation and acquired Windsurf. Sierra AI reached $10B. Claude Code is the #1 ranked agent. CrewAI has ~70% market share for multi-agent workflows. Y Combinator\'s latest batch is 60%+ AI agent companies. The agent era is here.',
    category: 'market',
    severity: 'trend',
    related_entities: ['claude-code', 'devin', 'cognition', 'sierra-ai', 'crewai', 'y-combinator'],
    related_charts: ['top-agents', 'top-investors'],
    data_points: [
      { label: 'Agent funding H1 2025', value: '$2.8B', delta: '' },
      { label: 'Cognition val', value: '$10.2B', delta: '' },
      { label: 'YC AI agent share', value: '60%+', delta: 'of W26 batch' },
      { label: 'CrewAI share', value: '~70%', delta: 'of multi-agent' },
    ],
    published_at: '2026-03-10',
  },
  {
    id: 'insight-008',
    title: 'ElevenLabs reaches $11B — voice AI is the fastest-growing AI vertical',
    body: 'ElevenLabs raised $500M at $11B valuation (Sequoia-led). $330M ARR. 41% of Fortune 500 use the platform. Voice cloning, dubbing, and TTS are transforming media production, podcasting, audiobooks, and accessibility. The voice acting industry is being fundamentally restructured.',
    category: 'product',
    severity: 'trend',
    related_entities: ['elevenlabs', 'suno', 'assemblyai', 'descript'],
    related_charts: ['top-creative-ai', 'ai-music', 'top-tools'],
    data_points: [
      { label: 'Valuation', value: '$11B', delta: '+233% YoY' },
      { label: 'ARR', value: '$330M', delta: '' },
      { label: 'Fortune 500', value: '41%', delta: '' },
    ],
    published_at: '2026-03-09',
  },
  {
    id: 'insight-009',
    title: 'China accounts for 67% of all AI research submissions',
    body: 'AAAI-26 received 29,000 submissions — 20,000 from China (67%). Chinese labs (DeepSeek, Qwen, Moonshot, Zhipu) are now competitive at the frontier. But US labs still lead on capability and commercial deployment. The AI geopolitics gap is narrowing faster than anyone predicted.',
    category: 'geopolitics',
    severity: 'shift',
    related_entities: ['deepseek', 'alibaba-qwen', 'moonshot-ai', 'zhipu', 'baidu-ai', 'sensetime'],
    related_charts: ['top-labs', 'top-models', 'top-scientists'],
    data_points: [
      { label: 'AAAI-26 subs', value: '29,000', delta: '' },
      { label: 'China share', value: '67%', delta: '20,000 papers' },
      { label: 'US notable models', value: '40', delta: 'vs China 15' },
    ],
    published_at: '2026-03-08',
  },
  {
    id: 'insight-010',
    title: 'Midjourney\'s impossible business: $500M revenue, $0 in ads, $0 in VC',
    body: 'Midjourney generated $500M in 2025 revenue with 107-163 employees, zero venture capital, and zero advertising spend. 26.8% market share in AI image generation. Profitable since month 8. Built entirely through Discord community virality. David Holz proved you can build a $500M AI business without Silicon Valley.',
    category: 'product',
    severity: 'signal',
    related_entities: ['midjourney-app', 'david-holz'],
    related_charts: ['top-creative-ai', 'top-tools', 'top-campaigns'],
    data_points: [
      { label: 'Revenue', value: '$500M', delta: '' },
      { label: 'VC raised', value: '$0', delta: '' },
      { label: 'Ad spend', value: '$0', delta: '' },
      { label: 'Market share', value: '26.8%', delta: '' },
    ],
    published_at: '2026-03-07',
  },
  {
    id: 'insight-011',
    title: 'The safety vs. speed divide: Anthropic leads ethics, xAI trails',
    body: 'Our Ethics Scorecard shows Anthropic at 78.6 composite (grade B+) vs xAI at 35.7 (grade F). Hugging Face leads overall at 82.9 (grade A-). The gap between safety-first labs and speed-first labs is widening. Regulators are taking notice. The EU AI Act is now being enforced.',
    category: 'safety',
    severity: 'trend',
    related_entities: ['anthropic', 'hugging-face', 'xai', 'openai'],
    related_charts: ['top-labs'],
    data_points: [
      { label: 'Hugging Face ethics', value: '82.9', delta: 'Grade A-' },
      { label: 'Anthropic ethics', value: '78.6', delta: 'Grade B+' },
      { label: 'OpenAI ethics', value: '58.6', delta: 'Grade C' },
      { label: 'xAI ethics', value: '35.7', delta: 'Grade F' },
    ],
    published_at: '2026-03-06',
  },
  {
    id: 'insight-012',
    title: 'The creator economy meets AI: newsletters are the new media empires',
    body: 'The Rundown AI has 2M+ subscribers with a 50.2% open rate. Superhuman AI has 1.5M+. TLDR AI has 1.25M+. These newsletters reach more people than most mainstream tech publications. AI media is being built by solo creators and small teams, not legacy media companies. The Visio Index tracks this shift.',
    category: 'culture',
    severity: 'trend',
    related_entities: ['rowan-cheung', 'tldr-ai', 'the-neuron', 'ben-tossell', 'ethan-mollick'],
    related_charts: ['top-communities', 'top-creators'],
    data_points: [
      { label: 'Rundown AI subs', value: '2M+', delta: '+10K/day' },
      { label: 'Total AI newsletter reach', value: '5M+', delta: '' },
      { label: 'Average open rate', value: '40%+', delta: 'vs 20% industry avg' },
    ],
    published_at: '2026-03-05',
  },
  {
    id: 'insight-013',
    title: 'African AI: 159 startups, $803M raised, but massive talent gap persists',
    body: 'Africa has 159 AI startups that have raised $803.2M total. InstaDeep was acquired for $680M. Intron Health handles 57 languages and 500+ African accents. Deep Learning Indaba spans 47 countries. But SA remains the only African country in Stanford\'s global AI index. The gap is infrastructure and compute, not talent.',
    category: 'geopolitics',
    severity: 'signal',
    related_entities: ['instadeep', 'lelapa-ai', 'intron-health', 'masakhane', 'data-science-nigeria', 'deep-learning-indaba', 'zindi'],
    related_charts: [],
    data_points: [
      { label: 'African AI startups', value: '159', delta: '' },
      { label: 'Total raised', value: '$803.2M', delta: '' },
      { label: 'Largest acquisition', value: 'InstaDeep $680M', delta: '' },
      { label: 'In Stanford index', value: '1 (SA only)', delta: '' },
    ],
    published_at: '2026-03-04',
  },
  {
    id: 'insight-014',
    title: 'Generational divide: Gen Z uses Suno and Midjourney, Millennials use Cursor and Claude',
    body: 'Our generational data shows a clear split. Gen Z (14-29) leads adoption of creative AI tools — Suno (88%), Midjourney (80%), Canva AI (82%). Millennials (30-45) dominate professional tools — Cursor (88%), Claude Code (82%), GitHub Copilot (82%). Gen X adopts where ecosystem loyalty exists — Gemini leads (65%) via Google. The AI products that win long-term will be the ones that bridge this generational divide.',
    category: 'culture',
    severity: 'signal',
    related_entities: ['suno', 'midjourney-app', 'cursor', 'claude-code', 'gemini-app'],
    related_charts: ['top-tools', 'top-creative-ai', 'top-code-ai'],
    data_points: [
      { label: 'Gen Z top tool', value: 'ChatGPT (92%)', delta: '' },
      { label: 'Millennial top tool', value: 'Cursor (88%)', delta: '' },
      { label: 'Gen X top tool', value: 'Gemini (65%)', delta: '' },
      { label: 'Boomer top tool', value: 'Gemini (45%)', delta: '' },
    ],
    published_at: '2026-03-03',
  },

  // ── MARCH 16 FRESH INTEL ───────────────────────────────────────────────
  {
    id: 'insight-015',
    title: 'NVIDIA GTC 2026 keynote TODAY — Rubin GPU architecture expected',
    body: 'Jensen Huang takes the stage at GTC 2026 in San Jose (30,000+ attendees). Expected announcements: Rubin GPU architecture (288GB HBM4, 5x dense FP performance), inference-optimized processor, NemoClaw open-source enterprise agent platform. Alphabet and Microsoft committed $320B+ combined 2026 CapEx on AI infrastructure. The hardware arms race is intensifying.',
    category: 'market',
    severity: 'breaking',
    related_entities: ['nvidia', 'jensen-huang', 'amd-ai', 'cerebras', 'tenstorrent'],
    related_charts: ['ai-hardware', 'top-ceos'],
    data_points: [
      { label: 'GTC attendees', value: '30,000+', delta: '' },
      { label: 'Expected: Rubin', value: '288GB HBM4', delta: '5x FP performance' },
      { label: 'Alphabet CapEx', value: '$180B (2026)', delta: '+98%' },
      { label: 'Microsoft CapEx', value: '$140B+ (2026)', delta: '+59%' },
    ],
    published_at: '2026-03-16',
  },
  {
    id: 'insight-016',
    title: 'GPT-5.4 released with native computer use — OpenAI fights back',
    body: 'OpenAI released GPT-5.4 on March 5 with native computer use, tool search, and 1M token context. GPT-5.1 was deprecated just 6 days later. The model release cadence is accelerating — OpenAI shipped 3 models in March alone. Meanwhile Claude Opus 4.6 holds #1 on LMSYS Arena at 1504 Elo. The frontier is a knife fight.',
    category: 'model',
    severity: 'breaking',
    related_entities: ['openai', 'gpt-5-4', 'claude-opus-4-6', 'gemini-3-1-pro', 'grok-4-20'],
    related_charts: ['top-models', 'top-labs'],
    data_points: [
      { label: 'LMSYS #1', value: 'Claude Opus 4.6', delta: '1504 Elo' },
      { label: 'LMSYS #2', value: 'Gemini 3.1 Pro', delta: '1500 Elo' },
      { label: 'LMSYS #4', value: 'Grok 4.20', delta: '1493 Elo' },
      { label: 'GPT-5.4', value: '1M context', delta: 'Computer use' },
    ],
    published_at: '2026-03-16',
  },
  {
    id: 'insight-017',
    title: 'OpenEvidence hits 1M doctor consultations in a single day',
    body: 'OpenEvidence — "ChatGPT for Doctors" — achieved 1 million clinical consultations in a single day on March 10. Used by 40%+ of US physicians across 10,000+ hospitals. $12B valuation after $250M Series D. This is what healthcare AI actually looks like: not replacing doctors, but augmenting every clinical decision in real-time.',
    category: 'product',
    severity: 'breaking',
    related_entities: ['openevidence', 'hippocratic-ai', 'google-deepmind'],
    related_charts: ['ai-healthcare'],
    data_points: [
      { label: 'Daily consults', value: '1M', delta: 'Historic first' },
      { label: 'US physicians', value: '40%+', delta: '' },
      { label: 'Valuation', value: '$12B', delta: 'Doubled' },
      { label: 'Hospitals', value: '10,000+', delta: '' },
    ],
    published_at: '2026-03-16',
  },
  {
    id: 'insight-018',
    title: 'Higgsfield AI: $200M ARR in under 9 months — video AI unicorn',
    body: 'Higgsfield AI reached $200M ARR and $1.3B valuation with 15M users generating 4.5M videos per day. From zero to unicorn in under 9 months. Backed by Accel and Menlo Ventures. Meanwhile Kling 3.0 shipped native 4K at 60fps, and Veo 3.1 added native audio. AI video is now broadcast-quality.',
    category: 'product',
    severity: 'shift',
    related_entities: ['higgsfield', 'kling-3-0', 'veo-3-1', 'sora', 'pika', 'luma-ai'],
    related_charts: ['top-creative-ai'],
    data_points: [
      { label: 'Higgsfield ARR', value: '$200M', delta: 'In <9 months' },
      { label: 'Users', value: '15M', delta: '' },
      { label: 'Kling 3.0', value: '4K 60fps', delta: 'Broadcast quality' },
      { label: 'Video gens/day', value: '4.5M', delta: '' },
    ],
    published_at: '2026-03-16',
  },
  {
    id: 'insight-019',
    title: 'OpenAI-DoD deal triggers #QuitGPT — 2.5M supporters, uninstalls surge 295%',
    body: 'OpenAI\'s agreement to deploy AI on classified DoD networks triggered the #QuitGPT movement with 2.5M+ supporters. ChatGPT uninstalls surged 295% overnight. Meanwhile Anthropic is suing the DoD after being labeled a "supply-chain risk." The AI industry\'s relationship with defense is fracturing along predictable lines: OpenAI embraces, Anthropic resists.',
    category: 'safety',
    severity: 'shift',
    related_entities: ['openai', 'anthropic', 'chatgpt', 'claude-app', 'sam-altman', 'dario-amodei'],
    related_charts: ['top-labs', 'top-tools'],
    data_points: [
      { label: '#QuitGPT', value: '2.5M+ supporters', delta: '' },
      { label: 'Uninstalls', value: '+295%', delta: 'Overnight' },
      { label: 'Anthropic', value: 'Suing DoD', delta: 'Filed in CA + DC' },
    ],
    published_at: '2026-03-15',
  },
  {
    id: 'insight-020',
    title: 'OpenAI reaches $110B raise at $840B — largest private venture round in history',
    body: 'OpenAI closed a $110B round at $840B post-money valuation — the largest private venture deal ever. Amazon committed $50B. IPO planned at up to $1T valuation. In the same month, Anthropic closed $30B at $380B (second-largest ever). February 2026 was the biggest startup funding month in history at $189B.',
    category: 'funding',
    severity: 'breaking',
    related_entities: ['openai', 'anthropic', 'sam-altman', 'dario-amodei'],
    related_charts: ['top-labs', 'top-investors'],
    data_points: [
      { label: 'OpenAI round', value: '$110B', delta: 'Largest ever' },
      { label: 'Valuation', value: '$840B', delta: 'IPO target $1T' },
      { label: 'Amazon', value: '$50B committed', delta: '' },
      { label: 'Feb 2026 total', value: '$189B', delta: 'Biggest month ever' },
    ],
    published_at: '2026-03-14',
  },
];

const severityOrder = { breaking: 0, shift: 1, trend: 2, signal: 3 };

export function getLatestInsights(count = 5): Insight[] {
  return [...liveInsights]
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    .slice(0, count);
}

export function getInsightsByCategory(category: Insight['category']): Insight[] {
  return liveInsights.filter((i) => i.category === category);
}

export function getInsightsForEntity(slug: string): Insight[] {
  return liveInsights.filter((i) => i.related_entities.includes(slug));
}

export function getInsightsForChart(chartSlug: string): Insight[] {
  return liveInsights.filter((i) => i.related_charts.includes(chartSlug));
}

export function getBreakingInsights(): Insight[] {
  return liveInsights
    .filter((i) => i.severity === 'breaking' || i.severity === 'shift')
    .sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
}

export function getAllInsights(): Insight[] {
  return [...liveInsights].sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
}
