import { NextResponse } from 'next/server';
import { getIntelFeed, checkIntelConnection } from '@/lib/intel/client';

export async function GET() {
  const status = await checkIntelConnection();

  if (!status.connected) {
    return NextResponse.json({
      connected: false,
      feed: [],
      reason: !process.env.VISIO_INTEL_SUPABASE_URL
        ? 'VISIO_INTEL_SUPABASE_URL not set'
        : 'VISIO_INTEL_SERVICE_KEY not set or connection failed',
      fix: 'Set VISIO_INTEL_SUPABASE_URL and VISIO_INTEL_SERVICE_KEY on Vercel',
    });
  }

  const feed = await getIntelFeed(30);

  return NextResponse.json({
    connected: true,
    feed,
    count: feed.length,
    db_stats: {
      entities: status.entities,
      signals: status.signals,
      news: status.news,
    },
    synced_at: new Date().toISOString(),
  });
}
