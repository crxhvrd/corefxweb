---
title: Troubleshooting
layout: steps
---

Find what you see below. When something goes wrong, CoreFX usually says so itself: an orange notice on screen, or a line in its menu. The quotes on this page are those messages word for word, so you can match them.

Still stuck? Ask on our [Discord](https://discord.gg/jK4SRmBqYt) and bring what **Getting help** at the bottom lists.

## Check these first {open}

1. **Shader Quality** and **Post FX** are at their highest in the game's graphics settings (on Legacy, Shader Quality High or Very High, and Stereo 3D off). At lower settings the game uses shaders CoreFX does not replace.
2. Only CoreFX's ReShade is installed. Remove any other ReShade or ENBSeries files: `d3d11.dll`, `d3d12.dll`, `dxgi.dll`, `dxgi.asi`, `ReShade.asi` that did not come with CoreFX.
3. Your CoreFX is the one made for your game version. A game update can change the game's shaders, and then CoreFX needs its own update.
4. No other graphics mod, weather mod or upscaler mod is installed next to CoreFX.
5. Your graphics driver is up to date.

## Page Up does nothing / no ReShade overlay

- When the game starts, ReShade shows a short banner at the top of the screen. No banner means ReShade did not load: check that its file sits beside `GTA5.exe` (on FiveM, in the `plugins` folder as `dxgi.dll`).
- **Legacy Singleplayer:** rename `d3d12.dll` in the game folder to `dxgi.dll` and start the game again.
- Another tool may be using Page Up. The ReShade overlay's own settings let you change the key.

## The game looks like vanilla, or wrong

- **"CoreFX: shaders not running"** — normal in the main menu and on loading screens. If it stays while you play, check the graphics settings in **Check these first**, then restart the game. If those are right, a game update has most likely changed the game's shaders: update CoreFX.
- **"CoreFX: its weather files are not loaded"** — the weathers in the game are not CoreFX's, so the sky, clouds, light and colours look wrong. In singleplayer, install CoreFX again after any other mod that changes the weather files. In FiveM the weathers come from the server: a server without CoreFX's resource, or with another weather resource, shows this.
- **"CoreFX: this weather is not CoreFX's"** — CoreFX's weathers are loaded, but another mod or FiveM resource replaces some of them, and this is one. It may look wrong until the weather changes.
- **"CoreFX: can't read the game's camera"** (Legacy) — another mod changes how the game renders, most often another upscaler. TAA, DLSS, FSR, XeSS, FXRT, the clouds, smoke and motion blur stay off until you remove it and restart.
- Very dark nights in some weathers: the same graphics settings fix it, and in-game brightness around 40-50 % is where CoreFX is tuned.

## The picture is blurry or soft

- **Legacy:** turn off the game's MSAA, TXAA and FXAA and let CoreFX's Anti-Aliasing do the job. MSAA on top of TAA, DLSS, FSR or XeSS makes the whole picture blurry on some PCs; CoreFX shows a short notice when it sees the two together.
- Raise the **Sharpness** under Anti-Aliasing, or try another DLSS **Preset**.
- If the game's Frame Scaling is below 1.000, the image is upscaled. Texture sharpness for a new Frame Scaling only applies after a restart.
- Don't like motion blur? Image > Motion Blur in the menu (on Enhanced, Motion Blur Strength to 0 or the game's own setting).

## Low frame rate, or it drops and stays down

- Every setting in the menu shows its cost: Free, Low, Medium, High, Extreme, or Saves for the ones that make the game faster. Start with the High and Extreme ones: Ray Tracing (FXRT, FXPT), Volumetric Clouds and Volumetric Smoke.
- Turn on **Performance Mode** in the Ray Tracing tab and **Cloud Performance Mode** in World > Sky.
- **Options > Video Memory** shows how much video memory the game is using. If it says the game is over its budget, the frame rate suffers until memory is freed: lower texture settings or turn features off.
- **Legacy:** keep **Fit Texture Budget to VRAM** on (the default). It stops the game's textures and CoreFX together from overflowing the card, which is what makes the frame rate fall and never recover. On a 4 GB card it means FiveM's Extended Texture Budget slider has no effect.
- **Low Latency** costs frames in this game: about a sixth fewer for about a third less lag. Leave it off if frame rate matters more.
- On Legacy, DLSS, FSR or XeSS with Frame Scaling below 1.000 renders smaller and usually raises the frame rate. Frame generation is best from about 60 fps up.

## DLSS, FSR or XeSS doesn't start (Legacy)

The **Running now** line under Anti-Aliasing says what actually drew the last frame. If the method you picked cannot run, it says why and TAA takes over.
- **DLSS** needs an NVIDIA RTX card and a recent driver.
- **FSR** needs Windows 11 and a card that runs Direct3D 12.
- **XeSS** needs the same, plus the [Microsoft Visual C++ Redistributable](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist) 14.40 or newer (x64).
- Keep the `CoreFX\Libraries` folder the package installs: the DLSS, FSR and XeSS files live there.

