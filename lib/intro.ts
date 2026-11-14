// The opening loader (components/IntroLoader.tsx) and anything that should wait for it,
// such as the hero's typed intro, meet here.

const EVENT = 'corefx:intro-done';

type IntroWindow = Window & { __corefxIntroDone?: boolean };

// Set by the inline script in app/layout.tsx before the first paint: the loader already
// played in this tab, or the visitor asked for reduced motion.
export const INTRO_SKIP_SCRIPT =
    "try{if(sessionStorage.getItem('corefx-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.setAttribute('data-intro','skip')}catch(e){}";

export function markIntroSeen() {
    try {
        sessionStorage.setItem('corefx-intro', '1');
    } catch {
        // storage blocked: the loader just plays again next time
    }
}

export function markIntroDone() {
    (window as IntroWindow).__corefxIntroDone = true;
    window.dispatchEvent(new Event(EVENT));
}

// Resolves when the loader starts revealing the page, or at once when there is none.
export function whenIntroDone(): Promise<void> {
    if (
        (window as IntroWindow).__corefxIntroDone ||
        document.documentElement.dataset.intro === 'skip' ||
        !document.querySelector('.intro-loader')
    ) {
        return Promise.resolve();
    }
    return new Promise((resolve) => {
        const done = () => {
            window.removeEventListener(EVENT, done);
            clearTimeout(fallback);
            resolve();
        };
        window.addEventListener(EVENT, done);
        const fallback = setTimeout(done, 4000);
    });
}
