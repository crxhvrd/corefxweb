'use client';

import { usePathname } from 'next/navigation';

export default function AttributionFooter() {
  const pathname = usePathname();
  const isHiddenRoute = pathname?.startsWith('/docs') || pathname?.startsWith('/devblog');

  return (
    <>
      {/* Desktop fixed attribution — hidden on docs/devblog */}
      {!isHiddenRoute && (
        <div className="hidden md:block fixed bottom-8 left-1/2 -translate-x-1/2 z-50 text-xs text-white opacity-60 text-center space-y-1 px-2">
          <p>
            Business proposals:{' '}
            <a href="mailto:crxhvrd@proton.me" className="text-orange-500 hover:opacity-100">
              crxhvrd@proton.me
            </a>
          </p>
          <p>Copyright © CRXHVRD 2026. All rights reserved.</p>
          <p>
            Website made by{' '}
            <a
              href="https://hrishiportv2.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-orange-500 hover:opacity-100"
            >
              <span className="group-hover:invisible transition-opacity duration-300">Hrishikesh</span>
              <span className="absolute left-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded">
                CyaINhxLL
              </span>
            </a>{' '}
            with love
          </p>
        </div>
      )}

      {/* Mobile in-flow attribution — also hidden on docs/devblog */}
      {!isHiddenRoute && (
        <div className="md:hidden px-4 pt-6 pb-24 text-center text-[11px] text-white opacity-60 space-y-1">
          <p>
            Business proposals:{' '}
            <a href="mailto:crxhvrd@proton.me" className="text-orange-500">
              crxhvrd@proton.me
            </a>
          </p>
          <p>Copyright © CRXHVRD 2026. All rights reserved.</p>
        </div>
      )}
    </>
  );
}
