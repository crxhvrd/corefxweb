'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ImageModal from './ImageModal';

// Component to display screenshots in a responsive grid

const images = [
  { id: 1, src: '/images/screenshots/3240220_20260904135322_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.3.1 Enhanced' },
  { id: 2, src: '/images/screenshots/271590_20260212134107_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Legacy' },
  { id: 3, src: '/images/screenshots/3240220_20260904051400_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.3.1 Enhanced' },
  { id: 4, src: '/images/screenshots/271590_20260215050208_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Legacy' },
  { id: 5, src: '/images/screenshots/3240220_20260904134955_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.3.1 Enhanced' },
  { id: 6, src: '/images/screenshots/3240220_20260904043259_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.3.1 Enhanced' },
  { id: 7, src: '/images/screenshots/271590_20260212145618_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Legacy' },
  { id: 8, src: '/images/screenshots/3240220_20260904043910_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.3.1 Enhanced' },
  { id: 9, src: '/images/screenshots/3240220_20260904044417_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.3.1 Enhanced' },
  { id: 10, src: '/images/screenshots/271590_20260212134236_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Legacy' },
  { id: 11, src: '/images/screenshots/3240220_20260904044234_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.3.1 Enhanced' },
  { id: 12, src: '/images/screenshots/271590_20260212134815_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Legacy' },
  { id: 13, src: '/images/screenshots/3240220_20260904051801_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.3.1 Enhanced' },
  { id: 14, src: '/images/screenshots/3240220_20260904044612_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.3.1 Enhanced' },
  { id: 15, src: '/images/screenshots/271590_20260212135641_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Legacy' },
  { id: 16, src: '/images/screenshots/3240220_20260904042946_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.3.1 Enhanced' },
  { id: 17, src: '/images/screenshots/271590_20260215051205_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Legacy' },
  { id: 18, src: '/images/screenshots/3240220_20260904043504_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.3.1 Enhanced' },
  { id: 19, src: '/images/screenshots/3240220_20260904043601_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.3.1 Enhanced' },
  { id: 20, src: '/images/screenshots/271590_20260212140019_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Legacy' },
  { id: 21, src: '/images/screenshots/3240220_20260904051111_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.3.1 Enhanced' },
  { id: 22, src: '/images/screenshots/3240220_20260904135102_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.3.1 Enhanced' },
  { id: 23, src: '/images/screenshots/271590_20260212145651_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Legacy' },
  { id: 24, src: '/images/screenshots/3240220_20260904042739_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.3.1 Enhanced' },
  { id: 25, src: '/images/screenshots/271590_20260212140139_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Legacy' },
  { id: 26, src: '/images/screenshots/3240220_20260904041412_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.3.1 Enhanced' },
  { id: 27, src: '/images/screenshots/3240220_20260904044002_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.3.1 Enhanced' },
  { id: 28, src: '/images/screenshots/271590_20260212140712_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Legacy' },
  { id: 29, src: '/images/screenshots/3240220_20260904044715_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.3.1 Enhanced' },
  { id: 30, src: '/images/screenshots/271590_20260212141736_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Legacy' },
  { id: 31, src: '/images/screenshots/3240220_20260904051545_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.3.1 Enhanced' },
  { id: 32, src: '/images/screenshots/3240220_20260904043132_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.3.1 Enhanced' },
  { id: 33, src: '/images/screenshots/271590_20260215051743_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Legacy' },
  { id: 34, src: '/images/screenshots/3240220_20260904135704_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.3.1 Enhanced' },
  { id: 35, src: '/images/screenshots/3240220_20260904051235_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.3.1 Enhanced' },
  { id: 36, src: '/images/screenshots/271590_20260212142928_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Legacy' },
  { id: 37, src: '/images/screenshots/3240220_20260904041324_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.3.1 Enhanced' },
  { id: 38, src: '/images/screenshots/271590_20260212143313_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Legacy' },
  { id: 39, src: '/images/screenshots/3240220_20260904140045_1.webp', alt: 'CoreFX Screenshot', version: 'CoreFX 1.3.1 Enhanced' },
];

export default function ImageGrid() {
  const [selectedImage, setSelectedImage] = useState<null | typeof images[0]>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = gridRef.current?.querySelectorAll('.fade-item');
    if (!items) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add('opacity-100', 'translate-y-0');
            el.classList.remove('opacity-0', 'translate-y-10');
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px 200px 0px' }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 p-3 sm:p-4"
      >
        {images.map((img, i) => (
          <div
            key={img.id}
            className="fade-item relative opacity-0 translate-y-10 transition-all duration-700 ease-out cursor-pointer hover:scale-[1.02] transform"
            onClick={() => setSelectedImage(img)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={1920}
              height={1080}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full h-auto rounded-lg shadow-md"
              loading={i < 3 ? 'eager' : 'lazy'}
              priority={i < 3}
            />
            {img.version && (
              <span className="absolute bottom-2 left-2 px-2 py-0.5 text-[10px] sm:text-xs font-medium text-white/90 bg-black/50 backdrop-blur-sm rounded-md select-none pointer-events-none">
                {img.version}
              </span>
            )}
          </div>
        ))}
      </div>

      {selectedImage && (
        <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </>
  );
}
