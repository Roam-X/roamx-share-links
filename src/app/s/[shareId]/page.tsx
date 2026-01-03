import type { Metadata } from 'next';

const API_BASE_URL = process.env.API_BASE_URL ?? '';
const CANONICAL_BASE_URL = process.env.CANONICAL_BASE_URL ?? '';
const APP_STORE_URL = process.env.NEXT_PUBLIC_APP_STORE_URL ?? '';
const PLAY_STORE_URL = process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? '';

type Share = {
  share_id: string;
  entity_type: 'list' | 'restaurant' | 'editorial';
  entity_id: string;
  title?: string | null;
  description?: string | null;
  image_url?: string | null;
};

async function fetchShare(shareId: string): Promise<Share | null> {
  if (!API_BASE_URL) return null;
  const url = `${API_BASE_URL}/s/${shareId}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return null;
  const data = (await res.json()) as Share;
  console.log('[share]', { url, status: res.status, data });
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ shareId: string }>;
}): Promise<Metadata> {
  const { shareId } = await params;
  const share = await fetchShare(shareId);
  const title = share?.title?.trim() || 'Open in Roam X';
  const description =
    share?.description?.trim() ||
    'To view this content, download Roam X and open the shared link.';
  const url = `${CANONICAL_BASE_URL}/s/${shareId}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: share?.image_url ? [share.image_url] : undefined,
    },
    twitter: {
      card: share?.image_url ? 'summary_large_image' : 'summary',
      title,
      description,
      images: share?.image_url ? [share.image_url] : undefined,
    },
  };
}

export default async function SharePage({
  params,
}: {
  params: Promise<{ shareId: string }>;
}) {
  const { shareId } = await params;
  const share = await fetchShare(shareId);
  const title = share?.title?.trim() || 'Open in Roam X';
  const description =
    share?.description?.trim() ||
    'To view this content, download Roam X and open the shared link.';

  return (
    <main
      style={{
        minHeight: '100vh',
        fontFamily: 'system-ui',
        padding: 32,
        display: 'grid',
        placeItems: 'center',
        background:
          'radial-gradient(1200px 600px at 20% -10%, #1c1f24, #0f1114 60%)',
        color: '#f5f7fb',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 720,
          background: '#14171c',
          border: '1px solid #222832',
          borderRadius: 20,
          padding: 24,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.45)',
        }}
      >
        <div
          style={{
            width: '100%',
            height: 320,
            borderRadius: 16,
            overflow: 'hidden',
            background: '#0b0d10',
            border: '1px solid #1e232b',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          {share?.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={share.image_url}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
                backgroundColor: '#0b0d10',
              }}
            />
          ) : (
            <span style={{ color: '#7a808a', letterSpacing: 1 }}>
              NO IMAGE FOUND
            </span>
          )}
        </div>
        <div style={{ marginTop: 18 }}>
          <h1 style={{ margin: 0, fontSize: 28, lineHeight: 1.2 }}>{title}</h1>
          {share?.description ? (
            <p style={{ marginTop: 10, color: '#b9c0cc' }}>{description}</p>
          ) : null}
        </div>
      </div>
      <p style={{ marginTop: 20, color: '#cfd5df', textAlign: 'center' }}>
        To view this content, download Roam X and open the shared link in the
        app.
      </p>
      <div
        style={{
          width: '100%',
          maxWidth: 520,
          marginTop: 12,
          display: 'grid',
          gap: 12,
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        }}
      >
        {APP_STORE_URL ? (
          <a
            href={APP_STORE_URL}
            style={{
              display: 'inline-block',
              padding: '12px 16px',
              borderRadius: 12,
              background: '#f5f7fb',
              color: '#0b0d10',
              fontWeight: 600,
              textAlign: 'center',
              textDecoration: 'none',
            }}
          >
            Download on the App Store
          </a>
        ) : (
          <span
            style={{
              padding: '12px 16px',
              borderRadius: 12,
              background: '#e5e7eb',
              color: '#6b7280',
              textAlign: 'center',
              border: '1px dashed #cbd5e1',
            }}
            aria-disabled="true"
          >
            App Store (coming soon)
          </span>
        )}
        {PLAY_STORE_URL ? (
          <a
            href={PLAY_STORE_URL}
            style={{
              display: 'inline-block',
              padding: '12px 16px',
              borderRadius: 12,
              background: '#242a33',
              color: '#f5f7fb',
              fontWeight: 600,
              textAlign: 'center',
              textDecoration: 'none',
              border: '1px solid #303744',
            }}
          >
            Get it on Google Play
          </a>
        ) : (
          <span
            style={{
              padding: '12px 16px',
              borderRadius: 12,
              background: '#1a1f27',
              color: '#8a92a0',
              textAlign: 'center',
              border: '1px dashed #2a313d',
            }}
            aria-disabled="true"
          >
            Google Play (coming soon)
          </span>
        )}
      </div>
    </main>
  );
}
