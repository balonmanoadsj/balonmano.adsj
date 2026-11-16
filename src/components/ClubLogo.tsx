import React from 'react';
import { handballImages } from '../assets/images';

interface ClubLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  darkText?: boolean;
}

export const ClubLogo: React.FC<ClubLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  darkText = true,
}) => {
  const sizeMap = {
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div className={`relative ${sizeMap[size]} shrink-0 flex items-center justify-center bg-white rounded-xl p-0.5`}>
        <img
          src={handballImages.clubLogo}
          alt="Logotipo AD San Juan Sección Balonmano"
          className="w-full h-full object-contain"
        />
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-extrabold tracking-tight leading-tight font-display text-base sm:text-lg ${
                darkText ? 'text-slate-900' : 'text-white'
              }`}
            >
              AD SAN JUAN
            </span>
            <span className="bg-emerald-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">
              DONIBANE
            </span>
          </div>
          <span className="text-emerald-700 font-bold text-xs tracking-wider uppercase">
            Sección Balonmano • Eskubaloia
          </span>
        </div>
      )}
    </div>
  );
};
