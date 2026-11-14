---
title: Legacy FiveM
layout: steps
---

> [!NOTE] **Ця збірка потребує рівня $5 на Patreon.** Встановлювача немає — пакет копіюють вручну, і його потрібно скопіювати в **два** місця.

## Підготовка

1. **Важливо:** якщо раніше ви встановлювали старіші збірки CoreFX, видаліть усі шейдери з папки `FiveM.app\citizen\common\shaders\win32_40_final`.
2. Видаліть старі файли ENBSeries чи ReShade з папки FiveM `plugins` *і* з кореневої папки GTA V. Вони можуть називатися `d3d11.dll`, `d3d12.dll`, `dxgi.dll`, `dxgi.asi` або `ReShade.asi`. CoreFX постачає власну збірку ReShade — лише в папці `plugins`. `d3d12.dll` від CoreFX Singleplayer можна залишити, якщо ви граєте в нього на тій самій копії гри.

## Що в пакеті

Після розпакування папка `CoreFX` містить дві папки, названі за місцем, куди йде їхній вміст. Нічого не автоматизовано — кожну ви копіюєте у відповідне місце.
- `FiveM Application Data\`
   - `mods\aa_corefxPack.rpf` — base mod. Обов’язковий.
   - `mods\ao_corefxRoads.rpf` — **Classic Roads, необов’язково.** Пропустіть цей файл, якщо не хочете текстури доріг; це найбільший файл у пакеті.
   - `plugins\` — `dxgi.dll`, `CoreFX.addon64`, `CoreFX\`, `reshade-shaders\` і `ReShade.ini`.
- `GTA 5 Root Folder\` — ті самі файли без `dxgi.dll` від ReShade, для вашої справжньої папки GTA V.

## Встановлення CoreFX {open}

1. Розпакуйте завантажений архів.
2. Скопіюйте вміст `CoreFX\FiveM Application Data\` у вашу папку **FiveM Application Data**, щоб `mods\` і `plugins\` злилися з уже наявними. (Пропустіть `ao_corefxRoads.rpf`, якщо не хочете Classic Roads.)
3. Скопіюйте вміст `CoreFX\GTA 5 Root Folder\` у **кореневу папку GTA V** — ту, де лежить `GTA5.exe`.

> [!WARNING] **Потрібні обидві копії.** Папка FiveM `plugins` отримує все, включно з `dxgi.dll` від ReShade. Коренева папка GTA V отримує все, крім цього DLL.

4. Запустіть FiveM і виставте яскравість у грі приблизно на 40–50 %.

> [!WARNING] Дуже важливо, щоб у грі був увімкнений DirectX 11, а PostFX і Shader quality стояли на Ultra — це запобігає візуальним помилкам і вмикає нові можливості шейдерів. Це також виправляє надто темні ночі в деяких погодах, через те як CoreFX працює з шейдерами.

5. У грі натисніть **Page Up**, щоб відкрити меню ReShade, і відкрийте вікно **CoreFX Addon** — там усі налаштування CoreFX. **Page Down** вмикає й вимикає ефекти ReShade. Що є в меню, описано в розділі **Налаштування шейдерів**.

## Оновлення зі старішої версії CoreFX

1. Щоб зберегти налаштування меню, спершу скопіюйте `plugins\CoreFX\Presets\CoreFX.ini` в безпечне місце.
2. Видаліть стару версію, як у розділі **Видалення CoreFX** нижче, — і з папок FiveM, і з кореневої папки GTA V.
3. Скопіюйте новий пакет, як у розділі **Встановлення CoreFX**. Копіювання поверх старих файлів може залишити ті, які нова версія вже не використовує.
4. Поверніть `CoreFX.ini` до `plugins\CoreFX\Presets`. Налаштування, які додала нова версія, почнуть зі значень за замовчуванням.

## Перевірка, що все працює

1. Під час запуску гри ReShade показує коротку смугу вгорі екрана.
2. **Page Up** відкриває оверлей ReShade з вікном **CoreFX Addon**.
3. Коли ви вже у світі гри, на екрані не лишається помаранчевих повідомлень *CoreFX:*. Якщо лишається — розділ **Вирішення проблем** пояснює, що воно означає.
4. Image > Anti-Aliasing: рядок **Running now** показує, що малює кадр. З увімкненим FXRT на вкладці Ray Tracing немає повідомлення про FXRT.
5. З увімкненим HDR вкладка HDR пише **HDR is ACTIVE**.
6. У FiveM перевіряйте на сервері, який точно працює без власного ресурсу погоди: файли погоди сервера можуть замінити файли CoreFX.

## Видалення CoreFX

1. Видаліть `aa_corefxPack.rpf` і `ao_corefxRoads.rpf` з папки `mods` у вашій папці FiveM Application Data.
2. Видаліть файли, які ви скопіювали в папку FiveM `plugins`: `dxgi.dll`, `CoreFX.addon64`, `ReShade.ini`, а також папки `CoreFX` і `reshade-shaders`.
3. Видаліть `CoreFX.addon64`, `ReShade.ini` та папки `CoreFX` і `reshade-shaders` і з кореневої папки GTA V, якщо ви не використовуєте там CoreFX Singleplayer.
4. Перезапустіть FiveM.

## Вирішення проблем

- **Помилка "ReShade Blocked"**
   - Якщо FiveM вилітає або блокує ReShade (версії 5+), натисніть **F8** у головному меню FiveM, щоб переглянути журнал.
   - Знайдіть повідомлення, що починається з `script:reshade Blocked load of ReShade version 5 or higher...`, а за ним — певний ID.
   - Відкрийте `CitizenFX.ini` у вашій папці FiveM Application Data.
   - Додайте в кінець файлу цей розділ, замінивши `ID:XXXXXX` на точний ID з журналу:

```
[Addons]
ReShade5=ID:XXXXXX acknowledged that ReShade 5.x has a bug that will lead to game crashes
```
