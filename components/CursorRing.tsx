'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

/** Gold ring that trails the mouse and swells over links and buttons. Desktop only. */
export default function CursorRing() {
  const ring = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const el = ring.current!;
      gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });
      const x = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' });
      const y = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' });
      const move = (e: PointerEvent) => {
        gsap.to(el, { opacity: 1, duration: 0.3, overwrite: 'auto' });
        x(e.clientX);
        y(e.clientY);
        const hot = (e.target as Element | null)?.closest('a, button, [role="button"]');
        gsap.to(el, { scale: hot ? 1.9 : 1, backgroundColor: hot ? 'rgba(201,162,75,0.12)' : 'rgba(201,162,75,0)', duration: 0.3, overwrite: 'auto' });
      };
      const leave = () => gsap.to(el, { opacity: 0, duration: 0.3 });
      window.addEventListener('pointermove', move);
      document.documentElement.addEventListener('pointerleave', leave);
      return () => {
        window.removeEventListener('pointermove', move);
        document.documentElement.removeEventListener('pointerleave', leave);
      };
    });
  });

  return (
    <div
      ref={ring}
      aria-hidden="true"
      className="fixed top-0 left-0 z-[90] w-9 h-9 rounded-full border border-[#C9A24B]/70 pointer-events-none opacity-0"
    />
  );
}
