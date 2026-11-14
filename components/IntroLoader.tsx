'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { markIntroDone, markIntroSeen } from '@/lib/intro';

// The in-game CoreFX loading screen, on the web: the β inside glowing blue dots. It opens
// as the game's single flat ring, which then splits into three orbits set evenly round
// the β like an atom, each with a bright head and a trail. At the end the orbits open
// outward as the page fades in.
//
// The dots are drawn on two canvases, one behind the β and one in front, so dots passing
// in front of it really cover it. The fade in/out is CSS (globals.css, .intro-loader), so
// the loader leaves on time even if the scripts are slow; this component draws the dots,
// removes the loader afterwards and tells the hero when to start typing.

const REVEAL_MS = 2200; // matches the fade-out delay in globals.css
const END_MS = 2800;

const SIZE = 280; // canvas, CSS px
const RADIUS = 50;
const DOTS = 32;
const FOCAL = 300;
const TAU = Math.PI * 2;

// Three identical orbits, like an atom: each ring is tipped back by TILT, then the three
// are set 60° apart around the β. Their dots stay evenly spaced and still; only the bright
// heads run round, all in step, while the whole figure turns slowly and steadily.
const TILT = 1.2; // rad, how far each ring is tipped back (flat ring = 0)
const HEAD_SPEED = 4.2; // rad/s along each ring
const TURN_SPEED = 0.45; // rad/s, the whole figure
const ORBITS = [0, 1, 2].map((k) => ({ turn: (k * Math.PI) / 3, phase: (k * TAU) / 3 }));

const smooth = (x: number) => {
    const c = Math.min(1, Math.max(0, x));
    return c * c * (3 - 2 * c);
};

// A soft round glow, drawn once and stamped for every dot.
function makeSprite(): HTMLCanvasElement {
    const s = document.createElement('canvas');
    s.width = s.height = 64;
    const g = s.getContext('2d')!;
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(235, 247, 255, 1)');
    grad.addColorStop(0.16, 'rgba(150, 210, 255, 0.95)');
    grad.addColorStop(0.24, 'rgba(90, 170, 255, 0.6)');
    grad.addColorStop(0.4, 'rgba(50, 140, 255, 0.25)');
    grad.addColorStop(0.6, 'rgba(30, 110, 255, 0.1)');
    grad.addColorStop(1, 'rgba(30, 110, 255, 0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    return s;
}

// How lit a dot is, from how far it sits behind its orbit's head: a long fading trail
// behind, a very short lead in front.
function lit(behind: number): number {
    const d = ((behind % TAU) + TAU) % TAU;
    const trail = Math.exp(-d * 2.4);
    const lead = Math.exp(-(TAU - d) * 18);
    return Math.max(trail, lead);
}

function animate(back: HTMLCanvasElement, front: HTMLCanvasElement): () => void {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ctxs = [back, front].map((c) => {
        c.width = c.height = Math.round(SIZE * dpr);
        const ctx = c.getContext('2d')!;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.globalCompositeOperation = 'lighter';
        return ctx;
    });
    const sprite = makeSprite();
    let frame = 0;

    const draw = () => {
        // performance.now() counts from the page's start, like the CSS timeline
        const t = performance.now() / 1000;
        const unfold = smooth((t - 0.35) / 0.9); // one flat ring → three orbits
        const exit = smooth((t - REVEAL_MS / 1000) / 0.6); // orbits open outward
        const radius = RADIUS * (1 + 0.6 * exit * exit);
        const tilt = TILT * unfold;
        const ct = Math.cos(tilt);
        const st = Math.sin(tilt);
        const turn = TURN_SPEED * t + exit * 0.8;

        for (const ctx of ctxs) ctx.clearRect(0, 0, SIZE, SIZE);

        for (const o of ORBITS) {
            const r = o.turn * unfold + turn;
            const cr = Math.cos(r);
            const sr = Math.sin(r);
            const head = o.phase + HEAD_SPEED * t;

            for (let i = 0; i < DOTS; i++) {
                const a = (i / DOTS) * TAU;
                // ring in its own plane, tipped back about X
                const x0 = radius * Math.cos(a);
                const y1 = radius * Math.sin(a);
                const y0 = y1 * ct;
                const z = y1 * st;
                // set round the β about the view axis
                const x = x0 * cr - y0 * sr;
                const y = x0 * sr + y0 * cr;

                const persp = FOCAL / (FOCAL + z);
                const depth = 0.6 + 0.4 * (1 - (z / radius + 1) / 2); // nearer = brighter
                const b = lit(head - a);
                const alpha = (0.3 + 0.7 * b) * depth;
                const size = (9 + 13 * b) * persp;
                const ctx = z > 0 ? ctxs[0] : ctxs[1];
                ctx.globalAlpha = Math.min(1, alpha);
                ctx.drawImage(sprite, SIZE / 2 + x * persp - size / 2, SIZE / 2 + y * persp - size / 2, size, size);
            }
        }
        frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
}

export default function IntroLoader() {
    const [gone, setGone] = useState(false);
    const back = useRef<HTMLCanvasElement>(null);
    const front = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (document.documentElement.dataset.intro === 'skip') {
            markIntroDone();
            setGone(true);
            return;
        }
        const stop = back.current && front.current ? animate(back.current, front.current) : () => {};
        const reveal = setTimeout(markIntroDone, REVEAL_MS);
        const end = setTimeout(() => {
            markIntroSeen();
            setGone(true);
        }, END_MS);
        return () => {
            stop();
            clearTimeout(reveal);
            clearTimeout(end);
        };
    }, []);

    if (gone) return null;

    return (
        <div className="intro-loader" aria-hidden="true">
            <div className="intro-loader__stage">
                <div className="intro-loader__halo" />
                <canvas ref={back} className="intro-loader__orbits" />
                <Image src="/images/Beta.png" alt="" width={58} height={58} priority className="intro-loader__beta" />
                <canvas ref={front} className="intro-loader__orbits" />
            </div>
            <div className="intro-loader__bar">
                <span />
            </div>
        </div>
    );
}
