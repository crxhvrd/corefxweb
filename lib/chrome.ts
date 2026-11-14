'use client';

import { usePathname } from 'next/navigation';
import en from '@/content/en/chrome.json';
import uk from '@/content/uk/chrome.json';
import ru from '@/content/ru/chrome.json';
import { splitPath, type Locale } from '@/lib/i18n';
import { mergeText } from '@/lib/merge';

// Text for the parts every page shares (top bar, footer, download dialog, language
// note). Small, so all languages ship together and the bar can switch instantly.

export type Chrome = typeof en;

const ALL: Record<Locale, unknown> = { en, uk, ru };
const cache = new Map<Locale, Chrome>();

export function chromeFor(locale: Locale): Chrome {
    let c = cache.get(locale);
    if (!c) {
        c = mergeText(en, ALL[locale]);
        cache.set(locale, c);
    }
    return c;
}

export function useLocale() {
    return splitPath(usePathname());
}

export function useChrome() {
    const { locale, path } = useLocale();
    return { locale, path, t: chromeFor(locale) };
}
