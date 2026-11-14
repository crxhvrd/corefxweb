'use client';

import { useCallback, useRef, useState } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

type Props = {
    before: string;
    after: string;
    beforeLabel: string;
    afterLabel: string;
    alt: string;
    start?: number;
};

export default function CompareSlider({ before, after, beforeLabel, afterLabel, alt, start = 50 }: Props) {
    const [pos, setPos] = useState(start);
    const boxRef = useRef<HTMLDivElement>(null);
    const dragging = useRef(false);

    const moveTo = useCallback((clientX: number) => {
        const box = boxRef.current?.getBoundingClientRect();
        if (!box) return;
        const p = ((clientX - box.left) / box.width) * 100;
        setPos(Math.min(100, Math.max(0, p)));
    }, []);

    return (
        <div
            ref={boxRef}
            className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black select-none touch-pan-y cursor-ew-resize"
            onPointerDown={(e) => {
                dragging.current = true;
                (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
                moveTo(e.clientX);
            }}
            onPointerMove={(e) => dragging.current && moveTo(e.clientX)}
            onPointerUp={() => (dragging.current = false)}
            onPointerCancel={() => (dragging.current = false)}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={after} alt={`${alt} — ${afterLabel}`} className="absolute inset-0 h-full w-full object-cover" draggable={false} loading="lazy" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={before}
                alt={`${alt} — ${beforeLabel}`}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
                draggable={false}
                loading="lazy"
            />

            <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white/85 backdrop-blur-sm">
                {beforeLabel}
            </span>
            <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-black">
                {afterLabel}
            </span>

            <div className="absolute inset-y-0 w-0.5 bg-white/90 pointer-events-none" style={{ left: `${pos}%` }}>
                <div
                    role="slider"
                    tabIndex={0}
                    aria-label="Drag to compare"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(pos)}
                    onKeyDown={(e) => {
                        if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 5));
                        if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 5));
                    }}
                    className="pointer-events-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                    <ChevronsLeftRight className="h-5 w-5" />
                </div>
            </div>
        </div>
    );
}
