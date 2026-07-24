'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { SITE_NAME_SHORT, CONTACT } from '@/lib/brand';

const NAV = [
  { href: '/#services', label: 'Services' },
  { href: '/#process', label: 'How it works' },
  { href: '/#areas', label: 'Service area' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? 'bg-sun/90 backdrop-blur-md border-b border-ink/5 shadow-sm shadow-ink/5'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link
          href="/"
          className={`font-display text-xl font-700 tracking-tight transition-colors sm:text-2xl ${
            scrolled || open ? 'text-ink' : 'text-white'
          }`}
          style={{ fontWeight: 700 }}
          onClick={() => setOpen(false)}
        >
          {SITE_NAME_SHORT}
          <span className={scrolled || open ? 'text-tide' : 'text-tide-bright'}>
            .
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-tide-bright ${
                scrolled ? 'text-ink-mute' : 'text-white/85'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`tel:${CONTACT.phoneTel}`}
            className={`inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition-all ${
              scrolled
                ? 'bg-tide text-white hover:bg-tide-deep'
                : 'bg-white text-ink hover:bg-mist'
            }`}
          >
            <Phone className="h-4 w-4" aria-hidden />
            Get a quote
          </a>
        </nav>

        <button
          type="button"
          className={`md:hidden rounded-md p-2 ${
            scrolled || open ? 'text-ink' : 'text-white'
          }`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-ink/5 bg-sun md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-3 text-lg font-medium text-ink hover:bg-mist"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-md bg-tide px-4 py-3.5 text-base font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              <Phone className="h-5 w-5" aria-hidden />
              Call {CONTACT.phoneDisplay}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
