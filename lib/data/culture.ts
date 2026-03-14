/**
 * THE VISIO INDEX — Cultural Intelligence Layer
 *
 * What no other AI ranking tracks:
 * - Ethics & moral alignment across worldviews
 * - Generational adoption patterns
 * - Cultural impact beyond buzz
 * - Who AI is actually affecting
 * - Regional sentiment differences
 */

// ── ETHICS & MORAL CODES ────────────────────────────────────────────────
// Scored 0-100 per dimension. These aren't opinions — they're observable
// signals: published policies, audits, incidents, open-source contributions,
// accessibility features, documented safety practices.

export interface EthicsProfile {
  slug: string;
  transparency: number;      // Open about capabilities, limitations, training data
  safety_commitment: number;  // Published safety research, red-teaming, alignment work
  data_privacy: number;       // User data handling, opt-out options, GDPR compliance
  openness: number;           // Open-source/weight contributions, research sharing
  accessibility: number;      // Free tiers, multilingual, disability support, global access
  bias_mitigation: number;    // Documented fairness work, bias audits, diverse training
  accountability: number;     // Incident response, responsible disclosure, governance
  composite: number;
}

export const ethicsProfiles: EthicsProfile[] = [
  // Labs
  { slug: 'openai', transparency: 45, safety_commitment: 70, data_privacy: 60, openness: 35, accessibility: 80, bias_mitigation: 65, accountability: 55, composite: 58.6 },
  { slug: 'anthropic', transparency: 82, safety_commitment: 95, data_privacy: 85, openness: 50, accessibility: 70, bias_mitigation: 80, accountability: 88, composite: 78.6 },
  { slug: 'google-deepmind', transparency: 55, safety_commitment: 75, data_privacy: 55, openness: 60, accessibility: 85, bias_mitigation: 70, accountability: 60, composite: 65.7 },
  { slug: 'meta-ai', transparency: 60, safety_commitment: 55, data_privacy: 40, openness: 95, accessibility: 90, bias_mitigation: 60, accountability: 50, composite: 64.3 },
  { slug: 'xai', transparency: 30, safety_commitment: 35, data_privacy: 40, openness: 40, accessibility: 50, bias_mitigation: 30, accountability: 25, composite: 35.7 },
  { slug: 'deepseek', transparency: 70, safety_commitment: 45, data_privacy: 35, openness: 90, accessibility: 85, bias_mitigation: 40, accountability: 35, composite: 57.1 },
  { slug: 'mistral', transparency: 65, safety_commitment: 55, data_privacy: 70, openness: 85, accessibility: 75, bias_mitigation: 55, accountability: 60, composite: 66.4 },
  { slug: 'nvidia', transparency: 50, safety_commitment: 45, data_privacy: 55, openness: 60, accessibility: 40, bias_mitigation: 50, accountability: 55, composite: 50.7 },
  { slug: 'perplexity', transparency: 55, safety_commitment: 40, data_privacy: 50, openness: 30, accessibility: 75, bias_mitigation: 45, accountability: 45, composite: 48.6 },
  { slug: 'hugging-face', transparency: 90, safety_commitment: 70, data_privacy: 75, openness: 98, accessibility: 92, bias_mitigation: 80, accountability: 75, composite: 82.9 },
  { slug: 'stability-ai', transparency: 60, safety_commitment: 40, data_privacy: 50, openness: 88, accessibility: 85, bias_mitigation: 45, accountability: 40, composite: 58.3 },
  { slug: 'cognition', transparency: 35, safety_commitment: 40, data_privacy: 50, openness: 20, accessibility: 30, bias_mitigation: 35, accountability: 30, composite: 34.3 },
  // Tools
  { slug: 'chatgpt', transparency: 50, safety_commitment: 70, data_privacy: 55, openness: 30, accessibility: 85, bias_mitigation: 65, accountability: 55, composite: 58.6 },
  { slug: 'claude-app', transparency: 80, safety_commitment: 92, data_privacy: 85, openness: 45, accessibility: 75, bias_mitigation: 82, accountability: 85, composite: 77.7 },
  { slug: 'cursor', transparency: 55, safety_commitment: 50, data_privacy: 60, openness: 40, accessibility: 65, bias_mitigation: 45, accountability: 50, composite: 52.1 },
  { slug: 'midjourney-app', transparency: 30, safety_commitment: 35, data_privacy: 40, openness: 15, accessibility: 60, bias_mitigation: 35, accountability: 30, composite: 35.0 },
  { slug: 'suno', transparency: 35, safety_commitment: 30, data_privacy: 45, openness: 20, accessibility: 80, bias_mitigation: 30, accountability: 25, composite: 37.9 },
  { slug: 'elevenlabs', transparency: 45, safety_commitment: 50, data_privacy: 55, openness: 30, accessibility: 70, bias_mitigation: 40, accountability: 45, composite: 47.9 },
  // Models
  { slug: 'claude-opus-4-6', transparency: 80, safety_commitment: 95, data_privacy: 85, openness: 45, accessibility: 65, bias_mitigation: 85, accountability: 88, composite: 77.6 },
  { slug: 'gpt-4-5', transparency: 45, safety_commitment: 68, data_privacy: 55, openness: 30, accessibility: 70, bias_mitigation: 62, accountability: 52, composite: 54.6 },
  { slug: 'llama-4-maverick', transparency: 65, safety_commitment: 50, data_privacy: 55, openness: 95, accessibility: 90, bias_mitigation: 55, accountability: 48, composite: 65.4 },
  { slug: 'deepseek-r1', transparency: 70, safety_commitment: 42, data_privacy: 35, openness: 92, accessibility: 88, bias_mitigation: 38, accountability: 32, composite: 56.7 },
  { slug: 'gemini-2-5-pro', transparency: 52, safety_commitment: 72, data_privacy: 50, openness: 55, accessibility: 82, bias_mitigation: 68, accountability: 58, composite: 62.4 },
];

