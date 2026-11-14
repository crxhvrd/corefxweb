---
title: Features
layout: cards
---

What CoreFX does in each game. Most of it is switched and tuned in the **CoreFX Addon** menu (Page Up in game); each card says where. The **Shader Settings** section goes through the menu in detail, and **Prerequisites** lists what each feature needs from your PC.

## Weather and sky

### Weather and timecycles {legacy, enhanced}

CoreFX replaces the game's weather files, so every weather and every hour has its own light, colour and fog. They are made together with CoreFX's shaders, and the two are meant to run as a pair.

### Physically based sky {legacy, enhanced}

The sky is worked out from how sunlight scatters through the air, with a soft glow around the sun and clean, dark nights.

### Volumetric clouds {legacy, enhanced}

Real 3D clouds, raymarched as volumes instead of painted on a flat sky. Sunlight is marched through each cloud, so edges glow and the shaded sides fall away. They cast shadows on the ground, send godrays through the gaps, light up with lightning and show in reflections. Each weather has its own designs, and **Cloud Performance Mode** makes them cheaper.

@where World > Sky

### CloudBuilder {legacy, enhanced}

Our own app for designing clouds, included with CoreFX. Build cloud designs and setups, choose which weather uses what, preview them at any time of day, and install a pack into the game with one click. A running game shows changed setups at once.

@where CoreFX\CloudBuilder\CloudBuilder.exe, then World > Sky > Cloud Pack

## Ray tracing

### FXPT path tracing {enhanced}

CoreFX's own path tracing. Global illumination replaces the game's baked ambient with traced light that keeps bouncing, so buildings pick up the glow of the streets around them. Lamps near the camera cast their own soft ray-traced shadows, and neon signs, lit windows and car lamps light the walls and roads around them. Reflections are path traced with two bounces. Denoising is NRD on any card, DLSS Ray Reconstruction on RTX cards or FSR Ray Regeneration on Radeon RX 9000 cards. **Performance Mode** makes it cheaper. FXPT is for an RTX 5070 Ti or RX 9070 XT, or better.

It follows the same recipe as Cyberpunk 2077’s RT: Overdrive path tracing (ReSTIR, a radiance cache, path-traced reflections, on NVIDIA’s research and tech), as our own implementation inside GTA V’s renderer. Not affiliated with CD Projekt Red or NVIDIA.

@where Ray Tracing > Ray Tracing: FXPT

### Denoisers for the game’s own ray tracing {enhanced}

You don't need FXPT for cleaner ray tracing. With Ray Tracing on Vanilla the rays stay the game's own, but NRD, DLSS Ray Reconstruction or FSR Ray Regeneration can take over from its denoisers, so reflections keep their shape instead of blurring away.

@where Ray Tracing > Denoiser

### FXRT ray tracing {legacy}

Real ray tracing for a game that never had it, run against the actual scene geometry rather than what is on screen. Sun shadows, ambient occlusion, global illumination, lamp shadows and reflections on glossy surfaces are each traced and each has its own switch. NRD does the denoising, and **Performance Mode** makes it cheaper at a small cost in detail. FXRT needs a card with hardware ray tracing: NVIDIA RTX, or Radeon RX 6000 and newer.

@where Ray Tracing > Ray Tracing: FXRT

## Anti-aliasing, upscaling and frame rate

### TAA, DLSS, FSR and XeSS {legacy}

Modern anti-aliasing for Legacy: our own TAA on any card, NVIDIA DLSS, AMD FSR 3.1 and Intel XeSS. At full resolution DLSS, FSR and XeSS anti-alias the image (DLAA, FSR Native AA, XeSS Native AA); with the game's Frame Scaling below 1.000 they upscale. Foliage and other fine detail stop breaking up into jagged pixels. On Enhanced, anti-aliasing and upscaling stay in the game's own settings.

@where Image > Anti-Aliasing

### Frame generation and low latency {legacy}

A generated frame between each two the game renders: AMD FSR, Intel XeSS with XeLL, or NVIDIA DLSS on RTX 40 series and newer (up to four frames shown per rendered one on RTX 50). **Low Latency** turns on NVIDIA Reflex or AMD Anti-Lag 2 for less input lag. On Enhanced, frame generation is the game's own setting.

@where Image > Frame Generation, Low Latency

## Effects

### Volumetric smoke {legacy, enhanced}

A real-time simulation replaces the game's flat smoke sprites near the camera. Smoke billows, rises, drifts with the wind, goes round the car and is lit through its own depth, and burnouts leave smoke that piles up around the car. **All Smoke** also takes over exhaust, flares, smoke grenades, explosions, fires, dust and splashes. It only costs GPU time while there is smoke, and it is off by default.

@where World > Volumetric Smoke

### Screen-space reflections {legacy, enhanced}

Water, puddles, vehicles and every other reflective surface reflect what is actually on screen, not just the game's blurry reflection map: sharp on glossy surfaces, softer on rough ones. On Enhanced they run while the game's ray-traced reflections are off. Legacy adds **Wet Surfaces**: darker, glossier roads in the rain.

@where Image > Reflections

### Motion blur {legacy, enhanced}

A dedicated wheel blur follows each wheel's rotation, so at speed it reads as a spinning disc instead of a frozen rim. On Legacy, cars and people blur with their own movement, not just the camera's. On Enhanced the blur runs at full resolution.

@where Image > Motion Blur, Vehicles & Peds > Wheel Motion Blur

### Contact shadows {legacy, enhanced}

**Detail Shadows** add the small shadows the game's shadow map misses, under cars and where objects meet walls and floors. **Sun Contact Shadows** do the same for small objects and surface detail in direct sunlight.

@where Lighting > Contact Shadows

### Lens and camera {legacy, enhanced}

Raindrops on the lens, as realistic droplets or big out-of-focus discs; lens ghosts and a halo ring around bright lights in the bloom; procedural coronas around lamps.

@where World > Screen Raindrops, Lighting > Bloom, Corona

### Road detail {legacy, enhanced}

Roads get extra fine detail, parallax relief, gloss variation and cleaner colour. The optional **Classic Roads** in the installer swap in cleaner asphalt textures.

@where World > Texture Detail

## Vehicles and city lights

### Vehicle paint {legacy, enhanced}

**Vehicle Paint RGB Fixes** make paint come out as the colour you picked, instead of the game's far brighter version. Paint also gets metallic flake sparkle and a subtle orange-peel clearcoat, and rain beads on cars, people and weapons.

@where Vehicles & Peds

### Vehicle lights {legacy, enhanced}

One brightness for every glowing part of a car, plus its own slider for headlights, taillights, indicators, brake lights, reverse lights, full beam, signs and sirens.

@where Vehicles & Peds > Vehicle Emissives

### Streetlights {legacy, enhanced}

Recolour the orange sodium streetlights and the light shafts and fog they light, with three colour bands to set the mix across the city. **Streetlight Specular** leaves a streak of each lamp on the road, sharper when it is wet (on Enhanced it needs FXPT).

@where Lighting > Streetlights

## Display and menu

### HDR {legacy, enhanced}

CoreFX can upgrade the game to an HDR10 (PQ / BT.2020) output, with its own tone mapping and colour grading. It is off by default and needs a restart after switching it on.

@where HDR > HDR Mode

### The CoreFX Addon menu {legacy, enhanced}

Every setting lives in one window inside the ReShade overlay, with tabs, a search box and your ReShade theme's colours. Each setting shows a performance cost (Free, Low, Medium, High, Extreme, or Saves for the ones that make the game faster), and **Options > Video Memory** shows how much video memory the game is using right now.

@where Page Up in game
