
import DocsClient from './DocsClient';

const installTabs = [
  'singleplayer',
  'enhanced',
  'fivem',
  'fivem-server',
  'enhanced-fivem'
] as const;

export async function generateStaticParams() {
  const paths = [
    { slug: [] as string[] }, // /docs
    { slug: ['prerequisites'] }, // /docs/prerequisites
    { slug: ['settings'] }, // /docs/settings
    ...installTabs.map((tab) => ({ slug: ['install', tab] })) // /docs/install/[tab]
  ];

  return paths;
}

export default function Page() {
  return <DocsClient />;
}
