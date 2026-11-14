import type { Metadata } from 'next';
import DocsPage, { docsMetadata, docsParams } from '@/components/docs/DocsPage';

type Params = { params: { slug?: string[] } };

export function generateStaticParams() {
  return docsParams();
}

export function generateMetadata({ params }: Params): Metadata {
  return docsMetadata('en', params.slug);
}

export default function Page({ params }: Params) {
  return <DocsPage locale="en" slug={params.slug} />;
}
