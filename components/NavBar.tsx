'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Download', href: 'https://www.patreon.com/c/crxhvrd' },
  { name: 'Documentation', href: '/docs' },
  { name: 'Changelogs', href: '/changelogs' },
  
];

export default function NavBar() {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState(pathname);

  return (
    <nav className="relative backdrop-blur-md bg-black/30 rounded-xl px-3 py-1 shadow-md border border-white/10">
      <ul className="relative flex space-x-4">
        {navItems.map((item) => {
          const isActive = activeItem === item.href;
          return (
            <li key={item.name} className="relative flex items-center justify-center">
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
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
