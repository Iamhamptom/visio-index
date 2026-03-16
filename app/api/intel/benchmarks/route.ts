import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
  const url = process.env.VISIO_INTEL_SUPABASE_URL;
  const key = process.env.VISIO_INTEL_SERVICE_KEY;

  if (!url || !key) {
    return NextResponse.json({ error: 'Intel not connected' }, { status: 503 });
  }

  const client = createClient(url, key);
  const { searchParams } = new URL(request.url);
  const benchmark = searchParams.get('benchmark');
  const model = searchParams.get('model');
  const category = searchParams.get('category');

  let query = client
    .from('ai_benchmarks')
    .select('*')
    .order('score', { ascending: false });

  if (benchmark) query = query.eq('benchmark_name', benchmark);
  if (model) query = query.eq('model_slug', model);
  if (category) query = query.eq('benchmark_category', category);

  const { data, error } = await query.limit(100);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Group by benchmark
  const grouped: Record<string, typeof data> = {};
  for (const row of data ?? []) {
    const key = row.benchmark_name;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(row);
  }

  return NextResponse.json({
    benchmarks: grouped,
    total: data?.length ?? 0,
    available_benchmarks: Object.keys(grouped),
  });
}
