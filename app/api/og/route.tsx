import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get('title') ?? 'The Visio Index';
  const subtitle = searchParams.get('subtitle') ?? 'AI Billboard Charts';
  const score = searchParams.get('score');
  const rank = searchParams.get('rank');
  const type = searchParams.get('type') ?? 'chart';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0A0A0F',
          padding: '60px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            backgroundColor: '#3B82F6',
          }} />
          <span style={{ color: '#3B82F6', fontSize: '20px', fontWeight: 700, letterSpacing: '0.05em' }}>
            VISIO INDEX
          </span>
          <span style={{ color: '#6B7280', fontSize: '16px', marginLeft: '8px' }}>
            {type === 'entity' ? 'Entity Profile' : 'Weekly Chart'}
          </span>
        </div>

        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {rank && (
            <div style={{
              display: 'flex', alignItems: 'baseline', gap: '12px',
            }}>
              <span style={{ color: '#3B82F6', fontSize: '72px', fontWeight: 800, fontFamily: 'monospace' }}>
                #{rank}
              </span>
            </div>
          )}
          <span style={{
            color: '#E8E8ED', fontSize: rank ? '48px' : '56px',
            fontWeight: 700, lineHeight: 1.1, maxWidth: '900px',
          }}>
            {title}
          </span>
          <span style={{ color: '#6B7280', fontSize: '24px', maxWidth: '700px' }}>
            {subtitle}
          </span>
          {score && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
              <span style={{ color: '#6B7280', fontSize: '18px' }}>Composite Score</span>
              <span style={{ color: '#3B82F6', fontSize: '36px', fontWeight: 700, fontFamily: 'monospace' }}>
                {score}
              </span>
            </div>
          )}
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#6B7280', fontSize: '16px' }}>
            visio-index.vercel.app
          </span>
          <span style={{ color: '#6B7280', fontSize: '14px' }}>
            Powered by Visio Research Labs
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
