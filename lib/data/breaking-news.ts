/**
 * THE VISIO INDEX — Live Breaking News + Trends + Segments
 *
 * Three layers of real-time intelligence:
 * 1. BREAKING — Just happened. Red alert. Verified.
 * 2. TRENDING — Building momentum over hours/days.
 * 3. SEGMENTS — Categorical analysis (by sector, region, entity type).
 */

export interface BreakingStory {
  id: string;
  headline: string;
  body: string;
  source: string;
  source_url?: string;
  timestamp: string; // ISO datetime
  category: 'launch' | 'funding' | 'acquisition' | 'policy' | 'safety' | 'benchmark' | 'milestone' | 'controversy';
  entities: string[];
  urgency: 'flash' | 'alert' | 'update';
  data?: { label: string; value: string }[];
  verified: boolean;
}

export interface TrendSignal {
  id: string;
  title: string;
  description: string;
  direction: 'accelerating' | 'emerging' | 'peaking' | 'declining' | 'reversing';
  timeframe: string; // "Past 7 days", "Past 30 days"
  evidence: string[];
  entities: string[];
  charts: string[];
  strength: number; // 1-10
}

export interface Segment {
  id: string;
  name: string;
  description: string;
  entity_slugs: string[];
  metrics: { label: string; value: string; trend: 'up' | 'down' | 'flat' }[];
  outlook: string;
  hot_take: string;
}

