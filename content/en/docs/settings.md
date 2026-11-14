---
title: Shader Settings
layout: steps
---

### The CoreFX Addon menu

Every CoreFX effect is toggled and tuned from one place: the **CoreFX Addon** window inside the ReShade overlay. Settings are saved automatically to `CoreFX\Presets\CoreFX.ini` and apply live, except where noted.
- **Page Up** — open or close the ReShade overlay. The CoreFX Addon is one of the windows inside it.
- **Page Down** — toggle the ReShade effects on and off.
- `Numpad *` — show or hide the FPS counter. `Numpad -` — take a screenshot (saved next to the game executable).
- The tabs run down the side of the window, with a search box above them and **Reset all** and the links to the Discord and these docs below. A dot on a tab means something in it differs from its default. The menu takes its colours from your ReShade theme.

## Legacy — what's in the menu

Applies to Legacy Singleplayer and Legacy FiveM. The menu has seven tabs.
- **Ray Tracing** — Ray Tracing: **Vanilla** or **FXRT**, a switch for each part of FXRT, and Performance Mode. See **FXRT** below.
- **World** — Volumetric Clouds, Godrays, Lightning & Bolts, Cloud Performance Mode (cheaper cloud rendering), Cloud Pack and Cloud Variation; Screen Raindrops and a defocused style for them; Texture Detail; and Volumetric Smoke with its shape and light settings.
- **Vehicles & Peds** — Vehicle Paint RGB Fixes (paint comes out as the colour you picked in the RGB picker, instead of the game's far brighter version), vehicle raindrops, metallic flakes, orange peel, Wheel Motion Blur, and Vehicle Emissives: an overall emissive brightness slider plus per-type sliders for headlights, taillights, indicators, brake lights, reverse lights, full beam, signs and sirens. Also ped and weapon raindrops.
- **Lighting** — coronas; streetlight recolouring with lamp and shaft/fog strength and colour, three configurable colour bands, and Streetlight Specular (the streak a lamp leaves on the road, sharper and brighter when it is wet); Detail Shadows and Sun Contact Shadows; lens ghosts and lens halo.
- **Image** — Anti-Aliasing, Frame Generation and Low Latency (see **Anti-aliasing and upscaling** and **Frame generation** below); Screen-Space Reflections and wet surfaces; motion blur with an intensity slider.
- **HDR** — see below.
- **Options** — hide the on-screen warnings; Video Memory, with Fit Texture Budget to VRAM (see **Performance and video memory** below).

## Enhanced — what's in the menu

The same seven tabs. These are the differences from Legacy.
- **Ray Tracing** — Ray Tracing: **Vanilla** or **FXPT**, the Denoiser for each, Performance Mode and the Ray Reconstruction Model. See **FXPT** below.
- **World** — as Legacy.
- **Lighting** — as Legacy. Streetlight Specular needs FXPT here.
- **Image** — Motion Blur Strength, which multiplies the game's own motion blur (0 turns it off), and Screen-Space Reflections, which run while the game's ray-traced reflections are off. Anti-aliasing and upscaling stay in the game's graphics settings.
- **Vehicles & Peds** and **HDR** — same as Legacy.
- **Options** — hide the on-screen warnings, and the Video Memory meter. Enhanced has no texture budget setting: the game sizes it from your card by itself.

## FXPT (Enhanced)

FXPT is CoreFX's own path tracing. Set **Ray Tracing** to **FXPT** in the Ray Tracing tab, with ray tracing on in the game's graphics settings. **Vanilla**, the default, keeps the game's own ray tracing. FXPT is for an NVIDIA GeForce RTX 5070 Ti or AMD Radeon RX 9070 XT, or better.
- Reflections are path traced with two bounces.
- Global illumination replaces the game's baked ambient, with light that keeps bouncing.
- Lamps near the camera cast soft ray-traced shadows, and neon signs, lit windows and vehicle lamps light what is around them.
- **Performance Mode** makes it cheaper at a small cost in detail. Nothing is switched off.

**Denoiser** picks what cleans up the traced light, in FXPT and in Vanilla. In Vanilla the rays stay the game's own, and **Game's own** keeps its denoisers too.
- **NRD** — any card.
- **Ray Reconstruction** — RTX cards. Needs DLSS selected in the game's graphics settings.
- **FSR Ray Regeneration** — Radeon RX 9000 cards under Windows 11.

If Ray Reconstruction or Ray Regeneration cannot start, NRD denoises instead until the game restarts.

## FXRT (Legacy)

FXRT is real hardware ray tracing (DXR) for Legacy, against the actual scene geometry rather than what is on screen. It runs on a Direct3D 12 device beside the game's DirectX 11 renderer. Set **Ray Tracing** to **FXRT** in the Ray Tracing tab. **Vanilla**, the default, keeps the game's own shadows and lighting.
- Each part has its own switch below it, all on by default: **Sun Shadows** (the sun's and the moon's, in place of the game's shadow maps), **Ambient Occlusion**, **Global Illumination** (bounce light from lit walls and ground), **Lamp Shadows** (street lamps and the other shadow-casting lights) and **RT Reflections** on glossy surfaces such as cars, wet roads and polished floors. Switching a part off gives you the game's own version of it.
- RT Reflections need Global Illumination on. Indoors the game's own ambient occlusion and ambient light stay.
- **Performance Mode** makes FXRT cheaper at a small cost in detail: the global illumination is traced on half the pixels each frame, rays are shorter, and only the lamps the game made shadow-casting cast ray-traced shadows, which saves the most at night. It applies at once.
- NRD does the denoising.
- It needs hardware ray tracing: NVIDIA RTX or Radeon RX 6000 and newer, with an up-to-date driver.

## Anti-aliasing and upscaling (Legacy)

**Anti-Aliasing** in the Image tab picks one of five. Each keeps its own settings, which show only while it is picked.
- **Off**.
- **TAA** — CoreFX's own, on any card, with Strength and Sharpness sliders.
- **DLSS** — NVIDIA RTX cards and a recent driver. **Preset** picks the network: K is the default and the cheapest of the modern ones, L and M are newer and sharper and use more video memory.
- **FSR** — AMD FSR 3.1, on any card that runs Direct3D 12, under Windows 11.
- **XeSS** — Intel XeSS Super Resolution. Needs the same as FSR plus the Microsoft Visual C++ Redistributable 14.40 or newer, and runs best on Intel Arc cards.

At the game's **Frame Scaling** 1.000 (in Advanced Graphics), DLSS, FSR and XeSS anti-alias at full size: DLAA, FSR Native AA and XeSS Native AA. Below it the game renders smaller and they upscale to your screen. Texture sharpness for a new Frame Scaling applies after a restart.

Turn off the game's TXAA and FXAA. Upscaling also needs MSAA off.

The **Running now** line under Anti-Aliasing shows what actually drew the last frame: the mode, such as DLSS Quality or FSR Native AA, and its sizes. If DLSS, FSR or XeSS cannot run, it says so and names TAA.

## Frame generation and low latency (Legacy)

**Frame Generation** in the Image tab makes a frame between each two the game renders, so about twice as many reach the screen. It works with every anti-aliasing choice.
- **AMD FSR** — any recent card. Keeps the HUD out of the made frames (not in HDR).
- **Intel XeSS** — any recent card, with Intel's XeLL latency reduction, which comes on with it. It does not run while RivaTuner Statistics Server (RTSS) is running.
- **NVIDIA DLSS** — RTX 40 series and newer. On an RTX 50, **Frames Shown** goes up to 4x.

Frame generation needs the game's **Screen Type** set to **Windowed Borderless**, adds some input lag, and pauses while the menu is open. It is at its best from about 60 fps up.

**Low Latency** (Off, On, On + Boost) turns on NVIDIA Reflex or AMD Anti-Lag 2, so frames do not queue up. It costs frames in this game: in our tests about a third less lag for about a sixth fewer frames. On + Boost keeps an NVIDIA card at full clocks. While frame generation runs, it keeps the latency down itself.

## Performance and video memory

- Every feature carries a **performance cost** badge: **Free**, **Low**, **Medium**, **High** or **Extreme**, and **Saves** for settings that make the game faster, such as the performance modes. Hover a setting to see its cost in the tooltip.
- **Options > Video Memory** shows the video memory the game uses right now, out of what Windows gives it, refreshed every second. If it goes over, Windows moves memory out and the frame rate suffers.
- **Fit Texture Budget to VRAM** (Legacy, on by default) keeps the game's texture budget within what your card can hold together with CoreFX. Without it, a card with little video memory can overflow and the frame rate can drop and stay down. On a 4 GB card it means FiveM's Extended Texture Budget has no effect, and textures may load later or look softer. Cards with plenty of video memory are not affected either way.

## Clouds and CloudBuilder

**World > Sky** holds the clouds' settings. **Cloud Pack** picks a set of clouds: **CoreFX** is the one that ships, and packs you install show up there. **Cloud Variation** leaves each weather to its own clouds (**By weather**), or forces one setup in every weather.

**CloudBuilder** is our app for making clouds, and it comes with CoreFX. Start `CloudBuilder.exe` from the `CoreFX\CloudBuilder` folder beside the game, or `plugins\CoreFX\CloudBuilder` on FiveM. It needs Windows 10 or 11 and a DirectX 12 graphics card.
- A **design** is a kind of cloud. It is baked for the game, so changing one takes a bake.
- A **setup** is one look made from a design: how much of the sky it covers, how high it sits, its shape and its light.
- Every weather has a **mix** of setups and picks one by chance when it begins.
- All of that together is a **pack**. Press **Install pack in game**, then pick it under Cloud Pack. A running game shows changed setups at once.

## Volumetric Smoke

Volumetric Smoke turns the game's flat smoke sprites near the camera into a real volume: it billows, rises, drifts with the wind, goes round the car and is lit through its own depth. It is in the World tab, and it is **off by default**. It only costs GPU time while there is smoke.
- **Smoke Source** — **Burnouts Only** takes the tyre smoke of burnouts, wheelspins and skids. **All Smoke** also takes exhaust, flares, smoke grenades, explosions, fires, dust and splashes.
- **Volumetric Smoke** and **Volumetric Smoke Light** cards — how long it lasts, how it moves, and how it takes the light.

## HDR

CoreFX can upgrade the game to an HDR10 (PQ / BT.2020) swapchain on both Legacy and Enhanced. The HDR tab is where you turn it on and grade it.
1. Turn on Windows "Use HDR" for the display the game runs on, then set **HDR Mode** at the top of the HDR tab to **On**. It is **Off** by default.
2. **Restart the game.** The swapchain has to be set up before the game creates its device, so the change only takes effect on the next launch. The menu tells you whether HDR is currently active.
3. **Enhanced only:** in-game HDR must be off and DLSS must be on. DLSS Frame Generation cannot be used at the same time — see **Prerequisites > HDR**.

Below HDR Mode are two panels, which take effect once HDR is active:
- **HDR Tone Mapping** — tone mapper choice, peak brightness, game and UI brightness (nits), gamma correction, white clip, compression and cone response.
- **HDR Color Grading** — scene grade strength, exposure, highlights, shadows, contrast, saturation and film grain.

While HDR is inactive these settings have no effect, and CoreFX runs as the standard SDR addon. The HDR swapchain and the tone mappers come from [RenoDX by ShortFuse](https://github.com/clshortfuse/renodx).

## On-screen warnings

- **"CoreFX: shaders not running"** — CoreFX is loaded, but the game is not drawing with its shaders, so most of its effects are off. In the main menu or on a loading screen this is normal. If it stays while you play on Legacy, check that Shader Quality is High or Very High and Stereo 3D is off, then restart the game. If those are right, or you are on Enhanced, a game update has most likely changed the game's shaders: update CoreFX to the version made for your game.
- **"CoreFX: settings not loaded - no UI settings"** — the add-on could not read the settings it carries, so every shader is on its built-in defaults and the menu is empty. The add-on's file is damaged: reinstall CoreFX.
- **"CoreFX: FXRT could not start"** (Legacy only) — Ray Tracing is set to FXRT, but it could not run on this PC, so the game's own lighting is in use. The notice says why. FXRT needs hardware ray tracing and an up-to-date driver. Set Ray Tracing to Vanilla to remove it.
- **"CoreFX: DLSS Frame Generation conflicts with HDR"** (Enhanced only) — CoreFX HDR and DLSS Frame Generation are both on, so the picture stops updating. Install RenoDX's [DLSS fix addon](https://github.com/clshortfuse/renodx/releases/download/snapshot/renodx-dlssfix.addon64) beside the game executable, or turn one of the two off: Frame Generation in the game's graphics settings, or HDR Mode in the CoreFX Addon (then restart).
- **"CoreFX: ray tracing is partly running on the game's own shaders"** (Enhanced only) — FXPT is on, but CoreFX has no version of some shaders the game is using, on a graphics card or in-game ray tracing setting it does not support yet. Those parts run as the game's own. Set Ray Tracing to Vanilla to remove it.

CoreFX has a few more notices: another ReShade, weather files that are not CoreFX's, a camera it cannot read, the game's MSAA together with its anti-aliasing, and the Singleplayer add-on in FiveM. **Troubleshooting** goes through each of them.

**Hide on-screen warnings** in the **Options** tab silences them permanently, though it is worth fixing the cause first. It changes nothing about how CoreFX renders. The settings warning cannot be hidden, because that toggle lives in the settings that failed to load.
