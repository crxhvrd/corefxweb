'use client';

import { useEffect } from 'react';
import { useChrome } from '@/lib/chrome';
import { rich } from '@/lib/rich';

interface DownloadModalProps {
  open: boolean;
  onClose: () => void;
}

const DIALOG_LINK = 'text-white/90 underline decoration-dotted decoration-white/40 hover:text-white';

export default function DownloadModal({ open, onClose }: DownloadModalProps) {
  const { locale, t } = useChrome();
  const d = t.download;

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

  const opts = { locale, linkClass: DIALOG_LINK, strongClass: 'font-medium text-white/95' };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[90svh] overflow-y-auto rounded-lg bg-[#0d0d0d] border border-white/15 p-6 sm:p-8 shadow-2xl text-white"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-white/60 transition hover:text-white"
          aria-label={d.close}
        >
          ✕
        </button>

        <div className="space-y-6">
          <div className="space-y-2">
            <p className="font-mono text-xs text-white/40">{d.label}</p>
            <h2 id="download-title" className="text-xl font-medium">
              {d.title}
            </h2>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-white/85">
            {d.steps.map((s, i) => (
              <p key={i}>{rich(s, opts)}</p>
            ))}
            <p className="border-t border-white/10 pt-4 text-white/70">{rich(d.support, opts)}</p>
          </div>

          <div className="flex flex-col items-start gap-3 text-xs text-white/60 border-t border-white/10 pt-5">
            <p>{rich(d.licence, opts)}</p>
            <a
              href="https://www.patreon.com/c/crxhvrd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-white/30 px-4 py-2 text-sm text-white transition hover:border-white/70"
            >
              {d.button}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
