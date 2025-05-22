'use client';

import { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Youtube, Github } from "lucide-react";
import Image from 'next/image';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useInView } from 'react-intersection-observer';
import { FaInstagram, FaYoutube, FaPatreon, FaDiscord } from 'react-icons/fa';

const prerequisitesSections = [
  {
    title: 'Prerequisites',
    content: 'Before installing and using CoreFX and CoreENB, please ensure your system meets these requirements.',
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
    warning: 'Mixing CoreFX with other graphics mods is not recommended, not supported and you can potentially break your game. By using CoreFX you automatically agree with these rules.',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },

];

const faqs = [
  {
    question: 'Does using CoreFX and CoreENB affect game performance?',
    answer: 'Yes, advanced graphical enhancements typically require additional GPU and CPU resources. However, an ENB Performance preset is available for lower-end systems which disables some of the most demanding effects.'
  },
  {
    question: 'I don\'t like blur when moving camera (motion blur). How can I disable it?',
    answer: 'Usually can be disabled using the Disable Motion Blur optional. In FiveM ServerSide version you need to open timecycle_mods_1.xml and change 1.000 1.000 to 0.000 0.000. To disable motion blur in CoreFX for GTA 5 Enhanced, go to in-game graphics settings and turn down the Motion Blur parameter.'
  },
  {
    question: 'I have graphical bugs and they disappear when I disable ENBSeries.',
    answer: 'This happens because of improper CoreENB installation. Please follow the CoreENB installation tutorial. Don\'t forget to remove old ENBSeries from your game if you used one.'
  },
  {
    question: 'Can I use other mods with CoreFX?',
    answer: 'It is possible, but not all mods are compatible. Mods that significantly alter the game\'s visuals (like major ENB tweaks or weather overhauls) may conflict with CoreFX. Texture replacement mods are generally safer to combine.'
  },
  {
    question: 'What if I experience crashes or instability?',
    answer: 'Refer to the Disclaimer section. Removing ENBSeries files, using older game builds, or running crash fixes (located in the Optionals folder) can help mitigate issues.'
  },
  {
    question: 'Is CoreFX compatible with Singleplayer and multiplayer platforms like FiveM or RageMP?',
    answer: 'Yes. However, installation steps differ for each platform—please refer to the Installation section for detailed instructions.'
  },
  {
    question: 'Where can I find updates and support?',
    answer: 'Visit the Home page to access our social media links. From there, you can join our Discord server for further support.'
  },
  {
    question: 'What are the SE Optionals and why should I consider them?',
    answer: 'SE Optionals are extra add-ons available on Patreon. They currently include new streetlight colors (white and blue), a Milky Way night sky texture, and a custom bokeh texture. Purchasing these add-ons supports future development.'
  },
  {
    question: 'In Rockstar Editor, my recorded clips show a blurred screen when moving. What causes this?',
    answer: 'This is caused by in-game motion blur remaining enabled. Disable motion blur via the Optionals folder and record new clips; previously recorded clips will remain blurred.'
  },
  {
    question: "I don't like the default ENB lens flares. Can I disable or reduce them?",
    answer: 'Yes. Open the ENB menu (Shift+Enter), go to the enbbloom.fx tab and lower the "Glare" intensity. Then, in the enblens.fx tab, reduce the "StarLens" intensity.'
  },
  {
    question: 'Can I quickly change the color grading to suit my personal preferences?',
    answer: 'Yes, there are two main methods:\n\nColor Preset in ENB Menu: Open the ENB menu (Shift+Enter), go to the enbeffect.fx tab, and adjust the "Color Preset" along with related parameters.\n\nLUT Filters: CoreENB supports LUT filters located in the enbseries/LUTS folder. Each weather condition can have its own LUT plus a global LUT (lut_global.png). You can edit these PNGs to create custom color grading.'
  },
  {
    question: 'Does CoreFX run on FiveM servers with Pure Mode enabled?',
    answer: 'Pure Mode restricts custom client modifications. Currently, CoreFX does not have permission to run under enforced Pure Mode.'
  }
];

