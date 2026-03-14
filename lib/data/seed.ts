import type { Entity, Chart, ChartEntry } from '@/lib/supabase/types';

// ========================================================================
// THE VISIO INDEX — DEEP SEED DATA
// Per-dimension score breakdowns, 4 weeks of history, genre charts
// ========================================================================

// ── LABS (Top 20) ───────────────────────────────────────────────────────
export const labEntities: Omit<Entity, 'id' | 'created_at' | 'updated_at'>[] = [
  { type: 'lab', name: 'OpenAI', slug: 'openai', description: 'Creator of GPT, ChatGPT, Sora, and DALL-E. 300M+ weekly active users across products. $13B+ revenue run-rate. The company that kicked off the AI era.', logo_url: null, website: 'https://openai.com', country: 'US', region: 'North America', category: 'Frontier AI', tags: ['frontier', 'llm', 'chatgpt', 'gpt', 'sora'], social_links: { x: 'openai' }, metadata: { founded: 2015, hq: 'San Francisco', valuation: '$300B+', employees: '3000+', funding: '$13.3B', ceo: 'Sam Altman' }, is_verified: true },
  { type: 'lab', name: 'Anthropic', slug: 'anthropic', description: 'AI safety company behind Claude. Opus 4.6 tops coding & reasoning benchmarks. Claude Code is reshaping how software gets built. Constitutional AI pioneer.', logo_url: null, website: 'https://anthropic.com', country: 'US', region: 'North America', category: 'Frontier AI', tags: ['frontier', 'llm', 'claude', 'safety', 'coding'], social_links: { x: 'anthropicai' }, metadata: { founded: 2021, hq: 'San Francisco', valuation: '$61.5B', employees: '1500+', funding: '$12.9B', ceo: 'Dario Amodei' }, is_verified: true },
  { type: 'lab', name: 'Google DeepMind', slug: 'google-deepmind', description: 'Merged Google Brain + DeepMind. Powers Gemini 2.5 Pro (1M context), AlphaFold, and Google\'s entire AI stack. 2B+ Gemini users via Google products.', logo_url: null, website: 'https://deepmind.google', country: 'US', region: 'North America', category: 'Frontier AI', tags: ['frontier', 'llm', 'gemini', 'research', 'alphafold'], social_links: { x: 'googledeepmind' }, metadata: { founded: 2023, hq: 'London / Mountain View', parent: 'Alphabet', ceo: 'Demis Hassabis' }, is_verified: true },
  { type: 'lab', name: 'Meta AI', slug: 'meta-ai', description: 'Open-source AI leader. Llama 4 Maverick and Scout released March 2026. Most downloaded model family in history. Powering the open-weight revolution.', logo_url: null, website: 'https://ai.meta.com', country: 'US', region: 'North America', category: 'Frontier AI', tags: ['open-source', 'llm', 'llama', 'moe'], social_links: { x: 'metaai' }, metadata: { founded: 2013, hq: 'Menlo Park', parent: 'Meta Platforms', vp_ai: 'Yann LeCun' }, is_verified: true },
  { type: 'lab', name: 'xAI', slug: 'xai', description: 'Elon Musk\'s AI lab. Grok 3 powers X/Twitter. Massive GPU cluster (Memphis Supercluster). Racing to AGI with aggressive scaling.', logo_url: null, website: 'https://x.ai', country: 'US', region: 'North America', category: 'Frontier AI', tags: ['frontier', 'llm', 'grok', 'twitter'], social_links: { x: 'xai' }, metadata: { founded: 2023, hq: 'San Francisco', valuation: '$50B+', ceo: 'Elon Musk' }, is_verified: true },
  { type: 'lab', name: 'DeepSeek', slug: 'deepseek', description: 'Chinese lab that shocked the world. DeepSeek R1 matches GPT-4 at 1/20th the cost. Open-source MoE architecture. Proved you don\'t need $100B to compete.', logo_url: null, website: 'https://deepseek.com', country: 'CN', region: 'Asia', category: 'Frontier AI', tags: ['frontier', 'llm', 'chinese', 'open-source', 'efficient'], social_links: {}, metadata: { founded: 2023, hq: 'Hangzhou', parent: 'High-Flyer Capital', note: 'Hedge fund-backed AI lab' }, is_verified: true },
  { type: 'lab', name: 'Mistral AI', slug: 'mistral', description: 'Europe\'s frontier AI champion. Open-weight models rivaling GPT-4. Le Chat consumer product. $2B+ valuation in 18 months.', logo_url: null, website: 'https://mistral.ai', country: 'FR', region: 'Europe', category: 'Frontier AI', tags: ['open-weight', 'llm', 'european', 'multilingual'], social_links: { x: 'mistralai' }, metadata: { founded: 2023, hq: 'Paris', valuation: '$6.2B', ceo: 'Arthur Mensch' }, is_verified: true },
  { type: 'lab', name: 'Nvidia', slug: 'nvidia', description: 'The backbone of AI. H100/B200 GPUs power every frontier lab. CUDA moat. $3T+ market cap. Also building NeMo models and inference stack.', logo_url: null, website: 'https://nvidia.com/ai', country: 'US', region: 'North America', category: 'AI Infrastructure', tags: ['gpu', 'infrastructure', 'nemo', 'cuda'], social_links: { x: 'nvidia' }, metadata: { founded: 1993, hq: 'Santa Clara', market_cap: '$3.4T', ceo: 'Jensen Huang' }, is_verified: true },
  { type: 'lab', name: 'Perplexity AI', slug: 'perplexity', description: 'The answer engine replacing Google for power users. 100M+ monthly visits. Revenue-generating from day one via Pro subscriptions.', logo_url: null, website: 'https://perplexity.ai', country: 'US', region: 'North America', category: 'AI Search', tags: ['search', 'rag', 'answer-engine', 'consumer'], social_links: { x: 'perplexity_ai' }, metadata: { founded: 2022, hq: 'San Francisco', valuation: '$9B', ceo: 'Aravind Srinivas' }, is_verified: true },
  { type: 'lab', name: 'Hugging Face', slug: 'hugging-face', description: 'The GitHub of AI. 1M+ models hosted. Community hub for every open-source AI project. Transformers library used by every AI team on earth.', logo_url: null, website: 'https://huggingface.co', country: 'US', region: 'North America', category: 'AI Platform', tags: ['open-source', 'community', 'models', 'hub'], social_links: { x: 'huggingface' }, metadata: { founded: 2016, hq: 'New York', valuation: '$4.5B', ceo: 'Clem Delangue' }, is_verified: true },
  { type: 'lab', name: 'Cohere', slug: 'cohere', description: 'Enterprise AI leader. Command R+ models. Strong RAG and multilingual capabilities. Serving Fortune 500 companies.', logo_url: null, website: 'https://cohere.com', country: 'CA', region: 'North America', category: 'Enterprise AI', tags: ['enterprise', 'llm', 'rag', 'multilingual'], social_links: { x: 'coaborateai' }, metadata: { founded: 2019, hq: 'Toronto', ceo: 'Aidan Gomez' }, is_verified: true },
  { type: 'lab', name: 'Stability AI', slug: 'stability-ai', description: 'Open generative AI. Stable Diffusion changed image generation forever. Pivoting under new leadership after tumultuous 2024-2025.', logo_url: null, website: 'https://stability.ai', country: 'GB', region: 'Europe', category: 'Generative AI', tags: ['image-gen', 'open-source', 'diffusion', 'video'], social_links: { x: 'stabilityai' }, metadata: { founded: 2020, hq: 'London' }, is_verified: true },
  { type: 'lab', name: 'Runway', slug: 'runway', description: 'Video generation pioneer. Gen-3 Alpha powers Hollywood studios. First AI company to win an Emmy for technical achievement.', logo_url: null, website: 'https://runway.ml', country: 'US', region: 'North America', category: 'Creative AI', tags: ['video-gen', 'creative', 'generative', 'hollywood'], social_links: { x: 'runwayml' }, metadata: { founded: 2018, hq: 'New York', valuation: '$4B' }, is_verified: true },
  { type: 'lab', name: 'Alibaba Cloud (Qwen)', slug: 'alibaba-qwen', description: 'Alibaba\'s AI powerhouse. Qwen 2.5 rivals GPT-4 on coding benchmarks. Strong open-source presence. Dominating Chinese enterprise AI.', logo_url: null, website: 'https://qwenlm.github.io', country: 'CN', region: 'Asia', category: 'Frontier AI', tags: ['llm', 'open-source', 'qwen', 'enterprise'], social_links: {}, metadata: { hq: 'Hangzhou', parent: 'Alibaba Group' }, is_verified: true },
  { type: 'lab', name: 'AI21 Labs', slug: 'ai21', description: 'Israeli AI lab. Created Jamba — first production-grade Mamba-based architecture. Enterprise-focused with strong government contracts.', logo_url: null, website: 'https://ai21.com', country: 'IL', region: 'Middle East', category: 'Enterprise AI', tags: ['llm', 'enterprise', 'jamba', 'mamba'], social_links: { x: 'ai21labs' }, metadata: { founded: 2017, hq: 'Tel Aviv', ceo: 'Ori Goshen' }, is_verified: true },
  { type: 'lab', name: 'Inflection AI', slug: 'inflection', description: 'Built Pi — the empathetic AI. Lost most of team to Microsoft in 2024. Pivoting to enterprise AI-as-a-service.', logo_url: null, website: 'https://inflection.ai', country: 'US', region: 'North America', category: 'Conversational AI', tags: ['conversational', 'pi', 'empathetic'], social_links: {}, metadata: { founded: 2022, hq: 'Palo Alto' }, is_verified: true },
  { type: 'lab', name: 'Samsung AI', slug: 'samsung-ai', description: 'On-device AI pioneer. Galaxy AI suite across 200M+ devices. Samsung Gauss models. Bringing AI to the edge.', logo_url: null, website: 'https://research.samsung.com', country: 'KR', region: 'Asia', category: 'On-Device AI', tags: ['mobile', 'on-device', 'edge', 'gauss'], social_links: {}, metadata: { hq: 'Seoul', parent: 'Samsung Electronics' }, is_verified: true },
  { type: 'lab', name: 'Zhipu AI', slug: 'zhipu', description: 'Chinese AI lab behind GLM-4 and ChatGLM. Tsinghua University spinoff. Strong in Chinese-language AI.', logo_url: null, website: 'https://zhipuai.cn', country: 'CN', region: 'Asia', category: 'Frontier AI', tags: ['llm', 'chinese', 'glm', 'academic'], social_links: {}, metadata: { founded: 2019, hq: 'Beijing' }, is_verified: true },
  { type: 'lab', name: 'Cognition', slug: 'cognition', description: 'Creator of Devin — the first autonomous AI software engineer. $2B valuation before shipping product. Defining the AI agent category.', logo_url: null, website: 'https://cognition.ai', country: 'US', region: 'North America', category: 'AI Agents', tags: ['agents', 'coding', 'autonomous', 'devin'], social_links: {}, metadata: { founded: 2023, hq: 'San Francisco', valuation: '$2B', ceo: 'Scott Wu' }, is_verified: true },
  { type: 'lab', name: 'Baidu AI', slug: 'baidu-ai', description: 'China\'s AI veteran. ERNIE Bot has 200M+ users. Strong in autonomous driving (Apollo) and enterprise AI.', logo_url: null, website: 'https://ai.baidu.com', country: 'CN', region: 'Asia', category: 'Frontier AI', tags: ['llm', 'chinese', 'ernie', 'autonomous-driving'], social_links: {}, metadata: { hq: 'Beijing', ceo: 'Robin Li' }, is_verified: true },
];

