"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { CONTACT } from "@/lib/brand";

export function FloatingCTA() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2 sm:bottom-6 sm:right-6">
      <a
        href={`tel:${CONTACT.phoneTel}`}
        className="inline-flex h-12 items-center justify-center gap-2 border-2 border-ink bg-paper px-4 text-ink shadow-punch transition-transform hover:-translate-y-0.5 md:hidden"
        aria-label={`Call ${CONTACT.phoneDisplay}`}
      >
        <Phone className="h-5 w-5" />
        <span className="text-xs font-extrabold uppercase tracking-wide">Call</span>
      </a>
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 border-2 border-ink bg-lime px-4 py-3 text-xs font-extrabold uppercase tracking-wide text-ink shadow-punch transition-all hover:-translate-y-0.5 hover:bg-lime-hot"
      >
        Free estimate
      </Link>
    </div>
  );
}
