'use client';

import { useEffect, useState } from 'react';

export default function VideoBackground() {
  const [blur, setBlur] = useState(0);

  useEffect(() => {
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
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-black/10 z-10"
        style={{
          backdropFilter: blur > 0 ? `blur(${blur}px)` : undefined,
          WebkitBackdropFilter: blur > 0 ? `blur(${blur}px)` : undefined,
        }}
      ></div>

      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/videos/corefx-poster.jpg"
        className="absolute w-full h-full object-cover z-0"
        style={{ filter: 'brightness(1.15)' }}
      >
        <source src="/videos/corefx.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
