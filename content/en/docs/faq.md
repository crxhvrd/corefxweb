---
title: Questions people ask
layout: faq
---

The ones that come up most on our Discord. Something broken? Try [Troubleshooting](/docs/troubleshooting) first.

## I don't like blur when moving camera (motion blur). How can I disable it?

For Legacy builds, open the ReShade menu with Page Up, go to the CoreFX Addon window, and turn off Image > Motion Blur (there is also a Blur Intensity slider next to it). For Enhanced builds, turn Motion Blur Strength down in your GTA 5 graphics settings, or set Image > Motion Blur Strength to 0 in the CoreFX Addon window.

## Can I use other mods with CoreFX?

It is possible, but not all mods are compatible. Mods that significantly alter the visuals of the game (like other graphics enhancers or weather overhauls) may conflict with CoreFX. Texture replacement mods are generally safer to combine.

## Is CoreFX compatible with Singleplayer and multiplayer platforms like FiveM?

Yes. However, installation steps differ for each platform — please refer to the Installation section for detailed instructions.

## Where can I find updates and support?

On our Discord: the link is at the top of every page. Updates are posted there first, and in the Dev Blog here.

## In Rockstar Editor, my recorded clips show a blurred screen when moving. What causes this?

This is caused by in-game motion blur. For Legacy builds, disable it in the CoreFX Addon menu under Image > Motion Blur. For Enhanced builds, turn off motion blur in GTA 5 graphics settings. Important: You must record new clips after disabling it; previously recorded clips will remain blurred. If you spend a lot of time in the editor, Rockstar Editor+ (linked as an optional in the installer) adds a spline camera, camera shake, and removes several of the editor’s built-in limits.

## Does CoreFX run on FiveM servers with Pure Mode enabled?

Pure Mode restricts custom client modifications. Currently, CoreFX does not have permission to run under enforced Pure Mode.

## How do I open the CoreFX shader menu?

Press Page Up in-game to open the ReShade overlay, then find the CoreFX Addon window inside it — that is where every CoreFX setting lives. Page Down toggles the ReShade effects on and off. This is the same on all builds.

## Does CoreFX support HDR?

Yes, on both Legacy and Enhanced. Turn on "Use HDR" in Windows for your display, then open the CoreFX Addon menu, go to the HDR tab and set HDR Mode to On (it is Off by default). It takes effect on the next game launch, because the swapchain has to be upgraded before the game creates its device. Once HDR is active, the tone mapping and colour grading settings in the same tab take effect. On Enhanced, in-game HDR must be off, DLSS must be on, and DLSS Frame Generation cannot be used at the same time.

## I see an orange "CoreFX: shaders not running" message on screen. What does it mean?

CoreFX is loaded, but the game is not drawing with its shaders. In the main menu or on a loading screen this is normal. If it stays while you play on Legacy, check that Shader Quality is High or Very High and Stereo 3D is off, then restart the game. If those are right, or you are on Enhanced, a game update has most likely changed the game's shaders, so update CoreFX to the version made for your game. If you want it gone permanently, the CoreFX Addon menu has a "Hide on-screen warnings" toggle under Options.

## What are FXPT and FXRT?

FXPT is CoreFX's own path tracing for GTA V Enhanced: path-traced reflections, global illumination, and lamps and glowing surfaces that light the scene. FXRT is CoreFX's ray tracing for GTA V Legacy: ray-traced sun shadows, ambient occlusion, global illumination, lamp shadows and reflections, each with its own switch. Both are picked in the Ray Tracing tab of the CoreFX Addon window, and both are off by default. See Shader Settings for what each needs.

FXPT follows the same recipe as Cyberpunk 2077’s RT: Overdrive path tracing, built on NVIDIA’s research and tech, as our own implementation inside GTA V’s renderer. It is not affiliated with CD Projekt Red or NVIDIA.

## How do I use DLSS, FSR or XeSS on Legacy?

Open the Image tab of the CoreFX Addon window and set Anti-Aliasing to DLSS, FSR or XeSS. At the game's Frame Scaling 1.000 they anti-alias at full size; below it they upscale. Turn off the game's TXAA and FXAA, and turn MSAA off to upscale. The Running now line in that card shows what is actually drawing the frame.

## Does Legacy have frame generation?

Yes: AMD FSR, Intel XeSS or NVIDIA DLSS (RTX 40 series and newer), under Image > Frame Generation in the CoreFX Addon window. Set the game's Screen Type to Windowed Borderless. Low Latency next to it turns on NVIDIA Reflex or AMD Anti-Lag 2. On Enhanced, frame generation is in the game's own graphics settings.

## Something is wrong. Where do I start?

The Troubleshooting section of these docs is sorted by what you see, and it explains every on-screen CoreFX notice. If that does not fix it, ask on our Discord with your ReShade.log.

## Can I change the clouds?

Yes. CloudBuilder comes with CoreFX, in the CoreFX\CloudBuilder folder. Make your own clouds there, install them into the game with one click, and pick them under World > Sky > Cloud Pack in the CoreFX Addon window.
