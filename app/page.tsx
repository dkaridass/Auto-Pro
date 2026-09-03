'use client';

import React, { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { AutoProLogo } from '@/components/AutoProLogo';

const emptySubscribe = () => () => {};

interface Vehicle {
  id: string;
  name: string;
  year: number;
  category: 'suv' | 'truck' | 'armoured' | 'luxury';
  engine: string;
  power: string;
  provenance: string;
  customsStatus: string;
  image: string;
  status: 'En Showroom' | 'Disponible' | 'En Transit' | 'Réservé';
  colSpan: string;
  description: string;
  specs: {
    transmission: string;
    drivetrain: string;
    fuel: string;
    interior: string;
    armourLevel?: string;
  };
}

const VEHICLES: Vehicle[] = [
  {
    id: 'ram-1500-trx',
    name: 'RAM 1500 TRX 6.2L Supercharged HEMI V8 (702 HP)',
    year: 2024,
    category: 'truck',
    engine: '6.2L Supercharged HEMI V8 SRT',
    power: '702 HP / 881 Nm',
    provenance: 'USA • Importation Spéciale Lubumbashi',
    customsStatus: 'Dédouanement DGDA Réglé • Prêt pour Immatriculation',
    image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?q=80&w=1400&auto=format&fit=crop',
    status: 'En Showroom',
    colSpan: 'lg:col-span-8',
    description: 'Le super-pickup haute performance de référence à Lubumbashi. Amortisseurs Bilstein Black Hawk e2 à réservoirs déportés, filtration anti-poussière renforcée et 8 modes tout-terrain.',
    specs: {
      transmission: 'Automatique 8 Rapports TorqueFlite',
      drivetrain: '4x4 Permanent avec Boîte de Transfert BorgWarner',
      fuel: 'Essence V8 Supercharged',
      interior: 'Cuir Pleine Fleur & Alcantara Noir avec Surpiqûres TRX',
    },
  },
  {
    id: 'land-cruiser-300-vx',
    name: 'Toyota Land Cruiser 300 VX Twin-Turbo V6 Diesel',
    year: 2024,
    category: 'suv',
    engine: '3.3L Twin-Turbo V6 Diesel (F33A-FTV)',
    power: '304 HP / 700 Nm',
    provenance: 'Japon • Réseau Constructeur Officiel',
    customsStatus: 'Dédouanement DGDA Complet • Plaques Katanga Incluses',
    image: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?q=80&w=1400&auto=format&fit=crop',
    status: 'Disponible',
    colSpan: 'lg:col-span-4',
    description: 'Le SUV de référence pour les trajets routiers et les pistes du Katanga. Climatisation tropicalisée quadri-zone, 4WD permanent MTS et double réservoir 110 litres.',
    specs: {
      transmission: 'Automatique Direct Shift 10 Rapports',
      drivetrain: '4WD Permanent avec Blocage Central',
      fuel: 'Diesel Tropicalisé (Double Filtration)',
      interior: 'Cuir Beige Premium avec Écran Tactile 12.3" & Audio JBL',
    },
  },
  {
    id: 'land-cruiser-300-vr7',
    name: 'Toyota Land Cruiser 300 GR-Sport VR7 / B6 Blindé',
    year: 2025,
    category: 'armoured',
    engine: '3.3L Twin-Turbo V6 Diesel Heavy-Duty',
    power: '304 HP / 700 Nm',
    provenance: 'Division Balistique Spéciale • Homologation RDC',
    customsStatus: 'Certificat Balistique Officiel & Formalités DGDA Clé en Main',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1400&auto=format&fit=crop',
    status: 'Disponible',
    colSpan: 'lg:col-span-7',
    description: 'Châssis blindé conçu pour la sécurisation des convois sur les axes Lubumbashi–Likasi–Kolwezi. Acier balistique certifié CEN B6 / VPAM VR7, plancher anti-mines et roues run-flat.',
    specs: {
      transmission: 'Automatique 10 Rapports Renforcée',
      drivetrain: '4WD Permanent avec Suspensions Anti-Affaissement',
      fuel: 'Diesel Heavy-Duty',
      interior: 'Cuir GR-Sport avec Système Interphone de Sécurité',
      armourLevel: 'Certification CEN B6 / VPAM VR7 (Munitions 7.62mm & Déflagrations)',
    },
  },
  {
    id: 'toyota-prado-txl',
    name: 'Toyota Land Cruiser Prado TXL 2.8L Diesel (2024)',
    year: 2024,
    category: 'suv',
    engine: '2.8L 4-Cylindres D-4D Turbo Diesel (1GD-FTV)',
    power: '204 HP / 500 Nm',
    provenance: 'Japon • Spécification Tropicale Afrique Centrale',
    customsStatus: 'Dédouanement DGDA Réglé • Prêt pour Livraison',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop',
    status: 'En Showroom',
    colSpan: 'lg:col-span-5',
    description: 'Polyvalence et robustesse légendaires. Configuration 7 places, boîte de transfert 4x4 avec blocage de différentiel et caméras 360° pour les environnements exigeants.',
    specs: {
      transmission: 'Automatique 6 Rapports avec Mode Séquentiel',
      drivetrain: '4x4 avec Boîte Courte & Blocage Différentiel',
      fuel: 'Diesel Tropicalisé',
      interior: 'Cuir Noir 7 Places & Système Multimédia 12.3"',
    },
  },
  {
    id: 'toyota-hilux-gr-sport',
    name: 'Toyota Hilux Double Cabine 4x4 GR-Sport 2.8L Diesel',
    year: 2024,
    category: 'truck',
    engine: '2.8L Turbo Diesel Intercooler (1GD-FTV)',
    power: '224 HP / 550 Nm',
    provenance: 'Réseau Constructeur Officiel',
    customsStatus: 'Conforme DGDA • Immatriculation Rapide',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop',
    status: 'En Showroom',
    colSpan: 'lg:col-span-5',
    description: 'Le pick-up tout-terrain de commandement pour les concessions minières et les déplacements inter-villes. Suspensions KYB monotubes renforcées et benne haute résistance.',
    specs: {
      transmission: 'Automatique 6 Rapports avec Palettes au Volant',
      drivetrain: '4x4 Enclenchable avec Blocage Arrière',
      fuel: 'Diesel Tropicalisé',
      interior: 'Sièges Sport Cuir & Alcantara GR avec Surpiqûres Rouges',
    },
  },
  {
    id: 'lexus-lx-600-vip',
    name: 'Lexus LX 600 Ultra Luxury VIP (4 Places)',
    year: 2024,
    category: 'suv',
    engine: '3.5L Twin-Turbo V6 (V35A-FTS)',
    power: '409 HP / 650 Nm',
    provenance: 'Japon • Usine Yoshiwara',
    customsStatus: 'Dédouanement DGDA Complet • Homologation Katanga',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop',
    status: 'En Showroom',
    colSpan: 'lg:col-span-7',
    description: 'Le summum du raffinement tout-terrain. Disposition 4 sièges indépendants avec fauteuil Ottoman inclinable à 48°, suspension hydraulique pilotée AHC et sono Mark Levinson 25 HP.',
    specs: {
      transmission: 'Automatique 10 Rapports Direct-Shift',
      drivetrain: 'Transmission Intégrale Permanente 4WD',
      fuel: 'Essence Bi-Turbo',
      interior: 'Cuir Semi-Aniline Sunflare avec Écrans Passagers Arrière',
    },
  },
  {
    id: 'maybach-gls-600',
    name: 'Mercedes-Maybach GLS 600 Night Series',
    year: 2025,
    category: 'luxury',
    engine: '4.0L V8 Biturbo + EQ Boost',
    power: '557 HP / 730 Nm',
    provenance: 'Stuttgart, Allemagne',
    customsStatus: 'Homologation DGDA • Droits DRC Intégralement Réglés',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1600&auto=format&fit=crop',
    status: 'En Showroom',
    colSpan: 'lg:col-span-7',
    description: 'Présence magistrale et confort première classe. Carrosserie bi-ton, suspension active E-Active Body Control, sièges massants climatisés et compartiment réfrigéré.',
    specs: {
      transmission: 'Automatique 9G-TRONIC',
      drivetrain: 'Transmission Intégrale 4MATIC',
      fuel: 'Essence V8 Biturbo',
      interior: 'Cuir Nappa Exclusif Manufaktur Blanc Cristal / Noir',
    },
  },
  {
    id: 'range-rover-autobiography',
    name: 'Range Rover Autobiography LWB P530',
    year: 2024,
    category: 'luxury',
    engine: '4.4L Twin-Turbocharged V8',
    power: '523 HP / 750 Nm',
    provenance: 'Solihull Special Vehicle Operations, Royaume-Uni',
    customsStatus: 'Homologation Lubumbashi • Prêt pour Immatriculation',
    image: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?q=80&w=1200&auto=format&fit=crop',
    status: 'En Showroom',
    colSpan: 'lg:col-span-5',
    description: 'Châssis long avec sièges Executive Class Comfort Plus, roues arrière directrices, suspensions pneumatiques actives et acoustique feutrée de premier ordre.',
    specs: {
      transmission: 'Automatique ZF 8 Rapports',
      drivetrain: 'Transmission Intégrale Intelligente AWD',
      fuel: 'Essence V8 Bi-Turbo',
      interior: 'Cuir Semi-Aniline Perlino & Boiseries Bouleau Naturel',
    },
  },
];

export default function AutoProDRCPage() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'suv' | 'truck' | 'armoured' | 'luxury'>('all');
  const [activeDossier, setActiveDossier] = useState<Vehicle | null>(null);
  const [cameraOrbit, setCameraOrbit] = useState('45deg 75deg 105%');
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [lubumbashiTime, setLubumbashiTime] = useState('');
  const [inquiryMarque, setInquiryMarque] = useState(VEHICLES[0].name);
  const [customRequestText, setCustomRequestText] = useState('');

  // Client-mounted check to prevent SSR hydration mismatches with custom web components
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const modelViewerRef = useRef<any>(null);

  // Scroll detection for header
  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lubumbashi Local Time
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Africa/Lubumbashi',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now);
        setLubumbashiTime(formatted);
      } catch {
        const now = new Date();
        setLubumbashiTime(now.toTimeString().slice(0, 8));
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter vehicles
  const filteredVehicles = selectedFilter === 'all'
    ? VEHICLES
    : VEHICLES.filter((v) => v.category === selectedFilter);

  const handleSetCamera = (orbit: string) => {
    setCameraOrbit(orbit);
    if (modelViewerRef.current) {
      modelViewerRef.current.cameraOrbit = orbit;
    }
  };

  const handleWhatsAppInquiry = (carName?: string) => {
    const vehicle = carName || inquiryMarque;
    const message = encodeURIComponent(
      `Bonjour Auto Pro DRC. Je souhaite obtenir des informations et la disponibilité pour : ${vehicle}. Pouvez-vous me recontacter ?`
    );
    window.open(`https://wa.me/243992099990?text=${message}`, '_blank');
  };

  return (
    <div className="relative bg-[#070707] text-[#F4F1EA] selection:bg-[#C9A24B] selection:text-black min-h-screen font-sans-editorial overflow-x-hidden">
      
      {/* Background Subtle Watermark Logo */}
      <div 
        aria-hidden="true" 
        className="fixed -top-32 -right-32 w-[650px] h-[750px] pointer-events-none opacity-[0.03] z-0 select-none"
      >
        <Image 
          src="/images/auto-pro-logo.svg" 
          alt="Auto Pro DRC Logo" 
          width={650} 
          height={750} 
          className="w-full h-full object-contain"
          priority
          referrerPolicy="no-referrer"
        />
      </div>

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
          <a href="#" className="flex items-center gap-3 group focus:outline-none" aria-label="Auto Pro DRC Accueil">
            <AutoProLogo className="w-10 h-10 transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="font-display text-base sm:text-lg tracking-[0.25em] font-semibold text-[#F4F1EA] uppercase">
                AUTO PRO <span className="text-[#C9A24B]">DRC</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#A8A398]">
                Concessionnaire Automobile • Lubumbashi
              </span>
            </div>
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs tracking-[0.2em] uppercase text-[#C4C0B5] font-medium">
            <a href="#inventory" className="hover:text-[#C9A24B] transition-colors">
              Stock & Catalogue
            </a>
            <a href="#services" className="hover:text-[#C9A24B] transition-colors">
              Services
            </a>
            <a href="#armoured" className="hover:text-[#C9A24B] transition-colors">
              Véhicules Blindés
            </a>
            <a href="#contact" className="hover:text-[#C9A24B] transition-colors">
              Showroom & Contact
            </a>
          </nav>

          {/* Direct WhatsApp Callout */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/243992099990"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 text-xs tracking-[0.2em] uppercase text-[#070707] bg-[#C9A24B] hover:bg-[#EBD699] font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(201,162,75,0.2)]"
            >
              WhatsApp Direct
            </a>
          </div>

        </div>
      </header>

      {/* ========================================================= */}
      {/* HERO SECTION                                              */}
      {/* ========================================================= */}
      <section id="hero" className="relative pt-28 pb-14 md:pt-36 md:pb-16 flex flex-col justify-between border-b border-[#C9A24B]/15 overflow-hidden">
        <div 
          aria-hidden="true" 
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-l from-[#C9A24B]/10 via-[#C9A24B]/5 to-transparent blur-3xl pointer-events-none rounded-full"
        />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full relative z-10 flex-1 flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center w-full">
            
            {/* Left: Punchy Dealership Headline */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-5 pr-0 lg:pr-4">
              
              <div className="flex items-center space-x-2 text-xs tracking-[0.25em] uppercase text-[#C9A24B] font-semibold">
                <span className="w-5 h-[1.5px] bg-[#C9A24B]"></span>
                <span>LUBUMBASHI • HAUT-KATANGA</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl xl:text-6xl font-light tracking-tight text-[#F4F1EA] leading-[1.1]">
                VOTRE CONCESSION <br />
                <span className="font-normal italic text-[#EBD699]">AUTOMOBILE</span> <br />
                À LUBUMBASHI.
              </h1>

              <p className="text-sm sm:text-base text-[#C5BFB3] leading-relaxed max-w-lg font-light">
                Véhicules neufs et récents en stock ou sur commande : 4x4 tout-terrain, super-pickups, 
                SUV de prestige et solutions blindées homologuées avec formalités douanières DGDA clé en main.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="#inventory"
                  className="inline-flex items-center justify-center px-6 py-3 text-xs tracking-[0.22em] uppercase bg-[#C9A24B] hover:bg-[#EBD699] text-[#070707] font-semibold transition-all shadow-[0_0_20px_rgba(201,162,75,0.2)]"
                >
                  Voir le Stock Disponible
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 py-3 text-xs tracking-[0.22em] uppercase border border-[#C9A24B]/40 hover:border-[#C9A24B] text-[#F4F1EA] hover:text-[#C9A24B] transition-colors"
                >
                  Contacter le Showroom
                </a>
              </div>

            </div>

            {/* Right: Interactive 3D Showcase */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
              <div className="relative w-full h-[360px] sm:h-[420px] border border-[#C9A24B]/25 luxury-pedestal-bezel flex items-center justify-center overflow-hidden">
                
                <div className="absolute top-3 left-4 z-20 flex items-center gap-2 pointer-events-none text-[10px] tracking-[0.2em] uppercase font-mono text-[#A8A398]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] animate-pulse"></span>
                  <span>VUE 3D INTERACTIVE</span>
                </div>

                {/* Pedestal circle */}
                <div 
                  aria-hidden="true" 
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[85%] h-24 rounded-full border border-[#C9A24B]/30 pointer-events-none shadow-[0_0_40px_rgba(201,162,75,0.12)]"
                />

                {mounted ? (
                  <model-viewer
                    ref={modelViewerRef}
                    id="showroom-model-viewer"
                    src="/models/ferrari.glb"
                    alt="Auto Pro DRC 3D Showcase"
                    auto-rotate={isAutoRotate ? '' : undefined}
                    auto-rotate-delay="1000"
                    rotation-per-second="20deg"
                    camera-controls
                    touch-action="pan-y"
                    camera-orbit={cameraOrbit}
                    field-of-view="32deg"
                    exposure="1.05"
                    shadow-intensity="1.8"
                    shadow-softness="0.75"
                    interaction-prompt="none"
                    className="w-full h-full cursor-grab active:cursor-grabbing z-20"
                    suppressHydrationWarning
                  >
                    <div slot="poster" className="flex items-center justify-center w-full h-full text-xs uppercase tracking-[0.25em] text-[#C9A24B]/60 font-mono">
                      Chargement du véhicule 3D...
                    </div>
                  </model-viewer>
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full text-center p-4 z-20">
                    <div className="w-8 h-8 rounded-full border border-[#C9A24B]/30 border-t-[#C9A24B] animate-spin mb-3" />
                    <div className="text-xs uppercase tracking-[0.25em] text-[#C9A24B] font-mono">
                      Chargement Showroom 3D...
                    </div>
                  </div>
                )}

                {/* 3D Camera Controls */}
                <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-2 px-3 py-1.5 bg-[#070707]/90 border border-[#C9A24B]/30 backdrop-blur-md text-[10px] tracking-[0.18em] uppercase">
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleSetCamera('45deg 75deg 105%')}
                      className={`px-2 py-0.5 transition-colors ${cameraOrbit.startsWith('45deg') ? 'bg-[#C9A24B]/20 text-[#C9A24B] border border-[#C9A24B]/40' : 'text-[#A8A398] hover:text-[#F4F1EA]'}`}
                    >
                      3/4 Face
                    </button>
                    <button
                      onClick={() => handleSetCamera('90deg 80deg 110%')}
                      className={`px-2 py-0.5 transition-colors ${cameraOrbit.startsWith('90deg') ? 'bg-[#C9A24B]/20 text-[#C9A24B] border border-[#C9A24B]/40' : 'text-[#A8A398] hover:text-[#F4F1EA]'}`}
                    >
                      Profil
                    </button>
                    <button
                      onClick={() => handleSetCamera('0deg 75deg 100%')}
                      className={`px-2 py-0.5 transition-colors ${cameraOrbit.startsWith('0deg') ? 'bg-[#C9A24B]/20 text-[#C9A24B] border border-[#C9A24B]/40' : 'text-[#A8A398] hover:text-[#F4F1EA]'}`}
                    >
                      Face
                    </button>
                  </div>
                  <button
                    onClick={() => setIsAutoRotate(!isAutoRotate)}
                    className={`px-2 py-0.5 font-mono ${isAutoRotate ? 'text-[#C9A24B] font-semibold' : 'text-[#8E8A80]'}`}
                  >
                    {isAutoRotate ? '● Rotation' : '○ Pause'}
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* 4 Clean Dealership Highlights */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full mt-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-[#C9A24B]/20 divide-y md:divide-y-0 md:divide-x divide-[#C9A24B]/20 pt-4 text-xs">
            <div className="p-3 md:pr-4">
              <span className="font-semibold text-[#F4F1EA] uppercase block text-[11px] tracking-wider text-[#C9A24B]">
                Stock & Importation
              </span>
              <p className="text-[11px] text-[#A8A398] mt-1">Toyota, RAM, Lexus, Mercedes & Range Rover disponibles ou sur commande.</p>
            </div>
            <div className="p-3 md:px-4">
              <span className="font-semibold text-[#F4F1EA] uppercase block text-[11px] tracking-wider text-[#C9A24B]">
                Spécification Tropicale
              </span>
              <p className="text-[11px] text-[#A8A398] mt-1">Refroidissement renforcé, double filtration carburant pour le Katanga.</p>
            </div>
            <div className="p-3 md:px-4">
              <span className="font-semibold text-[#F4F1EA] uppercase block text-[11px] tracking-wider text-[#C9A24B]">
                Dédouanement DGDA
              </span>
              <p className="text-[11px] text-[#A8A398] mt-1">Formalités douanières complètes, quitus fiscal et immatriculation inclus.</p>
            </div>
            <div className="p-3 md:pl-4">
              <span className="font-semibold text-[#F4F1EA] uppercase block text-[11px] tracking-wider text-[#C9A24B]">
                Division Blindée
              </span>
              <p className="text-[11px] text-[#A8A398] mt-1">Véhicules de sécurité certifiés CEN B6 / VR7 pour axes et sites miniers.</p>
            </div>
          </div>
        </div>

      </section>

      {/* ========================================================= */}
      {/* QUICK INFO BAR                                            */}
      {/* ========================================================= */}
      <div className="w-full bg-[#0a0a0a] border-b border-[#C9A24B]/15 py-3 text-xs">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-[#B5B0A4] tracking-wider text-[11px]">
            <span className="w-2 h-2 rounded-full bg-[#C9A24B] animate-pulse"></span>
            <span>Lubumbashi :</span>
            <span className="font-mono text-[#F4F1EA] font-semibold" suppressHydrationWarning>{lubumbashiTime || 'CAT (UTC+2)'}</span>
          </div>

          <div className="text-[11px] tracking-wider text-[#A8A398]">
            Showroom : 100, Chaussée Laurent Désiré Kabila, Lubumbashi
          </div>

          <div className="flex items-center gap-3 text-[11px] tracking-wider font-mono">
            <span className="text-[#8E8A80]">Tél / WhatsApp :</span>
            <a 
              href="https://wa.me/243992099990" 
              target="_blank" 
              rel="noreferrer"
              className="text-[#C9A24B] hover:underline"
            >
              +243 992 099 990
            </a>
            <span className="text-[#8E8A80]">/</span>
            <a 
              href="tel:+243901310000" 
              className="text-[#C9A24B] hover:underline"
            >
              +243 901 310 000
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* INVENTORY & STOCK                                         */}
      {/* ========================================================= */}
      <section id="inventory" className="py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-5 border-b border-[#C9A24B]/20 gap-6">
            <div>
              <div className="flex items-center space-x-2 text-[11px] tracking-[0.25em] uppercase text-[#C9A24B] font-semibold mb-1">
                <span className="w-2 h-[1.5px] bg-[#C9A24B]"></span>
                <span>STOCK & DISPONIBILITÉS</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-light text-[#F4F1EA]">
                VÉHICULES EN CONCESSION.
              </h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 text-xs tracking-wider uppercase">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-3.5 py-1.5 transition-all ${
                  selectedFilter === 'all'
                    ? 'bg-[#C9A24B] text-[#070707] font-semibold'
                    : 'text-[#B5B0A4] hover:text-[#F4F1EA] border border-white/10'
                }`}
              >
                Tous ({VEHICLES.length})
              </button>
              <button
                onClick={() => setSelectedFilter('suv')}
                className={`px-3.5 py-1.5 transition-all ${
                  selectedFilter === 'suv'
                    ? 'bg-[#C9A24B] text-[#070707] font-semibold'
                    : 'text-[#B5B0A4] hover:text-[#F4F1EA] border border-white/10'
                }`}
              >
                4x4 & SUV
              </button>
              <button
                onClick={() => setSelectedFilter('truck')}
                className={`px-3.5 py-1.5 transition-all ${
                  selectedFilter === 'truck'
                    ? 'bg-[#C9A24B] text-[#070707] font-semibold'
                    : 'text-[#B5B0A4] hover:text-[#F4F1EA] border border-white/10'
                }`}
              >
                Pickups & Trucks
              </button>
              <button
                onClick={() => setSelectedFilter('armoured')}
                className={`px-3.5 py-1.5 transition-all ${
                  selectedFilter === 'armoured'
                    ? 'bg-[#C9A24B] text-[#070707] font-semibold'
                    : 'text-[#B5B0A4] hover:text-[#F4F1EA] border border-white/10'
                }`}
              >
                Blindés VR7
              </button>
              <button
                onClick={() => setSelectedFilter('luxury')}
                className={`px-3.5 py-1.5 transition-all ${
                  selectedFilter === 'luxury'
                    ? 'bg-[#C9A24B] text-[#070707] font-semibold'
                    : 'text-[#B5B0A4] hover:text-[#F4F1EA] border border-white/10'
                }`}
              >
                Luxe & Maybach
              </button>
            </div>
          </div>

          {/* Vehicle Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
            {filteredVehicles.map((car) => (
              <div
                key={car.id}
                className={`${car.colSpan} group flex flex-col luxury-slate-card border border-[#C9A24B]/20 hover:border-[#C9A24B]/60 transition-all duration-300 overflow-hidden relative`}
              >
                {/* Photo */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black editorial-img-wrap">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-black/20 pointer-events-none"></div>

                  {/* Status */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-block px-2.5 py-1 text-[9px] uppercase tracking-wider font-semibold bg-[#070707]/90 text-[#EBD699] border border-[#C9A24B]/40">
                      {car.status}
                    </span>
                  </div>

                  {/* Year */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="font-mono text-xs text-white/90 bg-black/70 px-2 py-0.5 border border-white/10">
                      {car.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4">
                  <div>
                    {/* Engine & Power tags */}
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#A8A398] mb-1.5 font-mono">
                      <span>{car.engine}</span>
                      <span className="text-[#C9A24B] font-semibold">{car.power}</span>
                    </div>

                    {/* Car Name */}
                    <h3 className="font-display text-xl sm:text-2xl text-[#F4F1EA] font-normal tracking-tight group-hover:text-[#EBD699] transition-colors leading-snug">
                      {car.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-[#B5B0A4] mt-2 line-clamp-2 leading-relaxed">
                      {car.description}
                    </p>
                  </div>

                  {/* Quick Specs Chips */}
                  <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-3">
                    <div className="text-[11px] text-[#A8A398] font-mono">
                      <span className="text-[#C9A24B]">Boîte :</span> {car.specs.transmission.split(' ')[0]} {car.specs.transmission.split(' ')[1] || ''}
                    </div>

                    {/* Action buttons (No prices) */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setActiveDossier(car)}
                        className="px-3 py-1.5 text-[11px] tracking-wider uppercase border border-white/20 hover:border-[#C9A24B] text-[#E5E0D5] hover:text-[#C9A24B] transition-colors"
                      >
                        Fiche
                      </button>
                      <button
                        onClick={() => handleWhatsAppInquiry(car.name)}
                        className="px-3.5 py-1.5 text-[11px] tracking-wider uppercase bg-[#C9A24B] hover:bg-[#EBD699] text-[#070707] font-semibold transition-colors"
                      >
                        Contacter
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* DEALERSHIP SERVICES (CONCISE & VISUAL)                     */}
      {/* ========================================================= */}
      <section id="services" className="py-16 md:py-20 bg-[#0a0a0a] border-y border-[#C9A24B]/15">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          
          <div className="mb-10 pb-4 border-b border-[#C9A24B]/20">
            <div className="flex items-center space-x-2 text-[11px] tracking-[0.25em] uppercase text-[#C9A24B] font-semibold mb-1">
              <span className="w-2 h-[1.5px] bg-[#C9A24B]"></span>
              <span>NOS SERVICES EN CONCESSION</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-light text-[#F4F1EA]">
              SOLUTIONS AUTOMOBILES COMPLÈTES.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Service 1 */}
            <div className="p-6 border border-white/[0.08] bg-[#0e0e0e] hover:border-[#C9A24B]/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#C9A24B]/10 border border-[#C9A24B]/30 flex items-center justify-center text-[#C9A24B] font-mono text-xs mb-4">
                01
              </div>
              <h3 className="font-display text-lg text-[#F4F1EA] mb-2 font-normal">
                Vente Neuf & Occasion Récente
              </h3>
              <p className="text-xs text-[#A8A398] leading-relaxed">
                Stock permanent des meilleurs 4x4 et berlines. Traçabilité des véhicules et contrôles mécaniques complets.
              </p>
            </div>

            {/* Service 2 */}
            <div className="p-6 border border-white/[0.08] bg-[#0e0e0e] hover:border-[#C9A24B]/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#C9A24B]/10 border border-[#C9A24B]/30 flex items-center justify-center text-[#C9A24B] font-mono text-xs mb-4">
                02
              </div>
              <h3 className="font-display text-lg text-[#F4F1EA] mb-2 font-normal">
                Importation Spéciale sur Commande
              </h3>
              <p className="text-xs text-[#A8A398] leading-relaxed">
                Recherche personnalisée depuis le Japon, les USA ou l&apos;Afrique du Sud avec logistique maritime et terrestre sécurisée.
              </p>
            </div>

            {/* Service 3 */}
            <div className="p-6 border border-white/[0.08] bg-[#0e0e0e] hover:border-[#C9A24B]/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#C9A24B]/10 border border-[#C9A24B]/30 flex items-center justify-center text-[#C9A24B] font-mono text-xs mb-4">
                03
              </div>
              <h3 className="font-display text-lg text-[#F4F1EA] mb-2 font-normal">
                Dédouanement DGDA & Plaques
              </h3>
              <p className="text-xs text-[#A8A398] leading-relaxed">
                Prise en charge intégrale des formalités de douane, droits fiscaux DGI et obtention des plaques d&apos;immatriculation du Katanga.
              </p>
            </div>

            {/* Service 4 */}
            <div className="p-6 border border-white/[0.08] bg-[#0e0e0e] hover:border-[#C9A24B]/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#C9A24B]/10 border border-[#C9A24B]/30 flex items-center justify-center text-[#C9A24B] font-mono text-xs mb-4">
                04
              </div>
              <h3 className="font-display text-lg text-[#F4F1EA] mb-2 font-normal">
                Entretien & Pièces d&apos;Origine
              </h3>
              <p className="text-xs text-[#A8A398] leading-relaxed">
                Service après-vente, diagnostic électronique multimarque et approvisionnement rapide en pièces d&apos;origine constructeur.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* ARMOURED VEHICLES / DIVISION BLINDAGE                     */}
      {/* ========================================================= */}
      <section id="armoured" className="py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          
          <div className="border border-[#C9A24B]/30 bg-[#0c0c0c] p-6 sm:p-10 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center space-x-2 text-[11px] tracking-[0.25em] uppercase text-[#C9A24B] font-semibold">
                  <span className="w-2 h-[1.5px] bg-[#C9A24B]"></span>
                  <span>DIVISION SÉCURITÉ & VÉHICULES BLINDÉS</span>
                </div>
                
                <h3 className="font-display text-2xl sm:text-3xl text-[#F4F1EA] font-light">
                  Protection Balistique pour les Convois & Axes Miniers.
                </h3>
                
                <p className="text-sm text-[#C5BFB3] leading-relaxed font-light">
                  Toyota Land Cruiser 300 et Lexus LX blindés certifiés CEN B6 / VPAM VR7. 
                  Conçus pour résister aux tirs de calibres 7.62mm et aux déflagrations, avec suspensions renforcées 
                  et jantes run-flat pour les trajets Lubumbashi–Likasi–Kolwezi.
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="border border-white/15 px-3 py-1 text-xs bg-black/50 text-[#C9A24B] font-mono">
                    Blindage Certifié CEN B6 / VR7
                  </span>
                  <span className="border border-white/15 px-3 py-1 text-xs bg-black/50 text-white font-mono">
                    Plancher Anti-Mines
                  </span>
                  <span className="border border-white/15 px-3 py-1 text-xs bg-black/50 text-white font-mono">
                    Pneus Run-Flat
                  </span>
                  <span className="border border-white/15 px-3 py-1 text-xs bg-black/50 text-white font-mono">
                    Réservoir Protégé
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end border-t lg:border-t-0 lg:border-l border-white/[0.1] lg:pl-8 pt-4 lg:pt-0">
                <span className="text-xs uppercase tracking-wider text-[#A8A398] mb-2 font-mono">
                  Flottes & Entreprises Minières
                </span>
                <button
                  onClick={() => handleWhatsAppInquiry('Toyota Land Cruiser 300 Blindé B6')}
                  className="px-6 py-3 bg-[#C9A24B] hover:bg-[#EBD699] text-[#070707] text-xs uppercase tracking-wider font-semibold transition-colors w-full sm:w-auto text-center"
                >
                  Demander une Fiche Blindage
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SHOWROOM & CONTACT                                        */}
      {/* ========================================================= */}
      <section id="contact" className="py-16 md:py-24 bg-[#090909] border-t border-[#C9A24B]/15">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Showroom Direct Info */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center space-x-2 text-[11px] tracking-[0.25em] uppercase text-[#C9A24B] font-semibold mb-1">
                  <span className="w-2 h-[1.5px] bg-[#C9A24B]"></span>
                  <span>SHOWROOM PRINCIPAL</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-light text-[#F4F1EA]">
                  NOUS RENDRE VISITE.
                </h2>
              </div>

              <p className="text-sm text-[#C5BFB3] leading-relaxed font-light">
                Notre équipe commerciale vous accueille au showroom pour découvrir nos véhicules en stock 
                ou configurer une commande sur mesure.
              </p>

              {/* Direct Details */}
              <div className="space-y-3 pt-2 text-sm">
                <div className="flex items-start space-x-3">
                  <span className="text-[#C9A24B] font-mono text-xs uppercase tracking-wider w-24 pt-0.5">Adresse :</span>
                  <span className="text-[#F4F1EA]">
                    100, Chaussée Laurent Désiré Kabila, Lubumbashi, RDC
                  </span>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="text-[#C9A24B] font-mono text-xs uppercase tracking-wider w-24 pt-0.5">Téléphone :</span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 font-mono">
                    <a 
                      href="tel:+243992099990" 
                      className="text-[#F4F1EA] hover:text-[#C9A24B] transition-colors"
                    >
                      +243 992 099 990
                    </a>
                    <span className="hidden sm:inline text-neutral-600">/</span>
                    <a 
                      href="tel:+243901310000" 
                      className="text-[#F4F1EA] hover:text-[#C9A24B] transition-colors"
                    >
                      +243 901 310 000
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="text-[#C9A24B] font-mono text-xs uppercase tracking-wider w-24 pt-0.5">WhatsApp :</span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 font-mono">
                    <a 
                      href="https://wa.me/243992099990" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-[#F4F1EA] hover:text-[#C9A24B] transition-colors"
                    >
                      +243 992 099 990
                    </a>
                    <span className="hidden sm:inline text-neutral-600">/</span>
                    <a 
                      href="https://wa.me/243901310000" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-[#F4F1EA] hover:text-[#C9A24B] transition-colors"
                    >
                      +243 901 310 000
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-[#C9A24B] font-mono text-xs uppercase tracking-wider w-24">Email :</span>
                  <a 
                    href="mailto:contact@autopro-rdc.com" 
                    className="text-[#F4F1EA] hover:text-[#C9A24B] transition-colors"
                  >
                    contact@autopro-rdc.com
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-[#C9A24B] font-mono text-xs uppercase tracking-wider w-24">Horaires :</span>
                  <span className="text-[#C4C0B5]">
                    Lundi – Samedi : 08h30 – 17h30
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-[#C9A24B] font-mono text-xs uppercase tracking-wider w-24">Villes :</span>
                  <span className="text-[#C4C0B5]">
                    Lubumbashi • Likasi • Kolwezi
                  </span>
                </div>
              </div>
            </div>

            {/* Fast Vehicle Request Form */}
            <div className="lg:col-span-6 luxury-slate-card border border-[#C9A24B]/30 p-6 sm:p-8">
              <span className="text-xs uppercase tracking-wider text-[#C9A24B] font-semibold block mb-1">
                DEMANDE DE RENSEIGNEMENT OU COMMANDE
              </span>
              <p className="text-xs text-[#A8A398] mb-5">
                Sélectionnez un véhicule pour recevoir sa disponibilité et sa fiche technique sur WhatsApp.
              </p>

              <div className="space-y-4 text-xs">
                <div>
                  <label htmlFor="vehicle-select" className="block uppercase tracking-wider text-[#C5BFB3] text-[11px] mb-1 font-medium">
                    Véhicule Souhaité
                  </label>
                  <select
                    id="vehicle-select"
                    value={inquiryMarque}
                    onChange={(e) => setInquiryMarque(e.target.value)}
                    className="w-full bg-[#141414] border border-[#C9A24B]/30 text-[#F4F1EA] p-2.5 focus:outline-none focus:border-[#C9A24B] rounded-none transition-colors"
                  >
                    {VEHICLES.map((v) => (
                      <option key={v.id} value={v.name} className="bg-[#111]">
                        {v.name} ({v.year})
                      </option>
                    ))}
                    <option value="Autre Modèle sur Commande" className="bg-[#111]">
                      Autre modèle spécifique sur commande
                    </option>
                  </select>
                </div>

                <div>
                  <label htmlFor="custom-notes" className="block uppercase tracking-wider text-[#C5BFB3] text-[11px] mb-1 font-medium">
                    Précisions ou Questions (Optionnel)
                  </label>
                  <textarea
                    id="custom-notes"
                    rows={3}
                    value={customRequestText}
                    onChange={(e) => setCustomRequestText(e.target.value)}
                    placeholder="Ex: délai de livraison, blindage B6, livraison à Kolwezi..."
                    className="w-full bg-[#141414] border border-[#C9A24B]/30 text-[#F4F1EA] p-2.5 focus:outline-none focus:border-[#C9A24B] rounded-none transition-colors placeholder:text-neutral-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      const note = customRequestText ? ` (Note: ${customRequestText})` : '';
                      handleWhatsAppInquiry(`${inquiryMarque}${note}`);
                    }}
                    className="w-full py-3.5 bg-[#C9A24B] hover:bg-[#EBD699] text-[#070707] font-semibold text-xs uppercase tracking-wider transition-all"
                  >
                    Envoyer ma Demande via WhatsApp
                  </button>
                  <span className="block text-center text-[10px] text-[#A8A398] mt-2">
                    Réponse rapide par l&apos;équipe commerciale Auto Pro DRC
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* FOOTER                                                    */}
      {/* ========================================================= */}
      <footer className="border-t border-[#C9A24B]/20 bg-[#050505] py-10 text-xs text-[#8E8A80]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-white/[0.05]">
            <div className="flex items-center space-x-3">
              <AutoProLogo className="w-8 h-8" />
              <div>
                <span className="font-display tracking-wider text-sm text-[#F4F1EA] uppercase font-semibold block">
                  AUTO PRO <span className="text-[#C9A24B]">DRC</span>
                </span>
                <span className="text-[10px] text-[#8E8A80] uppercase">
                  Lubumbashi • Haut-Katanga • RDC
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-[11px] uppercase tracking-wider">
              <a href="#inventory" className="hover:text-[#C9A24B] transition-colors">Catalogue</a>
              <a href="#services" className="hover:text-[#C9A24B] transition-colors">Services</a>
              <a href="#armoured" className="hover:text-[#C9A24B] transition-colors">Véhicules Blindés</a>
              <a href="#contact" className="hover:text-[#C9A24B] transition-colors">Contact</a>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px]">
            <p>
              © {new Date().getFullYear()} AUTO PRO DRC • 100, Chaussée Laurent Désiré Kabila, Lubumbashi.
            </p>
            <p className="text-neutral-500 font-mono">
              Tél / WhatsApp : +243 992 099 990 / +243 901 310 000
            </p>
          </div>

        </div>
      </footer>

      {/* ========================================================= */}
      {/* VEHICLE DETAILS MODAL (NO PRICE)                          */}
      {/* ========================================================= */}
      {activeDossier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-xl bg-[#0d0d0d] border border-[#C9A24B]/50 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between border-b border-[#C9A24B]/20 pb-3 mb-4">
              <div>
                <span className="text-[10px] tracking-wider uppercase text-[#C9A24B] font-semibold block">
                  FICHE VÉHICULE EN CONCESSION
                </span>
                <h3 className="font-display text-2xl text-[#F4F1EA] font-normal">
                  {activeDossier.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveDossier(null)}
                className="text-neutral-400 hover:text-white p-1 text-lg font-mono"
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
                      handleWhatsAppInquiry(activeDossier.name);
                      setActiveDossier(null);
                    }}
                    className="px-4 py-2 bg-[#C9A24B] hover:bg-[#EBD699] text-[#070707] font-semibold uppercase tracking-wider text-[11px]"
                  >
                    Contacter sur WhatsApp
                  </button>
                  <button
                    onClick={() => setActiveDossier(null)}
                    className="px-3 py-2 border border-white/20 hover:border-white text-white uppercase tracking-wider text-[11px]"
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
