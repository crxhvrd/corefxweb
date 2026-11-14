import Image from 'next/image';
import type { Ui } from '@/lib/content';
import type { Locale } from '@/lib/i18n';
import { rich } from '@/lib/rich';

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
                </div>
            </div>
        </section>
    );
}
