import fs from 'fs';
import path from 'path';
import type { ReactNode } from 'react';
import InstallationStep from '@/components/docs/InstallationStep';
import { rich } from '@/lib/rich';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n';

// The docs are Markdown files in content/<locale>/docs/. This reads the small subset
// they use and renders it in the site's style:
//   front matter (title, layout, badge), ## / ### headings with {attrs},
//   paragraphs, nested "- " and "1. " lists (3-space indent), > [!WARNING] / > [!NOTE]
//   callouts, ``` fences, "@where " lines (feature cards), and inline Markdown (lib/rich).

type ListItem = { text: string; children: List | null };
type List = { ordered: boolean; start: number; items: ListItem[] };
type Block =
    | { kind: 'h'; level: number; text: string; attrs: string[] }
    | { kind: 'p'; text: string }
    | { kind: 'list'; list: List }
    | { kind: 'callout'; type: string; text: string }
    | { kind: 'code'; text: string }
    | { kind: 'where'; text: string };

export type Doc = { meta: Record<string, string>; blocks: Block[] };

const ROOT = path.join(process.cwd(), 'content');

export function readDoc(locale: Locale, name: string): Doc {
    let file = path.join(ROOT, locale, 'docs', `${name}.md`);
    if (!fs.existsSync(file)) file = path.join(ROOT, DEFAULT_LOCALE, 'docs', `${name}.md`);
    return parseDoc(fs.readFileSync(file, 'utf8'));
}

