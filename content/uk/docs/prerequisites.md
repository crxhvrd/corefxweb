---
title: Вимоги
layout: sections
---

Перш ніж встановлювати й використовувати CoreFX, переконайтеся, що ваша система відповідає цим вимогам.

> [!WARNING] Поєднувати CoreFX з іншими графічними модами не рекомендовано — це може зламати гру. Зверніть увагу: ENBSeries більше не підтримується ні його розробником, ні CoreFX. Використовуючи CoreFX, ви автоматично погоджуєтеся з цими правилами.

## Вимоги до обладнання для Legacy

- Мінімум: NVIDIA GeForce RTX 2060 Super або AMD Radeon RX 5700
- Рекомендовано: NVIDIA GeForce RTX 3070 або AMD Radeon RX 6700 XT
- FXRT (трасування променів): відеокарта з апаратним трасуванням променів — NVIDIA RTX або AMD Radeon RX 6000 і новіші — та актуальний драйвер.
- DLSS: відеокарта NVIDIA RTX. FSR і XeSS: Windows 11 і відеокарта з Direct3D 12. DLSS Frame Generation: RTX 40-ї серії або новіша.

## Вимоги до обладнання для Enhanced

- Мінімум для трасування променів: NVIDIA GeForce RTX 3060 або AMD Radeon RX 6600 XT
- Рекомендовано для трасування променів: NVIDIA GeForce RTX 4060 Ti або AMD Radeon RX 7700 XT
- FXPT (трасування шляхів): NVIDIA GeForce RTX 5070 Ti або AMD Radeon RX 9070 XT чи потужніша.

## HDR (необов’язково, Legacy та Enhanced)

- Дисплей з підтримкою HDR і увімкненим «Use HDR» у налаштуваннях дисплея Windows. CoreFX переводить гру на swapchain HDR10 (PQ / BT.2020).
- HDR вмикається в меню **CoreFX Addon** (вкладка **HDR** > **HDR Mode**), а не в грі. За замовчуванням він **Off** — увімкніть **On**. **Після зміни потрібно перезапустити гру.**
- **Лише Enhanced:** HDR у грі має бути **вимкнений**, а **DLSS — увімкнений**. CoreFX HDR і **DLSS Frame Generation** не можуть працювати разом: Frame Generation показує власні кадри в обхід HDR-перетворення, і зображення перестає оновлюватися. Вимкніть одне з двох або покладіть [DLSS fix addon](https://github.com/clshortfuse/renodx/releases/download/snapshot/renodx-dlssfix.addon64) від RenoDX поруч із виконуваним файлом гри.

## Програмне забезпечення

- Гра: ліцензійна копія Grand Theft Auto V.
- **RageOpenV.asi (рекомендовано, Legacy та Enhanced Singleplayer):** сучасна заміна OpenIV.asi та OpenRPF.asi. Потрібен, щоб завантажувати моди з папки `mods`. (Завантажити на [GTA5-Mods](https://www.gta5-mods.com/scripts/rageopenv))
- OpenIV.asi (Legacy Singleplayer, застаріла альтернатива): завантажує моди з папки `mods`. Іде разом із [програмою OpenIV](https://openiv.com/), встановлюється в OpenIV > ASI Manager. Його замінив RageOpenV.asi.
- OpenRPF.asi (Enhanced Singleplayer, застаріла альтернатива): завантажує моди з папки `mods`. (Завантажити на [GTA5-Mods](https://www.gta5-mods.com/tools/openrpf-openiv-asi-for-gta-v-enhanced).) Його замінив RageOpenV.asi.
- ScriptHookV & Asi Loader (Legacy та Enhanced Singleplayer): потрібні для коректного завантаження скриптів. (Завантажити на [dev-c.com](https://www.dev-c.com/gtav/scripthookv/).) ASI Loader для Legacy — `dinput8.dll`, для Enhanced — `xinput1_4.dll`.
- **CoreFX Package Installer:** входить до обох Singleplayer-архівів і запускається для вас через `Install.bat` — окремо його не потрібно ні завантажувати, ні запускати. Він встановлює пакет `.oivs` напряму, без програми OpenIV. (Сторінка проєкту: [GTA5-Mods](https://www.gta5-mods.com/tools/oiv-package-installer))
- **Примітка для Legacy FiveM:** у цього пакета немає встановлювача. Його копіюють вручну — див. інструкцію з встановлення для Legacy FiveM.

## Обов’язкові налаштування гри

- **Shader Quality** і **Post FX** мають бути виставлені на **Ultra (максимум)** у графічних налаштуваннях гри. Без цього шейдери CoreFX не завантажаться: на нижчих налаштуваннях гра використовує інші варіанти шейдерів, які CoreFX не замінює, і мод виглядатиме неправильно.
- Якщо шейдери CoreFX не малюються, він показує попередження на екрані — *"CoreFX: shaders not running"*. У головному меню чи на екрані завантаження це нормально. Якщо воно не зникає під час гри, див. **Налаштування шейдерів > On-screen warnings**.
- **Лише Legacy:** Shader Quality має бути High або Very High, а Stereo 3D — вимкнено.

## Необов’язково

- FiveM (мультиплеєр): CoreFX підтримує мультиплеєрні платформи.
- Microsoft Visual C++ Redistributable 14.40 або новіший (x64): потрібен для Intel XeSS у Legacy. На більшості ПК він уже є. (Завантажити з сайту [Microsoft](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist))
- Оновлення драйверів: тримайте драйвери відеокарти актуальними.

## Ліцензія

- Кожен архів CoreFX містить `LICENSE.md` (ліцензію кінцевого користувача CoreFX, версія 2.1) і `THIRD-PARTY-NOTICES.md`. Встановлюючи чи використовуючи CoreFX, ви приймаєте ці умови — варто прочитати їх перед початком. Обидва документи є на цьому сайті англійською: [ліцензія](/license) і [сторонні компоненти](/third-party-notices).
- CoreFX поширюється лише через сторінку CoreFX на Patreon і посилання, опубліковані на [corefx.me](https://corefx.me). Копії з будь-яких інших джерел вам не ліцензовані.
