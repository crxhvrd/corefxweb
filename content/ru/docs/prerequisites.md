---
title: Требования
layout: sections
---

Прежде чем устанавливать и использовать CoreFX, убедитесь, что ваша система соответствует этим требованиям.

> [!WARNING] Совмещать CoreFX с другими графическими модами не рекомендуется — это может сломать игру. Обратите внимание: ENBSeries больше не поддерживается ни его разработчиком, ни CoreFX. Используя CoreFX, вы автоматически соглашаетесь с этими правилами.

## Требования к оборудованию для Legacy

- Минимум: NVIDIA GeForce RTX 2060 Super или AMD Radeon RX 5700
- Рекомендуется: NVIDIA GeForce RTX 3070 или AMD Radeon RX 6700 XT
- FXRT (трассировка лучей): видеокарта с аппаратной трассировкой лучей — NVIDIA RTX или AMD Radeon RX 6000 и новее — и актуальный драйвер.
- DLSS: видеокарта NVIDIA RTX. FSR и XeSS: Windows 11 и видеокарта с Direct3D 12. DLSS Frame Generation: RTX 40-й серии или новее.

## Требования к оборудованию для Enhanced

- Минимум для трассировки лучей: NVIDIA GeForce RTX 3060 или AMD Radeon RX 6600 XT
- Рекомендуется для трассировки лучей: NVIDIA GeForce RTX 4060 Ti или AMD Radeon RX 7700 XT
- FXPT (трассировка путей): NVIDIA GeForce RTX 5070 Ti или AMD Radeon RX 9070 XT либо мощнее.

## HDR (необязательно, Legacy и Enhanced)

- Дисплей с поддержкой HDR и включённым «Use HDR» в настройках дисплея Windows. CoreFX переводит игру на swapchain HDR10 (PQ / BT.2020).
- HDR включается в меню **CoreFX Addon** (вкладка **HDR** > **HDR Mode**), а не в игре. По умолчанию он **Off** — включите **On**. **После изменения нужно перезапустить игру.**
- **Только Enhanced:** HDR в игре должен быть **выключен**, а **DLSS — включён**. CoreFX HDR и **DLSS Frame Generation** не могут работать вместе: Frame Generation выводит собственные кадры в обход HDR-преобразования, и изображение перестаёт обновляться. Выключите одно из двух или положите [DLSS fix addon](https://github.com/clshortfuse/renodx/releases/download/snapshot/renodx-dlssfix.addon64) от RenoDX рядом с исполняемым файлом игры.

## Программное обеспечение

- Игра: лицензионная копия Grand Theft Auto V.
- **RageOpenV.asi (рекомендуется, Legacy и Enhanced Singleplayer):** современная замена OpenIV.asi и OpenRPF.asi. Нужен, чтобы загружать моды из папки `mods`. (Скачать на [GTA5-Mods](https://www.gta5-mods.com/scripts/rageopenv))
- OpenIV.asi (Legacy Singleplayer, устаревшая альтернатива): загружает моды из папки `mods`. Идёт вместе с [программой OpenIV](https://openiv.com/), устанавливается в OpenIV > ASI Manager. Его заменил RageOpenV.asi.
- OpenRPF.asi (Enhanced Singleplayer, устаревшая альтернатива): загружает моды из папки `mods`. (Скачать на [GTA5-Mods](https://www.gta5-mods.com/tools/openrpf-openiv-asi-for-gta-v-enhanced).) Его заменил RageOpenV.asi.
- ScriptHookV & Asi Loader (Legacy и Enhanced Singleplayer): нужны для корректной загрузки скриптов. (Скачать на [dev-c.com](https://www.dev-c.com/gtav/scripthookv/).) ASI Loader для Legacy — `dinput8.dll`, для Enhanced — `xinput1_4.dll`.
- **CoreFX Package Installer:** входит в оба Singleplayer-архива и запускается за вас через `Install.bat` — отдельно его не нужно ни скачивать, ни запускать. Он устанавливает пакет `.oivs` напрямую, без программы OpenIV. (Страница проекта: [GTA5-Mods](https://www.gta5-mods.com/tools/oiv-package-installer))
- **Примечание для Legacy FiveM:** у этого пакета нет установщика. Его копируют вручную — см. инструкцию по установке для Legacy FiveM.

## Обязательные настройки игры

- **Shader Quality** и **Post FX** должны стоять на **Ultra (максимум)** в графических настройках игры. Без этого шейдеры CoreFX не загрузятся: на более низких настройках игра использует другие варианты шейдеров, которые CoreFX не заменяет, и мод будет выглядеть неправильно.
- Если шейдеры CoreFX не рисуются, он показывает предупреждение на экране — *"CoreFX: shaders not running"*. В главном меню или на экране загрузки это нормально. Если оно не пропадает во время игры, см. **Настройки шейдеров > On-screen warnings**.
- **Только Legacy:** Shader Quality должен быть High или Very High, а Stereo 3D — выключен.

## Необязательно

- FiveM (мультиплеер): CoreFX поддерживает мультиплеерные платформы.
- Microsoft Visual C++ Redistributable 14.40 или новее (x64): нужен для Intel XeSS в Legacy. На большинстве ПК он уже есть. (Скачать с сайта [Microsoft](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist))
- Обновления драйверов: держите драйверы видеокарты актуальными.

## Лицензия

- Каждый архив CoreFX содержит `LICENSE.md` (лицензию конечного пользователя CoreFX, версия 2.1) и `THIRD-PARTY-NOTICES.md`. Устанавливая или используя CoreFX, вы принимаете эти условия — стоит прочитать их перед началом. Оба документа есть на этом сайте на английском: [лицензия](/license) и [сторонние компоненты](/third-party-notices).
- CoreFX распространяется только через страницу CoreFX на Patreon и ссылки, опубликованные на [corefx.me](https://corefx.me). Копии из любых других источников вам не лицензированы.
