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
      'Before installing and using CoreFX and CoreENB, please ensure your system meets these requirements.',
    requirements: [
      {
        title: 'Legacy Hardware Requirements',
        items: [
          'ENB Recommended: NVIDIA GeForce RTX 3060 or AMD Radeon RX 6600 XT',
          'No ENB Recommended: NVIDIA GeForce GTX 1060 or AMD Radeon RX 580'
        ]
      },
      {
        title: 'Enhanced Hardware Requirements',
        items: [
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
      'Mixing CoreFX with other graphics mods is not recommended, not supported and you can potentially break your game. By using CoreFX you automatically agree with these rules.',
    image:
      'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

const faqs = [
  {
    question: 'Does using CoreFX and CoreENB affect game performance?',
    answer:
      'Yes, advanced graphical enhancements typically require additional GPU and CPU resources. However, an ENB Performance preset is available for lower-end systems which disables some of the most demanding effects.'
  },
  {
    question:
      "I don't like blur when moving camera (motion blur). How can I disable it?",
    answer:
      'Usually can be disabled using the Disable Motion Blur optional. In FiveM ServerSide version you need to open timecycle_mods_1.xml and change 1.000 1.000 to 0.000 0.000. To disable motion blur in CoreFX for GTA 5 Enhanced, go to in-game graphics settings and turn down the Motion Blur parameter.'
  },
  {
    question: 'I have graphical bugs and they disappear when I disable ENBSeries.',
    answer:
      'This happens because of improper CoreENB installation. Please follow the CoreENB installation tutorial. Don’t forget to remove old ENBSeries from your game if you used one.'
  },
  {
    question: 'Can I use other mods with CoreFX?',
    answer:
      'It is possible, but not all mods are compatible. Mods that significantly alter the game’s visuals (like major ENB tweaks or weather overhauls) may conflict with CoreFX. Texture replacement mods are generally safer to combine.'
  },
  {
    question: 'What if I experience crashes or instability?',
    answer:
      'Refer to the Disclaimer section. Removing ENBSeries files, using older game builds, or running crash fixes (located in the Optionals folder) can help mitigate issues.'
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
      'Visit the Home page to access our social media links. From there, you can join our Discord server for further support.'
  },
  {
    question: 'What are the SE Optionals and why should I consider them?',
    answer:
      'SE Optionals are extra add-ons available on Patreon. They currently include new streetlight colors (white and blue), a Milky Way night-sky texture, and a custom bokeh texture. Purchasing these add-ons supports future development.'
  },
  {
    question:
      'In Rockstar Editor, my recorded clips show a blurred screen when moving. What causes this?',
    answer:
      'This is caused by in-game motion blur remaining enabled. Disable motion blur via the Optionals folder and record new clips; previously recorded clips will remain blurred.'
  },
  {
    question: "I don't like the default ENB lens flares. Can I disable or reduce them?",
    answer:
      'Yes. Open the ENB menu (Shift + Enter), go to the enbbloom.fx tab and lower the “Glare” intensity. Then, in the enblens.fx tab, reduce the “StarLens” intensity.'
  },
  {
    question: 'Can I quickly change the color grading to suit my personal preferences?',
    answer:
      'Yes, there are two main methods:\n\n• Color Preset in ENB Menu: open the ENB menu (Shift + Enter), go to the enbeffect.fx tab and adjust the “Color Preset” along with related parameters.\n• LUT Filters: CoreENB supports LUT filters located in the enbseries/LUTS folder. Each weather condition can have its own LUT plus a global LUT (lut_global.png). You can edit these PNGs to create custom color grading.'
  },
  {
    question: 'Does CoreFX run on FiveM servers with Pure Mode enabled?',
    answer:
      'Pure Mode restricts custom client modifications. Currently, CoreFX does not have permission to run under enforced Pure Mode.'
  }
];

const issues = [
  {
    title: 'Known Issues',
    items: [
      {
        problem: 'Game crashes on startup after installing CoreENB.',
        solution: 'CoreENB is no longer supported by CoreFX and Boris Vorontsov, installing it may cause crashes that are can not be fixed natively. Although you can try Crash Fixes in Optionals, there is no guarantee of them working.'
      },
      {
        problem: 'I have issues running LSPDFR with CoreENB',
        solution: 'ENBSeries originally never had proper support for RagePluginHook and LSPDFR mods. The only known way to run ENB and LSPDFR is to launch game normally, load into the game, and then run RagePluginHook.exe.'
      }
    ]
  }
];

/* ──────────────── types & helpers ──────────────── */

const installTabs = [
  'singleplayer',
  'enhanced',
  'fivem',
  'fivem-server',
  'ragemp'
] as const;
type InstallTab = typeof installTabs[number];

const installLabels: Record<InstallTab, string> = {
  singleplayer: 'Legacy Singleplayer',
  enhanced: 'Enhanced Singleplayer',
  fivem: 'Legacy FiveM',
  'fivem-server': 'Legacy FiveM ServerSide',
  ragemp: 'Legacy RageMP'
};

/* ───────────────────────── COMPONENT ───────────────────────── */

export default function Prerequisites() {
  const [activeSection, setActiveSection] = useState<
    'prerequisites' | 'installation' | 'issues'
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
    <main className="min-h-screen pt-24">
      <AnimatedBackground />

      <div className="container mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-6 md:gap-8">
        {/* ───────── LEFT PANE ───────── */}
        <ScrollArea className="w-full lg:flex-1 max-h-[calc(100vh-10rem)] bg-black/20 backdrop-blur-md rounded-lg overflow-hidden">
          <div className="p-4 md:p-8">
            {/* section switcher */}
            <div className="flex flex-wrap gap-2 mb-8">
              {(['prerequisites', 'installation', 'issues'] as const).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() =>
                      setActiveSection(
                        tab as 'prerequisites' | 'installation' | 'issues'
                      )
                    }
                    className={`px-4 py-2 rounded-full transition-all text-sm md:text-base ${
                      activeSection === tab
                        ? 'bg-white/20 text-white'
                        : 'bg-black/30 text-gray-300 hover:bg-white hover:text-black'
                    }`}
                  >
                    {{
                      prerequisites: 'Prerequisites',
                      installation: 'Installation',
                      issues: 'Issues'
                    }[tab]}
                  </button>
                )
              )}
            </div>

            {/* ───────── PREREQUISITES ───────── */}
            {activeSection === 'prerequisites' && (
              <div className="space-y-6" ref={ref}>
                {prerequisitesSections.map((section, idx) => (
                  <div
                    key={idx}
                    className={`bg-black/30 rounded-lg overflow-hidden transition-all duration-700 delay-${
                      idx * 100
                    } ${
                      inView
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-10'
                    }`}
                  >
                    <div className="p-4 md:p-6">
                      <h2 className="text-xl font-semibold mb-2">
                        {section.title}
                      </h2>
                      <p className="text-gray-300 mb-4">{section.content}</p>

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
                            <h3 className="font-medium text-white/80 text-sm md:text-base">
                              {req.title}
                            </h3>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                              {req.items.map((item, iIdx) => (
                                <li
                                  key={iIdx}
                                  className="text-gray-300 text-sm"
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
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        activeInstallTab === tab
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
                              launcher&apos;s parameters.
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
                              If on an older game build, install the{' '}
                              <strong>Old game build compatibility patch</strong>{' '}
                              from the <em>Optionals</em> folder.
                            </li>
                            <li>
                              Launch GTA V and set in-game brightness to
                              40-50 %.
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
                          <strong>Installing CoreENB:</strong>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>
                              Remove old ENBSeries and all leftovers that can
                              cause graphical bugs. Choose either{' '}
                              <strong>ENB Quality</strong> or{' '}
                              <strong>ENB Performance</strong> from the
                              downloaded <code>CoreENB</code> folder.
                            </li>
                            <li>Copy files to your GTA V root directory.</li>
                            <li>
                              Set PostFX and Shader Quality to Ultra and use
                              DirectX 11.
                            </li>
                          </ol>
                        </li>
                        <li>
                          <strong>Uninstalling CoreENB:</strong>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>
                              Remove all ENB files from your GTA V folder.
                            </li>
                            <li>Restart the game.</li>
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
                          <strong>Before Installing:</strong>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>
                              Remove the old <code>dsound.dll</code> from your
                              game directory.
                            </li>
                            <li>
                              Disable BattlEye Anticheat by adding{' '}
                              <code>-noBattlEye</code> to your launch options.
                            </li>
                          </ol>
                        </li>
                        <li>
                          <strong>Installing CoreFX:</strong>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>
                              Download and install ScriptHookV and OpenRPF.asi
                              for GTA 5 Enhanced.
                            </li>
                            <li>
                              Copy all files from the CoreFX folder into your
                              main GTA 5 Enhanced directory.
                            </li>
                            <li>
                              Launch the game, set brightness to 50 %, and enjoy
                              CoreFX.
                            </li>
                          </ol>
                        </li>
                        <li>
                          <strong>How To Install Streetlights Optionals:</strong>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>
                              After installing the main CoreFX Package, copy the{' '}
                              <code>mods</code> folder into your GTA 5 Enhanced
                              directory.
                            </li>
                            <li>
                              No further actions are required — just launch your
                              game and enjoy.
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
                              Locate <code>corefxPack.rpf</code> in the package.
                            </li>
                            <li>
                              Place it into your FiveM <em>Mods</em> folder.
                            </li>
                            <li>
                              If on an older game build, install the old-build
                              patch from <em>Optionals</em>.
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
                              Remove <code>corefxPack.rpf</code> from your Mods
                              folder.
                            </li>
                            <li>Restart FiveM.</li>
                          </ol>
                        </li>
                        <li>
                          <strong>Installing CoreENB:</strong>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>
                              Remove old ENBSeries and all leftovers that can
                              cause graphical bugs. Select either{' '}
                              <strong>ENB Quality</strong> or{' '}
                              <strong>ENB Performance</strong>.
                            </li>
                            <li>
                              If applicable, copy the <code>Plugins</code>{' '}
                              folder contents to your FiveM Plugins folder.
                            </li>
                            <li>
                              Copy the same files inside your GTA V root
                              directory.
                            </li>
                            <li>
                              Set PostFX and Shader Quality to Ultra and choose
                              DirectX 11.
                            </li>
                          </ol>
                        </li>
                        <li>
                          <strong>Uninstalling CoreENB:</strong>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>
                              Remove all ENB files from your FiveM directories.
                            </li>
                            <li>Restart FiveM.</li>
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
                          to &quot;true&quot; as needed.
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
                          <strong>Before Installing:</strong>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>
                              If flagged by Easy Anti Cheat, remove{' '}
                              <code>enbhelper.dll</code>.
                            </li>
                          </ol>
                        </li>
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
                        <li>
                          <strong>Installing CoreENB:</strong>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>
                              Remove old ENBSeries and all leftovers that can
                              cause graphical bugs. Choose either{' '}
                              <strong>ENB Quality</strong> or{' '}
                              <strong>ENB Performance</strong>.
                            </li>
                            <li>
                              Copy files (except <code>enbhelper.dll</code>) to
                              your RageMP directory.
                            </li>
                            <li>
                              Set PostFX and Shader Quality to Ultra and use
                              DirectX 11.
                            </li>
                          </ol>
                        </li>
                        <li>
                          <strong>Uninstalling CoreENB:</strong>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>
                              Remove all ENB files from your RageMP directory
                              and restart the game.
                            </li>
                          </ol>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ───────── ISSUES ───────── */}
            {activeSection === 'issues' && (
              <div className="space-y-6">
                {issues.map((sec, idx) => (
                  <div
                    key={idx}
                    className="bg-black/30 rounded-lg p-4 md:p-6 space-y-4"
                  >
                    <h2 className="text-xl font-semibold">{sec.title}</h2>
                    <ul className="space-y-4">
                      {sec.items.map((issue, i) => (
                        <li key={i} className="bg-black/40 rounded-lg p-4">
                          <h3 className="font-medium text-white/90">
                            {issue.problem}
                          </h3>
                          <p className="text-gray-300 text-sm mt-2">
                            {issue.solution}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>

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
                      className={`h-4 w-4 transition-transform ${
                        openFaqs.includes(idx) ? 'rotate-180' : ''
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
