import type { Entity, Chart, ChartEntry } from '@/lib/supabase/types';

/**
 * Seed data for MVP — 100+ entities across labs, models, tools, and creators.
 * Scores are editorial estimates based on real-world signals as of March 2026.
 */

// ========== LABS (Top 20) ==========
export const labEntities: Omit<Entity, 'id' | 'created_at' | 'updated_at'>[] = [
  { type: 'lab', name: 'OpenAI', slug: 'openai', description: 'Creator of GPT and ChatGPT. Leading frontier AI lab.', logo_url: null, website: 'https://openai.com', country: 'US', region: 'North America', category: 'Frontier AI', tags: ['frontier', 'llm', 'chatgpt', 'gpt'], social_links: { x: 'openai' }, metadata: { founded: 2015, hq: 'San Francisco', valuation: '$300B+' }, is_verified: true },
  { type: 'lab', name: 'Anthropic', slug: 'anthropic', description: 'AI safety company behind Claude. Focused on safe, steerable AI.', logo_url: null, website: 'https://anthropic.com', country: 'US', region: 'North America', category: 'Frontier AI', tags: ['frontier', 'llm', 'claude', 'safety'], social_links: { x: 'anthropicai' }, metadata: { founded: 2021, hq: 'San Francisco', valuation: '$60B+' }, is_verified: true },
  { type: 'lab', name: 'Google DeepMind', slug: 'google-deepmind', description: 'Merged Google Brain + DeepMind. Powers Gemini.', logo_url: null, website: 'https://deepmind.google', country: 'US', region: 'North America', category: 'Frontier AI', tags: ['frontier', 'llm', 'gemini', 'research'], social_links: { x: 'googledeepmind' }, metadata: { founded: 2023, hq: 'London/Mountain View' }, is_verified: true },
  { type: 'lab', name: 'Meta AI', slug: 'meta-ai', description: 'Open-source AI leader. Creator of Llama models.', logo_url: null, website: 'https://ai.meta.com', country: 'US', region: 'North America', category: 'Frontier AI', tags: ['open-source', 'llm', 'llama'], social_links: { x: 'metaai' }, metadata: { founded: 2013, hq: 'Menlo Park' }, is_verified: true },
  { type: 'lab', name: 'xAI', slug: 'xai', description: 'Elon Musk\'s AI company behind Grok.', logo_url: null, website: 'https://x.ai', country: 'US', region: 'North America', category: 'Frontier AI', tags: ['frontier', 'llm', 'grok'], social_links: { x: 'xaboratory' }, metadata: { founded: 2023, hq: 'San Francisco' }, is_verified: true },
  { type: 'lab', name: 'Mistral AI', slug: 'mistral', description: 'European open-weight AI lab. Known for efficient models.', logo_url: null, website: 'https://mistral.ai', country: 'FR', region: 'Europe', category: 'Frontier AI', tags: ['open-weight', 'llm', 'european'], social_links: { x: 'mistralai' }, metadata: { founded: 2023, hq: 'Paris' }, is_verified: true },
  { type: 'lab', name: 'Cohere', slug: 'cohere', description: 'Enterprise AI company. Command models for business.', logo_url: null, website: 'https://cohere.com', country: 'CA', region: 'North America', category: 'Enterprise AI', tags: ['enterprise', 'llm', 'rag'], social_links: { x: 'coaborateai' }, metadata: { founded: 2019, hq: 'Toronto' }, is_verified: true },
  { type: 'lab', name: 'Stability AI', slug: 'stability-ai', description: 'Open generative AI company behind Stable Diffusion.', logo_url: null, website: 'https://stability.ai', country: 'GB', region: 'Europe', category: 'Generative AI', tags: ['image-gen', 'open-source', 'diffusion'], social_links: { x: 'stabilityai' }, metadata: { founded: 2020, hq: 'London' }, is_verified: true },
  { type: 'lab', name: 'Perplexity AI', slug: 'perplexity', description: 'AI-powered answer engine. Redefining search.', logo_url: null, website: 'https://perplexity.ai', country: 'US', region: 'North America', category: 'AI Search', tags: ['search', 'rag', 'answer-engine'], social_links: { x: 'peraboruty_ai' }, metadata: { founded: 2022, hq: 'San Francisco' }, is_verified: true },
  { type: 'lab', name: 'DeepSeek', slug: 'deepseek', description: 'Chinese AI lab pushing frontier with efficient models.', logo_url: null, website: 'https://deepseek.com', country: 'CN', region: 'Asia', category: 'Frontier AI', tags: ['frontier', 'llm', 'chinese', 'open-source'], social_links: {}, metadata: { founded: 2023, hq: 'Hangzhou' }, is_verified: true },
  { type: 'lab', name: 'Alibaba Cloud (Qwen)', slug: 'alibaba-qwen', description: 'Alibaba\'s AI division. Creator of Qwen models.', logo_url: null, website: 'https://qwenlm.github.io', country: 'CN', region: 'Asia', category: 'Frontier AI', tags: ['llm', 'open-source', 'qwen'], social_links: {}, metadata: { hq: 'Hangzhou' }, is_verified: true },
  { type: 'lab', name: 'AI21 Labs', slug: 'ai21', description: 'Israeli AI lab. Creator of Jamba architecture.', logo_url: null, website: 'https://ai21.com', country: 'IL', region: 'Middle East', category: 'Enterprise AI', tags: ['llm', 'enterprise', 'jamba'], social_links: { x: 'ai21labs' }, metadata: { founded: 2017, hq: 'Tel Aviv' }, is_verified: true },
  { type: 'lab', name: 'Hugging Face', slug: 'hugging-face', description: 'The open-source AI community hub. Model hosting + community.', logo_url: null, website: 'https://huggingface.co', country: 'US', region: 'North America', category: 'AI Platform', tags: ['open-source', 'community', 'models'], social_links: { x: 'huggingface' }, metadata: { founded: 2016, hq: 'New York' }, is_verified: true },
  { type: 'lab', name: 'Runway', slug: 'runway', description: 'Creative AI company. Pioneering video generation.', logo_url: null, website: 'https://runway.ml', country: 'US', region: 'North America', category: 'Creative AI', tags: ['video-gen', 'creative', 'generative'], social_links: { x: 'runwayml' }, metadata: { founded: 2018, hq: 'New York' }, is_verified: true },
  { type: 'lab', name: 'Inflection AI', slug: 'inflection', description: 'Conversational AI company behind Pi.', logo_url: null, website: 'https://inflection.ai', country: 'US', region: 'North America', category: 'Conversational AI', tags: ['conversational', 'pi'], social_links: { x: 'inflaborntionai' }, metadata: { founded: 2022, hq: 'Palo Alto' }, is_verified: true },
  { type: 'lab', name: 'Nvidia AI', slug: 'nvidia', description: 'AI infrastructure + model development. Powers the AI era.', logo_url: null, website: 'https://nvidia.com/ai', country: 'US', region: 'North America', category: 'AI Infrastructure', tags: ['gpu', 'infrastructure', 'nemo'], social_links: { x: 'nvidia' }, metadata: { founded: 1993, hq: 'Santa Clara' }, is_verified: true },
  { type: 'lab', name: 'Samsung AI (Gauss)', slug: 'samsung-ai', description: 'Samsung\'s AI research center. Creator of Samsung Gauss.', logo_url: null, website: 'https://research.samsung.com', country: 'KR', region: 'Asia', category: 'Enterprise AI', tags: ['mobile', 'on-device'], social_links: {}, metadata: { hq: 'Seoul' }, is_verified: true },
  { type: 'lab', name: 'Zhipu AI', slug: 'zhipu', description: 'Chinese AI lab behind GLM models and ChatGLM.', logo_url: null, website: 'https://zhipuai.cn', country: 'CN', region: 'Asia', category: 'Frontier AI', tags: ['llm', 'chinese', 'glm'], social_links: {}, metadata: { founded: 2019, hq: 'Beijing' }, is_verified: true },
  { type: 'lab', name: 'Adept AI', slug: 'adept', description: 'Building AI that can take actions in software. ACT-1 model.', logo_url: null, website: 'https://adept.ai', country: 'US', region: 'North America', category: 'AI Agents', tags: ['agents', 'action', 'software'], social_links: { x: 'adaborutai' }, metadata: { founded: 2022, hq: 'San Francisco' }, is_verified: true },
  { type: 'lab', name: 'Baidu AI', slug: 'baidu-ai', description: 'Chinese tech giant\'s AI division. ERNIE Bot.', logo_url: null, website: 'https://ai.baidu.com', country: 'CN', region: 'Asia', category: 'Frontier AI', tags: ['llm', 'chinese', 'ernie'], social_links: {}, metadata: { hq: 'Beijing' }, is_verified: true },
];

