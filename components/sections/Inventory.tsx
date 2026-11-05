'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import SplitHeading from '@/components/SplitHeading';
import SpotlightCard from '@/components/SpotlightCard';
import { gsap, NO_REDUCED_MOTION, useGSAP } from '@/lib/gsap';
import type { Vehicle } from '@/lib/vehicles';

type Filter = 'all' | Vehicle['category'];

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'Tous' },
  { key: 'suv', label: '4x4 & SUV' },
  { key: 'truck', label: 'Pickups & Trucks' },
  { key: 'armoured', label: 'Blindés VR7' },
  { key: 'luxury', label: 'Luxe & Maybach' },
];

interface Props {
  vehicles: Vehicle[];
  onOpen: (v: Vehicle) => void;
  onContact: (name: string) => void;
}

export default function Inventory({ vehicles, onOpen, onContact }: Props) {
  const [filter, setFilter] = useState<Filter>('all');
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  const list = filter === 'all' ? vehicles : vehicles.filter((v) => v.category === filter);

  // Desktop: the section pins and the cars glide past horizontally as you scroll.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const t = track.current!;
        const distance = () => Math.max(0, t.scrollWidth - pin.current!.clientWidth);
        if (distance() <= 0) return;
        const tween = gsap.to(t, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        gsap.utils.toArray<HTMLElement>('.inv-img').forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -7 },
            {
              xPercent: 7,
              ease: 'none',
              scrollTrigger: { trigger: img.closest('.inv-card'), containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
            }
          );
        });
      });
      mm.add(NO_REDUCED_MOTION, () => {
        gsap.from('.inv-card', {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '.inv-track', start: 'top 85%', once: true },
        });
      });
    },
    { scope: root, dependencies: [filter], revertOnUpdate: true }
  );

  return (
    <section id="inventory" ref={root} className="relative bg-[#070707]">
      <div ref={pin} className="lg:h-[100svh] lg:overflow-hidden flex flex-col pt-20 pb-16 lg:pb-8">
        <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-8">
          <div>
            <div className="flex items-center gap-3 text-[11px] tracking-[0.25em] uppercase text-[#C9A24B] font-semibold mb-3">
              <span className="font-mono">(01)</span>
              <span className="w-8 h-[1.5px] bg-[#C9A24B]" />
              <span>Stock & disponibilités</span>
            </div>
            <SplitHeading as="h2" onScroll className="font-display font-light uppercase tracking-[-0.02em] leading-[0.95] text-[clamp(2.6rem,6.5vw,6.5rem)]">
              La collection.
            </SplitHeading>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <div className="flex flex-wrap items-center gap-2 text-xs tracking-wider uppercase">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  aria-pressed={filter === f.key}
                  className={`min-h-11 md:min-h-0 px-4 py-2 rounded-full transition-all ${
                    filter === f.key ? 'bg-[#C9A24B] text-[#070707] font-semibold' : 'text-[#B5B0A4] hover:text-[#F4F1EA] border border-white/15'
                  }`}
                >
                  {f.label}
                  {f.key === 'all' ? ` (${vehicles.length})` : ''}
                </button>
              ))}
            </div>
            <span className="hidden lg:block font-mono text-[10px] tracking-[0.25em] uppercase text-[#8E8A80]">Défilez pour explorer →</span>
          </div>
        </div>

        <div className="w-full flex-1 min-h-0 overflow-visible">
          <div
            ref={track}
            className="inv-track flex flex-col lg:flex-row lg:w-max gap-5 lg:gap-6 px-5 sm:px-8 lg:h-full lg:pr-[8vw] max-w-[1600px] mx-auto lg:max-w-none lg:mx-0"
          >
            {list.map((car, i) => (
              <SpotlightCard
                key={car.id}
                className="inv-card group shrink-0 w-full lg:w-[min(58vw,820px)] aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden luxury-slate-card border border-[#C9A24B]/20 hover:border-[#C9A24B]/60 transition-colors"
              >
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="inv-img object-cover lg:scale-[1.18] transition-[filter] duration-700 group-hover:brightness-110"
                  referrerPolicy="no-referrer"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/40 to-black/20" />

                <span aria-hidden="true" className="absolute top-3 left-5 font-display text-[5.5rem] lg:text-[8rem] leading-none font-light text-transparent [-webkit-text-stroke:1px_rgba(244,241,234,0.45)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="absolute top-5 right-5 flex items-center gap-2">
                  <span className="px-2.5 py-1 text-[9px] uppercase tracking-wider font-semibold bg-[#070707]/85 text-[#EBD699] border border-[#C9A24B]/40">{car.status}</span>
                  <span className="font-mono text-xs text-white/90 bg-black/70 px-2 py-0.5 border border-white/10">{car.year}</span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-9">
                  <div className="flex items-center gap-4 text-[11px] uppercase tracking-wider font-mono text-[#A8A398] mb-2">
                    <span>{car.engine}</span>
                    <span className="text-[#C9A24B] font-semibold">{car.power}</span>
                  </div>
                  <h3 className="font-display font-light text-2xl sm:text-3xl lg:text-4xl leading-tight text-[#F4F1EA] max-w-2xl">{car.name}</h3>
                  <p className="mt-3 text-sm text-[#C5BFB3] max-w-xl leading-relaxed line-clamp-2">{car.description}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onOpen(car)}
                      className="min-h-11 md:min-h-0 px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase border border-white/30 hover:border-[#C9A24B] text-[#F4F1EA] hover:text-[#C9A24B] transition-colors"
                    >
                      Voir la fiche
                    </button>
                    <button
                      onClick={() => onContact(car.name)}
                      className="min-h-11 md:min-h-0 px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase bg-[#C9A24B] hover:bg-[#EBD699] text-[#070707] font-semibold transition-colors"
                    >
                      Contacter
                    </button>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
