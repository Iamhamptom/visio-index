import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = await createServerSupabase();

  const { data: entity, error } = await supabase
    .from('entities')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !entity) {
    return NextResponse.json({ error: 'Entity not found' }, { status: 404 });
  }

  // Get chart appearances
  const { data: chartEntries } = await supabase
    .from('chart_entries')
    .select('*, chart:charts(name, slug)')
    .eq('entity_id', entity.id)
    .order('week_start', { ascending: false })
    .limit(50);

  return NextResponse.json({ entity, chartEntries: chartEntries ?? [] });
}
