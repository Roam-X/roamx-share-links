import type { Metadata } from 'next';

import CopyCode from './CopyCode';

const CANONICAL_BASE_URL = process.env.CANONICAL_BASE_URL ?? '';
const APP_STORE_URL = process.env.NEXT_PUBLIC_APP_STORE_URL ?? '';
const PLAY_STORE_URL = process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? '';

const TITLE = 'You have been invited to Roam X';
const DESCRIPTION =
  'Download Roam X and use this invite code so your friend gets credit.';

/**
 * Codes are always exactly 8 chars from a no-ambiguous-characters alphabet —
 * see CODE_LENGTH / _ALPHABET in referral_service.py (a-z minus l/o, 2-9,
 * never 0/1). Validated against that exact shape rather than repaired: a
 * link that has been truncated, corrupted, or tampered with should show the
 * "incomplete" fallback, not have its stray characters silently stripped out
 * and be handed to CopyCode as if it were a real, issued code.
 */
const CODE_PATTERN = /^[a-km-np-z2-9]{8}$/;

function parseCode(raw: string): string | null {
  const candidate = raw.trim().toLowerCase();
  return CODE_PATTERN.test(candidate) ? candidate : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  // Only build an absolute URL when CANONICAL_BASE_URL is actually configured
  // — unconditionally prepending it would emit a bare relative path like
  // "/i/abc23456" when it is unset, which is invalid for both openGraph.url
  // and a canonical tag. Same guard /get and /s/[shareId] already use.
  const url = CANONICAL_BASE_URL
    ? `${CANONICAL_BASE_URL}/i/${parseCode(code) ?? ''}`
    : undefined;

  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url,
      type: 'website',
    },
    twitter: { card: 'summary', title: TITLE, description: DESCRIPTION },
    // An invite link is per-person and disposable; keep it out of search results.
    robots: { index: false, follow: false },
  };
}

/**
 * Invite landing page.
 *
 * Only reached when the universal link did not open the app — either it is not
 * installed, or the link was opened somewhere that does not honour app links.
 * Everything here exists to get the code across that gap.
 */
export default async function InvitePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const inviteCode = parseCode(code);

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
          You&rsquo;ve been invited to Roam X
        </h1>

        {inviteCode ? (
          <>
            <CopyCode code={inviteCode} />
            <ol
              style={{
                margin: 0,
                paddingLeft: 20,
                color: '#b9c0cc',
                lineHeight: 1.6,
                alignSelf: 'stretch',
              }}
            >
              <li>Download Roam X.</li>
              <li>Create your account.</li>
              <li>Enter the code above so your friend gets credit.</li>
            </ol>
          </>
        ) : (
          <>
            <p style={{ margin: 0, color: '#b9c0cc', textAlign: 'center' }}>
              That invite link looks incomplete. Ask your friend to send it
              again.
            </p>
            {/* No code was shown above, so the instructions cannot tell the
                user to enter it — that was the previous bug this replaces. */}
            <ol
              style={{
                margin: 0,
                paddingLeft: 20,
                color: '#b9c0cc',
                lineHeight: 1.6,
                alignSelf: 'stretch',
              }}
            >
              <li>Download Roam X.</li>
              <li>Create your account.</li>
            </ol>
          </>
        )}
      </div>

      <div
        style={{
          width: '100%',
          maxWidth: 520,
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
