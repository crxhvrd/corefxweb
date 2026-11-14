'use client';

import Link from 'next/link';
import { useChrome } from '@/lib/chrome';
import { localePath } from '@/lib/i18n';
import { rich } from '@/lib/rich';

const FOOTER_LINK = 'text-white/80 underline underline-offset-4 decoration-white/20 hover:text-white';

export default function SiteFooter() {
    const { locale, t } = useChrome();
    const f = t.footer;
    const L = (href: string) => localePath(locale, href);

    const groups: { title: string; links: { name: string; href: string; external?: boolean }[] }[] = [
        {
            title: f.groups.corefx,
            links: [
                { name: f.links.work, href: L('/#work') },
                { name: f.links.gallery, href: L('/#gallery') },
                { name: f.links.devblog, href: L('/devblog') },
                { name: f.links.about, href: L('/#about') }
            ]
        },
        {
            title: f.groups.help,
            links: [
                { name: f.links.docs, href: L('/docs/prerequisites') },
                { name: f.links.troubleshooting, href: L('/docs/troubleshooting') },
                { name: f.links.faq, href: L('/docs/faq') }
            ]
        },
        {
            title: f.groups.elsewhere,
            links: [
                { name: 'Discord', href: 'https://discord.gg/jK4SRmBqYt', external: true },
                { name: 'YouTube', href: 'https://www.youtube.com/@CRXHVRD', external: true },
                { name: 'Patreon', href: 'https://www.patreon.com/c/crxhvrd', external: true },
                { name: 'GitHub', href: 'https://github.com/crxhvrd', external: true },
                { name: 'GTA5-Mods', href: 'https://www.gta5-mods.com/users/safari4831', external: true }
            ]
        },
        {
            title: f.groups.legal,
            links: [
                { name: f.links.licence, href: '/license' },
                { name: f.links.notices, href: '/third-party-notices' },
                { name: f.links.partners, href: '/partners' }
            ]
        }
    ];

    return (
        <footer className="relative border-t border-white/10 bg-[#060708]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 grid gap-10 grid-cols-2 lg:grid-cols-6">
                <div className="col-span-2 space-y-3 text-sm text-white/50">
                    <p className="text-white">{f.tagline}</p>
                    <p>
                        {f.business}{' '}
                        <a href="mailto:crxhvrd@proton.me" className={FOOTER_LINK}>
                            crxhvrd@proton.me
                        </a>
                    </p>
                    <p>{f.copyright}</p>
                    <p>{rich(f.madeBy, { locale, linkClass: FOOTER_LINK })}</p>
                </div>
                {groups.map((g) => (
                    <div key={g.title}>
                        <p className="font-mono text-xs text-white/40 mb-4">{g.title}</p>
                        <ul className="space-y-2 text-sm">
                            {g.links.map((l) => (
                                <li key={l.href}>
                                    {l.external ? (
                                        <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
                                            {l.name}
                                        </a>
                                    ) : (
                                        <Link href={l.href} className="text-white/70 hover:text-white">
                                            {l.name}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                        {g.title === f.groups.legal && f.legalNote && <p className="mt-3 text-xs text-white/35">{f.legalNote}</p>}
                    </div>
                ))}
            </div>
        </footer>
    );
}
