'use client';

import React, { useEffect, useState } from 'react';
import { AutoProLogo } from '@/components/AutoProLogo';
import MobileNav from '@/components/MobileNav';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollProgress from '@/components/ScrollProgress';
import Preloader from '@/components/Preloader';
import CursorRing from '@/components/CursorRing';
import Marquee from '@/components/Marquee';
import Hero from '@/components/sections/Hero';
import Inventory from '@/components/sections/Inventory';
import Services from '@/components/sections/Services';
import Armoured from '@/components/sections/Armoured';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import { VEHICLES, type Vehicle } from '@/lib/vehicles';
import { openWhatsApp } from '@/lib/whatsapp';

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function AutoProDRCPage() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeDossier, setActiveDossier] = useState<Vehicle | null>(null);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Car detail modal: Esc to close + lock background scroll
  useEffect(() => {
    if (!activeDossier) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveDossier(null);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [activeDossier]);

  return (
    <div className="relative bg-[#070707] text-[#F4F1EA] selection:bg-[#C9A24B] selection:text-black min-h-screen font-sans-editorial overflow-x-clip">
      <Preloader />
      <CursorRing />
      <SmoothScroll />
      <ScrollProgress />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[80] opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />

      {/* ========================================================= */}
      {/* HEADER & NAVIGATION                                      */}
      {/* ========================================================= */}
      <header
        id="navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          navScrolled 
            ? 'bg-[#070707]/95 backdrop-blur-md border-b border-[#C9A24B]/20 py-3 shadow-xl' 
            : 'bg-transparent py-5 border-b border-white/[0.05]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 sm:gap-3 group focus:outline-none min-w-0 min-h-11" aria-label="Auto Pro DRC Accueil">
            <AutoProLogo className="w-10 h-10 transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col min-w-0">
              <span className="font-display text-sm sm:text-lg tracking-[0.16em] sm:tracking-[0.25em] whitespace-nowrap font-semibold text-[#F4F1EA] uppercase">
                AUTO PRO <span className="text-[#C9A24B]">DRC</span>
              </span>
              <span className="hidden xl:block xl:whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-[#A8A398]">
                Concessionnaire Automobile • Lubumbashi
              </span>
            </div>
          </a>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-6 xl:px-6 xl:whitespace-nowrap text-xs tracking-[0.2em] uppercase text-[#C4C0B5] font-medium">
            <a href="#inventory" className="inline-flex items-center min-h-11 pointer-fine:min-h-0 hover:text-[#C9A24B] transition-colors">
              Collection
            </a>
            <a href="#services" className="inline-flex items-center min-h-11 pointer-fine:min-h-0 hover:text-[#C9A24B] transition-colors">
              Services
            </a>
            <a href="#armoured" className="inline-flex items-center min-h-11 pointer-fine:min-h-0 hover:text-[#C9A24B] transition-colors">
              Blindés
            </a>
            <a href="#contact" className="inline-flex items-center min-h-11 pointer-fine:min-h-0 hover:text-[#C9A24B] transition-colors">
              Contact
            </a>
          </nav>

          {/* Direct WhatsApp Callout */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/243992099990"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center justify-center min-h-11 pointer-fine:min-h-0 px-4 py-2 text-xs tracking-[0.2em] uppercase text-[#070707] bg-[#C9A24B] hover:bg-[#EBD699] font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(201,162,75,0.2)]"
            >
              WhatsApp Direct
            </a>
            <MobileNav />
          </div>

        </div>
      </header>

      <main>
        <Hero />
        <Marquee items={['Toyota', 'Lexus', 'Mercedes-Benz', 'Range Rover', 'RAM', 'Maybach']} />
        <Inventory vehicles={VEHICLES} onOpen={setActiveDossier} onContact={openWhatsApp} />
        <Services />
        <Armoured onContact={openWhatsApp} />
        <Contact onContact={openWhatsApp} />
      </main>
      <Footer />

      {/* ========================================================= */}
      {/* VEHICLE DETAILS MODAL (NO PRICE)                          */}
      {/* ========================================================= */}
      {activeDossier && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveDossier(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dossier-title"
            className="relative w-full max-w-xl bg-[#0d0d0d] border border-[#C9A24B]/50 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between border-b border-[#C9A24B]/20 pb-3 mb-4">
              <div>
                <span className="text-[10px] tracking-wider uppercase text-[#C9A24B] font-semibold block">
                  FICHE VÉHICULE EN CONCESSION
                </span>
                <h3 id="dossier-title" className="font-display text-2xl text-[#F4F1EA] font-normal">
                  {activeDossier.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveDossier(null)}
                aria-label="Fermer la fiche véhicule"
                className="min-h-11 min-w-11 pointer-fine:min-h-0 pointer-fine:min-w-0 text-neutral-400 hover:text-white p-1 text-lg font-mono"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-[#B5B0A4]">
              <p className="leading-relaxed text-sm">
                {activeDossier.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/[0.08]">
                <div>
                  <span className="text-[10px] uppercase text-[#8E8A80] block">Moteur</span>
                  <span className="text-[#F4F1EA] font-mono text-xs">{activeDossier.engine}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#8E8A80] block">Puissance</span>
                  <span className="text-[#C9A24B] font-mono text-xs">{activeDossier.power}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#8E8A80] block">Transmission</span>
                  <span className="text-[#F4F1EA] text-xs">{activeDossier.specs.transmission}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#8E8A80] block">Transmission / Motricité</span>
                  <span className="text-[#F4F1EA] text-xs">{activeDossier.specs.drivetrain}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] uppercase text-[#8E8A80] block">Provenance</span>
                  <span className="text-[#EBD699] text-xs">{activeDossier.provenance}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] uppercase text-[#8E8A80] block">Statut Douanier DGDA</span>
                  <span className="text-[#C9A24B] text-xs">{activeDossier.customsStatus}</span>
                </div>
                {activeDossier.specs.armourLevel && (
                  <div className="col-span-2 bg-[#C9A24B]/10 border border-[#C9A24B]/30 p-2.5">
                    <span className="text-[10px] uppercase text-[#C9A24B] font-bold block">Certification Blindage</span>
                    <span className="text-white font-mono text-xs">{activeDossier.specs.armourLevel}</span>
                  </div>
                )}
              </div>

              {/* Actions (No Price!) */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-[#C9A24B] font-medium">
                  {activeDossier.status} • Lubumbashi
                </span>

                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      openWhatsApp(activeDossier.name);
                      setActiveDossier(null);
                    }}
                    className="min-h-11 pointer-fine:min-h-0 px-4 py-2 bg-[#C9A24B] hover:bg-[#EBD699] text-[#070707] font-semibold uppercase tracking-wider text-[11px]"
                  >
                    Contacter sur WhatsApp
                  </button>
                  <button
                    onClick={() => setActiveDossier(null)}
                    className="min-h-11 pointer-fine:min-h-0 px-3 py-2 border border-white/20 hover:border-white text-white uppercase tracking-wider text-[11px]"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}


    </div>
  );
}
