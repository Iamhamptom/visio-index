import type { Chart, ChartEntry } from '@/lib/supabase/types';
import type { ScoredRanking } from './seed';

/**
 * EXPANDED CHARTS — The full Billboard treatment.
 * CEOs, Scientists, Teams, Communities, Campaigns.
 */

// ── NEW CHART DEFINITIONS ───────────────────────────────────────────────
export const expandedChartDefs: Omit<Chart, 'id' | 'created_at'>[] = [
  {
    name: 'Top AI CEOs', slug: 'top-ceos', category: 'power_list', entity_type: 'creator',
    frequency: 'monthly', description: 'The most impactful AI executives ranked by company growth, product launches, market influence, and strategic vision.',
    max_entries: 15, scoring_weights: { company_growth: 0.30, product_impact: 0.25, market_influence: 0.20, strategic_vision: 0.15, public_profile: 0.10 }, is_featured: false,
  },
  {
    name: 'Top AI Scientists', slug: 'top-scientists', category: 'power_list', entity_type: 'creator',
    frequency: 'quarterly', description: 'The most influential AI researchers by breakthroughs, citations, and real-world impact of their work.',
    max_entries: 15, scoring_weights: { breakthroughs: 0.30, citations: 0.25, real_world_impact: 0.25, mentorship: 0.10, public_engagement: 0.10 }, is_featured: false,
  },
  {
    name: 'Top AI Teams', slug: 'top-teams', category: 'power_list', entity_type: 'lab',
    frequency: 'quarterly', description: 'The strongest AI research and engineering teams ranked by talent density, output, and breakthroughs.',
    max_entries: 12, scoring_weights: { talent_density: 0.25, research_output: 0.25, product_shipping: 0.25, retention: 0.15, diversity: 0.10 }, is_featured: false,
  },
  {
    name: 'Top AI Communities', slug: 'top-communities', category: 'genre', entity_type: 'startup',
    frequency: 'monthly', description: 'The most active and influential AI communities, forums, newsletters, and podcasts.',
    max_entries: 10, scoring_weights: { members: 0.25, engagement: 0.25, influence: 0.20, growth: 0.20, content_quality: 0.10 }, is_featured: false,
  },
  {
    name: 'Top AI Campaigns', slug: 'top-campaigns', category: 'industry', entity_type: 'lab',
    frequency: 'quarterly', description: 'The best AI marketing campaigns, product launches, and brand strategies. Who is winning the narrative war.',
    max_entries: 12, scoring_weights: { reach: 0.25, creativity: 0.20, conversion: 0.20, brand_impact: 0.20, virality: 0.15 }, is_featured: false,
  },
];

// ── CEO SCORES ──────────────────────────────────────────────────────────
export const ceoScores: ScoredRanking[] = [
  { slug: 'jensen-huang', composite: 97.5, scores: { company_growth: 99, product_impact: 95, market_influence: 98, strategic_vision: 99, public_profile: 92 }, history: [96.8, 97.0, 97.2, 97.5] },
  { slug: 'sam-altman', composite: 95.2, scores: { company_growth: 95, product_impact: 98, market_influence: 99, strategic_vision: 88, public_profile: 98 }, history: [94.5, 94.8, 95.0, 95.2] },
  { slug: 'dario-amodei', composite: 91.8, scores: { company_growth: 92, product_impact: 95, market_influence: 85, strategic_vision: 95, public_profile: 78 }, history: [88.0, 89.5, 90.8, 91.8] },
  { slug: 'satya-nadella', composite: 90.5, scores: { company_growth: 88, product_impact: 90, market_influence: 95, strategic_vision: 92, public_profile: 85 }, history: [90.0, 90.2, 90.3, 90.5] },
  { slug: 'mark-zuckerberg', composite: 88.3, scores: { company_growth: 85, product_impact: 88, market_influence: 90, strategic_vision: 92, public_profile: 82 }, history: [85.5, 86.8, 87.5, 88.3] },
  { slug: 'sundar-pichai', composite: 86.1, scores: { company_growth: 82, product_impact: 85, market_influence: 92, strategic_vision: 80, public_profile: 88 }, history: [86.5, 86.3, 86.2, 86.1] },
  { slug: 'demis-hassabis', composite: 85.4, scores: { company_growth: 78, product_impact: 92, market_influence: 82, strategic_vision: 95, public_profile: 72 }, history: [82.0, 83.5, 84.5, 85.4] },
  { slug: 'alexandr-wang', composite: 82.7, scores: { company_growth: 90, product_impact: 78, market_influence: 75, strategic_vision: 85, public_profile: 72 }, history: [79.5, 80.8, 81.8, 82.7] },
  { slug: 'aravind-srinivas', composite: 81.3, scores: { company_growth: 92, product_impact: 82, market_influence: 72, strategic_vision: 78, public_profile: 75 }, history: [76.0, 78.0, 79.8, 81.3] },
  { slug: 'emad-mostaque', composite: 68.5, scores: { company_growth: 45, product_impact: 70, market_influence: 78, strategic_vision: 72, public_profile: 80 }, history: [72.0, 70.5, 69.5, 68.5] },
];

