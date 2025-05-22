'use client';

import { useEffect, useRef, useState } from 'react';

export default function VideoBackground() {
  const [blur, setBlur] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const blurStart = viewportHeight * 0.1;
      const blurEnd = viewportHeight * 0.5;

      if (scrollY < blurStart) {
        setBlur(0);
      } else if (scrollY > blurEnd) {
        setBlur(10);
      } else {
        const blurAmount = ((scrollY - blurStart) / (blurEnd - blurStart)) * 10;
        setBlur(blurAmount);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/30 z-10"
        style={{ backdropFilter: `blur(${blur}px)` }}
      ></div>

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover"
      >
        <source 
          src="/video/timelapse.mp4" 
          type="video/mp4"
        />
      </video>
    </div>
  );
}
