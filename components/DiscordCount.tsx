'use client';

import { useEffect, useState } from 'react';

const INVITE_CODE = 'jK4SRmBqYt';
const INVITE_URL = `https://discord.com/api/v10/invites/${INVITE_CODE}?with_counts=true`;
const CACHE_KEY = 'corefx-discord-members-v1';
const TTL_MS = 5 * 60 * 1000;

type Cached = { members: number; at: number };

const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });

export default function DiscordCount() {
  const [members, setMembers] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    try {
      const raw = sessionStorage.getItem(CACHE_KEY);
      if (raw) {
        const cached = JSON.parse(raw) as Cached;
        if (Date.now() - cached.at < TTL_MS && typeof cached.members === 'number') {
          setMembers(cached.members);
          return;
        }
      }
    } catch {
      // ignore cache errors
    }

    fetch(INVITE_URL, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        const count =
          typeof data.approximate_member_count === 'number' ? data.approximate_member_count : null;
        if (count === null) return;
        setMembers(count);
        try {
          sessionStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ members: count, at: Date.now() } satisfies Cached)
          );
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

  if (members === null || members <= 0) return null;

  return (
    <span
      className="pointer-events-none absolute -top-1 -right-1 bg-[#5865F2] text-white text-[9px] leading-none font-semibold px-1.5 py-0.5 rounded-full shadow-md ring-2 ring-black/40"
      title={`${members.toLocaleString('en')} members`}
    >
      {compact.format(members)}
    </span>
  );
}
