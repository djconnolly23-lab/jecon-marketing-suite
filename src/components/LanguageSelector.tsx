// src/components/LanguageSelector.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Globe, Check } from 'lucide-react';
import { LANGUAGES, getLanguageByCode } from '../i18n/languages';

interface LanguageSelectorProps {
  /** Visual variant to match parent header */
  variant?: 'light' | 'dark' | 'landing';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'light',
  className = '',
}) => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentCode = i18n.language || 'en';
  const languageMeta = getLanguageByCode(currentCode);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  const isDark = variant === 'dark';
  const isLanding = variant === 'landing';

  const triggerClasses = isDark
    ? 'bg-white/10 border-white/20 text-slate-100 hover:bg-white/15'
    : isLanding
      ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
      : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200';

  const menuClasses = isDark
    ? 'bg-slate-900 border-slate-700 text-slate-100'
    : 'bg-white border-slate-200 text-slate-900 shadow-lg';

  const itemHover = isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50';
  const activeItem = isDark ? 'bg-slate-800 text-sky-300' : 'bg-sky-50 text-sky-700';

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('jecon_language', code);
    setOpen(false);
  };

  const sortedLanguages = [...LANGUAGES].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${triggerClasses}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${languageMeta.name}`}
        title="Select language"
      >
        <Globe className="w-3.5 h-3.5 shrink-0 opacity-80" />
        <span className="max-w-[7rem] truncate hidden sm:inline">
          {languageMeta.name}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 shrink-0 opacity-70 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className={`absolute right-0 top-full mt-1.5 z-50 w-64 max-h-72 overflow-y-auto rounded-xl border py-1 ${menuClasses}`}
        >
          {sortedLanguages.map((lang) => {
            const selected =
              lang.code === currentCode ||
              currentCode.startsWith(lang.code + '-') ||
              (lang.code === 'en' && currentCode === 'en-US');
            return (
              <button
                key={lang.code}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full flex items-center justify-between gap-2 px-3 py-2 text-left text-xs transition-colors cursor-pointer ${
                  selected ? activeItem : itemHover
                }`}
              >
                <span className="flex flex-col min-w-0">
                  <span className="font-semibold truncate">{lang.name}</span>
                  {lang.nativeName && lang.nativeName !== lang.name && (
                    <span className="text-[10px] opacity-60 truncate">{lang.nativeName}</span>
                  )}
                </span>
                {selected && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;