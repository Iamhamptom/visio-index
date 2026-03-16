import type { Entity } from '@/lib/supabase/types';
type E = Omit<Entity, 'id' | 'created_at' | 'updated_at'>;

/**
 * WAVE 4 — March 2026 fresh intel.
 * Higgsfield, OpenEvidence, video/image models, education, legal, gaming.
 */

// ── VIDEO AI ────────────────────────────────────────────────────────────
export const videoAI: E[] = [
  { type: 'lab', name: 'Higgsfield AI', slug: 'higgsfield', description: 'AI video generation unicorn. 4.5M video gens/day. 15M users. $200M ARR in under 9 months. $1.3B valuation. The fastest-growing video AI company.', logo_url: null, website: 'https://higgsfield.ai', country: 'US', region: 'North America', category: 'AI Video', tags: ['video-gen', 'unicorn', 'fast-growth'], social_links: {}, metadata: { valuation: '$1.3B', arr: '$200M', users: '15M', daily_gens: '4.5M', funding: '$138M', investors: 'Accel, AI Capital, Menlo Ventures' }, is_verified: true },
  { type: 'model', name: 'Kling 3.0', slug: 'kling-3-0', description: 'Chinese video model by Kuaishou. Native 4K (3840x2160) at 60fps. Multi-shot sequences with subject consistency. Broadcast-quality AI video.', logo_url: null, website: 'https://klingai.com', country: 'CN', region: 'Asia', category: 'Video Gen', tags: ['video-gen', 'chinese', '4k', '60fps'], social_links: {}, metadata: { resolution: '4K 60fps', lab: 'Kuaishou', release: '2026-02' }, is_verified: true },
  { type: 'model', name: 'Veo 3.1', slug: 'veo-3-1', description: 'Google\'s latest video model. 4K resolution. Vertical video support. Improved character and facial consistency. Native audio generation.', logo_url: null, website: 'https://deepmind.google', country: 'US', region: 'North America', category: 'Video Gen', tags: ['video-gen', 'google', '4k', 'audio'], social_links: {}, metadata: { lab: 'Google DeepMind', release: '2026-01' }, is_verified: true },
];

// ── IMAGE AI ────────────────────────────────────────────────────────────
export const imageAI: E[] = [
  { type: 'model', name: 'Flux 2', slug: 'flux-2', description: 'Best overall image model of 2026 by Black Forest Labs. Exceptional photorealism, skin textures, lighting. Kontext for generation + editing in one tool.', logo_url: null, website: 'https://blackforestlabs.ai', country: 'DE', region: 'Europe', category: 'Image Gen', tags: ['image-gen', 'photorealism', 'open-source'], social_links: {}, metadata: { lab: 'Black Forest Labs', note: 'Best overall image model 2026' }, is_verified: true },
  { type: 'model', name: 'Ideogram 3.0', slug: 'ideogram-3', description: 'Best text rendering in AI images. Custom fonts, text spacing controls. Released March 2026. The go-to for text-heavy designs and logos.', logo_url: null, website: 'https://ideogram.ai', country: 'US', region: 'North America', category: 'Image Gen', tags: ['image-gen', 'text-rendering', 'design'], social_links: {}, metadata: { release: '2026-03', note: 'Best text rendering' }, is_verified: true },
  { type: 'model', name: 'Recraft V4', slug: 'recraft-v4', description: '#1 on HuggingFace image benchmarks. Best for logos. SVG export, brand styling tools. Vector-first image AI for designers.', logo_url: null, website: 'https://recraft.ai', country: 'US', region: 'North America', category: 'Image Gen', tags: ['image-gen', 'vector', 'logos', 'design'], social_links: {}, metadata: { note: '#1 HuggingFace benchmarks, SVG export' }, is_verified: true },
  { type: 'tool', name: 'Leonardo AI', slug: 'leonardo-ai', description: 'Image generation platform hosting Nano Banana, Ideogram 3.0, Flux Kontext Max. Lucid Origin Ultra model. Multi-model creative suite.', logo_url: null, website: 'https://leonardo.ai', country: 'AU', region: 'Asia Pacific', category: 'AI Creative', tags: ['image-gen', 'creative', 'multi-model', 'platform'], social_links: {}, metadata: { models: 'Nano Banana, Ideogram 3.0, Flux Kontext Max', note: 'Multi-model creative platform' }, is_verified: true },
  { type: 'tool', name: 'Playground AI', slug: 'playground-ai', description: 'Content-aware image editing. Object removal, generation, editing. $40.8M raised. Pro $15/mo, Turbo $45/mo.', logo_url: null, website: 'https://playground.com', country: 'US', region: 'North America', category: 'AI Creative', tags: ['image-gen', 'editing', 'creative'], social_links: {}, metadata: { funding: '$40.8M' }, is_verified: true },
];

// ── HEALTHCARE AI ───────────────────────────────────────────────────────
export const healthcareAI: E[] = [
  { type: 'lab', name: 'OpenEvidence', slug: 'openevidence', description: '"ChatGPT for Doctors." 1M clinical consultations in a single day (March 10, 2026) — historic first. Used by 40%+ of US physicians. 10,000+ hospitals. $12B valuation.', logo_url: null, website: 'https://openevidence.com', country: 'US', region: 'North America', category: 'AI Healthcare', tags: ['healthcare', 'clinical', 'physicians', 'unicorn'], social_links: {}, metadata: { valuation: '$12B', funding: '$250M Series D', daily_consults: '1M', physician_share: '40%+ US', hospitals: '10,000+', note: 'Most widely used medical AI among verified US physicians' }, is_verified: true },
];

