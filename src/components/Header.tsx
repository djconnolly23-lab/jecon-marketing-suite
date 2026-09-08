// src/components/Header.tsx

import React from 'react';
import { 
  Send, 
  Building2, 
  MessageSquare, 
  BarChart3, 
  Share2, 
  Calendar, 
  LogOut, 
  KeyRound, 
  Users,
  Workflow,
  Megaphone,
  Ticket
} from 'lucide-react';
import { CampaignSettings } from '../types';
import { UserProfile } from '../types/auth';
import { JeconLogo } from './JeconLogo';
import { LanguageSelector } from './LanguageSelector';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  settings: CampaignSettings;
  pendingApprovalsCount: number;
  unreadInquiriesCount: number;
  currentUser?: UserProfile | null;
  onOpenAuthModal: () => void;
  onOpenPasswordModal: () => void;
  onSignOut: () => void;
  onResetDemoWorkspace: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  pendingApprovalsCount,
  unreadInquiriesCount,
  currentUser,
  onOpenAuthModal,
  onOpenPasswordModal,
  onSignOut,
}) => {
  // Option A: Streamlined Flat Menu mapped to DAKO Gaps
  const navTabs = [
    { id: 'content', label: 'Content Studio', icon: Send, badge: pendingApprovalsCount },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'inbox', label: 'Inbox', icon: MessageSquare, badge: unreadInquiriesCount },
    { id: 'contacts', label: 'Contacts', icon: Users },
    { id: 'email_automations', label: 'Email & Automations', icon: Workflow },
    { id: 'ads', label: 'Ads Manager', icon: Megaphone },
    { id: 'analytics_revenue', label: 'Analytics & Revenue', icon: BarChart3 },
    { id: 'events', label: 'Events', icon: Ticket },
    { id: 'channels', label: 'Channels', icon: Share2 },
    { id: 'supplier_hub', label: 'Supplier Hub', icon: Building2 },
  ];

  return (
    <header dir="ltr" className="bg-white border-b border-slate-200/90 sticky top-0 z-30 shadow-2xs">
      <div className="bg-[#0b2545] text-white px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer text-left"
            title="Return to Landing Page"
          >
            <div className="w-7 h-7 rounded-md bg-[#081b33] border border-sky-400/40 p-0.5 flex items-center justify-center shrink-0">
              <JeconLogo variant="icon-only" size="sm" theme="dark" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-tight text-white">DAKO</span>
              <span className="text-[11px] font-semibold text-sky-300 hidden sm:inline">Marketing Suite</span>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="hidden sm:flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-sky-200 font-medium">Free Trial: 26 Days Left</span>
          </div>

          {currentUser ? (
            <div className="flex items-center gap-2">
              <span className="text-slate-300 font-medium hidden sm:inline">{currentUser.name}</span>
              <button
                type="button"
                onClick={onOpenPasswordModal}
                title="Change Password"
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={onSignOut}
                title="Sign Out"
                className="p-1.5 text-slate-300 hover:text-rose-300 hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAuthModal}
              className="text-xs font-bold text-sky-300 hover:text-white transition-colors cursor-pointer"
            >
              Sign In
            </button>
          )}

          <LanguageSelector variant="dark" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1 overflow-x-auto py-2.5 scrollbar-none" aria-label="Workspace Tabs">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0284c7] text-white shadow-md shadow-sky-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                {Boolean(tab.badge && tab.badge > 0) && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${isActive ? 'bg-white/25 text-white' : 'bg-rose-100 text-rose-700'}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;