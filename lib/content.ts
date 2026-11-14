import fs from 'fs';
import path from 'path';
import en from '@/content/en/ui.json';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n';
import { mergeText } from '@/lib/merge';

// Page text (home, docs labels, dev blog) for one language, read at build time on the
// server, so a page only ever ships its own language.

export type Ui = typeof en;

export function getUi(locale: Locale): Ui {
    if (locale === DEFAULT_LOCALE) return en;
    const file = path.join(process.cwd(), 'content', locale, 'ui.json');
    if (!fs.existsSync(file)) return en;
    return mergeText(en, JSON.parse(fs.readFileSync(file, 'utf8')));
}

