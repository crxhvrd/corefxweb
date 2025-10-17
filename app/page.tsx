import ImageGrid from '@/components/ImageGrid';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(76,29,149,0.18),_transparent_45%)]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 pb-24 pt-32 lg:px-10">
        <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-900/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
              CoreFX Mod
            </span>
            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Погрузись в новую эру визуального стиля и геймплейных идей
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
                CoreFX — это мод, объединяющий футуристичный визуальный язык, гибкие геймплейные
                настройки и тщательно подобранный саунд-дизайн. Мы вдохновлены эстетикой цифрового
                авангарда и стремимся, чтобы каждый кадр выглядел как концепт-арт AAA проекта.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-800/70 bg-slate-900/80 p-6 shadow-lg shadow-cyan-500/10">
                <h2 className="text-lg font-semibold text-white">Основные фичи</h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  <li>• Динамическая система погодных эффектов и времени суток</li>
                  <li>• Переработанный HUD в неоновой стилистике</li>
                  <li>• Баланс оружия, адаптированный под PvE и PvP сценарии</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-800/70 bg-slate-900/80 p-6 shadow-lg shadow-purple-500/10">
                <h2 className="text-lg font-semibold text-white">Полезно знать</h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  <li>• Обновления выходят каждый вторник в 20:00 (МСК)</li>
                  <li>
                    • Сервер: <span className="font-medium text-white">corefx.world:30120</span>
                  </li>
                  <li>
                    • Дискорд: <span className="font-medium text-white">discord.gg/corefx</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm font-medium">
              <a
                href="#download"
                className="rounded-full bg-cyan-400 px-8 py-3 text-slate-900 shadow-lg shadow-cyan-400/40 transition hover:bg-cyan-300"
              >
                Скачать мод
              </a>
              <a
                href="#features"
                className="rounded-full border border-slate-700/70 px-8 py-3 text-white transition hover:border-cyan-300/80 hover:text-cyan-200"
              >
                Узнать подробности
              </a>
            </div>
          </div>

          <div className="relative hidden h-full w-full rounded-[32px] border border-slate-800/70 bg-slate-900/70 p-8 shadow-xl shadow-cyan-500/20 lg:block">
            <div className="absolute inset-x-8 top-8 rounded-3xl border border-cyan-500/40 bg-gradient-to-br from-cyan-400/30 via-purple-500/20 to-slate-900/60 p-6">
              <p className="text-sm uppercase tracking-[0.4em] text-cyan-200">Patch 2.5</p>
              <h3 className="mt-4 text-2xl font-semibold text-white">&laquo;Neon Pulse&raquo; Update</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">
                • Новый рейд &laquo;Сердце Галактики&raquo; с кооперативной прогрессией.<br />• Энергетические клинки с альтернативными стойками.<br />• Улучшенный фоторежим с фильтрами в духе ретро-футуризма.
              </p>
            </div>
            <div className="absolute bottom-8 left-1/2 w-[85%] -translate-x-1/2 rounded-2xl border border-slate-800/70 bg-slate-950/90 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Присоединяйся</p>
              <p className="mt-2 text-lg font-semibold text-white">2 500+ игроков уже в строю</p>
              <p className="mt-1 text-sm text-slate-300">
                Поддержка модов, ивенты, киберпанк-атмосфера и дружное комьюнити.
              </p>
            </div>
          </div>
        </section>

        <section id="features" className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Что делает CoreFX особенным</h2>
            <p className="text-base leading-relaxed text-slate-200">
              Мы работаем в тесном контакте с сообществом, чтобы каждая механика ощущалась живой и
              продуманной. Наши художники и программисты объединяют усилия, создавая мир, который
              постоянно эволюционирует. CoreFX идеально подходит для киберпанк ролевых серверов,
              шутеров с отрядной кооперацией и тематических мероприятий.
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                {
                  title: 'Глубокая кастомизация',
                  description:
                    'Адаптируй интерфейс, эффектов и баланс под стиль сервера с гибкими YAML-конфигами.',
                },
                {
                  title: 'Живой мир',
                  description:
                    'Сценарии событий и AI-патрули создают ощущение постоянно меняющегося мира.',
                },
                {
                  title: 'Интеграция с Discord',
                  description:
                    'Встроенные вебхуки транслируют статистику и прогресс рейдов прямо в каналы сообщества.',
                },
                {
                  title: 'Оптимизация',
                  description:
                    'CoreFX не жертвует FPS: асинхронные загрузки и умный кэш гарантируют плавный геймплей.',
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-800/70 bg-slate-900/70 p-6 shadow-lg shadow-slate-900/40"
                >
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm text-slate-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            id="download"
            className="flex flex-col gap-6 rounded-3xl border border-slate-800/70 bg-slate-900/80 p-8 shadow-xl shadow-purple-500/20"
          >
            <h2 className="text-3xl font-semibold text-white">Начни играть за 5 минут</h2>
            <ol className="space-y-4 text-sm text-slate-300">
              <li className="flex gap-3">
                <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400 text-sm font-bold text-slate-900">
                  1
                </span>
                <div>
                  <p className="font-semibold text-white">Скачай лаунчер</p>
                  <p>Установи CoreFX Launcher и выбери сервер «Neon Pulse».</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400 text-sm font-bold text-slate-900">
                  2
                </span>
                <div>
                  <p className="font-semibold text-white">Обнови ресурсы</p>
                  <p>Загрузи последние пакеты модификации и активируй желаемые пресеты.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400 text-sm font-bold text-slate-900">
                  3
                </span>
                <div>
                  <p className="font-semibold text-white">Врывайся в игру</p>
                  <p>Выполни вход через Rockstar ID и присоединяйся к отряду. Мы начинаем в 21:00!</p>
                </div>
              </li>
            </ol>
            <div className="rounded-2xl border border-cyan-400/40 bg-slate-950/80 p-6 text-sm text-slate-200">
              <p className="font-semibold text-white">Совет дня</p>
              <p className="mt-2">
                Активируй режим «Flux HDR» в настройках CoreFX, чтобы добиться максимально ярких
                неоновых акцентов и мягких теней без потери производительности.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-slate-800/70 bg-slate-900/80 p-8 shadow-xl shadow-slate-900/40">
          <h2 className="text-3xl font-semibold text-white">Галерея</h2>
          <p className="text-sm text-slate-300">
            Оцените выдержку из последних скриншотов сообщества. Кликните по изображению, чтобы
            открыть полноразмерную версию.
          </p>
          <ImageGrid />
        </section>
      </div>
    </main>
  );
}
