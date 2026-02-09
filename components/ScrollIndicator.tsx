'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function ScrollIndicator() {
    const [isVisible, setIsVisible] = useState(true);
    const pathname = usePathname();

    // Hide on docs page
    const isDocsPage = pathname === '/docs';

    useEffect(() => {
        const handleScroll = () => {
            // Hide after scrolling down 100px
            setIsVisible(window.scrollY < 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Don't render on docs page
    if (isDocsPage) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-32 sm:bottom-24 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none"
                >
                    <span className="text-white/70 text-base sm:text-sm font-medium tracking-wide text-center px-4">
                        Scroll down to see screenshots
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        <ChevronDown className="w-8 h-8 sm:w-6 sm:h-6 text-white/70" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
