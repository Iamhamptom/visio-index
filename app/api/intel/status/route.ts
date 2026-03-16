import { NextResponse } from 'next/server';
import { checkIntelConnection } from '@/lib/intel/client';

export async function GET() {
  const status = await checkIntelConnection();

  return NextResponse.json({
    ...status,
    supabase_project: 'zgsgfghyreaptbpvlhdx',
    region: 'eu-central-1',
    config: {
      url_set: !!process.env.VISIO_INTEL_SUPABASE_URL,
      key_set: !!process.env.VISIO_INTEL_SERVICE_KEY,
    },
    tables: status.connected ? [
      'legal_entities', 'market_signals', 'news_articles',
      'procurement_releases', 'procurement_awards', 'web_presences',
      'entity_relationships', 'esg_scores', 'compliance_filings',
      'score_history', 'director_networks', 'executive_movements',
    ] : [],
  });
}
