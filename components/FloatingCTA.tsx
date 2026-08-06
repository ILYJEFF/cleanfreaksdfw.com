'use client';

import Link from 'next/link';
import { Phone } from 'lucide-react';
import { CONTACT } from '@/lib/brand';

export function FloatingCTA() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2 sm:bottom-6 sm:right-6">
      <a
        href={`tel:${CONTACT.phoneTel}`}
        className="inline-flex h-12 w-12 items-center justify-center border-2 border-ink bg-lime text-ink shadow-punch transition-transform hover:-translate-y-0.5 md:hidden"
        aria-label={`Call ${CONTACT.phoneDisplay}`}
      >
        <Phone className="h-5 w-5" />
      </a>
      <Link
        href="/contact"
        className="hidden items-center gap-2 border-2 border-ink bg-lime px-4 py-3 text-xs font-extrabold uppercase tracking-wide text-ink shadow-punch transition-all hover:-translate-y-0.5 hover:bg-lime-hot sm:inline-flex"
      >
        Book a clean
      </Link>
    </div>
  );
}
