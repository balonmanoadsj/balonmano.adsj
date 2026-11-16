import React from 'react';

interface ClubLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const ClubLogo: React.FC<ClubLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* AD San Juan Escudo Oficial Vectorial */}
      <div className={`relative ${sizeMap[size]} shrink-0 drop-shadow-md`}>
        <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Sombra y Borde exterior */}
          <path
            d="M60 4C30 4 10 16 10 32V80C10 108 40 128 60 136C80 128 110 108 110 80V32C110 16 90 4 60 4Z"
            fill="#045a2f"
          />
          {/* Borde dorado/blanco interior */}
          <path
            d="M60 9C34 9 16 19 16 34V78C16 103 42 121 60 129C78 121 104 103 104 78V34C104 19 86 9 60 9Z"
            fill="#ffffff"
          />
          {/* Cuerpo verde esmeralda San Juan */}
          <path
            d="M60 14C37 14 21 23 21 36V76C21 98 44 114 60 122C76 114 99 98 99 76V36C99 23 83 14 60 14Z"
            fill="#057a40"
          />
          {/* Franjas diagonales o detalles heráldicos de San Juan */}
          <path
            d="M60 14C37 14 21 23 21 36V76C21 78 21.5 80 22 82L82 22C75 16 67.5 14 60 14Z"
            fill="#08914c"
          />
          {/* Balón de balonmano y cruz Donibane estilizada */}
          <circle cx="60" cy="58" r="22" fill="#ffffff" />
          <circle cx="60" cy="58" r="19" fill="#045a2f" />
          
          {/* Líneas del balón de balonmano */}
          <path
            d="M50 43C56 46 64 46 70 43M45 58C45 66 54 73 60 77C66 73 75 66 75 58M43 52C49 55 52 64 52 72M77 52C71 55 68 64 68 72"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Letras ADSJ */}
          <text
            x="60"
            y="64"
            fill="#ffffff"
            fontSize="15"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
            letterSpacing="1"
          >
            ADSJ
          </text>

          {/* Cinta inferior con PAMPLONA - IRUÑA */}
          <rect x="26" y="94" width="68" height="15" rx="3" fill="#ffffff" />
          <text
            x="60"
            y="105"
            fill="#045a2f"
            fontSize="8"
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
            letterSpacing="0.5"
          >
            DONIBANE
          </text>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold tracking-tight text-white leading-tight font-display text-base sm:text-lg">
              AD SAN JUAN
            </span>
            <span className="bg-emerald-600/30 text-emerald-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-500/30 tracking-wide uppercase">
              DONIBANE
            </span>
          </div>
          <span className="text-emerald-400 font-semibold text-xs tracking-wider uppercase">
            Sección Balonmano • Eskubaloia
          </span>
        </div>
      )}
    </div>
  );
};
