import type { Metadata } from 'next';
import Link from 'next/link';
import DocsShell from '@/components/docs/DocsShell';
import { DOC_SECTIONS, INSTALL_TABS, type DocSection, type InstallTab } from '@/lib/docs';
import { DocBody, readDoc } from '@/lib/md';
import { getUi } from '@/lib/content';
import { fill } from '@/lib/merge';
import { alternatesFor, localePath, type Locale } from '@/lib/i18n';

// One docs page, in one language: /docs/<section> or /docs/install/<build>.

export function docsParams() {
    return [
        { slug: [] as string[] },
        ...DOC_SECTIONS.filter((s) => s !== 'installation').map((s) => ({ slug: [s] })),
        ...INSTALL_TABS.map((tab) => ({ slug: ['install', tab] }))
    ];
}

function resolve(slug: string[] | undefined): { section: DocSection; tab?: InstallTab; file: string; path: string } {
    const [main, sub] = slug ?? [];
    if (main === 'install') {
        const tab = (INSTALL_TABS as readonly string[]).includes(sub) ? (sub as InstallTab) : 'singleplayer';
        return { section: 'installation', tab, file: `install-${tab}`, path: `/docs/install/${tab}` };
    }
    const section = (DOC_SECTIONS as readonly string[]).includes(main) ? (main as DocSection) : 'prerequisites';
    return { section, file: section, path: `/docs/${section}` };
}

export function docsMetadata(locale: Locale, slug: string[] | undefined): Metadata {
    const t = getUi(locale).docs;
    const r = resolve(slug);
    if (r.tab) {
        const name = t.install[r.tab];
        return {
            title: fill(t.meta.installPrefix, { name }),
            description: fill(t.meta.install, { name }),
            alternates: alternatesFor(r.path, locale)
        };
    }
    const key = r.section as Exclude<DocSection, 'installation'>;
    return {
        title: `${t.sections[key]} · ${t.metaSuffix}`,
        description: t.meta[key],
        alternates: alternatesFor(r.path, locale)
    };
}

export default function DocsPage({ locale, slug }: { locale: Locale; slug: string[] | undefined }) {
    const t = getUi(locale).docs;
    const r = resolve(slug);
    const doc = readDoc(locale, r.file);

    return (
        <DocsShell locale={locale} t={t} section={r.section} tab={r.tab}>
            {r.tab ? (
                <>
                    <h1 className="text-2xl sm:text-3xl font-medium tracking-tight mb-4">{t.installTitle}</h1>
                    <div className="flex flex-wrap gap-2 mb-6 lg:hidden">
                        {INSTALL_TABS.map((it) => (
                            <Link
                                key={it}
                                href={localePath(locale, `/docs/install/${it}`)}
                                aria-current={r.tab === it ? 'page' : undefined}
                                className={`px-3 py-1.5 rounded-md text-sm border transition-colors ${r.tab === it ? 'border-white/40 text-white' : 'border-white/10 text-white/60 hover:text-white'
                                    }`}
                            >
                                {t.install[it]}
                            </Link>
                        ))}
                    </div>
                    <p className="hidden lg:block font-mono text-xs text-white/40 mb-6">{t.install[r.tab]}</p>
                </>
            ) : (
                doc.meta.layout !== 'notice' && <h1 className="text-2xl sm:text-3xl font-medium tracking-tight mb-3">{doc.meta.title}</h1>
            )}
            <div className="text-white/70 text-[15px] leading-relaxed">
                <DocBody doc={doc} locale={locale} labels={{ where: t.where }} />
            </div>
        </DocsShell>
    );
}
