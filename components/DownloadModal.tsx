'use client';

import { useEffect } from 'react';

interface DownloadModalProps {
  open: boolean;
  onClose: () => void;
}

export default function DownloadModal({ open, onClose }: DownloadModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-lg bg-[#0d0d0d] border border-white/15 p-6 sm:p-8 shadow-2xl text-white"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-white/60 transition hover:text-white"
          aria-label="Close dialog"
        >
          ✕
        </button>

        <div className="space-y-6">
          <div className="space-y-2">
            <p className="font-mono text-xs text-white/40">download</p>
            <h2 className="text-xl font-medium">Getting CoreFX</h2>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-white/85">
            <p>
              1. Make a free account on our Patreon. Both{' '}
              <span className="font-medium text-white/95">Singleplayer</span> builds — Legacy and Enhanced — are
              available at no cost once you join with a free membership. The{' '}
              <span className="font-medium text-white/95">Legacy FiveM</span> build is on the $5 tier.
            </p>
            <p>
              2. Subscribe to the CoreFX page and open any post announcing a CoreFX update to reveal the latest
              download links. The $9 tier gets new updates 10 days before everyone else.
            </p>
            <p>
              3. Download the archive and follow the CoreFX setup instructions for your platform in the{' '}
              <a
                href="https://corefx.me/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/85 underline decoration-dotted decoration-white/40 hover:text-white"
              >
                CoreFX documentation
              </a>
              .
            </p>
            <p className="border-t border-white/10 pt-4 text-white/70">
              <span className="font-medium text-white/90">Supporting us:</span> a paid{' '}
              <a
                href="https://www.patreon.com/crxhvrd/membership"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 underline decoration-dotted decoration-white/40 hover:text-white"
              >
                Patreon
              </a>
              {' '}tier adds the FiveM build and early access to updates. No visual effect is
              locked behind it; it helps us keep working on CoreFX.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 text-xs text-white/60 border-t border-white/10 pt-5">
            <p>
              Every archive ships with the CoreFX{' '}
              <a
                href="/license"
                className="text-white/85 underline decoration-dotted decoration-white/40 hover:text-white"
              >
                end user licence
              </a>
              . Installing CoreFX means accepting it.
            </p>
            <a
              href="https://www.patreon.com/c/crxhvrd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-white/30 px-4 py-2 text-sm text-white transition hover:border-white/70"
            >
              Open our Patreon ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
