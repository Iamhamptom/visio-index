/**
 * Editorial chart notes — the "why" behind movements.
 * Billboard never shows a chart without narrative context.
 * This is what makes it media, not just data.
 */

// Movement narratives — one line explaining WHY an entity moved
export const movementNotes: Record<string, string> = {
  // Labs
  'openai': 'Holds #1 for 52nd consecutive week. ChatGPT crossed 300M WAU, but Anthropic is closing the gap on developer mindshare.',
  'anthropic': 'Climbs to #2 after Claude Opus 4.6 dominated SWE-Bench. The "safety lab" narrative is shifting to "capability leader."',
  'google-deepmind': 'Drops to #3. Gemini 2.5 Pro is strong but Google\'s distribution advantage isn\'t translating to developer preference.',
  'meta-ai': 'Steady at #4. Llama 4 Maverick release drove massive open-source buzz but enterprise adoption lags closed-source competitors.',
  'xai': 'Rises to #5 from #7. Grok 3\'s coding performance surprised everyone. The Memphis Supercluster investment is paying off.',
  'deepseek': 'Climbs to #6. The "frontier AI for $5.6M" narrative continues to resonate. R1 is becoming a standard benchmark reference.',

  // Models
  'claude-opus-4-6': 'Takes #1 from GPT-4.5. 72.5% SWE-Bench and 1M context made it the model developers actually want to use, not just benchmark.',
  'gpt-4-5': 'Drops to #2. Massive parameter count reduces hallucinations but cost and speed keep Claude Sonnet as the practical choice for most.',
  'gemini-2-5-pro': 'Holds #3. 1M context and native multimodal keep it competitive, but developer sentiment trails Claude and GPT.',
  'llama-4-maverick': 'HOT SHOT DEBUT at #7. 400B MoE with 17B active params — beating GPT-4o on benchmarks while being open-weight.',
  'deepseek-r1': 'Rises to #6. The chain-of-thought specialist that proved reasoning doesn\'t require trillion-dollar compute.',
  'llama-4-scout': 'NEW entry at #13. 10M token context window — 10x more than any competitor. The long-context wars just escalated.',

  // Tools
  'chatgpt': 'Untouchable at #1. 300M WAU is a moat no one can cross. The question isn\'t whether ChatGPT leads — it\'s by how much.',
  'claude-app': 'Climbs to #2. Projects and Artifacts made Claude the preferred tool for developers and analysts. Growth rate is the highest in the category.',
  'cursor': 'Drops to #3 but $9B valuation proves the AI IDE category is real. Competition from Claude Code and Windsurf is intensifying.',
  'claude-code': 'BIGGEST GAINER — rises from #8 to #6. Terminal-native agentic coding is defining how senior engineers work in 2026.',
  'codex-cli': 'NEW entry at #17. OpenAI\'s open-source answer to Claude Code. Apache 2.0 license is a strategic move.',

  // Creators
  'andrej-karpathy': 'Untouchable at #1. Eureka Labs + YouTube series = the most trusted voice in AI education. Period.',
  'fireship': 'Holds #2. 3.2M subs and climbing. Makes complex AI accessible without dumbing it down.',
  'dario-amodei': 'Rises to #5. "Machines of Loving Grace" essay and Anthropic\'s capability surge raised his profile beyond safety circles.',

  // CEOs
  'jensen-huang': 'Untouchable at #1. $3.4T market cap. Every AI lab needs his GPUs. The leather jacket is the uniform of the AI era.',
  'satya-nadella': 'The $13B bet on OpenAI made Microsoft the default enterprise AI stack. Copilot revenue is the fastest-growing in Microsoft history.',
  'sundar-pichai': 'Falling behind despite Gemini 2.5 Pro being technically strong. Google\'s distribution should be winning — but developer preference says otherwise.',
  'mark-zuckerberg': 'The open-source pivot is working. Llama 4 downloads in first week exceeded all previous releases combined. $65B AI spend is the biggest bet in tech.',
  'alexandr-wang': 'Scale AI hit $1B ARR. Started the company at 19. Now the youngest self-made billionaire. Data is still the bottleneck of AI.',
  'aravind-srinivas': 'Perplexity hit $9B valuation. Growing 20% month-over-month. The first real threat to Google Search in 25 years.',

  // Scientists
  'geoffrey-hinton': 'Nobel Prize 2024 confirmed what the field already knew — he\'s the most important computer scientist alive. Now spending his time warning about the risks.',
  'yann-lecun': 'Still the loudest voice in the open-source AI debate. Meta\'s chief scientist and X\'s most combative AI thought leader.',
  'fei-fei-li': 'World Labs hit $4.5B valuation. From ImageNet to spatial intelligence. Proving that fundamental research creates billion-dollar companies.',
  'ilya-sutskever': 'Left OpenAI to build Safe Superintelligence Inc. The board coup hero. Now in stealth mode building what he believes is the most important thing ever.',
  'francois-chollet': 'ARC benchmark became the standard test for "real" AI reasoning. Keras usage still growing. The quality-over-quantity researcher.',
  'andrew-ng': '8M+ students taught. 150+ courses. The Batch newsletter. DeepLearning.AI courses are where the next generation of AI engineers are trained.',
  'jim-fan': 'NVIDIA\'s robotics research is defining embodied AI. GR00T and Foundation Agent papers are shaping how we think about physical intelligence.',
};

