'use client';

import React, { useRef } from 'react';
import { AutoProLogo } from '@/components/AutoProLogo';
import { gsap, NO_REDUCED_MOTION, useGSAP } from '@/lib/gsap';

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(NO_REDUCED_MOTION, () => {
        gsap.from('.ft-word', { yPercent: 100, duration: 1.6, ease: 'power4.out', scrollTrigger: { trigger: root.current, start: 'top 80%', once: true } });
      });
    },
    { scope: root }
  );

  return (
    <footer ref={root} className="relative overflow-hidden border-t border-[#C9A24B]/20 bg-[#050505] pt-16 text-xs text-[#8E8A80]">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12">
          <div className="flex items-center gap-3">
            <AutoProLogo className="w-9 h-9" />
            <span className="text-[11px] uppercase tracking-[0.2em]">Lubumbashi • Haut-Katanga • RDC</span>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.2em]">
            <a href="#inventory" className="hover:text-[#C9A24B] transition-colors">Collection</a>
            <a href="#services" className="hover:text-[#C9A24B] transition-colors">Services</a>
            <a href="#armoured" className="hover:text-[#C9A24B] transition-colors">Blindés</a>
            <a href="#contact" className="hover:text-[#C9A24B] transition-colors">Contact</a>
          </nav>
        </div>
      </div>

      <div className="overflow-hidden px-2" aria-hidden="true">
        <div className="ft-word font-display font-light uppercase text-center leading-[0.8] tracking-[-0.04em] whitespace-nowrap text-[clamp(2.2rem,12.6vw,19rem)] pb-[0.06em] bg-gradient-to-b from-[#EBD699] via-[#C9A24B] to-[#6E480F] bg-clip-text text-transparent">
          Auto Pro DRC
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] border-t border-white/[0.06]">
        <p>© {new Date().getFullYear()} AUTO PRO DRC • 100, Chaussée Laurent Désiré Kabila, Lubumbashi.</p>
        <p className="font-mono text-neutral-500">Tél / WhatsApp : +243 992 099 990 / +243 901 310 000</p>
      </div>
    </footer>
  );
}
