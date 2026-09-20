import Link from 'next/link';
import { Handshake } from 'lucide-react';
import { partners } from '@/data/partners';

export const metadata = {
  title: 'Authorised partners · CoreFX',
  description:
    'The partners licensed to publish CoreFX technology under their own name, as required by section 3.2 of the CoreFX licence.',
  alternates: { canonical: 'https://corefx.me/partners' },
};

const linkClass =
  'text-orange-400 underline decoration-orange-400/50 underline-offset-2 hover:text-orange-300 break-words';

export default function PartnersPage() {
  return (
    <main className="relative mx-auto min-h-screen max-w-3xl px-4 pb-24 pt-12 sm:px-6 sm:pb-32 sm:pt-24">
      <header className="rounded-lg border border-white/10 bg-black/40 px-5 py-5 shadow-lg backdrop-blur-md sm:px-6 sm:py-6">
        <div className="mb-3 flex items-center gap-3">
          <Handshake className="h-6 w-6 shrink-0 text-orange-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
          <h1 className="text-2xl font-semibold text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.85)] sm:text-4xl">
            Authorised partners
          </h1>
        </div>

        <p className="leading-relaxed text-gray-200">
          We separately license selected partners to distribute CoreFX, in whole or in part,
          under their own product names. This is the list that{' '}
          <Link href="/license#3-2-authorised-partners" className={linkClass}>
            section 3.2 of the licence
          </Link>{' '}
          requires us to publish, and it is the only place a partnership is confirmed.
        </p>
      </header>

      <ol className="mt-6 space-y-4">
        {partners.map((partner) => (
          <li
            key={partner.href}
            className="rounded-lg border border-white/10 bg-black/30 p-5 backdrop-blur-md sm:p-6"
          >
            <h2 className="text-xl font-semibold text-white">{partner.name}</h2>
            <p className="mt-1">
              <a
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {partner.site}
              </a>
            </p>
            <p className="mt-3 leading-relaxed text-gray-300">{partner.what}</p>
          </li>
        ))}
      </ol>

      <div className="mt-6 space-y-4 rounded-lg border border-white/10 bg-black/30 p-5 backdrop-blur-md sm:p-6">
        <h2 className="text-xl font-semibold text-white">What being on this list means</h2>

        <ul className="list-disc space-y-3 pl-6 text-gray-300 marker:text-white/40">
          <li className="leading-relaxed">
            <strong className="font-semibold text-white">Their product is not a leak.</strong>{' '}
            If you find CoreFX technology inside a product published by a partner above, it is
            there with our agreement.
          </li>
          <li className="leading-relaxed">
            <strong className="font-semibold text-white">Their terms apply, not ours.</strong>{' '}
            If you obtained CoreFX as part of a partner&apos;s product, that partner&apos;s
            licence decides what you may do with it. The{' '}
            <Link href="/license" className={linkClass}>
              CoreFX licence
            </Link>{' '}
            governs the copies we distribute ourselves.
          </li>
          <li className="leading-relaxed">
            <strong className="font-semibold text-white">
              Nobody else may assume permission.
            </strong>{' '}
            Being a server owner, a mod author, a large community or a paying customer does not
            create a right to rebrand or redistribute CoreFX. Partnerships are granted in
            writing, by us, or they do not exist.
          </li>
        </ul>

        <p className="border-t border-white/10 pt-4 text-sm text-white/60">
          Not on this list and think you should be? Partnership and licensing enquiries go to{' '}
          <a href="mailto:crxhvrd@proton.me" className={linkClass}>
            crxhvrd@proton.me
          </a>
          .
        </p>
      </div>

      <div className="mt-12 text-center text-xs text-white/40">
        <Link href="/" className="underline hover:text-white/70">
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
