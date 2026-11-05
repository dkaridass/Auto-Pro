'use client';

import React, { useRef } from 'react';
import { gsap, SplitText, NO_REDUCED_MOTION, useGSAP } from '@/lib/gsap';

interface SplitHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2';
  /** Seconds to wait before playing (e.g. until the preloader lifts). */
  delay?: number;
  /** Play when scrolled into view instead of on load. */
  onScroll?: boolean;
}

/** Headline whose lines slide up out of a mask (React Bits "SplitText" style, built on GSAP SplitText). */
export default function SplitHeading({ children, className, as: Tag = 'h1', delay = 0.1, onScroll = false }: SplitHeadingProps) {
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
          gsap.from(split.lines, {
            yPercent: 115,
            rotate: 3,
            duration: 1.2,
            ease: 'power4.out',
            stagger: 0.12,
            delay: onScroll ? 0 : delay,
            scrollTrigger: onScroll ? { trigger: ref.current, start: 'top 88%', once: true } : undefined,
          });
        });
        return () => {
          cancelled = true;
          split?.revert();
        };
      });
    },
    { scope: ref }
  );

  return <Tag ref={ref as React.Ref<never>} className={className}>{children}</Tag>;
}
