'use client';

import { useEffect, useMemo, useState } from 'react';

type Segment = { text: string; className?: string };

const EM = 'text-white';

const NAME_CLASS = 'block font-semibold text-white text-[2.1em] leading-[0.9] tracking-[-0.03em] mb-3';
const LINE_CLASS = 'text-white/75';

/** Names that must never break across lines, in any language. */
function keepTogether(text: string) {
    return text.replace(/Grand Theft Auto V|GTA V/g, (m) => m.replace(/ /g, '\u00a0'));
}

/** "*word*" marks the words drawn brighter; everything else is plain. */
function toSegments(text: string): Segment[] {
    return keepTogether(text)
        .split(/(\*[^*]+\*)/)
        .filter(Boolean)
        .map((s) => (s.startsWith('*') && s.endsWith('*') ? { text: s.slice(1, -1), className: EM } : { text: s }));
}

const HEADLINE_CLASS = 'hero-headline font-normal leading-snug tracking-tight text-white';
const BODY_CLASS = 'hero-sub leading-relaxed text-white/60';

const TIMING = {
    /** quiet beat before anything is typed */
    start: 400,
    /** average ms per character */
    headlineSpeed: 34,
    bodySpeed: 24,
    /** how long a finished part stays up before it is wiped */
    hold: 10000,
    /** the pause between the erase finishing and the next part starting */
    betweenParts: 520,
    /** after the last part: the beat before the headline goes too, then how long the hero stays empty */
    beforeWipe: 600,
    gap: 30000,
    /** backspace held down: the press, then the repeat delay, then the ramp to full speed */
    pressDown: 430,
    repeatDelay: 240,
    repeatSlow: 52,
    repeatFast: 13,
    repeatRamp: 12,
};

const flatten = (segments: Segment[]) => Array.from(segments.map((s) => s.text).join(''));

/** Delay after `typed`, so the rhythm lands somewhere near a person at a keyboard. */
function typeDelay(typed: string, before: string | undefined, base: number) {
    let delay = base * (0.6 + Math.random() * 0.9);

    // a hand hesitates slightly at the start of a word, and rests on punctuation
    if (before === ' ' || before === '\u00a0') delay *= 1.25;
    if (typed === ',' || typed === ':' || typed === ';') delay += 130 + Math.random() * 90;
    if (typed === '.') delay += 240 + Math.random() * 160;
    if (typed === '—') delay += 170 + Math.random() * 130;

    // and every so often it stops to think
    if (Math.random() < 0.025) delay += 180 + Math.random() * 200;

    return delay;
}

/** Backspace held down: one deletion, the repeat delay, then acceleration to a steady rattle. */
function eraseDelay(deleted: number) {
    if (deleted === 0) return TIMING.repeatDelay;

    const t = Math.min(1, deleted / TIMING.repeatRamp);
    const eased = t * t * (3 - 2 * t);
    return TIMING.repeatSlow + (TIMING.repeatFast - TIMING.repeatSlow) * eased;
}

function slice(segments: Segment[], count: number) {
    let cursor = 0;

    return segments.map((segment, i) => {
        const chars = Array.from(segment.text);
        const shown = Math.min(chars.length, Math.max(0, count - cursor));
        cursor += chars.length;

        if (shown === 0) return null;

        return (
            <span key={i} className={segment.className}>
                {chars.slice(0, shown).join('')}
            </span>
        );
    });
}

function Caret({ size, blinking }: { size: string; blinking: boolean }) {
    return (
        <span
            className={`ml-[2px] inline-block translate-y-[0.1em] rounded-[1px] bg-white/85 shadow-[0_0_12px_rgba(255,255,255,0.45)] ${size} ${blinking ? 'animate-caret' : ''}`}
        />
    );
}

