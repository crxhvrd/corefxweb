'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { localePath, type Locale } from '@/lib/i18n';
import type { Ui } from '@/lib/content';
import { DOC_SECTIONS, INSTALL_TABS, sectionHref, type DocSection, type InstallTab } from '@/lib/docs';


export default function DocsShell({
    locale,
    t,
    section,
    tab,
    children
}: {
    locale: Locale;
    t: Ui['docs'];
    section: DocSection;
    tab?: InstallTab;
    children: React.ReactNode;
}) {
    const nav = useRef<HTMLElement>(null);

    // phones: bring the current section into view in the sideways nav row
    useEffect(() => {
        const el = nav.current;
        const active = el?.querySelector<HTMLElement>('[data-active="true"]');
        if (el && active && el.scrollWidth > el.clientWidth) el.scrollTo({ left: active.offsetLeft - 16 });
    }, [section]);

    return (
        <main className="min-h-screen pt-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-14">
                <aside className="mb-8 lg:mb-0">
                    <div className="lg:sticky lg:top-24">
                        <p className="font-mono text-xs text-white/40 mb-3">{t.label}</p>
                        <nav
                            ref={nav}
                            aria-label={t.label}
                            className="relative flex lg:flex-col gap-1 overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0 pb-2 lg:pb-0"
                        >
                            {DOC_SECTIONS.map((s) => (
                                <div key={s} className="shrink-0">
                                    <Link
                                        href={localePath(locale, sectionHref(s))}
                                        data-active={section === s}
                                        aria-current={section === s ? 'page' : undefined}
                                        className={`block w-full text-left whitespace-nowrap rounded-md px-3 py-2 text-sm transition-colors ${section === s ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'
                                            }`}
                                    >
                                        {t.sections[s]}
                                    </Link>
                                    {s === 'installation' && section === 'installation' && (
                                        <div className="hidden lg:flex flex-col mt-1 mb-2 ml-3 border-l border-white/10">
                                            {INSTALL_TABS.map((it) => (
                                                <Link
                                                    key={it}
                                                    href={localePath(locale, `/docs/install/${it}`)}
                                                    aria-current={tab === it ? 'page' : undefined}
                                                    className={`-ml-px text-left pl-3 pr-2 py-1.5 text-[13px] border-l rounded-r-md transition-colors ${tab === it
                                                        ? 'border-white bg-white/[0.07] text-white'
                                                        : 'border-transparent text-white/45 hover:text-white hover:bg-white/[0.03]'
                                                        }`}
                                                >
                                                    {t.install[it]}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>
                        <div className="hidden lg:block mt-8 pt-6 border-t border-white/10 space-y-2 text-sm">
                            <a href="https://discord.gg/jK4SRmBqYt" target="_blank" rel="noopener noreferrer" className="block text-white/50 hover:text-white">
                                {t.ask}
                            </a>
                            <Link href={localePath(locale, '/devblog')} className="block text-white/50 hover:text-white">
                                {t.devblog}
                            </Link>
                        </div>
                    </div>
                </aside>

                <div className="min-w-0 max-w-3xl">{children}</div>
            </div>
        </main>
    );
}
