import ImageGrid from '@/components/ImageGrid';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Hero Copy */}
      <section className="relative z-10 px-4 sm:px-8 pt-32 pb-16 max-w-3xl mx-auto">
        <div className="backdrop-blur-md bg-black/50 rounded-2xl border border-white/10 p-6 sm:p-8 shadow-xl">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">CoreFX Graphics Overhaul</h1>
          <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed">
            CoreFX reimagines Los Santos with cinematic lighting, hand-tuned weather systems, and ultra crisp
            texture passes designed for modern hardware. From neon-soaked city nights to sunlit desert drives,
            every preset is calibrated for high fidelity without sacrificing performance. Dive into curated
            visual profiles, optional color grades, and modular add-ons that let you tailor the experience to
            your rig.
          </p>
          <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed">
            Built by enthusiasts for enthusiasts, the mod integrates seamlessly with popular ENB and ReShade
            pipelines, keeping installation painless while leaving room for creators to experiment. Discover
            the possibilities below and see how CoreFX transforms every frame into a screenshot-worthy moment.
          </p>
        </div>
      </section>

      {/* Scrollable Content */}
      <div className="relative pt-screen">
        <ImageGrid />
      </div>
    </main>
  );
}