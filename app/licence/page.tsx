import PackageDocument from '@/components/PackageDocument';
import { loadPackageDoc } from '@/lib/packageDoc';

// The licence itself is written in British English, so /licence is the spelling
// people copy out of it. `output: 'export'` has no redirects, so this serves the
// same page and points search engines at /license.
export const metadata = {
  title: 'Licence · CoreFX',
  description:
    'The CoreFX end user licence agreement — the same LICENSE.md that ships inside every CoreFX package.',
  alternates: { canonical: 'https://corefx.me/license' },
};

export default function LicencePage() {
  return (
    <PackageDocument
      doc={loadPackageDoc('LICENSE.md')}
      related={{ href: '/third-party-notices', label: 'the third-party notices' }}
    />
  );
}
