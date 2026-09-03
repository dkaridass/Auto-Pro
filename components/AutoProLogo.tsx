import React from 'react';

interface AutoProLogoProps {
  className?: string;
  size?: number | string;
  withText?: boolean;
}

export const AutoProLogo: React.FC<AutoProLogoProps> = ({
  className = 'w-10 h-11',
  withText = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-3.5 ${withText ? '' : ''}`}>
      {/* The Official Auto Pro DRC Shield Emblem */}
      <div className={`relative shrink-0 flex items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full drop-shadow-[0_2px_12px_rgba(201,162,75,0.3)] transition-transform duration-300 hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Multi-stop luxury metallic gold linear gradient */}
            <linearGradient id="apLogoGoldLinear" x1="12%" y1="6%" x2="88%" y2="94%">
              <stop offset="0%" stopColor="#FFF2BF" />
              <stop offset="14%" stopColor="#F5D474" />
              <stop offset="28%" stopColor="#E2BB53" />
              <stop offset="46%" stopColor="#C49735" />
              <stop offset="68%" stopColor="#8C651C" />
              <stop offset="84%" stopColor="#E2BB53" />
              <stop offset="94%" stopColor="#F9E298" />
              <stop offset="100%" stopColor="#6E480F" />
            </linearGradient>

            {/* Specular rim highlight */}
            <linearGradient id="apLogoRimLight" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.95" />
              <stop offset="30%" stopColor="#F0CE72" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#966F21" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#4A3107" stopOpacity="0.85" />
            </linearGradient>

            {/* Bevel stroke lighting */}
            <linearGradient id="apLogoBevel" x1="25%" y1="0%" x2="75%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="45%" stopColor="#E0B74C" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#5E3D0A" stopOpacity="0.75" />
            </linearGradient>
          </defs>

          {/* 1. OUTER SHIELD CREST RIM */}
          <path
            fill="url(#apLogoGoldLinear)"
            fillRule="evenodd"
            d="
              M 250,68 
              C 334,71 394,104 398,160 
              C 403,248 348,348 250,442 
              C 152,348 97,248 102,160 
              C 106,104 166,71 250,68 
              Z
              M 250,98 
              C 180,101 130,129 126,176 
              C 123,246 170,332 250,412 
              C 330,332 377,246 374,176 
              C 370,129 320,101 250,98 
              Z
            "
          />

          {/* Outer Rim Highlight Stroke */}
          <path
            d="
              M 250,70 
              C 333,73 392,105 396,160 
              C 401,247 347,346 250,440 
              C 153,346 99,247 104,160 
              C 108,105 167,73 250,70
            "
            stroke="url(#apLogoRimLight)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Inner Rim Accent Stroke */}
          <path
            d="
              M 250,99 
              C 181,102 131,130 128,176 
              C 125,245 171,330 250,410 
              C 329,330 375,245 372,176 
              C 369,130 319,102 250,99
            "
            stroke="url(#apLogoBevel)"
            strokeWidth="1.2"
          />

          {/* 2. CENTRAL MONOGRAM: INTERLOCKING 'A' AND 'P' */}
          {/* LETTER 'A' (LEFT) */}
          <path
            fill="url(#apLogoGoldLinear)"
            fillRule="evenodd"
            d="
              M 242.5,114 
              L 242.5,384 
              L 214,375 
              L 214,266 
              L 186,266 
              L 168,336 
              C 162,324 156,310 151,294 
              L 174,238 
              L 214,238 
              L 214,152 
              C 192,160 170,175 152,198 
              C 147,188 145,178 145,170 
              C 166,142 201,122 242.5,114 
              Z
              M 214,180 
              L 214,212 
              L 183,212 
              C 193,198 203,189 214,180 
              Z
            "
          />

          {/* LETTER 'P' (RIGHT) */}
          <path
            fill="url(#apLogoGoldLinear)"
            fillRule="evenodd"
            d="
              M 257.5,114 
              C 299,122 334,142 355,170 
              C 355,178 353,188 348,198 
              C 330,175 308,160 286,152 
              L 286,238 
              L 318,238 
              C 328,238 338,232 344,222 
              C 350,212 352,198 352,185 
              C 352,175 350,165 346,156 
              C 352,168 355,182 355,195 
              C 355,218 342,246 322,258 
              C 310,265 298,266 286,266 
              L 286,375 
              L 257.5,384 
              Z
              M 286,176 
              C 298,176 312,184 318,195 
              C 324,206 324,218 316,226 
              C 310,232 300,234 286,234 
              Z
            "
          />
        </svg>
      </div>

      {withText && (
        <div className="flex flex-col">
          <span className="font-display text-base sm:text-lg tracking-[0.28em] font-semibold text-[#F4F1EA] uppercase">
            AUTO PRO <span className="text-[#C9A24B]">DRC</span>
          </span>
          <span className="text-[9px] uppercase tracking-[0.32em] text-[#9E998E] font-medium">
            Lubumbashi • Concession Privée
          </span>
        </div>
      )}
    </div>
  );
};

export default AutoProLogo;
