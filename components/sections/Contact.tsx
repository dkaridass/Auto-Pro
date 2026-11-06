'use client';

import React, { useState } from 'react';
import SplitHeading from '@/components/SplitHeading';
import Reveal from '@/components/Reveal';
import { VEHICLES } from '@/lib/vehicles';

const link = 'flex sm:inline-flex items-center min-h-11 pointer-fine:min-h-0 hover:text-[#C9A24B] transition-colors break-all sm:break-normal';
const field =
  'w-full bg-transparent border-0 border-b border-[#C9A24B]/40 text-[#F4F1EA] py-3 text-base focus:outline-none focus:border-[#C9A24B] rounded-none transition-colors placeholder:text-neutral-500';

export default function Contact({ onContact }: { onContact: (text: string) => void }) {
  const [marque, setMarque] = useState(VEHICLES[0].name);
  const [note, setNote] = useState('');

  const rows: [string, React.ReactNode][] = [
    ['Adresse', '100, Chaussée Laurent Désiré Kabila, Lubumbashi, RDC'],
    ['Téléphone', (
      <>
        <a href="tel:+243992099990" className={link}>+243 992 099 990</a>
        <span className="hidden sm:inline mx-2 text-neutral-600">/</span>
        <a href="tel:+243901310000" className={link}>+243 901 310 000</a>
      </>
    )],
    ['WhatsApp', (
      <>
        <a href="https://wa.me/243992099990" target="_blank" rel="noreferrer" className={link}>+243 992 099 990</a>
        <span className="hidden sm:inline mx-2 text-neutral-600">/</span>
        <a href="https://wa.me/243901310000" target="_blank" rel="noreferrer" className={link}>+243 901 310 000</a>
      </>
    )],
    ['Email', <a key="m" href="mailto:contact@autopro-rdc.com" className={link}>contact@autopro-rdc.com</a>],
    ['Horaires', 'Lundi – Samedi : 08h30 – 17h30'],
    ['Villes', 'Lubumbashi • Likasi • Kolwezi'],
  ];

  return (
    <section id="contact" className="relative bg-[#090909] py-24 md:py-40">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8">
        <div className="flex items-center gap-3 text-[11px] tracking-[0.25em] uppercase text-[#C9A24B] font-semibold mb-3">
          <span className="font-mono">(04)</span>
          <span className="w-8 h-[1.5px] bg-[#C9A24B]" />
          <span>Showroom principal</span>
        </div>
        <SplitHeading as="h2" onScroll className="font-display font-light uppercase tracking-[-0.03em] leading-[0.88] text-[clamp(3.2rem,12vw,13rem)]">
          Venez <span className="italic font-normal shiny-text">voir.</span>
        </SplitHeading>

        <div className="mt-16 md:mt-24 grid lg:grid-cols-12 gap-14 lg:gap-20">
          <Reveal className="lg:col-span-6">
            <p className="text-base md:text-lg text-[#C5BFB3] font-light leading-relaxed max-w-xl mb-10">
              Passez au showroom pour découvrir nos véhicules en stock, ou configurez avec notre équipe une commande entièrement sur mesure.
            </p>
            <dl>
              {rows.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[7rem_1fr] sm:grid-cols-[9rem_1fr] gap-4 py-4 border-t border-white/10 text-sm sm:text-base">
                  <dt className="font-mono text-xs uppercase tracking-wider text-[#C9A24B] pt-3 sm:pt-1">{k}</dt>
                  <dd className="text-[#F4F1EA]">{v}</dd>
                </div>
              ))}
              <div className="border-t border-white/10" />
            </dl>
          </Reveal>

          <Reveal className="lg:col-span-6" delay={0.1}>
            <div className="luxury-slate-card border border-[#C9A24B]/30 p-6 sm:p-10">
              <span className="text-xs uppercase tracking-[0.2em] text-[#C9A24B] font-semibold block mb-2">Une demande ? Une commande ?</span>
              <p className="text-sm text-[#A8A398] mb-8">Choisissez un véhicule : sa disponibilité et sa fiche technique vous arrivent sur WhatsApp.</p>
              <div className="space-y-7">
                <div>
                  <label htmlFor="vehicle-select" className="block uppercase tracking-wider text-[#C5BFB3] text-[11px] font-medium">Véhicule souhaité</label>
                  <select id="vehicle-select" value={marque} onChange={(e) => setMarque(e.target.value)} className={field}>
                    {VEHICLES.map((v) => (
                      <option key={v.id} value={v.name} className="bg-[#111]">{v.name} ({v.year})</option>
                    ))}
                    <option value="Autre Modèle sur Commande" className="bg-[#111]">Autre modèle spécifique sur commande</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="custom-notes" className="block uppercase tracking-wider text-[#C5BFB3] text-[11px] font-medium">Précisions (optionnel)</label>
                  <textarea
                    id="custom-notes"
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Ex : délai de livraison, blindage B6, livraison à Kolwezi…"
                    className={field}
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onContact(`${marque}${note ? ` (Note: ${note})` : ''}`)}
                    className="w-full min-h-11 py-4 bg-[#C9A24B] hover:bg-[#EBD699] text-[#070707] font-semibold text-xs uppercase tracking-[0.2em] transition-colors"
                  >
                    Envoyer ma demande via WhatsApp
                  </button>
                  <span className="block text-center text-[11px] text-[#A8A398] mt-3">Réponse rapide de l&apos;équipe commerciale Auto Pro DRC</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
