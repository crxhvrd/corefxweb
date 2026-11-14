'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { FaDiscord, FaGithub, FaPatreon, FaYoutube } from 'react-icons/fa';
import { Menu, X } from 'lucide-react';
import { triggerDownloadModal } from '@/lib/downloadModalEvents';

const links = [
    { name: 'Work', href: '/#work' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Dev Blog', href: '/devblog', match: '/devblog' },
    { name: 'Docs', href: '/docs/prerequisites', match: '/docs' },
    { name: 'About', href: '/#about' }
];

const socials = [
    { href: 'https://discord.gg/jK4SRmBqYt', icon: FaDiscord, label: 'Discord' },
    { href: 'https://www.patreon.com/c/crxhvrd', icon: FaPatreon, label: 'Patreon' },
    { href: 'https://www.youtube.com/@CRXHVRD', icon: FaYoutube, label: 'YouTube' },
    { href: 'https://github.com/crxhvrd', icon: FaGithub, label: 'GitHub' }
];

export default function SiteHeader() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => setOpen(false), [pathname]);

    const solid = scrolled || pathname !== '/';

    return (
        <header
            className={`fixed top-0 inset-x-0 z-50 backdrop-blur-md border-b border-white/10 transition-colors duration-300 ${solid ? 'bg-[#08090b]/85' : 'bg-black/25'
                }`}
        >
            <div className="mx-auto max-w-7xl h-16 px-4 sm:px-6 flex items-center gap-6">
                <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="CoreFX home">
                    <Image
                        src="/images/Beta.png"
                        alt="βeta"
                        width={28}
                        height={28}
                        className="rounded-full"
                    />
                    <span className="text-white/30">/</span>
                    <Image
                        src="https://i.imgur.com/Awl16fH.png"
                        alt="CoreFX"
                        width={40}
                        height={40}
                        className="rounded"
                        unoptimized
                    />
                </Link>

                <nav className="hidden md:flex items-center gap-1 text-sm">
                    {links.map((l) => {
                        const active = l.match ? pathname?.startsWith(l.match) : false;
                        return (
                            <Link
                                key={l.name}
                                href={l.href}
                                className={`px-3 py-2 rounded-md transition-colors ${active ? 'text-white' : 'text-white/65 hover:text-white'
                                    }`}
                            >
                                {l.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="ml-auto flex items-center gap-2">
                    <div className="hidden md:flex items-center gap-1 mr-2">
                        {socials.map(({ href, icon: Icon, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="p-2 rounded-md text-white/60 hover:text-white transition-colors"
                            >
                                <Icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() => triggerDownloadModal()}
                        className="px-3 py-2 text-sm text-white/85 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white/70 transition-colors"
                    >
                        Download
                    </button>
                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        className="md:hidden p-2 text-white/80 hover:text-white"
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        aria-expanded={open}
                    >
                        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.nav
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden overflow-hidden bg-[#08090b]/95 border-b border-white/10"
                    >
                        <div className="px-4 py-3 flex flex-col">
                            {links.map((l) => (
                                <Link
                                    key={l.name}
                                    href={l.href}
                                    onClick={() => setOpen(false)}
                                    className="py-3 text-base text-white/80 hover:text-white border-b border-white/5 last:border-0"
                                >
                                    {l.name}
                                </Link>
                            ))}
                            <div className="flex gap-2 pt-3">
                                {socials.map(({ href, icon: Icon, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="p-3 rounded-full bg-white/5 text-white/80"
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}
