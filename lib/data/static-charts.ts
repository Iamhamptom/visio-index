/**
 * Static chart data for MVP rendering (no Supabase required).
 * Uses seed data directly. Will be replaced by Supabase queries in Phase 2.
 */
import type { Chart, ChartEntry, Entity } from '@/lib/supabase/types';
import {
  labEntities, modelEntities, toolEntities, creatorEntities,
  chartDefinitions,
  topLabsEntries, topModelsEntries, topToolsEntries, topCreatorsEntries
} from './seed';

function makeId(prefix: string, i: number) {
  return `${prefix}-${String(i).padStart(4, '0')}`;
}

// Build entities with generated IDs
const allEntityData = [...labEntities, ...modelEntities, ...toolEntities, ...creatorEntities];
export const staticEntities: Entity[] = allEntityData.map((e, i) => ({
  ...e,
  id: makeId('entity', i),
  created_at: '2026-03-01T00:00:00Z',
  updated_at: '2026-03-09T00:00:00Z',
}));

const entityBySlug = new Map(staticEntities.map((e) => [e.slug, e]));

// Build charts with generated IDs
export const staticCharts: Chart[] = chartDefinitions.map((c, i) => ({
  ...c,
  id: makeId('chart', i),
  created_at: '2026-03-01T00:00:00Z',
}));

const chartBySlug = new Map(staticCharts.map((c) => [c.slug, c]));

// Map entry arrays to their entity slugs and chart slugs
function buildEntries(
  chartSlug: string,
  entries: typeof topLabsEntries,
  entitySlugs: string[]
): ChartEntry[] {
  const chart = chartBySlug.get(chartSlug);
  return entries.map((entry, i) => {
    const entity = entityBySlug.get(entitySlugs[i]);
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

export const staticChartEntries: Record<string, ChartEntry[]> = {
  'top-labs': buildEntries('top-labs', topLabsEntries, labEntities.map((e) => e.slug)),
  'top-models': buildEntries('top-models', topModelsEntries, modelEntities.map((e) => e.slug)),
  'top-tools': buildEntries('top-tools', topToolsEntries, toolEntities.map((e) => e.slug)),
  'top-creators': buildEntries('top-creators', topCreatorsEntries, creatorEntities.map((e) => e.slug)),
};

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

export function getAllTrendingEntries(): ChartEntry[] {
  return Object.values(staticChartEntries)
    .flat()
    .filter((e) => e.status === 'up' || e.status === 'hot_shot' || e.status === 'new')
    .sort((a, b) => b.composite_score - a.composite_score)
    .slice(0, 10);
}
