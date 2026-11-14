export const DOC_SECTIONS = ['features', 'prerequisites', 'installation', 'settings', 'troubleshooting', 'faq'] as const;
export const INSTALL_TABS = ['singleplayer', 'enhanced', 'fivem', 'fivem-server', 'enhanced-fivem'] as const;
export type DocSection = (typeof DOC_SECTIONS)[number];
export type InstallTab = (typeof INSTALL_TABS)[number];

export const sectionHref = (s: DocSection) => (s === 'installation' ? '/docs/install/singleplayer' : `/docs/${s}`);