// ── WORLDVIEW ALIGNMENT ─────────────────────────────────────────────────
// How different philosophical/cultural lenses evaluate AI entities.
// These represent composite sentiment from media, policy, and discourse
// within each worldview tradition.

export interface WorldviewRating {
  slug: string;
  western_liberal: number;     // Individual rights, free markets, innovation-first
  european_regulatory: number; // Precautionary principle, regulation, digital sovereignty
  african_ubuntu: number;      // Communal benefit, accessibility, decolonization of tech
  asian_pragmatic: number;     // National competitiveness, practical utility, social harmony
  tech_accelerationist: number; // Speed, capability, AGI race
  safety_alignment: number;     // Existential risk, alignment, careful deployment
  open_source_community: number; // Freedom, transparency, decentralization
  labor_worker: number;         // Job displacement, worker rights, economic impact
}

export const worldviewRatings: WorldviewRating[] = [
  { slug: 'openai', western_liberal: 85, european_regulatory: 45, african_ubuntu: 40, asian_pragmatic: 75, tech_accelerationist: 90, safety_alignment: 55, open_source_community: 20, labor_worker: 30 },
  { slug: 'anthropic', western_liberal: 80, european_regulatory: 78, african_ubuntu: 55, asian_pragmatic: 65, tech_accelerationist: 60, safety_alignment: 95, open_source_community: 40, labor_worker: 55 },
  { slug: 'google-deepmind', western_liberal: 70, european_regulatory: 55, african_ubuntu: 45, asian_pragmatic: 80, tech_accelerationist: 82, safety_alignment: 68, open_source_community: 55, labor_worker: 35 },
  { slug: 'meta-ai', western_liberal: 65, european_regulatory: 40, african_ubuntu: 70, asian_pragmatic: 72, tech_accelerationist: 75, safety_alignment: 45, open_source_community: 92, labor_worker: 45 },
  { slug: 'deepseek', western_liberal: 40, european_regulatory: 30, african_ubuntu: 65, asian_pragmatic: 90, tech_accelerationist: 85, safety_alignment: 35, open_source_community: 88, labor_worker: 50 },
  { slug: 'mistral', western_liberal: 72, european_regulatory: 85, african_ubuntu: 55, asian_pragmatic: 60, tech_accelerationist: 65, safety_alignment: 55, open_source_community: 82, labor_worker: 50 },
  { slug: 'hugging-face', western_liberal: 78, european_regulatory: 80, african_ubuntu: 82, asian_pragmatic: 70, tech_accelerationist: 70, safety_alignment: 72, open_source_community: 98, labor_worker: 65 },
  { slug: 'chatgpt', western_liberal: 82, european_regulatory: 42, african_ubuntu: 55, asian_pragmatic: 78, tech_accelerationist: 88, safety_alignment: 52, open_source_community: 18, labor_worker: 25 },
  { slug: 'claude-app', western_liberal: 78, european_regulatory: 75, african_ubuntu: 58, asian_pragmatic: 62, tech_accelerationist: 55, safety_alignment: 92, open_source_community: 38, labor_worker: 58 },
  { slug: 'cursor', western_liberal: 80, european_regulatory: 60, african_ubuntu: 35, asian_pragmatic: 75, tech_accelerationist: 88, safety_alignment: 45, open_source_community: 50, labor_worker: 20 },
  { slug: 'suno', western_liberal: 60, european_regulatory: 30, african_ubuntu: 55, asian_pragmatic: 65, tech_accelerationist: 78, safety_alignment: 25, open_source_community: 30, labor_worker: 15 },
  { slug: 'midjourney-app', western_liberal: 68, european_regulatory: 35, african_ubuntu: 42, asian_pragmatic: 70, tech_accelerationist: 80, safety_alignment: 30, open_source_community: 12, labor_worker: 18 },
];

