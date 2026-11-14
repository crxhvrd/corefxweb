'use client';

import { triggerDownloadModal } from '@/lib/downloadModalEvents';

export default function DownloadLink({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <button type="button" onClick={() => triggerDownloadModal()} className={className}>
            {children}
        </button>
    );
}