// ── EDUCATION AI ────────────────────────────────────────────────────────
export const educationAI: E[] = [
  { type: 'tool', name: 'Khanmigo', slug: 'khanmigo', description: 'Khan Academy\'s GPT-4 powered Socratic tutor. $4/mo. Free for teachers. Standards-aligned lesson planning. AI tutor for every student.', logo_url: null, website: 'https://khanacademy.org/khan-labs', country: 'US', region: 'North America', category: 'AI Education', tags: ['education', 'tutor', 'k12', 'gpt4'], social_links: {}, metadata: { price: '$4/mo ($44/yr)', note: 'Free for teachers', model: 'GPT-4' }, is_verified: true },
  { type: 'tool', name: 'Duolingo Max', slug: 'duolingo-max', description: 'AI roleplay conversations and grammar explanations powered by GPT-4. $29.99/mo. Making language learning conversational.', logo_url: null, website: 'https://duolingo.com', country: 'US', region: 'North America', category: 'AI Education', tags: ['education', 'language', 'consumer', 'gpt4'], social_links: {}, metadata: { price: '$29.99/mo', note: 'AI roleplay + Explain My Answer' }, is_verified: true },
];

// ── LEGAL AI ────────────────────────────────────────────────────────────
export const legalAI: E[] = [
  { type: 'tool', name: 'CoCounsel', slug: 'cocounsel', description: 'Thomson Reuters AI legal assistant. 1M users across 107 countries. Westlaw + Practical Law integration. Building proprietary legal LLM.', logo_url: null, website: 'https://legal.thomsonreuters.com/cocounsel', country: 'US', region: 'North America', category: 'AI Legal', tags: ['legal', 'enterprise', 'research'], social_links: {}, metadata: { users: '1M', countries: '107', parent: 'Thomson Reuters' }, is_verified: true },
];

// ── GAMING AI ───────────────────────────────────────────────────────────
export const gamingAI: E[] = [
  { type: 'tool', name: 'Inworld AI', slug: 'inworld-ai', description: 'AI game characters with 200ms response time. Unreal Engine + Unity integrations. AR support. Making NPCs intelligent.', logo_url: null, website: 'https://inworld.ai', country: 'US', region: 'North America', category: 'AI Gaming', tags: ['gaming', 'npcs', 'characters', 'engines'], social_links: {}, metadata: { response_time: '200ms', integrations: 'Unreal Engine, Unity, 8th Wall AR' }, is_verified: true },
  { type: 'lab', name: 'NVIDIA ACE', slug: 'nvidia-ace', description: 'Avatar Cloud Engine. Sub-200ms NPC responses. Speech recognition + voice synthesis + character AI. Used by KRAFTON in PUBG.', logo_url: null, website: 'https://nvidia.com/ace', country: 'US', region: 'North America', category: 'AI Gaming', tags: ['gaming', 'npcs', 'nvidia', 'voice'], social_links: {}, metadata: { response_time: '<200ms', client: 'KRAFTON (PUBG)' }, is_verified: true },
];

// ── NEW MODELS FROM MARCH 2026 ─────────────────────────────────────────
export const marchModels: E[] = [
  { type: 'model', name: 'GPT-5.4', slug: 'gpt-5-4', description: 'OpenAI\'s latest. Native computer use, tool search, 1M token context. Released March 5, 2026. GPT-5.1 deprecated March 11.', logo_url: null, website: 'https://openai.com', country: 'US', region: 'North America', category: 'Frontier LLM', tags: ['llm', 'computer-use', '1M-context'], social_links: {}, metadata: { lab: 'OpenAI', context: '1M tokens', release: '2026-03-05', note: 'Native computer use + tool search' }, is_verified: true },
  { type: 'model', name: 'Gemini 3.1 Pro', slug: 'gemini-3-1-pro', description: 'Google\'s latest. Leading on 13/16 major benchmarks. 77.1% on ARC-AGI-2. 1500 Elo on LMSYS Arena (preliminary).', logo_url: null, website: 'https://deepmind.google', country: 'US', region: 'North America', category: 'Frontier LLM', tags: ['llm', 'multimodal', 'benchmarks'], social_links: {}, metadata: { lab: 'Google DeepMind', arena_elo: '1500', arc_agi_2: '77.1%', release: '2026-02-19' }, is_verified: true },
  { type: 'model', name: 'Grok 4.20', slug: 'grok-4-20', description: 'xAI\'s latest beta. Multi-agent reasoning, lower hallucination rates. 1493 Elo on LMSYS Arena.', logo_url: null, website: 'https://x.ai', country: 'US', region: 'North America', category: 'Frontier LLM', tags: ['llm', 'reasoning', 'multi-agent'], social_links: {}, metadata: { lab: 'xAI', arena_elo: '1493', status: 'beta', release: '2026-03' }, is_verified: true },
];

export const allWave4Entities = [...videoAI, ...imageAI, ...healthcareAI, ...educationAI, ...legalAI, ...gamingAI, ...marchModels];
