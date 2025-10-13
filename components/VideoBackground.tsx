'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const TARGET_ASPECT_RATIO = 16 / 9;
const SOURCE_ASPECT_RATIO = 4 / 3;
const HORIZONTAL_STRETCH = TARGET_ASPECT_RATIO / SOURCE_ASPECT_RATIO;
const EDGE_OVERSCAN = 0.16;
const INTERFACE_SHIFT_X = 0.05;
const INTERFACE_SHIFT_Y = 0.08;

export default function VideoBackground() {
  const [blur, setBlur] = useState(0);
  const [playerSize, setPlayerSize] = useState({ width: 0, height: 0 });
  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const playerSizeRef = useRef(playerSize);

  const applyChromelessStyling = useCallback(
    (iframe: HTMLIFrameElement, size?: { width: number; height: number }) => {
      const { width, height } = size ?? playerSizeRef.current;

      iframe.style.pointerEvents = 'none';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.display = 'block';
      iframe.style.border = '0';
      iframe.setAttribute('tabIndex', '-1');
      iframe.style.transformOrigin = 'center center';
      iframe.style.margin = '0';

      const overscanScale = 1 + EDGE_OVERSCAN;
      const scaleX = HORIZONTAL_STRETCH * overscanScale;
      const scaleY = overscanScale;
      iframe.style.transform = `scale(${scaleX}, ${scaleY})`;

      if (width && height) {
        const offsetX = width * INTERFACE_SHIFT_X;
        const offsetY = height * INTERFACE_SHIFT_Y;
        iframe.style.marginLeft = `${offsetX}px`;
        iframe.style.marginTop = `-${offsetY}px`;
      } else {
        iframe.style.marginLeft = '0px';
        iframe.style.marginTop = '0px';
      }
    },
    [],
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const blurStart = viewportHeight * 0.1;
      const blurEnd = viewportHeight * 0.5;

      if (scrollY < blurStart) {
        setBlur(0);
      } else if (scrollY > blurEnd) {
        setBlur(10);
      } else {
        const blurAmount = ((scrollY - blurStart) / (blurEnd - blurStart)) * 10;
        setBlur(blurAmount);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const calculateSize = () => {
      const { innerWidth, innerHeight } = window;
      const widthBasedHeight = innerWidth * (9 / 16);
      const heightBasedWidth = innerHeight * (16 / 9);

      if (widthBasedHeight >= innerHeight) {
        setPlayerSize({ width: innerWidth, height: widthBasedHeight });
      } else {
        setPlayerSize({ width: heightBasedWidth, height: innerHeight });
      }
    };

    calculateSize();
    window.addEventListener('resize', calculateSize);

    return () => {
      window.removeEventListener('resize', calculateSize);
    };
  }, []);

  useEffect(() => {
    playerSizeRef.current = playerSize;

    const iframe = playerContainerRef.current?.querySelector('iframe');
    if (iframe) {
      applyChromelessStyling(iframe, playerSize);
    }
  }, [playerSize, applyChromelessStyling]);

  useEffect(() => {
    let player: any;

    const createPlayer = () => {
      if (!window.YT || !playerContainerRef.current) {
        return;
      }

      player = new window.YT.Player(playerContainerRef.current, {
        videoId: 'YpoTUS5BY3Q',
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          loop: 1,
          modestbranding: 1,
          playsinline: 1,
          playlist: 'YpoTUS5BY3Q',
          rel: 0,
          iv_load_policy: 3,
          cc_load_policy: 0,
          fs: 0,
          showinfo: 0,
        },
        events: {
          onReady: (event: any) => {
            event.target.mute();
            event.target.setPlaybackQuality?.('hd1080');
            event.target.playVideo();
            const iframe = playerContainerRef.current?.querySelector('iframe');
            if (iframe) {
              applyChromelessStyling(iframe);
            }
          },
          onStateChange: (event: any) => {
            const endedState = window.YT?.PlayerState?.ENDED;
            if (typeof endedState !== 'undefined' && event.data === endedState) {
              event.target.playVideo();
            }
          },
        },
      });
    };

    const setupPlayer = () => {
      if (window.YT && window.YT.Player) {
        createPlayer();
      } else {
        const existingScript = document.querySelector<HTMLScriptElement>(
          'script[src="https://www.youtube.com/iframe_api"]',
        );

        if (!existingScript) {
          const script = document.createElement('script');
          script.src = 'https://www.youtube.com/iframe_api';
          script.async = true;
          document.body.appendChild(script);
        }

        const previousCallback = window.onYouTubeIframeAPIReady;
        const handleApiReady = () => {
          previousCallback?.();
          createPlayer();
        };

        window.onYouTubeIframeAPIReady = handleApiReady;

        return () => {
          if (window.onYouTubeIframeAPIReady === handleApiReady) {
            window.onYouTubeIframeAPIReady = previousCallback;
          }
        };
      }

      return () => undefined;
    };

    const cleanupCallback = setupPlayer();

    return () => {
      cleanupCallback?.();
      if (player) {
        player.destroy();
      }
    };
  }, [applyChromelessStyling]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-black/10 z-10"
        style={{ backdropFilter: `blur(${blur}px)` }}
      ></div>

      <div
        ref={playerContainerRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none overflow-hidden"
        style={{
          width: playerSize.width ? `${playerSize.width}px` : '100%',
          height: playerSize.height ? `${playerSize.height}px` : '100%',
          filter: 'brightness(1.15)',
        }}
      />
    </div>
  );
}
