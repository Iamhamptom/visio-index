import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const url = process.env.VISIO_INTEL_SUPABASE_URL;
  const key = process.env.VISIO_INTEL_SERVICE_KEY;

  if (!url || !key) {
    return NextResponse.json({ error: 'Intel not connected' }, { status: 503 });
  }

  const client = createClient(url, key);

  const { data, error } = await client
    .from('ai_pricing')
    .select('*')
    .order('input_price_per_mtok', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    models: data ?? [],
    total: data?.length ?? 0,
    cheapest: data?.[0]?.model_name,
    most_expensive: data?.[data.length - 1]?.model_name,
  });
}
