import { ChevronDown } from 'lucide-react';
import HeroIntro from '@/components/HeroIntro';

export default function Hero() {
    return (
        <section className="relative h-screen">
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
            <HeroIntro />
            <a
                href="#log"
                aria-label="Scroll down"
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/40 hover:text-white/80 transition-colors"
            >
                <ChevronDown className="w-6 h-6" />
            </a>
        </section>
    );
}
