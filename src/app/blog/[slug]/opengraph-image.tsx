import { ImageResponse } from 'next/og';
import { formatDate, getAllPosts, getPost } from '@/lib/blog';

export const alt = 'Mitchell Thomas — blog post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? 'Blog';
  const subtitle = post?.description ?? '';
  const date = post ? formatDate(post.date) : '';

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
        <div style={{ display: 'flex', fontSize: 28, color: '#9ca3af' }}>
          mitchell@localhost:~$ cat ./blog/{slug}.mdx
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              display: 'flex',
              fontSize: title.length > 60 ? 56 : 72,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div style={{ display: 'flex', fontSize: 30, color: '#d1d5db', lineHeight: 1.35 }}>
              {subtitle.length > 140 ? `${subtitle.slice(0, 137)}…` : subtitle}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 28, color: '#9ca3af' }}>
          <span>Mitchell Thomas · mitchell-codes.com/blog</span>
          <span>{date}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
