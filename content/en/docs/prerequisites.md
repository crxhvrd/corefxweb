---
title: Prerequisites
layout: sections
---

Before installing and using CoreFX, please ensure your system meets these requirements.

> [!WARNING] Mixing CoreFX with other graphics mods is not recommended and can potentially break your game. Please note that ENBSeries is no longer supported by its developer or by CoreFX. By using CoreFX you automatically agree with these rules.

## Legacy Hardware Requirements

- Minimum: NVIDIA GeForce RTX 2060 Super or AMD Radeon RX 5700
- Recommended: NVIDIA GeForce RTX 3070 or AMD Radeon RX 6700 XT
- FXRT (ray tracing): a graphics card with hardware ray tracing, NVIDIA RTX or AMD Radeon RX 6000 and newer, and an up-to-date driver.
- DLSS: an NVIDIA RTX card. FSR and XeSS: Windows 11 and a Direct3D 12 card. DLSS Frame Generation: RTX 40 series or newer.

## Enhanced Hardware Requirements

- Ray Tracing Minimum: NVIDIA GeForce RTX 3060 or AMD Radeon RX 6600 XT
- Ray Tracing Recommended: NVIDIA GeForce RTX 4060 Ti or AMD Radeon RX 7700 XT
- FXPT (path tracing): NVIDIA GeForce RTX 5070 Ti or AMD Radeon RX 9070 XT, or better.

## HDR (Optional, Legacy & Enhanced)

- An HDR-capable display with "Use HDR" enabled in Windows Display settings. CoreFX upgrades the game to an HDR10 (PQ / BT.2020) swapchain.
- HDR is switched on in the **CoreFX Addon** menu (**HDR** tab > **HDR Mode**), not in the game. It is **Off** by default — set it to **On**. **Changing it requires a game restart.**
- **Enhanced only:** in-game HDR must be **off** and **DLSS enabled**. CoreFX HDR and **DLSS Frame Generation** cannot both run — Frame Generation presents its own frames without passing through the HDR conversion, so the picture stops updating. Turn one of the two off, or install RenoDX's [DLSS fix addon](https://github.com/clshortfuse/renodx/releases/download/snapshot/renodx-dlssfix.addon64) beside the game executable.

## Software

- Base Game: A legitimate copy of Grand Theft Auto V.
- **RageOpenV.asi (Recommended, Legacy & Enhanced Singleplayer):** A modern replacement for both OpenIV.asi and OpenRPF.asi. Required to load mods from the `mods` folder. (Download from [GTA5-Mods](https://www.gta5-mods.com/scripts/rageopenv))
- OpenIV.asi (Legacy Singleplayer, Legacy Alternative): Loads mods from the `mods` folder. Comes with the [OpenIV app](https://openiv.com/), can be installed inside OpenIV > ASI Manager. Superseded by RageOpenV.asi.
- OpenRPF.asi (Enhanced Singleplayer, Legacy Alternative): Loads mods from the `mods` folder. (Download from [GTA5-Mods](https://www.gta5-mods.com/tools/openrpf-openiv-asi-for-gta-v-enhanced)). Superseded by RageOpenV.asi.
- ScriptHookV & Asi Loader (Legacy & Enhanced Singleplayer): Necessary for proper script loading. (Download from [dev-c.com](https://www.dev-c.com/gtav/scripthookv/)). Legacy ASI Loader is `dinput8.dll`, Enhanced ASI Loader is `xinput1_4.dll`.
- **CoreFX Package Installer:** Bundled with both Singleplayer archives and launched for you by `Install.bat` — you do not download or run it separately. It installs the `.oivs` package directly, with no OpenIV app required. (Project page: [GTA5-Mods](https://www.gta5-mods.com/tools/oiv-package-installer))
- **Note for Legacy FiveM:** that package has no installer. It is copied into place by hand — see the Legacy FiveM installation guide.

## Required In-Game Settings

- **Shader Quality** and **Post FX** must be set to **Ultra (maximum)** in the in-game Graphics settings. This is required for the CoreFX shaders to load — at lower settings the game uses different shader variants that CoreFX does not replace, so the mod will look incorrect.
- If CoreFX's shaders are not drawing, it shows an on-screen warning — *"CoreFX: shaders not running"*. In the main menu or on a loading screen this is normal. If it stays while you play, see **Shader Settings > On-screen warnings**.
- **Legacy only:** Shader Quality has to be High or Very High, and Stereo 3D has to be off.

## Optional

- FiveM (Multiplayer): CoreFX supports multiplayer platforms.
- Microsoft Visual C++ Redistributable 14.40 or newer (x64): needed for Intel XeSS on Legacy. Most PCs have it already. (Download from [Microsoft](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist))
- Graphics Driver Updates: Keep your GPU drivers up to date.

## Licence

- Every CoreFX archive ships with `LICENSE.md` (the CoreFX end user licence, version 2.1) and `THIRD-PARTY-NOTICES.md`. Installing or using CoreFX means accepting those terms — worth a read before you start. Both are on this site: the [licence](/license) and the [third-party notices](/third-party-notices).
- CoreFX is distributed only through the CoreFX Patreon page and links published at [corefx.me](https://corefx.me). Copies from anywhere else are not licensed to you.
