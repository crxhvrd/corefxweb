import Image from 'next/image';
import Link from 'next/link';
import { Megaphone } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import type { ReactNode } from 'react';
import postsData from '@/data/devblog-posts.json';

export const metadata = {
  title: 'Dev Blog · CoreFX',
  description: 'Latest development updates from the CoreFX team, streamed live from our Discord announcements channel.',
};

type Attachment = {
  url: string;
  contentType: string;
  width?: number;
  height?: number;
};

type Embed = {
  type?: string;
  url?: string;
  providerName?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  color?: number;
};

type DevblogPost = {
  id: string;
  authorName: string;
  authorAvatarUrl: string;
  timestamp: string;
  editedAt?: string;
  content: string;
  attachments: Attachment[];
  embeds: Embed[];
};

const posts = (postsData as DevblogPost[])
  .slice()
  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

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
          className="text-orange-400 underline decoration-orange-400/50 hover:text-orange-300 break-words"
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

export default function DevBlogPage() {
  return (
    <main className="relative min-h-screen px-4 sm:px-6 pt-24 pb-32 max-w-3xl mx-auto">
      <header className="mb-10 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg px-6 py-5 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Megaphone
            className="h-6 w-6 text-orange-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          />
          <h1 className="text-3xl sm:text-4xl font-semibold text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.85)]">
            Dev Blog
          </h1>
        </div>
        <p className="text-gray-200 text-sm sm:text-base [text-shadow:0_1px_4px_rgba(0,0,0,0.85)]">
          Streamed live from the CoreFX Discord announcements channel.
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="bg-black/30 border border-white/10 backdrop-blur-md p-8 rounded-lg text-center space-y-3">
          <p className="text-white/80">No posts yet.</p>
          <p className="text-white/50 text-sm">
            Check back after our next Discord announcement, or{' '}
            <a
              href="https://discord.gg/jK4SRmBqYt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 underline hover:text-orange-300"
            >
              join the Discord
            </a>{' '}
            to catch them live.
          </p>
        </div>
      ) : (
        <ol className="space-y-6">
          {posts.map((post, i) => (
            <li
              key={post.id}
              className="bg-black/30 border border-white/10 backdrop-blur-md p-6 rounded-lg space-y-4"
            >
              <div className="flex items-center gap-3">
                {post.authorAvatarUrl ? (
                  <img
                    src={post.authorAvatarUrl}
                    alt=""
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-white/10" />
                )}
                <div className="flex flex-col">
                  <span className="text-white font-medium leading-none">{post.authorName}</span>
                  <time
                    dateTime={post.timestamp}
                    title={format(new Date(post.timestamp), 'PPpp')}
                    className="text-xs text-white/50 mt-1"
                  >
                    {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
                    {post.editedAt && <span className="ml-1 text-white/30">(edited)</span>}
                  </time>
                </div>
              </div>

              {post.content && (
                <p className="text-gray-200 whitespace-pre-line leading-relaxed break-words">
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
                        <img
                          key={att.url}
                          src={att.url}
                          alt=""
                          width={att.width || 1200}
                          height={att.height || 800}
                          className="rounded-lg w-full h-auto"
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
                          className="rounded-lg w-full h-auto"
                        />
                      );
                    }
                    return (
                      <a
                        key={att.url}
                        href={att.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-400 underline hover:text-orange-300 text-sm"
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

      <div className="mt-12 text-center text-xs text-white/40">
        <Link href="/" className="underline hover:text-white/70">
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
