import type { Metadata } from 'next';
import DevBlogPage from '@/components/DevBlogPage';
import { getUi } from '@/lib/content';
import { alternatesFor, type Locale } from '@/lib/i18n';

type Params = { params: { lang: Locale } };

export function generateMetadata({ params }: Params): Metadata {
    const t = getUi(params.lang).devblog;
    return { title: t.title, description: t.description, alternates: alternatesFor('/devblog', params.lang) };
}

export default function Page({ params }: Params) {
    return <DevBlogPage locale={params.lang} />;
}
