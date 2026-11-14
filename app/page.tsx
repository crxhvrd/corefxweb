import Hero from '@/components/home/Hero';
import LatestPosts, { type Post } from '@/components/home/LatestPosts';
import allPosts from '@/data/devblog-posts.json';
import FeatureShowcase from '@/components/home/FeatureShowcase';
import Gallery from '@/components/home/Gallery';
import About from '@/components/home/About';
import OtherWork from '@/components/home/OtherWork';
import VideoBackground from '@/components/VideoBackground';
import FilmGrain from '@/components/home/FilmGrain';

// Picked at build time so the browser never downloads the whole log; the section
// refreshes itself from the live feed after load.
const latest = (allPosts as Post[])
  .slice()
  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  .slice(0, 5)
  .map(({ id, timestamp, content, attachments }) => ({ id, timestamp, content, attachments }));

export default function Home() {
  return (
    <main className="relative">
      <div className="fixed inset-0 z-0">
        <VideoBackground />
      </div>
      <Hero />
      <div className="relative overflow-x-clip bg-[#0a0a0a]">
        <FilmGrain />
        <LatestPosts initial={latest} />
        <FeatureShowcase />
        <Gallery />
        <About />
        <OtherWork />
      </div>
    </main>
  );
}
