import type { Metadata } from 'next';
import HomePage from '@/components/home/HomePage';
import { alternatesFor } from '@/lib/i18n';

export const metadata: Metadata = {
  alternates: alternatesFor('/', 'en')
};

export default function Home() {
  return <HomePage locale="en" />;
}