export default function HeroIntro({ credit, name, line, parts }: { credit: string; name: string; line: string; parts: string[] }) {
    // Typed once on load, then left alone. The name sits on its own line, title-card style.
    const HEADLINE = useMemo<Segment[]>(() => [{ text: name, className: NAME_CLASS }, { text: keepTogether(line), className: LINE_CLASS }], [name, line]);
    // Typed, held, erased, replaced by the next one — forever.
    const PARTS = useMemo(() => parts.map(toSegments), [parts]);
    const HEADLINE_TEXT = useMemo(() => flatten(HEADLINE), [HEADLINE]);
    const PART_TEXTS = useMemo(() => PARTS.map(flatten), [PARTS]);

    const [headTyped, setHeadTyped] = useState(0);
    const [bodyTyped, setBodyTyped] = useState(0);
    const [part, setPart] = useState(0);
    const [resting, setResting] = useState(false);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setHeadTyped(HEADLINE_TEXT.length);
            setBodyTyped(PART_TEXTS[0].length);
            setResting(true);
            return;
        }

        let cancelled = false;
        let timer: ReturnType<typeof setTimeout>;
        const wait = (ms: number) =>
            new Promise<void>((resolve) => {
                timer = setTimeout(resolve, ms);
            });

        // both return false once the effect has been torn down
        const typeOut = async (chars: string[], speed: number, set: (n: number) => void) => {
            for (let i = 1; i <= chars.length; i++) {
                set(i);
                await wait(typeDelay(chars[i - 1], chars[i - 2], speed));
                if (cancelled) return false;
            }
            return true;
        };

        const backspace = async (chars: string[], set: (n: number) => void) => {
            await wait(TIMING.pressDown);
            if (cancelled) return false;

            for (let i = chars.length - 1; i >= 0; i--) {
                set(i);
                await wait(eraseDelay(chars.length - 1 - i));
                if (cancelled) return false;
            }
            return true;
        };

        (async () => {
            await wait(TIMING.start);
            if (cancelled) return;

            for (;;) {
                if (!(await typeOut(HEADLINE_TEXT, TIMING.headlineSpeed, setHeadTyped))) return;

                for (let index = 0; index < PARTS.length; index++) {
                    setPart(index);

                    await wait(TIMING.betweenParts);
                    if (cancelled) return;

                    if (!(await typeOut(PART_TEXTS[index], TIMING.bodySpeed, setBodyTyped))) return;

                    setResting(true);
                    await wait(TIMING.hold);
                    if (cancelled) return;
                    setResting(false);

                    if (!(await backspace(PART_TEXTS[index], setBodyTyped))) return;
                }

                // last part gone: take the headline with it and leave the hero empty for a while
                await wait(TIMING.beforeWipe);
                if (cancelled) return;
                if (!(await backspace(HEADLINE_TEXT, setHeadTyped))) return;

                setPart(0);
                setResting(true);
                await wait(TIMING.gap);
                if (cancelled) return;
                setResting(false);
            }
        })();

        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [HEADLINE_TEXT, PART_TEXTS, PARTS.length]);

    const onHeadline = headTyped < HEADLINE_TEXT.length;
    // once the banner is wiped the hero shows nothing at all: no caret, and no scrim
    // (which would otherwise sit over the footage as a dark smudge for the whole gap)
    const empty = headTyped === 0 && bodyTyped === 0;

    return (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-screen items-end overflow-hidden">
            {/* scrim: darkens the footage where the text sits (bottom left), leaves the rest alone */}
            <div
                aria-hidden
                className={`absolute inset-0 bg-[radial-gradient(ellipse_85%_85%_at_0%_100%,rgba(0,0,0,0.75),rgba(0,0,0,0.4)_45%,transparent_78%)] transition-opacity duration-700 ${empty ? 'opacity-40' : 'opacity-100'}`}
            />

            <div className="animate-fadeUp relative mx-auto w-full max-w-7xl px-5 sm:px-8 pb-24 sm:pb-28">
                <p className="hero-text-shadow mb-6 flex items-center gap-3 font-mono text-[11px] sm:text-xs text-white/70">
                    <span className="h-px w-8 bg-white/40" />
                    {credit}
                </p>

                <div className="relative max-w-3xl">
                    {/* Invisible copy of everything: reserves the height of the longest part so the block
                        never resizes mid-cycle, and carries the real text for readers and crawlers. */}
                    <div className="relative select-none opacity-0">
                        <p className={HEADLINE_CLASS}>
                            {HEADLINE.map((segment, i) => (
                                <span key={i} className={segment.className}>
                                    {segment.text}
                                </span>
                            ))}
                        </p>
                        <div className="mt-6 grid max-w-xl border-l border-transparent pl-4 sm:mt-8">
                            {PARTS.map((segments, i) => (
                                <p key={i} className={`${BODY_CLASS} [grid-area:1/1]`}>
                                    {segments.map((segment, j) => (
                                        <span key={j} className={segment.className}>
                                            {segment.text}
                                        </span>
                                    ))}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* the animated copy, laid over the sizer */}
                    <div aria-hidden className="hero-text-shadow absolute inset-0">
                        <p className={HEADLINE_CLASS}>
                            {slice(HEADLINE, headTyped)}
                            {onHeadline && !empty && <Caret size="w-[3px] -mr-[3px] h-[0.95em]" blinking={resting} />}
                        </p>
                        <div className={`mt-6 max-w-xl border-l pl-4 sm:mt-8 transition-colors duration-500 ${onHeadline ? 'border-transparent' : 'border-white/30'}`}>
                            <p className={BODY_CLASS}>
                                {slice(PARTS[part], bodyTyped)}
                                {!onHeadline && <Caret size="w-[2px] -mr-[2px] h-[0.9em]" blinking={resting} />}
                            </p>
                        </div>
                    </div>
                </div>

                <p
                    aria-hidden
                    className={`mt-6 font-mono text-[11px] text-white/35 transition-opacity duration-500 ${onHeadline ? 'opacity-0' : 'opacity-100'}`}
                >
                    {String(part + 1).padStart(2, '0')} / {String(PARTS.length).padStart(2, '0')}
                </p>
            </div>
        </div>
    );
}
