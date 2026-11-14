import Link from 'next/link';

export const metadata = {
  title: '404',
  description: 'This page got lost in the fog volumetrics.',
};

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 py-24">
      <div className="max-w-lg w-full text-center space-y-6">
        <h1 className="font-mono text-6xl sm:text-7xl text-white/90 leading-none">
          404
        </h1>
        <p className="text-white/70 text-sm sm:text-base">
          This page got lost in the fog volumetrics.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href="/"
            className="px-4 py-2 rounded-md border border-white/30 text-white text-sm hover:border-white/70 transition-colors"
          >
            Back home
          </Link>
          <Link
            href="/docs/prerequisites"
            className="px-4 py-2 rounded-md border border-white/10 text-white/70 text-sm hover:text-white transition-colors"
          >
            Documentation
          </Link>
        </div>
      </div>
    </main>
  );
}