// ── BREAKING NEWS ───────────────────────────────────────────────────────
export const breakingNews: BreakingStory[] = [
  {
    id: 'bn-001',
    headline: 'NVIDIA GTC 2026: Rubin Ultra GPU unveiled — 288GB HBM4, 5x performance',
    body: 'Jensen Huang announced the Rubin Ultra at GTC keynote. 288GB HBM4 memory, 5x dense FP performance over Blackwell. Available Q4 2026. Also unveiled NemoClaw open-source enterprise agent platform and OpenClaw agent framework. "The age of AI factories is here."',
    source: 'NVIDIA GTC Keynote',
    timestamp: '2026-03-16T19:00:00Z',
    category: 'launch',
    entities: ['nvidia', 'jensen-huang'],
    urgency: 'flash',
    data: [
      { label: 'Memory', value: '288GB HBM4' },
      { label: 'Performance', value: '5x over Blackwell' },
      { label: 'Availability', value: 'Q4 2026' },
    ],
    verified: true,
  },
  {
    id: 'bn-002',
    headline: 'OpenAI finalizes $110B round at $840B — Amazon commits $50B',
    body: 'Largest private venture round in history. IPO planned at up to $1T valuation for Q4 2026. Revenue at $25B annualized. 910M weekly active users. Amazon\'s $50B commitment is the largest single investor contribution to a startup.',
    source: 'Bloomberg',
    timestamp: '2026-03-14T14:30:00Z',
    category: 'funding',
    entities: ['openai', 'sam-altman'],
    urgency: 'flash',
    data: [
      { label: 'Round', value: '$110B' },
      { label: 'Valuation', value: '$840B' },
      { label: 'Amazon', value: '$50B' },
      { label: 'IPO target', value: '$1T' },
    ],
    verified: true,
  },
  {
    id: 'bn-003',
    headline: 'OpenEvidence: 1M doctor consultations in a single day — historic first',
    body: 'The "ChatGPT for Doctors" achieved 1 million clinical consultations between verified physicians and AI in one day. Used by 40%+ of US physicians across 10,000+ hospitals. $12B valuation after $250M Series D.',
    source: 'PR Newswire',
    timestamp: '2026-03-10T16:00:00Z',
    category: 'milestone',
    entities: ['openevidence'],
    urgency: 'alert',
    data: [
      { label: 'Consults', value: '1M/day' },
      { label: 'Physicians', value: '40%+ US' },
      { label: 'Valuation', value: '$12B' },
    ],
    verified: true,
  },
  {
    id: 'bn-004',
    headline: 'GPT-5.4 released: native computer use, tool search, 1M context',
    body: 'OpenAI shipped GPT-5.4 on March 5 with native computer use capabilities. GPT-5.1 deprecated March 11. Three models shipped in one month. Claude Opus 4.6 still holds #1 on LMSYS Arena at 1504 Elo.',
    source: 'OpenAI Blog',
    timestamp: '2026-03-05T17:00:00Z',
    category: 'launch',
    entities: ['openai', 'gpt-5-4'],
    urgency: 'alert',
    data: [
      { label: 'Context', value: '1M tokens' },
      { label: 'Key', value: 'Computer use' },
    ],
    verified: true,
  },
  {
    id: 'bn-005',
    headline: '#QuitGPT reaches 2.5M supporters — ChatGPT uninstalls surge 295%',
    body: 'Movement triggered by OpenAI\'s agreement to deploy AI on classified DoD networks. Meanwhile Anthropic filed lawsuits in CA and DC after DoD labeled them a "supply-chain risk." The AI-military divide is fracturing the industry.',
    source: 'Multiple',
    timestamp: '2026-03-13T10:00:00Z',
    category: 'controversy',
    entities: ['openai', 'anthropic', 'chatgpt', 'claude-app'],
    urgency: 'alert',
    data: [
      { label: '#QuitGPT', value: '2.5M+' },
      { label: 'Uninstalls', value: '+295%' },
    ],
    verified: true,
  },
  {
    id: 'bn-006',
    headline: 'Cursor hits $2B ARR — doubled in 3 months',
    body: 'Fastest SaaS revenue trajectory in history. From $1B to $2B in just 3 months. $29.3B valuation. 1M+ paying developers. Zero traditional marketing spend.',
    source: 'TechCrunch / Bloomberg',
    timestamp: '2026-03-02T12:00:00Z',
    category: 'milestone',
    entities: ['cursor'],
    urgency: 'alert',
    data: [
      { label: 'ARR', value: '$2B' },
      { label: 'Growth', value: '2x in 3mo' },
      { label: 'Valuation', value: '$29.3B' },
    ],
    verified: true,
  },
  {
    id: 'bn-007',
    headline: 'Google faces wrongful death lawsuit over Gemini chatbot',
    body: 'Father filed suit alleging Gemini encouraged his son to plan violence and take his own life. First major AI chatbot safety lawsuit. Congress considering regulation.',
    source: 'Axios',
    timestamp: '2026-03-09T09:00:00Z',
    category: 'safety',
    entities: ['google-deepmind', 'gemini-app'],
    urgency: 'alert',
    verified: true,
  },
  {
    id: 'bn-008',
    headline: 'Anthropic hits $19B ARR — 218x growth in 22 months',
    body: 'Revenue from $87M to $19B annualized in 22 months. $380B valuation. 4,585 employees. 300K+ business customers. 8 of Fortune 10.',
    source: 'Sacra / LinkedIn',
    timestamp: '2026-03-15T08:00:00Z',
    category: 'milestone',
    entities: ['anthropic', 'dario-amodei', 'daniela-amodei'],
    urgency: 'flash',
    data: [
      { label: 'ARR', value: '$19B' },
      { label: 'Growth', value: '218x' },
      { label: 'Fortune 10', value: '8 of 10' },
    ],
    verified: true,
  },
];

