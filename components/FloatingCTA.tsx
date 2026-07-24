'use client';

import Link from 'next/link';
import { Phone } from 'lucide-react';
import { CONTACT } from '@/lib/brand';

export function FloatingCTA() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2 sm:bottom-6 sm:right-6">
      <a
        href={`tel:${CONTACT.phoneTel}`}
        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-tide text-white shadow-lg shadow-tide/30 transition-transform hover:scale-105 hover:bg-tide-deep md:hidden"
        aria-label={`Call ${CONTACT.phoneDisplay}`}
      >
        <Phone className="h-5 w-5" />
      </a>
      <Link
        href="/contact"
        className="hidden items-center gap-2 rounded-md bg-ink px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-ink/20 transition-all hover:bg-ink-soft sm:inline-flex"
      >
        Book a clean
      </Link>
    </div>
  );
}
