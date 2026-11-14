import { Fragment, type ReactNode } from 'react';
import Link from 'next/link';
import DownloadLink from '@/components/DownloadLink';
import { DEFAULT_LOCALE, localizeHref, type Locale } from '@/lib/i18n';

// Inline text with a small Markdown subset: **bold**, *em*, `code`, [text](href).
// Internal links are moved into the reader's language; [text](#download) opens the
// download dialog. Used by the docs renderer and by every translated string.

export const LINK_CLASS = 'text-white underline underline-offset-4 decoration-white/30 hover:decoration-white';
export const CODE_CLASS = 'rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] text-white/90';

type Opts = { locale?: Locale; linkClass?: string; strongClass?: string };

const PATTERN = /`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+(?:\*(?!\*)[^*]*)*)\*\*|\*([^*\s][^*]*)\*/;

export function rich(text: string, opts: Opts = {}): ReactNode {
    return <>{parse(text, opts, 0)}</>;
}

function parse(text: string, opts: Opts, depth: number): ReactNode[] {
    const out: ReactNode[] = [];
    let rest = text;
    let key = 0;
    while (rest) {
        const m = PATTERN.exec(rest);
        if (!m) {
            out.push(rest);
            break;
        }
        if (m.index > 0) out.push(rest.slice(0, m.index));
        const k = `${depth}-${key++}`;
        if (m[1] !== undefined) {
            out.push(
                <code key={k} className={CODE_CLASS}>
                    {m[1]}
                </code>
            );
        } else if (m[2] !== undefined) {
            out.push(<Fragment key={k}>{link(m[2], m[3], opts, depth)}</Fragment>);
        } else if (m[4] !== undefined) {
            out.push(
                <strong key={k} className={opts.strongClass ?? 'font-semibold text-white'}>
                    {parse(m[4], opts, depth + 1)}
                </strong>
            );
        } else if (m[5] !== undefined) {
            out.push(<em key={k}>{parse(m[5], opts, depth + 1)}</em>);
        }
        rest = rest.slice(m.index + m[0].length);
    }
    return out;
}

function link(label: string, href: string, opts: Opts, depth: number): ReactNode {
    const cls = opts.linkClass ?? LINK_CLASS;
    const inner = parse(label, opts, depth + 1);
    if (href === '#download') return <DownloadLink className={cls}>{inner}</DownloadLink>;
    if (/^(https?:|mailto:)/.test(href)) {
        return (
            <a href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel="noopener noreferrer" className={`${cls} break-words`}>
                {inner}
            </a>
        );
    }
    return (
        <Link href={localizeHref(href, opts.locale ?? DEFAULT_LOCALE)} className={cls}>
            {inner}
        </Link>
    );
}