// ========== MODELS (Top 25) ==========
export const modelEntities: Omit<Entity, 'id' | 'created_at' | 'updated_at'>[] = [
  { type: 'model', name: 'Claude Opus 4.6', slug: 'claude-opus-4-6', description: 'Anthropic\'s most capable model. 1M context, extended thinking, agentic.', logo_url: null, website: 'https://anthropic.com', country: 'US', region: 'North America', category: 'Frontier LLM', tags: ['llm', 'reasoning', 'agentic', '1M-context'], social_links: {}, metadata: { parent_lab: 'Anthropic', params: 'undisclosed', context: '1M tokens' }, is_verified: true },
  { type: 'model', name: 'Claude Sonnet 4.6', slug: 'claude-sonnet-4-6', description: 'Best balance of speed and intelligence. Anthropic\'s default.', logo_url: null, website: 'https://anthropic.com', country: 'US', region: 'North America', category: 'Frontier LLM', tags: ['llm', 'balanced', 'default'], social_links: {}, metadata: { parent_lab: 'Anthropic', context: '200K tokens' }, is_verified: true },
  { type: 'model', name: 'GPT-4.5', slug: 'gpt-4-5', description: 'OpenAI\'s latest reasoning model. Massive parameter count.', logo_url: null, website: 'https://openai.com', country: 'US', region: 'North America', category: 'Frontier LLM', tags: ['llm', 'reasoning'], social_links: {}, metadata: { parent_lab: 'OpenAI' }, is_verified: true },
  { type: 'model', name: 'GPT-4o', slug: 'gpt-4o', description: 'OpenAI\'s multimodal flagship. Text, vision, audio, video.', logo_url: null, website: 'https://openai.com', country: 'US', region: 'North America', category: 'Multimodal LLM', tags: ['llm', 'multimodal', 'vision', 'audio'], social_links: {}, metadata: { parent_lab: 'OpenAI' }, is_verified: true },
  { type: 'model', name: 'Gemini 2.5 Pro', slug: 'gemini-2-5-pro', description: 'Google\'s most capable model. Thinking mode, multimodal.', logo_url: null, website: 'https://deepmind.google', country: 'US', region: 'North America', category: 'Frontier LLM', tags: ['llm', 'multimodal', 'thinking'], social_links: {}, metadata: { parent_lab: 'Google DeepMind', context: '1M tokens' }, is_verified: true },
  { type: 'model', name: 'Gemini 2.5 Flash', slug: 'gemini-2-5-flash', description: 'Fast and cost-effective Gemini variant.', logo_url: null, website: 'https://deepmind.google', country: 'US', region: 'North America', category: 'Efficient LLM', tags: ['llm', 'fast', 'efficient'], social_links: {}, metadata: { parent_lab: 'Google DeepMind' }, is_verified: true },
  { type: 'model', name: 'Llama 4 Maverick', slug: 'llama-4-maverick', description: 'Meta\'s latest open-weight model. MoE architecture.', logo_url: null, website: 'https://ai.meta.com', country: 'US', region: 'North America', category: 'Open-Weight LLM', tags: ['open-source', 'llm', 'moe'], social_links: {}, metadata: { parent_lab: 'Meta AI', params: '400B MoE' }, is_verified: true },
  { type: 'model', name: 'Llama 4 Scout', slug: 'llama-4-scout', description: 'Meta\'s efficient open-weight model. 10M context.', logo_url: null, website: 'https://ai.meta.com', country: 'US', region: 'North America', category: 'Open-Weight LLM', tags: ['open-source', 'llm', 'long-context'], social_links: {}, metadata: { parent_lab: 'Meta AI', context: '10M tokens' }, is_verified: true },
  { type: 'model', name: 'Grok 3', slug: 'grok-3', description: 'xAI\'s flagship model. Strong coding and reasoning.', logo_url: null, website: 'https://x.ai', country: 'US', region: 'North America', category: 'Frontier LLM', tags: ['llm', 'reasoning', 'coding'], social_links: {}, metadata: { parent_lab: 'xAI' }, is_verified: true },
  { type: 'model', name: 'DeepSeek V3', slug: 'deepseek-v3', description: 'Chinese open-source model rivaling GPT-4.', logo_url: null, website: 'https://deepseek.com', country: 'CN', region: 'Asia', category: 'Open-Source LLM', tags: ['open-source', 'llm', 'efficient'], social_links: {}, metadata: { parent_lab: 'DeepSeek', params: '685B MoE' }, is_verified: true },
  { type: 'model', name: 'DeepSeek R1', slug: 'deepseek-r1', description: 'DeepSeek\'s reasoning model. Chain-of-thought specialist.', logo_url: null, website: 'https://deepseek.com', country: 'CN', region: 'Asia', category: 'Reasoning LLM', tags: ['reasoning', 'open-source', 'cot'], social_links: {}, metadata: { parent_lab: 'DeepSeek' }, is_verified: true },
  { type: 'model', name: 'Mistral Large 2', slug: 'mistral-large-2', description: 'Mistral\'s flagship. Strong multilingual and coding.', logo_url: null, website: 'https://mistral.ai', country: 'FR', region: 'Europe', category: 'Frontier LLM', tags: ['llm', 'multilingual', 'european'], social_links: {}, metadata: { parent_lab: 'Mistral AI' }, is_verified: true },
  { type: 'model', name: 'Qwen 2.5 Max', slug: 'qwen-2-5-max', description: 'Alibaba\'s most capable model. Excels at coding.', logo_url: null, website: 'https://qwenlm.github.io', country: 'CN', region: 'Asia', category: 'Frontier LLM', tags: ['llm', 'coding', 'open-source'], social_links: {}, metadata: { parent_lab: 'Alibaba' }, is_verified: true },
  { type: 'model', name: 'Claude Haiku 4.5', slug: 'claude-haiku-4-5', description: 'Anthropic\'s fastest model. Best for speed and cost.', logo_url: null, website: 'https://anthropic.com', country: 'US', region: 'North America', category: 'Efficient LLM', tags: ['llm', 'fast', 'efficient'], social_links: {}, metadata: { parent_lab: 'Anthropic' }, is_verified: true },
  { type: 'model', name: 'GPT-4o Mini', slug: 'gpt-4o-mini', description: 'OpenAI\'s small model. Fast and affordable.', logo_url: null, website: 'https://openai.com', country: 'US', region: 'North America', category: 'Efficient LLM', tags: ['llm', 'fast', 'affordable'], social_links: {}, metadata: { parent_lab: 'OpenAI' }, is_verified: true },
  { type: 'model', name: 'Stable Diffusion 3.5', slug: 'stable-diffusion-3-5', description: 'Open-source image generation model.', logo_url: null, website: 'https://stability.ai', country: 'GB', region: 'Europe', category: 'Image Gen', tags: ['image-gen', 'open-source', 'diffusion'], social_links: {}, metadata: { parent_lab: 'Stability AI' }, is_verified: true },
  { type: 'model', name: 'Midjourney V7', slug: 'midjourney-v7', description: 'Premium image generation. Industry-leading aesthetics.', logo_url: null, website: 'https://midjourney.com', country: 'US', region: 'North America', category: 'Image Gen', tags: ['image-gen', 'creative', 'premium'], social_links: {}, metadata: { parent_lab: 'Midjourney' }, is_verified: true },
  { type: 'model', name: 'DALL-E 3', slug: 'dall-e-3', description: 'OpenAI\'s image generation model.', logo_url: null, website: 'https://openai.com', country: 'US', region: 'North America', category: 'Image Gen', tags: ['image-gen', 'multimodal'], social_links: {}, metadata: { parent_lab: 'OpenAI' }, is_verified: true },
  { type: 'model', name: 'Sora', slug: 'sora', description: 'OpenAI\'s video generation model. Text-to-video pioneer.', logo_url: null, website: 'https://openai.com', country: 'US', region: 'North America', category: 'Video Gen', tags: ['video-gen', 'generative'], social_links: {}, metadata: { parent_lab: 'OpenAI' }, is_verified: true },
  { type: 'model', name: 'Veo 2', slug: 'veo-2', description: 'Google\'s video generation model.', logo_url: null, website: 'https://deepmind.google', country: 'US', region: 'North America', category: 'Video Gen', tags: ['video-gen', 'google'], social_links: {}, metadata: { parent_lab: 'Google DeepMind' }, is_verified: true },
];

