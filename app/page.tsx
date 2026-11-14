import Hero from '@/components/home/Hero';
import LatestPosts from '@/components/home/LatestPosts';
import FeatureShowcase from '@/components/home/FeatureShowcase';
import Gallery from '@/components/home/Gallery';
import About from '@/components/home/About';
import VideoBackground from '@/components/VideoBackground';

export default function Home() {
  return (
    <main className="relative">
      <div className="fixed inset-0 z-0">
        <VideoBackground />
      </div>
      <Hero />
      <div className="relative bg-[#0a0a0a]">
        <LatestPosts />
        <FeatureShowcase />
        <Gallery />
        <About />
      </div>
    </main>
  );
}
