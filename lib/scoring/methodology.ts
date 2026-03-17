/**
 * THE VISIO INDEX — Scoring Methodology
 *
 * HONEST DECLARATION: Our current scores are editorial estimates
 * based on observable signals, not automated data pipelines.
 * This file documents exactly what each score means, what signals
 * inform it, and what the roadmap to fully automated scoring looks like.
 *
 * Phase 1 (current): Editorial scoring — human-assessed based on
 * real data points (funding, users, benchmarks, social presence).
 * Phase 2 (next): Semi-automated — real data feeds normalize and
 * constrain editorial judgment.
 * Phase 3 (target): Fully automated — API-fed data pipelines
 * producing scores with human editorial overlay.
 */

// ── WHAT EACH DIMENSION MEASURES ────────────────────────────────────────

export interface DimensionDefinition {
  name: string;
  weight: number;
  description: string;
  what_we_measure: string[];
  data_sources_current: string[];    // What we actually use today
  data_sources_planned: string[];    // What we'll automate in Phase 2/3
  scoring_guide: string;             // How 0-100 maps to reality
}

export const labDimensions: DimensionDefinition[] = [
  {
    name: 'performance',
    weight: 0.25,
    description: 'Model capability across benchmarks and real-world tasks.',
    what_we_measure: [
      'LMSYS Arena Elo ranking (most trusted human-preference signal)',
      'SWE-Bench Verified scores (real-world coding capability)',
      'MMLU-Pro scores (broad knowledge)',
      'ARC-AGI-2 (novel reasoning, not pattern matching)',
      'Number of frontier models in top-20 Arena leaderboard',
    ],
    data_sources_current: [
      'LMSYS Arena leaderboard (arena.ai) — manually checked weekly',
      'SWE-Bench Verified (llm-stats.com) — manually checked',
      'Artificial Analysis evaluations — manually reviewed',
    ],
    data_sources_planned: [
      'LMSYS Arena API (automated weekly pull)',
      'SWE-Bench Pro leaderboard API',
      'HuggingFace Open LLM Leaderboard API',
      'LiveBench API (continuously refreshed problems)',
    ],
    scoring_guide: '90-100: Multiple models in Arena top 5. 70-89: Top-20 Arena, strong benchmarks. 50-69: Competitive but not frontier. Below 50: Not a frontier lab.',
  },
  {
    name: 'adoption',
    weight: 0.25,
    description: 'How widely the lab\'s products are actually used.',
    what_we_measure: [
      'Monthly/weekly active users (MAU/WAU) of consumer products',
      'API call volume or developer adoption signals',
      'Enterprise customer count and Fortune 500 penetration',
      'SDK/library downloads and GitHub integration stats',
      'Revenue as a proxy for paid adoption',
    ],
    data_sources_current: [
      'Company press releases and earnings (verified user counts)',
      'SimilarWeb/Semrush for web traffic estimates',
      'GitHub star counts for open-source projects',
      'News reports with verified numbers (TechCrunch, Bloomberg)',
    ],
    data_sources_planned: [
      'SimilarWeb API (monthly traffic)',
      'GitHub API (stars, forks, contributors)',
      'npm/PyPI download counts for SDKs',
      'App Store ranking tracking',
    ],
    scoring_guide: '90-100: 100M+ users or $1B+ ARR. 70-89: 10M+ users or $100M+ ARR. 50-69: 1M+ users. Below 50: Early stage.',
  },
  {
    name: 'investment',
    weight: 0.20,
    description: 'Financial backing, valuation trajectory, and revenue growth.',
    what_we_measure: [
      'Total funding raised',
      'Latest valuation',
      'Revenue/ARR and growth rate',
      'Investor quality (tier 1 VCs, strategic investors)',
      'IPO readiness signals',
    ],
    data_sources_current: [
      'Crunchbase / PitchBook (verified funding rounds)',
      'Sacra revenue estimates',
      'Bloomberg/TechCrunch funding reports',
      'SEC filings for public companies',
    ],
    data_sources_planned: [
      'Crunchbase API (automated)',
      'PitchBook data feeds',
      'SEC EDGAR API for public filings',
    ],
    scoring_guide: '90-100: $100B+ valuation or $10B+ ARR. 70-89: $10B+ val or $1B+ ARR. 50-69: $1B+ val. Below 50: Pre-Series B.',
  },
  {
    name: 'cultural_impact',
    weight: 0.15,
    description: 'How much the lab shapes public AI discourse and mainstream awareness.',
    what_we_measure: [
      'Mainstream media mentions (non-tech press)',
      'Social media presence and engagement of leadership',
      'Viral moments (product launches that trend globally)',
      'Creator/influencer coverage across YouTube, X, podcasts',
      'Policy influence (Congressional testimony, regulatory engagement)',
    ],
    data_sources_current: [
      'Manual tracking of major media coverage',
      'X follower counts for CEO/lab accounts',
      'YouTube mention tracking via creator content',
      'Policy event tracking (hearings, published responses)',
    ],
    data_sources_planned: [
      'NewsAPI for media mention counting',
      'X/Twitter API for engagement metrics',
      'YouTube Data API for mention tracking',
      'Google Trends API for search interest',
    ],
    scoring_guide: '90-100: Household name. Everyone knows it. 70-89: Tech-mainstream crossover. 50-69: Known in tech circles. Below 50: Niche/specialist.',
  },
  {
    name: 'innovation',
    weight: 0.15,
    description: 'Research output, architectural breakthroughs, and open-source contributions.',
    what_we_measure: [
      'Published papers at top conferences (NeurIPS, ICML, ICLR)',
      'Novel architectures or techniques that others adopt',
      'Open-source model releases and community adoption',
      'Patent filings (where relevant)',
      'Research citations and h-index of lab researchers',
    ],
    data_sources_current: [
      'ArXiv paper counts (manual)',
      'Conference acceptance lists (NeurIPS, ICML)',
      'HuggingFace model download counts',
      'Google Scholar citations for key researchers',
    ],
    data_sources_planned: [
      'Semantic Scholar API (paper counts, citations)',
      'ArXiv API (daily paper tracking)',
      'HuggingFace API (model downloads)',
      'GitHub API (open-source contributions)',
    ],
    scoring_guide: '90-100: Defining the field. Papers that change everything. 70-89: Regular top-conference publications. 50-69: Some notable contributions. Below 50: Primarily consumers of others\' research.',
  },
];