// ── GENERATIONAL ADOPTION ───────────────────────────────────────────────
// Estimated adoption rates by generation, normalized to 0-100 scale
// within each entity's user base. Based on survey data, app store
// demographics, and platform analytics.

export interface GenerationalData {
  slug: string;
  gen_z: number;        // Born 1997-2012 (ages 14-29)
  millennial: number;   // Born 1981-1996 (ages 30-45)
  gen_x: number;        // Born 1965-1980 (ages 46-61)
  boomer: number;       // Born 1946-1964 (ages 62-80)
  primary_generation: string;
  adoption_trend: 'growing' | 'stable' | 'shifting';
  notes: string;
}

export const generationalData: GenerationalData[] = [
  { slug: 'chatgpt', gen_z: 92, millennial: 85, gen_x: 55, boomer: 28, primary_generation: 'Gen Z', adoption_trend: 'stable', notes: 'Most universally adopted AI tool across all generations' },
  { slug: 'claude-app', gen_z: 45, millennial: 78, gen_x: 62, boomer: 20, primary_generation: 'Millennial', adoption_trend: 'growing', notes: 'Skews professional — developers, writers, analysts' },
  { slug: 'cursor', gen_z: 72, millennial: 88, gen_x: 35, boomer: 5, primary_generation: 'Millennial', adoption_trend: 'growing', notes: 'Developer tool — peaks in 25-40 age bracket' },
  { slug: 'perplexity-app', gen_z: 55, millennial: 75, gen_x: 60, boomer: 35, primary_generation: 'Millennial', adoption_trend: 'growing', notes: 'Replacing Google for research-heavy users' },
  { slug: 'midjourney-app', gen_z: 80, millennial: 72, gen_x: 30, boomer: 8, primary_generation: 'Gen Z', adoption_trend: 'stable', notes: 'Creative tool — peaks in digital-native generations' },
  { slug: 'claude-code', gen_z: 40, millennial: 82, gen_x: 55, boomer: 8, primary_generation: 'Millennial', adoption_trend: 'growing', notes: 'Senior developer tool — experience correlates with adoption' },
  { slug: 'suno', gen_z: 88, millennial: 55, gen_x: 18, boomer: 5, primary_generation: 'Gen Z', adoption_trend: 'growing', notes: 'Music creation — TikTok generation drives adoption' },
  { slug: 'v0', gen_z: 65, millennial: 78, gen_x: 28, boomer: 3, primary_generation: 'Millennial', adoption_trend: 'growing', notes: 'Frontend developers — peaks in early-career to mid-career' },
  { slug: 'elevenlabs', gen_z: 75, millennial: 65, gen_x: 30, boomer: 10, primary_generation: 'Gen Z', adoption_trend: 'growing', notes: 'Content creators and podcasters drive adoption' },
  { slug: 'gemini-app', gen_z: 60, millennial: 55, gen_x: 65, boomer: 45, primary_generation: 'Gen X', adoption_trend: 'growing', notes: 'Google ecosystem loyalty — older demographics strong' },
  { slug: 'github-copilot', gen_z: 58, millennial: 82, gen_x: 48, boomer: 10, primary_generation: 'Millennial', adoption_trend: 'stable', notes: 'Enterprise developers — established dev workforce' },
  { slug: 'canva-ai', gen_z: 82, millennial: 70, gen_x: 55, boomer: 30, primary_generation: 'Gen Z', adoption_trend: 'stable', notes: 'Design democratization — broadest generational spread' },
  { slug: 'notion-ai', gen_z: 70, millennial: 80, gen_x: 40, boomer: 12, primary_generation: 'Millennial', adoption_trend: 'stable', notes: 'Knowledge workers — startup and tech company skew' },
  { slug: 'bolt', gen_z: 78, millennial: 65, gen_x: 15, boomer: 2, primary_generation: 'Gen Z', adoption_trend: 'growing', notes: 'Vibe coders and non-technical builders' },
  { slug: 'devin', gen_z: 35, millennial: 60, gen_x: 30, boomer: 5, primary_generation: 'Millennial', adoption_trend: 'growing', notes: 'Enterprise engineering teams primarily' },
];

