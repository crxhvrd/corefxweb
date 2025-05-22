'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import ImageModal from './ImageModal';

interface ImageItemProps {
  image: {
    id: number;
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

export default function ImageItem({ image }: ImageItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  });
  
  return (
    <>
      <div 
        ref={ref}
        className={`relative rounded-xl overflow-hidden shadow-md mb-4 transition-all duration-700 transform ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowModal(true)}
      >
        <div className={`
          relative transition-all duration-300 ease-out transform cursor-pointer group
          ${isHovered ? 'scale-105 z-10' : 'scale-100 z-0'}
        `}>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="w-full h-auto"
          />
          
          <div className={`
            absolute inset-0 bg-gradient-to-t from-black/80 to-transparent
            flex items-end p-4 transition-all duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}>
            <p className="text-white font-medium group-hover:translate-y-0 translate-y-2 transition-transform duration-300">{image.alt}</p>
          </div>
        </div>
      </div>

      {showModal && (
        <ImageModal
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}