import PackageDocument from '@/components/PackageDocument';
import { loadPackageDoc } from '@/lib/packageDoc';

export const metadata = {
  title: 'Licence · CoreFX',
  description:
    'The CoreFX end user licence agreement — the same LICENSE.md that ships inside every CoreFX package.',
  alternates: { canonical: 'https://corefx.me/license' },
};

// Read and parsed at build time: `output: 'export'` renders this to static HTML.
export default function LicensePage() {
  return (
    <PackageDocument
      doc={loadPackageDoc('LICENSE.md')}
      related={[
        { href: '/third-party-notices', label: 'the third-party notices' },
        { href: '/partners', label: 'the authorised partners' },
      ]}
    />
  );
}
