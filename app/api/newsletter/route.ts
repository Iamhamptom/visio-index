import { NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabase/server';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = schema.parse(body);

    const supabase = await createAdminSupabase();
    const { error } = await supabase
      .from('newsletter_subscribers')
      .upsert({ email, is_active: true }, { onConflict: 'email' });

    if (error) {
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }
}
