import type { Metadata } from 'next';

const CANONICAL_BASE_URL = process.env.CANONICAL_BASE_URL ?? '';
const APP_STORE_URL = process.env.NEXT_PUBLIC_APP_STORE_URL ?? '';
const PLAY_STORE_URL = process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? '';

const TITLE = 'Get Roam X';
const DESCRIPTION = 'Download Roam X on iOS or Android.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: CANONICAL_BASE_URL
    ? { canonical: `${CANONICAL_BASE_URL}/get` }
    : undefined,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL_BASE_URL ? `${CANONICAL_BASE_URL}/get` : undefined,
    type: 'website',
  },
  twitter: { card: 'summary', title: TITLE, description: DESCRIPTION },
};

/**
 * Plain download page — no invite code, no share.
 *
 * The app shares an attributed `/i/{code}` link when it can get one. When it
 * cannot, it needs somewhere to send people that still works on both
 * platforms; it used to send an Apple App Store URL, which left every Android
 * recipient with a link they could not install from. This page is that
 * fallback, and it offers both stores the same way `/i/{code}` and
 * `/s/{shareId}` already do.
 */
export default function GetPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        fontFamily: 'system-ui',
        padding: '24px 16px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        background:
          'radial-gradient(1200px 600px at 20% -10%, #1c1f24, #0f1114 60%)',
        color: '#f5f7fb',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 520,
          background: '#14171c',
          border: '1px solid #222832',
          borderRadius: 20,
          padding: '28px 20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.45)',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 22,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 'clamp(22px, 5vw, 28px)',
            lineHeight: 1.2,
            textAlign: 'center',
          }}
        >
          Get Roam X
        </h1>

        <p
          style={{
            margin: 0,
            color: '#b9c0cc',
            textAlign: 'center',
            lineHeight: 1.6,
          }}
        >
          Find the places worth your time, wherever you are.
        </p>

        <div
          style={{
            width: '100%',
            display: 'grid',
            gap: 12,
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
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
                border: '1px dashed #303744',
              }}
              aria-disabled="true"
            >
              Google Play (coming soon)
            </span>
          )}
        </div>
      </div>
    </main>
  );
}