// Special designations for the current week
export interface ChartDesignation {
  slug: string;
  badge: 'hot_shot_debut' | 'biggest_gainer' | 'biggest_drop' | 'longest_run' | 'breakthrough';
  label: string;
}

export const chartDesignations: Record<string, ChartDesignation[]> = {
  'top-labs': [
    { slug: 'openai', badge: 'longest_run', label: 'LONGEST RUN AT #1' },
    { slug: 'anthropic', badge: 'biggest_gainer', label: 'BIGGEST GAINER' },
    { slug: 'deepseek', badge: 'breakthrough', label: 'BREAKTHROUGH' },
  ],
  'top-models': [
    { slug: 'claude-opus-4-6', badge: 'biggest_gainer', label: 'NEW #1' },
    { slug: 'llama-4-maverick', badge: 'hot_shot_debut', label: 'HOT SHOT DEBUT' },
    { slug: 'llama-4-scout', badge: 'hot_shot_debut', label: 'HOT SHOT DEBUT' },
    { slug: 'deepseek-r1', badge: 'breakthrough', label: 'BREAKTHROUGH' },
  ],
  'top-tools': [
    { slug: 'claude-code', badge: 'biggest_gainer', label: 'BIGGEST GAINER' },
    { slug: 'codex-cli', badge: 'hot_shot_debut', label: 'HOT SHOT DEBUT' },
    { slug: 'chatgpt', badge: 'longest_run', label: 'LONGEST RUN AT #1' },
  ],
  'top-creators': [
    { slug: 'andrej-karpathy', badge: 'longest_run', label: 'LONGEST RUN AT #1' },
    { slug: 'dario-amodei', badge: 'biggest_gainer', label: 'BIGGEST GAINER' },
  ],
  'top-ceos': [
    { slug: 'jensen-huang', badge: 'longest_run', label: '#1 FOR 12 MONTHS' },
    { slug: 'dario-amodei', badge: 'biggest_gainer', label: 'BIGGEST GAINER' },
    { slug: 'aravind-srinivas', badge: 'breakthrough', label: 'BREAKTHROUGH' },
  ],
  'top-scientists': [
    { slug: 'geoffrey-hinton', badge: 'longest_run', label: 'LEGEND' },
    { slug: 'fei-fei-li', badge: 'biggest_gainer', label: 'RISING' },
  ],
  'top-teams': [
    { slug: 'anthropic', badge: 'biggest_gainer', label: '#1 TEAM' },
    { slug: 'deepseek', badge: 'breakthrough', label: 'BREAKTHROUGH' },
  ],
  'top-campaigns': [
    { slug: 'deepseek', badge: 'breakthrough', label: '$0 BUDGET, $600B IMPACT' },
    { slug: 'claude-code', badge: 'biggest_gainer', label: 'ORGANIC VIRAL' },
  ],
  'top-agents': [
    { slug: 'claude-code', badge: 'longest_run', label: '#1 AGENT' },
    { slug: 'codex-cli', badge: 'hot_shot_debut', label: 'HOT SHOT DEBUT' },
  ],
  'ai-healthcare': [
    { slug: 'hippocratic-ai', badge: 'breakthrough', label: 'BREAKTHROUGH' },
  ],
  'ai-hardware': [
    { slug: 'nvidia', badge: 'longest_run', label: 'UNTOUCHABLE' },
    { slug: 'groq', badge: 'biggest_gainer', label: 'FASTEST INFERENCE' },
  ],
  'ai-music': [
    { slug: 'suno', badge: 'biggest_gainer', label: '12M USERS' },
  ],
};

export function getMovementNote(slug: string): string | undefined {
  return movementNotes[slug];
}

export function getDesignations(chartSlug: string): ChartDesignation[] {
  return chartDesignations[chartSlug] ?? [];
}

export function getEntityDesignation(chartSlug: string, entitySlug: string): ChartDesignation | undefined {
  return chartDesignations[chartSlug]?.find((d) => d.slug === entitySlug);
}
