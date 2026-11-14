'use client';

type Game = 'Legacy' | 'Enhanced';

type Feature = {
    title: string;
    games: Game[];
    body: React.ReactNode;
    where?: React.ReactNode;
};

type Group = {
    title: string;
    intro?: string;
    features: Feature[];
};

const BOTH: Game[] = ['Legacy', 'Enhanced'];

const groups: Group[] = [
    {
        title: 'Weather and sky',
        features: [
            {
                title: 'Weather and timecycles',
                games: BOTH,
                body: (
                    <>
                        CoreFX replaces the game&apos;s weather files, so every weather and
                        every hour has its own light, colour and fog. They are made together
                        with CoreFX&apos;s shaders, and the two are meant to run as a pair.
                    </>
                )
            },
            {
                title: 'Physically based sky',
                games: BOTH,
                body: (
                    <>
                        The sky is worked out from how sunlight scatters through the air,
                        with a soft glow around the sun and clean, dark nights.
                    </>
                )
            },
            {
                title: 'Volumetric clouds',
                games: BOTH,
                body: (
                    <>
                        Real 3D clouds, raymarched as volumes instead of painted on a flat
                        sky. Sunlight is marched through each cloud, so edges glow and the
                        shaded sides fall away. They cast shadows on the ground, send
                        godrays through the gaps, light up with lightning and show in
                        reflections. Each weather has its own designs, and{' '}
                        <strong>Cloud Performance Mode</strong> makes them cheaper.
                    </>
                ),
                where: <>World &gt; Sky</>
            },
            {
                title: 'CloudBuilder',
                games: BOTH,
                body: (
                    <>
                        Our own app for designing clouds, included with CoreFX. Build cloud
                        designs and setups, choose which weather uses what, preview them at
                        any time of day, and install a pack into the game with one click. A
                        running game shows changed setups at once.
                    </>
                ),
                where: <>CoreFX\CloudBuilder\CloudBuilder.exe, then World &gt; Sky &gt; Cloud Pack</>
            }
        ]
    },
    {
        title: 'Ray tracing',
        features: [
            {
                title: 'FXPT path tracing',
                games: ['Enhanced'],
                body: (
                    <>
                        CoreFX&apos;s own path tracing. Global illumination replaces the
                        game&apos;s baked ambient with traced light that keeps bouncing, so
                        buildings pick up the glow of the streets around them. Lamps near the
                        camera cast their own soft ray-traced shadows, and neon signs, lit
                        windows and car lamps light the walls and roads around them.
                        Reflections are path traced with two bounces. Denoising is NRD on any
                        card, DLSS Ray Reconstruction on RTX cards or FSR Ray Regeneration on
                        Radeon RX 9000 cards. <strong>Performance Mode</strong> makes it
                        cheaper. FXPT is for an RTX 5070 Ti or RX 9070 XT, or better.
                    </>
                ),
                where: <>Ray Tracing &gt; Ray Tracing: FXPT</>
            },
            {
                title: 'Denoisers for the game’s own ray tracing',
                games: ['Enhanced'],
                body: (
                    <>
                        You don&apos;t need FXPT for cleaner ray tracing. With Ray Tracing on
                        Vanilla the rays stay the game&apos;s own, but NRD, DLSS Ray
                        Reconstruction or FSR Ray Regeneration can take over from its
                        denoisers, so reflections keep their shape instead of blurring away.
                    </>
                ),
                where: <>Ray Tracing &gt; Denoiser</>
            },
            {
                title: 'FXRT ray tracing',
                games: ['Legacy'],
                body: (
                    <>
                        Real ray tracing for a game that never had it, run against the
                        actual scene geometry rather than what is on screen. Sun shadows,
                        ambient occlusion, global illumination, lamp shadows and reflections
                        on glossy surfaces are each traced and each has its own switch. NRD
                        does the denoising, and <strong>Performance Mode</strong> makes it
                        cheaper at a small cost in detail. FXRT needs a card with hardware
                        ray tracing: NVIDIA RTX, or Radeon RX 6000 and newer.
                    </>
                ),
                where: <>Ray Tracing &gt; Ray Tracing: FXRT</>
            }
        ]
    },
    {
        title: 'Anti-aliasing, upscaling and frame rate',
        features: [
            {
                title: 'TAA, DLSS, FSR and XeSS',
                games: ['Legacy'],
                body: (
                    <>
                        Modern anti-aliasing for Legacy: our own TAA on any card, NVIDIA
                        DLSS, AMD FSR 3.1 and Intel XeSS. At full resolution DLSS, FSR and
                        XeSS anti-alias the image (DLAA, FSR Native AA, XeSS Native AA);
                        with the game&apos;s Frame Scaling below 1.000 they upscale. Foliage
                        and other fine detail stop breaking up into jagged pixels. On
                        Enhanced, anti-aliasing and upscaling stay in the game&apos;s own
                        settings.
                    </>
                ),
                where: <>Image &gt; Anti-Aliasing</>
            },
            {
                title: 'Frame generation and low latency',
                games: ['Legacy'],
                body: (
                    <>
                        A generated frame between each two the game renders: AMD FSR, Intel
                        XeSS with XeLL, or NVIDIA DLSS on RTX 40 series and newer (up to four
                        frames shown per rendered one on RTX 50). <strong>Low Latency</strong>{' '}
                        turns on NVIDIA Reflex or AMD Anti-Lag 2 for less input lag. On
                        Enhanced, frame generation is the game&apos;s own setting.
                    </>
                ),
                where: <>Image &gt; Frame Generation, Low Latency</>
            }
        ]
    },
    {
        title: 'Effects',
        features: [
            {
                title: 'Volumetric smoke',
                games: BOTH,
                body: (
                    <>
                        A real-time simulation replaces the game&apos;s flat smoke sprites
                        near the camera. Smoke billows, rises, drifts with the wind, goes
                        round the car and is lit through its own depth, and burnouts leave
                        smoke that piles up around the car. <strong>All Smoke</strong> also
                        takes over exhaust, flares, smoke grenades, explosions, fires, dust
                        and splashes. It only costs GPU time while there is smoke, and it is
                        off by default.
                    </>
                ),
                where: <>World &gt; Volumetric Smoke</>
            },
            {
                title: 'Screen-space reflections',
                games: BOTH,
                body: (
                    <>
                        Water, puddles, vehicles and every other reflective surface reflect
                        what is actually on screen, not just the game&apos;s blurry
                        reflection map: sharp on glossy surfaces, softer on rough ones. On
                        Enhanced they run while the game&apos;s ray-traced reflections are
                        off. Legacy adds <strong>Wet Surfaces</strong>: darker, glossier
                        roads in the rain.
                    </>
                ),
                where: <>Image &gt; Reflections</>
            },
            {
                title: 'Motion blur',
                games: BOTH,
                body: (
                    <>
                        A dedicated wheel blur follows each wheel&apos;s rotation, so at
                        speed it reads as a spinning disc instead of a frozen rim. On Legacy,
                        cars and people blur with their own movement, not just the
                        camera&apos;s. On Enhanced the blur runs at full resolution.
                    </>
                ),
                where: <>Image &gt; Motion Blur, Vehicles &amp; Peds &gt; Wheel Motion Blur</>
            },
            {
                title: 'Contact shadows',
                games: BOTH,
                body: (
                    <>
                        <strong>Detail Shadows</strong> add the small shadows the
                        game&apos;s shadow map misses, under cars and where objects meet walls
                        and floors. <strong>Sun Contact Shadows</strong> do the same for small
                        objects and surface detail in direct sunlight.
                    </>
                ),
                where: <>Lighting &gt; Contact Shadows</>
            },
            {
                title: 'Lens and camera',
                games: BOTH,
                body: (
                    <>
                        Raindrops on the lens, as realistic droplets or big out-of-focus
                        discs; lens ghosts and a halo ring around bright lights in the
                        bloom; procedural coronas around lamps.
                    </>
                ),
                where: <>World &gt; Screen Raindrops, Lighting &gt; Bloom, Corona</>
            },
            {
                title: 'Road detail',
                games: BOTH,
                body: (
                    <>
                        Roads get extra fine detail, parallax relief, gloss variation and
                        cleaner colour. The optional <strong>Classic Roads</strong> in the
                        installer swap in cleaner asphalt textures.
                    </>
                ),
                where: <>World &gt; Texture Detail</>
            }
        ]
    },
    {
        title: 'Vehicles and city lights',
        features: [
            {
                title: 'Vehicle paint',
                games: BOTH,
                body: (
                    <>
                        <strong>Vehicle Paint RGB Fixes</strong> make paint come out as the
                        colour you picked, instead of the game&apos;s far brighter version.
                        Paint also gets metallic flake sparkle and a subtle orange-peel
                        clearcoat, and rain beads on cars, people and weapons.
                    </>
                ),
                where: <>Vehicles &amp; Peds</>
            },
            {
                title: 'Vehicle lights',
                games: BOTH,
                body: (
                    <>
                        One brightness for every glowing part of a car, plus its own slider
                        for headlights, taillights, indicators, brake lights, reverse
                        lights, full beam, signs and sirens.
                    </>
                ),
                where: <>Vehicles &amp; Peds &gt; Vehicle Emissives</>
            },
            {
                title: 'Streetlights',
                games: BOTH,
                body: (
                    <>
                        Recolour the orange sodium streetlights and the light shafts and fog
                        they light, with three colour bands to set the mix across the city.{' '}
                        <strong>Streetlight Specular</strong> leaves a streak of each lamp on
                        the road, sharper when it is wet (on Enhanced it needs FXPT).
                    </>
                ),
                where: <>Lighting &gt; Streetlights</>
            }
        ]
    },
    {
        title: 'Display and menu',
        features: [
            {
                title: 'HDR',
                games: BOTH,
                body: (
                    <>
                        CoreFX can upgrade the game to an HDR10 (PQ / BT.2020) output, with
                        its own tone mapping and colour grading. It is off by default and
                        needs a restart after switching it on.
                    </>
                ),
                where: <>HDR &gt; HDR Mode</>
            },
            {
                title: 'The CoreFX Addon menu',
                games: BOTH,
                body: (
                    <>
                        Every setting lives in one window inside the ReShade overlay, with
                        tabs, a search box and your ReShade theme&apos;s colours. Each setting
                        shows a performance cost (Free, Low, Medium, High, Extreme, or Saves
                        for the ones that make the game faster), and{' '}
                        <strong>Options &gt; Video Memory</strong> shows how much video memory
                        the game is using right now.
                    </>
                ),
                where: <>Page Up in game</>
            }
        ]
    }
];

