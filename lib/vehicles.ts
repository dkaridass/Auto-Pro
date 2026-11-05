export interface Vehicle {
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

export const VEHICLES: Vehicle[] = [
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

