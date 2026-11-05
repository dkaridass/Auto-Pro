import type {Metadata} from 'next';
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Auto Pro DRC — Concessionnaire Automobile à Lubumbashi',
  description: "Concessionnaire automobile à Lubumbashi, Haut-Katanga, RDC. Véhicules neufs et récents, 4x4, pick-ups, blindés VR7, dédouanement DGDA et service officiel.",
  openGraph: {
    title: 'Auto Pro DRC — Concessionnaire Automobile à Lubumbashi',
    description: "Concessionnaire automobile à Lubumbashi, Haut-Katanga, RDC. Véhicules neufs et récents, 4x4, pick-ups, blindés VR7, dédouanement DGDA et service officiel.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auto Pro DRC — Concessionnaire Automobile à Lubumbashi',
    description: "Concessionnaire automobile à Lubumbashi, Haut-Katanga, RDC. Véhicules neufs et récents, 4x4, pick-ups, blindés VR7, dédouanement DGDA et service officiel.",
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="fr" className={`dark ${fraunces.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <head>
        <Script
          type="module"
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="bg-[#070707] text-[#F4F1EA] antialiased selection:bg-[#C9A24B] selection:text-black min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