// ── MODELS (Top 20) ─────────────────────────────────────────────────────
export const modelEntities: Omit<Entity, 'id' | 'created_at' | 'updated_at'>[] = [
  { type: 'model', name: 'Claude Opus 4.6', slug: 'claude-opus-4-6', description: '1M context. Extended thinking. Best-in-class on SWE-Bench (72.5%), agentic tasks, and long-document analysis. The model powering Claude Code.', logo_url: null, website: 'https://anthropic.com', country: 'US', region: 'North America', category: 'Frontier LLM', tags: ['llm', 'reasoning', 'agentic', '1M-context', 'coding'], social_links: {}, metadata: { lab: 'Anthropic', context: '1M tokens', arena_elo: 1380, swe_bench: '72.5%', release: '2026-02' }, is_verified: true },
  { type: 'model', name: 'GPT-4.5', slug: 'gpt-4-5', description: 'OpenAI\'s largest model ever. Massive parameter count reduces hallucinations. Strong creative writing and nuanced reasoning.', logo_url: null, website: 'https://openai.com', country: 'US', region: 'North America', category: 'Frontier LLM', tags: ['llm', 'reasoning', 'creative'], social_links: {}, metadata: { lab: 'OpenAI', arena_elo: 1370, mmlu: '92.1%', release: '2026-01' }, is_verified: true },
  { type: 'model', name: 'Gemini 2.5 Pro', slug: 'gemini-2-5-pro', description: 'Google\'s best. 1M context, native multimodal (text+vision+audio+video), thinking mode. Dominates long-context benchmarks.', logo_url: null, website: 'https://deepmind.google', country: 'US', region: 'North America', category: 'Frontier LLM', tags: ['llm', 'multimodal', 'thinking', '1M-context'], social_links: {}, metadata: { lab: 'Google DeepMind', context: '1M tokens', arena_elo: 1365, release: '2026-01' }, is_verified: true },
  { type: 'model', name: 'Claude Sonnet 4.6', slug: 'claude-sonnet-4-6', description: 'The sweet spot. 90% of Opus capability at 5x speed and 1/5th cost. Default model for most Claude users.', logo_url: null, website: 'https://anthropic.com', country: 'US', region: 'North America', category: 'Balanced LLM', tags: ['llm', 'balanced', 'default', 'fast'], social_links: {}, metadata: { lab: 'Anthropic', context: '200K tokens', arena_elo: 1340, release: '2026-02' }, is_verified: true },
  { type: 'model', name: 'GPT-4o', slug: 'gpt-4o', description: 'OpenAI\'s multimodal workhorse. Text, vision, audio natively. Powers ChatGPT for 300M users. Most widely deployed frontier model.', logo_url: null, website: 'https://openai.com', country: 'US', region: 'North America', category: 'Multimodal LLM', tags: ['llm', 'multimodal', 'vision', 'audio', 'ubiquitous'], social_links: {}, metadata: { lab: 'OpenAI', arena_elo: 1310, release: '2024-05' }, is_verified: true },
  { type: 'model', name: 'DeepSeek R1', slug: 'deepseek-r1', description: 'The model that proved frontier AI can be cheap. Matches o1 on math/coding at 1/20th the price. Open-source chain-of-thought.', logo_url: null, website: 'https://deepseek.com', country: 'CN', region: 'Asia', category: 'Reasoning LLM', tags: ['reasoning', 'open-source', 'cot', 'efficient'], social_links: {}, metadata: { lab: 'DeepSeek', arena_elo: 1330, release: '2025-01', note: 'Crashed Nvidia stock on release' }, is_verified: true },
  { type: 'model', name: 'Llama 4 Maverick', slug: 'llama-4-maverick', description: 'Meta\'s flagship. 400B MoE with 17B active params. Beats GPT-4o and Gemini 2.0 Flash on benchmarks. Open-weight.', logo_url: null, website: 'https://ai.meta.com', country: 'US', region: 'North America', category: 'Open-Weight LLM', tags: ['open-source', 'llm', 'moe', 'frontier'], social_links: {}, metadata: { lab: 'Meta AI', params: '400B MoE (17B active)', arena_elo: 1320, release: '2026-03' }, is_verified: true },
  { type: 'model', name: 'Grok 3', slug: 'grok-3', description: 'xAI\'s flagship trained on Memphis Supercluster. Strong coding and real-time X/Twitter data access. DeepSearch and Think modes.', logo_url: null, website: 'https://x.ai', country: 'US', region: 'North America', category: 'Frontier LLM', tags: ['llm', 'reasoning', 'coding', 'real-time'], social_links: {}, metadata: { lab: 'xAI', arena_elo: 1315, release: '2025-02' }, is_verified: true },
  { type: 'model', name: 'DeepSeek V3', slug: 'deepseek-v3', description: '685B MoE, 37B active. Trained for $5.6M — 1/100th of GPT-4. Open-source model that proved efficiency > scale.', logo_url: null, website: 'https://deepseek.com', country: 'CN', region: 'Asia', category: 'Open-Source LLM', tags: ['open-source', 'llm', 'efficient', 'moe'], social_links: {}, metadata: { lab: 'DeepSeek', params: '685B MoE (37B active)', training_cost: '$5.6M', release: '2024-12' }, is_verified: true },
  { type: 'model', name: 'Qwen 2.5 Max', slug: 'qwen-2-5-max', description: 'Alibaba\'s strongest. Top-3 on coding benchmarks globally. Strong open-source variant (72B) widely adopted.', logo_url: null, website: 'https://qwenlm.github.io', country: 'CN', region: 'Asia', category: 'Frontier LLM', tags: ['llm', 'coding', 'open-source', 'chinese'], social_links: {}, metadata: { lab: 'Alibaba', arena_elo: 1295, release: '2025-01' }, is_verified: true },
  { type: 'model', name: 'Gemini 2.5 Flash', slug: 'gemini-2-5-flash', description: 'Best efficiency model. 90% of Pro quality at 10x speed. Thinking mode optional. Default for cost-sensitive production.', logo_url: null, website: 'https://deepmind.google', country: 'US', region: 'North America', category: 'Efficient LLM', tags: ['llm', 'fast', 'efficient', 'thinking'], social_links: {}, metadata: { lab: 'Google DeepMind', arena_elo: 1300, release: '2026-01' }, is_verified: true },
  { type: 'model', name: 'Mistral Large 2', slug: 'mistral-large-2', description: 'Europe\'s best model. Strong multilingual (12 languages), 128K context. Powering Le Chat and enterprise customers.', logo_url: null, website: 'https://mistral.ai', country: 'FR', region: 'Europe', category: 'Frontier LLM', tags: ['llm', 'multilingual', 'european', 'enterprise'], social_links: {}, metadata: { lab: 'Mistral AI', context: '128K', arena_elo: 1280, release: '2024-07' }, is_verified: true },
  { type: 'model', name: 'Llama 4 Scout', slug: 'llama-4-scout', description: 'The long-context king. 10M token context window — 10x more than any competitor. MoE with 17B active params. Open-weight.', logo_url: null, website: 'https://ai.meta.com', country: 'US', region: 'North America', category: 'Open-Weight LLM', tags: ['open-source', 'llm', 'long-context', 'moe'], social_links: {}, metadata: { lab: 'Meta AI', params: '109B MoE (17B active)', context: '10M tokens', release: '2026-03' }, is_verified: true },
  { type: 'model', name: 'Claude Haiku 4.5', slug: 'claude-haiku-4-5', description: 'Fastest Claude. Near-instant responses. Surprisingly capable for its size — outperforms GPT-4o on many benchmarks.', logo_url: null, website: 'https://anthropic.com', country: 'US', region: 'North America', category: 'Efficient LLM', tags: ['llm', 'fast', 'efficient', 'compact'], social_links: {}, metadata: { lab: 'Anthropic', arena_elo: 1260, release: '2025-10' }, is_verified: true },
  { type: 'model', name: 'GPT-4o Mini', slug: 'gpt-4o-mini', description: 'OpenAI\'s small-and-fast model. $0.15/1M input tokens. Powers most ChatGPT Free interactions. 100B+ API calls/day.', logo_url: null, website: 'https://openai.com', country: 'US', region: 'North America', category: 'Efficient LLM', tags: ['llm', 'fast', 'affordable', 'high-volume'], social_links: {}, metadata: { lab: 'OpenAI', arena_elo: 1240, release: '2024-07' }, is_verified: true },
  { type: 'model', name: 'Midjourney V7', slug: 'midjourney-v7', description: 'Image generation gold standard. Photorealistic + artistic. Used by 20M+ creators. Defining the visual AI aesthetic.', logo_url: null, website: 'https://midjourney.com', country: 'US', region: 'North America', category: 'Image Gen', tags: ['image-gen', 'creative', 'premium', 'photorealistic'], social_links: {}, metadata: { lab: 'Midjourney', users: '20M+', release: '2025-12' }, is_verified: true },
  { type: 'model', name: 'Stable Diffusion 3.5', slug: 'stable-diffusion-3-5', description: 'Open-source image generation. Runs locally. Powers thousands of apps and services. The people\'s image model.', logo_url: null, website: 'https://stability.ai', country: 'GB', region: 'Europe', category: 'Image Gen', tags: ['image-gen', 'open-source', 'diffusion', 'local'], social_links: {}, metadata: { lab: 'Stability AI', release: '2024-10' }, is_verified: true },
  { type: 'model', name: 'Sora', slug: 'sora', description: 'OpenAI\'s text-to-video model. 1080p, up to 1 minute. Changed video production economics. Limited availability driving massive demand.', logo_url: null, website: 'https://openai.com', country: 'US', region: 'North America', category: 'Video Gen', tags: ['video-gen', 'generative', 'premium'], social_links: {}, metadata: { lab: 'OpenAI', release: '2024-12' }, is_verified: true },
  { type: 'model', name: 'Veo 2', slug: 'veo-2', description: 'Google\'s video model. 4K resolution, 2+ minutes. Available in Vertex AI. Competing directly with Sora on quality.', logo_url: null, website: 'https://deepmind.google', country: 'US', region: 'North America', category: 'Video Gen', tags: ['video-gen', 'google', '4k'], social_links: {}, metadata: { lab: 'Google DeepMind', release: '2024-12' }, is_verified: true },
];

