/**
 * THE VISIO INDEX — Weekly Intelligence Briefing
 *
 * This is not a newsletter. It's an intelligence report.
 * Structured like a Bloomberg terminal briefing, not a blog post.
 *
 * Sections mirror how an analyst or executive would consume AI news:
 * 1. EXECUTIVE SUMMARY — 5 bullets, the whole week in 30 seconds
 * 2. CHART MOVEMENTS — Who moved, why, what it means
 * 3. FUNDING & DEALS — Money flowing, valuations shifting
 * 4. MODEL RELEASES — What shipped, benchmarks, who's winning
 * 5. PRODUCT LAUNCHES — New tools, features, integrations
 * 6. REGULATORY & POLICY — What governments are doing
 * 7. RESEARCH & PAPERS — Breakthroughs from the labs
 * 8. CULTURAL SIGNALS — What mainstream is saying about AI
 * 9. AFRICA & EMERGING — AI outside US/EU/China
 * 10. THE VISIO VERDICT — Our editorial take on the week
 */

export interface BriefingSection {
  id: string;
  title: string;
  icon: string; // emoji for rendering
  items: BriefingItem[];
}

export interface BriefingItem {
  headline: string;
  body: string;
  source?: string;
  source_url?: string;
  entities: string[]; // slugs
  importance: 'critical' | 'high' | 'medium' | 'low';
  data?: { label: string; value: string }[];
}

export interface WeeklyBriefing {
  id: string;
  week_start: string;
  week_end: string;
  title: string;
  executive_summary: string[];
  sections: BriefingSection[];
  chairmans_signal: {
    headline: string;
    body: string;
  };
  contrarian_corner: {
    headline: string;
    body: string;
  };
  week_ahead: string[];
  verdict: {
    title: string;
    body: string;
    outlook: 'bullish' | 'bearish' | 'neutral' | 'volatile';
  };
  stats: {
    models_released: number;
    funding_total: string;
    entities_moved: number;
    new_entries: number;
    arxiv_papers: number;
    github_trending: number;
  };
}

