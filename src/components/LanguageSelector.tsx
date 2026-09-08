// src/components/LanguageSelector.tsx
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Globe, Check, Search } from 'lucide-react';
import { LANGUAGES, getLanguageByCode } from '../i18n/languages';

interface LanguageSelectorProps {
  /** Visual variant to match parent header */
  variant?: 'light' | 'dark' | 'landing';
  className?: string;
}

const sortedLanguages = [...LANGUAGES].sort((a, b) => a.name.localeCompare(b.name));

const isSelectedCode = (code: string, currentCode: string) =>
  code === currentCode ||
  currentCode.startsWith(code + '-') ||
  (code === 'en' && currentCode === 'en-US');

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'light',
  className = '',
}) => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const currentCode = i18n.language || 'en';
  const languageMeta = getLanguageByCode(currentCode);

  const filteredLanguages = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sortedLanguages;
    return sortedLanguages.filter(
      (lang) =>
        lang.name.toLowerCase().includes(q) ||
        (lang.nativeName ? lang.nativeName.toLowerCase().includes(q) : false)
    );
  }, [query]);

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const closeMenu = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  // Reset search + highlight to the current language whenever the menu opens; focus the search field.
  useEffect(() => {
    if (!open) {
      setQuery('');
      return;
    }
    const selectedIdx = sortedLanguages.findIndex((l) => isSelectedCode(l.code, currentCode));
    setActiveIndex(selectedIdx >= 0 ? selectedIdx : 0);
    // Defer focus until after the menu has rendered.
    const id = window.setTimeout(() => searchRef.current?.focus(), 0);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Keep the highlighted option in range as the filtered list changes.
  useEffect(() => {
    if (activeIndex >= filteredLanguages.length) {
      setActiveIndex(Math.max(filteredLanguages.length - 1, 0));
    }
  }, [filteredLanguages, activeIndex]);

  // Scroll the active option into view.
  useEffect(() => {
    if (!open) return;
    optionRefs.current[activeIndex]?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, open]);

  // Close on outside click.
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Keyboard navigation: Arrow keys move the highlight, Enter selects, Escape closes.
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu();
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filteredLanguages.length - 1));
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        const lang = filteredLanguages[activeIndex];
        if (lang) changeLanguage(lang.code);
      }
    };
    if (open) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, filteredLanguages, activeIndex]);

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

  const searchClasses = isDark
    ? 'bg-white/5 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-sky-500'
    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-sky-500';

  const itemHover = isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50';
  const activeItem = isDark ? 'bg-slate-800 text-sky-300' : 'bg-sky-50 text-sky-700';
  const highlightRing = isDark ? 'bg-slate-800' : 'bg-slate-100';

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' && !open) {
            e.preventDefault();
            setOpen(true);
          }
        }}
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
          className={`absolute end-0 top-full mt-1.5 z-50 w-64 rounded-xl border ${menuClasses}`}
        >
          <div className="p-1.5 border-b border-current/10">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute start-2.5 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search languages..."
                aria-label="Search languages"
                aria-controls="language-listbox"
                aria-activedescendant={
                  filteredLanguages[activeIndex] ? `lang-opt-${filteredLanguages[activeIndex].code}` : undefined
                }
                className={`w-full ps-8 pe-2.5 py-1.5 rounded-lg border text-xs outline-none transition-colors ${searchClasses}`}
              />
            </div>
          </div>

          <div id="language-listbox" role="listbox" className="max-h-64 overflow-y-auto py-1">
            {filteredLanguages.length === 0 && (
              <div className="px-3 py-4 text-xs text-center opacity-60">
                No languages match &ldquo;{query}&rdquo;
              </div>
            )}
            {filteredLanguages.map((lang, index) => {
              const selected = isSelectedCode(lang.code, currentCode);
              const highlighted = index === activeIndex;
              return (
                <button
                  key={lang.code}
                  id={`lang-opt-${lang.code}`}
                  ref={(el) => { optionRefs.current[index] = el; }}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => changeLanguage(lang.code)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-2 text-left text-xs transition-colors cursor-pointer ${
                    selected ? activeItem : highlighted ? highlightRing : itemHover
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
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;