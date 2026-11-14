import postsData from '@/data/devblog-posts.json';
import DevBlogClient, { type DevblogPost } from '@/app/devblog/DevBlogClient';
import { getUi } from '@/lib/content';
import type { Locale } from '@/lib/i18n';

// The bundled JSON is only a fallback / first-paint snapshot. DevBlogClient
// re-fetches the live file from GitHub raw after mount, so new Discord posts
// show up without triggering a Vercel rebuild. See scripts/vercel-ignore-build.sh.
export default function DevBlogPage({ locale }: { locale: Locale }) {
    return <DevBlogClient initialPosts={postsData as DevblogPost[]} t={getUi(locale).devblog} locale={locale} />;
}
