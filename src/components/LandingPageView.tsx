import React, { useState } from 'react';
import { ChevronDown, Menu, X, ArrowRight, User } from 'lucide-react';
import { UserProfile } from '../types/auth';
import { JeconLogo } from './JeconLogo';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleNavClick = (anchor: string) => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    onNavigateAnchor(anchor);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand: Logo + Marketing Suite only (JECON text removed) */}
        <div 
          onClick={() => handleNavClick('#')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="p-1 rounded-xl bg-slate-800/80 border border-slate-700/80 group-hover:border-sky-500/50 transition-colors flex items-center justify-center">
            <JeconLogo size="sm" />
          </div>
          <span className="text-sm font-semibold tracking-wide text-sky-400">
            Marketing Suite
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {/* Solutions Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('solutions')}
              className="flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>Solutions</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {openDropdown === 'solutions' && (
              <div className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-xl p-2 space-y-1 z-50">
                <button
                  type="button"
                  onClick={() => handleNavClick('#solutions')}
                  className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/70 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="font-semibold text-white">Social Operations</div>
                  <div className="text-[11px] text-slate-400">Content scheduling &amp; multi-channel queues</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick('#solutions')}
                  className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/70 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="font-semibold text-white">Direct Engagement</div>
                  <div className="text-[11px] text-slate-400">Inbound direct message triage</div>
                </button>
              </div>
            )}
          </div>

          {/* Features Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('features')}
              className="flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>Features</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {openDropdown === 'features' && (
              <div className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-xl p-2 space-y-1 z-50">
                <button
                  type="button"
                  onClick={() => handleNavClick('#features')}
                  className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/70 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="font-semibold text-white">Channel Connectors</div>
                  <div className="text-[11px] text-slate-400">Sync with TikTok, LinkedIn, and Instagram</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick('#features')}
                  className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/70 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="font-semibold text-white">Blog Engine</div>
                  <div className="text-[11px] text-slate-400">Generate structured long-form drafts</div>
                </button>
              </div>
            )}
          </div>

          {/* Direct Pricing Link */}
          <button
            type="button"
            onClick={() => handleNavClick('#pricing')}
            className="text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            Pricing
          </button>

          {/* Resources Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('resources')}
              className="flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>Resources</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {openDropdown === 'resources' && (
              <div className="absolute top-full right-0 mt-2 w-48 rounded-xl bg-slate-900 border border-slate-800 shadow-xl p-2 space-y-1 z-50">
                <button
                  type="button"
                  onClick={() => handleNavClick('#resources')}
                  className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/70 rounded-lg transition-colors cursor-pointer"
                >
                  Documentation &amp; FAQ
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {currentUser ? (
            <button
              type="button"
              onClick={onEnterApp}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-sky-400" />
              <span>{currentUser.name || currentUser.email}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 transition-colors cursor-pointer"
            >
              Sign In
            </button>
          )}

          <button
            type="button"
            onClick={onEnterApp}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0284c7] hover:bg-sky-500 text-xs font-bold text-white shadow-sm shadow-sky-500/20 transition-all cursor-pointer"
          >
            <span>Launch Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 bg-slate-900 border-b border-slate-800 space-y-3">
          <div className="flex flex-col space-y-2">
            <button
              type="button"
              onClick={() => handleNavClick('#solutions')}
              className="text-left py-2 text-sm text-slate-300 font-semibold"
            >
              Solutions
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('#features')}
              className="text-left py-2 text-sm text-slate-300 font-semibold"
            >
              Features
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('#pricing')}
              className="text-left py-2 text-sm text-slate-300 font-semibold"
            >
              Pricing
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('#resources')}
              className="text-left py-2 text-sm text-slate-300 font-semibold"
            >
              Resources
            </button>
          </div>
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            {!currentUser && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-2.5 text-center text-xs font-semibold text-slate-200 bg-slate-800 rounded-lg"
              >
                Sign In
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onEnterApp();
              }}
              className="w-full py-2.5 text-center text-xs font-bold text-white bg-[#0284c7] rounded-lg"
            >
              Launch Studio
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default LandingHeader;