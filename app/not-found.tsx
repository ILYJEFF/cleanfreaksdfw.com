import Link from 'next/link';
import { SITE_NAME } from '@/lib/brand';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-sun px-4 pt-24 text-center">
      <p className="font-display text-6xl font-800 text-tide" style={{ fontWeight: 800 }}>
        404
      </p>
      <h1 className="mt-4 font-display text-2xl font-700 text-ink" style={{ fontWeight: 700 }}>
        Page not found
      </h1>
      <p className="mt-2 text-ink-mute">That page is not on the {SITE_NAME} site.</p>
      <Link
        href="/"
        className="mt-8 rounded-md bg-tide px-6 py-3 text-sm font-semibold text-white hover:bg-tide-deep"
      >
        Back home
      </Link>
    </div>
  );
}
