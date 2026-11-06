'use client';

import React, { useEffect, useRef, useState } from 'react';

const LINKS = [
  { href: '#inventory', label: 'Collection' },
  { href: '#services', label: 'Services' },
  { href: '#armoured', label: 'Blindés' },
  { href: '#contact', label: 'Contact' },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
        aria-expanded={open}
        aria-controls="mobile-nav-overlay"
        className="inline-flex items-center justify-center w-11 h-11 border border-[#C9A24B]/40 text-[#C9A24B]"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M3 5h14M3 10h14M3 15h14" />
        </svg>
      </button>

      {open && (
        <div
          id="mobile-nav-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
          data-lenis-prevent
          className="fixed inset-0 z-[60] bg-[#070707] flex flex-col px-5 sm:px-8 py-5"
        >
          <div className="flex justify-end">
            <button
              ref={closeRef}
              type="button"
              onClick={() => {
                setOpen(false);
                toggleRef.current?.focus();
              }}
              aria-label="Fermer le menu"
              className="inline-flex items-center justify-center w-11 h-11 border border-[#C9A24B]/40 text-[#C9A24B]"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M4 4l12 12M16 4L4 16" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center gap-2 text-sm tracking-[0.2em] uppercase text-[#C4C0B5] font-medium">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center min-h-11 py-3 border-b border-white/[0.08] hover:text-[#C9A24B] transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://wa.me/243992099990"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center justify-center min-h-11 px-4 py-3 text-xs tracking-[0.2em] text-[#070707] bg-[#C9A24B] hover:bg-[#EBD699] font-semibold transition-colors"
            >
              WhatsApp Direct
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