// ========== TOOLS (Top 25) ==========
export const toolEntities: Omit<Entity, 'id' | 'created_at' | 'updated_at'>[] = [
  { type: 'tool', name: 'ChatGPT', slug: 'chatgpt', description: 'OpenAI\'s consumer AI product. 300M+ weekly active users.', logo_url: null, website: 'https://chatgpt.com', country: 'US', region: 'North America', category: 'AI Chat', tags: ['chat', 'consumer', 'multimodal'], social_links: {}, metadata: { parent_lab: 'OpenAI', users: '300M+ WAU' }, is_verified: true },
  { type: 'tool', name: 'Claude', slug: 'claude-app', description: 'Anthropic\'s AI assistant. Known for safety and long context.', logo_url: null, website: 'https://claude.ai', country: 'US', region: 'North America', category: 'AI Chat', tags: ['chat', 'safety', 'coding'], social_links: {}, metadata: { parent_lab: 'Anthropic' }, is_verified: true },
  { type: 'tool', name: 'Claude Code', slug: 'claude-code', description: 'Anthropic\'s agentic coding CLI. Terminal-native AI engineer.', logo_url: null, website: 'https://docs.anthropic.com/en/docs/claude-code', country: 'US', region: 'North America', category: 'AI Coding', tags: ['coding', 'agent', 'cli', 'terminal'], social_links: {}, metadata: { parent_lab: 'Anthropic' }, is_verified: true },
  { type: 'tool', name: 'Cursor', slug: 'cursor', description: 'AI-first code editor. The IDE that writes code.', logo_url: null, website: 'https://cursor.com', country: 'US', region: 'North America', category: 'AI Coding', tags: ['ide', 'coding', 'editor'], social_links: {}, metadata: { users: '2M+ developers' }, is_verified: true },
  { type: 'tool', name: 'GitHub Copilot', slug: 'github-copilot', description: 'AI pair programmer by GitHub/Microsoft.', logo_url: null, website: 'https://github.com/features/copilot', country: 'US', region: 'North America', category: 'AI Coding', tags: ['coding', 'copilot', 'ide-extension'], social_links: {}, metadata: { parent_lab: 'Microsoft/OpenAI' }, is_verified: true },
  { type: 'tool', name: 'v0', slug: 'v0', description: 'Vercel\'s AI UI generator. Prompts to React components.', logo_url: null, website: 'https://v0.dev', country: 'US', region: 'North America', category: 'AI Coding', tags: ['frontend', 'ui', 'react', 'vercel'], social_links: {}, metadata: { parent_lab: 'Vercel' }, is_verified: true },
  { type: 'tool', name: 'Bolt', slug: 'bolt', description: 'StackBlitz AI app builder. Full-stack from prompts.', logo_url: null, website: 'https://bolt.new', country: 'US', region: 'North America', category: 'AI Coding', tags: ['fullstack', 'builder', 'no-code'], social_links: {}, metadata: {}, is_verified: true },
  { type: 'tool', name: 'Perplexity', slug: 'perplexity-app', description: 'AI-powered answer engine replacing Google for many users.', logo_url: null, website: 'https://perplexity.ai', country: 'US', region: 'North America', category: 'AI Search', tags: ['search', 'research', 'rag'], social_links: {}, metadata: {}, is_verified: true },
  { type: 'tool', name: 'Midjourney', slug: 'midjourney-app', description: 'Premium image generation tool via Discord/web.', logo_url: null, website: 'https://midjourney.com', country: 'US', region: 'North America', category: 'AI Creative', tags: ['image-gen', 'creative', 'design'], social_links: {}, metadata: {}, is_verified: true },
  { type: 'tool', name: 'Gemini', slug: 'gemini-app', description: 'Google\'s AI assistant. Deep Google integration.', logo_url: null, website: 'https://gemini.google.com', country: 'US', region: 'North America', category: 'AI Chat', tags: ['chat', 'google', 'multimodal'], social_links: {}, metadata: { parent_lab: 'Google DeepMind' }, is_verified: true },
  { type: 'tool', name: 'Codex CLI', slug: 'codex-cli', description: 'OpenAI\'s agentic coding tool. Terminal AI engineer.', logo_url: null, website: 'https://openai.com', country: 'US', region: 'North America', category: 'AI Coding', tags: ['coding', 'agent', 'cli'], social_links: {}, metadata: { parent_lab: 'OpenAI' }, is_verified: true },
  { type: 'tool', name: 'Devin', slug: 'devin', description: 'Cognition\'s AI software engineer. Autonomous coding agent.', logo_url: null, website: 'https://devin.ai', country: 'US', region: 'North America', category: 'AI Agent', tags: ['agent', 'autonomous', 'coding'], social_links: {}, metadata: { parent_lab: 'Cognition' }, is_verified: true },
  { type: 'tool', name: 'Notion AI', slug: 'notion-ai', description: 'AI integrated into Notion workspace. Writing and organization.', logo_url: null, website: 'https://notion.so', country: 'US', region: 'North America', category: 'AI Productivity', tags: ['productivity', 'writing', 'workspace'], social_links: {}, metadata: {}, is_verified: true },
  { type: 'tool', name: 'Canva AI', slug: 'canva-ai', description: 'AI design tools inside Canva. Magic Studio suite.', logo_url: null, website: 'https://canva.com', country: 'AU', region: 'Asia Pacific', category: 'AI Creative', tags: ['design', 'creative', 'consumer'], social_links: {}, metadata: {}, is_verified: true },
  { type: 'tool', name: 'ElevenLabs', slug: 'elevenlabs', description: 'AI voice synthesis platform. Industry-leading TTS.', logo_url: null, website: 'https://elevenlabs.io', country: 'US', region: 'North America', category: 'AI Audio', tags: ['voice', 'tts', 'audio', 'speech'], social_links: {}, metadata: {}, is_verified: true },
  { type: 'tool', name: 'Suno', slug: 'suno', description: 'AI music generation. Create full songs from text prompts.', logo_url: null, website: 'https://suno.com', country: 'US', region: 'North America', category: 'AI Music', tags: ['music', 'audio', 'creative'], social_links: {}, metadata: {}, is_verified: true },
  { type: 'tool', name: 'Replit Agent', slug: 'replit-agent', description: 'AI coding agent inside Replit. Build full apps with prompts.', logo_url: null, website: 'https://replit.com', country: 'US', region: 'North America', category: 'AI Coding', tags: ['coding', 'agent', 'cloud-ide'], social_links: {}, metadata: {}, is_verified: true },
  { type: 'tool', name: 'Windsurf', slug: 'windsurf', description: 'Codeium\'s AI IDE. Agentic coding with Cascade.', logo_url: null, website: 'https://codeium.com/windsurf', country: 'US', region: 'North America', category: 'AI Coding', tags: ['ide', 'coding', 'agent'], social_links: {}, metadata: { parent_lab: 'Codeium' }, is_verified: true },
  { type: 'tool', name: 'Lovable', slug: 'lovable', description: 'AI full-stack app builder. Prompt to production.', logo_url: null, website: 'https://lovable.dev', country: 'SE', region: 'Europe', category: 'AI Coding', tags: ['builder', 'fullstack', 'no-code'], social_links: {}, metadata: {}, is_verified: true },
  { type: 'tool', name: 'Kling AI', slug: 'kling', description: 'Chinese AI video generation tool. Competing with Sora.', logo_url: null, website: 'https://klingai.com', country: 'CN', region: 'Asia', category: 'AI Video', tags: ['video-gen', 'creative'], social_links: {}, metadata: {}, is_verified: true },
];

