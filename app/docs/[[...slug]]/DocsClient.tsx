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
                title: 'Legacy Hardware Requirements',
                items: [
                    'Minimum: NVIDIA GeForce RTX 2060 Super or AMD Radeon RX 5700',
                    'Recommended: NVIDIA GeForce RTX 3070 or AMD Radeon RX 6700 XT',
                    'FXRT (ray tracing): a graphics card with hardware ray tracing, NVIDIA RTX or AMD Radeon RX 6000 and newer, and an up-to-date driver.'
                ]
            },
            {
                title: 'Enhanced Hardware Requirements',
                items: [
                    'Ray Tracing Minimum: NVIDIA GeForce RTX 3060 or AMD Radeon RX 6600 XT',
                    'Ray Tracing Recommended: NVIDIA GeForce RTX 4060 Ti or AMD Radeon RX 7700 XT',
                    'FXPT (path tracing): NVIDIA GeForce RTX 5070 Ti or AMD Radeon RX 9070 XT, or better.'
                ]
            },
            {
                title: 'HDR (Optional, Legacy & Enhanced)',
                items: [
                    'An HDR-capable display with "Use HDR" enabled in Windows Display settings. CoreFX upgrades the game to an HDR10 (PQ / BT.2020) swapchain.',
                    <>HDR is switched on in the <strong>CoreFX Addon</strong> menu (<strong>HDR</strong> tab &gt; <strong>HDR Mode</strong>), not in the game. It is <strong>Off</strong> by default — set it to <strong>On</strong>. <strong>Changing it requires a game restart.</strong></>,
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
                    <>If CoreFX&apos;s shaders are not drawing, it shows an on-screen warning — <em>&quot;CoreFX: shaders not running&quot;</em>. In the main menu or on a loading screen this is normal. If it stays while you play, see <strong>Shader Settings &gt; On-screen warnings</strong>.</>,
                    <><strong>Legacy only:</strong> Shader Quality has to be High or Very High, and Stereo 3D has to be off.</>
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
                    <>Every CoreFX archive ships with <code>LICENSE.md</code> (the CoreFX end user licence, version 2.1) and <code>THIRD-PARTY-NOTICES.md</code>. Installing or using CoreFX means accepting those terms — worth a read before you start. Both are on this site: the <a href="/license" className="underline hover:text-white">licence</a> and the <a href="/third-party-notices" className="underline hover:text-white">third-party notices</a>.</>,
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
            'For Legacy builds, open the ReShade menu with Page Up, go to the CoreFX Addon window, and turn off Image > Motion Blur (there is also a Blur Intensity slider next to it). For Enhanced builds, turn Motion Blur Strength down in your GTA 5 graphics settings, or set Image > Motion Blur Strength to 0 in the CoreFX Addon window.'
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
            'Yes, on both Legacy and Enhanced. Turn on "Use HDR" in Windows for your display, then open the CoreFX Addon menu, go to the HDR tab and set HDR Mode to On (it is Off by default). It takes effect on the next game launch, because the swapchain has to be upgraded before the game creates its device. Once HDR is active, the tone mapping and colour grading settings in the same tab take effect. On Enhanced, in-game HDR must be off, DLSS must be on, and DLSS Frame Generation cannot be used at the same time.'
    },
    {
        question:
            'I see an orange "CoreFX: shaders not running" message on screen. What does it mean?',
        answer:
            'CoreFX is loaded, but the game is not drawing with its shaders. In the main menu or on a loading screen this is normal. If it stays while you play on Legacy, check that Shader Quality is High or Very High and Stereo 3D is off, then restart the game. If those are right, or you are on Enhanced, a game update has most likely changed the game\'s shaders, so update CoreFX to the version made for your game. If you want it gone permanently, the CoreFX Addon menu has a "Hide on-screen warnings" toggle under Options.'
    },
    {
        question: 'What are FXPT and FXRT?',
        answer:
            'FXPT is CoreFX\'s own path tracing for GTA V Enhanced: path-traced reflections, global illumination, and lamps and glowing surfaces that light the scene. FXRT is CoreFX\'s ray tracing for GTA V Legacy: ray-traced sun shadows, ambient occlusion, global illumination and lamp shadows. Both are picked in the Ray Tracing tab of the CoreFX Addon window, and both are off by default. See Shader Settings for what each needs.'
    },
    {
        question: 'How do I use DLSS or FSR on Legacy?',
        answer:
            'Open the Image tab of the CoreFX Addon window and set Anti-Aliasing to DLSS or FSR. At the game\'s Frame Scaling 1.000 they anti-alias at full size; below it they upscale. Turn off the game\'s TXAA and FXAA, and turn MSAA off to upscale. The Running now line in that card shows what is actually drawing the frame.'
    },
    {
        question: 'Can I change the clouds?',
        answer:
            'Yes. CloudBuilder comes with CoreFX, in the CoreFX\\CloudBuilder folder. Make your own clouds there, install them into the game with one click, and pick them under World > Sky > Cloud Pack in the CoreFX Addon window.'
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
                                                        If prompted, select your GTA 5 Legacy folder. The base mod
                                                        and your optionals install into the <code>mods</code>{' '}
                                                        folder; ReShade, <code>CoreFX.addon64</code> and the{' '}
                                                        <code>CoreFX</code> folder go beside the game executable.
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
                                                        If prompted, select your GTA 5 Enhanced folder. The base mod
                                                        and your optionals install into the <code>mods</code>{' '}
                                                        folder; ReShade, <code>CoreFX.addon64</code> and the{' '}
                                                        <code>CoreFX</code> folder go beside the game executable.
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
                                                        <strong>HDR Mode</strong> to <strong>On</strong> (it is{' '}
                                                        <strong>Off</strong> by default), make sure Windows{' '}
                                                        &quot;Use HDR&quot; is on, and restart the game. Enhanced also
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
                                                        ships its own ReShade build, in the <code>plugins</code>{' '}
                                                        folder only. The <code>d3d12.dll</code> of CoreFX
                                                        Singleplayer can stay if you play that on the same game.
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
                                                                <code>CoreFX\</code>,{' '}
                                                                <code>reshade-shaders\</code> and{' '}
                                                                <code>ReShade.ini</code>.
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <code>GTA 5 Root Folder\</code> — the same files without
                                                        ReShade&apos;s <code>dxgi.dll</code>, for your actual GTA V
                                                        install folder.
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
                                                                <strong>Both copies are required.</strong> The
                                                                FiveM <code>plugins</code> folder gets everything,
                                                                ReShade&apos;s <code>dxgi.dll</code> included. The
                                                                GTA V root folder gets everything except that DLL.
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
                                                        the <code>CoreFX</code> and{' '}
                                                        <code>reshade-shaders</code> folders.
                                                    </li>
                                                    <li>
                                                        Delete <code>CoreFX.addon64</code>, <code>ReShade.ini</code>,
                                                        and the <code>CoreFX</code> and{' '}
                                                        <code>reshade-shaders</code> folders from your GTA V root
                                                        folder too, unless you also use CoreFX Singleplayer there.
                                                    </li>
                                                    <li>Restart FiveM.</li>
                                                </ol>
                                            </InstallationStep>

                                            <InstallationStep title="Troubleshooting">
                                                <ul className="list-disc pl-5 space-y-3">
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
                                            <div className="flex flex-col items-center justify-center text-center py-16 px-6">
                                                <span className="text-5xl mb-4">🚧</span>
                                                <h3 className="text-2xl font-bold mb-2">
                                                    Work In Progress
                                                </h3>
                                                <p className="text-gray-400 max-w-md">
                                                    CoreFX for Legacy FiveM ServerSide is being completely
                                                    remade, and it is not available to download in the
                                                    meantime. Please wait for its announcement on our{' '}
                                                    <a
                                                        href="https://discord.gg/jK4SRmBqYt"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="underline hover:text-white"
                                                    >
                                                        Discord
                                                    </a>
                                                    .
                                                </p>
                                            </div>
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
                                        the ReShade overlay. Settings are saved automatically to{' '}
                                        <code>CoreFX\Presets\CoreFX.ini</code> and apply live,
                                        except where noted.
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
                                        <li>
                                            The tabs run down the side of the window, with a search
                                            box above them and <strong>Reset all</strong> and the
                                            links to the Discord and these docs below. A dot on a tab
                                            means something in it differs from its default. The menu
                                            takes its colours from your ReShade theme.
                                        </li>
                                    </ul>
                                </div>

                                <InstallationStep title="Legacy — what's in the menu" defaultOpen={false}>
                                    <p className="mb-3">
                                        Applies to Legacy Singleplayer and Legacy FiveM. The menu has
                                        seven tabs.
                                    </p>
                                    <ul className="list-disc pl-5 space-y-3">
                                        <li>
                                            <strong>Ray Tracing</strong> — Ray Tracing:{' '}
                                            <strong>Vanilla</strong> or <strong>FXRT</strong>. See{' '}
                                            <strong>FXRT</strong> below.
                                        </li>
                                        <li>
                                            <strong>World</strong> — Volumetric Clouds, Godrays,
                                            Lightning &amp; Bolts, Cloud Performance Mode (cheaper
                                            cloud rendering), Cloud Pack and Cloud Variation; Screen
                                            Raindrops and a defocused style for them; Texture Detail;
                                            and Volumetric Smoke with its shape and light settings.
                                        </li>
                                        <li>
                                            <strong>Vehicles &amp; Peds</strong> — Vehicle Paint
                                            RGB Fixes (paint comes out as the colour you picked
                                            in the RGB picker, instead of the game&apos;s far
                                            brighter version), vehicle raindrops, metallic flakes,
                                            orange peel, Wheel Motion Blur, and Vehicle Emissives: an
                                            overall emissive brightness slider plus per-type sliders
                                            for headlights, taillights, indicators, brake lights,
                                            reverse lights, full beam, signs and sirens. Also ped and
                                            weapon raindrops.
                                        </li>
                                        <li>
                                            <strong>Lighting</strong> — coronas; streetlight
                                            recolouring with lamp and shaft/fog strength and
                                            colour, three configurable colour bands, and Streetlight
                                            Specular (the streak a lamp leaves on the road, sharper
                                            and brighter when it is wet); Detail Shadows and Sun
                                            Contact Shadows; lens ghosts and lens halo.
                                        </li>
                                        <li>
                                            <strong>Image</strong> — Anti-Aliasing (see{' '}
                                            <strong>Anti-aliasing and upscaling</strong> below);
                                            Screen-Space Reflections and wet surfaces; motion blur
                                            with an intensity slider.
                                        </li>
                                        <li>
                                            <strong>HDR</strong> — see below.
                                        </li>
                                        <li>
                                            <strong>Options</strong> — hide the on-screen warnings.
                                        </li>
                                    </ul>
                                </InstallationStep>

                                <InstallationStep title="Enhanced — what's in the menu" defaultOpen={false}>
                                    <p className="mb-3">
                                        The same seven tabs. These are the differences from Legacy.
                                    </p>
                                    <ul className="list-disc pl-5 space-y-3">
                                        <li>
                                            <strong>Ray Tracing</strong> — Ray Tracing:{' '}
                                            <strong>Vanilla</strong> or <strong>FXPT</strong>, the
                                            Denoiser for each, Performance Mode and the Ray
                                            Reconstruction Model. See <strong>FXPT</strong> below.
                                        </li>
                                        <li>
                                            <strong>World</strong> — as Legacy, plus{' '}
                                            <strong>Enhanced Wind Animation</strong> for vegetation
                                            (off by default).
                                        </li>
                                        <li>
                                            <strong>Lighting</strong> — as Legacy. Streetlight
                                            Specular needs FXPT here.
                                        </li>
                                        <li>
                                            <strong>Image</strong> — Motion Blur Strength, which
                                            multiplies the game&apos;s own motion blur (0 turns it
                                            off), and Screen-Space Reflections, which run while the
                                            game&apos;s ray-traced reflections are off. Anti-aliasing
                                            and upscaling stay in the game&apos;s graphics settings.
                                        </li>
                                        <li>
                                            <strong>Vehicles &amp; Peds</strong>,{' '}
                                            <strong>HDR</strong> and <strong>Options</strong> — same
                                            as Legacy.
                                        </li>
                                    </ul>
                                </InstallationStep>

                                <InstallationStep title="FXPT (Enhanced)" defaultOpen={false}>
                                    <p className="mb-3">
                                        FXPT is CoreFX&apos;s own path tracing. Set{' '}
                                        <strong>Ray Tracing</strong> to <strong>FXPT</strong> in the
                                        Ray Tracing tab, with ray tracing on in the game&apos;s
                                        graphics settings. <strong>Vanilla</strong>, the default,
                                        keeps the game&apos;s own ray tracing. FXPT is for an NVIDIA
                                        GeForce RTX 5070 Ti or AMD Radeon RX 9070 XT, or better.
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>
                                            Reflections are path traced with two bounces.
                                        </li>
                                        <li>
                                            Global illumination replaces the game&apos;s baked
                                            ambient, with light that keeps bouncing.
                                        </li>
                                        <li>
                                            Lamps near the camera cast soft ray-traced shadows, and
                                            neon signs, lit windows and vehicle lamps light what is
                                            around them.
                                        </li>
                                        <li>
                                            <strong>Performance Mode</strong> makes it cheaper at a
                                            small cost in detail. Nothing is switched off.
                                        </li>
                                    </ul>
                                    <p className="mt-3 mb-2">
                                        <strong>Denoiser</strong> picks what cleans up the traced
                                        light, in FXPT and in Vanilla. In Vanilla the rays stay the
                                        game&apos;s own, and <strong>Game&apos;s own</strong> keeps
                                        its denoisers too.
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>
                                            <strong>NRD</strong> — any card.
                                        </li>
                                        <li>
                                            <strong>Ray Reconstruction</strong> — RTX cards. Needs
                                            DLSS selected in the game&apos;s graphics settings.
                                        </li>
                                        <li>
                                            <strong>FSR Ray Regeneration</strong> — Radeon RX 9000
                                            cards under Windows 11.
                                        </li>
                                    </ul>
                                    <p className="text-gray-400 text-sm mt-3">
                                        If Ray Reconstruction or Ray Regeneration cannot start, NRD
                                        denoises instead until the game restarts.
                                    </p>
                                </InstallationStep>

                                <InstallationStep title="FXRT (Legacy)" defaultOpen={false}>
                                    <p className="mb-3">
                                        FXRT is real ray tracing for Legacy, against the actual
                                        scene geometry rather than what is on screen. Set{' '}
                                        <strong>Ray Tracing</strong> to <strong>FXRT</strong> in the
                                        Ray Tracing tab. <strong>Vanilla</strong>, the default, keeps
                                        the game&apos;s own shadows and lighting.
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>
                                            Sun shadows, ambient occlusion, global illumination and
                                            lamp shadows are ray traced, all from that one switch.
                                        </li>
                                        <li>NRD does the denoising.</li>
                                        <li>
                                            It needs hardware ray tracing: NVIDIA RTX or Radeon RX
                                            6000 and newer, with an up-to-date driver.
                                        </li>
                                        <li>It does not cover reflections or interiors.</li>
                                    </ul>
                                </InstallationStep>

                                <InstallationStep title="Anti-aliasing and upscaling (Legacy)" defaultOpen={false}>
                                    <p className="mb-3">
                                        <strong>Anti-Aliasing</strong> in the Image tab picks one of
                                        four:
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>
                                            <strong>Off</strong>.
                                        </li>
                                        <li>
                                            <strong>TAA</strong> — CoreFX&apos;s own, on any card,
                                            with Strength and Sharpness sliders.
                                        </li>
                                        <li>
                                            <strong>DLSS</strong> — NVIDIA RTX cards and a recent
                                            driver. <strong>DLAA Preset</strong> picks the network.
                                        </li>
                                        <li>
                                            <strong>FSR</strong> — AMD FSR 3.1, on any card that runs
                                            Direct3D 12, under Windows 11.
                                        </li>
                                    </ul>
                                    <p className="mt-3">
                                        At the game&apos;s <strong>Frame Scaling</strong> 1.000 (in
                                        Advanced Graphics), DLSS and FSR anti-alias at full size:
                                        DLAA and FSR Native AA. Below it the game renders smaller
                                        and they upscale to your screen. Texture sharpness for a new
                                        Frame Scaling applies after a restart.
                                    </p>
                                    <p className="mt-3">
                                        Turn off the game&apos;s TXAA and FXAA. Upscaling also needs
                                        MSAA off.
                                    </p>
                                    <p className="mt-3">
                                        The <strong>Running now</strong> line under Anti-Aliasing
                                        shows what actually drew the last frame: the mode, such as
                                        DLSS Quality or FSR Native AA, and its sizes. If DLSS or FSR
                                        cannot run, it says so and names TAA.
                                    </p>
                                </InstallationStep>

                                <InstallationStep title="Clouds and CloudBuilder" defaultOpen={false}>
                                    <p className="mb-3">
                                        <strong>World &gt; Sky</strong> holds the clouds&apos;
                                        settings. <strong>Cloud Pack</strong> picks a set of clouds:{' '}
                                        <strong>CoreFX</strong> is the one that ships, and packs you
                                        install show up there. <strong>Cloud Variation</strong> leaves
                                        each weather to its own clouds (<strong>By weather</strong>),
                                        or forces one setup in every weather.
                                    </p>
                                    <p className="mb-3">
                                        <strong>CloudBuilder</strong> is our app for making clouds,
                                        and it comes with CoreFX. Start{' '}
                                        <code>CloudBuilder.exe</code> from the{' '}
                                        <code>CoreFX\CloudBuilder</code> folder beside the game, or{' '}
                                        <code>plugins\CoreFX\CloudBuilder</code> on FiveM. It needs
                                        Windows 10 or 11 and a DirectX 12 graphics card.
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>
                                            A <strong>design</strong> is a kind of cloud. It is baked
                                            for the game, so changing one takes a bake.
                                        </li>
                                        <li>
                                            A <strong>setup</strong> is one look made from a design:
                                            how much of the sky it covers, how high it sits, its
                                            shape and its light.
                                        </li>
                                        <li>
                                            Every weather has a <strong>mix</strong> of setups and
                                            picks one by chance when it begins.
                                        </li>
                                        <li>
                                            All of that together is a <strong>pack</strong>. Press{' '}
                                            <strong>Install pack in game</strong>, then pick it under
                                            Cloud Pack. A running game shows changed setups at once.
                                        </li>
                                    </ul>
                                </InstallationStep>

                                <InstallationStep title="Volumetric Smoke" defaultOpen={false}>
                                    <p className="mb-3">
                                        Volumetric Smoke turns the game&apos;s flat smoke sprites near
                                        the camera into a real volume: it billows, rises, drifts with
                                        the wind, goes round the car and is lit through its own depth.
                                        It is in the World tab, and it is <strong>off by default</strong>.
                                        It only costs GPU time while there is smoke.
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>
                                            <strong>Smoke Source</strong> — <strong>Burnouts Only</strong>{' '}
                                            takes the tyre smoke of burnouts, wheelspins and skids.{' '}
                                            <strong>All Smoke</strong> also takes exhaust, flares,
                                            smoke grenades, explosions, fires, dust and splashes.
                                        </li>
                                        <li>
                                            <strong>Volumetric Smoke</strong> and{' '}
                                            <strong>Volumetric Smoke Light</strong> cards — how long
                                            it lasts, how it moves, and how it takes the light.
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
                                            Turn on Windows &quot;Use HDR&quot; for the display the
                                            game runs on, then set <strong>HDR Mode</strong> at the
                                            top of the HDR tab to <strong>On</strong>. It is{' '}
                                            <strong>Off</strong> by default.
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
                                        Below HDR Mode are two panels, which take effect once HDR is
                                        active:
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
                                                &quot;CoreFX: shaders not running&quot;
                                            </strong>{' '}
                                            — CoreFX is loaded, but the game is not drawing with its
                                            shaders, so most of its effects are off. In the main menu
                                            or on a loading screen this is normal. If it stays while
                                            you play on Legacy, check that Shader Quality is High or
                                            Very High and Stereo 3D is off, then restart the game.
                                            If those are right, or you are on Enhanced, a game update
                                            has most likely changed the game&apos;s shaders: update
                                            CoreFX to the version made for your game.
                                        </li>
                                        <li>
                                            <strong>
                                                &quot;CoreFX: settings not loaded - no UI settings&quot;
                                            </strong>{' '}
                                            — the add-on could not read the settings it carries, so
                                            every shader is on its built-in defaults and the menu is
                                            empty. The add-on&apos;s file is damaged: reinstall CoreFX.
                                        </li>
                                        <li>
                                            <strong>
                                                &quot;CoreFX: FXRT could not start&quot;
                                            </strong>{' '}
                                            (Legacy only) — Ray Tracing is set to FXRT, but it could
                                            not run on this PC, so the game&apos;s own lighting is in
                                            use. The notice says why. FXRT needs hardware ray tracing
                                            and an up-to-date driver. Set Ray Tracing to Vanilla to
                                            remove it.
                                        </li>
                                        <li>
                                            <strong>
                                                &quot;CoreFX: DLSS Frame Generation conflicts with HDR&quot;
                                            </strong>{' '}
                                            (Enhanced only) — CoreFX HDR and DLSS Frame Generation
                                            are both on, so the picture stops updating. Install
                                            RenoDX&apos;s{' '}
                                            <a href="https://github.com/clshortfuse/renodx/releases/download/snapshot/renodx-dlssfix.addon64" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">DLSS fix addon</a>{' '}
                                            beside the game executable, or turn one of the two off:
                                            Frame Generation in the game&apos;s graphics settings, or
                                            HDR Mode in the CoreFX Addon (then restart).
                                        </li>
                                        <li>
                                            <strong>
                                                &quot;CoreFX: ray tracing is partly running on the game&apos;s own shaders&quot;
                                            </strong>{' '}
                                            (Enhanced only) — FXPT is on, but CoreFX has no version of
                                            some shaders the game is using, on a graphics card or
                                            in-game ray tracing setting it does not support yet. Those
                                            parts run as the game&apos;s own. Set Ray Tracing to Vanilla
                                            to remove it.
                                        </li>
                                    </ul>
                                    <p className="mt-3">
                                        <strong>Hide on-screen warnings</strong> in the{' '}
                                        <strong>Options</strong> tab silences them permanently,
                                        though it is worth fixing the cause first. It changes nothing
                                        about how CoreFX renders. The settings warning cannot be
                                        hidden, because that toggle lives in the settings that failed
                                        to load.
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
                            <span className="text-blue-400">?</span> Frequently Asked Questions
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
