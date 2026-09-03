import React from 'react';

interface JeconLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const JeconLogo: React.FC<JeconLogoProps> = ({
  size = 'md',
  className = ''
}) => {
  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className={`${sizeMap[size]} shrink-0`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft ground shadow underneath the globe */}
        <ellipse cx="44" cy="84" rx="20" ry="4" fill="#64748b" opacity="0.3" />

        {/* Globe Base Sphere */}
        <circle cx="56" cy="46" r="28" fill="#ffffff" />

        {/* Navy Continents */}
        <g fill="#0b2545">
          {/* North America */}
          <path d="M42 30 C 46 24, 54 22, 60 25 C 66 28, 72 26, 75 32 C 77 36, 74 42, 68 44 C 64 45, 60 41, 56 43 C 52 45, 48 50, 44 47 C 40 44, 38 36, 42 30 Z" />
          {/* Caribbean connector */}
          <circle cx="58" cy="50" r="1.5" />
          {/* South America */}
          <path d="M56 52 C 62 52, 70 56, 72 63 C 74 70, 68 78, 62 82 C 58 84, 56 78, 55 72 C 53 66, 51 60, 56 52 Z" />
        </g>

        {/* Dynamic Curved Azure Swoosh */}
        <path
          d="M18 14 C 24 8, 30 18, 26 28 C 21 43, 19 60, 31 78 C 42 94, 59 100, 84 100 C 68 96, 46 86, 36 72 C 22 55, 25 28, 34 16 C 36 12, 28 8, 18 14 Z"
          fill="#0284c7"
        />
        {/* Gloss highlight along swoosh */}
        <path
          d="M24 18 C 28 14, 32 20, 29 27 C 24 41, 23 56, 33 72 C 41 84, 54 90, 72 92 C 58 88, 42 80, 34 68 C 24 53, 27 31, 32 21 Z"
          fill="#38bdf8"
          opacity="0.8"
        />

        {/* Slate Grey Crescent Wing */}
        <path
          d="M76 44 C 86 56, 88 72, 80 88 C 77 92, 72 96, 68 97 C 76 93, 84 83, 86 70 C 88 58, 83 48, 76 44 Z"
          fill="#64748b"
        />
      </svg>
    </div>
  );
};

export default JeconLogo;