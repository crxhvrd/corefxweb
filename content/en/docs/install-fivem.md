---
title: Legacy FiveM
layout: steps
---

> [!NOTE]
> **This build requires the $5 Patreon tier.** There is no installer — the package is copied into place by hand, and it has to go to **two** locations.

## Prerequisites

1. **Important:** If you have installed older builds of CoreFX before, you must remove all shaders from the `FiveM.app\citizen\common\shaders\win32_40_final` folder.
2. Remove any old ENBSeries or ReShade files from your FiveM `plugins` folder *and* your GTA V root folder. These may be named `d3d11.dll`, `d3d12.dll`, `dxgi.dll`, `dxgi.asi`, or `ReShade.asi`. CoreFX ships its own ReShade build, in the `plugins` folder only. The `d3d12.dll` of CoreFX Singleplayer can stay if you play that on the same game.

## What's in the package

Once extracted, the `CoreFX` folder contains two folders named after where their contents go. Nothing is automated — you copy each one to its matching destination.
- `FiveM Application Data\`
   - `mods\aa_corefxPack.rpf` — the base mod. Required.
   - `mods\ao_corefxRoads.rpf` — **Classic Roads, optional.** Skip this file if you do not want the road textures; it is by far the largest file in the package.
   - `plugins\` — `dxgi.dll`, `CoreFX.addon64`, `CoreFX\`, `reshade-shaders\` and `ReShade.ini`.
- `GTA 5 Root Folder\` — the same files without ReShade's `dxgi.dll`, for your actual GTA V install folder.

## Installing CoreFX {open}

1. Extract the downloaded package.
2. Copy the contents of `CoreFX\FiveM Application Data\` into your **FiveM Application Data** folder, so that `mods\` and `plugins\` merge with the ones already there. (Leave out `ao_corefxRoads.rpf` if you do not want Classic Roads.)
3. Copy the contents of `CoreFX\GTA 5 Root Folder\` into your **GTA V root folder** — the one containing `GTA5.exe`.

> [!WARNING] **Both copies are required.** The FiveM `plugins` folder gets everything, ReShade's `dxgi.dll` included. The GTA V root folder gets everything except that DLL.

4. Launch FiveM and set in-game brightness to approximately 40-50 %.

> [!WARNING] It is really important to have DirectX 11 enabled and PostFX and Shader quality set to Ultra in ingame settings to prevent visual bugs and to enable new shader features. This will also fix super dark nights on certain weathers because of how CoreFX interacts with shaders.

5. In-game, press **Page Up** to open the ReShade menu, then open the **CoreFX Addon** window — that is where every CoreFX setting lives. Press **Page Down** to toggle the ReShade effects on or off. See the **Shader Settings** section for what the menu contains.

## Updating from an older CoreFX

1. To keep your menu settings, copy `plugins\CoreFX\Presets\CoreFX.ini` somewhere safe first.
2. Remove the old version as in **Uninstalling CoreFX** below, from both the FiveM folders and the GTA V root folder.
3. Copy the new package into place as in **Installing CoreFX**. Copying over the old files can leave ones the new version no longer uses.
4. Put `CoreFX.ini` back in `plugins\CoreFX\Presets`. Settings the new version adds start at their defaults.

## Check that it works

1. When the game starts, ReShade shows a short banner at the top of the screen.
2. **Page Up** opens the ReShade overlay with the **CoreFX Addon** window in it.
3. Once you are in the game world, no orange *CoreFX:* notice stays on screen. If one does, the **Troubleshooting** section explains it.
4. Image > Anti-Aliasing: the **Running now** line says what draws the frame. With FXRT on, the Ray Tracing tab shows no FXRT notice.
5. With HDR on, the HDR tab says **HDR is ACTIVE**.
6. In FiveM, check on a server you know runs without its own weather resource: a server's weather files can replace CoreFX's.

## Uninstalling CoreFX

1. Delete `aa_corefxPack.rpf` and `ao_corefxRoads.rpf` from the `mods` folder in your FiveM Application Data directory.
2. Delete the files you copied into the FiveM `plugins` folder — `dxgi.dll`, `CoreFX.addon64`, `ReShade.ini`, and the `CoreFX` and `reshade-shaders` folders.
3. Delete `CoreFX.addon64`, `ReShade.ini`, and the `CoreFX` and `reshade-shaders` folders from your GTA V root folder too, unless you also use CoreFX Singleplayer there.
4. Restart FiveM.

## Troubleshooting

- **"ReShade Blocked" error**
   - If FiveM crashes or blocks ReShade (version 5+), press **F8** in the FiveM main menu to check the log.
   - Look for an error message starting with `script:reshade Blocked load of ReShade version 5 or higher...` followed by a specific ID.
   - Open `CitizenFX.ini` in your FiveM Application Data folder.
   - Add the following section at the end of the file, replacing `ID:XXXXXX` with the exact ID from your log:

```
[Addons]
ReShade5=ID:XXXXXX acknowledged that ReShade 5.x has a bug that will lead to game crashes
```
