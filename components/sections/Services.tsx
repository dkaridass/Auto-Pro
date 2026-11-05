'use client';

import React, { useRef } from 'react';
import SplitHeading from '@/components/SplitHeading';
import { gsap, NO_REDUCED_MOTION, useGSAP } from '@/lib/gsap';

const SERVICES = [
  { n: '01', t: 'Neuf & occasion récente', d: 'Un stock permanent de 4x4 et de berlines, chacun tracé et contrôlé mécaniquement de fond en comble.' },
  { n: '02', t: 'Importation sur commande', d: "Japon, États-Unis, Afrique du Sud : nous trouvons le véhicule exact que vous voulez et l'acheminons par voie maritime et terrestre sécurisée." },
  { n: '03', t: 'Dédouanement & plaques', d: "DGDA, droits fiscaux DGI, plaques d'immatriculation du Katanga : nous réglons toutes les formalités à votre place." },
  { n: '04', t: "Entretien & pièces d'origine", d: "Service après-vente, diagnostic électronique multimarque et pièces d'origine constructeur livrées rapidement." },
];

export default function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(NO_REDUCED_MOTION, () => {
        gsap.utils.toArray<HTMLElement>('.svc-row').forEach((row) => {
          gsap.from(row.querySelector('.svc-line'), {
            scaleX: 0,
            transformOrigin: 'left',
            duration: 1.4,
            ease: 'power4.out',
            scrollTrigger: { trigger: row, start: 'top 88%', once: true },
          });
          gsap.from(row.querySelectorAll('.svc-in'), {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 88%', once: true },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="services" ref={root} className="relative bg-[#0a0a0a] py-24 md:py-36">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8">
        <div className="flex items-center gap-3 text-[11px] tracking-[0.25em] uppercase text-[#C9A24B] font-semibold mb-3">
          <span className="font-mono">(02)</span>
          <span className="w-8 h-[1.5px] bg-[#C9A24B]" />
          <span>Nos services en concession</span>
        </div>
        <SplitHeading as="h2" onScroll className="font-display font-light uppercase tracking-[-0.02em] leading-[0.95] text-[clamp(2.6rem,6.5vw,6.5rem)] max-w-5xl">
          De la commande à la plaque.
        </SplitHeading>

        <div className="mt-14 md:mt-20">
          {SERVICES.map((s) => (
            <article key={s.n} className="svc-row group relative isolate overflow-hidden cursor-default">
              <div className="svc-line absolute top-0 inset-x-0 h-px bg-[#C9A24B]/40" />
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#C9A24B] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              <div className="grid grid-cols-12 gap-x-6 items-center py-8 md:py-12 px-1 md:px-4 transition-colors duration-500 group-hover:text-[#070707]">
                <div className="svc-in col-span-3 md:col-span-2">
                  <span className="block font-display text-5xl md:text-8xl font-light leading-none text-transparent [-webkit-text-stroke:1px_rgba(201,162,75,0.6)] group-hover:[-webkit-text-stroke:1px_#070707] [transition:-webkit-text-stroke-color_0.5s]">
                    {s.n}
                  </span>
                </div>
                <div className="svc-in col-span-9 md:col-span-5">
                  <h3 className="font-display font-light text-2xl md:text-5xl leading-tight transition-transform duration-500 group-hover:translate-x-2">
                    {s.t}
                  </h3>
                </div>
                <div className="svc-in col-span-12 md:col-span-5 mt-4 md:mt-0">
                  <p className="text-sm md:text-base leading-relaxed text-[#B5B0A4] group-hover:text-[#070707]/80 transition-colors duration-500">
                    {s.d}
                  </p>
                </div>
              </div>
            </article>
          ))}
          <div className="h-px bg-[#C9A24B]/40" />
        </div>
      </div>
    </section>
  );
}
