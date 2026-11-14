import { OTHER_LOCALES } from '@/lib/i18n';

// /uk, /ru, /es ... : the same pages as the English root, in another language.
// English itself stays at the root, so only the other languages are generated here.
export const dynamicParams = false;

export function generateStaticParams() {
    return OTHER_LOCALES.map((lang) => ({ lang }));
}

export default function LangLayout({ children }: { children: React.ReactNode }) {
    return children;
}
