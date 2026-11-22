'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function VideoBackground() {
  const [blur, setBlur] = useState(0);
  // The loop opens on a fade from black, so a poster would flash before it: shown only where autoplay is refused.
  const [showPoster, setShowPoster] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pathname = usePathname();
  const enableScrollBlur = pathname === '/';

  useEffect(() => {
    videoRef.current?.play()?.catch((error: DOMException) => {
      if (error.name === 'NotAllowedError') setShowPoster(true);
    });
  }, []);

  useEffect(() => {
    if (!enableScrollBlur) {
      setBlur(0);
      return;
    }

    let rafId = 0;
    let ticking = false;

    const update = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const blurStart = viewportHeight * 0.1;
      const blurEnd = viewportHeight * 0.5;

      let next: number;
      if (scrollY < blurStart) next = 0;
      else if (scrollY > blurEnd) next = 10;
      else next = ((scrollY - blurStart) / (blurEnd - blurStart)) * 10;

      setBlur((prev) => (Math.abs(prev - next) < 0.25 ? prev : next));
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [enableScrollBlur]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div
        className="absolute inset-0 bg-black/10 z-10"
        style={{
          backdropFilter: blur > 0 ? `blur(${blur}px)` : undefined,
          WebkitBackdropFilter: blur > 0 ? `blur(${blur}px)` : undefined,
        }}
      ></div>

      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={showPoster ? '/videos/corefx-poster.jpg' : undefined}
        className="absolute w-full h-full object-cover z-0"
      >
        <source src="/videos/corefx-loop-720.mp4" type='video/mp4; codecs="avc1.64001f"' media="(max-width: 767px)" />
        <source src="/videos/corefx-loop-1080.av1.mp4" type='video/mp4; codecs="av01.0.08M.08"' />
        <source src="/videos/corefx-loop-1080.mp4" type='video/mp4; codecs="avc1.640028"' />
      </video>
    </div>
  );
}
