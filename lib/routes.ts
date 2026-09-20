// Long-form document pages. They bring their own header and spacing, so the
// home page's floating chrome — the corner logos, the "scroll down" hint and
// the fixed attribution block — would only sit on top of their text.
const DOCUMENT_ROUTES = [
  '/docs',
  '/devblog',
  '/license',
  '/licence',
  '/third-party-notices',
];

export function isDocumentRoute(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return DOCUMENT_ROUTES.some((route) => pathname.startsWith(route));
}
