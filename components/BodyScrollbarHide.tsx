'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function BodyScrollbarHide() {
    const pathname = usePathname();

    useEffect(() => {
        // Hide scrollbar on homepage only
        if (pathname === '/') {
            document.documentElement.classList.add('scrollbar-hide');
            document.body.classList.add('scrollbar-hide');
        } else {
            document.documentElement.classList.remove('scrollbar-hide');
            document.body.classList.remove('scrollbar-hide');
        }

        return () => {
            document.documentElement.classList.remove('scrollbar-hide');
            document.body.classList.remove('scrollbar-hide');
        };
    }, [pathname]);

    return null;
}
