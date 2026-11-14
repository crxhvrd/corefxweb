import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SiteHeader from '@/components/home/SiteHeader';
import SiteFooter from '@/components/home/SiteFooter';
import ScrollToTopOnMount from '@/components/ScrollToTopOnMount';
import DownloadModalRoot from '@/components/DownloadModalRoot';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CoreFX for Grand Theft Auto V',
  description:
    'A visual overhaul for Grand Theft Auto V: new weather, volumetric clouds and smoke, FXPT path tracing for Enhanced and FXRT ray tracing for Legacy.',
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
      <body className={`${inter.className} bg-[#0a0a0a] text-white overflow-x-hidden`}>
        <ScrollToTopOnMount />

        <SiteHeader />

        {/* Main Page Content */}
        {children}

        <SiteFooter />

        <DownloadModalRoot />
      </body>
    </html>
  );
}