// ── SCIENTIST SCORES ────────────────────────────────────────────────────
export const scientistScores: ScoredRanking[] = [
  { slug: 'geoffrey-hinton', composite: 98.2, scores: { breakthroughs: 99, citations: 99, real_world_impact: 98, mentorship: 95, public_engagement: 88 }, history: [97.8, 98.0, 98.1, 98.2] },
  { slug: 'yann-lecun', composite: 96.5, scores: { breakthroughs: 98, citations: 98, real_world_impact: 95, mentorship: 90, public_engagement: 92 }, history: [96.0, 96.2, 96.3, 96.5] },
  { slug: 'fei-fei-li', composite: 94.8, scores: { breakthroughs: 95, citations: 95, real_world_impact: 98, mentorship: 92, public_engagement: 78 }, history: [93.5, 94.0, 94.4, 94.8] },
  { slug: 'ilya-sutskever', composite: 93.1, scores: { breakthroughs: 98, citations: 92, real_world_impact: 95, mentorship: 82, public_engagement: 72 }, history: [92.0, 92.5, 92.8, 93.1] },
  { slug: 'demis-hassabis', composite: 92.4, scores: { breakthroughs: 96, citations: 88, real_world_impact: 95, mentorship: 85, public_engagement: 82 }, history: [90.5, 91.2, 91.8, 92.4] },
  { slug: 'francois-chollet', composite: 88.6, scores: { breakthroughs: 90, citations: 85, real_world_impact: 92, mentorship: 80, public_engagement: 85 }, history: [87.5, 88.0, 88.3, 88.6] },
  { slug: 'andrew-ng', composite: 87.3, scores: { breakthroughs: 82, citations: 88, real_world_impact: 85, mentorship: 99, public_engagement: 92 }, history: [86.8, 87.0, 87.1, 87.3] },
  { slug: 'andrej-karpathy', composite: 86.1, scores: { breakthroughs: 85, citations: 82, real_world_impact: 88, mentorship: 88, public_engagement: 95 }, history: [85.5, 85.8, 85.9, 86.1] },
  { slug: 'timnit-gebru', composite: 83.4, scores: { breakthroughs: 78, citations: 80, real_world_impact: 88, mentorship: 85, public_engagement: 90 }, history: [82.0, 82.8, 83.1, 83.4] },
  { slug: 'joy-buolamwini', composite: 81.2, scores: { breakthroughs: 72, citations: 75, real_world_impact: 92, mentorship: 78, public_engagement: 95 }, history: [80.0, 80.5, 80.8, 81.2] },
  { slug: 'jim-fan', composite: 79.8, scores: { breakthroughs: 82, citations: 72, real_world_impact: 78, mentorship: 70, public_engagement: 92 }, history: [77.0, 78.0, 79.0, 79.8] },
  { slug: 'jeremy-howard', composite: 78.5, scores: { breakthroughs: 85, citations: 78, real_world_impact: 80, mentorship: 95, public_engagement: 55 }, history: [78.0, 78.2, 78.3, 78.5] },
];

