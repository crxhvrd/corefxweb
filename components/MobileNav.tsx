'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, Download, BookOpen, ListOrdered } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Download', href: 'https://www.patreon.com/c/crxhvrd', icon: Download },
  { name: 'Documentation', href: '/docs', icon: BookOpen },
  { name: 'Changelogs', href: '/changelogs', icon: ListOrdered },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="relative flex flex-col items-center space-y-2">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-full bg-white text-black shadow-md z-50"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Expandable Icons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="nav-items"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center space-y-2 mt-2"
          >
            {navItems.map(({ name, href, icon: Icon }) => {
              const isActive = pathname === href;

              return (
                <Link
                  key={name}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`p-2 rounded-full transition-colors duration-300 ${
                    isActive ? 'bg-white text-black' : 'text-white hover:bg-white/20'
                  }`}
                  aria-label={name}
                >
                  <Icon size={20} />
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
