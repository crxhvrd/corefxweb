'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AmbientGlow from './AmbientGlow';

type Attachment = { url: string; contentType: string };
export type Post = { id: string; timestamp: string; content: string; attachments: Attachment[] };

const LIVE_URL = 'https://raw.githubusercontent.com/crxhvrd/corefxweb/main/data/devblog-posts.json';
const COUNT = 5;

const URL_ONLY = /^<?https?:\/\/\S+>?$/;

function tidy(line: string) {
    return line
        .replace(/^#+\s*/, '')
        .replace(/^-#\s*/, '')
        .replace(/\[\s*([^\]]+?)\s*\]\([^)]+\)/g, '$1')
        .replace(/\*\*|__|`/g, '')
        .trim();
}

function split(text: string) {
    const raw = text
        .replace(/@everyone|@here|@CoreFX/gi, '')
        .replace(/<[@#:][^>]+>/g, '')
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean);
    const video = raw.some((l) => URL_ONLY.test(l) && /youtu\.?be/.test(l));
    const lines = raw.filter((l) => !URL_ONLY.test(l)).map(tidy).filter(Boolean);
    const title = lines[0] ?? (video ? 'New video on YouTube' : 'Update');
    return { title, body: lines.slice(1).join(' ') };
}

const day = (iso: string) => {
    const d = new Date(iso);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export default function LatestPosts({ initial }: { initial: Post[] }) {
    const [posts, setPosts] = useState<Post[]>(initial);

    useEffect(() => {
        let alive = true;
        fetch(`${LIVE_URL}?t=${Date.now()}`, { cache: 'no-store' })
            .then((r) => (r.ok ? r.json() : null))
            .then((d: Post[] | null) => {
                if (alive && Array.isArray(d) && d.length)
                    setPosts(
                        d
                            .slice()
                            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                            .slice(0, COUNT)
                    );
            })
            .catch(() => undefined);
        return () => {
            alive = false;
        };
    }, []);

    const glow = posts
        .flatMap((p) => p.attachments)
        .find((a) => a.contentType?.startsWith('image/'))?.url;

    return (
        <section id="log" className="relative scroll-mt-20 py-24 sm:py-28">
            <div className="relative isolate mx-auto max-w-7xl px-4 sm:px-6">
                <AmbientGlow src={glow} strength={0.2} />
                <p className="font-mono text-xs text-white/40 mb-3">dev log</p>
                <div className="max-w-5xl flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10">
                    <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">What we&apos;re working on</h2>
                    <Link href="/devblog" className="text-sm text-white/60 hover:text-white underline underline-offset-4 decoration-white/20">
                        Full log, straight from our Discord
                    </Link>
                </div>

                <ol className="max-w-5xl divide-y divide-white/10 border-y border-white/10">
                    {posts.map((p) => {
                        const { title, body } = split(p.content);
                        const image = p.attachments.find((a) => a.contentType?.startsWith('image/'));
                        const video = image ? undefined : p.attachments.find((a) => a.contentType?.startsWith('video/'));
                        return (
                            <li key={p.id}>
                                <Link href="/devblog" className="group grid grid-cols-[1fr_auto] sm:grid-cols-[7rem_1fr_auto] gap-x-6 gap-y-1 py-5 items-start">
                                    <time className="font-mono text-xs text-white/40 pt-1 col-span-2 sm:col-span-1">{day(p.timestamp)}</time>
                                    <div className="min-w-0">
                                        <p className="text-white/90 group-hover:text-white leading-snug">{title}</p>
                                        {body && <p className="mt-1 text-sm text-white/50 line-clamp-2">{body}</p>}
                                    </div>
                                    <div className={`w-24 sm:w-32 aspect-video rounded overflow-hidden shrink-0 ${image || video ? 'bg-white/5' : ''}`}>
                                        {image ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={image.url} alt="" loading="lazy" className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                        ) : video ? (
                                            <video src={`${video.url.split('#')[0]}#t=0.5`} preload="metadata" muted playsInline className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                        ) : null}
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
}
