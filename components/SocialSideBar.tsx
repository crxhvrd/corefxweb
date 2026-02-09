'use client';

import { useState } from 'react';
import { FaYoutube, FaPatreon, FaDiscord } from 'react-icons/fa';
import { FiCompass } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

export default function SocialSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const socials = [
    {
      href: 'https://www.youtube.com/@CRXHVRD',
      icon: FaYoutube,
      label: 'YouTube',
    },
    {
      href: 'https://www.patreon.com/c/crxhvrd',
      icon: FaPatreon,
      label: 'Patreon',
    },
    {
      href: 'https://discord.gg/jK4SRmBqYt',
      icon: FaDiscord,
      label: 'Discord',
    },
  ];

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:flex fixed bottom-8 left-8 z-50 space-x-4">
        {socials.map(({ href, icon: Icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black/30 hover:bg-white hover:text-black text-white p-3 rounded-full transition duration-300"
            aria-label={label}
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>

      {/* Mobile View */}
      <div className="md:hidden fixed bottom-6 left-4 z-50 flex flex-col items-start space-y-3">
        {/* Expanded icons */}
        <AnimatePresence>
          {isOpen &&
            socials.map(({ href, icon: Icon, label }, index) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.15, delay: index * 0.05 }}
                className="bg-black/40 hover:bg-white hover:text-black text-white p-4 rounded-full transition duration-300"
                aria-label={label}
              >
                <Icon className="h-6 w-6" />
              </motion.a>
            ))}
        </AnimatePresence>

        {/* Toggle button using compass icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 rounded-full bg-white text-black shadow-lg"
          aria-label="Toggle Social Links"
        >
          {isOpen ? (
            <span className="text-lg font-bold">×</span>
          ) : (
            <FiCompass className="h-6 w-6" />
          )}
        </button>
      </div>
    </>
  );
}
