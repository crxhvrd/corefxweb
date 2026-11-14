'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { chromeFor, useChrome } from '@/lib/chrome';
import { LOCALES, LOCALE_TAGS, localePath, isLocalizedPath, type Locale } from '@/lib/i18n';
import { LANG_KEY, rememberLanguage } from '@/components/LanguageSwitcher';

/** "Skip to content", in the page's language. */
export function SkipLink() {
    const { t } = useChrome();
    return (
        <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1000] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-black"
        >
            {t.skip}
        </a>
    );
}

/** Keeps <html lang> right on every page (the root layout is shared by all languages). */
export function HtmlLang() {
    const { locale } = useChrome();
    useEffect(() => {
        document.documentElement.lang = LOCALE_TAGS[locale];
    }, [locale]);
    return null;
}

/**
 * A one-time, dismissible note on English pages for visitors whose browser prefers one
 * of our other languages. Nothing redirects on its own.
 */
export function LanguageBanner() {
    const { locale, path } = useChrome();
    const [suggest, setSuggest] = useState<Locale | null>(null);

    useEffect(() => {
        if (locale !== 'en' || !isLocalizedPath(path)) return setSuggest(null);
        let chosen: string | null = null;
        try {
            chosen = localStorage.getItem(LANG_KEY);
        } catch {
            // no storage: suggest every time, it is still dismissible
        }
        if (chosen) return;
        const wanted = (navigator.languages ?? [navigator.language]).map((l) => l.toLowerCase());
        for (const w of wanted) {
            if (w.startsWith('en')) return;
            const hit = LOCALES.find((l) => l !== 'en' && (w === LOCALE_TAGS[l].toLowerCase() || w.split('-')[0] === l));
            if (hit) return setSuggest(hit);
        }
    }, [locale, path]);

    if (!suggest) return null;
    const t = chromeFor(suggest).banner;

    return (
        <div
            lang={LOCALE_TAGS[suggest]}
            className="fixed bottom-4 left-4 right-4 sm:left-auto sm:max-w-sm z-[60] rounded-lg border border-white/15 bg-[#0d0d0d]/95 backdrop-blur-md px-4 py-3 shadow-2xl flex items-center gap-3"
        >
            <p className="text-sm text-white/80 flex-1">{t.text}</p>
            <Link
                href={localePath(suggest, path)}
                onClick={() => rememberLanguage(suggest)}
                className="text-sm text-white underline underline-offset-4 decoration-white/40 hover:decoration-white whitespace-nowrap"
            >
                {t.switch}
            </Link>
            <button
                type="button"
                aria-label={t.dismiss}
                onClick={() => {
                    rememberLanguage('en');
                    setSuggest(null);
                }}
                className="p-1 text-white/50 hover:text-white"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}