// ========== CREATORS (Top 15) ==========
export const creatorEntities: Omit<Entity, 'id' | 'created_at' | 'updated_at'>[] = [
  { type: 'creator', name: 'Andrej Karpathy', slug: 'andrej-karpathy', description: 'Former Tesla AI Director, OpenAI founding member. Top AI educator.', logo_url: null, website: null, country: 'US', region: 'North America', category: 'AI Educator', tags: ['educator', 'researcher', 'youtube'], social_links: { x: 'karpathy', youtube: '@andrejkarpathy' }, metadata: { followers: '1M+ YouTube' }, is_verified: true },
  { type: 'creator', name: 'Fireship (Jeff Delaney)', slug: 'fireship', description: 'Fast-paced tech explainers. 100 seconds series. 3M+ YouTube.', logo_url: null, website: 'https://fireship.io', country: 'US', region: 'North America', category: 'Tech Content', tags: ['youtube', 'dev', 'explainer'], social_links: { x: 'fireship_dev', youtube: '@fireship' }, metadata: { followers: '3M+ YouTube' }, is_verified: true },
  { type: 'creator', name: 'Matt Wolfe', slug: 'matt-wolfe', description: 'AI tool reviewer and curator. Future Tools newsletter.', logo_url: null, website: 'https://futuretools.io', country: 'US', region: 'North America', category: 'AI Reviewer', tags: ['reviewer', 'tools', 'newsletter'], social_links: { x: 'mabortwolfe', youtube: '@mattwolfe' }, metadata: { followers: '700K+ YouTube' }, is_verified: true },
  { type: 'creator', name: 'Yannick Kilcher', slug: 'yannick-kilcher', description: 'AI paper reviewer and researcher. Deep technical content.', logo_url: null, website: null, country: 'CH', region: 'Europe', category: 'AI Research', tags: ['papers', 'research', 'technical'], social_links: { x: 'yaborukilaborher', youtube: '@yannickilcher' }, metadata: {}, is_verified: true },
  { type: 'creator', name: 'Two Minute Papers', slug: 'two-minute-papers', description: 'Karoly Zsolnai-Feher. Making AI research accessible. "What a time to be alive!"', logo_url: null, website: null, country: 'HU', region: 'Europe', category: 'AI Research', tags: ['papers', 'accessible', 'youtube'], social_links: { youtube: '@TwoMinutePapers' }, metadata: { followers: '1.5M+ YouTube' }, is_verified: true },
  { type: 'creator', name: 'The AI Advantage', slug: 'ai-advantage', description: 'Igor Pogany. Practical AI tutorials and tool reviews.', logo_url: null, website: null, country: 'DE', region: 'Europe', category: 'AI Tutorial', tags: ['tutorials', 'practical', 'youtube'], social_links: { youtube: '@aiadvantage' }, metadata: {}, is_verified: true },
  { type: 'creator', name: 'Riley Brown', slug: 'riley-brown', description: 'AI agent builder and educator. Practical AI coding content.', logo_url: null, website: null, country: 'US', region: 'North America', category: 'AI Dev', tags: ['agents', 'coding', 'youtube'], social_links: { x: 'rileabrown_ai', youtube: '@rileybrown' }, metadata: {}, is_verified: true },
  { type: 'creator', name: 'AI Jason', slug: 'ai-jason', description: 'AI coding tutorials. Building with LLMs and agents.', logo_url: null, website: null, country: 'US', region: 'North America', category: 'AI Dev', tags: ['coding', 'tutorials', 'agents'], social_links: { youtube: '@AIJason' }, metadata: {}, is_verified: true },
  { type: 'creator', name: 'Matthew Berman', slug: 'matthew-berman', description: 'AI model reviews and news. Local LLM specialist.', logo_url: null, website: null, country: 'US', region: 'North America', category: 'AI Reviewer', tags: ['models', 'local-llm', 'reviews'], social_links: { x: 'mabortwaborerman', youtube: '@matthewberman' }, metadata: { followers: '400K+ YouTube' }, is_verified: true },
  { type: 'creator', name: 'Sam Altman', slug: 'sam-altman', description: 'CEO of OpenAI. Most influential voice in AI industry.', logo_url: null, website: null, country: 'US', region: 'North America', category: 'Industry Leader', tags: ['executive', 'openai', 'leader'], social_links: { x: 'sama' }, metadata: {}, is_verified: true },
  { type: 'creator', name: 'Dario Amodei', slug: 'dario-amodei', description: 'CEO of Anthropic. AI safety advocate and thought leader.', logo_url: null, website: null, country: 'US', region: 'North America', category: 'Industry Leader', tags: ['executive', 'anthropic', 'safety'], social_links: { x: 'daborioamaborei' }, metadata: {}, is_verified: true },
  { type: 'creator', name: 'Emad Mostaque', slug: 'emad-mostaque', description: 'Open-source AI advocate. Former Stability AI CEO.', logo_url: null, website: null, country: 'GB', region: 'Europe', category: 'Industry Leader', tags: ['open-source', 'advocate'], social_links: { x: 'emaborstaque' }, metadata: {}, is_verified: true },
  { type: 'creator', name: 'Harrison Chase', slug: 'harrison-chase', description: 'CEO of LangChain. Building the AI application layer.', logo_url: null, website: null, country: 'US', region: 'North America', category: 'AI Dev', tags: ['langchain', 'frameworks', 'dev'], social_links: { x: 'hwcaborase' }, metadata: {}, is_verified: true },
  { type: 'creator', name: 'Swyx', slug: 'swyx', description: 'Shawn Wang. AI engineer, writer, community builder. Latent Space podcast.', logo_url: null, website: 'https://swyx.io', country: 'US', region: 'North America', category: 'AI Dev', tags: ['ai-engineer', 'community', 'podcast'], social_links: { x: 'swyx' }, metadata: {}, is_verified: true },
  { type: 'creator', name: 'Linus (TheLinusShow)', slug: 'thelinusshow', description: 'AI-native SaaS builder. Build in public with AI tools.', logo_url: null, website: null, country: 'US', region: 'North America', category: 'AI Builder', tags: ['builder', 'saas', 'build-in-public'], social_links: { x: 'thelinusshow' }, metadata: {}, is_verified: true },
];

