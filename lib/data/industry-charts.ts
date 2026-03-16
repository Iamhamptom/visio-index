import type { ScoredRanking } from './seed';
import type { Chart } from '@/lib/supabase/types';

/**
 * INDUSTRY CHARTS — AI in Healthcare, Finance, Music, and Agent platforms.
 * These are the charts that connect AI to every sector of the economy.
 */

export const industryChartDefs: Omit<Chart, 'id' | 'created_at'>[] = [
  {
    name: 'AI in Healthcare', slug: 'ai-healthcare', category: 'industry', entity_type: 'lab',
    frequency: 'monthly', description: 'AI companies transforming diagnostics, drug discovery, clinical workflows, and patient care.',
    max_entries: 10, scoring_weights: { clinical_impact: 0.30, adoption: 0.25, research: 0.20, regulatory: 0.15, funding: 0.10 }, is_featured: false,
  },
  {
    name: 'AI in Finance', slug: 'ai-finance', category: 'industry', entity_type: 'lab',
    frequency: 'monthly', description: 'AI reshaping trading, banking, insurance, payments, and financial analysis.',
    max_entries: 10, scoring_weights: { market_impact: 0.25, adoption: 0.25, technology: 0.20, revenue: 0.20, innovation: 0.10 }, is_featured: false,
  },
  {
    name: 'AI in Music', slug: 'ai-music', category: 'industry', entity_type: 'tool',
    frequency: 'monthly', description: 'AI tools for music creation, production, distribution, and discovery. The most culturally disruptive AI category.',
    max_entries: 8, scoring_weights: { output_quality: 0.25, adoption: 0.25, cultural_impact: 0.25, innovation: 0.15, accessibility: 0.10 }, is_featured: false,
  },
  {
    name: 'Top AI Agents', slug: 'top-agents', category: 'genre', entity_type: 'tool',
    frequency: 'weekly', description: 'Autonomous AI agents that can plan, execute, and complete tasks. The next frontier of AI.',
    max_entries: 10, scoring_weights: { capability: 0.30, reliability: 0.25, adoption: 0.20, versatility: 0.15, developer_experience: 0.10 }, is_featured: false,
  },
  {
    name: 'AI Hardware', slug: 'ai-hardware', category: 'industry', entity_type: 'lab',
    frequency: 'quarterly', description: 'The chips, GPUs, and infrastructure powering AI. The physical layer of intelligence.',
    max_entries: 10, scoring_weights: { performance: 0.30, market_share: 0.25, innovation: 0.20, ecosystem: 0.15, efficiency: 0.10 }, is_featured: false,
  },
];

// ── AI IN HEALTHCARE SCORES ─────────────────────────────────────────────
export const healthcareScores: ScoredRanking[] = [
  { slug: 'google-deepmind', composite: 94.5, scores: { clinical_impact: 92, adoption: 90, research: 99, regulatory: 88, funding: 95 }, history: [93.0, 93.5, 94.0, 94.5] },
  { slug: 'hippocratic-ai', composite: 88.2, scores: { clinical_impact: 92, adoption: 85, research: 78, regulatory: 82, funding: 90 }, history: [82.0, 84.5, 86.5, 88.2] },
  { slug: 'openai', composite: 85.8, scores: { clinical_impact: 78, adoption: 95, research: 85, regulatory: 72, funding: 98 }, history: [83.0, 84.0, 85.0, 85.8] },
  { slug: 'nvidia', composite: 82.3, scores: { clinical_impact: 70, adoption: 88, research: 82, regulatory: 75, funding: 95 }, history: [81.0, 81.5, 82.0, 82.3] },
  { slug: 'anthropic', composite: 79.5, scores: { clinical_impact: 72, adoption: 78, research: 88, regulatory: 82, funding: 85 }, history: [76.0, 77.5, 78.5, 79.5] },
];

// ── AI IN FINANCE SCORES ────────────────────────────────────────────────
export const financeScores: ScoredRanking[] = [
  { slug: 'databricks', composite: 91.8, scores: { market_impact: 90, adoption: 95, technology: 92, revenue: 95, innovation: 82 }, history: [89.5, 90.2, 91.0, 91.8] },
  { slug: 'scale-ai', composite: 86.5, scores: { market_impact: 82, adoption: 85, technology: 88, revenue: 90, innovation: 80 }, history: [84.0, 85.0, 85.8, 86.5] },
  { slug: 'harvey-ai', composite: 84.2, scores: { market_impact: 85, adoption: 78, technology: 85, revenue: 82, innovation: 88 }, history: [78.0, 80.5, 82.5, 84.2] },
  { slug: 'glean', composite: 82.8, scores: { market_impact: 80, adoption: 88, technology: 82, revenue: 85, innovation: 72 }, history: [79.0, 80.5, 81.8, 82.8] },
  { slug: 'openai', composite: 80.5, scores: { market_impact: 88, adoption: 82, technology: 78, revenue: 75, innovation: 78 }, history: [78.0, 79.0, 79.8, 80.5] },
];

