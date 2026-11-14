import type { Metadata } from 'next';
import DocsClient from './DocsClient';

const installTabs = [
  'singleplayer',
  'enhanced',
  'fivem',
  'fivem-server',
  'enhanced-fivem'
] as const;

const installNames: Record<(typeof installTabs)[number], string> = {
  singleplayer: 'Legacy Singleplayer',
  enhanced: 'Enhanced Singleplayer',
  fivem: 'Legacy FiveM',
  'fivem-server': 'Legacy FiveM ServerSide',
  'enhanced-fivem': 'Enhanced FiveM'
};

const pages: Record<string, { title: string; description: string }> = {
  features: {
    title: 'Features',
    description: 'What CoreFX does in GTA V Legacy and Enhanced, and where each feature lives in the menu.'
  },
  prerequisites: {
    title: 'Prerequisites',
    description: 'Hardware, software and in-game settings CoreFX needs, for Legacy and Enhanced.'
  },
  settings: {
    title: 'Shader Settings',
    description: 'Every tab and setting in the CoreFX Addon menu: FXRT, FXPT, anti-aliasing, frame generation, clouds, smoke and HDR.'
  },
  troubleshooting: {
    title: 'Troubleshooting',
    description: 'Fixes sorted by what you see, and every on-screen CoreFX notice explained.'
  },
  faq: {
    title: 'FAQ',
    description: 'The questions people ask most about CoreFX.'
  }
};

export async function generateStaticParams() {
  const paths = [
    { slug: [] as string[] }, // /docs
    { slug: ['features'] }, // /docs/features
    { slug: ['prerequisites'] }, // /docs/prerequisites
    { slug: ['settings'] }, // /docs/settings
    { slug: ['troubleshooting'] }, // /docs/troubleshooting
    { slug: ['faq'] }, // /docs/faq
    ...installTabs.map((tab) => ({ slug: ['install', tab] })) // /docs/install/[tab]
  ];

  return paths;
}

export function generateMetadata({ params }: { params: { slug?: string[] } }): Metadata {
  const [main, sub] = params.slug ?? [];

  if (main === 'install') {
    const name = installNames[sub as keyof typeof installNames] ?? 'Installation';
    return {
      title: `Install: ${name}`,
      description: `How to install, update and remove CoreFX for ${name}.`,
      alternates: { canonical: `/docs/install/${sub ?? 'singleplayer'}` }
    };
  }

  const page = pages[main ?? 'prerequisites'] ?? pages.prerequisites;
  return {
    title: `${page.title} · Docs`,
    description: page.description,
    alternates: { canonical: `/docs/${main ?? 'prerequisites'}` }
  };
}

export default function Page() {
  return <DocsClient />;
}
