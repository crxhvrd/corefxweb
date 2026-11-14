---
title: Enhanced Singleplayer
layout: steps
---

## Prerequisites

1. Download and install [**ScriptHookV & Asi Loader**](https://www.dev-c.com/gtav/scripthookv/) compatible with GTA V Enhanced (use `xinput1_4.dll`). For the mods folder loader, install [**RageOpenV.asi**](https://www.gta5-mods.com/scripts/rageopenv) (recommended) — or, as a legacy alternative, [**OpenRPF.asi**](https://www.gta5-mods.com/tools/openrpf-openiv-asi-for-gta-v-enhanced).
2. Add **-noBattlEye** to your game launcher's parameters.

## Installing CoreFX {open}

1. Extract the downloaded package.
2. **Important:** Before installing, remove any old ENBSeries or ReShade files from your GTA V Enhanced game directory to avoid compatibility issues. These files may be named `d3d11.dll`, `d3d12.dll`, `dxgi.dll`, `dxgi.asi`, or `ReShade.asi`.
3. Open the `CoreFX` folder and run `Install.bat`. The **CoreFX Package Installer** opens with CoreFX already loaded.
4. Click **Install**. A selection window opens where you choose what to install. The **base mod** and the **CoreFX shaders** (ReShade plus the **CoreFX Addon**) are always included.
5. Tick any optional add-ons you want:
   - **Classic Roads** — cleaner, classic asphalt road surfaces.
   - **Sun Lens Flare** — pick **Star**, **Wide**, or none, with before/after previews.
   - **Simple Camera** and **Rockstar Editor+** — these are **not installed** by the package. They are updated far more often than CoreFX itself, so ticking them simply opens their official download page when the install finishes. Both need ScriptHookV.
6. If prompted, select your GTA 5 Enhanced folder. The base mod and your optionals install into the `mods` folder; ReShade, `CoreFX.addon64` and the `CoreFX` folder go beside the game executable.

> [!WARNING] **Critically Important:** You **MUST** set **Shader Quality** and **Post FX** to **Ultra** in your in-game graphics settings. This is required to load the custom CoreFX shaders.

7. Set in-game brightness to approximately 40-50 %.
8. In-game, press **Page Up** to open the ReShade menu, then open the **CoreFX Addon** window. It has a full UI to toggle and fine-tune individual effects, including ray tracing, clouds, vehicles and ambient occlusion — see the **Shader Settings** section for the full list.
9. Press **Page Down** to toggle the ReShade shaders on or off.
10. **Optional — HDR:** in the **HDR** tab of the menu, set **HDR Mode** to **On** (it is **Off** by default), make sure Windows "Use HDR" is on, and restart the game. Enhanced also needs in-game HDR turned **off** and **DLSS enabled**, and it cannot run alongside **DLSS Frame Generation**. See **Prerequisites > HDR** for the details.

## Updating from an older CoreFX

1. To keep your menu settings, copy `CoreFX\Presets\CoreFX.ini` from your GTA V Enhanced folder somewhere safe first.
2. Remove the old version: run `Uninstall.bat` and choose **Revert to Backup** for CoreFX, as in **Uninstalling CoreFX** below.
3. Install the new package as in **Installing CoreFX**.
4. Put `CoreFX.ini` back in `CoreFX\Presets`. Settings the new version adds start at their defaults.
5. Check the in-game graphics settings again afterwards: a game update can reset them.

## Check that it works

1. When the game starts, ReShade shows a short banner at the top of the screen.
2. **Page Up** opens the ReShade overlay with the **CoreFX Addon** window in it.
3. Once you are in the game world, no orange *CoreFX:* notice stays on screen. If one does, the **Troubleshooting** section explains it.
4. With HDR on, the HDR tab says **HDR is ACTIVE**.

## Uninstalling CoreFX

1. Run `Uninstall.bat` in the `CoreFX` folder. The installer opens straight to **Manage Mods** — select **CoreFX** and choose **Revert to Backup** (or **Reset to Vanilla**). This removes the base mod, the shaders, and any optionals you installed.
