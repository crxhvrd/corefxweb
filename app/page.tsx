import ImageGrid from '@/components/ImageGrid';

export default function Home() {
  return (
    <main className="relative min-h-screen scrollbar-hide">
      {/* Scrollable Content */}
      <div className="relative pt-screen">
        <ImageGrid />
      </div>
    </main>
  );
}