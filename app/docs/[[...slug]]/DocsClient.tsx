'use client';

import { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useInView } from 'react-intersection-observer';
import { useParams, useRouter } from 'next/navigation';

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
                title: 'Which Builds Are Free',
                items: [
                    <><strong>Legacy Singleplayer:</strong> Free.</>,
                    <><strong>Enhanced Singleplayer:</strong> Free.</>,
                    <><strong>Legacy FiveM:</strong> Requires the $5 Patreon tier.</>,
                    <><strong>Legacy FiveM ServerSide:</strong> Access to be announced. There is no 1.3.1 ServerSide build yet — the current package is still 1.2.</>,
                    <>The <strong>$9 tier</strong> is early access: new updates land there 10 days before public release, and it includes everything the $5 tier does. No visual effect is locked behind any tier.</>
                ]
            },
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
                title: 'HDR (Optional, Legacy & Enhanced)',
                items: [
                    'An HDR-capable display with "Use HDR" enabled in Windows Display settings. CoreFX upgrades the game to an HDR10 (PQ / BT.2020) swapchain.',
                    <>HDR is switched on in the <strong>CoreFX Addon</strong> menu (<strong>HDR</strong> tab &gt; <strong>HDR Mode</strong>), not in the game. It defaults to <strong>Auto</strong>, which follows the Windows setting for your primary display. <strong>Changing it requires a game restart.</strong></>,
                    <><strong>Enhanced only:</strong> in-game HDR must be <strong>off</strong> and <strong>DLSS enabled</strong>. CoreFX HDR and <strong>DLSS Frame Generation</strong> cannot both run — Frame Generation presents its own frames without passing through the HDR conversion, so the picture stops updating. Turn one of the two off, or install RenoDX&apos;s <a href="https://github.com/clshortfuse/renodx/releases/download/snapshot/renodx-dlssfix.addon64" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">DLSS fix addon</a> beside the game executable.</>
                ]
            },
            {
                title: 'Software',
                items: [
                    'Base Game: A legitimate copy of Grand Theft Auto V.',
                    <><strong>RageOpenV.asi (Recommended, Legacy & Enhanced Singleplayer):</strong> A modern replacement for both OpenIV.asi and OpenRPF.asi. Required to load mods from the "mods" folder. (Download from <a href="https://www.gta5-mods.com/scripts/rageopenv" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">GTA5-Mods</a>)</>,
                    <>OpenIV.asi (Legacy Singleplayer, Legacy Alternative): Loads mods from the "mods" folder. Comes with the <a href="https://openiv.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">OpenIV app</a>, can be installed inside OpenIV &gt; ASI Manager. Superseded by RageOpenV.asi.</>,
                    <>OpenRPF.asi (Enhanced Singleplayer, Legacy Alternative): Loads mods from the "mods" folder. (Download from <a href="https://www.gta5-mods.com/tools/openrpf-openiv-asi-for-gta-v-enhanced" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">GTA5-Mods</a>). Superseded by RageOpenV.asi.</>,
                    <>ScriptHookV & Asi Loader (Legacy & Enhanced Singleplayer): Necessary for proper script loading. (Download from <a href="https://www.dev-c.com/gtav/scripthookv/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">dev-c.com</a>). Legacy ASI Loader is <code>dinput8.dll</code>, Enhanced ASI Loader is <code>xinput1_4.dll</code>.</>,
                    <><strong>CoreFX Package Installer:</strong> Bundled with both Singleplayer archives and launched for you by <code>Install.bat</code> — you do not download or run it separately. It installs the <code>.oivs</code> package directly, with no OpenIV app required. (Project page: <a href="https://www.gta5-mods.com/tools/oiv-package-installer" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">GTA5-Mods</a>)</>,
                    <><strong>Note for Legacy FiveM:</strong> that package has no installer. It is copied into place by hand — see the Legacy FiveM installation guide.</>
                ]
            },
            {
                title: 'Required In-Game Settings',
                items: [
                    <><strong>Shader Quality</strong> and <strong>Post FX</strong> must be set to <strong>Ultra (maximum)</strong> in the in-game Graphics settings. This is required for the CoreFX shaders to load — at lower settings the game uses different shader variants that CoreFX does not replace, so the mod will look incorrect.</>,
                    <>If they are set too low, CoreFX shows an on-screen warning — <em>&quot;CoreFX: postfx composite not loaded&quot;</em> — a few seconds after the game starts rendering. Fix the settings and restart the game. (You will also see it while sitting in the main menu, which is normal.)</>
                ]
            },
            {
                title: 'Optional',
                items: [
                    'FiveM (Multiplayer): CoreFX supports multiplayer platforms.',
                    'Graphics Driver Updates: Keep your GPU drivers up to date.'
                ]
            },
            {
                title: 'Licence',
                items: [
                    <>Every CoreFX archive ships with <code>LICENSE.md</code> (the CoreFX end user licence, version 2.1) and <code>THIRD-PARTY-NOTICES.md</code>. Installing or using CoreFX means accepting those terms — worth a read before you start.</>,
                    <>CoreFX is distributed only through the CoreFX Patreon page and links published at <a href="https://corefx.me" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">corefx.me</a>. Copies from anywhere else are not licensed to you.</>
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
            'For Legacy builds, open the ReShade menu with Page Up, go to the CoreFX Addon window, and turn off Image > Motion Blur (there is also a Blur Intensity slider next to it). For Enhanced builds, disable motion blur in your GTA 5 graphics settings. For FiveM ServerSide, motion blur is disabled by default.'
    },
    {
        question: 'Can I use other mods with CoreFX?',
        answer:
            'It is possible, but not all mods are compatible. Mods that significantly alter the visuals of the game (like other graphics enhancers or weather overhauls) may conflict with CoreFX. Texture replacement mods are generally safer to combine.'
    },
    {
        question:
            'Is CoreFX compatible with Singleplayer and multiplayer platforms like FiveM?',
        answer:
            'Yes. However, installation steps differ for each platform — please refer to the Installation section for detailed instructions.'
    },
    {
        question: 'Where can I find updates and support?',
        answer:
            'You can join our discord through corefx.me, click on discord logo at bottom-left side of the website'
    },
    {
        question:
            'In Rockstar Editor, my recorded clips show a blurred screen when moving. What causes this?',
        answer:
            'This is caused by in-game motion blur. For Legacy builds, disable it in the CoreFX Addon menu under Image > Motion Blur. For Enhanced builds, turn off motion blur in GTA 5 graphics settings. Important: You must record new clips after disabling it; previously recorded clips will remain blurred. If you spend a lot of time in the editor, Rockstar Editor+ (linked as an optional in the installer) adds a spline camera, camera shake, and removes several of the editor’s built-in limits.'
    },
    {
        question: 'Does CoreFX run on FiveM servers with Pure Mode enabled?',
        answer:
            'Pure Mode restricts custom client modifications. Currently, CoreFX does not have permission to run under enforced Pure Mode.'
    },
    {
        question: 'How do I open the CoreFX shader menu?',
        answer:
            'Press Page Up in-game to open the ReShade overlay, then find the CoreFX Addon window inside it — that is where every CoreFX setting lives. Page Down toggles the ReShade effects on and off. This is the same on all builds.'
    },
    {
        question: 'Does CoreFX support HDR?',
        answer:
            'Yes, on both Legacy and Enhanced. Open the CoreFX Addon menu, go to the HDR tab and set HDR Mode — Auto follows the Windows "Use HDR" setting for your primary display, or you can force it On or Off. It takes effect on the next game launch, because the swapchain has to be upgraded before the game creates its device. Once it is active you get a full HDR tone mapping and colour grading panel. On Enhanced, in-game HDR must be off, DLSS must be on, and DLSS Frame Generation cannot be used at the same time.'
    },
    {
        question:
            'I see an orange "CoreFX: postfx composite not loaded" message on screen. What does it mean?',
        answer:
            'CoreFX is installed and running, but its main shaders are not rendering. Almost always this means Shader Quality or Post FX is below Ultra in the in-game graphics settings — fix those and restart the game. You will also see it in the main menu, which is normal. If you want it gone permanently, the CoreFX Addon menu has a "Hide on-screen warnings" toggle under Options.'
    },
    {
        question:
            'On FiveM the shader menu is empty or has no settings. How do I fix it?',
        answer:
            'ReShade and CoreFX.addon64 have to be installed in BOTH places — the FiveM plugins folder and your real GTA V root folder — each with its own CustomShaders folder beside it. Installing to only one location is enough for the addon to show up, but not for it to find its settings. The package ships both copies ready to go; make sure you copied each one to its matching destination.'
    }
];


/* ──────────────── types & helpers ──────────────── */

const installTabs = [
    'singleplayer',
    'enhanced',
    'fivem',
    'fivem-server',
    'enhanced-fivem'
] as const;
type InstallTab = typeof installTabs[number];

const installLabels: Record<InstallTab, string> = {
    singleplayer: 'Legacy Singleplayer',
    enhanced: 'Enhanced Singleplayer',
    fivem: 'Legacy FiveM',
    'fivem-server': 'Legacy FiveM ServerSide',
    'enhanced-fivem': 'Enhanced FiveM'
};

/* ───────────────────────── COMPONENT ───────────────────────── */

export default function DocsClient() {
    const params = useParams();
    const router = useRouter();
    const slug = params?.slug as string[] | undefined;

    // Initialize state based on URL, or default if no URL param
    const [activeSection, setActiveSection] = useState<
        'prerequisites' | 'installation' | 'settings'
    >('prerequisites');

    const [activeInstallTab, setActiveInstallTab] =
        useState<InstallTab>('singleplayer');

    // Sync state from URL on mount/update
    useEffect(() => {
        if (slug && slug.length > 0) {
            const mainTab = slug[0];
            if (mainTab === 'install') {
                setActiveSection('installation');
                if (slug[1] && installTabs.includes(slug[1] as InstallTab)) {
                    setActiveInstallTab(slug[1] as InstallTab);
                }
            } else if (mainTab === 'prerequisites') {
                setActiveSection('prerequisites');
            } else if (mainTab === 'settings') {
                setActiveSection('settings');
            }
        } else {
            // Redirect /docs -> /docs/prerequisites
            router.replace('/docs/prerequisites', { scroll: false });
        }
    }, [slug, router]);

    // Update URL when changing sections
    const handleSectionChange = (
        section: 'prerequisites' | 'installation' | 'settings'
    ) => {
        setActiveSection(section);
        if (section === 'installation') {
            router.push(`/docs/install/${activeInstallTab}`, { scroll: false });
        } else if (section === 'settings') {
            router.push('/docs/settings', { scroll: false });
        } else {
            router.push('/docs/prerequisites', { scroll: false });
        }
    };

    // Update URL when changing install tabs
    const handleInstallTabChange = (tab: InstallTab) => {
        setActiveInstallTab(tab);
        router.push(`/docs/install/${tab}`, { scroll: false });
    };

    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: false });

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
                                    onClick={() => handleSectionChange('prerequisites')}
                                    className={`px-4 py-3 rounded-full text-base sm:text-sm md:text-base transition-all h-12 sm:h-10 flex items-center justify-center ${activeSection === 'prerequisites'
                                        ? 'bg-white/20 text-white'
                                        : 'bg-black/30 text-gray-300 hover:bg-white hover:text-black'
                                        }`}
                                >
                                    Prerequisites
                                </button>
                                <button
                                    onClick={() => handleSectionChange('installation')}
                                    className={`px-4 py-3 rounded-full text-base sm:text-sm md:text-base transition-all h-12 sm:h-10 flex items-center justify-center ${activeSection === 'installation'
                                        ? 'bg-white/20 text-white'
                                        : 'bg-black/30 text-gray-300 hover:bg-white hover:text-black'
                                        }`}
                                >
                                    Installation
                                </button>
                                <button
                                    onClick={() => handleSectionChange('settings')}
                                    className={`px-4 py-3 rounded-full text-base sm:text-sm md:text-base transition-all h-12 sm:h-10 flex items-center justify-center ${activeSection === 'settings'
                                        ? 'bg-white/20 text-white'
                                        : 'bg-black/30 text-gray-300 hover:bg-white hover:text-black'
                                        }`}
                                >
                                    Shader Settings
                                </button>
                            </div>
                        </div>

                        {/* ───────── EARLY ACCESS NOTICE ───────── */}
                        <div className="bg-blue-900/30 border border-blue-700/50 p-4 rounded-lg mb-8">
                            <p className="text-blue-200 text-sm">
                                <strong>These docs cover CoreFX 1.3.1.</strong> It is in
                                early access for $9 tier supporters from{' '}
                                <strong>4 September</strong>, and goes public for everyone
                                on <strong>14 September</strong>. If you are still on 1.3
                                or earlier, some steps below will not match your download
                                yet.
                            </p>
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
                                            onClick={() => handleInstallTabChange(tab)}
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


                                            <InstallationStep title="Prerequisites" defaultOpen={false}>
                                                <ol className="list-decimal pl-5 text-gray-300 space-y-2">
                                                    <li>
                                                        Download and install <a href="https://www.dev-c.com/gtav/scripthookv/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white"><strong>ScriptHookV &amp; Asi Loader</strong></a> compatible with GTA V Legacy (use <code>dinput8.dll</code>). For the mods folder loader, install <a href="https://www.gta5-mods.com/scripts/rageopenv" target="_blank" rel="noopener noreferrer" className="underline hover:text-white"><strong>RageOpenV.asi</strong></a> (recommended) — or, as a legacy alternative, <strong>OpenIV.asi</strong> via the <a href="https://openiv.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">OpenIV app</a> (OpenIV &gt; ASI Manager).
                                                    </li>
                                                    <li>
                                                        Add <code>-noBattlEye</code> to your game launcher&apos;s
                                                        parameters.
                                                    </li>
                                                    <li>
                                                        <strong>Important:</strong> Remove any old ENBSeries or
                                                        ReShade files from your GTA V root directory first. These
                                                        may be named <code>d3d11.dll</code>, <code>d3d12.dll</code>,{' '}
                                                        <code>dxgi.dll</code>, <code>dxgi.asi</code>, or{' '}
                                                        <code>ReShade.asi</code>. CoreFX installs its own ReShade
                                                        build and two copies will conflict.
                                                    </li>
                                                </ol>
                                            </InstallationStep>

                                            <InstallationStep title="Installing CoreFX" defaultOpen={false}>
                                                <ol className="list-decimal pl-5 space-y-2">
                                                    <li>Extract the downloaded package.</li>
                                                    <li>
                                                        Open the <code>CoreFX</code> folder and run{' '}
                                                        <code>Install.bat</code>. The <strong>CoreFX Package
                                                        Installer</strong> opens with CoreFX already loaded.
                                                    </li>
                                                    <li>
                                                        Click <strong>Install</strong>. A selection window opens
                                                        where you choose what to install. The <strong>base mod</strong>{' '}
                                                        and the <strong>CoreFX shaders</strong> (ReShade plus the
                                                        <strong>CoreFX Addon</strong>) are always included.
                                                    </li>
                                                    <li>
                                                        Tick any optional add-ons you want:
                                                        <ul className="list-disc pl-5 mt-1 space-y-1">
                                                            <li>
                                                                <strong>Classic Roads</strong> — cleaner, classic
                                                                asphalt road surfaces.
                                                            </li>
                                                            <li>
                                                                <strong>Sun Lens Flare</strong> — pick{' '}
                                                                <strong>Star</strong>, <strong>Wide</strong>, or
                                                                none, with before/after previews.
                                                            </li>
                                                            <li>
                                                                <strong>Simple Camera</strong> and{' '}
                                                                <strong>Rockstar Editor+</strong> — these are{' '}
                                                                <strong>not installed</strong> by the package. They
                                                                are updated far more often than CoreFX itself, so
                                                                ticking them simply opens their official download
                                                                page when the install finishes. Both need ScriptHookV.
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        If prompted, select your GTA 5 Legacy folder. Everything you
                                                        chose installs into the <code>mods</code> folder.
                                                    </li>
                                                    <li>
                                                        <div className="bg-red-900/30 border border-red-700/50 p-4 rounded-lg mb-4">
                                                            <p className="text-red-300 text-sm">
                                                                It is really important to have DirectX 11 enabled
                                                                and PostFX and Shader quality set to Ultra in ingame
                                                                settings to prevent visual bugs and to enable new
                                                                shader features. This will also fix super dark nights
                                                                on certain weathers because of how CoreFX interacts
                                                                with shaders.
                                                            </p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        Launch GTA V and set in-game brightness to approximately
                                                        40-50 %.
                                                    </li>
                                                    <li>
                                                        In-game, press <strong>Page Up</strong> to open the ReShade
                                                        menu, then open the <strong>CoreFX Addon</strong>{' '}
                                                        window — that is where every CoreFX setting lives. Press{' '}
                                                        <strong>Page Down</strong> to toggle the ReShade effects on
                                                        or off. See the <strong>Shader Settings</strong> section for
                                                        what the menu contains.
                                                    </li>
                                                    <li>
                                                        If nothing happens when you press <strong>Page Up</strong>,
                                                        rename <code>d3d12.dll</code> in your game directory to{' '}
                                                        <code>dxgi.dll</code>, then relaunch the game.
                                                    </li>
                                                </ol>
                                            </InstallationStep>

                                            <InstallationStep title="Uninstalling CoreFX">
                                                <ol className="list-decimal pl-5 space-y-1">
                                                    <li>
                                                        Run <code>Uninstall.bat</code> in the <code>CoreFX</code>{' '}
                                                        folder. The installer opens straight to{' '}
                                                        <strong>Manage Mods</strong> — select <strong>CoreFX</strong>{' '}
                                                        and choose <strong>Revert to Backup</strong> (or{' '}
                                                        <strong>Reset to Vanilla</strong>). This removes the base
                                                        mod, the shaders, and any optionals you installed.
                                                    </li>
                                                </ol>
                                            </InstallationStep>
                                        </div>
                                    )}

                                    {/* ───────── Enhanced Singleplayer ───────── */}
                                    {activeInstallTab === 'enhanced' && (
                                        <div className="install-block">

                                            <InstallationStep title="Prerequisites" defaultOpen={false}>
                                                <ol className="list-decimal pl-5 space-y-1">
                                                    <li>
                                                        Download and install{' '}
                                                        <a href="https://www.dev-c.com/gtav/scripthookv/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white"><strong>ScriptHookV &amp; Asi Loader</strong></a> compatible
                                                        with GTA V Enhanced (use <code>xinput1_4.dll</code>). For the mods folder loader, install <a href="https://www.gta5-mods.com/scripts/rageopenv" target="_blank" rel="noopener noreferrer" className="underline hover:text-white"><strong>RageOpenV.asi</strong></a> (recommended) — or, as a legacy alternative, <a href="https://www.gta5-mods.com/tools/openrpf-openiv-asi-for-gta-v-enhanced" target="_blank" rel="noopener noreferrer" className="underline hover:text-white"><strong>OpenRPF.asi</strong></a>.
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
                                                        <strong>Important:</strong> Before installing, remove
                                                        any old ENBSeries or ReShade files from your GTA V
                                                        Enhanced game directory to avoid compatibility issues.
                                                        These files may be named <code>d3d11.dll</code>,{' '}
                                                        <code>d3d12.dll</code>, <code>dxgi.dll</code>,{' '}
                                                        <code>dxgi.asi</code>, or <code>ReShade.asi</code>.
                                                    </li>
                                                    <li>
                                                        Open the <code>CoreFX</code> folder and run{' '}
                                                        <code>Install.bat</code>. The <strong>CoreFX Package
                                                        Installer</strong> opens with CoreFX already loaded.
                                                    </li>
                                                    <li>
                                                        Click <strong>Install</strong>. A selection window opens
                                                        where you choose what to install. The <strong>base mod</strong>{' '}
                                                        and the <strong>CoreFX shaders</strong> (ReShade plus the
                                                        <strong>CoreFX Addon</strong>) are always included.
                                                    </li>
                                                    <li>
                                                        Tick any optional add-ons you want:
                                                        <ul className="list-disc pl-5 mt-1 space-y-1">
                                                            <li>
                                                                <strong>Classic Roads</strong> — cleaner, classic
                                                                asphalt road surfaces.
                                                            </li>
                                                            <li>
                                                                <strong>Sun Lens Flare</strong> — pick{' '}
                                                                <strong>Star</strong>, <strong>Wide</strong>, or
                                                                none, with before/after previews.
                                                            </li>
                                                            <li>
                                                                <strong>Simple Camera</strong> and{' '}
                                                                <strong>Rockstar Editor+</strong> — these are{' '}
                                                                <strong>not installed</strong> by the package. They
                                                                are updated far more often than CoreFX itself, so
                                                                ticking them simply opens their official download
                                                                page when the install finishes. Both need ScriptHookV.
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        If prompted, select your GTA 5 Enhanced folder. Everything
                                                        you chose — the base mod, the shaders, and your selected
                                                        optionals — installs into the <code>mods</code> folder.
                                                    </li>
                                                    <li>
                                                        <div className="bg-red-900/30 border border-red-700/50 p-4 rounded-lg mb-4">
                                                            <p className="text-red-300 text-sm">
                                                                <strong>Critically Important:</strong> You <strong>MUST</strong> set{' '}
                                                                <strong>Shader Quality</strong> and <strong>Post FX</strong>{' '}
                                                                to <strong>Ultra</strong> in your in-game graphics settings.
                                                                This is required to load the custom CoreFX shaders.
                                                            </p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        Set in-game brightness to approximately 40-50 %.
                                                    </li>
                                                    <li>
                                                        In-game, press <strong>Page Up</strong> to open the ReShade
                                                        menu, then open the <strong>CoreFX Addon</strong>{' '}
                                                        window. It has a full UI to toggle and fine-tune individual
                                                        effects, including ray tracing, clouds, vehicles and ambient
                                                        occlusion — see the <strong>Shader Settings</strong> section
                                                        for the full list.
                                                    </li>
                                                    <li>
                                                        Press <strong>Page Down</strong> to toggle the ReShade
                                                        shaders on or off.
                                                    </li>
                                                    <li>
                                                        <strong>Optional — HDR:</strong> in the{' '}
                                                        <strong>HDR</strong> tab of the menu, set{' '}
                                                        <strong>HDR Mode</strong> to <strong>Auto</strong> or{' '}
                                                        <strong>On</strong> and restart the game. Enhanced also
                                                        needs in-game HDR turned <strong>off</strong> and{' '}
                                                        <strong>DLSS enabled</strong>, and it cannot run alongside{' '}
                                                        <strong>DLSS Frame Generation</strong>. See{' '}
                                                        <strong>Prerequisites &gt; HDR</strong> for the details.
                                                    </li>
                                                </ol>
                                            </InstallationStep>

                                            <InstallationStep title="Uninstalling CoreFX">
                                                <ol className="list-decimal pl-5 space-y-1">
                                                    <li>
                                                        Run <code>Uninstall.bat</code> in the <code>CoreFX</code>{' '}
                                                        folder. The installer opens straight to{' '}
                                                        <strong>Manage Mods</strong> — select <strong>CoreFX</strong>{' '}
                                                        and choose <strong>Revert to Backup</strong> (or{' '}
                                                        <strong>Reset to Vanilla</strong>). This removes the base
                                                        mod, the shaders, and any optionals you installed.
                                                    </li>
                                                </ol>
                                            </InstallationStep>
                                        </div>
                                    )}

                                    {/* ───────── Legacy FiveM ───────── */}
                                    {activeInstallTab === 'fivem' && (
                                        <div className="install-block">

                                            <div className="bg-blue-900/30 border border-blue-700/50 p-4 rounded-lg mb-4">
                                                <p className="text-blue-200 text-sm">
                                                    <strong>This build requires the $5 Patreon tier.</strong>{' '}
                                                    There is no installer — the package is copied into place by
                                                    hand, and it has to go to <strong>two</strong> locations.
                                                </p>
                                            </div>

                                            <InstallationStep title="Prerequisites" defaultOpen={false}>
                                                <ol className="list-decimal pl-5 text-gray-300 space-y-2">
                                                    <li>
                                                        <strong>Important:</strong> If you have installed older builds of CoreFX before, you must remove all shaders from the <code>FiveM.app\citizen\common\shaders\win32_40_final</code> folder.
                                                    </li>
                                                    <li>
                                                        Remove any old ENBSeries or ReShade files from your FiveM{' '}
                                                        <code>plugins</code> folder <em>and</em> your GTA V root
                                                        folder. These may be named <code>d3d11.dll</code>,{' '}
                                                        <code>d3d12.dll</code>, <code>dxgi.dll</code>,{' '}
                                                        <code>dxgi.asi</code>, or <code>ReShade.asi</code>. CoreFX
                                                        ships its own ReShade build.
                                                    </li>
                                                </ol>
                                            </InstallationStep>

                                            <InstallationStep title="What's in the package" defaultOpen={false}>
                                                <p className="mb-3">
                                                    Once extracted, the <code>CoreFX</code> folder contains two
                                                    folders named after where their contents go. Nothing is
                                                    automated — you copy each one to its matching destination.
                                                </p>
                                                <ul className="list-disc pl-5 space-y-3">
                                                    <li>
                                                        <code>FiveM Application Data\</code>
                                                        <ul className="list-disc pl-5 mt-1 space-y-1">
                                                            <li>
                                                                <code>mods\aa_corefxPack.rpf</code> — the base mod.
                                                                Required.
                                                            </li>
                                                            <li>
                                                                <code>mods\ao_corefxRoads.rpf</code> —{' '}
                                                                <strong>Classic Roads, optional.</strong> Skip this
                                                                file if you do not want the road textures; it is by
                                                                far the largest file in the package.
                                                            </li>
                                                            <li>
                                                                <code>plugins\</code> — <code>dxgi.dll</code>,{' '}
                                                                <code>CoreFX.addon64</code>,{' '}
                                                                <code>CustomShaders\</code>,{' '}
                                                                <code>reshade-shaders\</code> and{' '}
                                                                <code>ReShade.ini</code>.
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <code>GTA 5 Root Folder\</code> — the same shader payload
                                                        again, for your actual GTA V install folder.
                                                    </li>
                                                </ul>
                                            </InstallationStep>

                                            <InstallationStep title="Installing CoreFX" defaultOpen={false}>
                                                <ol className="list-decimal pl-5 space-y-2">
                                                    <li>Extract the downloaded package.</li>
                                                    <li>
                                                        Copy the contents of{' '}
                                                        <code>CoreFX\FiveM Application Data\</code> into your{' '}
                                                        <strong>FiveM Application Data</strong> folder, so that{' '}
                                                        <code>mods\</code> and <code>plugins\</code> merge with the
                                                        ones already there. (Leave out{' '}
                                                        <code>ao_corefxRoads.rpf</code> if you do not want Classic
                                                        Roads.)
                                                    </li>
                                                    <li>
                                                        Copy the contents of{' '}
                                                        <code>CoreFX\GTA 5 Root Folder\</code> into your{' '}
                                                        <strong>GTA V root folder</strong> — the one containing{' '}
                                                        <code>GTA5.exe</code>.
                                                    </li>
                                                    <li>
                                                        <div className="bg-red-900/30 border border-red-700/50 p-4 rounded-lg mb-4">
                                                            <p className="text-red-300 text-sm">
                                                                <strong>Both copies are required.</strong> ReShade
                                                                and <code>CoreFX.addon64</code> must be installed in
                                                                both places — the FiveM <code>plugins</code> folder{' '}
                                                                <em>and</em> the GTA V root folder — each with its
                                                                own <code>CustomShaders</code> folder beside it.
                                                                Installing to only one location is enough for the
                                                                addon to load, but not for it to find its settings,
                                                                and you will end up with an empty shader menu.
                                                            </p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        Launch FiveM and set in-game brightness to approximately
                                                        40-50 %.
                                                    </li>
                                                    <li>
                                                        <div className="bg-red-900/30 border border-red-700/50 p-4 rounded-lg mb-4">
                                                            <p className="text-red-300 text-sm">
                                                                It is really important to have DirectX 11 enabled
                                                                and PostFX and Shader quality set to Ultra in ingame
                                                                settings to prevent visual bugs and to enable new
                                                                shader features. This will also fix super dark nights
                                                                on certain weathers because of how CoreFX interacts
                                                                with shaders.
                                                            </p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        In-game, press <strong>Page Up</strong> to open the ReShade
                                                        menu, then open the <strong>CoreFX Addon</strong>{' '}
                                                        window — that is where every CoreFX setting lives. Press{' '}
                                                        <strong>Page Down</strong> to toggle the ReShade effects on
                                                        or off. See the <strong>Shader Settings</strong> section for
                                                        what the menu contains.
                                                    </li>
                                                </ol>
                                            </InstallationStep>

                                            <InstallationStep title="Uninstalling CoreFX">
                                                <ol className="list-decimal pl-5 space-y-2">
                                                    <li>
                                                        Delete <code>aa_corefxPack.rpf</code> and{' '}
                                                        <code>ao_corefxRoads.rpf</code> from the{' '}
                                                        <code>mods</code> folder in your FiveM Application Data
                                                        directory.
                                                    </li>
                                                    <li>
                                                        Delete the files you copied into the FiveM{' '}
                                                        <code>plugins</code> folder — <code>dxgi.dll</code>,{' '}
                                                        <code>CoreFX.addon64</code>, <code>ReShade.ini</code>, and
                                                        the <code>CustomShaders</code> and{' '}
                                                        <code>reshade-shaders</code> folders.
                                                    </li>
                                                    <li>
                                                        Delete the same set of files from your GTA V root folder.
                                                    </li>
                                                    <li>Restart FiveM.</li>
                                                </ol>
                                            </InstallationStep>

                                            <InstallationStep title="Troubleshooting">
                                                <ul className="list-disc pl-5 space-y-3">
                                                    <li>
                                                        <strong>
                                                            The shader menu is empty, or CoreFX says it could not
                                                            read settings.json
                                                        </strong>
                                                        <br />
                                                        You installed to only one of the two locations. Copy the
                                                        shader payload into both the FiveM <code>plugins</code>{' '}
                                                        folder and the GTA V root folder, each with its own{' '}
                                                        <code>CustomShaders</code> folder beside{' '}
                                                        <code>CoreFX.addon64</code>.
                                                    </li>
                                                    <li>
                                                        <strong>&quot;ReShade Blocked&quot; error</strong>
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
ReShade5=ID:XXXXXX acknowledged that ReShade 5.x has a bug that will lead to game crashes`}
                                                        </pre>
                                                    </li>
                                                </ul>
                                            </InstallationStep>
                                        </div>
                                    )}

                                    {/* ───────── Legacy FiveM ServerSide ───────── */}
                                    {activeInstallTab === 'fivem-server' && (
                                        <div className="install-block">

                                            <div className="bg-yellow-900/30 border border-yellow-700/50 p-4 rounded-lg mb-4">
                                                <p className="text-yellow-200 text-sm">
                                                    <strong>Still on 1.2.</strong> There is no 1.3.1 ServerSide
                                                    build yet, and access terms for the next one are to be
                                                    announced. The steps below describe the current 1.2
                                                    package.
                                                </p>
                                            </div>

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
                                                        <strong>Note for Optionals:</strong> Navigate to the <code>CoreFX\\[CoreFX]\\CoreFX</code> folder to configure <code>config.lua</code> for optional features.
                                                        (Note: <code>Install.bat</code> / <code>Uninstall.bat</code> scripts for optionals are not applicable for server-side installation).
                                                    </li>
                                                    <li>
                                                        <strong>Note for Players:</strong> For the best visual
                                                        experience, players should set their in-game{' '}
                                                        <strong>Shader Quality</strong> and{' '}
                                                        <strong>Post FX</strong> to <strong>Ultra</strong> in
                                                        the graphics settings. Additionally, set in-game brightness to approximately 40-50 %.
                                                    </li>
                                                </ol>
                                            </InstallationStep>
                                        </div>
                                    )}

                                    {/* ───────── Enhanced FiveM ───────── */}
                                    {activeInstallTab === 'enhanced-fivem' && (
                                        <div className="install-block">
                                            <div className="flex flex-col items-center justify-center text-center py-16 px-6">
                                                <span className="text-5xl mb-4">🚧</span>
                                                <h3 className="text-2xl font-bold mb-2">
                                                    Coming Soon
                                                </h3>
                                                <p className="text-gray-400 max-w-md">
                                                    CoreFX for Enhanced FiveM is in the works. An
                                                    installation guide will be published here once it&apos;s
                                                    ready. Stay tuned on our{' '}
                                                    <a
                                                        href="https://discord.gg/jK4SRmBqYt"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="underline hover:text-white"
                                                    >
                                                        Discord
                                                    </a>{' '}
                                                    for updates.
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        )}

                        {/* ───────── SHADER SETTINGS ───────── */}
                        {activeSection === 'settings' && (
                            <div className="space-y-6">
                                <div className="bg-black/30 rounded-lg p-5 md:p-6">
                                    <h2 className="text-2xl md:text-xl font-semibold mb-3">
                                        The CoreFX Addon menu
                                    </h2>
                                    <p className="text-gray-300 text-base md:text-sm mb-4">
                                        Every CoreFX effect is toggled and tuned from one place:
                                        the <strong>CoreFX Addon</strong> window inside
                                        the ReShade overlay. Settings are saved automatically and
                                        apply live, except where noted.
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2 text-gray-300 text-base md:text-sm">
                                        <li>
                                            <strong>Page Up</strong> — open or close the ReShade
                                            overlay. The CoreFX Addon is one of the windows
                                            inside it.
                                        </li>
                                        <li>
                                            <strong>Page Down</strong> — toggle the ReShade effects
                                            on and off.
                                        </li>
                                        <li>
                                            <strong>Numpad *</strong> — show or hide the FPS
                                            counter. <strong>Numpad -</strong> — take a screenshot
                                            (saved next to the game executable).
                                        </li>
                                    </ul>
                                </div>

                                <InstallationStep title="Legacy — what's in the menu" defaultOpen={false}>
                                    <p className="mb-3">
                                        Applies to Legacy Singleplayer and Legacy FiveM. The menu is
                                        split into six tabs.
                                    </p>
                                    <ul className="list-disc pl-5 space-y-3">
                                        <li>
                                            <strong>World</strong> — Volumetric Clouds, Godrays,
                                            Lightning &amp; Bolts, Cloud Performance Mode (cheaper
                                            cloud rendering); Screen Raindrops and a defocused
                                            style for them; Texture Detail with parallax depth,
                                            self-shadowing and ambient occlusion.
                                        </li>
                                        <li>
                                            <strong>Vehicles &amp; Peds</strong> — vehicle
                                            raindrops, metallic flakes, orange peel, and per-type
                                            emissive brightness sliders for headlights, taillights,
                                            indicators, brake lights, reverse lights, full beam,
                                            signs and sirens. Also ped and weapon raindrops.
                                        </li>
                                        <li>
                                            <strong>Lighting</strong> — coronas; streetlight
                                            recolouring with lamp and shaft/fog strength and
                                            colour; and three configurable streetlight colour
                                            bands (white, blue, orange).
                                        </li>
                                        <li>
                                            <strong>Image</strong> — puddle reflections, vehicle
                                            reflections, wet surfaces; motion blur with an
                                            intensity slider.
                                        </li>
                                        <li>
                                            <strong>HDR</strong> — see below.
                                        </li>
                                        <li>
                                            <strong>Options</strong> — hide the on-screen warnings,
                                            reload shaders and settings, reset everything, and
                                            links to the Discord and these docs.
                                        </li>
                                    </ul>
                                </InstallationStep>

                                <InstallationStep title="Enhanced — what's in the menu" defaultOpen={false}>
                                    <p className="mb-3">
                                        Enhanced has everything Legacy has apart from the Image tab
                                        (motion blur is a game setting there, and reflections are
                                        ray traced), plus a Ray Tracing tab.
                                    </p>
                                    <ul className="list-disc pl-5 space-y-3">
                                        <li>
                                            <strong>Ray Tracing</strong> — a master{' '}
                                            <strong>Definitive Ray Tracing</strong> toggle, then
                                            RTGI intensity, ray length and contact detail; RT
                                            reflection distance and intensity; and RTAO intensity
                                            and ray length.
                                        </li>
                                        <li>
                                            <strong>Ray Tracing &gt; Ambient Occlusion</strong> —
                                            SSAO, Detail Shadows, Micro Shadow and Sun Contact
                                            Shadows, each with its own intensity slider.
                                        </li>
                                        <li>
                                            <strong>World</strong> — as Legacy, plus{' '}
                                            <strong>Enhanced Wind Animation</strong> for vegetation
                                            (off by default).
                                        </li>
                                        <li>
                                            <strong>Lighting</strong> — as Legacy, plus lens ghosts
                                            and lens halo.
                                        </li>
                                        <li>
                                            <strong>Vehicles &amp; Peds</strong>,{' '}
                                            <strong>HDR</strong> and <strong>Options</strong> — same
                                            as Legacy.
                                        </li>
                                    </ul>
                                </InstallationStep>

                                <InstallationStep title="HDR" defaultOpen={false}>
                                    <p className="mb-3">
                                        CoreFX can upgrade the game to an HDR10 (PQ / BT.2020)
                                        swapchain on both Legacy and Enhanced. The HDR tab is where
                                        you turn it on and grade it.
                                    </p>
                                    <ol className="list-decimal pl-5 space-y-2">
                                        <li>
                                            Set <strong>HDR Mode</strong>. <strong>Auto</strong>{' '}
                                            follows the Windows &quot;Use HDR&quot; setting for your
                                            primary display; force <strong>On</strong> or{' '}
                                            <strong>Off</strong> if the game opens on a different
                                            monitor.
                                        </li>
                                        <li>
                                            <strong>Restart the game.</strong> The swapchain has to
                                            be set up before the game creates its device, so the
                                            change only takes effect on the next launch. The menu
                                            tells you whether HDR is currently active.
                                        </li>
                                        <li>
                                            <strong>Enhanced only:</strong> in-game HDR must be off
                                            and DLSS must be on. DLSS Frame Generation cannot be used
                                            at the same time — see{' '}
                                            <strong>Prerequisites &gt; HDR</strong>.
                                        </li>
                                    </ol>
                                    <p className="mt-3 mb-2">
                                        Once HDR is active, two panels become available:
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>
                                            <strong>HDR Tone Mapping</strong> — tone mapper choice,
                                            peak brightness, game and UI brightness (nits), gamma
                                            correction, white clip, compression and cone response.
                                        </li>
                                        <li>
                                            <strong>HDR Color Grading</strong> — scene grade
                                            strength, exposure, highlights, shadows, contrast,
                                            saturation and film grain.
                                        </li>
                                    </ul>
                                    <p className="text-gray-400 text-sm mt-3">
                                        While HDR is inactive these settings have no effect, and
                                        CoreFX runs as the standard SDR addon. The HDR swapchain and
                                        the tone mappers come from{' '}
                                        <a href="https://github.com/clshortfuse/renodx" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">RenoDX by ShortFuse</a>.
                                    </p>
                                </InstallationStep>

                                <InstallationStep title="On-screen warnings">
                                    <ul className="list-disc pl-5 space-y-3">
                                        <li>
                                            <strong>
                                                &quot;CoreFX: postfx composite not loaded&quot;
                                            </strong>{' '}
                                            — CoreFX is running, but its main shaders are not
                                            rendering. Set Shader Quality and Post FX to maximum in
                                            the game&apos;s graphics settings and restart. You will
                                            also see this in the main menu, which is normal.
                                        </li>
                                        <li>
                                            <strong>
                                                &quot;CoreFX: settings.json not loaded&quot;
                                            </strong>{' '}
                                            — the addon cannot find its settings file, so every
                                            shader is running on built-in defaults and the menu is
                                            empty. On FiveM this almost always means the payload was
                                            installed to only one of the two required locations.
                                        </li>
                                    </ul>
                                    <p className="mt-3">
                                        Both can be silenced permanently with{' '}
                                        <strong>Hide on-screen warnings</strong> under{' '}
                                        <strong>Options</strong> — though it is worth fixing the
                                        cause first.
                                    </p>
                                </InstallationStep>
                            </div>
                        )}
                    </div>
                </div>

                {/* ───────── RIGHT PANE (FAQ) ───────── */}
                <div className="w-full lg:w-96 flex flex-col gap-6">
                    <div className="bg-black/20 backdrop-blur-md rounded-lg p-6 max-h-[calc(100vh-10rem)] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="text-blue-400">?</span> Frequency Asked Questions
                        </h2>
                        <div className="space-y-4">
                            {faqs.map((faq, idx) => (
                                <div
                                    key={idx}
                                    className="bg-black/30 rounded-lg overflow-hidden border border-white/5"
                                >
                                    <div className="w-full p-4 text-left flex justify-between items-start gap-3 bg-white/5">
                                        <span className="font-semibold text-sm">{faq.question}</span>
                                    </div>
                                    <div className="p-4 pt-4 text-gray-400 text-sm border-t border-white/5">
                                        {faq.answer}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
