import { NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabase/server';
import {
  labEntities, modelEntities, toolEntities, creatorEntities,
  chartDefinitions,
  topLabsEntries, topModelsEntries, topToolsEntries, topCreatorsEntries
} from '@/lib/data/seed';

export async function POST(request: Request) {
  // Protect with a secret key
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');
  if (key !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = await createAdminSupabase();
  const results: string[] = [];

  // 1. Seed entities
  const allEntities = [...labEntities, ...modelEntities, ...toolEntities, ...creatorEntities];
  const { error: entitiesError } = await supabase
    .from('entities')
    .upsert(allEntities as never[], { onConflict: 'slug' });

  if (entitiesError) {
    results.push(`Entities error: ${entitiesError.message}`);
  } else {
    results.push(`Seeded ${allEntities.length} entities`);
  }

  // 2. Seed charts
  const { error: chartsError } = await supabase
    .from('charts')
    .upsert(chartDefinitions as never[], { onConflict: 'slug' });

  if (chartsError) {
    results.push(`Charts error: ${chartsError.message}`);
  } else {
    results.push(`Seeded ${chartDefinitions.length} charts`);
  }

  // 3. Get entity + chart IDs for entries
  const { data: entities } = await supabase.from('entities').select('id, slug');
  const { data: charts } = await supabase.from('charts').select('id, slug');

  if (!entities || !charts) {
    return NextResponse.json({ error: 'Failed to fetch IDs', results }, { status: 500 });
  }

  const entityMap = new Map(entities.map((e) => [e.slug, e.id]));
  const chartMap = new Map(charts.map((c) => [c.slug, c.id]));

  // 4. Seed chart entries
  const entryGroups = [
    { chartSlug: 'top-labs', entries: topLabsEntries, entitySlugs: labEntities.map((e) => e.slug) },
    { chartSlug: 'top-models', entries: topModelsEntries, entitySlugs: modelEntities.map((e) => e.slug) },
    { chartSlug: 'top-tools', entries: topToolsEntries, entitySlugs: toolEntities.map((e) => e.slug) },
    { chartSlug: 'top-creators', entries: topCreatorsEntries, entitySlugs: creatorEntities.map((e) => e.slug) },
  ];

  for (const group of entryGroups) {
    const chartId = chartMap.get(group.chartSlug);
    if (!chartId) {
      results.push(`Chart ${group.chartSlug} not found`);
      continue;
    }

    const rows = group.entries.map((entry, i) => ({
      ...entry,
      chart_id: chartId,
      entity_id: entityMap.get(group.entitySlugs[i]) ?? null,
    })).filter((r) => r.entity_id !== null);

    const { error } = await supabase.from('chart_entries').insert(rows as never[]);
    if (error) {
      results.push(`${group.chartSlug} entries error: ${error.message}`);
    } else {
      results.push(`Seeded ${rows.length} entries for ${group.chartSlug}`);
    }
  }

  return NextResponse.json({ success: true, results });
}
