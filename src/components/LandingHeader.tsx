// jecon-marketing-suite/src/components/LandingHeader.tsx

import React, { useState } from 'react';
import { ArrowRight, UserCircle } from 'lucide-react';
import { JeconLogo } from './JeconLogo';
import { DesktopNav } from './DesktopNav';
import { MobileNavDrawer } from './MobileNavDrawer';
import { UserProfile } from '../types/auth';

interface LandingHeaderProps {
  currentUser?: UserProfile | null;
  onNavigateAnchor: (anchor: string) => void;
  onEnterApp: () => void;
  onOpenAuth: () => void;
}

export const LandingHeader: React.FC<LandingHeaderProps> = ({
  currentUser,
  onNavigateAnchor,
  onEnterApp,
  onOpenAuth,
}) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#0b2545] border border-sky-500/30 p-1 flex items-center justify-center shadow-xs shrink-0">
            <JeconLogo variant="icon-only" size="sm" theme="dark" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white text-base tracking-tight">JECON</span>
              <span className="text-xs font-semibold text-sky-400">Marketing Suite</span>
            </div>
          </div>
        </div>

        {/* Center: Desktop Navigation Menus (Solutions, Features, Pricing, Resources) */}
        <DesktopNav onNavigate={onNavigateAnchor} />

        {/* Right: Actions / Auth State */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="hidden sm:flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="font-semibold text-slate-200">{currentUser.name}</span>
                <span className="text-[10px] text-sky-400 uppercase px-1 py-0.5 rounded bg-sky-950 border border-sky-800/50">
                  {currentUser.role}
                </span>
              </div>
              <button
                type="button"
                onClick={onEnterApp}
                className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#0284c7] hover:bg-sky-500 px-4 py-2 rounded-lg shadow-sm transition-all hover:shadow-sky-500/20 cursor-pointer"
              >
                <span>Open Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenAuth}
                className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={onEnterApp}
                className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#0284c7] hover:bg-sky-500 px-4 py-2 rounded-lg shadow-sm transition-all hover:shadow-sky-500/20 cursor-pointer"
              >
                <span>Launch Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Mobile Hamburger Toggle & Drawer */}
          <MobileNavDrawer
            isOpen={mobileDrawerOpen}
            onToggle={() => setMobileDrawerOpen((prev) => !prev)}
            onNavigate={onNavigateAnchor}
            onOpenAuth={onOpenAuth}
            onEnterApp={onEnterApp}
          />
        </div>
      </div>
    </header>
  );
};