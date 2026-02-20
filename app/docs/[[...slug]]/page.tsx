
import DocsClient from './DocsClient';

const installTabs = [
  'singleplayer',
  'enhanced',
  'fivem',
  'fivem-server',
  'ragemp',
  'enhanced-ragemp'
] as const;

export async function generateStaticParams() {
  const paths = [
    { slug: [] }, // /docs
    { slug: ['prerequisites'] }, // /docs/prerequisites
    ...installTabs.map((tab) => ({ slug: ['install', tab] })) // /docs/install/[tab]
  ];

  return paths;
}

export default function Page() {
  return <DocsClient />;
}
