import fs from 'fs';
import path from 'path';

/**
 * A deliberately small Markdown reader with one job: rendering the legal
 * documents that ship inside every CoreFX archive — LICENSE.md and
 * THIRD-PARTY-NOTICES.md — as pages. Both are kept verbatim in public/, so the
 * site can never say something different from the file in the download.
 *
 * It covers exactly the subset those files use:
 *   ATX headings, thematic breaks (---), paragraphs, tight bullet and ordered
 *   lists with wrapped continuation lines, blockquotes (which may contain their
 *   own paragraphs and lists), `code`, **strong**, *emphasis*, and bare URLs /
 *   e-mail addresses.
 *
 * It covers nothing else. If either file grows a construct that is not on that
 * list — a table, an [inline](link), a fenced code block — teach this file
 * about it rather than letting it fall through as plain text. A markdown
 * dependency is not an option here: package-lock.json is committed and Vercel
 * installs with `npm ci`, which fails when the two disagree.
 *
 * Everything runs at build time (`output: 'export'`), so the output has to stay
 * JSON-serialisable to cross into the rendered page.
 */

export type Inline =
  | { k: 'text'; text: string }
  | { k: 'code'; text: string }
  | { k: 'link'; text: string; href: string }
  | { k: 'strong'; children: Inline[] }
  | { k: 'em'; children: Inline[] };

export type Block =
  | { k: 'heading'; level: number; id: string; text: string; children: Inline[] }
  | { k: 'paragraph'; children: Inline[] }
  | { k: 'list'; ordered: boolean; start: number; items: Inline[][] }
  | { k: 'quote'; children: Block[] }
  | { k: 'hr' };

export type TocEntry = { id: string; text: string };

export type PackageDoc = {
  /** The file this came from, e.g. "LICENSE.md" — also served from public/. */
  fileName: string;
  /** The H1, shown in the page header rather than in the prose. */
  title: string;
  /** Version stamp lifted out of the opening paragraph, where there is one. */
  version: string | null;
  /** Blocks before the first `---` — the preamble that frames the document. */
  preamble: Block[];
  /** The document itself. */
  body: Block[];
  /** A short closing note after the last `---`, where there is one. */
  footer: Block[];
  /** Level-2 headings, for the in-page contents list. */
  toc: TocEntry[];
};

/* ───────────────────────── inline ───────────────────────── */

// Bare URLs and e-mail addresses. `*` is excluded from the URL body so a link
// that ends a **bold** run does not swallow the closing asterisks.
const AUTOLINK =
  "(https?:\\/\\/[^\\s<>\"'`*]+)|([A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\\.[A-Za-z0-9-]+)+)";

function autolink(src: string): Inline[] {
  const out: Inline[] = [];
  const re = new RegExp(AUTOLINK, 'g');
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(src)) !== null) {
    if (m.index > last) out.push({ k: 'text', text: src.slice(last, m.index) });

    const raw = m[0];
    // Sentence punctuation after a URL belongs to the prose, not to the link.
    const target = raw.replace(/[.,;:!?)\]]+$/, '');
    const href = /^https?:/i.test(target) ? target : `mailto:${target}`;
    out.push({ k: 'link', text: target, href });

    const tail = raw.slice(target.length);
    if (tail) out.push({ k: 'text', text: tail });
    last = m.index + raw.length;
  }

  if (last < src.length) out.push({ k: 'text', text: src.slice(last) });
  return out;
}

// `code` first so its contents stay literal, then **strong**, then *emphasis*.
// The strong branch is tried before the emphasis branch at any given position,
// so `**x**` is never read as an empty emphasis followed by stray text.
const INLINE = "`([^`]+)`|\\*\\*([\\s\\S]+?)\\*\\*|\\*(?!\\*)([^*]+)\\*";

function parseInline(src: string): Inline[] {
  const out: Inline[] = [];
  // Built per call: parseInline recurses, and a shared /g regex would have its
  // lastIndex clobbered by the inner run.
  const re = new RegExp(INLINE, 'g');
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(src)) !== null) {
    if (m.index > last) out.push(...autolink(src.slice(last, m.index)));

    if (m[1] !== undefined) out.push({ k: 'code', text: m[1] });
    else if (m[2] !== undefined) out.push({ k: 'strong', children: parseInline(m[2]) });
    else out.push({ k: 'em', children: parseInline(m[3]) });

    last = m.index + m[0].length;
  }

  if (last < src.length) out.push(...autolink(src.slice(last)));
  return out;
}

export function inlineText(nodes: Inline[]): string {
  return nodes
    .map((n) => (n.k === 'strong' || n.k === 'em' ? inlineText(n.children) : n.text))
    .join('');
}

/* ───────────────────────── blocks ───────────────────────── */

