'use client';

import { useEffect, useState } from 'react';
import DownloadModal from './DownloadModal';
import { DOWNLOAD_MODAL_EVENT } from '@/lib/downloadModalEvents';

export default function DownloadModalRoot() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setOpen(true);

    window.addEventListener(DOWNLOAD_MODAL_EVENT, handleOpen);
    return () => window.removeEventListener(DOWNLOAD_MODAL_EVENT, handleOpen);
  }, []);

  return <DownloadModal open={open} onClose={() => setOpen(false)} />;
}
