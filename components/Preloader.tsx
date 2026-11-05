'use client';

import React, { useRef, useState } from 'react';
import { AutoProLogo } from '@/components/AutoProLogo';
import { gsap, NO_REDUCED_MOTION, useGSAP } from '@/lib/gsap';

/** Cinematic intro: gold counter, then the curtain lifts to reveal the showroom. */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(NO_REDUCED_MOTION, () => {
        const n = { v: 0 };
        document.body.style.overflow = 'hidden';
        const tl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = '';
            setGone(true);
          },
        });
        tl.from('.pl-logo', { scale: 0.7, opacity: 0, duration: 0.8, ease: 'power3.out' })
          .to(n, { v: 100, duration: 1.2, ease: 'power2.inOut', onUpdate: () => {
            if (count.current) count.current.textContent = String(Math.round(n.v)).padStart(3, '0');
          } }, 0.1)
          .to('.pl-bar', { scaleX: 1, duration: 1.2, ease: 'power2.inOut' }, 0.1)
          .to('.pl-content', { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' }, '+=0.1')
          .to(root.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '-=0.1');
        return () => {
          document.body.style.overflow = '';
        };
      });
      mm.add('(prefers-reduced-motion: reduce)', () => setGone(true));
    },
    { scope: root }
  );

  if (gone) return null;
  return (
    <div ref={root} aria-hidden="true" className="fixed inset-0 z-[100] bg-[#070707] flex items-center justify-center">
      <div className="pl-content flex flex-col items-center gap-6">
        <div className="pl-logo"><AutoProLogo className="w-20 h-20" /></div>
        <div className="w-56 h-px bg-white/10 overflow-hidden">
          <div className="pl-bar h-full w-full origin-left scale-x-0 bg-[#C9A24B]" />
        </div>
        <span ref={count} className="font-mono text-xs tracking-[0.4em] text-[#C9A24B]">000</span>
      </div>
    </div>
  );
}
