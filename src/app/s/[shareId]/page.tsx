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
  const res = await fetch(`${API_BASE_URL}/s/${shareId}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: { shareId: string };
}): Promise<Metadata> {
  const share = await fetchShare(params.shareId);
  const title = share?.title?.trim() || 'Open in Roam X';
  const description =
    share?.description?.trim() ||
    'To view this content, download Roam X and open the shared link.';
  const url = `${CANONICAL_BASE_URL}/s/${params.shareId}`;

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
  params: { shareId: string };
}) {
  const share = await fetchShare(params.shareId);
  const title = share?.title?.trim() || 'Open in Roam X';
  const description =
    share?.description?.trim() ||
    'To view this content, download Roam X and open the shared link.';

  return (
    <main style={{ fontFamily: 'system-ui', padding: 32, textAlign: 'center' }}>
      <h1>{title}</h1>
      <p>{description}</p>
      {share?.image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={share.image_url}
          alt=""
          style={{ maxWidth: 520, width: '100%', borderRadius: 16 }}
        />
      ) : null}
      <div style={{ marginTop: 24, display: 'grid', gap: 12 }}>
        {APP_STORE_URL ? (
          <a href={APP_STORE_URL}>Download on the App Store</a>
        ) : null}
        {PLAY_STORE_URL ? (
          <a href={PLAY_STORE_URL}>Get it on Google Play</a>
        ) : (
          <span style={{ color: '#777' }} aria-disabled="true">
            Get it on Google Play (coming soon)
          </span>
        )}
      </div>
    </main>
  );
}
