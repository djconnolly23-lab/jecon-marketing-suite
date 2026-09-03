// jecon-marketing-suite/src/components/JeconLogo.tsx

import React from 'react';

interface JeconLogoProps {
  variant?: 'icon-only' | 'full' | 'compact-brand';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  theme?: 'dark' | 'light';
}

export const JeconLogo: React.FC<JeconLogoProps> = ({
  variant = 'compact-brand',
  size = 'sm',
  className = '',
  theme = 'dark'
}) => {
  const sizeMap = {
    xs: 'h-6 w-auto',
    sm: 'h-8 w-auto',
    md: 'h-10 w-auto',
    lg: 'h-14 w-auto',
    xl: 'h-20 w-auto'
  };

  const imageSrc = '/jecon-logo.png';

  if (variant === 'icon-only') {
    return (
      <div className={`inline-flex items-center justify-center overflow-hidden ${className}`}>
        <img
          src={imageSrc}
          alt="JECON LLC Logo"
          className={`${sizeMap[size]} object-contain shrink-0`}
        />
      </div>
    );
  }

  if (variant === 'compact-brand') {
    return (
      <div className={`inline-flex items-center gap-2.5 ${className}`}>
        <img
          src={imageSrc}
          alt="JECON LLC"
          className="h-8 w-auto object-contain shrink-0"
        />
        <div className="flex flex-col leading-tight">
          <span className={`font-black tracking-wider text-sm italic ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            JECON LLC
          </span>
          <span className={`text-[9px] tracking-widest uppercase font-semibold ${theme === 'dark' ? 'text-sky-300' : 'text-slate-500'}`}>
            MAXIMIZE YOUR POTENTIAL
          </span>
        </div>
      </div>
    );
  }

  // Full Brand Variant
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src={imageSrc}
        alt="JECON LLC Logo"
        className="h-12 w-auto object-contain shrink-0"
      />
      <div className="flex flex-col">
        <span className={`text-lg font-black italic tracking-wide ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          JECON LLC
        </span>
        <span className={`text-[10px] tracking-[0.2em] uppercase font-bold ${theme === 'dark' ? 'text-sky-300' : 'text-slate-600'}`}>
          MAXIMIZE YOUR POTENTIAL
        </span>
      </div>
    </div>
  );
};

export default JeconLogo;