// ── WEEK OF MARCH 10-16, 2026 ──────────────────────────────────────────
export const currentBriefing: WeeklyBriefing = {
  id: 'briefing-2026-w11',
  week_start: '2026-03-10',
  week_end: '2026-03-16',
  title: 'The $840B Week',
  chairmans_signal: {
    headline: 'The valuation numbers have lost meaning. The product numbers haven\'t.',
    body: 'OpenAI at $840B and Anthropic at $380B are disconnected from any reasonable revenue multiple. But Claude Opus 4.6 holding #1 on Arena, Cursor doubling ARR in 3 months, and OpenEvidence hitting 1M doctor consults in a day — those are real. The market is pricing in AGI timelines, but the products that are actually winning are winning on execution. When the correction comes — and it will — the companies with real usage (Anthropic, Cursor, Midjourney, Perplexity) will survive. The ones running on narrative alone won\'t. Watch the product metrics, not the funding announcements.',
  },
  contrarian_corner: {
    headline: 'Open-source AI is winning the war but losing the battle that matters',
    body: 'Llama 4 hit 1B downloads. DeepSeek V3 trained for $5.6M. Everyone declares open-source is winning. But here\'s what nobody says: the best developer tool is Cursor ($29.3B, closed-source). The best agent is Claude Code (closed-source). The best creative tool is Midjourney (closed-source, no VC). The best enterprise AI is Claude ($19B ARR, closed-source API). Open-source models are the foundation layer — but every product built on top of them that actually makes money is closed-source. Open-source is winning the model war while closed-source is winning the product war. That\'s the battle that pays salaries.',
  },
  week_ahead: [
    'NVIDIA GTC 2026 continues March 17-19 — watch for Rubin GPU pricing, availability dates, and developer tools.',
    'DeepSeek V4 launch could happen any day — ~1T params, natively multimodal. If benchmarks match leaks, it reshapes the open-source landscape.',
    'EU AI Act SMB compliance subsidies open — first wave of applications expected.',
    'Apple iOS 26.4 expected with reimagined Siri powered by Gemini. First real Apple AI product for consumers.',
    'Anthropic Claude Partner Network early access begins — enterprise integrations going live.',
  ],
  executive_summary: [
    'OpenAI closed $110B at $840B valuation — largest private venture round in history. IPO target: $1T.',
    'Claude Opus 4.6 holds #1 on LMSYS Arena (1504 Elo) as GPT-5.4 ships with native computer use.',
    'NVIDIA GTC 2026 keynote March 16 — Rubin GPU expected. Nvidia at $4.49T market cap.',
    'OpenEvidence hits 1M doctor consultations in a single day. Healthcare AI reached escape velocity.',
    '#QuitGPT movement reaches 2.5M supporters after OpenAI-DoD deal. Uninstalls surge 295%.',
  ],
  sections: [
    {
      id: 'chart-movements',
      title: 'Chart Movements',
      icon: '📊',
      items: [
        {
          headline: 'Anthropic climbs to #2 on Top Labs, overtaking Google DeepMind',
          body: '$19B annualized revenue and $380B valuation pushed Anthropic past Google DeepMind for the first time. Claude\'s enterprise penetration — 300K+ business customers, 8 of Fortune 10 — is now rivaling ChatGPT\'s consumer dominance.',
          entities: ['anthropic', 'google-deepmind'],
          importance: 'critical',
          data: [{ label: 'Anthropic ARR', value: '$19B' }, { label: 'Enterprise', value: '300K+ customers' }],
        },
        {
          headline: 'Cursor maintains #1 on Top Code AI with $2B ARR',
          body: 'Revenue doubled from $1B in just 3 months. $29.3B valuation. Fastest SaaS revenue trajectory in history. Claude Code rising fast at #2 — the terminal-vs-IDE battle is the defining competition in developer tools.',
          entities: ['cursor', 'claude-code'],
          importance: 'high',
          data: [{ label: 'Cursor ARR', value: '$2B' }, { label: 'Growth', value: '2x in 3 months' }],
        },
        {
          headline: 'Llama 4 Maverick enters Top Models at #7 — highest open-weight debut',
          body: 'Meta\'s 400B MoE (17B active params) beats GPT-4o on benchmarks while being fully open-weight. Hot Shot Debut. Llama 4 Scout also entered at #13 with a 10M token context window.',
          entities: ['llama-4-maverick', 'llama-4-scout', 'meta-ai'],
          importance: 'high',
        },
        {
          headline: 'Codex CLI enters Top Tools at #17 — OpenAI\'s open-source agent play',
          body: 'OpenAI\'s answer to Claude Code. Apache 2.0 license. Terminal-based agentic coding powered by o4-mini. Strategic open-source move in a category Claude Code is dominating.',
          entities: ['codex-cli', 'claude-code'],
          importance: 'medium',
        },
      ],
    },
    {
      id: 'funding-deals',
      title: 'Funding & Deals',
      icon: '💰',
      items: [
        {
          headline: 'OpenAI $110B at $840B — largest private venture round in history',
          body: 'Amazon committed $50B to the round. IPO planned at up to $1T valuation for Q4 2026. Revenue at $25B annualized run-rate. 910M weekly active users.',
          source: 'Bloomberg',
          entities: ['openai', 'sam-altman'],
          importance: 'critical',
          data: [{ label: 'Round', value: '$110B' }, { label: 'Valuation', value: '$840B' }, { label: 'ARR', value: '$25B' }],
        },
        {
          headline: 'Anthropic $30B at $380B — second-largest ever',
          body: 'Revenue grew from $87M to $19B annualized in 22 months (218x). 4,585 employees. The safety-first brand strategy is paying off at massive scale.',
          source: 'Anthropic Blog',
          entities: ['anthropic', 'dario-amodei', 'daniela-amodei'],
          importance: 'critical',
          data: [{ label: 'Round', value: '$30B' }, { label: 'ARR', value: '$19B' }, { label: 'Growth', value: '218x in 22 months' }],
        },
        {
          headline: 'Higgsfield hits $1.3B unicorn status with $200M ARR',
          body: '$138M total raised. 15M users. 4.5M video generations per day. From zero to unicorn in under 9 months. The fastest AI unicorn journey outside of ChatGPT.',
          source: 'PR Newswire',
          entities: ['higgsfield'],
          importance: 'high',
          data: [{ label: 'ARR', value: '$200M' }, { label: 'Users', value: '15M' }, { label: 'Valuation', value: '$1.3B' }],
        },
        {
          headline: 'Replit $400M Series D at $9B',
          body: 'Up from $3B six months prior. AI-first coding platform scaling. Replit Agent gaining traction as a builder tool.',
          source: 'Crunchbase',
          entities: ['replit-agent'],
          importance: 'medium',
        },
        {
          headline: 'OpenEvidence $250M Series D at $12B — doubled valuation',
          body: '"ChatGPT for Doctors" reached 1M clinical consultations in a single day. Used by 40%+ of US physicians. The most widely used medical AI among verified US physicians.',
          source: 'CNBC',
          entities: ['openevidence'],
          importance: 'high',
          data: [{ label: 'Valuation', value: '$12B' }, { label: 'Daily consults', value: '1M' }],
        },
      ],
    },
    {
      id: 'model-releases',
      title: 'Model Releases',
      icon: '🧠',
      items: [
        {
          headline: 'GPT-5.4 — native computer use, tool search, 1M context',
          body: 'Released March 5. OpenAI deprecated GPT-5.1 just 6 days later. The release cadence is accelerating. But Claude Opus 4.6 still holds #1 on LMSYS Arena at 1504 Elo.',
          entities: ['openai', 'gpt-5-4'],
          importance: 'critical',
          data: [{ label: 'Context', value: '1M tokens' }, { label: 'Key feature', value: 'Computer use' }],
        },
        {
          headline: 'Gemini 3.1 Pro — leading on 13/16 major benchmarks',
          body: '77.1% on ARC-AGI-2 (novel reasoning). 1500 Elo on LMSYS Arena (preliminary). Google\'s strongest showing in the model race.',
          entities: ['gemini-3-1-pro', 'google-deepmind'],
          importance: 'high',
          data: [{ label: 'ARC-AGI-2', value: '77.1%' }, { label: 'Arena Elo', value: '1500' }],
        },
        {
          headline: 'Grok 4.20 beta — multi-agent reasoning',
          body: '1493 Elo on LMSYS Arena. Lower hallucination rates. xAI moving fast with community-tracked beta releases.',
          entities: ['grok-4-20', 'xai'],
          importance: 'medium',
        },
        {
          headline: 'DeepSeek V4 delayed — the most anticipated open-source release',
          body: '~1 trillion params, ~32B active/token, natively multimodal, 1M context. Multiple delays. Leaked benchmarks suggest Opus 4.6/GPT-5.3 tier. When it ships, it could reshape the open-source landscape again.',
          entities: ['deepseek'],
          importance: 'high',
        },
        {
          headline: 'Kling 3.0 — native 4K video at 60fps',
          body: 'Kuaishou\'s video model now generates broadcast-quality content. Multi-shot sequences with subject consistency. The video AI quality bar just leapt forward.',
          entities: ['kling-3-0'],
          importance: 'medium',
        },
      ],
    },
    {
      id: 'product-launches',
      title: 'Product Launches',
      icon: '🚀',
      items: [
        {
          headline: 'Anthropic launches Claude Partner Network with $100M commitment',
          body: 'March 12. Enterprise Claude adoption accelerator. Signal that Anthropic is moving from lab to platform company.',
          entities: ['anthropic'],
          importance: 'high',
        },
        {
          headline: 'Ideogram 3.0 — best text rendering in AI images',
          body: 'Custom fonts, text spacing controls. The go-to for designers who need text in their AI-generated images. Released March 2026.',
          entities: ['ideogram-3'],
          importance: 'medium',
        },
        {
          headline: 'Apple Siri Reimagined targeting March with iOS 26.4',
          body: 'Context-aware, cross-app integration, powered by Gemini on Apple Private Cloud Compute. Apple\'s answer to ChatGPT integration.',
          entities: [],
          importance: 'medium',
        },
      ],
    },
    {
      id: 'regulatory-policy',
      title: 'Regulatory & Policy',
      icon: '⚖️',
      items: [
        {
          headline: '#QuitGPT: 2.5M supporters after OpenAI-DoD agreement',
          body: 'OpenAI agreed to deploy AI on classified DoD networks. ChatGPT uninstalls surged 295% overnight. Meanwhile, Anthropic is suing the DoD after being labeled a "supply-chain risk." The AI-military divide is now the defining political fault line in AI.',
          entities: ['openai', 'anthropic', 'sam-altman', 'dario-amodei'],
          importance: 'critical',
        },
        {
          headline: 'EU AI Act — full compliance required by August 2026',
          body: 'European AI Office active. Max penalties: €35M or 7% global revenue. SMB compliance subsidies opening March 2026. US still has no federal AI law.',
          entities: [],
          importance: 'high',
        },
        {
          headline: 'Washington passes AI disclosure and chatbot safety bills',
          body: 'HB 1170 (AI disclosure) and HB 2225 (chatbot safety for kids) passed March 12. State-level regulation filling the federal vacuum.',
          entities: [],
          importance: 'medium',
        },
      ],
    },
    {
      id: 'research-papers',
      title: 'Research & Papers',
      icon: '📄',
      items: [
        {
          headline: 'LMSYS Arena March 5 update: Claude Opus 4.6 holds #1',
          body: '1504 Elo with 8,945 votes. Gemini 3.1 Pro Preview at 1500 Elo (preliminary, 4,042 votes). Claude Opus 4.6 Thinking at 1500 Elo. Grok 4.20 beta at 1493 Elo.',
          entities: ['claude-opus-4-6', 'gemini-3-1-pro', 'grok-4-20'],
          importance: 'high',
          data: [{ label: '#1', value: 'Claude Opus 4.6 (1504)' }, { label: '#2', value: 'Gemini 3.1 Pro (1500)' }],
        },
        {
          headline: 'SWE-Bench Verified: Claude Opus 4.5 leads at 80.9%',
          body: 'The coding benchmark that matters most. Anthropic models continue to dominate real-world software engineering evaluation.',
          entities: ['anthropic'],
          importance: 'medium',
        },
      ],
    },
    {
      id: 'cultural-signals',
      title: 'Cultural Signals',
      icon: '🌍',
      items: [
        {
          headline: 'Google Gemini chatbot lawsuit — father alleges AI encouraged violence',
          body: 'Wrongful death suit filed after father claims Gemini encouraged his son to plan violence. The first major AI chatbot safety lawsuit. Google under pressure.',
          source: 'Axios',
          entities: ['google-deepmind', 'gemini-app'],
          importance: 'critical',
        },
        {
          headline: 'Grok Aurora generates ~3M sexualized images in 11 days',
          body: 'CCDH documented mass "digital undressing" using Grok\'s Aurora image model. xAI\'s safety score on our ethics chart: F (35.7). This is why ethics tracking matters.',
          entities: ['xai'],
          importance: 'high',
        },
        {
          headline: 'Atlassian lays off 1,600 (10%) — AI restructuring accelerates',
          body: 'March 11. Company pivoting to AI-first. The latest in a wave of tech layoffs driven by AI capability replacing human tasks.',
          entities: [],
          importance: 'medium',
        },
      ],
    },
    {
      id: 'emerging-markets',
      title: 'Africa & Emerging Markets',
      icon: '🌍',
      items: [
        {
          headline: 'Intron Health expands Sahara to 57 languages and 500+ African accents',
          body: 'Nigerian clinical speech recognition startup achieving 92% medical accuracy across African accents. Solving the problem that Western AI companies ignore.',
          source: 'TechCabal',
          entities: ['intron-health'],
          importance: 'high',
        },
        {
          headline: 'Deep Learning Indaba 2026 confirmed for Nigeria',
          body: 'Spanning 47 countries via IndabaX. The premier African AI conference continues to build capacity across the continent.',
          entities: ['deep-learning-indaba'],
          importance: 'medium',
        },
      ],
    },
    {
      id: 'hardware-infra',
      title: 'Hardware & Infrastructure',
      icon: '⚡',
      items: [
        {
          headline: 'NVIDIA GTC 2026 — March 16-19, San Jose',
          body: '30,000+ attendees. Jensen Huang keynote TODAY. Expected: Rubin GPU architecture (288GB HBM4, 5x dense FP performance), NemoClaw enterprise agent platform. The most important hardware event of the year.',
          entities: ['nvidia', 'jensen-huang'],
          importance: 'critical',
          data: [{ label: 'Attendees', value: '30,000+' }, { label: 'Expected', value: 'Rubin GPU' }],
        },
        {
          headline: 'Alphabet + Microsoft commit $320B+ combined 2026 CapEx',
          body: 'Alphabet $180B (+98%), Microsoft $140B+ (+59%). The infrastructure spending war is unlike anything in tech history. More than the GDP of 150+ countries.',
          entities: ['nvidia', 'google-deepmind'],
          importance: 'critical',
          data: [{ label: 'Combined', value: '$320B+' }, { label: 'Alphabet', value: '$180B (+98%)' }],
        },
      ],
    },
  ],
  verdict: {
    title: 'The $840B Week',
    body: 'This was the week AI became too big to ignore for anyone. OpenAI at $840B. Anthropic at $380B. $320B in combined CapEx from two companies. 1M doctor consultations in a day. And a #QuitGPT movement with 2.5M supporters. The numbers are so large they\'ve lost meaning. What hasn\'t lost meaning: Claude Opus 4.6 holds #1 on Arena. Cursor hit $2B ARR in 3 months. Midjourney made $500M with zero ads. The winners are the ones shipping product, not the ones raising rounds. Our outlook: volatile. The valuations are disconnected from revenue for most. But the products that are winning — Claude, Cursor, Midjourney, Perplexity — are winning on merit. That\'s bullish for the industry, even if individual bets are overpriced.',
    outlook: 'volatile',
  },
  stats: {
    models_released: 7,
    funding_total: '$142B+',
    entities_moved: 15,
    new_entries: 4,
    arxiv_papers: 2847,
    github_trending: 23,
  },
};

export const pastBriefings: WeeklyBriefing[] = [currentBriefing];

export function getCurrentBriefing(): WeeklyBriefing {
  return currentBriefing;
}

export function getBriefingById(id: string): WeeklyBriefing | undefined {
  return pastBriefings.find((b) => b.id === id);
}
