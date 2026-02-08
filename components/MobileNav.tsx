'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, Download, BookOpen } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { triggerDownloadModal } from '@/lib/downloadModalEvents';

type NavItem =
  | { name: string; type: 'link'; href: string; icon: typeof Home }
  | { name: string; type: 'download'; icon: typeof Download };

const navItems: NavItem[] = [
  { name: 'Home', type: 'link', href: '/', icon: Home },
  { name: 'Download', type: 'download', icon: Download },
  { name: 'Documentation', type: 'link', href: '/docs', icon: BookOpen },
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
            {navItems.map((item) => {
              const Icon = item.icon;
              const key = item.type === 'link' ? item.href : item.name;
              const isActive = item.type === 'link' ? pathname === item.href : false;

              return item.type === 'link' ? (
                <Link
                  key={key}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`p-2 rounded-full transition-colors duration-300 ${
                    isActive ? 'bg-white text-black' : 'text-white hover:bg-white/20'
                  }`}
                  aria-label={item.name}
                >
                  <Icon size={20} />
                </Link>
              ) : (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    triggerDownloadModal();
                    setIsOpen(false);
                  }}
                  className="p-2 rounded-full text-white transition-colors duration-300 hover:bg-white/20"
                  aria-label={item.name}
                >
                  <Icon size={20} />
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
