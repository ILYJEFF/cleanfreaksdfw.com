import Link from 'next/link';
import { SITE_NAME } from '@/lib/brand';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-paper px-4 pt-24 text-center">
      <p className="font-display text-7xl font-black text-lime">404</p>
      <h1 className="mt-4 font-display text-2xl font-black text-ink">Page not found</h1>
      <p className="mt-2 text-ink-mute">That page is not on the {SITE_NAME} site.</p>
      <Link
        href="/"
        className="mt-8 border-2 border-ink bg-lime px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-ink shadow-punch hover:-translate-y-0.5"
      >
        Back home
      </Link>
    </div>
  );
}