// ========== CHART DEFINITIONS ==========
export const chartDefinitions: Omit<Chart, 'id' | 'created_at'>[] = [
  { name: 'Top Labs', slug: 'top-labs', category: 'major', entity_type: 'lab', frequency: 'weekly', description: 'The definitive ranking of AI laboratories by composite performance, adoption, investment, and cultural impact.', max_entries: 20, scoring_weights: { performance: 0.25, adoption: 0.25, investment: 0.20, cultural_impact: 0.15, innovation: 0.15 }, is_featured: true },
  { name: 'Top Models', slug: 'top-models', category: 'major', entity_type: 'model', frequency: 'weekly', description: 'Weekly ranking of AI models by benchmarks, adoption, developer sentiment, efficiency, and buzz.', max_entries: 25, scoring_weights: { benchmarks: 0.30, adoption: 0.25, developer_sentiment: 0.20, efficiency: 0.15, buzz: 0.10 }, is_featured: true },
  { name: 'Top Tools', slug: 'top-tools', category: 'major', entity_type: 'tool', frequency: 'weekly', description: 'The most impactful AI products and tools ranked by usage, growth, and cultural penetration.', max_entries: 25, scoring_weights: { usage: 0.30, growth: 0.25, features: 0.20, developer_love: 0.15, buzz: 0.10 }, is_featured: true },
  { name: 'Top Creators', slug: 'top-creators', category: 'major', entity_type: 'creator', frequency: 'weekly', description: 'The most influential AI creators across YouTube, X, LinkedIn, and TikTok.', max_entries: 15, scoring_weights: { reach: 0.30, engagement: 0.25, quality: 0.20, influence: 0.15, consistency: 0.10 }, is_featured: true },
  { name: 'Top Code AI', slug: 'top-code-ai', category: 'genre', entity_type: 'tool', frequency: 'weekly', description: 'The best AI coding tools — IDEs, agents, copilots, and builders.', max_entries: 15, scoring_weights: { usage: 0.30, developer_love: 0.30, features: 0.20, growth: 0.20 }, is_featured: false },
];

