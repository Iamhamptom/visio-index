/**
 * Static chart data layer — deep version with score breakdowns,
 * 4 weeks of history, genre charts, and entity resolution.
 */
import type { Chart, ChartEntry, Entity } from '@/lib/supabase/types';
import {
  labEntities, modelEntities, toolEntities, creatorEntities,
  chartDefinitions,
  labScores, modelScores, toolScores, creatorScores,
  codeAIScores, creativeAIScores, openSourceScores,
  topLabsEntries, topModelsEntries, topToolsEntries, topCreatorsEntries,
  topCodeAIEntries, topCreativeAIEntries, topOpenSourceEntries,
  labWeeklyData, modelWeeklyData, toolWeeklyData, creatorWeeklyData,
  codeAIWeeklyData, creativeAIWeeklyData, openSourceWeeklyData,
  CHART_WEEKS,
  type ScoredRanking,
} from './seed';

function makeId(prefix: string, i: number) {
  return `${prefix}-${String(i).padStart(4, '0')}`;
}

// ── Entities ────────────────────────────────────────────────────────────
const allEntityData = [...labEntities, ...modelEntities, ...toolEntities, ...creatorEntities];
export const staticEntities: Entity[] = allEntityData.map((e, i) => ({
  ...e,
  id: makeId('entity', i),
  created_at: '2026-03-01T00:00:00Z',
  updated_at: '2026-03-09T00:00:00Z',
}));

const entityBySlug = new Map(staticEntities.map((e) => [e.slug, e]));

// ── Charts ──────────────────────────────────────────────────────────────
export const staticCharts: Chart[] = chartDefinitions.map((c, i) => ({
  ...c,
  id: makeId('chart', i),
  created_at: '2026-03-01T00:00:00Z',
}));

const chartBySlug = new Map(staticCharts.map((c) => [c.slug, c]));

// ── Entry builder (resolves entity refs, assigns IDs) ───────────────────
type RawEntry = typeof topLabsEntries[number];

function resolveEntries(
  chartSlug: string,
  entries: RawEntry[],
  scoreData: ScoredRanking[]
): ChartEntry[] {
  const chart = chartBySlug.get(chartSlug);
  return entries.map((entry, i) => {
    const scored = scoreData.find((_, idx) => {
      // Match by rank order — entries are already sorted by composite
      return idx === i;
    });
    const slug = scored ? scoreData[i]?.slug : undefined;
    const entity = slug ? entityBySlug.get(slug) : undefined;

    return {
      ...entry,
      id: makeId(`${chartSlug}-entry`, i),
      chart_id: chart?.id ?? '',
      entity_id: entity?.id ?? '',
      created_at: '2026-03-09T00:00:00Z',
      entity,
    };
  });
}

// Build current-week entries for each chart, resolved to entities
export const staticChartEntries: Record<string, ChartEntry[]> = {
  'top-labs': resolveEntries('top-labs', topLabsEntries, labScores),
  'top-models': resolveEntries('top-models', topModelsEntries, modelScores),
  'top-tools': resolveEntries('top-tools', topToolsEntries, toolScores),
  'top-creators': resolveEntries('top-creators', topCreatorsEntries, creatorScores),
  'top-code-ai': resolveEntries('top-code-ai', topCodeAIEntries, codeAIScores),
  'top-creative-ai': resolveEntries('top-creative-ai', topCreativeAIEntries, creativeAIScores),
  'top-open-source': resolveEntries('top-open-source', topOpenSourceEntries, openSourceScores),
};

// ── Historical data (4 weeks per chart) ─────────────────────────────────
interface WeeklySnapshot {
  week_start: string;
  entries: ChartEntry[];
}

