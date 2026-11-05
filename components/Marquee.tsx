'use client';

import React, { useRef } from 'react';
import { gsap, ScrollTrigger, NO_REDUCED_MOTION, useGSAP } from '@/lib/gsap';

/** Infinite brand ribbon that accelerates (and reverses) with scroll velocity — React Bits "ScrollVelocity" idea. */
export default function Marquee({ items }: { items: string[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(NO_REDUCED_MOTION, () => {
        const track = root.current!.querySelector('.mq-track');
        const tween = gsap.to(track, { xPercent: -50, duration: 38, ease: 'none', repeat: -1 });
        const st = ScrollTrigger.create({
          onUpdate: (self) => {
            const boost = Math.min(Math.abs(self.getVelocity()) / 250, 8);
            const dir = self.direction;
            gsap.to(tween, { timeScale: dir * (1 + boost), duration: 0.25, overwrite: true });
            gsap.to(tween, { timeScale: dir, duration: 1.2, delay: 0.25, overwrite: false });
          },
        });
        return () => st.kill();
      });
    },
    { scope: root }
  );

  const row = items.map((t, i) => (
    <span key={i} className="flex items-center shrink-0">
      <span className="font-display text-5xl sm:text-7xl font-light uppercase tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(201,162,75,0.55)] hover:text-[#C9A24B]/20 transition-colors">
        {t}
      </span>
      <span aria-hidden="true" className="mx-8 sm:mx-12 text-[#C9A24B] text-2xl">✦</span>
    </span>
  ));

  return (
    <div ref={root} aria-label={items.join(', ')} role="img" className="relative overflow-hidden border-y border-[#C9A24B]/15 bg-[#070707] py-8">
      <div className="mq-track flex w-max will-change-transform" aria-hidden="true">
        {row}
        {row}
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#070707] to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#070707] to-transparent" />
    </div>
  );
}