// ========== CHART ENTRIES (Current week rankings) ==========
function makeEntries(
  chartSlug: string,
  rankings: { slug: string; score: number; prevRank?: number | null; weeks?: number }[]
): Omit<ChartEntry, 'id' | 'created_at' | 'chart_id' | 'entity_id'>[] {
  return rankings.map((r, i) => {
    const rank = i + 1;
    const previousRank = r.prevRank ?? (rank + Math.floor(Math.random() * 3) - 1);
    const status: ChartEntry['status'] =
      r.prevRank === null ? 'new' :
      rank < previousRank ? (previousRank - rank >= 5 ? 'hot_shot' : 'up') :
      rank > previousRank ? 'down' : 'steady';
    return {
      week_start: '2026-03-09',
      rank,
      previous_rank: r.prevRank === null ? null : previousRank,
      peak_rank: Math.min(rank, previousRank || rank),
      weeks_on_chart: r.weeks ?? Math.floor(Math.random() * 20) + 1,
      composite_score: r.score,
      score_breakdown: {},
      status,
    };
  });
}

export const topLabsEntries = makeEntries('top-labs', [
  { slug: 'openai', score: 94.2, prevRank: 1, weeks: 52 },
  { slug: 'anthropic', score: 91.8, prevRank: 3, weeks: 48 },
  { slug: 'google-deepmind', score: 90.5, prevRank: 2, weeks: 52 },
  { slug: 'meta-ai', score: 85.3, prevRank: 4, weeks: 52 },
  { slug: 'xai', score: 82.1, prevRank: 7, weeks: 30 },
  { slug: 'deepseek', score: 79.8, prevRank: 8, weeks: 20 },
  { slug: 'mistral', score: 77.4, prevRank: 5, weeks: 40 },
  { slug: 'nvidia', score: 76.9, prevRank: 6, weeks: 52 },
  { slug: 'perplexity', score: 74.2, prevRank: 10, weeks: 28 },
  { slug: 'hugging-face', score: 72.8, prevRank: 9, weeks: 52 },
  { slug: 'cohere', score: 70.1, prevRank: 11, weeks: 44 },
  { slug: 'stability-ai', score: 68.5, prevRank: 12, weeks: 48 },
  { slug: 'runway', score: 67.2, prevRank: 14, weeks: 36 },
  { slug: 'alibaba-qwen', score: 65.8, prevRank: 15, weeks: 24 },
  { slug: 'ai21', score: 63.4, prevRank: 13, weeks: 40 },
  { slug: 'inflection', score: 61.9, prevRank: 16, weeks: 32 },
  { slug: 'samsung-ai', score: 59.3, prevRank: 17, weeks: 16 },
  { slug: 'zhipu', score: 57.8, prevRank: 18, weeks: 20 },
  { slug: 'adept', score: 55.2, prevRank: 19, weeks: 24 },
  { slug: 'baidu-ai', score: 53.7, prevRank: 20, weeks: 44 },
]);

