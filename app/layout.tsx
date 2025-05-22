import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from '@/components/NavBar';
import Logo from '@/components/Logo';
import VideoBackground from '@/components/VideoBackground';
import ScrollToTopOnMount from '@/components/ScrollToTopOnMount';
import SocialSidebar from '@/components/SocialSideBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CoreFX - Immersive Experience',
  description: 'An immersive visual experience with stunning animations',
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

        {/* Navigation Bar */}
        <div className="fixed top-0 left-0 w-full z-50">
          {/* Уменьшаем ширину контейнера, чтобы лого сдвинулись ближе друг к другу */}
          <div className="mx-auto max-w-4xl px-8 py-8 flex justify-between items-center">
            {/* GIF Logo */}
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
              width={84}
              height={84}
              className="rounded"
            />
          </div>
        </div>

        {/* Floating NavBar Bottom Right */}
        <div className="fixed bottom-8 right-8 z-50">
          <NavBar />
        </div>

        {/* Floating Social Sidebar Left Center */}
        <SocialSidebar />

        {/* Floating Attribution Section */}
        <div
          className="
            fixed bottom-8 left-1/2 -translate-x-1/2
            z-50 text-xs text-white text-center
            space-y-1 opacity-50
          "
        >
          <p>Copyright © Beta 2025. All rights reserved.</p>
          <p>
            Made by{' '}
            <a
              href="https://hrishiportv2.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-orange-500"
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

        {/* Page Content */}
        {children}
      </body>
    </html>
  );
}
