import HeroIntro from '@/components/HeroIntro';
import ImageGrid from '@/components/ImageGrid';

export default function Home() {
  return (
    <main className="relative min-h-screen scrollbar-hide">
      {/* Hero copy, centered in the first viewport */}
      <HeroIntro />

      {/* Scrollable Content */}
      <div className="relative pt-screen">
        <ImageGrid />
      </div>
    </main>
  );
}
