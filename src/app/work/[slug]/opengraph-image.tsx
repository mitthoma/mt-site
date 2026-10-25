import { ImageResponse } from 'next/og';
import { getUniverse } from '@/content/work';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const u = getUniverse(slug);
  const accent = u?.accent ?? '#ffd166';
  const status = u?.status === 'operational' ? 'OPERATIONAL' : u?.status === 'in-flight' ? 'IN FLIGHT' : 'PENDING';
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', background: '#0a0a0b', color: '#fff', fontFamily: 'monospace' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26, color: '#9ca3af', letterSpacing: 4 }}>
          <span>{u?.mission ?? 'MISSION'}</span>
          <span style={{ color: accent }}>● {status}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', fontSize: 132, fontWeight: 700, letterSpacing: -6, lineHeight: 0.9 }}>
            <span style={{ color: accent }}>{u?.codename.slice(0, 1)}</span>
            <span>{u?.codename.slice(1)}</span>
          </div>
          <div style={{ display: 'flex', fontSize: 30, color: '#d1d5db', lineHeight: 1.35, maxWidth: 1000 }}>{u?.tagline}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#9ca3af' }}>
          <span>mitchell-codes.com/work/{slug}</span>
          <span>Mitchell Thomas</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
