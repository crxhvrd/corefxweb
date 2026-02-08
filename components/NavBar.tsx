'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { triggerDownloadModal } from '@/lib/downloadModalEvents';

type NavItem =
  | { name: string; type: 'link'; href: string }
  | { name: string; type: 'download' };

const navItems: NavItem[] = [
  { name: 'Home', type: 'link', href: '/' },
  { name: 'Download', type: 'download' },
  { name: 'Documentation', type: 'link', href: '/docs' },
];

export default function NavBar() {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState(pathname);

  return (
    <nav className="relative backdrop-blur-md bg-black/30 rounded-xl px-3 py-1 shadow-md border border-white/10">
      <ul className="relative flex space-x-4">
        {navItems.map((item) => {
          const key = item.type === 'link' ? item.href : item.name;
          const isActive = item.type === 'link' ? activeItem === item.href : false;

          return (
            <li key={key} className="relative flex items-center justify-center">
              {item.type === 'link' ? (
                <Link
                  href={item.href}
                  onClick={() => setActiveItem(item.href)}
                  className={`
                    relative flex flex-col items-center px-3 py-1 text-sm font-medium transition-colors duration-300
                    ${isActive ? 'text-white' : 'text-gray-300 hover:text-white'}
                  `}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="mt-[2px] h-[2px] w-6 bg-white rounded-full"
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              ) : (
                <motion.button
                  type="button"
                  onClick={() => {
                    triggerDownloadModal();
                  }}
                  className="relative flex flex-col items-center px-4 py-1.5 text-sm font-semibold text-orange-400 hover:text-orange-300 rounded-lg transition-colors duration-300"
                  animate={{
                    boxShadow: [
                      '0 0 0px rgba(251, 146, 60, 0)',
                      '0 0 12px rgba(251, 146, 60, 0.6)',
                      '0 0 0px rgba(251, 146, 60, 0)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {item.name}
                </motion.button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
