// jecon-marketing-suite/src/components/MobileNavDrawer.tsx

import React, { useState } from 'react';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { LANDING_NAV_CONFIG, NavMenuCategory } from './LandingNavConfig';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: (anchor: string) => void;
  onOpenAuth: () => void;
  onEnterApp: () => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  isOpen,
  onToggle,
  onNavigate,
  onOpenAuth,
  onEnterApp,
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const handleLinkClick = (anchor: string) => {
    onToggle();
    onNavigate(anchor);
  };

  return (
    <div className="lg:hidden">
      {/* Hamburger Toggle Button */}
      <button
        type="button"
        onClick={onToggle}
        aria-label="Toggle Navigation Menu"
        aria-expanded={isOpen}
        className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Slide-down Accordion Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-slate-950/95 border-b border-slate-800 backdrop-blur-xl px-4 py-6 shadow-2xl z-50 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="space-y-3 max-h-[calc(100vh-5rem)] overflow-y-auto pr-1">
            {LANDING_NAV_CONFIG.map((menu: NavMenuCategory) => {
              if (menu.isDirectLink && menu.anchor) {
                return (
                  <button
                    key={menu.id}
                    type="button"
                    onClick={() => handleLinkClick(menu.anchor!)}
                    className="w-full text-left py-2.5 px-3 text-sm font-bold text-slate-200 hover:text-white hover:bg-slate-900 rounded-xl transition-colors cursor-pointer"
                  >
                    {menu.label}
                  </button>
                );
              }

              const isExpanded = expandedSection === menu.id;

              return (
                <div key={menu.id} className="border-b border-slate-900 pb-2">
                  <button
                    type="button"
                    onClick={() => toggleSection(menu.id)}
                    className="w-full flex items-center justify-between py-2.5 px-3 text-sm font-bold text-slate-200 hover:text-white hover:bg-slate-900 rounded-xl transition-colors cursor-pointer"
                  >
                    <span>{menu.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-sky-400' : ''
                      }`}
                    />
                  </button>

                  {/* Collapsible Children */}
                  {isExpanded && menu.items && (
                    <div className="mt-2 space-y-1.5 pl-3">
                      {menu.items.map((subItem) => (
                        <button
                          key={subItem.title}
                          type="button"
                          onClick={() => handleLinkClick(subItem.anchor)}
                          className="w-full text-left p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 hover:border-sky-500/40 transition-all group cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-200 group-hover:text-sky-400">
                              {subItem.title}
                            </span>
                            <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-sky-400" />
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                            {subItem.description}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Action CTAs in Mobile Drawer */}
            <div className="pt-4 space-y-2.5 border-t border-slate-800/80">
              <button
                type="button"
                onClick={() => {
                  onToggle();
                  onOpenAuth();
                }}
                className="w-full py-2.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  onToggle();
                  onEnterApp();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-white bg-[#0284c7] hover:bg-sky-500 rounded-xl shadow-md shadow-sky-500/20 transition-all cursor-pointer"
              >
                <span>Launch Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};