function resolveWeeklyData(
  chartSlug: string,
  weeklyData: typeof labWeeklyData,
  scoreData: ScoredRanking[]
): WeeklySnapshot[] {
  return weeklyData.map((week) => ({
    week_start: week.week_start,
    entries: week.entries.map((entry, i) => {
      const slug = scoreData
        .filter((s) => (s.history[CHART_WEEKS.indexOf(week.week_start)] || 0) > 0)
        .sort((a, b) => {
          const wIdx = CHART_WEEKS.indexOf(week.week_start);
          return (b.history[wIdx] || 0) - (a.history[wIdx] || 0);
        })[i]?.slug;
      const entity = slug ? entityBySlug.get(slug) : undefined;

      return {
        ...entry,
        id: makeId(`${chartSlug}-${week.week_start}-entry`, i),
        chart_id: chartBySlug.get(chartSlug)?.id ?? '',
        entity_id: entity?.id ?? '',
        created_at: `${week.week_start}T00:00:00Z`,
        entity,
      };
    }),
  }));
}

export const chartHistory: Record<string, WeeklySnapshot[]> = {
  'top-labs': resolveWeeklyData('top-labs', labWeeklyData, labScores),
  'top-models': resolveWeeklyData('top-models', modelWeeklyData, modelScores),
  'top-tools': resolveWeeklyData('top-tools', toolWeeklyData, toolScores),
  'top-creators': resolveWeeklyData('top-creators', creatorWeeklyData, creatorScores),
  'top-code-ai': resolveWeeklyData('top-code-ai', codeAIWeeklyData, codeAIScores),
  'top-creative-ai': resolveWeeklyData('top-creative-ai', creativeAIWeeklyData, creativeAIScores),
  'top-open-source': resolveWeeklyData('top-open-source', openSourceWeeklyData, openSourceScores),
};

// ── Score breakdown data (for radar charts, entity profiles) ────────────
const allScoreData = [...labScores, ...modelScores, ...toolScores, ...creatorScores, ...codeAIScores, ...creativeAIScores, ...openSourceScores];
const scoreBySlug = new Map<string, ScoredRanking>();
for (const s of allScoreData) {
  if (!scoreBySlug.has(s.slug)) {
    scoreBySlug.set(s.slug, s);
  }
}

export function getScoreBreakdown(entitySlug: string): ScoredRanking | undefined {
  return scoreBySlug.get(entitySlug);
}

export function getScoreHistory(entitySlug: string): number[] {
  return scoreBySlug.get(entitySlug)?.history ?? [];
}

// ── Public API ──────────────────────────────────────────────────────────
export function getChartBySlug(slug: string): Chart | undefined {
  return chartBySlug.get(slug);
}

export function getEntriesByChartSlug(slug: string): ChartEntry[] {
  return staticChartEntries[slug] ?? [];
}

export function getEntityBySlug(slug: string): Entity | undefined {
  return entityBySlug.get(slug);
}

export function getFeaturedCharts(): Chart[] {
  return staticCharts.filter((c) => c.is_featured);
}

export function getGenreCharts(): Chart[] {
  return staticCharts.filter((c) => c.category === 'genre');
}

export function getAllCharts(): Chart[] {
  return staticCharts;
}

export function getAllTrendingEntries(): ChartEntry[] {
  return Object.values(staticChartEntries)
    .flat()
    .filter((e) => e.status === 'up' || e.status === 'hot_shot' || e.status === 'new')
    .sort((a, b) => b.composite_score - a.composite_score)
    .slice(0, 12);
}

export function getBiggestMovers(): ChartEntry[] {
  return Object.values(staticChartEntries)
    .flat()
    .filter((e) => e.previous_rank !== null && e.status !== 'steady')
    .sort((a, b) => {
      const deltaA = Math.abs((a.previous_rank ?? a.rank) - a.rank);
      const deltaB = Math.abs((b.previous_rank ?? b.rank) - b.rank);
      return deltaB - deltaA;
    })
    .slice(0, 8);
}

export function searchEntities(query: string): Entity[] {
  const q = query.toLowerCase();
  return staticEntities.filter(
    (e) =>
      e.name.toLowerCase().includes(q) ||
      e.slug.includes(q) ||
      e.description?.toLowerCase().includes(q) ||
      e.tags.some((t) => t.includes(q)) ||
      e.category?.toLowerCase().includes(q)
  );
}

export function getEntitiesByType(type: Entity['type']): Entity[] {
  return staticEntities.filter((e) => e.type === type);
}

export function getChartWeeks(): string[] {
  return CHART_WEEKS;
}

export { CHART_WEEKS, staticEntities as allEntities };
