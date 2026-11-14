'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';

// Shows the video's thumbnail and loads YouTube (privacy-enhanced domain) only on play.
export default function YouTubeEmbed({ id, title, playLabel = 'Play' }: { id: string; title: string; playLabel?: string }) {
    const [playing, setPlaying] = useState(false);

    return (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black">
            {playing ? (
                <iframe
                    src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                />
            ) : (
                <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    aria-label={`${playLabel}: ${title}`}
                    className="group absolute inset-0 h-full w-full"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                    <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm border border-white/20 group-hover:bg-black/75 transition-colors">
                            <Play className="h-6 w-6 text-white translate-x-0.5" />
                        </span>
                    </span>
                    <span className="absolute left-3 bottom-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white/85 backdrop-blur-sm">
                        {title}
                    </span>
                </button>
            )}
        </div>
    );
}