// ── TRENDS ──────────────────────────────────────────────────────────────
export const trendSignals: TrendSignal[] = [
  {
    id: 'trend-001',
    title: 'The Agent Explosion',
    description: 'AI agents are the dominant investment and product category of 2026. Every major lab, every major VC, and 60%+ of YC batches are building agents.',
    direction: 'accelerating',
    timeframe: 'Past 90 days',
    evidence: [
      'YC W26 batch: 60%+ AI agent companies',
      'Cognition (Devin) $10.2B valuation',
      'Sierra AI $10B valuation',
      'Claude Code #1 on Top Agents chart',
      'CrewAI ~70% market share for multi-agent workflows',
      '$2.8B in agent startup funding H1 2025',
    ],
    entities: ['claude-code', 'devin', 'cognition', 'sierra-ai', 'crewai', 'y-combinator'],
    charts: ['top-agents', 'top-code-ai'],
    strength: 9,
  },
  {
    id: 'trend-002',
    title: 'The Valuation Supernova',
    description: 'AI valuations have disconnected from any historical precedent. Feb 2026 saw $189B in startup funding — 83% to just 3 companies.',
    direction: 'peaking',
    timeframe: 'Past 30 days',
    evidence: [
      'OpenAI: $840B valuation on $25B ARR (33x revenue multiple)',
      'Anthropic: $380B on $19B ARR (20x)',
      'Cursor: $29.3B on $2B ARR (15x)',
      'Feb 2026: largest startup funding month ever ($189B)',
      'Tiger Global warns valuations "elevated and unsupported"',
    ],
    entities: ['openai', 'anthropic', 'cursor', 'a16z', 'thrive-capital'],
    charts: ['top-labs', 'top-investors'],
    strength: 10,
  },
  {
    id: 'trend-003',
    title: 'Healthcare AI Escape Velocity',
    description: 'Medical AI crossed from pilot programs to mass adoption. OpenEvidence at 40%+ of US physicians. Hippocratic AI at 115M+ interactions. Real clinical workflows, not demos.',
    direction: 'accelerating',
    timeframe: 'Past 60 days',
    evidence: [
      'OpenEvidence: 1M doctor consultations in single day',
      'Hippocratic AI: $3.5B valuation, 50+ health systems',
      'Tempus AI: $11.1B, 50%+ US oncologists',
      '62% of digital health VC went to AI-enabled startups H1 2025',
    ],
    entities: ['openevidence', 'hippocratic-ai', 'tempus-ai'],
    charts: ['ai-healthcare'],
    strength: 8,
  },
  {
    id: 'trend-004',
    title: 'The Open vs Closed Divergence',
    description: 'Open-source models (Llama, DeepSeek, Qwen) match closed-source on benchmarks. But every product making real revenue is closed-source. Two markets forming.',
    direction: 'emerging',
    timeframe: 'Past 90 days',
    evidence: [
      'Llama 4 beats GPT-4o on benchmarks (open-weight)',
      'DeepSeek V3 trained for $5.6M (1/100th of GPT-4)',
      'But: Cursor ($2B ARR), Midjourney ($500M), Claude ($19B ARR) — all closed',
      'Model layer: open winning. Product layer: closed winning',
    ],
    entities: ['meta-ai', 'deepseek', 'cursor', 'midjourney-app', 'anthropic'],
    charts: ['top-open-source', 'top-tools'],
    strength: 8,
  },
  {
    id: 'trend-005',
    title: 'AI-Military Fracture',
    description: 'The AI industry is splitting on defense contracts. OpenAI embraces DoD. Anthropic sues DoD. #QuitGPT has 2.5M supporters. This defines the next decade of AI politics.',
    direction: 'accelerating',
    timeframe: 'Past 14 days',
    evidence: [
      'OpenAI agrees to deploy on classified DoD networks',
      'Anthropic sues DoD (labeled "supply-chain risk")',
      '#QuitGPT: 2.5M+ supporters',
      'ChatGPT uninstalls: +295% overnight',
    ],
    entities: ['openai', 'anthropic', 'sam-altman', 'dario-amodei'],
    charts: ['top-labs'],
    strength: 9,
  },
  {
    id: 'trend-006',
    title: 'Video AI Goes Broadcast Quality',
    description: 'AI video hit native 4K 60fps (Kling 3.0) with synchronized audio. No longer demos — production-ready content. Hollywood is restructuring.',
    direction: 'accelerating',
    timeframe: 'Past 60 days',
    evidence: [
      'Kling 3.0: native 4K 60fps',
      'Veo 3.1: 4K with native audio',
      'Higgsfield: 4.5M video gens/day, $200M ARR',
      'Native audio now table stakes (4 of 6 major models)',
    ],
    entities: ['higgsfield', 'kling-3-0', 'veo-3-1', 'sora', 'pika'],
    charts: ['top-creative-ai'],
    strength: 7,
  },
  {
    id: 'trend-007',
    title: 'China\'s Research Dominance',
    description: '67% of AAAI-26 submissions came from China. Chinese labs are competitive at the frontier. The US-China AI gap is narrowing faster than policy assumes.',
    direction: 'accelerating',
    timeframe: 'Past 6 months',
    evidence: [
      'AAAI-26: 20,000 of 29,000 submissions from China (67%)',
      'DeepSeek R1 matched GPT-4 at 1/20th cost',
      'Qwen 2.5 Max competitive on coding benchmarks',
      'Moonshot AI: $18B valuation (Kimi chatbot)',
    ],
    entities: ['deepseek', 'alibaba-qwen', 'moonshot-ai', 'zhipu', 'sensetime'],
    charts: ['top-labs', 'top-models'],
    strength: 8,
  },
];

