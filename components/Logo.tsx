import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  imageUrl: string;
  alt: string;
  width?: number;
  height?: number;
  circle?: boolean;
  className?: string;
}

export default function Logo({
  imageUrl,
  alt,
  width = 64,
  height = 64,
  circle = false,
  className = '',
}: LogoProps) {
  return (
    <Link
      href="/"
    >
      <div
        className={`
          ${circle ? 'w-16 h-16 rounded-full overflow-hidden' : ''}
          flex items-center justify-center
        `}
      >
        <Image
          src={imageUrl}
          alt={alt}
          width={width}
          height={height}
          className={`object-cover object-center ${className}`}
        />
      </div>
    </Link>
  );
}
