---
title: Legacy FiveM
layout: steps
---

> [!NOTE] **Эта сборка требует уровня $5 на Patreon.** Установщика нет — пакет копируют вручную, и его нужно скопировать в **два** места.

## Подготовка

1. **Важно:** если раньше вы устанавливали старые сборки CoreFX, удалите все шейдеры из папки `FiveM.app\citizen\common\shaders\win32_40_final`.
2. Удалите старые файлы ENBSeries или ReShade из папки FiveM `plugins` *и* из корневой папки GTA V. Они могут называться `d3d11.dll`, `d3d12.dll`, `dxgi.dll`, `dxgi.asi` или `ReShade.asi`. CoreFX поставляет собственную сборку ReShade — только в папке `plugins`. `d3d12.dll` от CoreFX Singleplayer можно оставить, если вы играете в него на той же копии игры.

## Что в пакете

После распаковки папка `CoreFX` содержит две папки, названные по месту, куда идёт их содержимое. Ничего не автоматизировано — каждую вы копируете в соответствующее место.
- `FiveM Application Data\`
   - `mods\aa_corefxPack.rpf` — base mod. Обязателен.
   - `mods\ao_corefxRoads.rpf` — **Classic Roads, необязательно.** Пропустите этот файл, если не хотите текстуры дорог; это самый большой файл в пакете.
   - `plugins\` — `dxgi.dll`, `CoreFX.addon64`, `CoreFX\`, `reshade-shaders\` и `ReShade.ini`.
- `GTA 5 Root Folder\` — те же файлы без `dxgi.dll` от ReShade, для вашей настоящей папки GTA V.

## Установка CoreFX {open}

1. Распакуйте скачанный архив.
2. Скопируйте содержимое `CoreFX\FiveM Application Data\` в вашу папку **FiveM Application Data**, чтобы `mods\` и `plugins\` объединились с уже существующими. (Пропустите `ao_corefxRoads.rpf`, если не хотите Classic Roads.)
3. Скопируйте содержимое `CoreFX\GTA 5 Root Folder\` в **корневую папку GTA V** — ту, где лежит `GTA5.exe`.

> [!WARNING] **Нужны обе копии.** Папка FiveM `plugins` получает всё, включая `dxgi.dll` от ReShade. Корневая папка GTA V получает всё, кроме этой DLL.

4. Запустите FiveM и выставьте яркость в игре примерно на 40–50 %.

> [!WARNING] Очень важно, чтобы в игре был включён DirectX 11, а PostFX и Shader quality стояли на Ultra — это предотвращает визуальные ошибки и включает новые возможности шейдеров. Это также исправляет слишком тёмные ночи в некоторых погодах, из-за того как CoreFX работает с шейдерами.

5. В игре нажмите **Page Up**, чтобы открыть меню ReShade, и откройте окно **CoreFX Addon** — там все настройки CoreFX. **Page Down** включает и выключает эффекты ReShade. Что есть в меню, описано в разделе **Настройки шейдеров**.

## Обновление со старой версии CoreFX

1. Чтобы сохранить настройки меню, сначала скопируйте `plugins\CoreFX\Presets\CoreFX.ini` в надёжное место.
2. Удалите старую версию, как в разделе **Удаление CoreFX** ниже, — и из папок FiveM, и из корневой папки GTA V.
3. Скопируйте новый пакет, как в разделе **Установка CoreFX**. Копирование поверх старых файлов может оставить те, что новая версия уже не использует.
4. Верните `CoreFX.ini` в `plugins\CoreFX\Presets`. Настройки, которые добавила новая версия, начнут со значений по умолчанию.

## Проверка, что всё работает

1. При запуске игры ReShade показывает короткую полосу вверху экрана.
2. **Page Up** открывает оверлей ReShade с окном **CoreFX Addon**.
3. Когда вы уже в мире игры, на экране не остаётся оранжевых сообщений *CoreFX:*. Если остаётся — раздел **Решение проблем** объясняет, что оно значит.
4. Image > Anti-Aliasing: строка **Running now** показывает, что рисует кадр. С включённым FXRT на вкладке Ray Tracing нет сообщения о FXRT.
5. С включённым HDR вкладка HDR пишет **HDR is ACTIVE**.
6. В FiveM проверяйте на сервере, который точно работает без собственного ресурса погоды: файлы погоды сервера могут заменить файлы CoreFX.

## Удаление CoreFX

1. Удалите `aa_corefxPack.rpf` и `ao_corefxRoads.rpf` из папки `mods` в вашей папке FiveM Application Data.
2. Удалите файлы, которые вы скопировали в папку FiveM `plugins`: `dxgi.dll`, `CoreFX.addon64`, `ReShade.ini`, а также папки `CoreFX` и `reshade-shaders`.
3. Удалите `CoreFX.addon64`, `ReShade.ini` и папки `CoreFX` и `reshade-shaders` и из корневой папки GTA V, если вы не используете там CoreFX Singleplayer.
4. Перезапустите FiveM.

## Решение проблем

- **Ошибка "ReShade Blocked"**
   - Если FiveM вылетает или блокирует ReShade (версии 5+), нажмите **F8** в главном меню FiveM, чтобы посмотреть журнал.
   - Найдите сообщение, которое начинается с `script:reshade Blocked load of ReShade version 5 or higher...`, а за ним — определённый ID.
   - Откройте `CitizenFX.ini` в вашей папке FiveM Application Data.
   - Добавьте в конец файла этот раздел, заменив `ID:XXXXXX` точным ID из журнала:

```
[Addons]
ReShade5=ID:XXXXXX acknowledged that ReShade 5.x has a bug that will lead to game crashes
```