// ── TOOLS (Top 20) ──────────────────────────────────────────────────────
export const toolEntities: Omit<Entity, 'id' | 'created_at' | 'updated_at'>[] = [
  { type: 'tool', name: 'ChatGPT', slug: 'chatgpt', description: '300M+ weekly active users. $4B+ revenue run-rate. The product that put AI in everyone\'s hands. Voice, vision, Canvas, GPTs marketplace.', logo_url: null, website: 'https://chatgpt.com', country: 'US', region: 'North America', category: 'AI Chat', tags: ['chat', 'consumer', 'multimodal', 'marketplace'], social_links: {}, metadata: { lab: 'OpenAI', wau: '300M+', revenue: '$4B+ run-rate', app_rank: '#1 Productivity' }, is_verified: true },
  { type: 'tool', name: 'Claude', slug: 'claude-app', description: 'Anthropic\'s AI assistant. Projects, Artifacts, 1M context. Preferred by developers and professionals for coding and analysis.', logo_url: null, website: 'https://claude.ai', country: 'US', region: 'North America', category: 'AI Chat', tags: ['chat', 'safety', 'coding', 'artifacts', 'projects'], social_links: {}, metadata: { lab: 'Anthropic', note: 'Fastest-growing AI product of 2025-2026' }, is_verified: true },
  { type: 'tool', name: 'Cursor', slug: 'cursor', description: 'AI-first code editor. VS Code fork with AI at the core. 2M+ developers. Tab completion, Chat, Composer. Raised $900M at $9B.', logo_url: null, website: 'https://cursor.com', country: 'US', region: 'North America', category: 'AI Coding', tags: ['ide', 'coding', 'editor', 'composer'], social_links: {}, metadata: { users: '2M+', valuation: '$9B', investors: 'a16z, Thrive' }, is_verified: true },
  { type: 'tool', name: 'Perplexity', slug: 'perplexity-app', description: 'AI search engine. 100M+ monthly visits. Pro subscribers get unlimited AI answers with citations. Threatening Google\'s core business.', logo_url: null, website: 'https://perplexity.ai', country: 'US', region: 'North America', category: 'AI Search', tags: ['search', 'research', 'rag', 'citations'], social_links: {}, metadata: { visits: '100M+/mo', revenue: '$100M+ ARR' }, is_verified: true },
  { type: 'tool', name: 'GitHub Copilot', slug: 'github-copilot', description: 'The OG AI coding assistant. 1.8M+ paid subscribers. Integrated into VS Code, JetBrains, CLI. Now with Copilot Workspace for agentic coding.', logo_url: null, website: 'https://github.com/features/copilot', country: 'US', region: 'North America', category: 'AI Coding', tags: ['coding', 'copilot', 'ide-extension', 'agentic'], social_links: {}, metadata: { lab: 'Microsoft/GitHub', subscribers: '1.8M+', revenue: '$300M+ ARR' }, is_verified: true },
  { type: 'tool', name: 'Claude Code', slug: 'claude-code', description: 'Terminal-native agentic coding. Plans, implements, tests, commits. The CLI that thinks. Reshaping how senior engineers work.', logo_url: null, website: 'https://docs.anthropic.com/en/docs/claude-code', country: 'US', region: 'North America', category: 'AI Coding', tags: ['coding', 'agent', 'cli', 'terminal', 'agentic'], social_links: {}, metadata: { lab: 'Anthropic', note: 'Fastest-growing dev tool of 2026' }, is_verified: true },
  { type: 'tool', name: 'Gemini App', slug: 'gemini-app', description: 'Google\'s AI assistant. Deep integration with Gmail, Docs, Drive, Maps. 2B+ potential users via Google ecosystem. Free tier is generous.', logo_url: null, website: 'https://gemini.google.com', country: 'US', region: 'North America', category: 'AI Chat', tags: ['chat', 'google', 'multimodal', 'ecosystem'], social_links: {}, metadata: { lab: 'Google DeepMind', distribution: '2B+ via Google' }, is_verified: true },
  { type: 'tool', name: 'Midjourney', slug: 'midjourney-app', description: '20M+ users creating AI art. Web app launched. V7 quality is unmatched. Profitable since day one — rare in AI.', logo_url: null, website: 'https://midjourney.com', country: 'US', region: 'North America', category: 'AI Creative', tags: ['image-gen', 'creative', 'design', 'profitable'], social_links: {}, metadata: { users: '20M+', revenue: '$300M+ ARR', note: 'Profitable, no VC' }, is_verified: true },
  { type: 'tool', name: 'v0', slug: 'v0', description: 'Vercel\'s AI frontend builder. Prompt to React components to deployed app. Generating 1M+ UIs. Redefining frontend development.', logo_url: null, website: 'https://v0.dev', country: 'US', region: 'North America', category: 'AI Coding', tags: ['frontend', 'ui', 'react', 'vercel', 'generative'], social_links: {}, metadata: { lab: 'Vercel' }, is_verified: true },
  { type: 'tool', name: 'ElevenLabs', slug: 'elevenlabs', description: 'Voice AI platform. Industry-leading TTS. Voice cloning, dubbing, sound effects. Used by major studios, podcasters, and developers.', logo_url: null, website: 'https://elevenlabs.io', country: 'US', region: 'North America', category: 'AI Audio', tags: ['voice', 'tts', 'audio', 'speech', 'dubbing'], social_links: {}, metadata: { valuation: '$3.3B', users: '1M+' }, is_verified: true },
  { type: 'tool', name: 'Bolt', slug: 'bolt', description: 'StackBlitz AI app builder. Full-stack apps from prompts in the browser. No local setup. Used by 500K+ builders.', logo_url: null, website: 'https://bolt.new', country: 'US', region: 'North America', category: 'AI Coding', tags: ['fullstack', 'builder', 'browser', 'no-setup'], social_links: {}, metadata: {}, is_verified: true },
  { type: 'tool', name: 'Devin', slug: 'devin', description: 'Cognition\'s autonomous AI engineer. Takes GitHub issues, plans, codes, tests, submits PRs. Still early but defining the category.', logo_url: null, website: 'https://devin.ai', country: 'US', region: 'North America', category: 'AI Agent', tags: ['agent', 'autonomous', 'coding', 'github'], social_links: {}, metadata: { lab: 'Cognition', pricing: '$500/mo' }, is_verified: true },
  { type: 'tool', name: 'Notion AI', slug: 'notion-ai', description: 'AI embedded in the workspace 100M+ people already use. Writing, summaries, Q&A across your entire workspace. Distribution advantage.', logo_url: null, website: 'https://notion.so', country: 'US', region: 'North America', category: 'AI Productivity', tags: ['productivity', 'writing', 'workspace', 'enterprise'], social_links: {}, metadata: { users: '100M+' }, is_verified: true },
  { type: 'tool', name: 'Suno', slug: 'suno', description: 'AI music creation. Full songs from text prompts — lyrics, melody, production. 12M+ users. Music industry is terrified and fascinated.', logo_url: null, website: 'https://suno.com', country: 'US', region: 'North America', category: 'AI Music', tags: ['music', 'audio', 'creative', 'generative'], social_links: {}, metadata: { users: '12M+', note: 'Facing major label lawsuits' }, is_verified: true },
  { type: 'tool', name: 'Canva AI', slug: 'canva-ai', description: 'AI design for everyone. Magic Studio suite — edit, generate, resize, translate. 200M+ monthly users. AI as a feature, not the product.', logo_url: null, website: 'https://canva.com', country: 'AU', region: 'Asia Pacific', category: 'AI Creative', tags: ['design', 'creative', 'consumer', 'enterprise'], social_links: {}, metadata: { mau: '200M+', valuation: '$26B' }, is_verified: true },
  { type: 'tool', name: 'Windsurf', slug: 'windsurf', description: 'Codeium\'s AI IDE. Cascade for agentic coding, Flows for multi-file edits. Growing fast in the IDE wars.', logo_url: null, website: 'https://codeium.com/windsurf', country: 'US', region: 'North America', category: 'AI Coding', tags: ['ide', 'coding', 'agent', 'cascade'], social_links: {}, metadata: { lab: 'Codeium' }, is_verified: true },
  { type: 'tool', name: 'Codex CLI', slug: 'codex-cli', description: 'OpenAI\'s answer to Claude Code. Terminal-based agentic coding. Open-source. Powered by o4-mini. Released March 2026.', logo_url: null, website: 'https://github.com/openai/codex', country: 'US', region: 'North America', category: 'AI Coding', tags: ['coding', 'agent', 'cli', 'open-source'], social_links: {}, metadata: { lab: 'OpenAI', release: '2026-03', note: 'Open-source Apache 2.0' }, is_verified: true },
  { type: 'tool', name: 'Replit Agent', slug: 'replit-agent', description: 'Build full apps with prompts in Replit\'s cloud IDE. Deploys instantly. Strong with beginners and prototyping.', logo_url: null, website: 'https://replit.com', country: 'US', region: 'North America', category: 'AI Coding', tags: ['coding', 'agent', 'cloud-ide', 'prototyping'], social_links: {}, metadata: { users: '30M+' }, is_verified: true },
  { type: 'tool', name: 'Lovable', slug: 'lovable', description: 'AI full-stack app builder from Sweden. Prompt to production with Supabase backend. Growing fast in the builder space.', logo_url: null, website: 'https://lovable.dev', country: 'SE', region: 'Europe', category: 'AI Coding', tags: ['builder', 'fullstack', 'supabase', 'european'], social_links: {}, metadata: {}, is_verified: true },
  { type: 'tool', name: 'Kling AI', slug: 'kling', description: 'Chinese video generation tool by Kuaishou. Competing directly with Sora on quality. Free tier drives massive adoption in Asia.', logo_url: null, website: 'https://klingai.com', country: 'CN', region: 'Asia', category: 'AI Video', tags: ['video-gen', 'creative', 'chinese', 'free'], social_links: {}, metadata: {}, is_verified: true },
];

