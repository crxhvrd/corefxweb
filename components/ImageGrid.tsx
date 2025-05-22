'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ImageModal from './ImageModal';

const images = [
  { id: 1, src: 'https://i.imgur.com/YLDABwm.png', alt: 'Phoenix' },
  { id: 2, src: 'https://i.imgur.com/3Q6XNM4.png', alt: 'Porsche' },
  { id: 3, src: 'https://i.imgur.com/W4ohUlf.png', alt: '3liza' },
  { id: 4, src: 'https://i.imgur.com/sclszvM.png', alt: 'Abstract Art' },
  { id: 5, src: 'https://i.imgur.com/NcB8EqK.png', alt: 'Technology' },
  { id: 6, src: 'https://i.imgur.com/VV4vy6H.jpeg', alt: 'City Landscape' },
  { id: 7, src: 'https://i.imgur.com/YoSvkFF.jpeg', alt: 'Digital Art' },
  { id: 8, src: 'https://i.imgur.com/PgnkDDD.jpeg', alt: 'Modern Art' },
  { id: 9, src: 'https://i.imgur.com/AXAX7Hn.png', alt: 'Space Concept' },
  { id: 10, src: 'https://i.imgur.com/duroNMW.png', alt: 'Futuristic Design' },
  { id: 11, src: 'https://i.imgur.com/ARdJUj5.png', alt: 'Futuristic Design' },
  { id: 12, src: 'https://i.imgur.com/96xDRd6.png', alt: 'Futuristic Design' },
  { id: 13, src: 'https://i.imgur.com/dNPZ6sE.png', alt: 'Futuristic Design' },
  { id: 14, src: 'https://i.imgur.com/sclszvM.png', alt: 'Futuristic Design' },
  { id: 15, src: 'https://i.imgur.com/VV4vy6H.jpeg', alt: 'Futuristic Design' },
  { id: 16, src: 'https://i.imgur.com/YoSvkFF.jpeg', alt: 'Futuristic Design' },
  { id: 17, src: 'https://i.imgur.com/FDnano1.jpeg', alt: 'Futuristic Design' },
  { id: 18, src: 'https://i.imgur.com/PgnkDDD.jpeg', alt: 'Futuristic Design' },
  { id: 19, src: 'https://i.imgur.com/yt3BCSo.jpeg', alt: 'Futuristic Design' },
  { id: 20, src: 'https://i.imgur.com/CPQVBtC.jpeg', alt: 'Futuristic Design' },
  { id: 21, src: 'https://i.imgur.com/sZhTBjW.jpeg', alt: 'Futuristic Design' },
  { id: 22, src: 'https://i.imgur.com/CYy4wx6.jpeg', alt: 'Futuristic Design' },
  { id: 23, src: 'https://i.imgur.com/zbe6Kdj.png', alt: 'Futuristic Design' },
  { id: 24, src: 'https://i.imgur.com/pv5R1XJ.jpeg', alt: 'Futuristic Design' },
  { id: 25, src: 'https://i.imgur.com/5i0i3au.png', alt: 'Futuristic Design' },
];

export default function ImageGrid() {
  const [selectedImage, setSelectedImage] = useState<null | typeof images[0]>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = gridRef.current?.querySelectorAll('.fade-item');
    if (!items) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          } else {
            entry.target.classList.remove('opacity-100', 'translate-y-0');
            entry.target.classList.add('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={gridRef}
        className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 max-h-[80vh] overflow-y-auto"
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
