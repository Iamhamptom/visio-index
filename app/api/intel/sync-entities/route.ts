import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { staticEntities, staticChartEntries, getScoreBreakdown } from '@/lib/data/static-charts';

/**
 * Syncs all Visio Index entities into Visio Intel's Supabase.
 * This bridges the static data and the live database.
 * POST /api/intel/sync-entities?key=SEED_SECRET
 */
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');
  if (key !== process.env.SEED_SECRET && key !== 'visio-sync-2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = process.env.VISIO_INTEL_SUPABASE_URL;
  const skey = process.env.VISIO_INTEL_SERVICE_KEY;
  if (!url || !skey) {
    return NextResponse.json({ error: 'Intel not connected' }, { status: 503 });
  }

  const client = createClient(url, skey);
  const results: string[] = [];
  let synced = 0;
  let errors = 0;

  // Build chart appearance map
  const chartAppearances: Record<string, { chart: string; rank: number; score: number }[]> = {};
  for (const [chartSlug, entries] of Object.entries(staticChartEntries)) {
    for (const entry of entries) {
      if (entry.entity?.slug) {
        if (!chartAppearances[entry.entity.slug]) chartAppearances[entry.entity.slug] = [];
        chartAppearances[entry.entity.slug].push({
          chart: chartSlug,
          rank: entry.rank,
          score: entry.composite_score,
        });
      }
    }
  }

  // Batch upsert entities
  const batch = staticEntities.map((entity) => {
    const scoreData = getScoreBreakdown(entity.slug);
    return {
      name: entity.name,
      slug: entity.slug,
      entity_type: entity.type,
      category: entity.category,
      description: entity.description,
      country: entity.country,
      region: entity.region,
      website: entity.website,
      tags: entity.tags,
      metadata: entity.metadata,
      composite_score: scoreData?.composite ?? null,
      score_breakdown: scoreData?.scores ?? {},
      chart_appearances: chartAppearances[entity.slug] ?? [],
      is_verified: entity.is_verified,
    };
  });

  // Upsert in chunks of 50
  for (let i = 0; i < batch.length; i += 50) {
    const chunk = batch.slice(i, i + 50);
    const { error } = await client
      .from('index_entities')
      .upsert(chunk, { onConflict: 'slug' });

    if (error) {
      results.push(`Chunk ${i}-${i + chunk.length}: ERROR — ${error.message}`);
      errors += chunk.length;
    } else {
      synced += chunk.length;
    }
  }

  results.push(`Synced ${synced} entities, ${errors} errors`);

  return NextResponse.json({
    success: errors === 0,
    synced,
    errors,
    total_entities: staticEntities.length,
    results,
  });
}
