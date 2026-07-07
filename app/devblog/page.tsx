import postsData from '@/data/devblog-posts.json';
import DevBlogClient, { type DevblogPost } from './DevBlogClient';

export const metadata = {
  title: 'Dev Blog · CoreFX',
  description: 'Latest development updates from the CoreFX team, streamed live from our Discord announcements channel.',
};

// The bundled JSON is only a fallback / first-paint snapshot. DevBlogClient
// re-fetches the live file from GitHub raw after mount, so new Discord posts
// show up without triggering a Vercel rebuild. See scripts/vercel-ignore-build.sh.
export default function DevBlogPage() {
  return <DevBlogClient initialPosts={postsData as DevblogPost[]} />;
}
