/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useInView } from 'react-intersection-observer';

/* ───────────────────────── DATA ───────────────────────── */

const prerequisitesSections = [
  {
    title: 'Prerequisites',
    content:
      'Before installing and using CoreFX, please ensure your system meets these requirements.',
    requirements: [
      {
        title: 'Legacy Hardware Requirements',
        items: [
          'Minimum: NVIDIA GeForce GTX 1060 or AMD Radeon RX 580',
          'Recommended: NVIDIA GeForce RTX 3060 or AMD Radeon RX 6600 XT'
        ]
      },
      {
        title: 'Enhanced Hardware Requirements',
        items: [
          'Ray Tracing Minimum: NVIDIA GeForce RTX 3050 or AMD Radeon RX 6600',
          'Ray Tracing Recommended: NVIDIA GeForce RTX 4060 Ti or AMD Radeon RX 7700 XT'
        ]
      },
      {
        title: 'Software',
        items: [
          'Base Game: A legitimate copy of Grand Theft Auto V.',
          'OpenIV & OpenIV.asi (Legacy Singleplayer): Required for installing the mod into the Legacy mods folder.',
          'CodeWalker & OpenRPF.asi (Enhanced Singleplayer): Required for installing the mod into the Enhanced mods folder.',
          'ScriptHookV & Asi Loader (Legacy & Enhanced Singleplayer): Necessary for proper script loading.'
        ]
      },
      {
        title: 'Optional',
        items: [
          'FiveM or RageMP (Multiplayer): CoreFX supports multiplayer platforms.',
          'Graphics Driver Updates: Keep your GPU drivers up to date.'
        ]
      }
    ],
    warning:
      'Mixing CoreFX with other graphics mods is not recommended and can potentially break your game. Please note that ENBSeries is no longer supported by its developer or by CoreFX. By using CoreFX you automatically agree with these rules.',
    image:
      'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

const faqs = [
  {
    question:
      "I don't like blur when moving camera (motion blur). How can I disable it?",
    answer:
      'Can be disabled using the Disable Motion Blur optional. In FiveM ServerSide version you need to open timecycle_mods_1.xml and change <postfx_motionblurlength> to 0.000 0.000. GTA 5 Enhanced motion blur can be disabled directly in the game graphical settings.'
  },
  {
    question: 'Can I use other mods with CoreFX?',
    answer:
      'It is possible, but not all mods are compatible. Mods that significantly alter the visuals of the game (like other graphics enhancers or weather overhauls) may conflict with CoreFX. Texture replacement mods are generally safer to combine.'
  },
  {
    question:
      'Is CoreFX compatible with Singleplayer and multiplayer platforms like FiveM or RageMP?',
    answer:
      'Yes. However, installation steps differ for each platform — please refer to the Installation section for detailed instructions.'
  },
  {
    question: 'Where can I find updates and support?',
    answer:
      'You can join our discord through corefx.me, click on discord logo at bottom-left side of the website'
  },
  {
    question: 'What are the SE Addons and why should I consider them?',
    answer:
      'SE Addons are extra add-ons available for Patreon supporters. They currently include Volumetric Clouds and HBGi Shaders for GTA 5 Legacy Singleplayer. Purchasing these add-ons supports future development.'
  },
  {
    question:
      'In Rockstar Editor, my recorded clips show a blurred screen when moving. What causes this?',
    answer:
      'This is caused by in-game motion blur remaining enabled. Disable motion blur via the Optionals folder and record new clips; previously recorded clips will remain blurred.'
  },
  {
    question: 'Does CoreFX run on FiveM servers with Pure Mode enabled?',
    answer:
      'Pure Mode restricts custom client modifications. Currently, CoreFX does not have permission to run under enforced Pure Mode.'
  }
];


/* ──────────────── types & helpers ──────────────── */

const installTabs = [
  'singleplayer',
  'enhanced',
  'fivem',
  'fivem-server',
  'ragemp',
  'enhanced-ragemp'
] as const;
type InstallTab = typeof installTabs[number];

const installLabels: Record<InstallTab, string> = {
  singleplayer: 'Legacy Singleplayer',
  enhanced: 'Enhanced Singleplayer',
  fivem: 'Legacy FiveM',
  'fivem-server': 'Legacy FiveM ServerSide',
  ragemp: 'Legacy RageMP',
  'enhanced-ragemp': 'Enhanced RageMP'
};

/* ───────────────────────── COMPONENT ───────────────────────── */

export default function Prerequisites() {

  const [activeSection, setActiveSection] = useState<
    'prerequisites' | 'installation'
  >('prerequisites');

  const [activeInstallTab, setActiveInstallTab] =
    useState<InstallTab>('singleplayer');
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: false });

  const toggleFaq = (idx: number) =>
    setOpenFaqs((list) =>
      list.includes(idx) ? list.filter((i) => i !== idx) : [...list, idx]
    );

  return (
    <main className="min-h-screen pt-6 sm:pt-8">
      <AnimatedBackground />

      <div className="container mx-auto px-3 sm:px-4 md:px-8 flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
        {/* ───────── LEFT PANE ───────── */}
        <div className="w-full lg:flex-1 max-h-[calc(100vh-10rem)] bg-black/20 backdrop-blur-md rounded-lg overflow-y-auto">
          <div className="p-4 md:p-8">
            {/* section switcher with expanding menu */}
            <div className="flex items-center gap-2 mb-8 relative">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveSection('prerequisites')}
                  className={`px-4 py-3 rounded-full text-base sm:text-sm md:text-base transition-all h-12 sm:h-10 flex items-center justify-center ${activeSection === 'prerequisites'
                    ? 'bg-white/20 text-white'
                    : 'bg-black/30 text-gray-300 hover:bg-white hover:text-black'
                    }`}
                >
                  Prerequisites
                </button>
                <button
                  onClick={() => setActiveSection('installation')}
                  className={`px-4 py-3 rounded-full text-base sm:text-sm md:text-base transition-all h-12 sm:h-10 flex items-center justify-center ${activeSection === 'installation'
                    ? 'bg-white/20 text-white'
                    : 'bg-black/30 text-gray-300 hover:bg-white hover:text-black'
                    }`}
                >
                  Installation
                </button>
              </div>
            </div>

            {/* ───────── PREREQUISITES ───────── */}
            {activeSection === 'prerequisites' && (
              <div className="space-y-6" ref={ref}>
                {prerequisitesSections.map((section, idx) => (
                  <div
                    key={idx}
                    className={`bg-black/30 rounded-lg overflow-hidden transition-all duration-700 delay-${idx * 100
                      } ${inView
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-10'
                      }`}
                  >
                    <div className="p-5 md:p-6">
                      <h2 className="text-2xl md:text-xl font-semibold mb-3">
                        {section.title}
                      </h2>
                      <p className="text-gray-300 text-base md:text-sm mb-4">{section.content}</p>

                      {section.warning && (
                        <div className="bg-red-900/30 border border-red-700/50 p-4 rounded-lg mb-4">
                          <p className="text-red-300 text-sm">
                            {section.warning}
                          </p>
                        </div>
                      )}

                      <div className="space-y-4">
                        {section.requirements.map((req, rIdx) => (
                          <div key={rIdx}>
                            <h3 className="font-medium text-white/80 text-base md:text-base">
                              {req.title}
                            </h3>
                            <ul className="list-disc pl-5 mt-2 space-y-2">
                              {req.items.map((item, iIdx) => (
                                <li
                                  key={iIdx}
                                  className="text-gray-300 text-base md:text-sm"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ───────── INSTALLATION ───────── */}
            {activeSection === 'installation' && (
              <div className="space-y-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-4">
                  Installation
                </h1>

                {/* install-tab switcher */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {installTabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveInstallTab(tab)}
                      className={`px-4 py-3 sm:py-2 rounded-full text-sm sm:text-xs md:text-sm transition-all ${activeInstallTab === tab
                        ? 'bg-white/20 text-white'
                        : 'bg-black/30 text-gray-300 hover:bg-white hover:text-black'
                        }`}
                    >
                      {installLabels[tab]}
                    </button>
                  ))}
                </div>

                {/* install content */}
                <div className="bg-black/30 p-6 rounded-lg space-y-4">
                  {/* ───────── Legacy Singleplayer ───────── */}
                  {activeInstallTab === 'singleplayer' && (
                    <div className="install-block">
                      <h4>Legacy Singleplayer Installation</h4>
                      <ul className="list-disc pl-5 text-gray-300 space-y-2">
                        <li>
                          <strong>Before Installing:</strong>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>
                              Add <code>-noBattlEye</code> to your game
                              launcher's parameters.
                            </li>
                          </ol>
                        </li>
                        <li>
                          <strong>Installing CoreFX:</strong>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>
                              Open <code>InstallCoreFX.oiv</code> using OpenIV.
                            </li>
                            <li>
                              Follow the on-screen prompts to install the mod
                              into the <em>mods</em> folder.
                            </li>
                            <li>
                              Launch GTA V and set in-game brightness to
                              40-50 %.
                            </li>
                            <li>
                              <div className="bg-red-900/30 border border-red-700/50 p-4 rounded-lg mb-4">
                                <p className="text-red-300 text-sm">
                                  It is really important to have DirectX 11 enabled and PostFX and Shader quality set to Ultra in ingame settings to prevent visual bugs and to enable new shader features
                                </p>
                              </div>
                            </li>
                          </ol>
                        </li>
                        <li>
                          <strong>Uninstalling CoreFX:</strong>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>
                              Open <code>UninstallCoreFX.oiv</code> using
                              OpenIV.
                            </li>
                            <li>
                              Reinstall original files in the <em>mods</em>{' '}
                              folder.
                            </li>
                          </ol>
                        </li>
                        <li>
                          <strong>Installing CoreFX Shaders (ReShade):</strong>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>
                              <strong>Important:</strong> Before installing, remove any old ENBSeries or ReShade files from your GTA V root directory to avoid compatibility issues. These files may be named <code>d3d11.dll</code>, <code>d3d12.dll</code>, <code>dxgi.dll</code>, <code>dxgi.asi</code>, or <code>ReShade.asi</code>.
                            </li>
                            <li>
                              Copy all ReShade files from the provided package into your main game directory.
                            </li>
                            <li>
                              In-game, press <strong>F7</strong> to open the ReShade menu and enable available shaders manually.
                            </li>
                            <li>
                              If the ReShade menu does not appear when pressing <strong>F7</strong>, rename <code>d3d12.dll</code> to <code>dxgi.dll</code> in your game directory, then relaunch the game.
                            </li>
                          </ol>
                        </li>
                        <li>
                          <strong>Uninstalling CoreFX Shaders (ReShade):</strong>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>
                              Simply delete the ReShade files you previously copied into your main game directory (e.g., <code>d3d12.dll</code>, <code>ReShade.ini</code>, and the <code>reshade-shaders</code> folder).
                            </li>
                          </ol>
                        </li>
                      </ul>
                    </div>
                  )}

                  {/* ───────── Enhanced Singleplayer ───────── */}
                  {activeInstallTab === 'enhanced' && (
                    <div className="install-block">
                      <h4>Enhanced Singleplayer Installation</h4>
                      <ul className="list-disc pl-5 text-gray-300 space-y-2">
                        <li>
                          <strong>Prerequisites:</strong>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>
                              Download and install <strong>OpenRPF.asi</strong> and <strong>ScriptHookV & Asi Loader</strong>. Ensure you use versions compatible with GTA V Enhanced.
                            </li>
                            <li>
                              <strong>One-Time OpenIV Setup:</strong> In the "OpenIV Fix" folder, run <code>OpenIV Fix.bat</code> and follow the instructions. This is required for OpenIV to correctly recognize your game, allowing you to use <code>.oiv</code> installers.
                            </li>
                            <li>
                              Add <strong>-noBattlEye</strong> to your game launcher's parameters.
                            </li>
                          </ol>
                        </li>
                        <li>
                          <strong>Installing CoreFX:</strong>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>
                              Using OpenIV, install <strong>CoreFXInstall.oiv</strong> (main package) and <strong>ClassicRoads.oiv</strong> (roads). The files will be installed into the <code>mods</code> folder.
                            </li>
                            <li>
                              <strong>Alternative Method:</strong> You can open the <code>.oiv</code> files with an archiver (like WinRar) and install the mod manually using CodeWalker.
                            </li>
                          </ol>
                        </li>
                        <li>
                          <strong>Installing CoreFX Shaders (ReShade):</strong>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>
                              <strong>Important:</strong> Before installing, remove any old ENBSeries or ReShade files from your GTA V Enhanced game directory to avoid compatibility issues. These files may be named <code>d3d11.dll</code>, <code>d3d12.dll</code>, <code>dxgi.dll</code>, <code>dxgi.asi</code>, or <code>ReShade.asi</code>.
                            </li>
                            <li>
                              Copy all ReShade files from the provided package into your main GTA 5 Enhanced game directory.
                            </li>
                            <li>
                              In-game, press <strong>F7</strong> to open the ReShade menu and enable available shaders manually.
                            </li>
                          </ol>
                        </li>
                        <li>
                          <strong>Uninstalling CoreFX Shaders (ReShade):</strong>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>
                              Simply delete the ReShade files you previously copied into your main game directory (e.g., <code>dxgi.dll</code>, <code>ReShade.ini</code>, and the <code>reshade-shaders</code> folder).
                            </li>
                          </ol>
                        </li>
                      </ul>
                    </div>
                  )}

                  {/* ───────── Legacy FiveM ───────── */}
                  {activeInstallTab === 'fivem' && (
                    <div className="install-block">
                      <h4>Legacy FiveM Installation</h4>
                      <ul className="list-disc pl-5 text-gray-300 space-y-2">
                        <li>
                          <strong>Installing CoreFX:</strong>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>
                              Drag the <code>mods</code> folder (containing the <code>.rpf</code> mods) and the <code>citizen</code>
                              folder (which includes the in-game shader replacements) into your FiveM Application Data directory.
                            </li>
                            <li>
                              Set in-game brightness to approximately 40-50 %.
                            </li>
                            <li>
                              <div className="bg-red-900/30 border border-red-700/50 p-4 rounded-lg mb-4">
                                <p className="text-red-300 text-sm">
                                  It is really important to have DirectX 11 enabled and PostFX and Shader quality set to Ultra in ingame settings to prevent visual bugs and to enable new shader features
                                </p>
                              </div>
                            </li>
                          </ol>
                        </li>
                        <li>
                          <strong>Uninstalling CoreFX:</strong>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>
                              Remove every CoreFX-related <code>.rpf</code> file
                              from your <code>mods</code> folder and from the
                              <code>shaders</code> folder located inside
                              <code>citizen/common</code>.
                            </li>
                            <li>Restart FiveM.</li>
                          </ol>
                        </li>
                        <li>
                          <strong>Installing CoreFX Shaders (ReShade):</strong>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>
                              <strong>Important:</strong> Before installing, remove any old ENBSeries or ReShade files from your FiveM <code>plugins</code> folder to avoid compatibility issues. These files may be named <code>d3d11.dll</code>, <code>d3d12.dll</code>, <code>dxgi.dll</code>, <code>dxgi.asi</code>, or <code>ReShade.asi</code>.
                            </li>
                            <li>
                              Copy all ReShade files from the provided package into the <code>plugins</code> folder, located inside your <code>FiveM Application Data</code> directory.
                            </li>
                            <li>
                              In-game, press <strong>F7</strong> to open the ReShade menu and enable available shaders manually.
                            </li>
                          </ol>
                        </li>
                        <li>
                          <strong>Uninstalling CoreFX Shaders (ReShade):</strong>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>
                              Simply delete the ReShade files you previously copied into the <code>plugins</code> folder within your <code>FiveM Application Data</code> directory.
                            </li>
                          </ol>
                        </li>
                      </ul>
                    </div>
                  )}

                  {/* ───────── Legacy FiveM ServerSide ───────── */}
                  {activeInstallTab === 'fivem-server' && (
                    <div className="install-block">
                      <h4>Legacy FiveM ServerSide Installation</h4>
                      <ol className="list-decimal pl-5 text-gray-300 space-y-1">
                        <li>
                          Place the <code>[CoreFX]</code> folder into the{' '}
                          <code>resources</code> directory on your FiveM server.
                        </li>
                        <li>
                          Edit your <code>server.cfg</code> file and add{' '}
                          <code>start CoreFX</code>.
                        </li>
                        <li>
                          For optionals, open <code>config.lua</code> in{' '}
                          <code>CoreFX\[CoreFX]\CoreFX</code> and set parameters
                          to "true" as needed.
                        </li>
                        <li>
                          <strong>Note for Players:</strong> For the best visual experience, players should set their in-game <strong>Shader Quality</strong> and <strong>Post FX</strong> to <strong>Ultra</strong> in the graphics settings.
                        </li>
                      </ol>
                    </div>
                  )}

                  {/* ───────── Legacy RageMP ───────── */}
                  {activeInstallTab === 'ragemp' && (
                    <div className="install-block">
                      <h4>Legacy RageMP Installation</h4>
                      <ul className="list-disc pl-5 text-gray-300 space-y-2">
                        <li>
                          <strong>Installing CoreFX:</strong>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>
                              <strong>Method 1:</strong> Copy the{' '}
                              <code>update</code> folder contents into your
                              GTA V root directory.
                            </li>
                            <li>
                              <strong>Method 2:</strong> Copy the{' '}
                              <code>user_resources</code> folder into your RageMP
                              directory.
                            </li>
                            <li>
                              Set in-game brightness to approximately 40-50 %.
                            </li>
                            <li>
                              <div className="bg-red-900/30 border border-red-700/50 p-4 rounded-lg mb-4">
                                <p className="text-red-300 text-sm">
                                  It is really important to have DirectX 11 enabled and PostFX and Shader quality set to Ultra in ingame settings to prevent visual bugs and to enable new shader features
                                </p>
                              </div>
                            </li>
                          </ol>
                        </li>
                        <li>
                          <strong>Uninstalling CoreFX:</strong>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>
                              Restore original files via your game launcher
                              (Method 1) or remove <code>user_resources</code>{' '}
                              (Method 2).
                            </li>
                          </ol>
                        </li>
                      </ul>
                    </div>
                  )}

                  {/* ───────── Enhanced RageMP ───────── */}
                  {activeInstallTab === 'enhanced-ragemp' && (
                    <div className="install-block">
                      <h4>Enhanced RageMP Installation</h4>
                      <ul className="list-disc pl-5 text-gray-300 space-y-2">
                        <li>
                          <strong>Installing CoreFX:</strong>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>
                              Copy the{' '}
                              <code>user_resources</code> folder into your RageMP
                              directory.
                            </li>
                            <li>
                              Set in-game brightness to approximately 40-50 %.
                            </li>
                          </ol>
                        </li>
                        <li>
                          <strong>Uninstalling CoreFX:</strong>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>
                              Remove the <code>user_resources</code> folder from your RageMP directory.
                            </li>
                          </ol>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* ───────── RIGHT PANE (FAQ) ───────── */}
        <ScrollArea className="w-full lg:w-80 max-h-[calc(100vh-10rem)] bg-black/20 backdrop-blur-md rounded-lg">
          <div className="p-4 md:p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-4">FAQs</h2>
            <div
              className="space-y-2 overflow-y-auto pr-1"
              style={{ maxHeight: 'calc(90vh - 13rem)' }}
            >
              {faqs.map((faq, idx) => (
                <Collapsible
                  key={idx}
                  open={openFaqs.includes(idx)}
                  onOpenChange={() => toggleFaq(idx)}
                  className="bg-black/30 rounded-lg"
                >
                  <CollapsibleTrigger className="w-full p-4 flex items-center justify-between text-left">
                    <h3 className="font-medium text-sm md:text-base">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${openFaqs.includes(idx) ? 'rotate-180' : ''
                        }`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 pb-4">
                    <p className="text-sm text-gray-300 whitespace-pre-wrap">
                      {faq.answer}
                    </p>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    </main>
  );
}
