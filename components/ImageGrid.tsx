'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ImageModal from './ImageModal';

const images = [
  { id: 1, src: '/images/screenshots/3240220_20260208204541_1.jpg', alt: 'CoreFX Screenshot' },
  { id: 2, src: '/images/screenshots/GTA5_Enhanced_2026-02-08_13-01-11_078.jpg', alt: 'CoreFX Screenshot' },
  { id: 3, src: '/images/screenshots/3240220_20260209183346_1.jpg', alt: 'CoreFX Screenshot' }, // New Batch 2
  { id: 4, src: '/images/screenshots/3240220_20260208210100_1.jpg', alt: 'CoreFX Screenshot' },
  { id: 5, src: '/images/screenshots/3240220_20260209174016_1.jpg', alt: 'CoreFX Screenshot' },
  { id: 6, src: '/images/screenshots/3240220_20260208203346_1.jpg', alt: 'CoreFX Screenshot' },
  { id: 7, src: '/images/screenshots/3240220_20260208214801_1.jpg', alt: 'CoreFX Screenshot' },
  { id: 8, src: '/images/screenshots/3240220_20260208211533_1.jpg', alt: 'CoreFX Screenshot' },
  { id: 9, src: '/images/screenshots/3240220_20260208205249_1.jpg', alt: 'CoreFX Screenshot' },
  { id: 10, src: '/images/screenshots/3240220_20260208202725_1.jpg', alt: 'CoreFX Screenshot' },
  { id: 11, src: '/images/screenshots/3240220_20260209174232_1.jpg', alt: 'CoreFX Screenshot' },
  { id: 12, src: '/images/screenshots/3240220_20260208210507_1.jpg', alt: 'CoreFX Screenshot' },
  { id: 13, src: '/images/screenshots/GTA5_Enhanced_2026-02-08_13-22-33_545.jpg', alt: 'CoreFX Screenshot' },
  { id: 14, src: '/images/screenshots/3240220_20260208204339_1.jpg', alt: 'CoreFX Screenshot' },
  { id: 15, src: '/images/screenshots/3240220_20260209183522_1.jpg', alt: 'CoreFX Screenshot' }, // New Batch 2
  { id: 16, src: '/images/screenshots/3240220_20260208211115_1.jpg', alt: 'CoreFX Screenshot' },
  { id: 17, src: '/images/screenshots/3240220_20260208210008_1.jpg', alt: 'CoreFX Screenshot' },
  { id: 18, src: '/images/screenshots/3240220_20260208203122_1.jpg', alt: 'CoreFX Screenshot' },
  { id: 19, src: '/images/screenshots/3240220_20260209173749_1.jpg', alt: 'CoreFX Screenshot' },
  { id: 20, src: '/images/screenshots/3240220_20260208212330_1.jpg', alt: 'CoreFX Screenshot' },
  { id: 21, src: '/images/screenshots/3240220_20260208210710_1.jpg', alt: 'CoreFX Screenshot' },
  { id: 22, src: '/images/screenshots/3240220_20260208204909_1.jpg', alt: 'CoreFX Screenshot' },
  { id: 23, src: '/images/screenshots/3240220_20260209184019_1.jpg', alt: 'CoreFX Screenshot' }, // New Batch 2
  { id: 24, src: '/images/screenshots/3240220_20260208211447_1.jpg', alt: 'CoreFX Screenshot' },
  { id: 25, src: '/images/screenshots/3240220_20260208205418_1.jpg', alt: 'CoreFX Screenshot' },
  { id: 26, src: '/images/screenshots/3240220_20260208202914_1.jpg', alt: 'CoreFX Screenshot' },
  { id: 27, src: '/images/screenshots/3240220_20260208203631_1.jpg', alt: 'CoreFX Screenshot' },
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
            className="fade-item opacity-0 translate-y-10 transition-all duration-700 ease-out cursor-pointer hover:scale-[1.02] transform"
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
          </div>
        ))}
      </div>

      {selectedImage && (
        <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </>
  );
}
