import type { Metadata } from 'next';
import DocsPage, { docsMetadata, docsParams } from '@/components/docs/DocsPage';
import type { Locale } from '@/lib/i18n';

type Params = { params: { lang: Locale; slug?: string[] } };

export const dynamicParams = false;

export function generateStaticParams() {
    return docsParams();
}

export function generateMetadata({ params }: Params): Metadata {
    return docsMetadata(params.lang, params.slug);
}

export default function Page({ params }: Params) {
    return <DocsPage locale={params.lang} slug={params.slug} />;
}
