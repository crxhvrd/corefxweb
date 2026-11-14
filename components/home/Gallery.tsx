'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { images } from '@/data/gallery';

type Filter = 'All' | 'Enhanced' | 'Legacy';
const FILTERS: Filter[] = ['All', 'Enhanced', 'Legacy'];
const STEP = 12;

const gameOf = (version: string) => (version.includes('Legacy') ? 'Legacy' : 'Enhanced');

export default function Gallery() {
    const [filter, setFilter] = useState<Filter>('All');
    const [shown, setShown] = useState(STEP);
    const [open, setOpen] = useState<number | null>(null);
    const touchX = useRef<number | null>(null);

    const list = useMemo(
        () => images.filter((i) => filter === 'All' || gameOf(i.version) === filter),
        [filter]
    );

    const go = useCallback(
        (d: number) => setOpen((o) => (o === null ? o : (o + d + list.length) % list.length)),
        [list.length]
    );

    useEffect(() => {
        if (open === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(null);
            if (e.key === 'ArrowRight') go(1);
            if (e.key === 'ArrowLeft') go(-1);
        };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [open, go]);

    const current = open === null ? null : list[open];

    return (
        <section id="gallery" className="relative scroll-mt-20 py-24 sm:py-28 border-t border-white/5">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
                    <div>
                        <p className="font-mono text-xs text-white/40 mb-3">gallery</p>
                        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">Shots from the game</h2>
                    </div>
                    <div className="flex gap-2 self-start sm:self-auto">
                        {FILTERS.map((f) => (
                            <button
                                key={f}
                                type="button"
                                aria-pressed={filter === f}
                                onClick={() => {
                                    setFilter(f);
                                    setShown(STEP);
                                }}
                                className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${filter === f ? 'border-white/40 text-white' : 'border-white/10 text-white/60 hover:text-white'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid gap-2 sm:gap-3 grid-cols-2 lg:grid-cols-3">
                    {list.slice(0, shown).map((img, n) => (
                        <button
                            key={img.id}
                            type="button"
                            onClick={() => setOpen(n)}
                            className="group relative aspect-video overflow-hidden rounded-lg bg-white/5"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={img.src}
                                alt={img.alt}
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                            />
                            <span className="absolute left-2 bottom-2 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[10px] text-white/75 backdrop-blur-sm">
                                {img.version}
                            </span>
                        </button>
                    ))}
                </div>

                {shown < list.length && (
                    <div className="mt-8">
                        <button
                            type="button"
                            onClick={() => setShown((s) => s + STEP)}
                            className="rounded-md border border-white/15 hover:border-white/40 px-4 py-2 text-sm text-white/80 hover:text-white transition-colors"
                        >
                            Show more ({list.length - shown} left)
                        </button>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {current && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
                        onClick={() => setOpen(null)}
                        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
                        onTouchEnd={(e) => {
                            if (touchX.current === null) return;
                            const dx = e.changedTouches[0].clientX - touchX.current;
                            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
                            touchX.current = null;
                        }}
                        role="dialog"
                        aria-modal="true"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            key={current.src}
                            src={current.src}
                            alt={current.alt}
                            className="max-h-[88vh] max-w-[94vw] object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-white/60">
                            {current.version} · {(open ?? 0) + 1} / {list.length}
                        </p>
                        <button type="button" aria-label="Close" className="absolute top-4 right-4 p-2 text-white/70 hover:text-white" onClick={() => setOpen(null)}>
                            <X className="w-6 h-6" />
                        </button>
                        <button
                            type="button"
                            aria-label="Previous"
                            className="absolute left-2 sm:left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white hidden sm:block"
                            onClick={(e) => {
                                e.stopPropagation();
                                go(-1);
                            }}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            type="button"
                            aria-label="Next"
                            className="absolute right-2 sm:right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white hidden sm:block"
                            onClick={(e) => {
                                e.stopPropagation();
                                go(1);
                            }}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