// ── CREATORS (Top 15) ───────────────────────────────────────────────────
export const creatorEntities: Omit<Entity, 'id' | 'created_at' | 'updated_at'>[] = [
  { type: 'creator', name: 'Andrej Karpathy', slug: 'andrej-karpathy', description: 'Ex-Tesla AI Director, OpenAI founding member. "Neural Networks: Zero to Hero" series. The most respected AI educator alive. Eureka Labs founder.', logo_url: null, website: 'https://karpathy.ai', country: 'US', region: 'North America', category: 'AI Educator', tags: ['educator', 'researcher', 'youtube', 'neural-nets'], social_links: { x: 'karpathy', youtube: '@andrejkarpathy' }, metadata: { youtube_subs: '1.2M', x_followers: '900K+', background: 'Stanford PhD, Tesla, OpenAI founding' }, is_verified: true },
  { type: 'creator', name: 'Fireship', slug: 'fireship', description: 'Jeff Delaney. 3.2M YouTube subs. "100 Seconds" series. Makes complex tech accessible and entertaining. The Jon Stewart of tech.', logo_url: null, website: 'https://fireship.io', country: 'US', region: 'North America', category: 'Tech Content', tags: ['youtube', 'dev', 'explainer', 'humor'], social_links: { x: 'fireship_dev', youtube: '@fireship' }, metadata: { youtube_subs: '3.2M', note: 'Fastest tech channel growth 2023-2025' }, is_verified: true },
  { type: 'creator', name: 'Sam Altman', slug: 'sam-altman', description: 'CEO of OpenAI. Most quoted person in AI. His blog posts move markets. Testified to Congress. The face of the AI revolution.', logo_url: null, website: 'https://blog.samaltman.com', country: 'US', region: 'North America', category: 'Industry Leader', tags: ['executive', 'openai', 'leader', 'policy'], social_links: { x: 'sama' }, metadata: { x_followers: '3.8M', role: 'CEO, OpenAI', note: 'Board drama Nov 2023 made global headlines' }, is_verified: true },
  { type: 'creator', name: 'Matt Wolfe', slug: 'matt-wolfe', description: 'AI tool reviewer #1. Future Tools newsletter (500K+ subs). Reviews every major AI release within 48 hours. The Wirecutter of AI.', logo_url: null, website: 'https://futuretools.io', country: 'US', region: 'North America', category: 'AI Reviewer', tags: ['reviewer', 'tools', 'newsletter', 'youtube'], social_links: { x: 'mabortwolfe', youtube: '@mattwolfe' }, metadata: { youtube_subs: '850K', newsletter_subs: '500K+' }, is_verified: true },
  { type: 'creator', name: 'Dario Amodei', slug: 'dario-amodei', description: 'CEO of Anthropic. "Machines of Loving Grace" essay went viral. Leading voice on AI safety-meets-capability. Policy influencer.', logo_url: null, website: null, country: 'US', region: 'North America', category: 'Industry Leader', tags: ['executive', 'anthropic', 'safety', 'policy'], social_links: { x: 'DarioAmodei' }, metadata: { x_followers: '300K+', role: 'CEO, Anthropic', note: '"Machines of Loving Grace" = most-read AI essay 2024' }, is_verified: true },
  { type: 'creator', name: 'Two Minute Papers', slug: 'two-minute-papers', description: 'Karoly Zsolnai-Feher. 1.6M subs. "What a time to be alive!" Makes cutting-edge AI research accessible to everyone. Running since 2014.', logo_url: null, website: null, country: 'HU', region: 'Europe', category: 'AI Research', tags: ['papers', 'accessible', 'youtube', 'research'], social_links: { youtube: '@TwoMinutePapers' }, metadata: { youtube_subs: '1.6M', videos: '1500+' }, is_verified: true },
  { type: 'creator', name: 'Matthew Berman', slug: 'matthew-berman', description: 'AI model reviewer. First to benchmark every major release. Local LLM specialist. 450K YouTube subs. The benchmark guy.', logo_url: null, website: null, country: 'US', region: 'North America', category: 'AI Reviewer', tags: ['models', 'local-llm', 'reviews', 'benchmarks'], social_links: { x: 'matthewberman', youtube: '@matthewberman' }, metadata: { youtube_subs: '450K' }, is_verified: true },
  { type: 'creator', name: 'Yannick Kilcher', slug: 'yannick-kilcher', description: 'Deep technical paper reviews. PhD-level explanations made accessible. Swiss precision applied to AI research.', logo_url: null, website: null, country: 'CH', region: 'Europe', category: 'AI Research', tags: ['papers', 'research', 'technical', 'swiss'], social_links: { x: 'yaborukilaborher', youtube: '@yannickilcher' }, metadata: { youtube_subs: '250K' }, is_verified: true },
  { type: 'creator', name: 'Swyx', slug: 'swyx', description: 'Shawn Wang. AI engineer, writer, community builder. Latent Space podcast is the must-listen for AI engineers. Coined "AI Engineer" role.', logo_url: null, website: 'https://swyx.io', country: 'US', region: 'North America', category: 'AI Engineer', tags: ['ai-engineer', 'community', 'podcast', 'writer'], social_links: { x: 'swyx' }, metadata: { x_followers: '200K+', podcast: 'Latent Space', note: 'Organized AI Engineer Summit' }, is_verified: true },
  { type: 'creator', name: 'Riley Brown', slug: 'riley-brown', description: 'AI agent builder. Practical tutorials on building with LLMs. Growing fast as agentic AI takes off.', logo_url: null, website: null, country: 'US', region: 'North America', category: 'AI Dev', tags: ['agents', 'coding', 'youtube', 'practical'], social_links: { x: 'rileabrown_ai', youtube: '@rileybrown' }, metadata: { youtube_subs: '200K' }, is_verified: true },
  { type: 'creator', name: 'The AI Advantage', slug: 'ai-advantage', description: 'Igor Pogany. Practical AI tutorials. 500K+ subs. Teaches non-technical people to use AI tools effectively.', logo_url: null, website: null, country: 'DE', region: 'Europe', category: 'AI Tutorial', tags: ['tutorials', 'practical', 'youtube', 'accessible'], social_links: { youtube: '@aiadvantage' }, metadata: { youtube_subs: '500K+' }, is_verified: true },
  { type: 'creator', name: 'Harrison Chase', slug: 'harrison-chase', description: 'CEO of LangChain. Building the application layer for LLMs. LangGraph for agents. Most-used AI framework.', logo_url: null, website: null, country: 'US', region: 'North America', category: 'AI Dev', tags: ['langchain', 'frameworks', 'dev', 'agents'], social_links: { x: 'hwchase17' }, metadata: { x_followers: '150K+', role: 'CEO, LangChain' }, is_verified: true },
  { type: 'creator', name: 'AI Jason', slug: 'ai-jason', description: 'AI coding tutorials with real projects. Building agents, RAG systems, and production AI apps. 300K+ subs.', logo_url: null, website: null, country: 'US', region: 'North America', category: 'AI Dev', tags: ['coding', 'tutorials', 'agents', 'rag'], social_links: { youtube: '@AIJason' }, metadata: { youtube_subs: '300K+' }, is_verified: true },
  { type: 'creator', name: 'Emad Mostaque', slug: 'emad-mostaque', description: 'Open-source AI evangelist. Former Stability AI CEO. Now advocating for open AI through investing and advising.', logo_url: null, website: null, country: 'GB', region: 'Europe', category: 'Industry Leader', tags: ['open-source', 'advocate', 'investor'], social_links: { x: 'EMostaque' }, metadata: { x_followers: '250K+', note: 'Left Stability AI in 2024' }, is_verified: true },
  { type: 'creator', name: 'Linus (TheLinusShow)', slug: 'thelinusshow', description: 'AI-native SaaS builder. Builds products live using Cursor, Claude Code, v0. The poster child for vibe coding.', logo_url: null, website: null, country: 'US', region: 'North America', category: 'AI Builder', tags: ['builder', 'saas', 'build-in-public', 'vibe-coding'], social_links: { x: 'thelinusshow' }, metadata: { x_followers: '100K+' }, is_verified: true },
];

