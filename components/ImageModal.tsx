'use client';

import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import { X } from 'lucide-react';

interface Props {
  image: {
    src: string;
    alt: string;
  };
  onClose: () => void;
}

export default function ImageModal({ image, onClose }: Props) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';

    const img = new window.Image();
    img.src = image.src;
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      const maxWidth = window.innerWidth * 0.9;
      const maxHeight = window.innerHeight * 0.9;
      let width = maxWidth;
      let height = width / aspectRatio;

      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
      }

      setDimensions({ width, height });
    };

    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = 'auto';
    };
  }, [image, onClose]);

  if (!dimensions.width || !dimensions.height) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur animate-fadeIn"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative animate-fadeIn"
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <Image
          src={image.src}
          alt={image.alt}
          width={dimensions.width}
          height={dimensions.height}
          className="rounded-xl shadow-xl object-contain"
          quality={100}
          priority
        />
      </div>
    </div>,
    document.body
  );
}
