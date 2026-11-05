'use client';

import { useRef } from 'react';
import { gsap, NO_REDUCED_MOTION, useGSAP } from '@/lib/gsap';

/** Thin gold progress line at the very top of the viewport. */
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(NO_REDUCED_MOTION, () => {
      gsap.fromTo(
        bar.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
        }
      );
    });
  });

  return (
    <div aria-hidden="true" className="fixed top-0 left-0 w-full h-[2px] z-[70] pointer-events-none">
      <div
        ref={bar}
        className="h-full w-full origin-left bg-gradient-to-r from-[#8F6D25] via-[#C9A24B] to-[#EBD699] scale-x-0"
      />
    </div>
  );
}