// ── CHART DEFINITIONS (8 charts now) ────────────────────────────────────
export const chartDefinitions: Omit<Chart, 'id' | 'created_at'>[] = [
  { name: 'Top Labs', slug: 'top-labs', category: 'major', entity_type: 'lab', frequency: 'weekly', description: 'The definitive ranking of AI laboratories. Composite of model performance, adoption, investment, cultural impact, and innovation.', max_entries: 20, scoring_weights: { performance: 0.25, adoption: 0.25, investment: 0.20, cultural_impact: 0.15, innovation: 0.15 }, is_featured: true },
  { name: 'Top Models', slug: 'top-models', category: 'major', entity_type: 'model', frequency: 'weekly', description: 'Weekly ranking of AI models. Benchmarks, adoption, developer sentiment, efficiency, and cultural buzz combined.', max_entries: 20, scoring_weights: { benchmarks: 0.30, adoption: 0.25, developer_sentiment: 0.20, efficiency: 0.15, buzz: 0.10 }, is_featured: true },
  { name: 'Top Tools', slug: 'top-tools', category: 'major', entity_type: 'tool', frequency: 'weekly', description: 'The most impactful AI products and tools. Usage, growth, features, developer love, and cultural buzz.', max_entries: 20, scoring_weights: { usage: 0.30, growth: 0.25, features: 0.20, developer_love: 0.15, buzz: 0.10 }, is_featured: true },
  { name: 'Top Creators', slug: 'top-creators', category: 'major', entity_type: 'creator', frequency: 'weekly', description: 'The most influential AI voices across YouTube, X, LinkedIn, and TikTok.', max_entries: 15, scoring_weights: { reach: 0.30, engagement: 0.25, quality: 0.20, influence: 0.15, consistency: 0.10 }, is_featured: true },
  { name: 'Top Code AI', slug: 'top-code-ai', category: 'genre', entity_type: 'tool', frequency: 'weekly', description: 'The best AI coding tools — IDEs, agents, copilots, and builders ranked by developer adoption and love.', max_entries: 12, scoring_weights: { developer_adoption: 0.30, code_quality: 0.25, speed: 0.20, features: 0.15, buzz: 0.10 }, is_featured: false },
  { name: 'Top Creative AI', slug: 'top-creative-ai', category: 'genre', entity_type: 'tool', frequency: 'weekly', description: 'AI tools for image, video, music, and design. Ranked by creative output quality and adoption.', max_entries: 10, scoring_weights: { output_quality: 0.30, adoption: 0.25, versatility: 0.20, accessibility: 0.15, buzz: 0.10 }, is_featured: false },
  { name: 'Top Open Source', slug: 'top-open-source', category: 'genre', entity_type: 'model', frequency: 'weekly', description: 'The most impactful open-source and open-weight AI models. Downloads, community, and capability.', max_entries: 10, scoring_weights: { downloads: 0.30, community: 0.25, capability: 0.25, documentation: 0.10, momentum: 0.10 }, is_featured: false },
  { name: 'Rising Stars', slug: 'rising-stars', category: 'major', entity_type: 'lab', frequency: 'weekly', description: 'Breakout companies, tools, and models making the biggest moves this week.', max_entries: 10, scoring_weights: { momentum: 0.40, buzz: 0.30, potential: 0.30 }, is_featured: false },
];