export const topModelsEntries = makeEntries('top-models', [
  { slug: 'claude-opus-4-6', score: 96.1, prevRank: 2, weeks: 8 },
  { slug: 'gpt-4-5', score: 94.8, prevRank: 1, weeks: 12 },
  { slug: 'gemini-2-5-pro', score: 93.2, prevRank: 3, weeks: 16 },
  { slug: 'claude-sonnet-4-6', score: 91.5, prevRank: 4, weeks: 8 },
  { slug: 'gpt-4o', score: 89.3, prevRank: 5, weeks: 40 },
  { slug: 'deepseek-r1', score: 87.6, prevRank: 9, weeks: 12 },
  { slug: 'llama-4-maverick', score: 86.2, prevRank: null, weeks: 1 },
  { slug: 'grok-3', score: 84.8, prevRank: 6, weeks: 16 },
  { slug: 'deepseek-v3', score: 83.1, prevRank: 7, weeks: 20 },
  { slug: 'qwen-2-5-max', score: 81.4, prevRank: 10, weeks: 16 },
  { slug: 'gemini-2-5-flash', score: 79.9, prevRank: 8, weeks: 16 },
  { slug: 'mistral-large-2', score: 78.3, prevRank: 11, weeks: 24 },
  { slug: 'llama-4-scout', score: 76.8, prevRank: null, weeks: 1 },
  { slug: 'claude-haiku-4-5', score: 75.2, prevRank: 12, weeks: 8 },
  { slug: 'gpt-4o-mini', score: 73.6, prevRank: 13, weeks: 36 },
  { slug: 'midjourney-v7', score: 71.8, prevRank: 14, weeks: 12 },
  { slug: 'stable-diffusion-3-5', score: 69.4, prevRank: 16, weeks: 20 },
  { slug: 'dall-e-3', score: 67.1, prevRank: 15, weeks: 44 },
  { slug: 'sora', score: 65.5, prevRank: 17, weeks: 8 },
  { slug: 'veo-2', score: 63.2, prevRank: 18, weeks: 8 },
]);

