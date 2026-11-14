import Hero from '@/components/home/Hero';
import LatestPosts, { type Post } from '@/components/home/LatestPosts';
import FeatureShowcase from '@/components/home/FeatureShowcase';
import Gallery from '@/components/home/Gallery';
import About from '@/components/home/About';
import OtherWork from '@/components/home/OtherWork';
import FilmGrain from '@/components/home/FilmGrain';
import VideoBackground from '@/components/VideoBackground';
import allPosts from '@/data/devblog-posts.json';
import { getUi } from '@/lib/content';
import type { Locale } from '@/lib/i18n';

// Picked at build time so the browser never downloads the whole log; the section
// refreshes itself from the live feed after load.
const latest = (allPosts as Post[])
    .slice()
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5)
    .map(({ id, timestamp, content, attachments }) => ({ id, timestamp, content, attachments }));

export default function HomePage({ locale }: { locale: Locale }) {
    const t = getUi(locale);
    return (
        <main className="relative">
            <div className="fixed inset-0 z-0">
                <VideoBackground />
            </div>
            <Hero t={t.hero} />
            <div className="relative overflow-x-clip bg-[#0a0a0a]">
                <FilmGrain />
                <LatestPosts initial={latest} t={t.log} locale={locale} />
                <FeatureShowcase t={t.work} />
                <Gallery t={t.gallery} />
                <About t={t.about} locale={locale} />
                <OtherWork t={t.other} />
            </div>
        </main>
    );
}
