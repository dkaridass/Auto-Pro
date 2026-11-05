'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Vanta NET wireframe in brand gold, lazy-loaded and only running while on screen.
 * Decorative: no mouse/touch listeners, hidden from assistive tech, off for reduced motion.
 */
export default function VantaBackground({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let effect: { destroy: () => void } | null = null;
    let cancelled = false;
    let loading = false;
    const small = window.innerWidth < 768;

    const start = async () => {
      if (effect || loading) return;
      loading = true;
      try {
        const [THREE, mod] = await Promise.all([import('three'), import('vanta/dist/vanta.net.min')]);
        const NET = (mod as { default?: unknown }).default ?? mod;
        if (cancelled || effect) return;
        effect = (NET as (o: Record<string, unknown>) => { destroy: () => void })({
          el,
          THREE,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          color: 0xc9a24b,
          backgroundColor: 0x070707,
          points: small ? 6 : 9,
          maxDistance: small ? 18 : 22,
          spacing: small ? 24 : 18,
          showDots: true,
        });
      } finally {
        loading = false;
      }
    };
    const stop = () => {
      effect?.destroy();
      effect = null;
    };

    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold: 0 });
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      stop();
    };
  }, []);

  return <div ref={ref} aria-hidden="true" className={`pointer-events-none ${className}`} />;
}
