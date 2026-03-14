import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createServerSupabase();

  const { data: charts, error } = await supabase
    .from('charts')
    .select('*')
    .order('is_featured', { ascending: false })
    .order('name');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(charts);
}
