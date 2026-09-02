// jecon-marketing-suite/src/components/DesktopNav.tsx

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { LANDING_NAV_CONFIG, NavMenuCategory } from './LandingNavConfig';

interface DesktopNavProps {
  onNavigate: (anchor: string) => void;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({ onNavigate }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleItemClick = (anchor: string) => {
    setOpenDropdown(null);
    onNavigate(anchor);
  };

  return (
    <nav ref={navRef} className="hidden lg:flex items-center gap-1 relative" aria-label="Main Navigation">
      {LANDING_NAV_CONFIG.map((menu: NavMenuCategory) => {
        if (menu.isDirectLink && menu.anchor) {
          return (
            <button
              key={menu.id}
              type="button"
              onClick={() => handleItemClick(menu.anchor!)}
              className="px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors cursor-pointer"
            >
              {menu.label}
            </button>
          );
        }

        const isOpen = openDropdown === menu.id;

        return (
          <div key={menu.id} className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(isOpen ? null : menu.id)}
              aria-expanded={isOpen}
              className={`flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                isOpen
                  ? 'text-white bg-slate-800/80'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span>{menu.label}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-sky-400' : ''
                }`}
              />
            </button>

            {/* Flyout Panel */}
            {isOpen && menu.items && (
              <div className="absolute top-full left-0 mt-2 w-80 sm:w-96 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="space-y-1">
                  {menu.items.map((subItem) => (
                    <button
                      key={subItem.title}
                      type="button"
                      onClick={() => handleItemClick(subItem.anchor)}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all group cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-100 group-hover:text-sky-400 transition-colors">
                          {subItem.title}
                        </span>
                        <ArrowRight className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                        {subItem.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};