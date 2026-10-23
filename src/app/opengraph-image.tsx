import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Mitchell Thomas — Senior Full-Stack & AI Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: '#131314',
          color: '#ffffff',
          fontFamily: 'monospace',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, color: '#9ca3af' }}>mitchell@localhost:~$ whoami</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', fontSize: 84, fontWeight: 700, letterSpacing: -2 }}>Mitchell Thomas</div>
          <div style={{ display: 'flex', fontSize: 38, color: '#d1d5db', lineHeight: 1.3 }}>
            Senior Full-Stack &amp; AI Engineer — agentic systems, LLM integration, regulated industries
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 28, color: '#9ca3af' }}>
          <span>mitchell-codes.com</span>
          <span>Nashville, TN · Remote</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
