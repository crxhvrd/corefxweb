'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import CompareSlider from './CompareSlider';
import YouTubeEmbed from './YouTubeEmbed';
import AmbientGlow from './AmbientGlow';
import type { Ui } from '@/lib/content';

type WorkText = Ui['work'];
type Shot = { slug: string; start?: number };

// What each block shows. The words come from the page's language (content/<lang>/ui.json).
const blocks: ({ id: 'fxrt' | 'fxpt'; video: { id: string; title: string } } | { id: 'clouds' | 'smoke'; shots: Shot[] })[] = [
    { id: 'fxrt', video: { id: 'BHTFolPBJv8', title: 'Hardware Ray Tracing in GTA 5 Legacy' } },
    { id: 'fxpt', video: { id: '_s6VJoagbEk', title: 'Path Tracing in GTA 5 Enhanced' } },
    {
        id: 'clouds',
        shots: [{ slug: 'clouds_from_above', start: 38 }, { slug: 'clouds_cockpit' }, { slug: 'clouds_sunlight' }, { slug: 'clouds_reflections' }]
    },
    { id: 'smoke', shots: [{ slug: 'smoke_volume', start: 46 }] }
];

type Block = (typeof blocks)[number];
type ShotBlock = Extract<Block, { shots: Shot[] }>;

type ShotText = { before: string; after: string; shots: Record<string, { title: string; text: string }> };

function Comparison({ b, t, drag, i, setI }: { b: ShotBlock; t: ShotText; drag: string; i: number; setI: (n: number) => void }) {
    const shot = b.shots[i];
    const words = t.shots[shot.slug];

    return (
        <>
            <CompareSlider
                key={shot.slug}
                before={`/images/compare/${shot.slug}-before.webp`}
                after={`/images/compare/${shot.slug}-after.webp`}
                beforeLabel={t.before}
                afterLabel={t.after}
                alt={words.title}
                start={shot.start}
                dragLabel={drag}
            />
            <div className="mt-4 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">
                <div className="min-w-0 sm:flex-1">
                    <p className="font-medium text-white">{words.title}</p>
                    <p className="text-sm text-white/60">{words.text}</p>
                </div>
                {b.shots.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                        {b.shots.map((s, n) => (
                            <button
                                key={s.slug}
                                type="button"
                                onClick={() => setI(n)}
                                aria-label={t.shots[s.slug].title}
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

function FeatureBlock({ b, t, flip }: { b: Block; t: WorkText; flip: boolean }) {
    const [i, setI] = useState(0);
    const words = t.features[b.id];
    const glow = 'video' in b ? `https://i.ytimg.com/vi/${b.video.id}/hqdefault.jpg` : `/images/compare/${b.shots[i].slug}-after.webp`;

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
                    <p className="font-mono text-xs text-white/40 mb-3">{words.eyebrow}</p>
                    <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-4">{words.title}</h3>
                    <p className="text-white/70 leading-relaxed mb-4">{words.lead}</p>
                    <p className="text-sm text-white/45">{words.note}</p>
                </div>

                <div className={`min-w-0 lg:col-span-8 ${flip ? 'lg:order-1' : ''}`}>
                    {'video' in b ? (
                        <YouTubeEmbed id={b.video.id} title={b.video.title} playLabel={t.play} />
                    ) : (
                        <Comparison b={b} t={t.features[b.id] as ShotText} drag={t.drag} i={i} setI={setI} />
                    )}
                </div>
            </motion.div>
        </div>
    );
}

export default function FeatureShowcase({ t }: { t: WorkText }) {
    return (
        <section id="work" className="relative isolate scroll-mt-20 py-24 sm:py-28 border-t border-white/5">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="max-w-2xl mb-12">
                    <p className="font-mono text-xs text-white/40 mb-3">{t.label}</p>
                    <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">{t.title}</h2>
                </div>
                <div className="space-y-24 sm:space-y-28">
                    {blocks.map((b, n) => (
                        <FeatureBlock key={b.id} b={b} t={t} flip={n % 2 === 1} />
                    ))}
                </div>
            </div>
        </section>
    );
}
