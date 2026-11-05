'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

/** 3D tilt toward the cursor (React Bits "TiltedCard" idea). Fine pointers only. */
export default function TiltCard({ children, className = '', max = 6 }: { children: React.ReactNode; className?: string; max?: number }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        const o = outer.current!;
        const rx = gsap.quickTo(inner.current, 'rotationX', { duration: 0.5, ease: 'power3.out' });
        const ry = gsap.quickTo(inner.current, 'rotationY', { duration: 0.5, ease: 'power3.out' });
        const move = (e: PointerEvent) => {
          const r = o.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 2 * max);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 2 * max);
        };
        const leave = () => { rx(0); ry(0); };
        o.addEventListener('pointermove', move);
        o.addEventListener('pointerleave', leave);
        return () => {
          o.removeEventListener('pointermove', move);
          o.removeEventListener('pointerleave', leave);
        };
      });
    },
    { scope: outer }
  );

  return (
    <div ref={outer} className={`[perspective:1000px] ${className}`}>
      <div ref={inner} className="w-full h-full flex [transform-style:preserve-3d] will-change-transform">
        {children}
      </div>
    </div>
  );
}
