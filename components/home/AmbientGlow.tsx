// A blurred, dimmed copy of a section's own picture behind it, like an ambient light
// spilling into the dark around a screen. Decorative only: never drawn over the shots
// or the text. The nearest `isolate` ancestor decides what it sits behind.
const FADE = 'radial-gradient(ellipse 50% 50% at 50% 50%, black 25%, transparent 100%)';

export default function AmbientGlow({ src, strength = 0.35 }: { src?: string; strength?: number }) {
    if (!src) return null;

    return (
        <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-40 -inset-y-32 -z-10"
            style={{ maskImage: FADE, WebkitMaskImage: FADE }}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                key={src}
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                className="ambient-in h-full w-full object-cover blur-[100px] saturate-[1.5]"
                style={{ opacity: strength }}
            />
        </div>
    );
}
