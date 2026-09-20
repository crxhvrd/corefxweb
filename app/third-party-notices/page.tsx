import PackageDocument from '@/components/PackageDocument';
import { loadPackageDoc } from '@/lib/packageDoc';

export const metadata = {
  title: 'Third-Party Notices · CoreFX',
  description:
    'Licences and copyright notices for the third-party software CoreFX ships alongside — the same THIRD-PARTY-NOTICES.md that is in every CoreFX package.',
  alternates: { canonical: 'https://corefx.me/third-party-notices' },
};

// Section 5 of the licence points here. Read and parsed at build time.
export default function ThirdPartyNoticesPage() {
  return (
    <PackageDocument
      doc={loadPackageDoc('THIRD-PARTY-NOTICES.md')}
      related={{ href: '/license', label: 'the CoreFX licence' }}
    />
  );
}
