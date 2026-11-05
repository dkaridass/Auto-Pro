'use client';

import React, { useRef } from 'react';
import SplitHeading from '@/components/SplitHeading';
import Magnet from '@/components/Magnet';
import { gsap, NO_REDUCED_MOTION, useGSAP } from '@/lib/gsap';

const FIGURES = [
  { v: 'B6 · VR7', l: 'Blindage certifié CEN / VPAM' },
  { v: '7.62 mm', l: 'Tirs de calibre résistés' },
  { v: 'Anti-mines', l: 'Plancher & réservoir protégés' },
];
const BADGES = ['Blindage Certifié CEN B6 / VR7', 'Plancher Anti-Mines', 'Pneus Run-Flat', 'Réservoir Protégé'];

export default function Armoured({ onContact }: { onContact: (name: string) => void }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(NO_REDUCED_MOTION, () => {
        gsap.fromTo('.arm-giant', { xPercent: 12 }, { xPercent: -22, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } });
        gsap.from('.arm-fig', { y: 50, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.arm-figs', start: 'top 85%', once: true } });
      });
    },
    { scope: root }
  );

  return (
    <section id="armoured" ref={root} className="relative overflow-hidden bg-[#050505] py-24 md:py-40 border-y border-[#C9A24B]/15">
      <div aria-hidden="true" className="arm-giant pointer-events-none select-none absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap font-display font-light text-[clamp(14rem,36vw,40rem)] leading-none text-transparent [-webkit-text-stroke:1px_rgba(201,162,75,0.22)]">
        VR7 · B6 · VR7 · B6
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(201,162,75,0.10),transparent_60%)]" />

      <div className="relative max-w-[1600px] mx-auto px-5 sm:px-8">
        <div className="flex items-center gap-3 text-[11px] tracking-[0.25em] uppercase text-[#C9A24B] font-semibold mb-3">
          <span className="font-mono">(03)</span>
          <span className="w-8 h-[1.5px] bg-[#C9A24B]" />
          <span>Division sécurité & véhicules blindés</span>
        </div>
        <SplitHeading as="h2" onScroll className="font-display font-light uppercase tracking-[-0.02em] leading-[0.95] text-[clamp(2.6rem,7vw,7.5rem)] max-w-5xl">
          Blindé. Certifié. <span className="italic font-normal shiny-text">Livré.</span>
        </SplitHeading>

        <div className="mt-12 grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <p className="text-base md:text-lg text-[#C5BFB3] leading-relaxed font-light max-w-2xl">
              Toyota Land Cruiser 300 et Lexus LX blindés, certifiés CEN B6 / VPAM VR7. Pensés pour encaisser les tirs de 7.62 mm et les
              déflagrations, avec suspensions renforcées et jantes run-flat pour les trajets Lubumbashi–Likasi–Kolwezi.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {BADGES.map((b) => (
                <li key={b} className="border border-white/15 rounded-full px-4 py-1.5 text-xs bg-black/50 text-[#C9A24B] font-mono">{b}</li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5 flex flex-col lg:items-end gap-3">
            <span className="text-xs uppercase tracking-wider text-[#A8A398] font-mono">Flottes & entreprises minières</span>
            <Magnet>
              <button
                onClick={() => onContact('Toyota Land Cruiser 300 Blindé B6')}
                className="min-h-11 px-8 py-4 bg-[#C9A24B] hover:bg-[#EBD699] text-[#070707] text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
              >
                Demander une fiche blindage
              </button>
            </Magnet>
          </div>
        </div>

        <div className="arm-figs mt-16 md:mt-24 grid sm:grid-cols-3 border-t border-[#C9A24B]/25">
          {FIGURES.map((f) => (
            <div key={f.v} className="arm-fig py-8 sm:px-8 first:sm:pl-0 sm:border-l first:sm:border-l-0 border-[#C9A24B]/25">
              <div className="font-display font-light text-4xl md:text-6xl text-[#F4F1EA]">{f.v}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-[#A8A398]">{f.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
