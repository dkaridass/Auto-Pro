'use client';

import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import VantaBackground from '@/components/VantaBackground';
import Magnet from '@/components/Magnet';
import LubumbashiClock from '@/components/LubumbashiClock';
import { gsap, NO_REDUCED_MOTION, useGSAP } from '@/lib/gsap';

const emptySubscribe = () => () => {};

const HIGHLIGHTS = [
  { t: 'Sélection & Import', d: 'Toyota, RAM, Lexus, Mercedes & Range Rover, en stock ou sur commande.' },
  { t: 'Pensé pour le Katanga', d: 'Refroidissement renforcé et double filtration carburant.' },
  { t: 'Dédouanement clé en main', d: 'Formalités DGDA, quitus fiscal et immatriculation inclus.' },
  { t: 'Division Blindée', d: 'Véhicules certifiés CEN B6 / VR7 pour axes et sites miniers.' },
];

type Paint = { rgb: [number, number, number]; metal: number; rough: number };
const GOLD: [number, number, number] = [0.584, 0.361, 0.07]; // #C9A24B in linear space
const PAINT: Record<string, Paint> = {
  Body_Color: { rgb: [0.012, 0.012, 0.014], metal: 0.95, rough: 0.16 }, // gloss black
  Ferrari_Yellow: { rgb: GOLD, metal: 1, rough: 0.28 },
  metal_chrome: { rgb: GOLD, metal: 1, rough: 0.22 },
  metal_gray: { rgb: [0.42, 0.26, 0.05], metal: 1, rough: 0.35 },
  _0098_DodgerBlue: { rgb: GOLD, metal: 1, rough: 0.3 },
  Turn_Signal_LED: { rgb: GOLD, metal: 0.4, rough: 0.4 },
  Taillight_Glass: { rgb: [0.35, 0.16, 0.02], metal: 0.2, rough: 0.2 },
  Leather_red: { rgb: [0.03, 0.02, 0.015], metal: 0.1, rough: 0.6 },
  Glass_Gray: { rgb: [0.015, 0.015, 0.02], metal: 0.6, rough: 0.05 }, // smoked glass
  Projector_Glass: { rgb: [0.05, 0.045, 0.035], metal: 0.5, rough: 0.05 },
  Interior_light: { rgb: [0.07, 0.05, 0.03], metal: 0.1, rough: 0.6 },
  Carpet: { rgb: [0.03, 0.025, 0.02], metal: 0, rough: 0.9 },
  Carbon_Fiber: { rgb: [0.05, 0.05, 0.055], metal: 0.6, rough: 0.3 },
};

/** Repaint the showroom model in the brand palette: black body, gold wheels and details. */
function applyBrandPaint(el: HTMLElement & { model?: { materials: { name: string; pbrMetallicRoughness: { setBaseColorFactor: (c: number[]) => void; setMetallicFactor: (v: number) => void; setRoughnessFactor: (v: number) => void; baseColorFactor: number[] } }[] } }) {
  el.model?.materials.forEach((m) => {
    const p = PAINT[m.name];
    if (!p) return;
    const alpha = m.pbrMetallicRoughness.baseColorFactor[3] ?? 1;
    m.pbrMetallicRoughness.setBaseColorFactor([...p.rgb, alpha]);
    m.pbrMetallicRoughness.setMetallicFactor(p.metal);
    m.pbrMetallicRoughness.setRoughnessFactor(p.rough);
  });
}

/** On narrow screens the car is width-limited, so zoom the camera out (radius x2). */
function orbitFor(orbit: string, small: boolean) {
  if (!small) return orbit;
  return orbit.replace(/(\d+)%$/, (_, r) => `${Number(r) * 2}%`);
}

const ORBITS = [
  { label: '3/4 Face', orbit: '45deg 75deg 105%', key: '45deg' },
  { label: 'Profil', orbit: '90deg 80deg 110%', key: '90deg' },
  { label: 'Face', orbit: '0deg 75deg 100%', key: '0deg' },
];