## Frame generation doesn't start (Legacy)

- Set the game's **Screen Type** to **Windowed Borderless**. Exclusive fullscreen does not work with it.
- **NVIDIA DLSS** frame generation needs an RTX 40 series card or newer and a recent driver. AMD FSR and Intel XeSS run on any recent card.
- **Intel XeSS** frame generation does not run while RivaTuner Statistics Server (RTSS, also part of MSI Afterburner) is running: its overlay crashes the game over it. Close RTSS, or use AMD FSR frame generation, which works with it.
- It pauses while the menu is open, and it needs the ReShade that comes with CoreFX (see the next item).

## "CoreFX: this is not CoreFX's ReShade"

CoreFX is running inside a ReShade it does not come with, usually one installed by hand or by another mod. Parts of CoreFX need its own build: its ReShade effects do not load, and on Legacy frame generation does not run. Install CoreFX again, or put back the ReShade files it installs, and remove the other ReShade.

## FXRT, FXPT or a denoiser doesn't start

- **"CoreFX: FXRT could not start"** (Legacy) — the notice says why. FXRT needs hardware ray tracing (NVIDIA RTX, or Radeon RX 6000 and newer) and an up-to-date driver. Until then the game's own lighting is used; set Ray Tracing to Vanilla to remove the notice.
- **FXPT** (Enhanced) needs ray tracing turned on in the game's graphics settings.
- **Ray Reconstruction** needs an RTX card and DLSS selected in the game's graphics settings. **FSR Ray Regeneration** needs a Radeon RX 9000 card on Windows 11. If either cannot start, NRD denoises instead until the game restarts, and the menu says so.
- **"CoreFX: ray tracing is partly running on the game's own shaders"** (Enhanced) — FXPT is on, but your graphics card or in-game ray tracing setting uses some shaders CoreFX has no version of yet. Those parts run as the game's own. Set Ray Tracing to Vanilla to remove it.

## HDR doesn't turn on, or the picture freezes

- Turn on Windows "Use HDR" for the display the game is on, set **HDR Mode** to **On** in the HDR tab, and **restart the game**. The tab says whether HDR is active this session.
- **Enhanced:** in-game HDR must be off and DLSS on.
- **"CoreFX: DLSS Frame Generation conflicts with HDR"** (Enhanced) — with both on, the picture stops updating. Install RenoDX's [DLSS fix addon](https://github.com/clshortfuse/renodx/releases/download/snapshot/renodx-dlssfix.addon64) beside the game executable, or turn one of the two off.

## FiveM

- **"CoreFX: the Singleplayer edition does not run in FiveM"** — the Legacy Singleplayer add-on is in your FiveM `plugins` folder. It stays off there. Install the Legacy FiveM package instead.
- **"ReShade Blocked"** — press **F8** in FiveM's main menu and find the line starting with `script:reshade Blocked load of ReShade version 5 or higher`, with an ID after it. Open `CitizenFX.ini` in your FiveM Application Data folder and add, with your ID in place of `ID:XXXXXX`:

```
[Addons]
ReShade5=ID:XXXXXX acknowledged that ReShade 5.x has a bug that will lead to game crashes
```

- Servers with **Pure Mode** enforced do not allow CoreFX.
- Old CoreFX builds put shaders in `FiveM.app\citizen\common\shaders\win32_40_final`. Remove them before you install this one.

## The game crashes

- Take out everything else first: other ReShade or ENB files, other graphics or upscaler mods, ASI mods that may not be updated for your game version (ScriptHookV and trainers break after game updates). Then add them back one at a time.
- Legacy with Intel XeSS frame generation: close RTSS / MSI Afterburner's overlay (see **Frame generation doesn't start**).
- Turn the High and Extreme features off to see whether one of them is the cause, then bring them back.
- On FiveM, keep the crash report FiveM offers to save, and send it to us with the logs below.

## Settings: reset, empty menu, damaged files

- **Reset all** under the menu's tabs puts every setting back to its default. Your settings are saved in `CoreFX\Presets\CoreFX.ini`; deleting that file does the same.
- **"CoreFX: settings not loaded - no UI settings"** or **"CoreFX: the add-on's shader pack is missing or damaged."** — `CoreFX.addon64` is damaged or incomplete. Install CoreFX again from the package you downloaded from us.
- **Hide on-screen warnings** (Options) silences the notices, but it is worth fixing what they point at first.

## Getting help

Ask on our [Discord](https://discord.gg/jK4SRmBqYt) and include:
- Which game (Legacy or Enhanced), which package (Singleplayer or FiveM) and the CoreFX version.
- Your graphics card, and Windows 10 or 11.
- `ReShade.log` from the session that went wrong: beside `GTA5.exe` in singleplayer, in the FiveM `plugins` folder for FiveM. It is rewritten at every start, so copy it before you launch the game again.
- A screenshot of any orange notice, and of the menu line that mentions the problem.
- What you already tried from this page.
