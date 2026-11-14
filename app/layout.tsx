import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SiteHeader from '@/components/home/SiteHeader';
import SiteFooter from '@/components/home/SiteFooter';
import ScrollToTopOnMount from '@/components/ScrollToTopOnMount';
import DownloadModalRoot from '@/components/DownloadModalRoot';
import MotionProvider from '@/components/MotionProvider';
import { HtmlLang, LanguageBanner, SkipLink } from '@/components/SiteChrome';

const inter = Inter({ subsets: ['latin'] });

const DESCRIPTION =
  'A visual overhaul for Grand Theft Auto V by βeta: new weather, volumetric clouds and smoke, FXPT path tracing for Enhanced and FXRT ray tracing for Legacy.';

export const metadata: Metadata = {
  metadataBase: new URL('https://corefx.me'),
  title: {
    default: 'CoreFX for Grand Theft Auto V',
    template: '%s · CoreFX',
  },
  description: DESCRIPTION,
  openGraph: {
    type: 'website',
    siteName: 'CoreFX',
    title: 'CoreFX for Grand Theft Auto V',
    description: DESCRIPTION,
    url: 'https://corefx.me',
    images: [{ url: '/videos/corefx-poster.jpg', alt: 'CoreFX in GTA V' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CoreFX for Grand Theft Auto V',
    description: DESCRIPTION,
    images: ['/videos/corefx-poster.jpg'],
  },
  verification: {
    google: 'q1VFd5CuMhlxm-SiA9CXNLjEtkZVHH76FABplREUTY4',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#0a0a0a] text-white overflow-x-hidden antialiased`}>
        <SkipLink />
        <HtmlLang />
        <ScrollToTopOnMount />

        <MotionProvider>
          <SiteHeader />

          <div id="content">{children}</div>

          <SiteFooter />

          <DownloadModalRoot />
          <LanguageBanner />
        </MotionProvider>
      </body>
    </html>
  );
}