export function parseDoc(source: string): Doc {
    const meta: Record<string, string> = {};
    let text = source.replace(/\r\n/g, '\n');
    const fm = /^---\n([\s\S]*?)\n---\n/.exec(text);
    if (fm) {
        for (const line of fm[1].split('\n')) {
            const i = line.indexOf(':');
            if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
        }
        text = text.slice(fm[0].length);
    }

    const lines = text.split('\n');
    const blocks: Block[] = [];
    let para: string[] = [];
    const flush = () => {
        if (para.length) blocks.push({ kind: 'p', text: para.join(' ') });
        para = [];
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const h = /^(#{1,3}) (.*?)(?:\s*\{([^}]*)\})?\s*$/.exec(line);
        if (h) {
            flush();
            blocks.push({ kind: 'h', level: h[1].length, text: h[2], attrs: h[3] ? h[3].split(',').map((s) => s.trim()) : [] });
            continue;
        }
        if (line.startsWith('```')) {
            flush();
            const code: string[] = [];
            while (++i < lines.length && !lines[i].startsWith('```')) code.push(lines[i]);
            blocks.push({ kind: 'code', text: code.join('\n') });
            continue;
        }
        const c = /^> \[!(\w+)\]\s*(.*)$/.exec(line);
        if (c) {
            flush();
            const parts = c[2] ? [c[2]] : [];
            while (i + 1 < lines.length && /^> (?!\[!)/.test(lines[i + 1])) parts.push(lines[++i].slice(2));
            blocks.push({ kind: 'callout', type: c[1].toUpperCase(), text: parts.join(' ') });
            continue;
        }
        if (line.startsWith('@where ')) {
            flush();
            blocks.push({ kind: 'where', text: line.slice(7) });
            continue;
        }
        if (/^\s*(- |\d+\. )/.test(line)) {
            flush();
            const listLines: string[] = [];
            while (i < lines.length && (/^\s*(- |\d+\. )/.test(lines[i]) || (/^\s{3,}\S/.test(lines[i]) && listLines.length))) {
                listLines.push(lines[i]);
                i++;
            }
            i--;
            blocks.push({ kind: 'list', list: parseList(listLines, 0) });
            continue;
        }
        if (!line.trim()) {
            flush();
            continue;
        }
        para.push(line.trim());
    }
    flush();
    return { meta, blocks };
}

function parseList(lines: string[], indent: number): List {
    const first = lines[0].slice(indent);
    const ordered = /^\d+\. /.test(first);
    const list: List = { ordered, start: ordered ? parseInt(first, 10) : 1, items: [] };
    let i = 0;
    while (i < lines.length) {
        const own = lines[i].slice(indent);
        const text = own.replace(/^(- |\d+\. )/, '');
        const childLines: string[] = [];
        i++;
        while (i < lines.length && lines[i].startsWith(' '.repeat(indent + 3))) childLines.push(lines[i++]);
        list.items.push({ text, children: childLines.length ? parseList(childLines, indent + 3) : null });
    }
    return list;
}

/* ───────────────────────── rendering ───────────────────────── */

function renderList(list: List, locale: Locale, key: string | number, nested = false): ReactNode {
    const Tag = list.ordered ? 'ol' : 'ul';
    return (
        <Tag
            key={key}
            start={list.ordered && list.start !== 1 ? list.start : undefined}
            className={`${list.ordered ? 'list-decimal' : 'list-disc'} pl-5 ${nested ? 'mt-2 space-y-1.5' : 'space-y-2'} marker:text-white/30`}
        >
            {list.items.map((item, n) => (
                <li key={n} className="leading-relaxed">
                    {rich(item.text, { locale })}
                    {item.children && renderList(item.children, locale, 'c', true)}
                </li>
            ))}
        </Tag>
    );
}

function renderBlock(b: Block, locale: Locale, key: number): ReactNode {
    switch (b.kind) {
        case 'p':
            return (
                <p key={key} className="leading-relaxed">
                    {rich(b.text, { locale })}
                </p>
            );
        case 'list':
            return renderList(b.list, locale, key);
        case 'callout':
            return b.type === 'WARNING' ? (
                <div key={key} className="border-l-2 border-red-400/60 bg-red-500/5 px-4 py-3 text-sm text-red-200/90">
                    {rich(b.text, { locale, strongClass: 'font-semibold text-red-100' })}
                </div>
            ) : (
                <div key={key} className="border-l-2 border-white/40 bg-white/[0.03] px-4 py-3 text-sm text-white/80">
                    {rich(b.text, { locale })}
                </div>
            );
        case 'code':
            return (
                <pre key={key} className="bg-white/5 border border-white/10 p-3 rounded text-xs select-all whitespace-pre-wrap">
                    {b.text}
                </pre>
            );
        case 'h':
            return (
                <h2 key={key} className="text-lg font-medium text-white pt-2">
                    {rich(b.text, { locale })}
                </h2>
            );
        case 'where':
            return null;
    }
}

function sliceByHeading(blocks: Block[], level: number) {
    const intro: Block[] = [];
    const groups: { head: Extract<Block, { kind: 'h' }>; body: Block[] }[] = [];
    for (const b of blocks) {
        if (b.kind === 'h' && b.level === level) groups.push({ head: b, body: [] });
        else if (groups.length) groups[groups.length - 1].body.push(b);
        else intro.push(b);
    }
    return { intro, groups };
}

const Intro = ({ blocks, locale }: { blocks: Block[]; locale: Locale }) =>
    blocks.length ? <div className="space-y-4 text-white/60 mb-8">{blocks.map((b, i) => renderBlock(b, locale, i))}</div> : null;

export function DocBody({ doc, locale, labels }: { doc: Doc; locale: Locale; labels: { where: string } }) {
    const layout = doc.meta.layout ?? 'steps';

    if (layout === 'notice') {
        return (
            <div className="border border-dashed border-white/15 rounded-lg px-6 py-14 text-center">
                <p className="font-mono text-xs text-white/40 mb-3">{doc.meta.badge}</p>
                <h2 className="text-xl font-medium mb-3">{doc.meta.title}</h2>
                <div className="text-white/60 max-w-md mx-auto">{doc.blocks.map((b, i) => renderBlock(b, locale, i))}</div>
            </div>
        );
    }

    if (layout === 'sections') {
        const { intro, groups } = sliceByHeading(doc.blocks, 2);
        return (
            <>
                <Intro blocks={intro} locale={locale} />
                <div className="divide-y divide-white/10 border-y border-white/10">
                    {groups.map((g, n) => (
                        <section key={n} className="py-5">
                            <h2 className="font-medium text-white">{rich(g.head.text, { locale })}</h2>
                            <div className="mt-3 space-y-3 text-sm text-white/70">{g.body.map((b, i) => renderBlock(b, locale, i))}</div>
                        </section>
                    ))}
                </div>
            </>
        );
    }

    if (layout === 'faq') {
        const { intro, groups } = sliceByHeading(doc.blocks, 2);
        return (
            <>
                <Intro blocks={intro} locale={locale} />
                <dl className="divide-y divide-white/10 border-y border-white/10">
                    {groups.map((g, n) => (
                        <div key={n} className="py-5">
                            <dt className="text-white font-medium">{rich(g.head.text, { locale })}</dt>
                            <dd className="mt-2 space-y-2 text-white/60 text-sm leading-relaxed">{g.body.map((b, i) => renderBlock(b, locale, i))}</dd>
                        </div>
                    ))}
                </dl>
            </>
        );
    }

    if (layout === 'cards') {
        const { intro, groups } = sliceByHeading(doc.blocks, 2);
        return (
            <div className="space-y-6">
                <Intro blocks={intro} locale={locale} />
                {groups.map((g, n) => {
                    const cards = sliceByHeading(g.body, 3).groups;
                    return (
                        <div key={n} className="space-y-3">
                            <h2 className="font-mono text-xs text-white/40 pt-4">{g.head.text.toLowerCase()}</h2>
                            <div className="grid gap-3 md:grid-cols-2">
                                {cards.map((c, m) => {
                                    const where = c.body.find((b) => b.kind === 'where') as Extract<Block, { kind: 'where' }> | undefined;
                                    return (
                                        <div key={m} className="border border-white/10 bg-white/[0.02] rounded-lg p-5 flex flex-col">
                                            <h3 className="font-semibold text-base mb-2">{rich(c.head.text, { locale })}</h3>
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {c.head.attrs.map((a) => (
                                                    <span key={a} className="font-mono text-[11px] px-1.5 py-0.5 rounded border border-white/15 text-white/60">
                                                        {a}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="text-white/70 text-sm leading-relaxed flex-1 space-y-2">
                                                {c.body.map((b, i) => renderBlock(b, locale, i))}
                                            </div>
                                            {where && (
                                                <p className="text-white/40 text-xs mt-3">
                                                    <span className="text-white/55">{labels.where}:</span> {rich(where.text, { locale })}
                                                </p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    // steps: an intro, then one collapsible row per ## heading ({open} starts it open)
    const { intro, groups } = sliceByHeading(doc.blocks, 2);
    return (
        <>
            <Intro blocks={intro} locale={locale} />
            <div className="border-t border-white/10">
                {groups.map((g, n) => (
                    <InstallationStep key={n} title={g.head.text} defaultOpen={g.head.attrs.includes('open')}>
                        {g.body.map((b, i) => renderBlock(b, locale, i))}
                    </InstallationStep>
                ))}
            </div>
        </>
    );
}
