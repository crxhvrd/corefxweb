// The site's languages. English lives at the root (corefx.me/...), every other
// language under its own prefix (corefx.me/ru/...). Legal pages stay English only.

export const LOCALES = ['en', 'uk', 'ru'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
export const OTHER_LOCALES = LOCALES.filter((l) => l !== DEFAULT_LOCALE) as Exclude<Locale, 'en'>[];

/** Each language's own name, as its speakers write it. */
export const LOCALE_NAMES: Record<Locale, string> = {
    en: 'English',
    uk: 'Українська',
    ru: 'Русский'
};

/** BCP 47 tags for <html lang> and hreflang. */
export const LOCALE_TAGS: Record<Locale, string> = {
    en: 'en',
    uk: 'uk',
    ru: 'ru'
};

/** Pages that exist in every language. Anything else (licence, notices, partners) is English only. */
const LOCALIZED = [/^\/$/, /^\/docs(\/|$)/, /^\/devblog(\/|$)/];

export function isLocale(value: string | undefined): value is Locale {
    return !!value && (LOCALES as readonly string[]).includes(value);
}

/** Split a pathname into its language and the language-free path. */
export function splitPath(pathname: string | null | undefined): { locale: Locale; path: string } {
    const p = pathname || '/';
    const first = p.split('/')[1];
    if (isLocale(first) && first !== DEFAULT_LOCALE) {
        const rest = p.slice(first.length + 1) || '/';
        return { locale: first, path: rest };
    }
    return { locale: DEFAULT_LOCALE, path: p };
}

export function isLocalizedPath(path: string): boolean {
    const clean = path.split('#')[0].split('?')[0] || '/';
    return LOCALIZED.some((r) => r.test(clean));
}

/** The same page in another language; pages that are English only fall back to that language's home. */
export function localePath(locale: Locale, path: string): string {
    const [base, hash = ''] = path.split('#');
    const clean = base || '/';
    if (locale === DEFAULT_LOCALE) return clean + (hash ? '#' + hash : '');
    if (!isLocalizedPath(clean)) return `/${locale}`;
    const joined = clean === '/' ? `/${locale}` : `/${locale}${clean}`;
    return joined + (hash ? '#' + hash : '');
}

/** Rewrite an internal link written for English (/docs/faq) to the given language. */
export function localizeHref(href: string, locale: Locale): string {
    if (locale === DEFAULT_LOCALE || !href.startsWith('/') || href.startsWith('//')) return href;
    const base = href.split('#')[0] || '/';
    if (!isLocalizedPath(base)) return href;
    return localePath(locale, href);
}

/** hreflang alternates for a language-free path, for page metadata. */
export function alternatesFor(path: string, current: Locale) {
    const languages: Record<string, string> = {};
    for (const l of LOCALES) languages[LOCALE_TAGS[l]] = localePath(l, path);
    languages['x-default'] = path;
    return { canonical: localePath(current, path), languages };
}