// ── CULTURAL IMPACT ─────────────────────────────────────────────────────
// Deep cultural metrics beyond "buzz" — how AI entities are actually
// changing society, education, creative industries, and discourse.

export interface CulturalImpact {
  slug: string;
  media_influence: number;       // How often cited in mainstream (non-tech) media
  education_disruption: number;  // Impact on schools, universities, learning
  creative_disruption: number;   // Impact on art, music, writing, design industries
  workforce_impact: number;      // Actual job displacement/transformation signals
  public_discourse: number;      // Driving policy debates, public conversation
  meme_culture: number;          // Presence in internet culture, memes, social
  global_reach: number;          // Availability and impact outside US/EU
}

export const culturalImpactData: CulturalImpact[] = [
  { slug: 'chatgpt', media_influence: 98, education_disruption: 95, creative_disruption: 80, workforce_impact: 90, public_discourse: 95, meme_culture: 92, global_reach: 95 },
  { slug: 'claude-app', media_influence: 65, education_disruption: 55, creative_disruption: 45, workforce_impact: 60, public_discourse: 70, meme_culture: 40, global_reach: 60 },
  { slug: 'midjourney-app', media_influence: 75, education_disruption: 40, creative_disruption: 98, workforce_impact: 82, public_discourse: 72, meme_culture: 85, global_reach: 80 },
  { slug: 'suno', media_influence: 55, education_disruption: 30, creative_disruption: 92, workforce_impact: 75, public_discourse: 60, meme_culture: 70, global_reach: 65 },
  { slug: 'cursor', media_influence: 40, education_disruption: 45, creative_disruption: 25, workforce_impact: 78, public_discourse: 35, meme_culture: 55, global_reach: 50 },
  { slug: 'perplexity-app', media_influence: 50, education_disruption: 72, creative_disruption: 20, workforce_impact: 45, public_discourse: 55, meme_culture: 35, global_reach: 60 },
  { slug: 'elevenlabs', media_influence: 55, education_disruption: 30, creative_disruption: 88, workforce_impact: 70, public_discourse: 62, meme_culture: 60, global_reach: 70 },
  { slug: 'claude-code', media_influence: 35, education_disruption: 40, creative_disruption: 20, workforce_impact: 85, public_discourse: 45, meme_culture: 50, global_reach: 40 },
  { slug: 'devin', media_influence: 60, education_disruption: 35, creative_disruption: 15, workforce_impact: 88, public_discourse: 65, meme_culture: 45, global_reach: 30 },
  { slug: 'canva-ai', media_influence: 45, education_disruption: 50, creative_disruption: 72, workforce_impact: 55, public_discourse: 25, meme_culture: 30, global_reach: 88 },
  { slug: 'gemini-app', media_influence: 70, education_disruption: 60, creative_disruption: 40, workforce_impact: 55, public_discourse: 65, meme_culture: 50, global_reach: 90 },
];

// ── AFFECTED SECTORS ────────────────────────────────────────────────────
// Which industries and demographics each entity is most disrupting.

export interface AffectedSector {
  name: string;
  impact_level: 'high' | 'medium' | 'low';
  direction: 'displacing' | 'augmenting' | 'creating';  // destroying jobs, enhancing jobs, creating new jobs
  affected_roles: string[];
}

