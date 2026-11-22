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
