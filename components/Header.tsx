"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { CONTACT } from "@/lib/brand";
import { BrandMark } from "@/components/BrandMark";

const NAV = [
  { href: "/#services", label: "Services" },
  { href: "/#facilities", label: "Facilities" },
  { href: "/#areas", label: "Areas" },
  { href: "/about", label: "Why us" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-400 ${
        solid
          ? "border-b-2 border-ink bg-paper"
          : "border-b-2 border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
        <BrandMark
          tone={solid ? "dark" : "light"}
          size="md"
          onClick={() => setOpen(false)}
        />

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-semibold tracking-wide transition-colors ${
                solid
                  ? "text-ink-mute hover:text-ink"
                  : "text-white/80 hover:text-lime"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={`tel:${CONTACT.phoneTel}`}
            className={`inline-flex items-center gap-2 border-2 px-3 py-2 text-xs font-extrabold uppercase tracking-wide transition-all hover:-translate-y-0.5 xl:px-4 xl:text-sm ${
              solid
                ? "border-ink bg-paper text-ink hover:bg-mist"
                : "border-white/40 bg-white/5 text-white hover:border-lime hover:text-lime"
            }`}
          >
            <Phone className="h-4 w-4" aria-hidden />
            <span className="hidden xl:inline">{CONTACT.phoneDisplay}</span>
            <span className="xl:hidden">Call</span>
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border-2 border-ink bg-lime px-3 py-2 text-xs font-extrabold uppercase tracking-wide text-ink shadow-punch transition-all hover:-translate-y-0.5 hover:bg-lime-hot xl:px-4 xl:text-sm"
          >
            Free estimate
          </Link>
        </div>

        <button
          type="button"
          className={`border-2 border-current p-1.5 md:hidden ${
            solid ? "text-ink" : "text-white"
          }`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t-2 border-ink bg-paper md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-5">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-ink/10 px-1 py-3 font-display text-lg font-bold text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="mt-4 inline-flex items-center justify-center gap-2 border-2 border-ink bg-paper px-4 py-3.5 text-sm font-extrabold uppercase tracking-wide text-ink"
              onClick={() => setOpen(false)}
            >
              <Phone className="h-5 w-5" aria-hidden />
              Call {CONTACT.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className="mt-2 inline-flex items-center justify-center gap-2 border-2 border-ink bg-lime px-4 py-3.5 text-sm font-extrabold uppercase tracking-wide text-ink shadow-punch"
              onClick={() => setOpen(false)}
            >
              Free estimate
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
