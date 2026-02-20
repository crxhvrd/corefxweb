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

/* ───────────────────────── COMPONENTS ───────────────────────── */

const InstallationStep = ({
  title,
  children,
  defaultOpen = false
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="mb-4 border border-white/10 rounded-lg bg-black/40 overflow-hidden"
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-white/5 transition-colors text-left font-semibold text-lg">
        {title}
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''
            }`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-4 pt-0 border-t border-white/10 text-gray-300 space-y-2 mt-4">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

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
          'OpenIV.asi (Legacy Singleplayer): Required to load mods from the "mods" folder.',
          'OpenRPF.asi (Enhanced Singleplayer): Required to load mods from the "mods" folder.',
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

                      <InstallationStep title="Prerequisites" defaultOpen={false}>
                        <ul className="list-disc pl-5 text-gray-300 space-y-2">
                          <li>
                            Add <code>-noBattlEye</code> to your game launcher&apos;s
                            parameters.
                          </li>
                        </ul>
                      </InstallationStep>

                      <InstallationStep title="Installing CoreFX" defaultOpen={false}>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>Extract the downloaded package.</li>
                          <li>
                            Open the <code>CoreFX</code> folder and run{' '}
                            <code>Install.bat</code>.
                          </li>
                          <li>
                            If prompted, select your GTA 5 Legacy folder. This will
                            automatically install the mod into the <code>mods</code>{' '}
                            folder.
                          </li>
                          <li>
                            <strong>Note:</strong> <code>Install.bat</code> and{' '}
                            <code>Uninstall.bat</code> are also included for CoreFX
                            Optionals (e.g., Roads, Streetlights, etc.). Simply
                            navigate to the specific optional folder and run the
                            script there.
                          </li>
                          <li>
                            Launch GTA V and set in-game brightness to 40-50 %.
                          </li>
                          <li>
                            <div className="bg-red-900/30 border border-red-700/50 p-4 rounded-lg mb-4">
                              <p className="text-red-300 text-sm">
                                It is really important to have DirectX 11 enabled
                                and PostFX and Shader quality set to Ultra in ingame
                                settings to prevent visual bugs and to enable new
                                shader features
                              </p>
                            </div>
                          </li>
                        </ol>
                      </InstallationStep>

                      <InstallationStep title="Uninstalling CoreFX">
                        <ol className="list-decimal pl-5 space-y-1">
                          <li>
                            Run <code>Uninstall.bat</code> located in the{' '}
                            <code>CoreFX</code> folder (works if you installed via{' '}
                            <code>Install.bat</code>).
                          </li>
                        </ol>
                      </InstallationStep>

                      <InstallationStep title="Installing CoreFX Shaders (ReShade)">
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>
                            <strong>Important:</strong> Before installing, remove
                            any old ENBSeries or ReShade files from your GTA V root
                            directory to avoid compatibility issues. These files may
                            be named <code>d3d11.dll</code>, <code>d3d12.dll</code>,{' '}
                            <code>dxgi.dll</code>, <code>dxgi.asi</code>, or{' '}
                            <code>ReShade.asi</code>.
                          </li>
                          <li>
                            Copy all ReShade files from the provided package into
                            your main game directory.
                          </li>
                          <li>
                            In-game, press <strong>F7</strong> to open the ReShade
                            menu and enable available shaders manually.
                          </li>
                          <li>
                            You will see a <strong>RenoDX Shader Loader</strong> window within the main ReShade menu. This is where you can configure various shader settings.
                          </li>
                          <li>
                            If the ReShade menu does not appear when pressing{' '}
                            <strong>F7</strong>, rename <code>d3d12.dll</code> to{' '}
                            <code>dxgi.dll</code> in your game directory, then
                            relaunch the game.
                          </li>
                        </ol>
                      </InstallationStep>

                      <InstallationStep title="Uninstalling CoreFX Shaders (ReShade)">
                        <ol className="list-decimal pl-5 space-y-1">
                          <li>
                            Simply delete the ReShade files you previously copied
                            into your main game directory (e.g.,{' '}
                            <code>d3d12.dll</code>, <code>ReShade.ini</code>, and
                            the <code>reshade-shaders</code> folder).
                          </li>
                        </ol>
                      </InstallationStep>
                    </div>
                  )}

                  {/* ───────── Enhanced Singleplayer ───────── */}
                  {activeInstallTab === 'enhanced' && (
                    <div className="install-block">
                      <h4>Enhanced Singleplayer Installation</h4>

                      <InstallationStep title="Prerequisites" defaultOpen={false}>
                        <ol className="list-decimal pl-5 space-y-1">
                          <li>
                            Download and install{' '}
                            <strong>ScriptHookV & Asi Loader</strong> compatible
                            with GTA V Enhanced.
                          </li>
                          <li>
                            Add <strong>-noBattlEye</strong> to your game
                            launcher&apos;s parameters.
                          </li>
                        </ol>
                      </InstallationStep>

                      <InstallationStep title="Installing CoreFX" defaultOpen={false}>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>Extract the downloaded package.</li>
                          <li>
                            Open the <code>CoreFX</code> folder and run{' '}
                            <code>Install.bat</code>.
                          </li>
                          <li>
                            If prompted, select your GTA 5 Enhanced folder. This
                            automatic installer handles the main CoreFX package.
                          </li>
                          <li>
                            <strong>Note:</strong> <code>Install.bat</code> and{' '}
                            <code>Uninstall.bat</code> are also included for CoreFX
                            Optionals (e.g., Roads, Streetlights, etc.). Simply
                            navigate to the specific optional folder and run the
                            script there.
                          </li>
                        </ol>
                      </InstallationStep>

                      <InstallationStep title="Uninstalling CoreFX">
                        <ol className="list-decimal pl-5 space-y-1">
                          <li>
                            Run <code>Uninstall.bat</code> located in the{' '}
                            <code>CoreFX</code> folder.
                          </li>
                        </ol>
                      </InstallationStep>

                      <InstallationStep title="Installing CoreFX Shaders (ReShade)">
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>
                            <strong>Important:</strong> Before installing, remove
                            any old ENBSeries or ReShade files from your GTA V
                            Enhanced game directory to avoid compatibility issues.
                            These files may be named <code>d3d11.dll</code>,{' '}
                            <code>d3d12.dll</code>, <code>dxgi.dll</code>,{' '}
                            <code>dxgi.asi</code>, or <code>ReShade.asi</code>.
                          </li>
                          <li>
                            Copy all ReShade files from the provided package into
                            your main GTA 5 Enhanced game directory.
                          </li>
                          <li>
                            <strong>Critically Important:</strong> You <strong>MUST</strong> set{' '}
                            <strong>Shader Quality</strong> and <strong>Post FX</strong>{' '}
                            to <strong>Ultra</strong> in your in-game graphics settings.
                            This is required to load the custom RenoDX shaders included
                            with ReShade.
                          </li>
                          <li>
                            In-game, press <strong>F7</strong> to open the ReShade
                            menu and enable available shaders manually.
                          </li>
                          <li>
                            <strong>Note:</strong> The <strong>RenoDX Shader Loader</strong> window is included but currently has no adjustable settings. The only available option is to set the preset to &quot;Off&quot; to disable shader modifications.
                          </li>
                        </ol>
                      </InstallationStep>

                      <InstallationStep title="Uninstalling CoreFX Shaders (ReShade)">
                        <ol className="list-decimal pl-5 space-y-1">
                          <li>
                            Simply delete the ReShade files you previously copied
                            into your main game directory (e.g.,{' '}
                            <code>dxgi.dll</code>, <code>ReShade.ini</code>, and the{' '}
                            <code>reshade-shaders</code> folder).
                          </li>
                        </ol>
                      </InstallationStep>
                    </div>
                  )}

                  {/* ───────── Legacy FiveM ───────── */}
                  {activeInstallTab === 'fivem' && (
                    <div className="install-block">
                      <h4>Legacy FiveM Installation</h4>

                      <InstallationStep title="Installing CoreFX" defaultOpen={false}>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>Extract the downloaded package.</li>
                          <li>
                            Open the <code>CoreFX</code> folder and run{' '}
                            <code>Install.bat</code>.
                          </li>
                          <li>
                            A generic installer window will appear. It will attempt
                            to <strong>automatically detect</strong> your FiveM mods
                            folder.
                          </li>
                          <li>
                            If detection fails, or if you wish to install to a
                            different location, you can manually select your{' '}
                            <strong>FiveM Application Data</strong> folder.
                          </li>
                          <li>
                            <strong>Note:</strong> <code>Install.bat</code> and{' '}
                            <code>Uninstall.bat</code> are also included for CoreFX
                            Optionals (e.g., Roads, Streetlights, etc.). Simply
                            navigate to the specific optional folder and run the
                            script there.
                          </li>
                          <li>
                            Set in-game brightness to approximately 40-50 %.
                          </li>
                          <li>
                            <div className="bg-red-900/30 border border-red-700/50 p-4 rounded-lg mb-4">
                              <p className="text-red-300 text-sm">
                                It is really important to have DirectX 11 enabled
                                and PostFX and Shader quality set to Ultra in ingame
                                settings to prevent visual bugs, enable new
                                shader features, and fix issues with night time being too dark
                                (caused by CoreFX shader interactions).
                              </p>
                            </div>
                          </li>
                        </ol>
                      </InstallationStep>

                      <InstallationStep title="Uninstalling CoreFX">
                        <ol className="list-decimal pl-5 space-y-1">
                          <li>
                            Run <code>Uninstall.bat</code> located in the{' '}
                            <code>CoreFX</code> folder.
                          </li>
                          <li>Restart FiveM.</li>
                        </ol>
                      </InstallationStep>

                      <InstallationStep title="Installing CoreFX Shaders (ReShade)">
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>
                            <strong>Important:</strong> Before installing, remove
                            any old ENBSeries or ReShade files from your FiveM{' '}
                            <code>plugins</code> folder to avoid compatibility
                            issues. These files may be named <code>d3d11.dll</code>,{' '}
                            <code>d3d12.dll</code>, <code>dxgi.dll</code>,{' '}
                            <code>dxgi.asi</code>, or <code>ReShade.asi</code>.
                          </li>
                          <li>
                            Copy all ReShade files from the provided package into
                            the <code>plugins</code> folder, located inside your{' '}
                            <code>FiveM Application Data</code> directory.
                          </li>
                          <li>
                            In-game, press <strong>F7</strong> to open the ReShade
                            menu and enable available shaders manually.
                          </li>
                          <li>
                            <strong>
                              Troubleshooting &quot;ReShade Blocked&quot; Error:
                            </strong>
                            <ul className="list-disc pl-5 mt-1 space-y-1">
                              <li>
                                If FiveM crashes or blocks ReShade (version 5+),
                                press <strong>F8</strong> in the FiveM main menu to
                                check the log.
                              </li>
                              <li>
                                Look for an error message starting with{' '}
                                <code>
                                  script:reshade Blocked load of ReShade version 5
                                  or higher...
                                </code>{' '}
                                followed by a specific ID.
                              </li>
                              <li>
                                Open <code>CitizenFX.ini</code> in your FiveM
                                Application Data folder.
                              </li>
                              <li>
                                Add the following section at the end of the file,
                                replacing <code>ID:XXXXXX</code> with the exact ID
                                from your log:
                              </li>
                            </ul>
                            <pre className="bg-black/50 p-2 rounded mt-1 text-xs select-all">
                              {`[Addons]
ReShade5=ID:XXXXXX`}
                            </pre>
                          </li>
                        </ol>
                      </InstallationStep>

                      <InstallationStep title="Uninstalling CoreFX Shaders (ReShade)">
                        <ol className="list-decimal pl-5 space-y-1">
                          <li>
                            Simply delete the ReShade files you previously copied
                            into the <code>plugins</code> folder within your{' '}
                            <code>FiveM Application Data</code> directory.
                          </li>
                        </ol>
                      </InstallationStep>
                    </div>
                  )}

                  {/* ───────── Legacy FiveM ServerSide ───────── */}
                  {activeInstallTab === 'fivem-server' && (
                    <div className="install-block">
                      <h4>Legacy FiveM ServerSide Installation</h4>

                      <InstallationStep title="Server Installation" defaultOpen={false}>
                        <ol className="list-decimal pl-5 text-gray-300 space-y-2">
                          <li>Extract the downloaded package.</li>
                          <li>
                            Place the <code>[CoreFX]</code> folder into the{' '}
                            <code>resources</code> directory on your FiveM server.
                          </li>
                          <li>
                            Edit your <code>server.cfg</code> file and add{' '}
                            <code>start CoreFX</code>.
                          </li>
                          <li>
                            Edit your <code>server.cfg</code> file and add{' '}
                            <code>start CoreFX</code>.
                          </li>
                          <li>
                            <strong>Note for Optionals:</strong> Navigate to the <code>CoreFX\[CoreFX]\CoreFX</code> folder to configure <code>config.lua</code> for optional features.
                            (Note: <code>Install.bat</code> / <code>Uninstall.bat</code> scripts for optionals are not applicable for server-side installation).
                          </li>
                          <li>
                            <strong>Note for Players:</strong> For the best visual
                            experience, players should set their in-game{' '}
                            <strong>Shader Quality</strong> and{' '}
                            <strong>Post FX</strong> to <strong>Ultra</strong> in
                            the graphics settings.
                          </li>
                        </ol>
                      </InstallationStep>
                    </div>
                  )}

                  {/* ───────── Legacy RageMP ───────── */}
                  {activeInstallTab === 'ragemp' && (
                    <div className="install-block">
                      <h4>Legacy RageMP Installation</h4>

                      <InstallationStep title="Installing CoreFX" defaultOpen={false}>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>Extract the downloaded package.</li>
                          <li>
                            <strong>Method 1 (Recommended):</strong> Copy the
                            <code>user_resources</code> folder from the downloaded
                            package into your main RageMP directory.
                          </li>
                          <li>
                            <strong>Method 2 (Alternative):</strong> Replace your
                            original <code>update.rpf</code> in{' '}
                            <code>Grand Theft Auto V/update</code> with the one
                            provided in the{' '}
                            <code>update.rpf replace install method</code> folder.{' '}
                            <strong>Backup your original update.rpf first!</strong>
                          </li>
                          <li>
                            Set in-game brightness to approximately 40-50 %.
                          </li>
                          <li>
                            <div className="bg-red-900/30 border border-red-700/50 p-4 rounded-lg mb-4">
                              <p className="text-red-300 text-sm">
                                It is really important to have DirectX 11 enabled
                                and PostFX and Shader quality set to Ultra in ingame
                                settings to prevent visual bugs, enable new
                                shader features, and fix issues with night time being too dark
                                (caused by CoreFX shader interactions).
                              </p>
                            </div>
                          </li>
                        </ol>
                      </InstallationStep>

                      <InstallationStep title="Uninstalling CoreFX">
                        <ol className="list-decimal pl-5 space-y-1">
                          <li>
                            Remove the <code>user_resources</code> folder (Method 1)
                            or restore your original <code>update.rpf</code> (Method
                            2).
                          </li>
                        </ol>
                      </InstallationStep>

                      <InstallationStep title="Installing CoreFX Shaders (ReShade)">
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>
                            <div className="bg-yellow-900/30 border border-yellow-700/50 p-4 rounded-lg mb-4">
                              <p className="text-yellow-300 text-sm">
                                <strong>Warning:</strong> ReShade builds for RageMP
                                are currently pending Easy Anti-Cheat (EAC)
                                approval. While some servers may allow it, you might
                                be unable to join others or face connection issues.
                                Use at your own risk.
                              </p>
                            </div>
                          </li>
                          <li>
                            Copy all files from the <code>CoreFX ReShade</code>{' '}
                            folder into your main RageMP directory (where{' '}
                            <code>updater.exe</code> is located).
                          </li>
                          <li>
                            In-game, press <strong>F7</strong> to open the ReShade
                            menu and enable available shaders manually.
                          </li>
                          <li>
                            You will see a <strong>RenoDX Shader Loader</strong> window within the main ReShade menu. This is where you can configure various shader settings.
                          </li>
                        </ol>
                      </InstallationStep>

                      <InstallationStep title="Uninstalling CoreFX Shaders (ReShade)">
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>
                            Remove the files you copied from the <code>CoreFX ReShade</code> folder from your main RageMP directory.
                          </li>
                        </ol>
                      </InstallationStep>
                    </div>
                  )}

                  {/* ───────── Enhanced RageMP ───────── */}
                  {activeInstallTab === 'enhanced-ragemp' && (
                    <div className="install-block">
                      <h4>Enhanced RageMP Installation</h4>

                      <InstallationStep title="Installing CoreFX" defaultOpen={false}>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>Extract the downloaded package.</li>
                          <li>
                            <strong>Method 1 (Recommended):</strong> Copy the
                            <code>user_resources</code> folder from the downloaded
                            package into your main RageMP directory.
                          </li>
                          <li>
                            <strong>Method 2 (Alternative):</strong> Replace your
                            original <code>update.rpf</code> in{' '}
                            <code>Grand Theft Auto V/update</code> with the one
                            provided in the{' '}
                            <code>update.rpf replace install method</code> folder.{' '}
                            <strong>Backup your original update.rpf first!</strong>
                          </li>
                          <li>
                            Set in-game brightness to approximately 40-50 %.
                          </li>
                        </ol>
                      </InstallationStep>

                      <InstallationStep title="Uninstalling CoreFX">
                        <ol className="list-decimal pl-5 space-y-1">
                          <li>
                            Remove the <code>user_resources</code> folder (Method 1)
                            or restore your original <code>update.rpf</code> (Method
                            2).
                          </li>
                        </ol>
                      </InstallationStep>

                      <InstallationStep title="Installing CoreFX Shaders (ReShade)">
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>
                            <div className="bg-yellow-900/30 border border-yellow-700/50 p-4 rounded-lg mb-4">
                              <p className="text-yellow-300 text-sm">
                                <strong>Warning:</strong> ReShade builds for RageMP
                                are currently pending Easy Anti-Cheat (EAC)
                                approval. While some servers may allow it, you might
                                be unable to join others or face connection issues.
                                Use at your own risk.
                              </p>
                            </div>
                          </li>
                          <li>
                            Copy all files from the <code>CoreFX ReShade</code>{' '}
                            folder into your main RageMP directory (where{' '}
                            <code>updater.exe</code> is located).
                          </li>
                          <li>
                            <strong>Critically Important:</strong> You <strong>MUST</strong> set{' '}
                            <strong>Shader Quality</strong> and <strong>Post FX</strong>{' '}
                            to <strong>Ultra</strong> in your in-game graphics settings.
                            This is required to load the custom RenoDX shaders included
                            with ReShade.
                          </li>
                          <li>
                            In-game, press <strong>F7</strong> to open the ReShade
                            menu and enable available shaders manually.
                          </li>
                          <li>
                            <strong>Note:</strong> The <strong>RenoDX Shader Loader</strong> window is included but currently has no adjustable settings. The only available option is to set the preset to &quot;Off&quot; to disable shader modifications.
                          </li>
                        </ol>
                      </InstallationStep>

                      <InstallationStep title="Uninstalling CoreFX Shaders (ReShade)">
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>
                            Remove the files you copied from the <code>CoreFX ReShade</code> folder from your main RageMP directory.
                          </li>
                        </ol>
                      </InstallationStep>
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
