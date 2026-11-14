import type { Metadata } from 'next';
import DevBlogPage from '@/components/DevBlogPage';
import { getUi } from '@/lib/content';
import { alternatesFor } from '@/lib/i18n';

const t = getUi('en').devblog;

export const metadata: Metadata = {
  title: t.title,
  description: t.description,
  alternates: alternatesFor('/devblog', 'en')
};

export default function Page() {
  return <DevBlogPage locale="en" />;
}
