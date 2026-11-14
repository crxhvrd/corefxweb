'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import CompareSlider from './CompareSlider';
import YouTubeEmbed from './YouTubeEmbed';
import AmbientGlow from './AmbientGlow';

type Shot = { slug: string; title: string; text: string; start?: number };

type Feature = {
    id: string;
    eyebrow: string;
    title: string;
    lead: string;
    note: string;
} & (
    | { video: { id: string; title: string } }
    | { beforeLabel: string; afterLabel: string; shots: Shot[] }
);

const features: Feature[] = [
    {
        id: 'fxrt',
        eyebrow: 'legacy',
        title: 'FXRT',
        lead:
            'Real ray tracing for GTA V Legacy, a game that never had it. The rays run against the actual scene, not just what is on screen, so sun and lamp shadows, ambient occlusion, bounce light and reflections hold up for everything the camera can’t see. Each part has its own switch.',
        note: 'Off by default. It needs a card with hardware ray tracing: RTX, or RX 6000 and newer.',
        video: { id: 'BHTFolPBJv8', title: 'Hardware Ray Tracing in GTA 5 Legacy' }
    },
    {
        id: 'fxpt',
        eyebrow: 'enhanced',
        title: 'FXPT',
        lead:
            'Our own path tracer for GTA V Enhanced. Light from the sun, the sky, lamps, signs and windows is traced and keeps bouncing, so the city is lit by what is actually in it. Reflections are path traced too.',
        note: 'Off by default. It is heavy: we made it for an RTX 5070 Ti or RX 9070 XT and up.',
        video: { id: '_s6VJoagbEk', title: 'Path Tracing in GTA 5 Enhanced' }
    },
    {
        id: 'clouds',
        eyebrow: 'legacy + enhanced',
        title: 'Clouds',
        lead:
            'Real 3D clouds, raymarched through the sky instead of painted onto it. They cast shadows, let godrays through and light up in storms. Each weather has its own, designed in CloudBuilder, a small app we wrote that ships with CoreFX so you can make your own.',
        note: 'The "off" side here is clouds switched off, not the game’s own sky.',
        beforeLabel: 'Clouds off',
        afterLabel: 'Clouds',
        shots: [
            { slug: 'clouds_from_above', title: 'Real 3D clouds', text: 'Shapes you can fly over and look down into.', start: 38 },
            { slug: 'clouds_cockpit', title: 'Real depth', text: 'Real volumes at real altitude, so the view from the cockpit has depth and scale.' },
            { slug: 'clouds_sunlight', title: 'Lit by the sun', text: 'Edges glow and the shaded sides fall away.' },
            { slug: 'clouds_reflections', title: 'In reflections', text: 'The same clouds show up in the sea, coloured by the time of day.' }
        ]
    },
    {
        id: 'smoke',
        eyebrow: 'legacy + enhanced',
        title: 'Smoke',
        lead:
            'Burnout smoke, and if you like exhaust, flares and fires too, as a live simulation instead of flat sprites. It drifts with the wind, wraps round the car and is lit through its own depth.',
        note: 'Off by default, and it only costs anything while there is smoke.',
        beforeLabel: 'Game sprites',
        afterLabel: 'Smoke',
        shots: [
            { slug: 'smoke_volume', title: 'Smoke as a real volume', text: 'It billows, drifts with the wind and is lit through its own depth.', start: 46 }
        ]
    }
];

function Comparison({ f, i, setI }: { f: Extract<Feature, { shots: Shot[] }>; i: number; setI: (n: number) => void }) {
    const shot = f.shots[i];

    return (
        <>
            <CompareSlider
                key={shot.slug}
                before={`/images/compare/${shot.slug}-before.webp`}
                after={`/images/compare/${shot.slug}-after.webp`}
                beforeLabel={f.beforeLabel}
                afterLabel={f.afterLabel}
                alt={shot.title}
                start={shot.start}
            />
            <div className="mt-4 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">
                <div className="min-w-0 sm:flex-1">
                    <p className="font-medium text-white">{shot.title}</p>
                    <p className="text-sm text-white/60">{shot.text}</p>
                </div>
                {f.shots.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                        {f.shots.map((s, n) => (
                            <button
                                key={s.slug}
                                type="button"
                                onClick={() => setI(n)}
                                aria-label={s.title}
                                aria-pressed={n === i}
                                className={`relative h-12 w-20 shrink-0 overflow-hidden rounded-md border transition ${n === i ? 'border-white/80' : 'border-white/10 opacity-50 hover:opacity-100'
                                    }`}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={`/images/compare/${s.slug}-after.webp`} alt="" className="h-full w-full object-cover" loading="lazy" />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

function FeatureBlock({ f, flip }: { f: Feature; flip: boolean }) {
    const [i, setI] = useState(0);
    const glow =
        'video' in f
            ? `https://i.ytimg.com/vi/${f.video.id}/hqdefault.jpg`
            : `/images/compare/${f.shots[i].slug}-after.webp`;

    return (
        <div className="relative">
        <AmbientGlow src={glow} />
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-5% 0px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-8 lg:gap-12 lg:grid-cols-12 items-center"
        >
            <div className={`min-w-0 lg:col-span-4 ${flip ? 'lg:order-2' : ''}`}>
                <p className="font-mono text-xs text-white/40 mb-3">{f.eyebrow}</p>
                <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-4">{f.title}</h3>
                <p className="text-white/70 leading-relaxed mb-4">{f.lead}</p>
                <p className="text-sm text-white/45">{f.note}</p>
            </div>

            <div className={`min-w-0 lg:col-span-8 ${flip ? 'lg:order-1' : ''}`}>
                {'video' in f ? <YouTubeEmbed id={f.video.id} title={f.video.title} /> : <Comparison f={f} i={i} setI={setI} />}
            </div>
        </motion.div>
        </div>
    );
}

export default function FeatureShowcase() {
    return (
        <section id="work" className="relative isolate scroll-mt-20 py-24 sm:py-28 border-t border-white/5">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="max-w-2xl mb-12">
                    <p className="font-mono text-xs text-white/40 mb-3">work</p>
                    <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">What we&apos;ve built</h2>
                </div>
                <div className="space-y-24 sm:space-y-28">
                    {features.map((f, n) => (
                        <FeatureBlock key={f.id} f={f} flip={n % 2 === 1} />
                    ))}
                </div>
            </div>
        </section>
    );
}