function Highlights({ className }: { className?: string }) {
  return (
    <div className={className}>
      {HIGHLIGHTS.map((h) => (
        <div key={h.t} className="p-4 md:p-5 border-l border-[#C9A24B]/20 first:border-l-0">
          <span className="block text-[11px] uppercase tracking-[0.18em] text-[#C9A24B] font-semibold">{h.t}</span>
          <p className="mt-1.5 text-[12px] leading-relaxed text-[#B5B0A4]">{h.d}</p>
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const mv = useRef<HTMLElement & { cameraOrbit?: string }>(null);
  const [cameraOrbit, setCameraOrbit] = useState('45deg 75deg 105%');
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [small, setSmall] = useState(false);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const apply = () => setSmall(mq.matches); // phones: pull the camera back so the whole car fits
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    const el = mv.current as (HTMLElement & Parameters<typeof applyBrandPaint>[0] & { loaded?: boolean }) | null;
    if (!el) return;
    const paint = () => applyBrandPaint(el);
    if (el.loaded) paint();
    el.addEventListener('load', paint);
    return () => el.removeEventListener('load', paint);
  }, [mounted]);

  const setCamera = (orbit: string) => {
    setCameraOrbit(orbit);
    if (mv.current) mv.current.cameraOrbit = orbitFor(orbit, small);
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(NO_REDUCED_MOTION, () => {
        gsap
          .timeline({ delay: 2.1 })
          .from('.h-line-inner', { yPercent: 118, duration: 1.4, ease: 'power4.out', stagger: 0.14 })
          .from('.h-fade', { opacity: 0, y: 24, duration: 1, stagger: 0.1, ease: 'power3.out' }, '-=0.9')
          .from('.h-car-intro', { opacity: 0, scale: 0.88, duration: 1.8, ease: 'power3.out' }, '-=1.6');
      });

      // Desktop: pin the hero and let scrolling drive the whole scene.
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        setIsAutoRotate(false);
        const orbit = { az: 45 };
        gsap
          .timeline({
            scrollTrigger: { trigger: root.current, start: 'top top', end: '+=170%', scrub: 1, pin: true, anticipatePin: 1 },
          })
          .to('.h-l1', { xPercent: 4, ease: 'none' }, 0)
          .to('.h-l2', { xPercent: -3, ease: 'none' }, 0)
          .to('.h-l3', { xPercent: -5, ease: 'none' }, 0)
          .to('.h-car', { scale: 1.22, yPercent: -4, ease: 'none' }, 0)
          .to(
            orbit,
            {
              az: 225,
              ease: 'none',
              onUpdate: () => {
                if (mv.current) mv.current.cameraOrbit = `${orbit.az}deg 75deg 105%`;
              },
            },
            0
          )
          .to('.h-cta', { opacity: 0, y: -24, ease: 'none', duration: 0.25 }, 0.05)
          .fromTo('.h-highlights', { opacity: 0, y: 70 }, { opacity: 1, y: 0, ease: 'none', duration: 0.35 }, 0.5);
        return () => setIsAutoRotate(true);
      });
    },
    { scope: root }
  );

  return (
    <>
      <section id="hero" ref={root} className="relative h-[100svh] min-h-[640px] overflow-hidden border-b border-[#C9A24B]/15">
        <VantaBackground className="absolute inset-0 z-0 opacity-45 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]" />
        <div
          aria-hidden="true"
          className="absolute left-1/2 bottom-[-20%] -translate-x-1/2 w-[90vw] h-[60vh] bg-[radial-gradient(ellipse_at_center,rgba(201,162,75,0.22),transparent_65%)] pointer-events-none"
        />

        <div className="relative z-10 h-full max-w-[1600px] mx-auto px-5 sm:px-8 pt-24 md:pt-28">
          <div className="h-fade flex items-center justify-between gap-3 text-[11px] tracking-[0.16em] sm:tracking-[0.25em] uppercase text-[#C9A24B] font-semibold">
            <span className="flex items-center gap-2">
              <span className="w-6 h-[1.5px] bg-[#C9A24B]" />
              Lubumbashi — Haut-Katanga
            </span>
            <span className="flex items-center gap-2 font-mono text-[#B5B0A4] tracking-[0.18em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] animate-pulse" />
              <LubumbashiClock />
            </span>
          </div>

          <h1 className="mt-5 font-display uppercase font-light leading-[0.9] tracking-[-0.03em] text-[clamp(2.2rem,11.8vw,5rem)] md:text-[clamp(2.9rem,9.6vw,11rem)]">
            <span className="h-l1 [filter:drop-shadow(0_0_16px_rgba(7,7,7,0.95))] relative z-0 block overflow-hidden py-[0.04em]">
              <span className="h-line-inner block">L&apos;automobile</span>
            </span>
            <span className="h-l2 [filter:drop-shadow(0_0_16px_rgba(7,7,7,0.95))] relative z-0 block overflow-hidden py-[0.04em] pl-[7vw]">
              <span className="h-line-inner block italic font-normal shiny-text">d&apos;exception</span>
            </span>
            <span className="h-l3 [filter:drop-shadow(0_0_16px_rgba(7,7,7,0.95))] relative z-0 block overflow-hidden py-[0.04em] text-right">
              <span className="h-line-inner block">au Katanga.</span>
            </span>
          </h1>

          {/* The car sits between the type: behind the front lines, in front of the middle one */}
          <div className="h-car-intro absolute inset-x-0 top-[33%] bottom-[12.5rem] md:bottom-0 md:top-[36%] z-10">
            <div className="h-car w-full h-full">
              {mounted ? (
                <model-viewer
                  ref={mv as React.Ref<HTMLElement>}
                  id="showroom-model-viewer"
                  src="/models/ferrari.glb"
                  alt="Véhicule en vue 3D interactive — showroom Auto Pro DRC"
                  auto-rotate={isAutoRotate ? '' : undefined}
                  auto-rotate-delay="1000"
                  rotation-per-second="20deg"
                  camera-controls
                  disable-zoom
                  touch-action="pan-y"
                  camera-orbit={orbitFor(cameraOrbit, small)}
                  field-of-view="32deg"
                  environment-image="neutral"
                  exposure="1.25"
                  shadow-intensity="1.8"
                  shadow-softness="0.75"
                  interaction-prompt="none"
                  className="w-full h-full cursor-grab active:cursor-grabbing"
                  suppressHydrationWarning
                >
                  <div slot="poster" className="flex items-center justify-center w-full h-full text-xs uppercase tracking-[0.25em] text-[#C9A24B]/60 font-mono">
                    Chargement du véhicule 3D…
                  </div>
                </model-viewer>
              ) : (
                <div className="flex items-center justify-center w-full h-full text-xs uppercase tracking-[0.25em] text-[#C9A24B] font-mono">
                  Chargement du showroom 3D…
                </div>
              )}
            </div>
          </div>

          {/* CTAs */}
          <div className="h-cta absolute z-30 left-5 right-5 sm:left-8 bottom-5 md:bottom-8 flex flex-col sm:flex-row sm:items-center gap-3 md:right-auto">
            <Magnet>
              <a
                href="#inventory"
                className="inline-flex w-full items-center justify-center min-h-11 px-7 py-3.5 text-xs tracking-[0.22em] uppercase bg-[#C9A24B] hover:bg-[#EBD699] text-[#070707] font-semibold transition-colors shadow-[0_0_30px_rgba(201,162,75,0.3)]"
              >
                Explorer la collection
              </a>
            </Magnet>
            <Magnet>
              <a
                href="#contact"
                className="inline-flex w-full items-center justify-center min-h-11 px-7 py-3.5 text-xs tracking-[0.22em] uppercase border border-[#C9A24B]/50 hover:border-[#C9A24B] bg-[#070707]/50 backdrop-blur text-[#F4F1EA] hover:text-[#C9A24B] transition-colors"
              >
                Rencontrer l&apos;équipe
              </a>
            </Magnet>
          </div>

          {/* Camera */}
          <div className="h-fade absolute z-30 right-5 sm:right-8 bottom-[8.5rem] sm:bottom-[5.5rem] md:bottom-[9.5rem] flex items-center gap-1 px-2 py-1 bg-[#070707]/80 border border-[#C9A24B]/30 backdrop-blur-md text-[10px] tracking-[0.18em] uppercase">
            {ORBITS.map((o) => (
              <button
                key={o.key}
                onClick={() => setCamera(o.orbit)}
                className={`min-h-11 pointer-fine:min-h-0 px-2 py-1 transition-colors ${
                  cameraOrbit.startsWith(o.key) ? 'bg-[#C9A24B]/20 text-[#C9A24B] border border-[#C9A24B]/40' : 'text-[#A8A398] hover:text-[#F4F1EA]'
                }`}
              >
                {o.label}
              </button>
            ))}
            <button
              onClick={() => setIsAutoRotate(!isAutoRotate)}
              className={`min-h-11 pointer-fine:min-h-0 px-2 py-1 font-mono ${isAutoRotate ? 'text-[#C9A24B] font-semibold' : 'text-[#8E8A80]'}`}
            >
              {isAutoRotate ? '● Rotation' : '○ Pause'}
            </button>
          </div>

          {/* Revealed by scroll on desktop */}
          <Highlights className="h-highlights hidden md:grid motion-reduce:md:hidden grid-cols-4 absolute z-30 inset-x-5 sm:inset-x-8 bottom-6 bg-[#070707]/80 backdrop-blur-md border border-[#C9A24B]/20 opacity-0" />
        </div>
      </section>

      <Highlights className="grid grid-cols-2 md:hidden motion-reduce:md:grid motion-reduce:md:grid-cols-4 border-b border-[#C9A24B]/15 bg-[#090909]" />
    </>
  );
}
