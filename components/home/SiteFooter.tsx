import Link from 'next/link';

const groups = [
    {
        title: 'CoreFX',
        links: [
            { name: 'Work', href: '/#work' },
            { name: 'Gallery', href: '/#gallery' },
            { name: 'Dev Blog', href: '/devblog' },
            { name: 'About', href: '/#about' }
        ]
    },
    {
        title: 'Help',
        links: [
            { name: 'Documentation', href: '/docs/prerequisites' },
            { name: 'Troubleshooting', href: '/docs/troubleshooting' },
            { name: 'FAQ', href: '/docs/faq' }
        ]
    },
    {
        title: 'Elsewhere',
        links: [
            { name: 'Discord', href: 'https://discord.gg/jK4SRmBqYt', external: true },
            { name: 'YouTube', href: 'https://www.youtube.com/@CRXHVRD', external: true },
            { name: 'Patreon', href: 'https://www.patreon.com/c/crxhvrd', external: true },
            { name: 'GitHub', href: 'https://github.com/crxhvrd', external: true },
            { name: 'GTA5-Mods', href: 'https://www.gta5-mods.com/users/safari4831', external: true }
        ]
    },
    {
        title: 'Legal',
        links: [
            { name: 'Licence', href: '/license' },
            { name: 'Third-party notices', href: '/third-party-notices' },
            { name: 'Partners', href: '/partners' }
        ]
    }
];

export default function SiteFooter() {
    return (
        <footer className="relative border-t border-white/10 bg-[#060708]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 grid gap-10 grid-cols-2 lg:grid-cols-6">
                <div className="col-span-2 space-y-3 text-sm text-white/50">
                    <p className="text-white">CoreFX, by βeta</p>
                    <p>
                        Business proposals:{' '}
                        <a href="mailto:crxhvrd@proton.me" className="text-white/80 underline underline-offset-4 decoration-white/20 hover:text-white">
                            crxhvrd@proton.me
                        </a>
                    </p>
                    <p>Copyright © CRXHVRD 2026. All rights reserved.</p>
                    <p>
                        Website made by{' '}
                        <a href="https://hrishiportv2.vercel.app" target="_blank" rel="noopener noreferrer" className="text-white/80 underline underline-offset-4 decoration-white/20 hover:text-white">
                            Hrishikesh
                        </a>{' '}
                        with love
                    </p>
                </div>
                {groups.map((g) => (
                    <div key={g.title}>
                        <p className="font-mono text-xs text-white/40 mb-4">{g.title.toLowerCase()}</p>
                        <ul className="space-y-2 text-sm">
                            {g.links.map((l) => (
                                <li key={l.name}>
                                    {'external' in l && l.external ? (
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
                    </div>
                ))}
            </div>
        </footer>
    );
}
