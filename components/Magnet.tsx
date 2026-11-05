'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

interface MagnetProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

/** Pulls its child gently toward the cursor (React Bits "Magnet" pattern). Fine pointers only. */
export default function Magnet({ children, strength = 0.25, className }: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        const el = ref.current;
        if (!el) return;
        const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
        const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          x((e.clientX - (r.left + r.width / 2)) * strength);
          y((e.clientY - (r.top + r.height / 2)) * strength);
        };
        const leave = () => {
          x(0);
          y(0);
        };
        el.addEventListener('pointermove', move);
        el.addEventListener('pointerleave', leave);
        return () => {
          el.removeEventListener('pointermove', move);
          el.removeEventListener('pointerleave', leave);
        };
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`inline-block ${className ?? ''}`}>
      {children}
    </div>
  );
}
