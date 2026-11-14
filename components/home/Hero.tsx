import { ChevronDown } from 'lucide-react';
import HeroIntro from '@/components/HeroIntro';
import type { Ui } from '@/lib/content';

export default function Hero({ t }: { t: Ui['hero'] }) {
    return (
        <section className="relative h-screen">
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
            <HeroIntro credit={t.credit} name={t.name} line={t.line} parts={t.parts} />
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
