import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from '@/components/NavBar';
import MobileNav from '@/components/MobileNav'; // ✅ New mobile nav
import Logo from '@/components/Logo';
import VideoBackground from '@/components/VideoBackground';
import ScrollToTopOnMount from '@/components/ScrollToTopOnMount';
import SocialSidebar from '@/components/SocialSideBar';

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

        {/* Fixed Background */}
        <div className="fixed inset-0 z-0">
          <VideoBackground />
        </div>

        {/* Top Logo and Branding */}
        <div className="fixed top-0 left-0 w-full z-50">
          <div className="mx-auto px-4 sm:px-8 py-6 sm:py-8 flex justify-between items-center">
            <Logo
              imageUrl="/images/Beta.png"
              alt="Animated Logo"
              width={48}
              height={48}
              circle={true}
            />

            {/* Static Logo */}
            <Logo
              imageUrl="https://i.imgur.com/Awl16fH.png"
              alt="Static Logo"
              width={72}
              height={72}
              className="rounded"
            />
          </div>
        </div>

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

        {/* Attribution Section */}
        <div className="hidden md:block fixed bottom-8 left-1/2 -translate-x-1/2 z-50 text-xs text-white opacity-60 text-center space-y-1 px-2"> {/* Изменения здесь */}
          <p>Copyright © Beta 2025. All rights reserved.</p>
          <p>
            Made by{' '}
            <a
              href="https://hrishiportv2.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-orange-500 hover:opacity-100" // Добавил hover:opacity-100 для ссылки, если хотите, чтобы она становилась менее прозрачной при наведении
            >
              <span className="group-hover:invisible transition-opacity duration-300">
                Hrishikesh
              </span>
              <span className="absolute left-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded">
                CyaINhxLL
              </span>
            </a>{' '}
            with love
          </p>
        </div>

        {/* Main Page Content */}
        {children}
      </body>
    </html>
  );
}