// ── TEAM SCORES (using lab slugs) ───────────────────────────────────────
export const teamScores: ScoredRanking[] = [
  { slug: 'anthropic', composite: 95.8, scores: { talent_density: 98, research_output: 95, product_shipping: 95, retention: 92, diversity: 78 }, history: [92.0, 93.5, 94.8, 95.8] },
  { slug: 'openai', composite: 93.2, scores: { talent_density: 95, research_output: 92, product_shipping: 98, retention: 72, diversity: 75 }, history: [94.0, 93.8, 93.5, 93.2] },
  { slug: 'google-deepmind', composite: 92.5, scores: { talent_density: 98, research_output: 98, product_shipping: 82, retention: 88, diversity: 80 }, history: [92.0, 92.2, 92.3, 92.5] },
  { slug: 'meta-ai', composite: 88.1, scores: { talent_density: 90, research_output: 92, product_shipping: 85, retention: 78, diversity: 82 }, history: [86.5, 87.0, 87.6, 88.1] },
  { slug: 'deepseek', composite: 86.4, scores: { talent_density: 92, research_output: 90, product_shipping: 88, retention: 80, diversity: 55 }, history: [78.0, 81.0, 84.0, 86.4] },
  { slug: 'nvidia', composite: 85.2, scores: { talent_density: 88, research_output: 82, product_shipping: 92, retention: 85, diversity: 70 }, history: [84.5, 84.8, 85.0, 85.2] },
  { slug: 'mistral', composite: 83.7, scores: { talent_density: 92, research_output: 85, product_shipping: 82, retention: 78, diversity: 65 }, history: [80.0, 81.5, 82.8, 83.7] },
  { slug: 'xai', composite: 81.5, scores: { talent_density: 88, research_output: 78, product_shipping: 85, retention: 72, diversity: 55 }, history: [78.0, 79.5, 80.5, 81.5] },
  { slug: 'perplexity', composite: 79.8, scores: { talent_density: 82, research_output: 72, product_shipping: 90, retention: 78, diversity: 68 }, history: [76.0, 77.5, 78.8, 79.8] },
  { slug: 'cognition', composite: 77.3, scores: { talent_density: 85, research_output: 70, product_shipping: 78, retention: 75, diversity: 60 }, history: [72.0, 74.0, 76.0, 77.3] },
];

// ── COMMUNITY SCORES ────────────────────────────────────────────────────
export const communityScores: ScoredRanking[] = [
  { slug: 'r-machinelearning', composite: 94.2, scores: { members: 95, engagement: 88, influence: 98, growth: 82, content_quality: 95 }, history: [93.5, 93.8, 94.0, 94.2] },
  { slug: 'midjourney-discord', composite: 92.8, scores: { members: 99, engagement: 95, influence: 90, growth: 85, content_quality: 78 }, history: [91.5, 92.0, 92.4, 92.8] },
  { slug: 'r-localllama', composite: 90.5, scores: { members: 82, engagement: 95, influence: 92, growth: 95, content_quality: 88 }, history: [86.0, 88.0, 89.5, 90.5] },
  { slug: 'ai-twitter', composite: 89.1, scores: { members: 98, engagement: 92, influence: 99, growth: 72, content_quality: 70 }, history: [88.5, 88.8, 89.0, 89.1] },
  { slug: 'tldr-ai', composite: 87.3, scores: { members: 92, engagement: 82, influence: 85, growth: 88, content_quality: 85 }, history: [85.0, 86.0, 86.8, 87.3] },
  { slug: 'hf-community', composite: 85.6, scores: { members: 78, engagement: 85, influence: 90, growth: 82, content_quality: 92 }, history: [84.0, 84.8, 85.2, 85.6] },
  { slug: 'neurips', composite: 84.2, scores: { members: 75, engagement: 80, influence: 98, growth: 70, content_quality: 98 }, history: [84.0, 84.1, 84.1, 84.2] },
  { slug: 'the-neuron', composite: 82.8, scores: { members: 82, engagement: 78, influence: 75, growth: 92, content_quality: 80 }, history: [79.5, 80.8, 81.8, 82.8] },
  { slug: 'latent-space-pod', composite: 80.5, scores: { members: 55, engagement: 85, influence: 88, growth: 82, content_quality: 95 }, history: [77.0, 78.5, 79.5, 80.5] },
  { slug: 'ai-engineer-summit', composite: 78.9, scores: { members: 52, engagement: 82, influence: 85, growth: 88, content_quality: 90 }, history: [74.5, 76.0, 77.5, 78.9] },
];

