'use client';

import { formatDistanceToNow, format } from 'date-fns';
import { useEffect, useState, type ReactNode } from 'react';

// Live source of truth for devblog posts. The GitHub Action commits the synced
// JSON to the repo every few minutes; we read it straight from GitHub raw at
// runtime so the deployed site picks up new posts WITHOUT a Vercel rebuild.
// Override with NEXT_PUBLIC_DEVBLOG_URL if the repo/branch ever changes.
const LIVE_URL =
  process.env.NEXT_PUBLIC_DEVBLOG_URL ||
  'https://raw.githubusercontent.com/crxhvrd/corefxweb/main/data/devblog-posts.json';

export type Attachment = {
  url: string;
  contentType: string;
  width?: number;
  height?: number;
};

export type Embed = {
  type?: string;
  url?: string;
  providerName?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  color?: number;
};

export type DevblogPost = {
  id: string;
  authorName: string;
  authorAvatarUrl: string;
  timestamp: string;
  editedAt?: string;
  content: string;
  attachments: Attachment[];
  embeds: Embed[];
};

function sortPosts(list: DevblogPost[]): DevblogPost[] {
  return list
    .slice()
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

function embedColorToHex(color?: number): string {
  if (!color) return '#ffffff33';
  return '#' + color.toString(16).padStart(6, '0');
}

// Render Discord-flavored text: [label](url) markdown links + bare URLs become
// clickable; everything else passes through as plain text, with the parent's
// whitespace-pre-line preserving line breaks.
const TOKEN_RE = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<>"']+)/g;

function renderContent(content: string): ReactNode[] {
  if (!content) return [];
  const out: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;
  TOKEN_RE.lastIndex = 0;
  while ((match = TOKEN_RE.exec(content)) !== null) {
    if (match.index > lastIndex) {
      out.push(content.slice(lastIndex, match.index));
    }
    const [, mdLabel, mdUrl, bareUrl] = match;
    const href = mdUrl || bareUrl;
    const label = mdLabel || bareUrl;
    if (href) {
      out.push(
        <a
          key={`l${key++}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white break-words"
        >
          {label}
        </a>
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < content.length) {
    out.push(content.slice(lastIndex));
  }
  return out;
}

export default function DevBlogClient({ initialPosts }: { initialPosts: DevblogPost[] }) {
  const [posts, setPosts] = useState<DevblogPost[]>(() => sortPosts(initialPosts));

  // Refresh from the live JSON after mount so new posts appear without a rebuild.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${LIVE_URL}?t=${Date.now()}`, { cache: 'no-store' });
        if (!res.ok) return;
        const data = (await res.json()) as DevblogPost[];
        if (!cancelled && Array.isArray(data)) setPosts(sortPosts(data));
      } catch {
        // Network/CORS failure: keep the build-time snapshot we already rendered.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="relative min-h-screen px-4 sm:px-6 pt-28 sm:pt-32 pb-24 sm:pb-32 max-w-3xl mx-auto">
      <header className="mb-12">
        <p className="font-mono text-xs text-white/40 mb-3">dev log</p>
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">Dev Blog</h1>
        <p className="mt-3 text-white/60">
          Everything we post in our Discord&apos;s announcements channel, as it happens.{' '}
          <a
            href="https://discord.gg/jK4SRmBqYt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white"
          >
            Join us there
          </a>{' '}
          to talk about it.
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="border-y border-white/10 py-10 text-center space-y-3">
          <p className="text-white/80">No posts yet.</p>
          <p className="text-white/50 text-sm">
            Check back after our next Discord announcement, or{' '}
            <a
              href="https://discord.gg/jK4SRmBqYt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline underline-offset-4 decoration-white/30"
            >
              join the Discord
            </a>{' '}
            to catch them live.
          </p>
        </div>
      ) : (
        <ol className="divide-y divide-white/10 border-y border-white/10">
          {posts.map((post, i) => (
            <li
              key={post.id}
              className="py-8 space-y-4"
            >
              <div className="flex items-center gap-3">
                {post.authorAvatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.authorAvatarUrl}
                    alt=""
                    width={40}
                    height={40}
                    className="w-8 h-8 rounded-full"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white/10" />
                )}
                <div className="flex flex-col">
                  <span className="text-white font-medium leading-none">{post.authorName}</span>
                  <time
                    dateTime={post.timestamp}
                    title={format(new Date(post.timestamp), 'PPpp')}
                    className="font-mono text-xs text-white/40 mt-1"
                    suppressHydrationWarning
                  >
                    {format(new Date(post.timestamp), 'yyyy-MM-dd')} · {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
                    {post.editedAt && <span className="ml-1 text-white/30">(edited)</span>}
                  </time>
                </div>
              </div>

              {post.content && (
                <p className="text-white/75 whitespace-pre-line leading-relaxed break-words">
                  {renderContent(post.content)}
                </p>
              )}

              {post.embeds.map((embed, idx) => {
                const inner = (
                  <>
                    {embed.providerName && (
                      <p className="text-[11px] text-white/40 uppercase tracking-wide mb-1">
                        {embed.providerName}
                      </p>
                    )}
                    {embed.title && (
                      <h3 className="text-white font-medium mb-1 group-hover:underline">
                        {embed.title}
                      </h3>
                    )}
                    {embed.description && (
                      <p className="text-gray-300 text-sm whitespace-pre-line">{embed.description}</p>
                    )}
                    {embed.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={embed.imageUrl}
                        alt=""
                        className="mt-2 rounded max-w-full h-auto"
                        loading="lazy"
                      />
                    )}
                  </>
                );

                const classes = 'group block border-l-4 pl-4 py-2 bg-white/5 rounded-r transition-colors hover:bg-white/10';
                return embed.url ? (
                  <a
                    key={idx}
                    href={embed.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes}
                    style={{ borderColor: embedColorToHex(embed.color) }}
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={idx}
                    className={classes}
                    style={{ borderColor: embedColorToHex(embed.color) }}
                  >
                    {inner}
                  </div>
                );
              })}

              {post.attachments.length > 0 && (
                <div className="grid gap-3">
                  {post.attachments.map((att) => {
                    if (att.contentType.startsWith('image/')) {
                      return (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={att.url}
                          src={att.url}
                          alt=""
                          width={att.width || 1200}
                          height={att.height || 800}
                          className="rounded-md border border-white/10 w-full h-auto"
                          loading={i === 0 ? 'eager' : 'lazy'}
                        />
                      );
                    }
                    if (att.contentType.startsWith('video/')) {
                      return (
                        <video
                          key={att.url}
                          src={att.url}
                          controls
                          preload="metadata"
                          className="rounded-md border border-white/10 w-full h-auto"
                        />
                      );
                    }
                    return (
                      <a
                        key={att.url}
                        href={att.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white underline underline-offset-4 decoration-white/30 text-sm"
                      >
                        Attachment
                      </a>
                    );
                  })}
                </div>
              )}
            </li>
          ))}
        </ol>
      )}

    </main>
  );
}
