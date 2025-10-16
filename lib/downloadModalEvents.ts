export const DOWNLOAD_MODAL_EVENT = 'corefx:open-download-modal';

export const triggerDownloadModal = () => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(DOWNLOAD_MODAL_EVENT));
};