const HEADING = /^(#{1,6}) +(.*?)\s*$/;
const RULE = /^ {0,3}(-{3,}|\*{3,}|_{3,})\s*$/;
const BULLET = /^[-*+] +(.*)$/;
const ORDERED = /^(\d+)\. +(.*)$/;
const QUOTE = /^ {0,3}>/;
const CONTINUATION = /^\s+\S/;

function startsNewBlock(line: string): boolean {
  return (
    RULE.test(line) ||
    HEADING.test(line) ||
    BULLET.test(line) ||
    ORDERED.test(line) ||
    QUOTE.test(line)
  );
}

function slugify(text: string, taken: Set<string>): string {
  // ASCII-only on purpose: tsconfig targets es5, where TypeScript rejects the
  // regex `u` flag that \p{L} would need.
  const base =
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'section';

  let id = base;
  let n = 2;
  while (taken.has(id)) id = `${base}-${n++}`;
  taken.add(id);
  return id;
}

function parseLines(lines: string[], ids: Set<string>): Block[] {
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    if (RULE.test(line)) {
      blocks.push({ k: 'hr' });
      i++;
      continue;
    }

    const heading = HEADING.exec(line);
    if (heading) {
      const children = parseInline(heading[2]);
      const text = inlineText(children);
      blocks.push({
        k: 'heading',
        level: heading[1].length,
        id: slugify(text, ids),
        text,
        children,
      });
      i++;
      continue;
    }

    // A quoted licence text is a document in its own right — strip the markers
    // and read what is inside with the same rules.
    if (QUOTE.test(line)) {
      const quoted: string[] = [];
      while (i < lines.length && QUOTE.test(lines[i])) {
        quoted.push(lines[i].replace(/^ {0,3}> ?/, ''));
        i++;
      }
      blocks.push({ k: 'quote', children: parseLines(quoted, ids) });
      continue;
    }

    const ordered = ORDERED.exec(line);
    if (ordered || BULLET.test(line)) {
      const isOrdered = ordered !== null;
      const start = isOrdered ? Number(ordered![1]) : 1;
      const items: string[] = [];

      while (i < lines.length) {
        const current = lines[i];
        const marker = isOrdered ? ORDERED.exec(current) : BULLET.exec(current);
        if (marker) {
          items.push(isOrdered ? marker[2] : marker[1]);
          i++;
          continue;
        }
        // These files are hard-wrapped, so an item runs on across indented lines.
        if (items.length > 0 && CONTINUATION.test(current)) {
          items[items.length - 1] += ` ${current.trim()}`;
          i++;
          continue;
        }
        break;
      }

      blocks.push({
        k: 'list',
        ordered: isOrdered,
        start,
        items: items.map(parseInline),
      });
      continue;
    }

    const paragraph: string[] = [];
    while (i < lines.length && lines[i].trim() && !startsNewBlock(lines[i])) {
      paragraph.push(lines[i].trim());
      i++;
    }
    // Soft line breaks join with a space, the way any Markdown renderer treats
    // a hard-wrapped paragraph.
    blocks.push({ k: 'paragraph', children: parseInline(paragraph.join(' ')) });
  }

  return blocks;
}

/* ───────────────────────── document ───────────────────────── */

/**
 * The licence opens with "**Licence version X — effective …**", which the page
 * shows as a badge. Lift it out so it is not stated twice. Documents without
 * such a stamp are left alone.
 */
function takeVersion(blocks: Block[]): string | null {
  const first = blocks[0];
  if (!first || first.k !== 'paragraph') return null;

  const lead = first.children[0];
  if (!lead || lead.k !== 'strong') return null;

  const text = inlineText(lead.children);
  if (!/^licence version/i.test(text)) return null;

  first.children = first.children.slice(1);
  const next = first.children[0];
  if (next && next.k === 'text') next.text = next.text.replace(/^\s+/, '');
  return text;
}

function hasHeading(blocks: Block[]): boolean {
  return blocks.some((b) => b.k === 'heading');
}

export function parsePackageDoc(fileName: string, markdown: string): PackageDoc {
  const ids = new Set<string>();
  const blocks = parseLines(markdown.replace(/\r\n?/g, '\n').split('\n'), ids);

  let title = fileName;
  const first = blocks[0];
  if (first && first.k === 'heading' && first.level === 1) {
    title = first.text;
    blocks.shift();
  }

  // Both files frame themselves with `---`: an opening preamble, and a short
  // closing note. Rules in between stay put and render as dividers.
  const rules: number[] = [];
  blocks.forEach((block, i) => {
    if (block.k === 'hr') rules.push(i);
  });

  const opening = rules.length > 0 ? rules[0] : -1;
  const preamble = opening >= 0 ? blocks.slice(0, opening) : [];

  // A trailing chunk is only a footer when it is a closing note rather than a
  // section of the document, so it must carry no heading of its own.
  const lastRule = rules.length >= 2 ? rules[rules.length - 1] : -1;
  const tail = lastRule >= 0 ? blocks.slice(lastRule + 1) : [];
  const closing = tail.length > 0 && !hasHeading(tail) ? lastRule : -1;

  const body = blocks.slice(opening + 1, closing >= 0 ? closing : blocks.length);
  const footer = closing >= 0 ? tail : [];

  const toc: TocEntry[] = body
    .filter((b): b is Extract<Block, { k: 'heading' }> => b.k === 'heading' && b.level === 2)
    .map((b) => ({ id: b.id, text: b.text }));

  return { fileName, title, version: takeVersion(preamble), preamble, body, footer, toc };
}

/** Reads a document that ships with every CoreFX package. Build time only. */
export function loadPackageDoc(fileName: string): PackageDoc {
  const file = path.join(process.cwd(), 'public', fileName);
  return parsePackageDoc(fileName, fs.readFileSync(file, 'utf8'));
}