export interface EntityImpactMap {
  slug: string;
  sectors: AffectedSector[];
  most_affected_demographic: string;
  net_sentiment: 'positive' | 'mixed' | 'negative';
}

export const impactMaps: EntityImpactMap[] = [
  {
    slug: 'chatgpt',
    most_affected_demographic: 'Knowledge workers (25-45)',
    net_sentiment: 'mixed',
    sectors: [
      { name: 'Education', impact_level: 'high', direction: 'displacing', affected_roles: ['Essay graders', 'Tutors', 'Research assistants'] },
      { name: 'Customer Service', impact_level: 'high', direction: 'displacing', affected_roles: ['Chat agents', 'Email support', 'FAQ writers'] },
      { name: 'Content Writing', impact_level: 'high', direction: 'displacing', affected_roles: ['Copywriters', 'Blog writers', 'SEO content'] },
      { name: 'Software Dev', impact_level: 'medium', direction: 'augmenting', affected_roles: ['Junior developers', 'Code reviewers'] },
      { name: 'Legal', impact_level: 'medium', direction: 'augmenting', affected_roles: ['Paralegals', 'Contract reviewers', 'Legal researchers'] },
    ],
  },
  {
    slug: 'midjourney-app',
    most_affected_demographic: 'Creative professionals (20-40)',
    net_sentiment: 'negative',
    sectors: [
      { name: 'Illustration', impact_level: 'high', direction: 'displacing', affected_roles: ['Stock illustrators', 'Concept artists', 'Book cover designers'] },
      { name: 'Photography', impact_level: 'high', direction: 'displacing', affected_roles: ['Stock photographers', 'Product photographers'] },
      { name: 'Advertising', impact_level: 'high', direction: 'augmenting', affected_roles: ['Art directors', 'Creative directors'] },
      { name: 'Game Design', impact_level: 'medium', direction: 'augmenting', affected_roles: ['Environment artists', 'Asset creators'] },
    ],
  },
  {
    slug: 'cursor',
    most_affected_demographic: 'Software developers (22-40)',
    net_sentiment: 'positive',
    sectors: [
      { name: 'Software Dev', impact_level: 'high', direction: 'augmenting', affected_roles: ['All levels — 2-5x productivity gains reported'] },
      { name: 'QA/Testing', impact_level: 'medium', direction: 'augmenting', affected_roles: ['Test writers', 'Bug reporters'] },
      { name: 'DevOps', impact_level: 'low', direction: 'augmenting', affected_roles: ['Config writers', 'Script authors'] },
    ],
  },
  {
    slug: 'suno',
    most_affected_demographic: 'Musicians & producers (18-35)',
    net_sentiment: 'negative',
    sectors: [
      { name: 'Music Production', impact_level: 'high', direction: 'displacing', affected_roles: ['Jingle producers', 'Stock music composers', 'Background music'] },
      { name: 'Songwriting', impact_level: 'medium', direction: 'augmenting', affected_roles: ['Lyricists', 'Melody writers'] },
      { name: 'Music Licensing', impact_level: 'high', direction: 'displacing', affected_roles: ['Library music composers', 'Sync licensors'] },
    ],
  },
  {
    slug: 'devin',
    most_affected_demographic: 'Junior-mid developers (22-30)',
    net_sentiment: 'mixed',
    sectors: [
      { name: 'Software Dev', impact_level: 'high', direction: 'displacing', affected_roles: ['Junior developers', 'Bug fixers', 'Feature implementers'] },
      { name: 'Outsourcing', impact_level: 'high', direction: 'displacing', affected_roles: ['Offshore dev teams', 'Body shops'] },
      { name: 'DevOps', impact_level: 'medium', direction: 'augmenting', affected_roles: ['CI/CD setup', 'Infrastructure'] },
    ],
  },
  {
    slug: 'elevenlabs',
    most_affected_demographic: 'Voice actors & narrators (25-50)',
    net_sentiment: 'negative',
    sectors: [
      { name: 'Voice Acting', impact_level: 'high', direction: 'displacing', affected_roles: ['Audiobook narrators', 'Commercial VO', 'E-learning narrators'] },
      { name: 'Localization', impact_level: 'high', direction: 'displacing', affected_roles: ['Dubbing actors', 'Translation narrators'] },
      { name: 'Podcasting', impact_level: 'medium', direction: 'augmenting', affected_roles: ['Podcast producers', 'Show runners'] },
      { name: 'Accessibility', impact_level: 'medium', direction: 'creating', affected_roles: ['TTS developers', 'Accessibility engineers'] },
    ],
  },
  {
    slug: 'claude-code',
    most_affected_demographic: 'Senior developers (28-45)',
    net_sentiment: 'positive',
    sectors: [
      { name: 'Software Dev', impact_level: 'high', direction: 'augmenting', affected_roles: ['Senior engineers — 3-10x throughput on complex tasks'] },
      { name: 'Architecture', impact_level: 'medium', direction: 'augmenting', affected_roles: ['System designers', 'Tech leads'] },
      { name: 'Consulting', impact_level: 'medium', direction: 'augmenting', affected_roles: ['Tech consultants', 'Code auditors'] },
    ],
  },
  {
    slug: 'perplexity-app',
    most_affected_demographic: 'Researchers & analysts (25-55)',
    net_sentiment: 'positive',
    sectors: [
      { name: 'Journalism', impact_level: 'medium', direction: 'augmenting', affected_roles: ['Researchers', 'Fact-checkers'] },
      { name: 'Education', impact_level: 'medium', direction: 'augmenting', affected_roles: ['Students', 'Academics'] },
      { name: 'SEO/Content', impact_level: 'high', direction: 'displacing', affected_roles: ['SEO writers', 'Content farms'] },
    ],
  },
];

