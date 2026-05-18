'use client';

import { useEffect, useState } from 'react';

const GUILD_ID = '963349840681639946';
const WIDGET_URL = `https://discord.com/api/guilds/${GUILD_ID}/widget.json`;
const CACHE_KEY = 'corefx-discord-widget-v1';
const TTL_MS = 5 * 60 * 1000;

type Cached = { presence: number; at: number };

const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });

export default function DiscordCount() {
  const [presence, setPresence] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    try {
      const raw = sessionStorage.getItem(CACHE_KEY);
      if (raw) {
        const cached = JSON.parse(raw) as Cached;
        if (Date.now() - cached.at < TTL_MS && typeof cached.presence === 'number') {
          setPresence(cached.presence);
          return;
        }
      }
    } catch {
      // ignore cache errors
    }

    fetch(WIDGET_URL, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        const count = typeof data.presence_count === 'number' ? data.presence_count : null;
        if (count === null) return;
        setPresence(count);
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ presence: count, at: Date.now() } satisfies Cached));
        } catch {
          // ignore quota / private mode
        }
      })
      .catch(() => {
        // silent — Discord icon link still works
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (presence === null || presence <= 0) return null;

  return (
    <span
      className="pointer-events-none absolute -top-1 -right-1 flex items-center gap-1 bg-green-500/95 text-white text-[9px] leading-none font-semibold px-1.5 py-0.5 rounded-full shadow-md ring-2 ring-black/40"
      title={`${presence.toLocaleString('en')} members online`}
    >
      <span className="inline-block w-1 h-1 rounded-full bg-white" />
      {compact.format(presence)}
    </span>
  );
}