// ── SCORE INTEGRITY NOTES ───────────────────────────────────────────────

export const scoringIntegrity = {
  current_status: 'editorial' as const,
  description: 'All Visio Index scores are currently editorial estimates produced by the Visio Research Labs team. Each score is informed by real, verifiable data points (listed above) but is not automatically computed from data feeds.',
  what_this_means: [
    'Scores are human judgments, not algorithmic outputs',
    'Every score can be challenged — we publish what informs each one',
    'Scores update weekly based on new data and events',
    'We track and publish our data sources for each dimension',
    'We acknowledge uncertainty rather than false precision',
  ],
  roadmap: [
    { phase: 1, status: 'current', name: 'Editorial Scoring', desc: 'Human-assessed scores based on real data points. Published methodology. Weekly updates.' },
    { phase: 2, status: 'planned', name: 'Semi-Automated', desc: 'API data feeds normalize and constrain editorial judgment. Automated data collection, human scoring overlay.' },
    { phase: 3, status: 'future', name: 'Fully Automated', desc: 'Real-time data pipelines produce scores automatically. Human editorial for narrative and edge cases only.' },
  ],
  honesty_pledge: 'The Visio Index will always be transparent about how scores are produced. We will never present editorial estimates as algorithmic outputs, and we will always publish our data sources and methodology.',
};

// ── PER-CHART SCORING DETAILS ───────────────────────────────────────────

export interface ChartMethodology {
  chart_slug: string;
  chart_name: string;
  dimensions: { name: string; weight: number; measures: string }[];
  data_quality: 'high' | 'medium' | 'low';
  data_quality_note: string;
}

export const chartMethodologies: ChartMethodology[] = [
  {
    chart_slug: 'top-labs',
    chart_name: 'Top Labs',
    dimensions: [
      { name: 'Performance', weight: 25, measures: 'Arena Elo, SWE-Bench, MMLU-Pro, ARC-AGI-2' },
      { name: 'Adoption', weight: 25, measures: 'WAU/MAU, ARR, enterprise customers, downloads' },
      { name: 'Investment', weight: 20, measures: 'Valuation, funding, revenue growth rate' },
      { name: 'Cultural Impact', weight: 15, measures: 'Media mentions, viral moments, policy influence' },
      { name: 'Innovation', weight: 15, measures: 'Papers, open-source, architectural breakthroughs' },
    ],
    data_quality: 'high',
    data_quality_note: 'Lab scores are informed by verified funding rounds, published benchmarks, and confirmed user metrics. Cultural impact and innovation are more subjective.',
  },
  {
    chart_slug: 'top-models',
    chart_name: 'Top Models',
    dimensions: [
      { name: 'Benchmarks', weight: 30, measures: 'LMSYS Arena Elo, SWE-Bench, MMLU-Pro, HumanEval, ARC-AGI-2' },
      { name: 'Adoption', weight: 25, measures: 'API call volume, SDK downloads, integrations' },
      { name: 'Developer Sentiment', weight: 20, measures: 'GitHub mentions, Reddit/X discussions, developer surveys' },
      { name: 'Efficiency', weight: 15, measures: 'Tokens/sec, cost per million tokens, context window' },
      { name: 'Buzz', weight: 10, measures: 'Social mentions, creator coverage, trending' },
    ],
    data_quality: 'high',
    data_quality_note: 'Model benchmark scores are verifiable from public leaderboards. Adoption and sentiment are estimated from observable signals.',
  },
  {
    chart_slug: 'top-tools',
    chart_name: 'Top Tools',
    dimensions: [
      { name: 'Usage', weight: 30, measures: 'MAU/WAU/DAU, paying subscribers, page views' },
      { name: 'Growth', weight: 25, measures: 'MoM/YoY user growth, revenue trajectory' },
      { name: 'Features', weight: 20, measures: 'Capability breadth, unique features, integrations' },
      { name: 'Developer Love', weight: 15, measures: 'NPS, app store reviews, community sentiment' },
      { name: 'Buzz', weight: 10, measures: 'Social mentions, creator coverage' },
    ],
    data_quality: 'medium',
    data_quality_note: 'Some tools publish user/revenue metrics (ChatGPT, Cursor, Midjourney). Others are estimated from traffic data and app store rankings.',
  },
  {
    chart_slug: 'top-creators',
    chart_name: 'Top Creators',
    dimensions: [
      { name: 'Reach', weight: 30, measures: 'YouTube subs, X followers, LinkedIn, newsletter subs' },
      { name: 'Engagement', weight: 25, measures: 'Views/follower ratio, comments, shares, open rates' },
      { name: 'Quality', weight: 20, measures: 'Depth of analysis, accuracy, production value' },
      { name: 'Influence', weight: 15, measures: 'Cited by peers, media appearances, policy impact' },
      { name: 'Consistency', weight: 10, measures: 'Posting frequency, longevity, streak' },
    ],
    data_quality: 'medium',
    data_quality_note: 'Follower counts are verifiable. Engagement and quality are editorial assessments. Influence is estimated from observable citations.',
  },
];
