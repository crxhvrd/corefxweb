'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function BodyScrollbarHide() {
    const pathname = usePathname();

    useEffect(() => {
        // Hide scrollbar on homepage only
        if (pathname === '/') {
            document.body.classList.add('scrollbar-hide');
        } else {
            document.body.classList.remove('scrollbar-hide');
        }

        return () => {
            document.body.classList.remove('scrollbar-hide');
        };
    }, [pathname]);

    return null;
}
