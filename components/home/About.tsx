import Image from 'next/image';
import type { Ui } from '@/lib/content';
import type { Locale } from '@/lib/i18n';
import { rich } from '@/lib/rich';
import { TEAM } from '@/data/team';

export default function About({ t, locale }: { t: Ui['about']; locale: Locale }) {
    return (
        <section id="about" className="relative scroll-mt-20 py-24 sm:py-28 border-t border-white/5">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="max-w-3xl">
                    <p className="font-mono text-xs text-white/40 mb-6">{t.label}</p>

                    <div className="flex items-center gap-4 mb-8">
                        <Image src="/images/Beta.png" alt="βeta" width={48} height={48} className="rounded-full" />
                        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">{t.title}</h2>
                    </div>

                    <div className="space-y-5 text-white/70 leading-relaxed">
                        {t.paragraphs.map((p, i) => (
                            <p key={i}>{rich(p, { locale, strongClass: 'text-white' })}</p>
                        ))}
                    </div>

                    <p className="font-mono text-xs text-white/40 mt-16 mb-4">{t.team.label}</p>
                    <ul className="border-t border-white/10">
                        {TEAM.map((m) => (
                            <li
                                key={m.name}
                                className="grid gap-1 border-b border-white/10 py-4 sm:grid-cols-[11rem_1fr_auto] sm:items-baseline sm:gap-6"
                            >
                                <span className="font-medium text-white">
                                    {m.name}
                                    {m.aka && (
                                        <span className="ml-2 text-sm font-normal text-white/40">
                                            {t.team.aka} {m.aka}
                                        </span>
                                    )}
                                </span>
                                <span className="font-mono text-xs text-white/50">
                                    {m.roles.map((r) => t.team.roles[r]).join(' · ')}
                                </span>
                                <span className="flex gap-4 text-sm">
                                    {m.links.map((l) => (
                                        <a
                                            key={l.href}
                                            href={l.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white/70 underline decoration-white/20 underline-offset-4 hover:text-white hover:decoration-white"
                                        >
                                            {l.label}
                                        </a>
                                    ))}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
