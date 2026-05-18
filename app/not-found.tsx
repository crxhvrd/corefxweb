import Link from 'next/link';

export const metadata = {
  title: '404 · CoreFX',
  description: 'This page got lost in the fog volumetrics.',
};

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 py-24">
      <div className="bg-black/30 border border-white/10 backdrop-blur-md rounded-2xl px-8 py-10 sm:px-12 sm:py-14 max-w-lg w-full text-center space-y-6 shadow-xl">
        <h1 className="text-7xl sm:text-8xl font-semibold text-white tracking-tight leading-none">
          404
        </h1>
        <p className="text-white/70 text-sm sm:text-base">
          This page got lost in the fog volumetrics.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
          >
            Back home
          </Link>
          <Link
            href="/docs/prerequisites"
            className="px-5 py-2.5 rounded-full bg-white/10 border border-white/15 text-white text-sm font-medium hover:bg-white/20 transition-colors"
          >
            Documentation
          </Link>
        </div>
      </div>
    </main>
  );
}
