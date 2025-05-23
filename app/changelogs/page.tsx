'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaInstagram, FaYoutube, FaPatreon, FaDiscord } from 'react-icons/fa';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useInView } from 'react-intersection-observer';

const changelogs = [
  {
    version: "V0.23E",
    date: "23 Mar 2025",
    images: [
      "https://i.imgur.com/sclszvM.png",
      "https://i.imgur.com/VV4vy6H.jpeg",
      "https://i.imgur.com/YoSvkFF.jpeg",
      "https://i.imgur.com/PgnkDDD.jpeg",
    ],
    changes: [
      "Updated lighting in order to make it work better with RTGI and RT Shadows",
      "Updated fog and sky settings",
      "Updated tonemapping to bring more HDR feel to the image",
      "Updated vignette",
      "Experimental extended white streetlights (extended coffee will be released later)",
      "Fixed green tint on vehicles",
    ]
  },
  // Add more entries here
];

export default function Changelogs() {
  const [selectedVersion, setSelectedVersion] = useState(changelogs[0].version);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: false });
  const [mainImages, setMainImages] = useState(
    changelogs.reduce((acc, log) => {
      acc[log.version] = log.images[0];
      return acc;
    }, {} as Record<string, string>)
  );

  const scrollToVersion = (version: string) => {
    const element = document.getElementById(`version-${version}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setSelectedVersion(version);
  };

  return (
    <main className="min-h-screen pt-24">
      <AnimatedBackground />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
        {/* Main Changelog Section */}
        <ScrollArea className="flex-1 h-[calc(100vh-12rem)] bg-black/20 backdrop-blur-md rounded-lg p-4 sm:p-6 md:p-8 text-white">
          <div className="space-y-6" ref={ref}>
            <h1 className={`text-2xl sm:text-3xl font-bold transition-all duration-700 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              Changelog
            </h1>

            {changelogs.map((log, index) => (
              <div 
                key={log.version}
                id={`version-${log.version}`}
                className={`space-y-6 transition-all duration-700 delay-${index * 100} ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <h3 className="text-lg sm:text-xl font-semibold">
                  {log.version} — {log.date}
                </h3>

                {/* Main Image */}
                <div className="relative w-full h-64 sm:h-80 md:h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src={mainImages[log.version]}
                    alt="Main Preview"
                    fill
                    style={{ objectFit: 'contain', objectPosition: 'center' }}
                    className="w-full h-full"
                    sizes="(max-width: 768px) 100vw, 800px"
                    priority={index === 0}
                  />
                </div>

                {/* Thumbnails */}
                <div className="flex flex-wrap gap-4">
                  {log.images.map((url, idx) => (
                    <div
                      key={idx}
                      className={`w-16 h-16 sm:w-20 sm:h-20 relative rounded-lg cursor-pointer border-2 transition ${
                        mainImages[log.version] === url ? 'border-white' : 'border-transparent'
                      }`}
                      onClick={() =>
                        setMainImages((prev) => ({
                          ...prev,
                          [log.version]: url
                        }))
                      }
                    >
                      <Image
                        src={url}
                        alt={`Thumbnail ${idx}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="80px"
                        loading="lazy"
                        className="rounded-lg"
                      />
                    </div>
                  ))}
                </div>

                {/* Change List */}
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  {log.changes.map((change, idx) => (
                    <li key={idx}>{change}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Sidebar */}
        <ScrollArea className="w-full lg:w-80 h-[calc(100vh-12rem)] bg-black/20 backdrop-blur-md rounded-lg">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Index</h2>
            <div className="space-y-2">
              {changelogs.map((log) => (
                <button
                  key={log.version}
                  onClick={() => scrollToVersion(log.version)}
                  className={`w-full text-left px-4 py-2 rounded-full transition-all duration-300 ${
                    selectedVersion === log.version
                      ? 'bg-white/20 text-white translate-x-2'
                      : 'text-gray-300 hover:text-white hover:bg-black/30 hover:translate-x-2'
                  }`}
                >
                  Version {log.version}
                </button>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    </main>
  );
}