export const topToolsEntries = makeEntries('top-tools', [
  { slug: 'chatgpt', score: 97.3, prevRank: 1, weeks: 52 },
  { slug: 'claude-app', score: 93.1, prevRank: 3, weeks: 48 },
  { slug: 'cursor', score: 91.8, prevRank: 2, weeks: 36 },
  { slug: 'perplexity-app', score: 89.4, prevRank: 4, weeks: 40 },
  { slug: 'github-copilot', score: 87.2, prevRank: 5, weeks: 52 },
  { slug: 'claude-code', score: 85.6, prevRank: 8, weeks: 16 },
  { slug: 'gemini-app', score: 84.1, prevRank: 6, weeks: 32 },
  { slug: 'midjourney-app', score: 82.5, prevRank: 7, weeks: 52 },
  { slug: 'v0', score: 80.9, prevRank: 10, weeks: 24 },
  { slug: 'elevenlabs', score: 79.3, prevRank: 11, weeks: 28 },
  { slug: 'bolt', score: 77.8, prevRank: 13, weeks: 16 },
  { slug: 'devin', score: 76.2, prevRank: 9, weeks: 8 },
  { slug: 'notion-ai', score: 74.6, prevRank: 12, weeks: 44 },
  { slug: 'suno', score: 73.1, prevRank: 15, weeks: 20 },
  { slug: 'canva-ai', score: 71.5, prevRank: 14, weeks: 36 },
  { slug: 'windsurf', score: 69.8, prevRank: 16, weeks: 12 },
  { slug: 'replit-agent', score: 68.2, prevRank: 17, weeks: 16 },
  { slug: 'codex-cli', score: 66.7, prevRank: null, weeks: 2 },
  { slug: 'lovable', score: 65.1, prevRank: 19, weeks: 12 },
  { slug: 'kling', score: 63.4, prevRank: 20, weeks: 8 },
]);

export const topCreatorsEntries = makeEntries('top-creators', [
  { slug: 'andrej-karpathy', score: 95.4, prevRank: 1, weeks: 52 },
  { slug: 'fireship', score: 92.1, prevRank: 2, weeks: 52 },
  { slug: 'sam-altman', score: 90.8, prevRank: 3, weeks: 52 },
  { slug: 'matt-wolfe', score: 87.3, prevRank: 4, weeks: 48 },
  { slug: 'dario-amodei', score: 85.6, prevRank: 6, weeks: 36 },
  { slug: 'two-minute-papers', score: 83.9, prevRank: 5, weeks: 52 },
  { slug: 'matthew-berman', score: 81.2, prevRank: 7, weeks: 40 },
  { slug: 'yannick-kilcher', score: 79.5, prevRank: 8, weeks: 48 },
  { slug: 'swyx', score: 77.8, prevRank: 10, weeks: 28 },
  { slug: 'riley-brown', score: 76.1, prevRank: 12, weeks: 20 },
  { slug: 'ai-advantage', score: 74.4, prevRank: 9, weeks: 36 },
  { slug: 'harrison-chase', score: 72.7, prevRank: 11, weeks: 24 },
  { slug: 'ai-jason', score: 71.0, prevRank: 13, weeks: 20 },
  { slug: 'emad-mostaque', score: 69.3, prevRank: 14, weeks: 44 },
  { slug: 'thelinusshow', score: 67.6, prevRank: 15, weeks: 16 },
]);
