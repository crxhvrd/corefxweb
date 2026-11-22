import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import HeroIntro from '@/components/HeroIntro';
import type { Ui } from '@/lib/content';

export default function Hero({ t }: { t: Ui['hero'] }) {
    return (
        <section className="relative h-screen">
            {/* The footage has bright shots and flashes: keeps the menu and the text readable over all of them. */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
            {/* A real element, not part of the footage: object-cover crops the video differently on every screen. */}
            <div className="absolute inset-x-0 bottom-24 hidden md:block pointer-events-none">
                <div className="mx-auto max-w-7xl px-6 flex justify-end">
                    <Image src="/images/corefx-logo.webp" alt="" width={457} height={240} unoptimized loading="eager" className="w-24 lg:w-32 h-auto opacity-90" />
                </div>
            </div>
            <HeroIntro credit={t.credit} name={t.name} line={t.line} parts={t.parts} download={t.download} />
            <a
                href="#log"
                aria-label={t.scroll}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/40 hover:text-white/80 transition-colors"
            >
                <ChevronDown className="w-6 h-6" />
            </a>
        </section>
    );
}
