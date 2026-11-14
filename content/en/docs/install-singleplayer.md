---
title: Legacy Singleplayer
layout: steps
---

## Prerequisites

1. Download and install [**ScriptHookV & Asi Loader**](https://www.dev-c.com/gtav/scripthookv/) compatible with GTA V Legacy (use `dinput8.dll`). For the mods folder loader, install [**RageOpenV.asi**](https://www.gta5-mods.com/scripts/rageopenv) (recommended) — or, as a legacy alternative, **OpenIV.asi** via the [OpenIV app](https://openiv.com/) (OpenIV > ASI Manager).
2. Add `-noBattlEye` to your game launcher's parameters.
3. **Important:** Remove any old ENBSeries or ReShade files from your GTA V root directory first. These may be named `d3d11.dll`, `d3d12.dll`, `dxgi.dll`, `dxgi.asi`, or `ReShade.asi`. CoreFX installs its own ReShade build and two copies will conflict.

## Installing CoreFX {open}

1. Extract the downloaded package.
2. Open the `CoreFX` folder and run `Install.bat`. The **CoreFX Package Installer** opens with CoreFX already loaded.
3. Click **Install**. A selection window opens where you choose what to install. The **base mod** and the **CoreFX shaders** (ReShade plus the **CoreFX Addon**) are always included.
4. Tick any optional add-ons you want:
   - **Classic Roads** — cleaner, classic asphalt road surfaces.
   - **Sun Lens Flare** — pick **Star**, **Wide**, or none, with before/after previews.
   - **Simple Camera** and **Rockstar Editor+** — these are **not installed** by the package. They are updated far more often than CoreFX itself, so ticking them simply opens their official download page when the install finishes. Both need ScriptHookV.
5. If prompted, select your GTA 5 Legacy folder. The base mod and your optionals install into the `mods` folder; ReShade, `CoreFX.addon64` and the `CoreFX` folder go beside the game executable.

> [!WARNING] It is really important to have DirectX 11 enabled and PostFX and Shader quality set to Ultra in ingame settings to prevent visual bugs and to enable new shader features. This will also fix super dark nights on certain weathers because of how CoreFX interacts with shaders.

6. Launch GTA V and set in-game brightness to approximately 40-50 %.
7. In-game, press **Page Up** to open the ReShade menu, then open the **CoreFX Addon** window — that is where every CoreFX setting lives. Press **Page Down** to toggle the ReShade effects on or off. See the **Shader Settings** section for what the menu contains.
8. If nothing happens when you press **Page Up**, rename `d3d12.dll` in your game directory to `dxgi.dll`, then relaunch the game.

## Updating from an older CoreFX

1. To keep your menu settings, copy `CoreFX\Presets\CoreFX.ini` from your GTA V Legacy folder somewhere safe first.
2. Remove the old version: run `Uninstall.bat` and choose **Revert to Backup** for CoreFX, as in **Uninstalling CoreFX** below.
3. Install the new package as in **Installing CoreFX**.
4. Put `CoreFX.ini` back in `CoreFX\Presets`. Settings the new version adds start at their defaults.
5. Check the in-game graphics settings again afterwards: a game update can reset them.

## Check that it works

1. When the game starts, ReShade shows a short banner at the top of the screen.
2. **Page Up** opens the ReShade overlay with the **CoreFX Addon** window in it.
3. Once you are in the game world, no orange *CoreFX:* notice stays on screen. If one does, the **Troubleshooting** section explains it.
4. Image > Anti-Aliasing: the **Running now** line says what draws the frame. With FXRT on, the Ray Tracing tab shows no FXRT notice.
5. With HDR on, the HDR tab says **HDR is ACTIVE**.

## Uninstalling CoreFX

1. Run `Uninstall.bat` in the `CoreFX` folder. The installer opens straight to **Manage Mods** — select **CoreFX** and choose **Revert to Backup** (or **Reset to Vanilla**). This removes the base mod, the shaders, and any optionals you installed.
