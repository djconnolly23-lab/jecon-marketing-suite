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
  // Exact SVG Icon based on JECON LLC emblem
  const renderIcon = (iconClass = 'w-6 h-6') => (
    <svg 
      viewBox="0 0 200 180" 
      className={`${iconClass} shrink-0`} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ground Shadow underneath the globe */}
      <ellipse 
        cx="82" 
        cy="150" 
        rx="40" 
        ry="8" 
        fill="#94a3b8" 
        opacity="0.35" 
      />

      {/* Behind-Globe Sphere Base */}
      <circle 
        cx="110" 
        cy="80" 
        r="54" 
        fill={theme === 'dark' ? '#ffffff' : '#f8fafc'} 
      />

      {/* Continents: North & South America Silhouette in Navy */}
      <g fill="#0b2545">
        {/* North America & Canada */}
        <path d="M78 48 C 82 40, 94 36, 102 38 C 112 40, 122 34, 130 38 C 136 42, 142 50, 140 56 C 135 60, 132 54, 126 58 C 122 62, 128 68, 124 72 C 120 75, 114 70, 108 72 C 104 74, 100 80, 94 78 C 88 75, 82 82, 78 78 C 74 72, 72 62, 74 56 Z" />
        {/* Central America & Caribbean connector */}
        <path d="M96 76 C 98 80, 104 84, 106 88 C 104 90, 100 88, 98 84 Z" />
        <circle cx="112" cy="84" r="2.5" />
        <circle cx="118" cy="80" r="2" />
        {/* South America */}
        <path d="M106 88 C 116 88, 136 92, 140 102 C 142 112, 136 126, 128 136 C 122 144, 118 152, 116 156 C 114 152, 112 134, 110 124 C 106 116, 100 110, 102 102 C 103 96, 105 92, 106 88 Z" />
      </g>

      {/* Dynamic Bright Azure Swoosh Sweeping Around Globe */}
      <path 
        d="M38 18 C 48 10, 56 22, 50 36 C 42 56, 36 82, 54 114 C 70 140, 98 160, 148 170 C 130 166, 88 150, 68 126 C 46 100, 48 58, 64 36 C 68 30, 62 20, 48 20 C 40 20, 34 26, 38 18 Z" 
        fill="#0284c7" 
      />
      {/* Gloss reflection highlight along the swoosh */}
      <path 
        d="M48 24 C 52 20, 56 26, 52 34 C 44 54, 40 76, 52 104 C 64 126, 92 146, 126 158 C 104 150, 74 134, 60 114 C 48 94, 48 64, 58 42 C 60 38, 56 30, 48 24 Z" 
        fill="#38bdf8" 
        opacity="0.6" 
      />

      {/* Right Sleek Slate Grey Crescent Wing */}
      <path 
        d="M150 72 C 166 94, 172 120, 162 148 C 158 156, 150 166, 142 168 C 154 162, 168 144, 172 122 C 176 100, 168 82, 150 72 Z" 
        fill="#64748b" 
      />
    </svg>
  );

  if (variant === 'icon-only') {
    const sizeMap = {
      xs: 'w-5 h-5',
      sm: 'w-7 h-7',
      md: 'w-9 h-9',
      lg: 'w-12 h-12',
      xl: 'w-16 h-16'
    };
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {renderIcon(sizeMap[size])}
      </div>
    );
  }

  if (variant === 'compact-brand') {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        {renderIcon('w-6 h-6')}
        <div className="flex flex-col leading-none">
          <span className={`font-black tracking-wider text-xs italic ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            JECON LLC
          </span>
          <span className={`text-[8px] tracking-widest uppercase font-medium mt-0.5 ${theme === 'dark' ? 'text-sky-300/80' : 'text-slate-500'}`}>
            MAXIMIZE YOUR POTENTIAL
          </span>
        </div>
      </div>
    );
  }

  // Full Brand Logo Variant
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {renderIcon('w-10 h-10')}
      <div className="flex flex-col">
        <div className={`text-base font-black italic tracking-wide ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          JECON LLC
        </div>
        <div className={`text-[9px] tracking-[0.2em] uppercase font-semibold -mt-0.5 ${theme === 'dark' ? 'text-sky-300' : 'text-slate-600'}`}>
          MAXIMIZE YOUR POTENTIAL
        </div>
      </div>
    </div>
  );
};
