// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from '@/components/NavBar';
import Logo from '@/components/Logo';
import VideoBackground from '@/components/VideoBackground';
import ScrollToTopOnMount from '@/components/ScrollToTopOnMount';
import SocialSidebar from '@/components/SocialSideBar'; // 👈 New import

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
          <div className="mx-auto px-8 py-8 flex justify-between items-center">
            {/* Left Logo - GIF */}
            <Logo
              imageUrl="/images/Beta.png"
              alt="Animated Logo"
              width={38}
              height={38}
              circle={true}
            />

            <Logo
              imageUrl="https://i.imgur.com/Awl16fH.png"
              alt="Static Logo"
              width={64}
              height={64}
              className="rounded"
            />
          </div>
        </div>

        {/* Floating NavBar Bottom Right */}
        <div className="fixed bottom-8 right-8 z-50">
          <NavBar />
        </div>

        {/* Floating Social Sidebar Left Center */}
        <SocialSidebar /> {/* 👈 Add this */}

        {/* Page Content */}
        {children}
      </body>
    </html>
  );
}
