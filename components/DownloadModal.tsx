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
        className="relative w-full max-w-xl rounded-2xl bg-[#101010]/95 border border-white/10 p-8 shadow-2xl text-white"
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
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold">How to Download and Install CoreFX</h2>
            <p className="text-sm text-white/70">Follow these steps to grab the base mod package for free</p>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-white/85">
            <p>
              1. Head over to our Patreon and create a free account. CoreFX uses a Freemium model, so the base mod
              package is available at no cost once you join with a free membership.
            </p>
            <p>
              2. Subscribe to the CoreFX page and open any post announcing a CoreFX update to reveal the latest
              download links.
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
              <span className="font-medium text-white/90">Want more?</span> You can also financially support the creator on{' '}
              <a
                href="https://www.patreon.com/crxhvrd/membership"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 underline decoration-dotted decoration-white/40 hover:text-white"
              >
                Patreon
              </a>
              {' '}to get additional features.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 text-xs text-white/60">
            <p>Ready to continue? Click below to open Patreon and unlock the files.</p>
            <a
              href="https://www.patreon.com/c/crxhvrd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white/90 px-6 py-2 text-sm font-semibold text-black transition hover:bg-white"
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