// ── CAMPAIGN SCORES ─────────────────────────────────────────────────────
export const campaignScores: ScoredRanking[] = [
  { slug: 'openai', composite: 96.5, scores: { reach: 99, creativity: 90, conversion: 95, brand_impact: 98, virality: 95 }, history: [95.5, 96.0, 96.2, 96.5] },
  { slug: 'anthropic', composite: 91.2, scores: { reach: 78, creativity: 92, conversion: 90, brand_impact: 95, virality: 82 }, history: [86.0, 88.0, 89.8, 91.2] },
  { slug: 'deepseek', composite: 89.8, scores: { reach: 92, creativity: 75, conversion: 85, brand_impact: 92, virality: 99 }, history: [60.0, 70.0, 80.0, 89.8] },
  { slug: 'meta-ai', composite: 87.5, scores: { reach: 95, creativity: 82, conversion: 78, brand_impact: 90, virality: 85 }, history: [84.0, 85.5, 86.5, 87.5] },
  { slug: 'cursor', composite: 85.3, scores: { reach: 72, creativity: 88, conversion: 95, brand_impact: 82, virality: 88 }, history: [78.0, 80.5, 83.0, 85.3] },
  { slug: 'midjourney-app', composite: 83.8, scores: { reach: 85, creativity: 95, conversion: 78, brand_impact: 80, virality: 80 }, history: [83.0, 83.3, 83.5, 83.8] },
  { slug: 'perplexity-app', composite: 82.1, scores: { reach: 75, creativity: 80, conversion: 88, brand_impact: 78, virality: 82 }, history: [78.5, 79.8, 81.0, 82.1] },
  { slug: 'claude-code', composite: 80.5, scores: { reach: 55, creativity: 82, conversion: 92, brand_impact: 85, virality: 90 }, history: [65.0, 72.0, 76.5, 80.5] },
  { slug: 'google-deepmind', composite: 78.9, scores: { reach: 90, creativity: 72, conversion: 68, brand_impact: 82, virality: 72 }, history: [79.5, 79.2, 79.0, 78.9] },
  { slug: 'suno', composite: 76.3, scores: { reach: 72, creativity: 88, conversion: 72, brand_impact: 68, virality: 78 }, history: [70.0, 72.5, 74.5, 76.3] },
  { slug: 'elevenlabs', composite: 74.8, scores: { reach: 65, creativity: 78, conversion: 80, brand_impact: 72, virality: 75 }, history: [71.0, 72.5, 73.8, 74.8] },
  { slug: 'chatgpt', composite: 73.5, scores: { reach: 98, creativity: 55, conversion: 72, brand_impact: 75, virality: 60 }, history: [78.0, 76.5, 75.0, 73.5] },
];

// Campaign editorial notes
export const campaignNotes: Record<string, string> = {
  'openai': 'ChatGPT\'s launch remains the most successful product launch in tech history. 100M users in 2 months. Every subsequent launch (GPT-4, Sora, o1) generates mainstream media coverage.',
  'anthropic': '"Machines of Loving Grace" essay was the most-read AI thought piece of 2024. Claude\'s brand strategy — safety + capability — is winning developer trust without paid advertising.',
  'deepseek': 'Zero marketing budget. R1\'s release crashed Nvidia\'s stock by $600B in one day. Open-source as guerrilla marketing. The most impactful "non-campaign" in AI history.',
  'meta-ai': 'Llama open-source strategy = the most effective long-term brand play. Every download is a Meta ad. Zuckerberg\'s personal brand pivot to "open-source champion" was masterful.',
  'cursor': 'Word-of-mouth only. No ads, no influencer deals. Cursor grew to 2M developers and $9B valuation purely through product quality. The anti-marketing marketing.',
  'claude-code': 'Launched as a CLI in a world of GUIs. Grew through developer Twitter/X. "Vibe coding" became a meme. Organic virality through actual productivity gains.',
  'suno': 'TikTok-native growth. Users share AI-generated songs as content. Every shared song is a Suno ad. 12M users from pure social virality.',
};
