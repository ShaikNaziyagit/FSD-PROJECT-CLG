import React from 'react';

/**
 * CampiiLogo — Futuristic Glassmorphic 3D-styled Campus Operating System Emblem
 * White and Orange Palette:
 * - Frosted glass isometric university citadel shield
 * - Architectural university gateway with glowing clock/spire
 * - Radiant warm orange, amber, and pure white refractive highlights
 * - Interconnected academic nodes
 */
const CampiiLogo = ({
  size = 38,
  className = '',
  showWordmark = false,
  lightText = false,
  animated = true,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none group cursor-pointer ${className}`}>
      <div
        className="relative shrink-0 flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {/* Ambient Backlight Glow (Warm Orange & Amber) */}
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-orange-500/35 via-amber-500/30 to-orange-600/35 blur-md pointer-events-none transition-all duration-500 group-hover:scale-125 group-hover:opacity-100 opacity-70"
        />

        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`relative z-10 transition-transform duration-500 group-hover:scale-105 ${
            animated ? 'filter drop-shadow-[0_4px_12px_rgba(249,115,22,0.4)]' : ''
          }`}
        >
          <defs>
            {/* Orange & Amber Glass Gradients */}
            <linearGradient id="campiiOrangeShield" x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#f97316" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="campiiOrangeFrost" x1="12" y1="8" x2="52" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#f97316" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#1a0f07" stopOpacity="0.65" />
            </linearGradient>

            <linearGradient id="campiiOrangeTower" x1="24" y1="14" x2="40" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#fbbf24" />
              <stop offset="70%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#c2410c" />
            </linearGradient>

            <linearGradient id="campiiOrangeBevel" x1="16" y1="6" x2="48" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
            </linearGradient>

            <linearGradient id="campiiOrangeOrbit" x1="4" y1="32" x2="60" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>

          {/* Outer Orbital Digital Ring */}
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="url(#campiiOrangeOrbit)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            strokeOpacity="0.6"
          />

          {/* Secondary Cyber Accent Ring */}
          <circle
            cx="32"
            cy="32"
            r="24"
            stroke="#fb923c"
            strokeWidth="0.75"
            strokeOpacity="0.3"
          />

          {/* Outer Glassmorphic Hexagonal Campus Citadel Shield */}
          <path
            d="M32 6L54 18V46L32 58L10 46V18L32 6Z"
            fill="url(#campiiOrangeFrost)"
            stroke="url(#campiiOrangeShield)"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Frosted Specular Rim Reflection (Top-Left Edge Light) */}
          <path
            d="M32 7.5L52.5 18.7V25L32 13.5L11.5 25V18.7L32 7.5Z"
            fill="url(#campiiOrangeBevel)"
            opacity="0.7"
          />

          {/* Base Plaza */}
          <path
            d="M20 44H44L41 47H23L20 44Z"
            fill="#fb923c"
            opacity="0.85"
          />

          {/* Central Academic Hall Columns & Arch */}
          <path
            d="M22 43V27C22 21.4772 26.4772 17 32 17C37.5228 17 42 21.4772 42 27V43"
            stroke="url(#campiiOrangeTower)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Interior Arch Gateway Cutout */}
          <path
            d="M27 43V31C27 28.2386 29.2386 26 32 26C34.7614 26 37 28.2386 37 31V43"
            stroke="#fbbf24"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="#180e06"
            fillOpacity="0.8"
          />

          {/* Central University Pinnacle Spire */}
          <path
            d="M32 10V17"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="32" cy="10" r="1.8" fill="#f97316" stroke="#ffffff" strokeWidth="0.8" />

          {/* Glowing Nexus Crossbeam */}
          <line x1="18" y1="35" x2="46" y2="35" stroke="#fbbf24" strokeWidth="1.5" strokeOpacity="0.8" />

          {/* Orbiting Academic Nodes */}
          {/* Node 1: Top Apex (Leadership / Faculty) */}
          <circle cx="32" cy="6" r="3.2" fill="#ffffff" stroke="#f97316" strokeWidth="1.5" />

          {/* Node 2: Bottom-Right (Students & Scholars) */}
          <circle cx="54" cy="46" r="3.2" fill="#fb923c" stroke="#ffffff" strokeWidth="1.5" />

          {/* Node 3: Bottom-Left (Campus Infrastructure & Facilities) */}
          <circle cx="10" cy="46" r="3.2" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />

          {/* Pulsing Core Energy Gem (Warm Orange Flame Core) */}
          <circle cx="32" cy="30" r="3" fill="#ff6b00" />
          <circle cx="32" cy="30" r="1.5" fill="#ffffff" />
        </svg>
      </div>

      {showWordmark && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight leading-none text-xl sm:text-2xl font-sans ${
                lightText
                  ? 'text-white'
                  : 'bg-gradient-to-r from-white via-orange-100 to-amber-300 bg-clip-text text-transparent'
              }`}
            >
              CAMPII
            </span>
            <span className="px-1.5 py-0.5 rounded-md bg-orange-500/20 border border-orange-400/50 text-[9px] font-mono font-bold text-orange-300 tracking-wider">
              OS
            </span>
          </div>
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-orange-400/95 font-mono mt-0.5">
            Campus Operating System
          </span>
        </div>
      )}
    </div>
  );
};

export default CampiiLogo;