// ── AI IN MUSIC SCORES ──────────────────────────────────────────────────
export const musicScores: ScoredRanking[] = [
  { slug: 'suno', composite: 93.5, scores: { output_quality: 82, adoption: 95, cultural_impact: 98, innovation: 92, accessibility: 95 }, history: [88.0, 90.0, 92.0, 93.5] },
  { slug: 'elevenlabs', composite: 88.2, scores: { output_quality: 95, adoption: 85, cultural_impact: 82, innovation: 88, accessibility: 78 }, history: [85.0, 86.5, 87.5, 88.2] },
  { slug: 'midjourney-app', composite: 78.5, scores: { output_quality: 92, adoption: 78, cultural_impact: 72, innovation: 70, accessibility: 65 }, history: [76.0, 77.0, 78.0, 78.5] },
  { slug: 'canva-ai', composite: 72.3, scores: { output_quality: 55, adoption: 92, cultural_impact: 65, innovation: 60, accessibility: 95 }, history: [70.0, 71.0, 71.8, 72.3] },
];

// ── TOP AI AGENTS SCORES ────────────────────────────────────────────────
export const agentScores: ScoredRanking[] = [
  { slug: 'claude-code', composite: 94.8, scores: { capability: 96, reliability: 92, adoption: 88, versatility: 95, developer_experience: 95 }, history: [88.0, 90.5, 93.0, 94.8] },
  { slug: 'devin', composite: 85.2, scores: { capability: 90, reliability: 72, adoption: 78, versatility: 85, developer_experience: 82 }, history: [82.0, 83.5, 84.5, 85.2] },
  { slug: 'codex-cli', composite: 83.5, scores: { capability: 85, reliability: 78, adoption: 72, versatility: 88, developer_experience: 90 }, history: [0, 0, 72.0, 83.5] },
  { slug: 'cursor', composite: 82.8, scores: { capability: 88, reliability: 85, adoption: 92, versatility: 72, developer_experience: 78 }, history: [80.0, 81.0, 82.0, 82.8] },
  { slug: 'replit-agent', composite: 78.1, scores: { capability: 75, reliability: 72, adoption: 82, versatility: 78, developer_experience: 85 }, history: [75.0, 76.0, 77.2, 78.1] },
  { slug: 'bolt', composite: 76.5, scores: { capability: 72, reliability: 70, adoption: 80, versatility: 75, developer_experience: 88 }, history: [73.0, 74.5, 75.5, 76.5] },
  { slug: 'windsurf', composite: 75.2, scores: { capability: 78, reliability: 72, adoption: 68, versatility: 75, developer_experience: 82 }, history: [71.0, 72.8, 74.0, 75.2] },
  { slug: 'lovable', composite: 73.8, scores: { capability: 70, reliability: 68, adoption: 72, versatility: 78, developer_experience: 85 }, history: [69.0, 71.0, 72.5, 73.8] },
  { slug: 'zapier-ai', composite: 72.1, scores: { capability: 65, reliability: 82, adoption: 85, versatility: 68, developer_experience: 58 }, history: [70.0, 70.8, 71.5, 72.1] },
  { slug: 'lindy-ai', composite: 70.5, scores: { capability: 72, reliability: 65, adoption: 55, versatility: 80, developer_experience: 75 }, history: [66.0, 68.0, 69.5, 70.5] },
];

// ── AI HARDWARE SCORES ──────────────────────────────────────────────────
export const hardwareScores: ScoredRanking[] = [
  { slug: 'nvidia', composite: 97.8, scores: { performance: 98, market_share: 99, innovation: 95, ecosystem: 98, efficiency: 82 }, history: [97.2, 97.4, 97.6, 97.8] },
  { slug: 'cerebras', composite: 82.5, scores: { performance: 92, market_share: 45, innovation: 95, ecosystem: 55, efficiency: 88 }, history: [78.0, 79.5, 81.0, 82.5] },
  { slug: 'groq', composite: 80.8, scores: { performance: 95, market_share: 40, innovation: 90, ecosystem: 52, efficiency: 95 }, history: [75.0, 77.0, 79.0, 80.8] },
  { slug: 'coreweave', composite: 79.2, scores: { performance: 82, market_share: 72, innovation: 70, ecosystem: 85, efficiency: 78 }, history: [74.0, 76.0, 77.8, 79.2] },
  { slug: 'together-ai', composite: 76.5, scores: { performance: 78, market_share: 55, innovation: 82, ecosystem: 80, efficiency: 85 }, history: [72.0, 73.8, 75.2, 76.5] },
  { slug: 'lambda', composite: 74.8, scores: { performance: 75, market_share: 58, innovation: 72, ecosystem: 78, efficiency: 80 }, history: [72.0, 73.0, 74.0, 74.8] },
];
