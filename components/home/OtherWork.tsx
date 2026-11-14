import { FaGithub } from 'react-icons/fa';
import type { Ui } from '@/lib/content';

const games = ['Overgrowth', 'Halo 3', 'Minecraft'];

const linkRow =
    'group flex items-center justify-between gap-4 py-4 text-white/80 hover:text-white transition-colors';

export default function OtherWork({ t }: { t: Ui['other'] }) {
    return (
        <section id="other" className="relative scroll-mt-20 py-24 sm:py-28 border-t border-white/5">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="max-w-3xl">
                <p className="font-mono text-xs text-white/40 mb-3">{t.label}</p>
                <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-10">{t.title}</h2>

                <p className="font-mono text-xs text-white/40 mb-2">{t.side}</p>
                <div className="divide-y divide-white/10 border-y border-white/10 mb-12">
                    <a href="https://www.gta5-mods.com/users/safari4831" target="_blank" rel="noopener noreferrer" className={linkRow}>
                        <span>{t.mods}</span>
                        <span className="text-white/40 group-hover:text-white transition-colors">↗</span>
                    </a>
                    <a href="https://github.com/crxhvrd" target="_blank" rel="noopener noreferrer" className={linkRow}>
                        <span className="flex items-center gap-3">
                            <FaGithub className="h-4 w-4 text-white/50" />
                            {t.github}
                        </span>
                        <span className="text-white/40 group-hover:text-white transition-colors">↗</span>
                    </a>
                </div>

                <p className="font-mono text-xs text-white/40 mb-3">{t.games}</p>
                <ul className="grid gap-3 sm:grid-cols-3">
                    {games.map((g) => (
                        <li key={g} className="rounded-md border border-dashed border-white/15 px-4 py-5">
                            <p className="text-white/85">{g}</p>
                            <p className="mt-1 font-mono text-[11px] text-white/40">{t.soon}</p>
                        </li>
                    ))}
                </ul>
                </div>
            </div>
        </section>
    );
}
