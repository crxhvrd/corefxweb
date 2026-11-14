'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Globe } from 'lucide-react';
import { LOCALES, LOCALE_NAMES, LOCALE_TAGS, localePath } from '@/lib/i18n';
import { useChrome } from '@/lib/chrome';

export const LANG_KEY = 'corefx-lang';

export function rememberLanguage(locale: string) {
    try {
        localStorage.setItem(LANG_KEY, locale);
    } catch {
        // storage blocked: the choice simply isn't remembered
    }
}

export default function LanguageSwitcher({ inline = false }: { inline?: boolean }) {
    const { locale, path, t } = useChrome();
    const [open, setOpen] = useState(false);
    const box = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const onDown = (e: MouseEvent) => {
            if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
        };
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
        document.addEventListener('mousedown', onDown);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onDown);
            document.removeEventListener('keydown', onKey);
        };
    }, [open]);

    const list = (
        <ul className={inline ? 'grid grid-cols-2 gap-1' : 'py-1'}>
            {LOCALES.map((l) => (
                <li key={l}>
                    <Link
                        href={localePath(l, path)}
                        hrefLang={LOCALE_TAGS[l]}
                        lang={LOCALE_TAGS[l]}
                        onClick={() => {
                            rememberLanguage(l);
                            setOpen(false);
                        }}
                        aria-current={l === locale ? 'true' : undefined}
                        className={`block px-3 py-2 text-sm rounded-md transition-colors ${l === locale ? 'text-white bg-white/[0.07]' : 'text-white/65 hover:text-white hover:bg-white/[0.04]'
                            }`}
                    >
                        {LOCALE_NAMES[l]}
                    </Link>
                </li>
            ))}
        </ul>
    );

    if (inline) {
        return (
            <div>
                <p className="font-mono text-xs text-white/40 mb-2">{t.nav.language}</p>
                {list}
            </div>
        );
    }

    return (
        <div ref={box} className="relative">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="true"
                aria-expanded={open}
                aria-label={t.nav.language}
                className="flex items-center gap-1.5 px-2 py-2 rounded-md text-sm text-white/65 hover:text-white transition-colors"
            >
                <Globe className="w-4 h-4" />
                <span className="font-mono text-xs uppercase">{locale}</span>
            </button>
            {open && (
                <div className="absolute right-0 top-full mt-2 w-52 rounded-lg border border-white/10 bg-[#0d0d0d] shadow-2xl">
                    {list}
                </div>
            )}
        </div>
    );
}
