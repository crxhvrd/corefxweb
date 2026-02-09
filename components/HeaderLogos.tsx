'use client';

import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';

export default function HeaderLogos() {
    const pathname = usePathname();

    // Hide logos on docs page
    if (pathname === '/docs') return null;

    return (
        <div className="fixed top-0 left-0 w-full z-50">
            <div className="mx-auto px-4 sm:px-8 py-6 sm:py-8 flex justify-between items-center">
                <Logo
                    imageUrl="/images/Beta.png"
                    alt="Animated Logo"
                    width={64}
                    height={64}
                    circle={true}
                    className="sm:w-12 sm:h-12"
                />

                {/* Static Logo */}
                <Logo
                    imageUrl="https://i.imgur.com/Awl16fH.png"
                    alt="Static Logo"
                    width={96}
                    height={96}
                    className="rounded sm:w-[72px] sm:h-[72px]"
                />
            </div>
        </div>
    );
}
