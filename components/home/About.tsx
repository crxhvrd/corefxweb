'use client';

import Image from 'next/image';
import Link from 'next/link';
import { triggerDownloadModal } from '@/lib/downloadModalEvents';

const linkClass = 'text-white underline underline-offset-4 decoration-white/30 hover:decoration-white';

export default function About() {
    return (
        <section id="about" className="scroll-mt-20 py-24 sm:py-28 border-t border-white/5">
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
                <p className="font-mono text-xs text-white/40 mb-6">about</p>

                <div className="flex items-center gap-4 mb-8">
                    <Image src="/images/Beta.png" alt="βeta" width={48} height={48} className="rounded-full" />
                    <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">Who makes CoreFX</h2>
                </div>

                <div className="space-y-5 text-white/70 leading-relaxed">
                    <p>
                        CoreFX is made by <span className="text-white">βeta</span>, a Discord community
                        that came together in 2021 around the GTA&nbsp;V moviemaking scene. We have been
                        building it since February 2023. The weather, the shader work, the clouds, FXPT
                        and FXRT are our own, built on open tools like ReShade and RenoDX, and we post
                        what we&apos;re working on as we go.
                    </p>
                    <p>
                        <span className="text-white">Getting it.</span> Both singleplayer builds, Legacy
                        and Enhanced, are free: join our Patreon on its free tier and open the latest
                        update post. The Legacy FiveM build is on the $5 tier, and the $9 tier gets each
                        update ten days early. No effect is locked behind a tier.{' '}
                        <button type="button" onClick={() => triggerDownloadModal()} className={linkClass}>
                            How to download
                        </button>
                        .
                    </p>
                    <p>
                        <span className="text-white">Installing and help.</span> The{' '}
                        <Link href="/docs/prerequisites" className={linkClass}>
                            docs
                        </Link>{' '}
                        cover every build, every setting and the{' '}
                        <Link href="/docs/troubleshooting" className={linkClass}>
                            usual problems
                        </Link>
                        . For anything else, come and ask on our{' '}
                        <a href="https://discord.gg/jK4SRmBqYt" target="_blank" rel="noopener noreferrer" className={linkClass}>
                            Discord
                        </a>
                        : that&apos;s where support and updates live.
                    </p>
                </div>
            </div>
        </section>
    );
}