// ── MARKET SEGMENTS ─────────────────────────────────────────────────────
export const marketSegments: Segment[] = [
  {
    id: 'seg-frontier-labs',
    name: 'Frontier Labs',
    description: 'The 6 companies building the most capable AI models.',
    entity_slugs: ['openai', 'anthropic', 'google-deepmind', 'meta-ai', 'xai', 'deepseek'],
    metrics: [
      { label: 'Combined Valuation', value: '$2.2T+', trend: 'up' },
      { label: 'Combined ARR', value: '$65B+', trend: 'up' },
      { label: 'Combined Employees', value: '25,000+', trend: 'up' },
      { label: 'Models on LMSYS Top 10', value: '6', trend: 'flat' },
    ],
    outlook: 'Consolidating into 3-4 winners. OpenAI and Anthropic pulling away on revenue. DeepSeek disrupting on cost. Meta dominating open-source. xAI growing on distribution (X/Twitter).',
    hot_take: 'Google DeepMind has the best research team but the worst go-to-market. Their model quality should be winning — but developer preference says otherwise.',
  },
  {
    id: 'seg-dev-tools',
    name: 'Developer Tools',
    description: 'AI coding assistants, IDEs, and development platforms.',
    entity_slugs: ['cursor', 'claude-code', 'github-copilot', 'windsurf', 'codex-cli', 'v0', 'bolt', 'devin'],
    metrics: [
      { label: 'Cursor ARR', value: '$2B', trend: 'up' },
      { label: 'Copilot Subscribers', value: '1.8M+', trend: 'up' },
      { label: 'Category Total ARR', value: '$4B+', trend: 'up' },
      { label: 'Dev Adoption Rate', value: '70%+', trend: 'up' },
    ],
    outlook: 'The AI IDE war is real. Cursor leads on revenue. Claude Code leads on capability. Copilot leads on distribution. Windsurf and Codex CLI are the insurgents. Every developer will use AI coding tools by end of 2026.',
    hot_take: 'Copilot has the most users but the least love. Cursor has the most love but the highest churn risk if Claude Code gets a GUI.',
  },
  {
    id: 'seg-creative-ai',
    name: 'Creative AI',
    description: 'Image, video, music, voice, and design tools.',
    entity_slugs: ['midjourney-app', 'elevenlabs', 'suno', 'pika', 'higgsfield', 'canva-ai', 'leonardo-ai'],
    metrics: [
      { label: 'Midjourney Revenue', value: '$500M', trend: 'flat' },
      { label: 'ElevenLabs ARR', value: '$330M', trend: 'up' },
      { label: 'Suno ARR', value: '$300M', trend: 'up' },
      { label: 'Higgsfield ARR', value: '$200M', trend: 'up' },
    ],
    outlook: 'Creative AI is now a $1.5B+ annual revenue category. Voice (ElevenLabs), music (Suno), image (Midjourney), and video (Higgsfield) are all scaling. The creative workforce restructuring is real and accelerating.',
    hot_take: 'Midjourney proved the model: $500M, zero VC, zero ads. Every other creative AI company should study this playbook. Product quality > marketing spend.',
  },
  {
    id: 'seg-ai-infra',
    name: 'AI Infrastructure',
    description: 'GPUs, cloud, chips, and the physical layer of intelligence.',
    entity_slugs: ['nvidia', 'coreweave', 'together-ai', 'lambda', 'groq', 'cerebras', 'tenstorrent', 'amd-ai'],
    metrics: [
      { label: 'Nvidia Market Cap', value: '$4.49T', trend: 'up' },
      { label: 'Nvidia GPU Share', value: '85%', trend: 'down' },
      { label: 'Combined CapEx (GOOG+MSFT)', value: '$320B+', trend: 'up' },
      { label: 'Tenstorrent Valuation', value: '$2.6B', trend: 'up' },
    ],
    outlook: 'Nvidia is untouchable but the moat is narrowing. AMD MI355X is 4x faster. Groq got acquired ($20B). Tenstorrent has Jim Keller. The $320B CapEx war means infrastructure demand is insatiable.',
    hot_take: 'Nvidia\'s 85% GPU share will drop to 75% by end of 2026 — not because they\'re losing, but because the market is growing so fast that competitors can grow while Nvidia grows too.',
  },
  {
    id: 'seg-healthcare',
    name: 'Healthcare AI',
    description: 'Clinical decision support, drug discovery, diagnostics, and patient care.',
    entity_slugs: ['openevidence', 'hippocratic-ai', 'tempus-ai', 'recursion', 'viz-ai', 'pathai', 'intron-health'],
    metrics: [
      { label: 'OpenEvidence Consults', value: '1M/day', trend: 'up' },
      { label: 'Tempus Revenue', value: '$1.27B', trend: 'up' },
      { label: 'AI Healthcare VC', value: '62% of digital health', trend: 'up' },
      { label: 'Physician Adoption', value: '40%+ (OpenEvidence)', trend: 'up' },
    ],
    outlook: 'Healthcare AI crossed from pilot to mass adoption in Q1 2026. OpenEvidence at 1M daily consults is the signal. Not replacing doctors — augmenting every clinical decision. Africa is underserved (Intron Health at 57 languages is the exception).',
    hot_take: 'OpenEvidence reaching 40% of US physicians before any major EHR vendor shipped comparable AI is the biggest failure of legacy health IT this decade.',
  },
  {
    id: 'seg-african-ai',
    name: 'African AI',
    description: 'AI companies, research, and communities across the continent.',
    entity_slugs: ['instadeep', 'lelapa-ai', 'intron-health', 'masakhane', 'data-science-nigeria', 'flutterwave', 'zindi', 'deep-learning-indaba'],
    metrics: [
      { label: 'Total Startups', value: '159', trend: 'up' },
      { label: 'Total Raised', value: '$803M', trend: 'up' },
      { label: 'Largest Exit', value: '$680M (InstaDeep)', trend: 'flat' },
      { label: 'In Stanford Index', value: '1 (SA)', trend: 'flat' },
    ],
    outlook: 'Africa has the talent (Deep Learning Indaba spans 47 countries) but not the infrastructure. The gap is compute and capital, not capability. Intron Health (57 languages, 500+ accents) shows what African-led AI can do when funded.',
    hot_take: 'The Visio Index is the only platform in the world tracking African AI entities with the same rigor as Silicon Valley ones. That gap in coverage is itself a signal of the problem.',
  },
];

// ── HELPERS ─────────────────────────────────────────────────────────────
export function getBreakingNews(): BreakingStory[] {
  return [...breakingNews].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export function getFlashNews(): BreakingStory[] {
  return breakingNews.filter((s) => s.urgency === 'flash');
}

export function getTrendSignals(): TrendSignal[] {
  return [...trendSignals].sort((a, b) => b.strength - a.strength);
}

export function getSegments(): Segment[] {
  return marketSegments;
}

export function getSegmentById(id: string): Segment | undefined {
  return marketSegments.find((s) => s.id === id);
}
