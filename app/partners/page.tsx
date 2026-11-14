import Link from 'next/link';
import { partners } from '@/data/partners';

export const metadata = {
  title: 'Authorised partners',
  description:
    'The partners licensed to publish CoreFX technology under their own name, as required by section 3.2 of the CoreFX licence.',
  alternates: { canonical: 'https://corefx.me/partners' },
};

const linkClass =
  'text-white underline decoration-white/30 underline-offset-4 hover:decoration-white break-words';

export default function PartnersPage() {
  return (
    <main className="relative mx-auto min-h-screen max-w-3xl px-4 pb-24 pt-28 sm:px-6 sm:pb-32 sm:pt-32">
      <header className="border-b border-white/10 pb-8">
        <p className="mb-3 font-mono text-xs text-white/40">legal</p>
        <h1 className="mb-4 text-2xl font-medium tracking-tight text-white sm:text-3xl">Authorised partners</h1>

        <p className="leading-relaxed text-white/70">
          We separately license selected partners to distribute CoreFX, in whole or in part,
          under their own product names. This is the list that{' '}
          <Link href="/license#3-2-authorised-partners" className={linkClass}>
            section 3.2 of the licence
          </Link>{' '}
          requires us to publish, and it is the only place a partnership is confirmed.
        </p>
      </header>

      <ol className="divide-y divide-white/10 border-b border-white/10">
        {partners.map((partner) => (
          <li
            key={partner.href}
            className="py-6"
          >
            <h2 className="text-lg font-medium text-white">{partner.name}</h2>
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
            <p className="mt-3 leading-relaxed text-white/70">{partner.what}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10 space-y-4">
        <h2 className="text-lg font-medium text-white">What being on this list means</h2>

        <ul className="list-disc space-y-3 pl-6 text-white/70 marker:text-white/40">
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

    </main>
  );
}