function GameBadge({ game }: { game: Game }) {
    return (
        <span
            className={`text-xs px-2 py-0.5 rounded-full border ${game === 'Legacy'
                ? 'border-amber-400/40 text-amber-200 bg-amber-900/20'
                : 'border-sky-400/40 text-sky-200 bg-sky-900/20'
                }`}
        >
            {game}
        </span>
    );
}

export default function FeaturesSection() {
    return (
        <div className="space-y-6">
            <div className="bg-black/30 rounded-lg p-5 md:p-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-3">Features</h1>
                <p className="text-gray-300 text-base md:text-sm">
                    What CoreFX does in each game. Most of it is switched and tuned in the{' '}
                    <strong>CoreFX Addon</strong> menu (Page Up in game); each card says
                    where. The <strong>Shader Settings</strong> section goes through the menu
                    in detail, and <strong>Prerequisites</strong> lists what each feature
                    needs from your PC.
                </p>
            </div>

            {groups.map((group) => (
                <div key={group.title} className="space-y-3">
                    <h2 className="text-xl font-semibold px-1">{group.title}</h2>
                    <div className="grid gap-3 md:grid-cols-2">
                        {group.features.map((f) => (
                            <div
                                key={f.title}
                                className="bg-black/30 border border-white/10 rounded-lg p-4 flex flex-col"
                            >
                                <h3 className="font-semibold text-base mb-2">{f.title}</h3>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {f.games.map((g) => (
                                        <GameBadge key={g} game={g} />
                                    ))}
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed flex-1">
                                    {f.body}
                                </p>
                                {f.where && (
                                    <p className="text-gray-500 text-xs mt-3">
                                        <span className="text-gray-400">Where:</span> {f.where}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
