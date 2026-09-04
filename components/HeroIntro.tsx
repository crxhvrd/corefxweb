'use client';

import { useEffect, useState } from 'react';

type Segment = { text: string; className?: string };

const EM = 'text-white/85';

// Typed once on load, then left alone.
const HEADLINE: Segment[] = [
    { text: 'CoreFX', className: 'font-semibold' },
    { text: ' is a visual overhaul for ' },
    // non-breaking spaces keep the game title on one line at every width
    { text: 'Grand\u00a0Theft\u00a0Auto\u00a0V' },
];

// Typed, held, erased, replaced by the next one — forever.
const PARTS: Segment[][] = [
    [
        { text: 'It’s built by ' },
        { text: 'βeta', className: `${EM} font-medium` },
        {
            text:
                ', a Discord community that formed in 2021 around the GTA\u00a0V moviemaking scene, ' +
                'and has been in development since ',
        },
        { text: 'February\u00a02023', className: EM },
        { text: '.' },
    ],
    [
        { text: 'It overhauls the ' },
        { text: 'weather system', className: EM },
        { text: ', reworks ' },
        { text: 'graphics textures', className: EM },
        { text: ', and adds new features to ' },
        { text: 'the\u00a0game’s own shaders', className: EM },
        { text: '.' },
    ],
    [
        { text: 'Two builds: ' },
        { text: 'Legacy', className: EM },
        { text: ' for the original game, ' },
        { text: 'Enhanced', className: EM },
        { text: ' for the ray-traced one. Legacy also runs on FiveM, client and server-side; Enhanced FiveM is in the works.' },
    ],
    [
        { text: 'Both singleplayer builds ' },
        { text: 'cost nothing', className: EM },
        { text: ': join the Patreon on its free tier, open the latest update post, and the links are there. The FiveM build is on the $5 tier. Start from ' },
        { text: 'Download', className: EM },
        { text: ', bottom\u00a0right.' },
    ],
    [
        { text: 'Documentation', className: EM },
        { text: ' covers install for every platform, ' },
        { text: 'Dev\u00a0Blog', className: EM },
        { text: ' tracks what changed, and the ' },
        { text: 'Discord', className: EM },
        { text: ' icon at bottom\u00a0left is where support and updates live.' },
    ],
];

const HEADLINE_CLASS = 'hero-headline font-medium leading-snug tracking-tight text-white';
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

const HEADLINE_TEXT = flatten(HEADLINE);
const PART_TEXTS = PARTS.map(flatten);

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

export default function HeroIntro() {
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
    }, []);

    const onHeadline = headTyped < HEADLINE_TEXT.length;
    // once the banner is wiped the hero shows nothing at all: no caret, and no scrim
    // (which would otherwise sit over the footage as a dark smudge for the whole gap)
    const empty = headTyped === 0 && bodyTyped === 0;

    return (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-screen items-center justify-center px-6 pb-24 sm:pb-16">
            <div className="animate-fadeUp relative w-full max-w-3xl text-center">
                {/* soft scrim — the footage behind this is bright */}
                <div
                    aria-hidden
                    className={`absolute left-1/2 top-1/2 h-[280%] w-[125%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-black/40 blur-3xl transition-opacity duration-700 ${empty ? 'opacity-0' : 'opacity-100'}`}
                />

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
                    <div className="mt-4 grid sm:mt-5">
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
                    <p className={`${BODY_CLASS} mt-4 sm:mt-5`}>
                        {slice(PARTS[part], bodyTyped)}
                        {!onHeadline && <Caret size="w-[2px] -mr-[2px] h-[0.9em]" blinking={resting} />}
                    </p>
                </div>
            </div>
        </div>
    );
}