// ── REGIONAL SENTIMENT ──────────────────────────────────────────────────
// How different global regions perceive AI entities. Affects adoption,
// regulation, and cultural reception.

export interface RegionalSentiment {
  slug: string;
  north_america: number;   // US, Canada
  europe: number;          // EU, UK
  east_asia: number;       // China, Japan, Korea
  south_asia: number;      // India
  africa: number;          // Continental
  latin_america: number;   // Brazil, Mexico, etc.
  middle_east: number;     // UAE, Saudi, Israel
}

export const regionalSentiment: RegionalSentiment[] = [
  { slug: 'chatgpt', north_america: 88, europe: 65, east_asia: 50, south_asia: 85, africa: 72, latin_america: 80, middle_east: 75 },
  { slug: 'claude-app', north_america: 82, europe: 78, east_asia: 35, south_asia: 55, africa: 40, latin_america: 50, middle_east: 45 },
  { slug: 'gemini-app', north_america: 70, europe: 60, east_asia: 55, south_asia: 90, africa: 65, latin_america: 68, middle_east: 72 },
  { slug: 'deepseek', north_america: 40, europe: 35, east_asia: 92, south_asia: 60, africa: 45, latin_america: 38, middle_east: 35 },
  { slug: 'midjourney-app', north_america: 85, europe: 75, east_asia: 60, south_asia: 55, africa: 35, latin_america: 65, middle_east: 50 },
  { slug: 'suno', north_america: 75, europe: 55, east_asia: 45, south_asia: 50, africa: 60, latin_america: 65, middle_east: 40 },
  { slug: 'cursor', north_america: 88, europe: 72, east_asia: 50, south_asia: 65, africa: 30, latin_america: 55, middle_east: 40 },
];

// ── LOOKUP HELPERS ──────────────────────────────────────────────────────
const ethicsMap = new Map(ethicsProfiles.map((e) => [e.slug, e]));
const worldviewMap = new Map(worldviewRatings.map((e) => [e.slug, e]));
const generationalMap = new Map(generationalData.map((e) => [e.slug, e]));
const culturalMap = new Map(culturalImpactData.map((e) => [e.slug, e]));
const impactMap = new Map(impactMaps.map((e) => [e.slug, e]));
const regionalMap = new Map(regionalSentiment.map((e) => [e.slug, e]));

export function getEthicsProfile(slug: string) { return ethicsMap.get(slug); }
export function getWorldviewRatings(slug: string) { return worldviewMap.get(slug); }
export function getGenerationalData(slug: string) { return generationalMap.get(slug); }
export function getCulturalImpact(slug: string) { return culturalMap.get(slug); }
export function getImpactMap(slug: string) { return impactMap.get(slug); }
export function getRegionalSentiment(slug: string) { return regionalMap.get(slug); }