// ── SCORE BREAKDOWNS ────────────────────────────────────────────────────
// Real per-dimension scores for each entity. This is the core data.

export interface ScoredRanking {
  slug: string;
  scores: Record<string, number>; // per-dimension 0-100
  composite: number;
  history: number[]; // last 4 weeks composite scores [w-3, w-2, w-1, current]
}

// Top Labs — per dimension scores
export const labScores: ScoredRanking[] = [
  { slug: 'openai', composite: 94.2, scores: { performance: 92, adoption: 99, investment: 98, cultural_impact: 95, innovation: 85 }, history: [93.8, 94.0, 94.1, 94.2] },
  { slug: 'anthropic', composite: 91.8, scores: { performance: 96, adoption: 82, investment: 92, cultural_impact: 90, innovation: 95 }, history: [88.5, 89.7, 90.8, 91.8] },
  { slug: 'google-deepmind', composite: 90.5, scores: { performance: 93, adoption: 95, investment: 90, cultural_impact: 80, innovation: 92 }, history: [91.2, 91.0, 90.8, 90.5] },
  { slug: 'meta-ai', composite: 86.3, scores: { performance: 88, adoption: 90, investment: 85, cultural_impact: 78, innovation: 88 }, history: [83.1, 84.2, 85.0, 86.3] },
  { slug: 'xai', composite: 82.1, scores: { performance: 85, adoption: 75, investment: 90, cultural_impact: 82, innovation: 78 }, history: [78.5, 79.8, 81.0, 82.1] },
  { slug: 'deepseek', composite: 80.8, scores: { performance: 90, adoption: 72, investment: 60, cultural_impact: 88, innovation: 95 }, history: [72.3, 75.6, 78.2, 80.8] },
  { slug: 'mistral', composite: 77.4, scores: { performance: 82, adoption: 70, investment: 78, cultural_impact: 72, innovation: 82 }, history: [78.0, 77.8, 77.5, 77.4] },
  { slug: 'nvidia', composite: 76.9, scores: { performance: 75, adoption: 95, investment: 95, cultural_impact: 50, innovation: 60 }, history: [77.5, 77.2, 77.0, 76.9] },
  { slug: 'perplexity', composite: 75.2, scores: { performance: 70, adoption: 82, investment: 78, cultural_impact: 75, innovation: 72 }, history: [71.5, 72.8, 74.0, 75.2] },
  { slug: 'hugging-face', composite: 73.8, scores: { performance: 60, adoption: 92, investment: 65, cultural_impact: 78, innovation: 80 }, history: [73.5, 73.6, 73.7, 73.8] },
  { slug: 'cohere', composite: 70.1, scores: { performance: 75, adoption: 65, investment: 72, cultural_impact: 55, innovation: 70 }, history: [70.5, 70.3, 70.2, 70.1] },
  { slug: 'stability-ai', composite: 68.5, scores: { performance: 72, adoption: 75, investment: 55, cultural_impact: 70, innovation: 65 }, history: [70.2, 69.5, 69.0, 68.5] },
  { slug: 'runway', composite: 67.2, scores: { performance: 78, adoption: 60, investment: 70, cultural_impact: 62, innovation: 72 }, history: [65.0, 65.8, 66.5, 67.2] },
  { slug: 'alibaba-qwen', composite: 66.8, scores: { performance: 82, adoption: 68, investment: 65, cultural_impact: 45, innovation: 72 }, history: [63.5, 64.8, 65.8, 66.8] },
  { slug: 'cognition', composite: 65.4, scores: { performance: 60, adoption: 45, investment: 85, cultural_impact: 78, innovation: 62 }, history: [58.0, 60.5, 63.0, 65.4] },
  { slug: 'ai21', composite: 63.4, scores: { performance: 70, adoption: 55, investment: 65, cultural_impact: 48, innovation: 72 }, history: [64.0, 63.8, 63.6, 63.4] },
  { slug: 'inflection', composite: 61.9, scores: { performance: 65, adoption: 50, investment: 75, cultural_impact: 55, innovation: 58 }, history: [63.5, 62.8, 62.3, 61.9] },
  { slug: 'samsung-ai', composite: 59.3, scores: { performance: 55, adoption: 80, investment: 60, cultural_impact: 40, innovation: 50 }, history: [58.5, 58.8, 59.0, 59.3] },
  { slug: 'zhipu', composite: 57.8, scores: { performance: 72, adoption: 55, investment: 50, cultural_impact: 35, innovation: 65 }, history: [56.5, 57.0, 57.4, 57.8] },
  { slug: 'baidu-ai', composite: 55.7, scores: { performance: 68, adoption: 65, investment: 55, cultural_impact: 30, innovation: 48 }, history: [56.5, 56.2, 55.9, 55.7] },
];

// Top Models — per dimension scores
export const modelScores: ScoredRanking[] = [
  { slug: 'claude-opus-4-6', composite: 96.1, scores: { benchmarks: 98, adoption: 85, developer_sentiment: 97, efficiency: 70, buzz: 95 }, history: [91.2, 93.5, 95.0, 96.1] },
  { slug: 'gpt-4-5', composite: 94.8, scores: { benchmarks: 95, adoption: 92, developer_sentiment: 90, efficiency: 65, buzz: 92 }, history: [93.5, 94.0, 94.5, 94.8] },
  { slug: 'gemini-2-5-pro', composite: 93.2, scores: { benchmarks: 93, adoption: 90, developer_sentiment: 88, efficiency: 72, buzz: 88 }, history: [90.8, 91.5, 92.3, 93.2] },
  { slug: 'claude-sonnet-4-6', composite: 91.5, scores: { benchmarks: 88, adoption: 90, developer_sentiment: 95, efficiency: 92, buzz: 82 }, history: [87.0, 88.8, 90.2, 91.5] },
  { slug: 'gpt-4o', composite: 89.3, scores: { benchmarks: 85, adoption: 99, developer_sentiment: 82, efficiency: 80, buzz: 75 }, history: [90.0, 89.8, 89.5, 89.3] },
  { slug: 'deepseek-r1', composite: 87.6, scores: { benchmarks: 92, adoption: 78, developer_sentiment: 88, efficiency: 98, buzz: 90 }, history: [80.5, 83.2, 85.8, 87.6] },
  { slug: 'llama-4-maverick', composite: 86.2, scores: { benchmarks: 88, adoption: 75, developer_sentiment: 85, efficiency: 90, buzz: 95 }, history: [0, 0, 0, 86.2] },
  { slug: 'grok-3', composite: 84.8, scores: { benchmarks: 86, adoption: 78, developer_sentiment: 80, efficiency: 75, buzz: 85 }, history: [83.0, 83.5, 84.2, 84.8] },
  { slug: 'deepseek-v3', composite: 83.1, scores: { benchmarks: 85, adoption: 82, developer_sentiment: 82, efficiency: 95, buzz: 72 }, history: [82.0, 82.5, 82.8, 83.1] },
  { slug: 'qwen-2-5-max', composite: 81.4, scores: { benchmarks: 88, adoption: 72, developer_sentiment: 78, efficiency: 82, buzz: 65 }, history: [78.5, 79.5, 80.5, 81.4] },
  { slug: 'gemini-2-5-flash', composite: 79.9, scores: { benchmarks: 78, adoption: 85, developer_sentiment: 80, efficiency: 95, buzz: 62 }, history: [77.0, 78.0, 79.0, 79.9] },
  { slug: 'mistral-large-2', composite: 78.3, scores: { benchmarks: 80, adoption: 68, developer_sentiment: 78, efficiency: 78, buzz: 60 }, history: [78.8, 78.6, 78.4, 78.3] },
  { slug: 'llama-4-scout', composite: 76.8, scores: { benchmarks: 75, adoption: 65, developer_sentiment: 80, efficiency: 88, buzz: 90 }, history: [0, 0, 0, 76.8] },
  { slug: 'claude-haiku-4-5', composite: 75.2, scores: { benchmarks: 72, adoption: 78, developer_sentiment: 82, efficiency: 98, buzz: 50 }, history: [74.0, 74.5, 74.8, 75.2] },
  { slug: 'gpt-4o-mini', composite: 73.6, scores: { benchmarks: 68, adoption: 95, developer_sentiment: 70, efficiency: 95, buzz: 40 }, history: [74.0, 73.8, 73.7, 73.6] },
  { slug: 'midjourney-v7', composite: 71.8, scores: { benchmarks: 92, adoption: 78, developer_sentiment: 72, efficiency: 50, buzz: 65 }, history: [68.5, 69.8, 70.8, 71.8] },
  { slug: 'stable-diffusion-3-5', composite: 69.4, scores: { benchmarks: 72, adoption: 80, developer_sentiment: 68, efficiency: 85, buzz: 45 }, history: [70.0, 69.8, 69.6, 69.4] },
  { slug: 'sora', composite: 67.5, scores: { benchmarks: 85, adoption: 40, developer_sentiment: 60, efficiency: 35, buzz: 92 }, history: [70.0, 69.0, 68.2, 67.5] },
  { slug: 'veo-2', composite: 65.2, scores: { benchmarks: 82, adoption: 45, developer_sentiment: 58, efficiency: 50, buzz: 70 }, history: [62.0, 63.2, 64.2, 65.2] },
];

