'use client';

import React, { useRef } from 'react';
import { gsap, SplitText, NO_REDUCED_MOTION, useGSAP } from '@/lib/gsap';

interface SplitHeadingProps {
  children: React.ReactNode;
  className?: string;
}

/** Hero headline: each line slides up out of a mask (React Bits "SplitText" style, built on GSAP SplitText). */
export default function SplitHeading({ children, className }: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(NO_REDUCED_MOTION, () => {
        let split: SplitText | undefined;
        let cancelled = false;
        document.fonts.ready.then(() => {
          if (cancelled || !ref.current) return;
          split = SplitText.create(ref.current, { type: 'lines', mask: 'lines', linesClass: 'split-line' });
          gsap.from(split.lines, { yPercent: 110, duration: 1.2, ease: 'power4.out', stagger: 0.12, delay: 0.1 });
        });
        return () => {
          cancelled = true;
          split?.revert();
        };
      });
    },
    { scope: ref }
  );

  return (
    <h1 ref={ref} className={className}>
      {children}
    </h1>
  );
}
