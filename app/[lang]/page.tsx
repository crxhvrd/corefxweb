import type { Metadata } from 'next';
import HomePage from '@/components/home/HomePage';
import { getUi } from '@/lib/content';
import { alternatesFor, LOCALE_TAGS, type Locale } from '@/lib/i18n';

type Params = { params: { lang: Locale } };

export function generateMetadata({ params }: Params): Metadata {
    const t = getUi(params.lang);
    return {
        title: { absolute: t.meta.title },
        description: t.meta.description,
        alternates: alternatesFor('/', params.lang),
        openGraph: { title: t.meta.title, description: t.meta.description, locale: LOCALE_TAGS[params.lang].replace('-', '_') }
    };
}

export default function LocalizedHome({ params }: Params) {
    return <HomePage locale={params.lang} />;
}
