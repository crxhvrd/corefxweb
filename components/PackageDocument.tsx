import Link from 'next/link';
import type { Block, Inline, PackageDoc, TocEntry } from '@/lib/packageDoc';

/* ───────────────────────── inline ───────────────────────── */

const linkClass =
  'text-white underline decoration-white/30 underline-offset-4 hover:decoration-white break-words';

const codeClass = 'rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] text-white/90';

function renderInline(nodes: Inline[]): React.ReactNode[] {
  return nodes.map((node, i) => {
    switch (node.k) {
      case 'text':
        return <span key={i}>{node.text}</span>;
      case 'code':
        return (
          <code key={i} className={codeClass}>
            {node.text}
          </code>
        );
      case 'link': {
        const isMail = node.href.indexOf('mailto:') === 0;
        return (
          <a
            key={i}
            href={node.href}
            target={isMail ? undefined : '_blank'}
            rel={isMail ? undefined : 'noopener noreferrer'}
            className={linkClass}
          >
            {node.text}
          </a>
        );
      }
      case 'strong':
        return (
          <strong key={i} className="font-semibold text-white">
            {renderInline(node.children)}
          </strong>
        );
      case 'em':
        return <em key={i}>{renderInline(node.children)}</em>;
    }
  });
}

/* ───────────────────────── blocks ───────────────────────── */

function renderBlock(block: Block, i: number, prose: string): React.ReactNode {
  switch (block.k) {
    case 'heading':
      // Only levels 2 and 3 occur in these files; anything deeper reads as a 3.
      return block.level <= 2 ? (
        <h2
          key={i}
          id={block.id}
          className="scroll-mt-24 pt-6 text-xl font-semibold text-white first:pt-0 sm:text-2xl"
        >
          {renderInline(block.children)}
        </h2>
      ) : (
        <h3
          key={i}
          id={block.id}
          className="scroll-mt-24 pt-2 text-base font-semibold text-white/90 sm:text-lg"
        >
          {renderInline(block.children)}
        </h3>
      );

    case 'paragraph':
      return (
        <p key={i} className={`leading-relaxed ${prose}`}>
          {renderInline(block.children)}
        </p>
      );

    case 'list': {
      const items = block.items.map((item, n) => (
        <li key={n} className={`leading-relaxed ${prose}`}>
          {renderInline(item)}
        </li>
      ));

      return block.ordered ? (
        <ol
          key={i}
          start={block.start}
          className="list-decimal space-y-3 pl-6 marker:text-white/40"
        >
          {items}
        </ol>
      ) : (
        <ul key={i} className="list-disc space-y-3 pl-6 marker:text-white/40">
          {items}
        </ul>
      );
    }

    // Verbatim third-party licence text: set apart and quieter than our own
    // words, so it is obvious which is which.
    case 'quote':
      return (
        <blockquote
          key={i}
          className="space-y-3 border-l-2 border-white/15 py-1 pl-4 text-sm text-white/55"
        >
          {block.children.map((child, n) => renderBlock(child, n, 'text-white/55'))}
        </blockquote>
      );

    case 'hr':
      return <hr key={i} className="!mt-8 border-white/10" />;
  }
}

function Blocks({ blocks, prose = 'text-gray-300' }: { blocks: Block[]; prose?: string }) {
  return <>{blocks.map((block, i) => renderBlock(block, i, prose))}</>;
}

/* ───────────────────────── contents ───────────────────────── */

function TocLinks({ toc }: { toc: TocEntry[] }) {
  return (
    <ol className="space-y-1.5 text-sm">
      {toc.map((entry) => (
        <li key={entry.id}>
          <a
            href={`#${entry.id}`}
            className="block rounded px-2 py-1 text-white/60 transition-colors hover:bg-white/5 hover:text-white"
          >
            {entry.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

/* ───────────────────────── page ───────────────────────── */

export default function PackageDocument({
  doc,
  related,
}: {
  doc: PackageDoc;
  related?: { href: string; label: string }[];
}) {
  return (
    <main className="relative mx-auto min-h-screen max-w-5xl px-4 pb-24 pt-28 sm:px-6 sm:pb-32 sm:pt-32">
      <header className="border-b border-white/10 pb-8">
        <p className="mb-3 font-mono text-xs text-white/40">legal</p>
        <h1 className="mb-4 text-2xl font-medium tracking-tight text-white sm:text-3xl">{doc.title}</h1>

        {doc.version && (
          <p className="mb-4 inline-block rounded border border-white/15 px-2 py-0.5 font-mono text-xs text-white/60">
            {doc.version}
          </p>
        )}

        <div className="space-y-3 text-sm sm:text-base">
          <Blocks blocks={doc.preamble} prose="text-white/70" />
        </div>

        <p className="mt-5 border-t border-white/10 pt-4 text-xs text-white/50">
          This is the same <code className={codeClass}>{doc.fileName}</code> that ships inside
          every CoreFX archive.{' '}
          <a href={`/${doc.fileName}`} className={linkClass}>
            Open the original file
          </a>
          .
          {related && related.length > 0 && (
            <>
              {' '}
              See also{' '}
              {related.map((item, i) => (
                <span key={item.href}>
                  {i > 0 && (i === related.length - 1 ? ' and ' : ', ')}
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </span>
              ))}
              .
            </>
          )}
        </p>
      </header>

      {/* Contents: collapsed on small screens, pinned beside the text on large ones */}
      {doc.toc.length > 0 && (
        <details className="group mt-6 rounded-md border border-white/10 lg:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-3 text-sm font-medium text-white/80 [&::-webkit-details-marker]:hidden">
            Contents
            <span className="text-white/40 transition-transform group-open:rotate-180">▾</span>
          </summary>
          <div className="border-t border-white/10 px-3 py-3">
            <TocLinks toc={doc.toc} />
          </div>
        </details>
      )}

      <div className="mt-6 flex flex-col gap-8 lg:mt-8 lg:flex-row lg:items-start">
        {doc.toc.length > 0 && (
          <nav
            aria-label="Contents"
            className="hidden w-60 shrink-0 lg:sticky lg:top-24 lg:block"
          >
            <p className="px-2 pb-2 font-mono text-xs text-white/40">contents</p>
            <TocLinks toc={doc.toc} />
          </nav>
        )}

        <article className="min-w-0 flex-1 space-y-4">
          <Blocks blocks={doc.body} prose="text-white/70" />

          {doc.footer.length > 0 && (
            <div className="space-y-2 border-t border-white/10 pt-6 text-sm">
              <Blocks blocks={doc.footer} prose="text-white/50" />
            </div>
          )}
        </article>
      </div>

    </main>
  );
}