export default function Prerequisites() {
  const [activeSection, setActiveSection] = useState('prerequisites');
  const [activeInstallTab, setActiveInstallTab] = useState('singleplayer');
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const toggleFaq = (index: number) => {
    setOpenFaqs(current => 
      current.includes(index) 
        ? current.filter(i => i !== index)
        : [...current, index]
    );
  };

  return (
    <main className="min-h-screen pt-24">
      <AnimatedBackground />
      <div className="container mx-auto px-8 flex gap-8">
        
        {/* Main Area */}
        <ScrollArea className="flex-1 h-[calc(100vh-8rem)] bg-black/20 backdrop-blur-md rounded-lg">
          <div className="p-8">
            {/* Section Toggle */}
            <div className="flex space-x-2 mb-8">
              <button
                onClick={() => setActiveSection('prerequisites')}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeSection === 'prerequisites'
                    ? 'bg-white/20 text-white'
                    : 'bg-black/30 text-gray-300 hover:bg-white hover:text-black'
                }`}
              >Prerequisites</button>
              <button
                onClick={() => setActiveSection('installation')}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeSection === 'installation'
                    ? 'bg-white/20 text-white'
                    : 'bg-black/30 text-gray-300 hover:bg-white hover:text-black'
                }`}
              >Installation</button>
            </div>

            {activeSection === 'prerequisites' ? (
              <div className="space-y-8" ref={ref}>
                {prerequisitesSections.map((section, index) => (
                  <div 
                    key={index} 
                    className={`bg-black/30 rounded-lg overflow-hidden transition-all duration-700 delay-${index * 100} ${
                      inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                  >
                   
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
                      <p className="text-gray-300 mb-4">{section.content}</p>
                      
                      {section.warning && (
                        <div className="bg-red-900/30 border border-red-700/50 p-4 rounded-lg mb-4">
                          <p className="text-red-300">{section.warning}</p>
                        </div>
                      )}
                      
                      {section.requirements && (
                        <div className="space-y-4">
                          {section.requirements.map((req, reqIndex) => (
                            <div key={reqIndex}>
                              <h3 className="font-medium text-white/80">{req.title}</h3>
                              <ul className="list-disc pl-5 mt-2 space-y-1">
                                {req.items.map((item, itemIndex) => (
                                  <li key={itemIndex} className="text-gray-300">{item}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      
                    </div>
                  </div>
                ))}
               
              </div>
            ) : (
              <div className="space-y-8">
                <h1 className="text-3xl font-bold mb-4">Installation</h1>

                <div className="flex flex-wrap gap-2 mb-6">
                  {['singleplayer', 'enhanced', 'fivem', 'fivem-server', 'ragemp'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveInstallTab(tab)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        activeInstallTab === tab
                          ? 'bg-white/20 text-white'
                          : 'bg-black/30 text-gray-300 hover:bg-white hover:text-black'
                      }`}
                    >{{
                      singleplayer: 'Legacy Singleplayer',
                      enhanced: 'Enhanced Singleplayer',
                      fivem: 'Legacy FiveM',
                      'fivem-server': 'Legacy FiveM ServerSide',
                      ragemp: 'Legacy RageMP'
                    }[tab]}</button>
                  ))}
                </div>

                <div className="bg-black/30 p-6 rounded-lg space-y-4">
                  {activeInstallTab === 'singleplayer' && (
                    <>
                      <h2 className="text-xl font-semibold">Legacy Singleplayer Installation</h2>
                      <ul className="space-y-2 text-gray-300 list-disc pl-5">
                        <li><strong>Before Installing:</strong>
                          <ol className="list-decimal pl-5">
                            <li>Add <code>-noBattlEye</code> to your game launcher&apos;s parameters.</li>
                          </ol>
                        </li>
                        <li><strong>Installing CoreFX:</strong>
                          <ol className="list-decimal pl-5">
                            <li>Open <code>InstallCoreFX.oiv</code> using OpenIV.</li>
                            <li>Install into the <em>mods</em> folder.</li>
                            <li>Install the <strong>Old game build compatibility patch</strong> if needed.</li>
                            <li>Set in-game brightness to 40-50%.</li>
                          </ol>
                        </li>
                        <li><strong>Uninstalling CoreFX:</strong>
                          <ol className="list-decimal pl-5">
                            <li>Open <code>UninstallCoreFX.oiv</code>.</li>
                            <li>Reinstall original files.</li>
                          </ol>
                        </li>
                        <li><strong>Installing CoreENB:</strong>
                          <ol className="list-decimal pl-5">
                            <li>Remove old ENBSeries and leftovers.</li>
                            <li>Choose <strong>ENB Quality</strong> or <strong>ENB Performance</strong>.</li>
                            <li>Copy files to GTA V root.</li>
                            <li>Set PostFX and Shader Quality to Ultra, DirectX 11.</li>
                          </ol>
                        </li>
                        <li><strong>Uninstalling CoreENB:</strong>
                          <ol className="list-decimal pl-5">
                            <li>Remove all ENB files.</li>
                            <li>Restart the game.</li>
                          </ol>
                        </li>
                      </ul>
                    </>
                  )}

                  {activeInstallTab === 'enhanced' && (
                    <>
                      <h2 className="text-xl font-semibold">Enhanced Singleplayer Installation</h2>
                      <ol className="list-decimal pl-5 space-y-2 text-gray-300">
                        <li>Remove the old <code>dsound.dll</code> from your game directory.</li>
                        <li>Add <code>-noBattlEye</code> to your launch options.</li>
                        <li>Download and install ScriptHookV and OpenRPF.asi.</li>
                        <li>Copy all files from the CoreFX folder to your Enhanced directory.</li>
                        <li>Set brightness to 50% and enjoy CoreFX.</li>
                        <li>To install Streetlights optionals, copy the <code>mods</code> folder into your directory.</li>
                      </ol>
                    </>
                  )}

                  {activeInstallTab === 'fivem' && (
                    <>
                      <h2 className="text-xl font-semibold">Legacy FiveM Installation</h2>
                      <ol className="list-decimal pl-5 space-y-2 text-gray-300">
                        <li>Place <code>corefxPack.rpf</code> into FiveM Mods folder.</li>
                        <li>Install old-build patch if needed.</li>
                        <li>Set brightness to 40-50%.</li>
                        <li>Remove old ENB files and select desired ENB preset.</li>
                        <li>Copy plugin files to GTA V and FiveM directories.</li>
                        <li>Set PostFX and Shader Quality to Ultra, DirectX 11.</li>
                      </ol>
                    </>
                  )}

                  {activeInstallTab === 'fivem-server' && (
                    <>
                      <h2 className="text-xl font-semibold">Legacy FiveM ServerSide Installation</h2>
                      <ol className="list-decimal pl-5 space-y-2 text-gray-300">
                        <li>Place <code>[CoreFX]</code> folder in <code>resources</code>.</li>
                        <li>Add <code>start CoreFX</code> to <code>server.cfg</code>.</li>
                        <li>Edit <code>config.lua</code> for optionals.</li>
                      </ol>
                    </>
                  )}

                  {activeInstallTab === 'ragemp' && (
                    <>
                      <h2 className="text-xl font-semibold">Legacy RageMP Installation</h2>
                      <ol className="list-decimal pl-5 space-y-2 text-gray-300">
                        <li>Remove <code>enbhelper.dll</code> if flagged by Easy Anti Cheat.</li>
                        <li>Use one of two CoreFX install methods: update folder or user_resources.</li>
                        <li>Set brightness to 40-50%.</li>
                        <li>Install ENB preset and copy files except <code>enbhelper.dll</code>.</li>
                        <li>Set PostFX and Shader Quality to Ultra, DirectX 11.</li>
                      </ol>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* FAQs Sidebar */}
        <ScrollArea className="w-80 h-[calc(100vh-12rem)] bg-black/20 backdrop-blur-md rounded-lg">
          <div className="p-6 flex flex-col h-full">
            <h2 className="text-xl font-semibold mb-4">FAQs</h2>

            {/* Scrollable FAQ Section */}
            <div className="space-y-2 overflow-y-auto pr-2" style={{ maxHeight: 'calc(90vh - 13rem)' }}>
              {faqs.map((faq, index) => (
                <Collapsible
                  key={index}
                  open={openFaqs.includes(index)}
                  onOpenChange={() => toggleFaq(index)}
                  className="bg-black/30 rounded-lg"
                >
                  <CollapsibleTrigger className="w-full p-4 flex items-center justify-between text-left">
                    <h3 className="font-medium">{faq.question}</h3>
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform ${
                        openFaqs.includes(index) ? 'transform rotate-180' : ''
                      }`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 pb-4">
                    <p className="text-sm text-gray-300 whitespace-pre-wrap">{faq.answer}</p>
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