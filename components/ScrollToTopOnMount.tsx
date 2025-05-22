'use client';

import { useLayoutEffect } from 'react';

export default function ScrollToTopOnMount() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}