// Top Tools — per dimension scores
export const toolScores: ScoredRanking[] = [
  { slug: 'chatgpt', composite: 97.3, scores: { usage: 99, growth: 88, features: 95, developer_love: 82, buzz: 95 }, history: [96.8, 97.0, 97.1, 97.3] },
  { slug: 'claude-app', composite: 93.1, scores: { usage: 78, growth: 95, features: 92, developer_love: 98, buzz: 90 }, history: [89.5, 90.8, 92.0, 93.1] },
  { slug: 'cursor', composite: 91.8, scores: { usage: 82, growth: 95, features: 90, developer_love: 96, buzz: 88 }, history: [89.0, 90.2, 91.0, 91.8] },
  { slug: 'perplexity-app', composite: 89.4, scores: { usage: 85, growth: 92, features: 85, developer_love: 88, buzz: 82 }, history: [86.5, 87.5, 88.5, 89.4] },
  { slug: 'github-copilot', composite: 87.2, scores: { usage: 90, growth: 70, features: 88, developer_love: 82, buzz: 72 }, history: [88.0, 87.8, 87.5, 87.2] },
  { slug: 'claude-code', composite: 86.6, scores: { usage: 65, growth: 98, features: 88, developer_love: 98, buzz: 95 }, history: [78.2, 81.5, 84.0, 86.6] },
  { slug: 'gemini-app', composite: 84.1, scores: { usage: 92, growth: 80, features: 82, developer_love: 70, buzz: 72 }, history: [82.5, 83.0, 83.5, 84.1] },
  { slug: 'midjourney-app', composite: 82.5, scores: { usage: 85, growth: 72, features: 82, developer_love: 80, buzz: 78 }, history: [83.0, 82.8, 82.6, 82.5] },
  { slug: 'v0', composite: 80.9, scores: { usage: 68, growth: 90, features: 82, developer_love: 88, buzz: 85 }, history: [76.5, 78.0, 79.5, 80.9] },
  { slug: 'elevenlabs', composite: 79.3, scores: { usage: 72, growth: 85, features: 88, developer_love: 80, buzz: 72 }, history: [77.0, 78.0, 78.8, 79.3] },
  { slug: 'bolt', composite: 78.8, scores: { usage: 70, growth: 88, features: 78, developer_love: 82, buzz: 80 }, history: [74.5, 76.0, 77.5, 78.8] },
  { slug: 'devin', composite: 76.2, scores: { usage: 45, growth: 78, features: 80, developer_love: 72, buzz: 95 }, history: [78.5, 77.8, 77.0, 76.2] },
  { slug: 'notion-ai', composite: 74.6, scores: { usage: 88, growth: 60, features: 75, developer_love: 65, buzz: 55 }, history: [75.0, 74.8, 74.7, 74.6] },
  { slug: 'suno', composite: 73.1, scores: { usage: 72, growth: 80, features: 70, developer_love: 65, buzz: 78 }, history: [70.5, 71.5, 72.3, 73.1] },
  { slug: 'canva-ai', composite: 71.5, scores: { usage: 92, growth: 55, features: 72, developer_love: 50, buzz: 48 }, history: [72.0, 71.8, 71.6, 71.5] },
  { slug: 'windsurf', composite: 70.8, scores: { usage: 55, growth: 82, features: 75, developer_love: 78, buzz: 72 }, history: [66.0, 68.0, 69.5, 70.8] },
  { slug: 'codex-cli', composite: 69.7, scores: { usage: 40, growth: 95, features: 72, developer_love: 70, buzz: 92 }, history: [0, 0, 60.0, 69.7] },
  { slug: 'replit-agent', composite: 68.2, scores: { usage: 65, growth: 68, features: 72, developer_love: 62, buzz: 65 }, history: [67.5, 67.8, 68.0, 68.2] },
  { slug: 'lovable', composite: 66.1, scores: { usage: 48, growth: 82, features: 70, developer_love: 72, buzz: 68 }, history: [62.0, 63.5, 65.0, 66.1] },
  { slug: 'kling', composite: 64.4, scores: { usage: 65, growth: 72, features: 60, developer_love: 45, buzz: 68 }, history: [60.0, 61.5, 63.0, 64.4] },
];

// Top Creators — per dimension scores
export const creatorScores: ScoredRanking[] = [
  { slug: 'andrej-karpathy', composite: 95.4, scores: { reach: 88, engagement: 92, quality: 99, influence: 99, consistency: 85 }, history: [95.0, 95.1, 95.2, 95.4] },
  { slug: 'fireship', composite: 92.1, scores: { reach: 95, engagement: 95, quality: 88, influence: 82, consistency: 92 }, history: [91.5, 91.7, 91.9, 92.1] },
  { slug: 'sam-altman', composite: 90.8, scores: { reach: 98, engagement: 85, quality: 80, influence: 99, consistency: 75 }, history: [90.5, 90.6, 90.7, 90.8] },
  { slug: 'matt-wolfe', composite: 87.3, scores: { reach: 85, engagement: 88, quality: 85, influence: 80, consistency: 92 }, history: [86.5, 86.8, 87.0, 87.3] },
  { slug: 'dario-amodei', composite: 86.6, scores: { reach: 72, engagement: 80, quality: 95, influence: 98, consistency: 60 }, history: [83.0, 84.2, 85.5, 86.6] },
  { slug: 'two-minute-papers', composite: 83.9, scores: { reach: 88, engagement: 85, quality: 82, influence: 75, consistency: 88 }, history: [84.2, 84.1, 84.0, 83.9] },
  { slug: 'matthew-berman', composite: 82.2, scores: { reach: 78, engagement: 85, quality: 80, influence: 78, consistency: 88 }, history: [80.5, 81.0, 81.6, 82.2] },
  { slug: 'yannick-kilcher', composite: 79.5, scores: { reach: 65, engagement: 75, quality: 95, influence: 82, consistency: 72 }, history: [79.8, 79.7, 79.6, 79.5] },
  { slug: 'swyx', composite: 78.8, scores: { reach: 68, engagement: 82, quality: 88, influence: 85, consistency: 75 }, history: [76.0, 77.0, 78.0, 78.8] },
  { slug: 'riley-brown', composite: 77.1, scores: { reach: 62, engagement: 82, quality: 78, influence: 72, consistency: 85 }, history: [73.5, 75.0, 76.2, 77.1] },
  { slug: 'ai-advantage', composite: 75.4, scores: { reach: 80, engagement: 78, quality: 72, influence: 60, consistency: 82 }, history: [76.0, 75.8, 75.6, 75.4] },
  { slug: 'harrison-chase', composite: 73.7, scores: { reach: 60, engagement: 70, quality: 78, influence: 85, consistency: 68 }, history: [73.0, 73.2, 73.5, 73.7] },
  { slug: 'ai-jason', composite: 72.0, scores: { reach: 70, engagement: 78, quality: 72, influence: 62, consistency: 75 }, history: [70.5, 71.0, 71.5, 72.0] },
  { slug: 'emad-mostaque', composite: 69.3, scores: { reach: 72, engagement: 65, quality: 60, influence: 78, consistency: 50 }, history: [71.0, 70.5, 69.8, 69.3] },
  { slug: 'thelinusshow', composite: 68.6, scores: { reach: 55, engagement: 80, quality: 72, influence: 58, consistency: 78 }, history: [64.0, 65.5, 67.0, 68.6] },
];

