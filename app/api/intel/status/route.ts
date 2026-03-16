import { NextResponse } from 'next/server';
import { checkIntelConnection } from '@/lib/intel/client';

export async function GET() {
  const connected = await checkIntelConnection();
  const intelUrl = process.env.VISIO_INTEL_URL || 'not configured';
  const hasKey = !!process.env.VISIO_INTEL_API_KEY;

  return NextResponse.json({
    status: connected ? 'connected' : 'disconnected',
    intel_url: intelUrl,
    api_key_configured: hasKey,
    capabilities: connected ? [
      'entity_search', 'market_signals', 'news_sentiment',
      'entity_scores', 'tender_data', 'due_diligence',
    ] : [],
    data_sources: {
      entities: '100K+ SA legal entities',
      signals: '50K+ market signals',
      news: '100K+ articles with sentiment',
      tenders: '10K+ government tenders',
      scores: '5-component entity scoring',
    },
  });
}
