'use client';

import { FaYoutube, FaPatreon, FaDiscord } from 'react-icons/fa';

export default function SocialSidebar() {
  return (
    <div className="fixed  bottom-8 left-8 z-50 flex space-x-4">
      <a
        href="https://www.youtube.com/@CRXHVRD"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black/30 hover:bg-white hover:text-black text-white p-3 rounded-full transition duration-300"
      >
        <FaYoutube className="h-4 w-4" />
      </a>
      <a
        href="https://www.patreon.com/c/crxhvrd"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black/30 hover:bg-white hover:text-black text-white p-3 rounded-full transition duration-300"
      >
        <FaPatreon className="h-4 w-4" />
      </a>
      <a
        href="https://discord.gg/jK4SRmBqYt"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black/30 hover:bg-white hover:text-black text-white p-3 rounded-full transition duration-300"
      >
        <FaDiscord className="h-4 w-4" />
      </a>
    </div>
  );
}
