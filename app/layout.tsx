import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from '@/components/NavBar';
import MobileNav from '@/components/MobileNav'; // ✅ New mobile nav
import HeaderLogos from '@/components/HeaderLogos';
import VideoBackground from '@/components/VideoBackground';
import ScrollToTopOnMount from '@/components/ScrollToTopOnMount';
import SocialSidebar from '@/components/SocialSideBar';
import DownloadModalRoot from '@/components/DownloadModalRoot';
import ScrollIndicator from '@/components/ScrollIndicator';
import BodyScrollbarHide from '@/components/BodyScrollbarHide';
import AttributionFooter from '@/components/AttributionFooter';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CoreFX for Grand Theft Auto V',
  description: 'Visual Overhaul',
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
    <html lang="en">
      <body className={`${inter.className} bg-black text-white overflow-x-hidden`}>
        <ScrollToTopOnMount />
        <BodyScrollbarHide />

        {/* Fixed Background */}
        <div className="fixed inset-0 z-0">
          <VideoBackground />
        </div>

        {/* Top Logo and Branding - hides on docs page */}
        <HeaderLogos />

        {/* Desktop NavBar - Bottom Right */}
        <div className="fixed bottom-8 right-8 z-50 hidden md:block">
          <NavBar />
        </div>

        {/* Mobile Nav - Bottom Right trigger, slides in from right */}
        <div className="fixed bottom-4 right-4 z-50 md:hidden">
          <MobileNav />
        </div>

        {/* Social Sidebar */}
        <SocialSidebar />

        {/* Scroll Indicator */}
        <ScrollIndicator />

        {/* Main Page Content */}
        {children}

        {/* Attribution — hides on docs and devblog routes */}
        <AttributionFooter />

        <DownloadModalRoot />
      </body>
    </html>
  );
}
