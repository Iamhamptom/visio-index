import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = await createServerSupabase();

  // Get chart definition
  const { data: chart, error: chartError } = await supabase
    .from('charts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (chartError || !chart) {
    return NextResponse.json({ error: 'Chart not found' }, { status: 404 });
  }

  // Get latest week's entries with entity data
  const { data: entries, error: entriesError } = await supabase
    .from('chart_entries')
    .select('*, entity:entities(*)')
    .eq('chart_id', chart.id)
    .order('week_start', { ascending: false })
    .order('rank', { ascending: true })
    .limit(chart.max_entries);

  if (entriesError) {
    return NextResponse.json({ error: entriesError.message }, { status: 500 });
  }

  // Deduplicate to latest week only
  const latestWeek = entries?.[0]?.week_start;
  const currentEntries = entries?.filter((e) => e.week_start === latestWeek) ?? [];

  return NextResponse.json({ chart, entries: currentEntries });
}