// ── GENRE CHARTS DATA ───────────────────────────────────────────────────

// Top Code AI — slugs from toolEntities
export const codeAIScores: ScoredRanking[] = [
  { slug: 'cursor', composite: 95.2, scores: { developer_adoption: 95, code_quality: 92, speed: 90, features: 95, buzz: 92 }, history: [93.0, 93.8, 94.5, 95.2] },
  { slug: 'claude-code', composite: 93.8, scores: { developer_adoption: 78, code_quality: 98, speed: 88, features: 95, buzz: 98 }, history: [85.0, 88.5, 91.2, 93.8] },
  { slug: 'github-copilot', composite: 90.5, scores: { developer_adoption: 98, code_quality: 85, speed: 92, features: 88, buzz: 72 }, history: [91.0, 90.8, 90.6, 90.5] },
  { slug: 'v0', composite: 87.3, scores: { developer_adoption: 78, code_quality: 85, speed: 92, features: 88, buzz: 90 }, history: [83.5, 85.0, 86.2, 87.3] },
  { slug: 'codex-cli', composite: 84.6, scores: { developer_adoption: 55, code_quality: 88, speed: 85, features: 82, buzz: 95 }, history: [0, 0, 72.0, 84.6] },
  { slug: 'bolt', composite: 82.1, scores: { developer_adoption: 75, code_quality: 78, speed: 88, features: 82, buzz: 82 }, history: [78.0, 79.5, 80.8, 82.1] },
  { slug: 'windsurf', composite: 80.5, scores: { developer_adoption: 68, code_quality: 82, speed: 85, features: 80, buzz: 78 }, history: [76.0, 77.8, 79.2, 80.5] },
  { slug: 'devin', composite: 78.2, scores: { developer_adoption: 42, code_quality: 82, speed: 65, features: 90, buzz: 95 }, history: [80.0, 79.5, 78.8, 78.2] },
  { slug: 'replit-agent', composite: 75.8, scores: { developer_adoption: 72, code_quality: 72, speed: 80, features: 75, buzz: 70 }, history: [74.5, 75.0, 75.4, 75.8] },
  { slug: 'lovable', composite: 73.4, scores: { developer_adoption: 55, code_quality: 75, speed: 82, features: 78, buzz: 72 }, history: [69.5, 71.0, 72.2, 73.4] },
];

// Top Creative AI
export const creativeAIScores: ScoredRanking[] = [
  { slug: 'midjourney-app', composite: 94.5, scores: { output_quality: 98, adoption: 92, versatility: 88, accessibility: 85, buzz: 88 }, history: [94.0, 94.2, 94.3, 94.5] },
  { slug: 'canva-ai', composite: 88.2, scores: { output_quality: 72, adoption: 99, versatility: 95, accessibility: 98, buzz: 65 }, history: [87.5, 87.8, 88.0, 88.2] },
  { slug: 'elevenlabs', composite: 86.7, scores: { output_quality: 95, adoption: 78, versatility: 85, accessibility: 82, buzz: 78 }, history: [84.5, 85.2, 86.0, 86.7] },
  { slug: 'suno', composite: 83.5, scores: { output_quality: 78, adoption: 82, versatility: 75, accessibility: 90, buzz: 88 }, history: [80.0, 81.2, 82.5, 83.5] },
  { slug: 'kling', composite: 78.3, scores: { output_quality: 82, adoption: 72, versatility: 70, accessibility: 85, buzz: 75 }, history: [74.0, 75.5, 77.0, 78.3] },
];

// Top Open Source models
export const openSourceScores: ScoredRanking[] = [
  { slug: 'llama-4-maverick', composite: 94.8, scores: { downloads: 92, community: 88, capability: 95, documentation: 82, momentum: 99 }, history: [0, 0, 0, 94.8] },
  { slug: 'deepseek-v3', composite: 91.2, scores: { downloads: 88, community: 85, capability: 92, documentation: 78, momentum: 85 }, history: [88.5, 89.5, 90.3, 91.2] },
  { slug: 'deepseek-r1', composite: 89.5, scores: { downloads: 85, community: 88, capability: 95, documentation: 72, momentum: 82 }, history: [82.0, 85.0, 87.5, 89.5] },
  { slug: 'qwen-2-5-max', composite: 86.3, scores: { downloads: 82, community: 78, capability: 90, documentation: 80, momentum: 78 }, history: [83.5, 84.5, 85.5, 86.3] },
  { slug: 'llama-4-scout', composite: 84.1, scores: { downloads: 78, community: 80, capability: 82, documentation: 80, momentum: 95 }, history: [0, 0, 0, 84.1] },
  { slug: 'mistral-large-2', composite: 80.5, scores: { downloads: 72, community: 75, capability: 85, documentation: 82, momentum: 68 }, history: [81.0, 80.8, 80.6, 80.5] },
  { slug: 'stable-diffusion-3-5', composite: 78.2, scores: { downloads: 90, community: 85, capability: 72, documentation: 75, momentum: 55 }, history: [79.0, 78.8, 78.5, 78.2] },
  { slug: 'claude-haiku-4-5', composite: 72.8, scores: { downloads: 55, community: 65, capability: 82, documentation: 88, momentum: 72 }, history: [71.0, 71.8, 72.3, 72.8] },
];

// ── ENTRY BUILDER (with history) ────────────────────────────────────────
export type WeekData = {
  week_start: string;
  entries: Omit<ChartEntry, 'id' | 'created_at' | 'chart_id' | 'entity_id'>[];
};

function buildWeeklyEntries(
  scores: ScoredRanking[],
  weekStarts: string[]
): WeekData[] {
  return weekStarts.map((week, weekIdx) => {
    // Sort by the score at this week index
    const sorted = [...scores]
      .map((s) => ({
        ...s,
        weekScore: s.history[weekIdx] || s.composite,
      }))
      .filter((s) => s.weekScore > 0) // skip entries not yet released
      .sort((a, b) => b.weekScore - a.weekScore);

    // Previous week rankings for position change
    const prevSorted = weekIdx > 0
      ? [...scores]
          .map((s) => ({ slug: s.slug, score: s.history[weekIdx - 1] || 0 }))
          .filter((s) => s.score > 0)
          .sort((a, b) => b.score - a.score)
      : [];
    const prevRankMap = new Map(prevSorted.map((s, i) => [s.slug, i + 1]));

    return {
      week_start: week,
      entries: sorted.map((s, i) => {
        const rank = i + 1;
        const prevRank = prevRankMap.get(s.slug) ?? null;
        const isNew = weekIdx === 0 || (s.history[weekIdx - 1] || 0) === 0;
        const status: ChartEntry['status'] =
          isNew && !prevRank ? 'new' :
          prevRank === null ? 're_entry' :
          rank < prevRank ? (prevRank - rank >= 5 ? 'hot_shot' : 'up') :
          rank > prevRank ? 'down' : 'steady';

        return {
          week_start: week,
          rank,
          previous_rank: prevRank,
          peak_rank: Math.min(rank, prevRank ?? rank),
          weeks_on_chart: isNew && !prevRank ? 1 : weekIdx + 1 + Math.floor(Math.random() * 10),
          composite_score: Math.round(s.weekScore * 10) / 10,
          score_breakdown: s.scores,
          status,
        };
      }),
    };
  });
}

export const CHART_WEEKS = ['2026-02-17', '2026-02-24', '2026-03-03', '2026-03-09'];

export const labWeeklyData = buildWeeklyEntries(labScores, CHART_WEEKS);
export const modelWeeklyData = buildWeeklyEntries(modelScores, CHART_WEEKS);
export const toolWeeklyData = buildWeeklyEntries(toolScores, CHART_WEEKS);
export const creatorWeeklyData = buildWeeklyEntries(creatorScores, CHART_WEEKS);
export const codeAIWeeklyData = buildWeeklyEntries(codeAIScores, CHART_WEEKS);
export const creativeAIWeeklyData = buildWeeklyEntries(creativeAIScores, CHART_WEEKS);
export const openSourceWeeklyData = buildWeeklyEntries(openSourceScores, CHART_WEEKS);

// Current week entries (convenience)
export const topLabsEntries = labWeeklyData[3].entries;
export const topModelsEntries = modelWeeklyData[3].entries;
export const topToolsEntries = toolWeeklyData[3].entries;
export const topCreatorsEntries = creatorWeeklyData[3].entries;
export const topCodeAIEntries = codeAIWeeklyData[3].entries;
export const topCreativeAIEntries = creativeAIWeeklyData[3].entries;
export const topOpenSourceEntries = openSourceWeeklyData[3].entries;
