'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ImageModal from './ImageModal';

// Component to display screenshots in a responsive grid

const images = [
  { id: 1, src: '/images/screenshots/3240220_20260208204541_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 2, src: '/images/screenshots/GTA5_Enhanced_2026-02-08_13-01-11_078.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 28, src: '/images/screenshots/271590_20260212134107_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Legacy' },
  { id: 53, src: '/images/screenshots/3240220_20260217041142_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 3, src: '/images/screenshots/3240220_20260209183346_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 4, src: '/images/screenshots/3240220_20260208210100_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 50, src: '/images/screenshots/271590_20260215050208_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Legacy' },
  { id: 38, src: '/images/screenshots/271590_20260212145618_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Legacy' },
  { id: 5, src: '/images/screenshots/3240220_20260209174016_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 29, src: '/images/screenshots/271590_20260212134236_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Legacy' },
  { id: 54, src: '/images/screenshots/3240220_20260217042136_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 6, src: '/images/screenshots/3240220_20260208203346_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 7, src: '/images/screenshots/3240220_20260208214801_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 30, src: '/images/screenshots/271590_20260212134815_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Legacy' },
  { id: 8, src: '/images/screenshots/3240220_20260208211533_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 9, src: '/images/screenshots/3240220_20260208205249_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 55, src: '/images/screenshots/3240220_20260217054216_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 10, src: '/images/screenshots/3240220_20260208202725_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 31, src: '/images/screenshots/271590_20260212135641_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Legacy' },
  { id: 11, src: '/images/screenshots/3240220_20260209174232_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 12, src: '/images/screenshots/3240220_20260208210507_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 56, src: '/images/screenshots/3240220_20260218023032_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 51, src: '/images/screenshots/271590_20260215051205_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Legacy' },
  { id: 32, src: '/images/screenshots/271590_20260212140019_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Legacy' },
  { id: 13, src: '/images/screenshots/GTA5_Enhanced_2026-02-08_13-22-33_545.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 14, src: '/images/screenshots/3240220_20260208204339_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 15, src: '/images/screenshots/3240220_20260209183522_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 57, src: '/images/screenshots/3240220_20260218024329_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 39, src: '/images/screenshots/271590_20260212145651_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Legacy' },
  { id: 33, src: '/images/screenshots/271590_20260212140139_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Legacy' },
  { id: 16, src: '/images/screenshots/3240220_20260208211115_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 17, src: '/images/screenshots/3240220_20260208210008_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 58, src: '/images/screenshots/3240220_20260218153710_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 34, src: '/images/screenshots/271590_20260212140712_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Legacy' },
  { id: 18, src: '/images/screenshots/3240220_20260208203122_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 19, src: '/images/screenshots/3240220_20260209173749_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 20, src: '/images/screenshots/3240220_20260208212330_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 59, src: '/images/screenshots/3240220_20260218164616_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 35, src: '/images/screenshots/271590_20260212141736_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Legacy' },
  { id: 21, src: '/images/screenshots/3240220_20260208210710_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 22, src: '/images/screenshots/3240220_20260208204909_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 52, src: '/images/screenshots/271590_20260215051743_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Legacy' },
  { id: 23, src: '/images/screenshots/3240220_20260209184019_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 60, src: '/images/screenshots/3240220_20260218174006_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 36, src: '/images/screenshots/271590_20260212142928_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Legacy' },
  { id: 24, src: '/images/screenshots/3240220_20260208211447_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 25, src: '/images/screenshots/3240220_20260208205418_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 26, src: '/images/screenshots/3240220_20260208202914_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 61, src: '/images/screenshots/3240220_20260218174340_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 27, src: '/images/screenshots/3240220_20260208203631_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Enhanced' },
  { id: 37, src: '/images/screenshots/271590_20260212143313_1.jpg', alt: 'CoreFX Screenshot', version: 'CoreFX 1.2 Legacy' },
];

export default function ImageGrid() {
  const [selectedImage, setSelectedImage] = useState<null | typeof images[0]>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = gridRef.current?.querySelectorAll('.fade-item');
    if (!items) return;

    const animatedSet = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedSet.has(entry.target)) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            animatedSet.add(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
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
            style={{ transitionDelay: `${i * 75}ms` }}
            onClick={() => setSelectedImage(img)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={500}
              height={500}
              className="w-full h-auto rounded-lg shadow-md"
              loading="lazy"
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
