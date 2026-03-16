import { NextResponse } from 'next/server';
import { getIntelFeed, checkIntelConnection } from '@/lib/intel/client';

export async function GET() {
  const connected = await checkIntelConnection();

  if (!connected) {
    return NextResponse.json({
      connected: false,
      feed: [],
      message: 'Visio Intel not connected. Set VISIO_INTEL_URL and VISIO_INTEL_API_KEY.',
    });
  }

  const feed = await getIntelFeed(30);

  return NextResponse.json({
    connected: true,
    feed,
    count: feed.length,
    source: 'Visio Intel',
    synced_at: new Date().toISOString(),
  });
}
