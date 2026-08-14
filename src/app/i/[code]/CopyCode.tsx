'use client';

import { useEffect, useState } from 'react';

/**
 * The invite code, with a copy button.
 *
 * The App Store drops the code across an install, so someone who does not have
 * the app yet has to carry it across by hand. Showing it and making it one tap
 * to copy is the whole point of this page.
 */
export default function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      // Clipboard is unavailable on insecure origins and some in-app browsers;
      // the code is on screen either way, so this is not worth surfacing.
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        width: '100%',
      }}
    >
      <span style={{ color: '#8a92a0', fontSize: 13, letterSpacing: 0.6 }}>
        YOUR INVITE CODE
      </span>
      <code
        style={{
          fontSize: 'clamp(26px, 8vw, 34px)',
          fontWeight: 700,
          letterSpacing: 4,
          color: '#f5f7fb',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        }}
      >
        {code}
      </code>
      <button
        type="button"
        onClick={copy}
        style={{
          padding: '10px 18px',
          borderRadius: 999,
          background: copied ? '#19DB8A' : '#242a33',
          color: copied ? '#0b0d10' : '#f5f7fb',
          fontWeight: 600,
          fontSize: 14,
          border: '1px solid #303744',
          cursor: 'pointer',
        }}
      >
        {copied ? 'Copied' : 'Copy code'}
      </button>
    </div>
  );
}
