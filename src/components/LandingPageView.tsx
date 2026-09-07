// jecon-marketing-suite/src/components/LandingPageView.tsx

import React, { useState } from 'react';
import { 
  Sun, 
  Moon, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Building2, 
  ShieldCheck, 
  BarChart3, 
  Sparkles,
  Zap,
  Globe
} from 'lucide-react';
import { CampaignSettings } from '../types';
import { UserProfile } from '../types/auth';

interface LandingPageViewProps {
  settings: CampaignSettings;
  currentUser?: UserProfile | null;
  onEnterApp: () => void;
  onOpenAuth: () => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  settings,
  currentUser,
  onEnterApp,
  onOpenAuth
}) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  return (
    <div className={`min-h-screen transition-colors duration-200 font-sans ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900'
    }`}>
      {/* Top Header */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
        isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0b2545] border border-sky-400/40 p-1 flex items-center justify-center shrink-0 shadow-sm">
              <Send className="w-4 h-4 text-sky-300" />
            </div>
            <div>
              <span className={`font-black text-sm tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>JECON</span>
              <span className="text-[11px] font-bold text-sky-500 block uppercase tracking-widest leading-none">Marketing Suite</span>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold">
            <a href="#solutions" className={`transition-colors ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Solutions</a>
            <a href="#features" className={`transition-colors ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Features</a>
            <a href="#security" className={`transition-colors ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Security</a>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsDark(!isDark)}
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                isDark 
                  ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700' 
                  : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
              title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {currentUser ? (
              <button
                type="button"
                onClick={onEnterApp}
                className="px-4 py-2 text-xs font-bold text-white bg-[#0284c7] hover:bg-sky-500 rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Launch Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className={`px-3 py-2 text-xs font-bold transition-colors cursor-pointer ${
                    isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={onEnterApp}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#0284c7] hover:bg-sky-500 rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Launch Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Dedicated Social &amp; CRM Operations</span>
        </div>

        <h1 className={`text-4xl sm:text-6xl font-black tracking-tight max-w-4xl mx-auto ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          Turn Deals &amp; Knowledge into Client Pipeline
        </h1>

        <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}>
          The unified command center for independent advisors, entrepreneurs, and service operators. Orchestrate authority content, schedule cross-platform dispatches, and manage CRM contacts in one suite.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onEnterApp}
            className="px-6 py-3 text-sm font-bold text-white bg-[#0284c7] hover:bg-sky-500 rounded-xl shadow-lg shadow-sky-500/20 transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Explore Active Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Stats Bar */}
        <div className={`pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t mt-12 ${
          isDark ? 'border-slate-800' : 'border-slate-100'
        }`}>
          <div className="p-4 rounded-xl">
            <div className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>6 Channels</div>
            <div className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Synced Social APIs</div>
          </div>
          <div className="p-4 rounded-xl">
            <div className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>1-Click</div>
            <div className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Article &amp; Blog Engine</div>
          </div>
          <div className="p-4 rounded-xl">
            <div className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>100%</div>
            <div className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Operator Autonomy</div>
          </div>
          <div className="p-4 rounded-xl">
            <div className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>Sub-Second</div>
            <div className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Edge Deployment</div>
          </div>
        </div>
      </section>

      {/* Solutions / Workflows Section */}
      <section id="solutions" className={`py-20 border-t transition-colors ${
        isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Engineered for High-Touch Service &amp; Creator Businesses
            </h2>
            <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Whether you are booking itineraries, selling professional services, or launching digital drops, JECON structures your distribution engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-500 font-bold">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Hospitality &amp; Advisors</h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Turn supplier deals and complex itineraries into high-converting bookings without manual copying.
                </p>
              </div>
              <button 
                onClick={onEnterApp}
                className="mt-6 text-xs font-bold text-sky-500 hover:text-sky-400 flex items-center gap-1 cursor-pointer"
              >
                <span>Deploy workflow</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 2 */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Consultants &amp; Pros</h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Establish authority on LinkedIn and Facebook with automated case study carousels and scheduled pulse posts.
                </p>
              </div>
              <button 
                onClick={onEnterApp}
                className="mt-6 text-xs font-bold text-sky-500 hover:text-sky-400 flex items-center gap-1 cursor-pointer"
              >
                <span>Deploy workflow</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 3 */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Creators &amp; E-Commerce</h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Scale short-form video discovery across TikTok and Instagram Reels with automated hook pairing.
                </p>
              </div>
              <button 
                onClick={onEnterApp}
                className="mt-6 text-xs font-bold text-sky-500 hover:text-sky-400 flex items-center gap-1 cursor-pointer"
              >
                <span>Deploy workflow</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 4 */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Agencies &amp; Operators</h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Coordinate distinct client campaigns, isolated workspaces, and centralized DMs in one unified portal.
                </p>
              </div>
              <button 
                onClick={onEnterApp}
                className="mt-6 text-xs font-bold text-sky-500 hover:text-sky-400 flex items-center gap-1 cursor-pointer"
              >
                <span>Deploy workflow</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            High-Performance Tools Without Context Switching
          </h2>
          <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Every module is interconnected so content created in one place flows directly to publishing and analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={`p-8 rounded-2xl border space-y-4 ${
            isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-500">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>AI Content Studio &amp; CRM</h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Generate platform-compliant social copy optimized for TikTok, LinkedIn, and Instagram. Manage lists, contacts, and custom fields with Supabase RLS security.
            </p>
          </div>

          <div className={`p-8 rounded-2xl border space-y-4 ${
            isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Unified Dispatch Calendar &amp; Analytics</h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Coordinate your brand narrative across dates and channels with drag-and-drop schedule adjustments and real-time reach tracking.
            </p>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className={`py-16 border-t transition-colors ${
        isDark ? 'bg-slate-900/30 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-500 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Enterprise Data Security</span>
            </div>
            <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Built on Supabase PostgreSQL &amp; Vercel Edge
            </h3>
            <p className={`text-xs max-w-xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Row-Level Security guarantees client DMs and draft strategies remain strictly confidential. Zero vendor lock-in with instant Markdown and JSON exports.
            </p>
          </div>

          <button
            type="button"
            onClick={onEnterApp}
            className="px-5 py-3 text-xs font-bold text-white bg-[#0284c7] hover:bg-sky-500 rounded-xl shadow-md transition-all cursor-pointer shrink-0"
          >
            Launch Advisory Suite
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t py-8 text-center text-xs transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} Enterprise Marketing Suite. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={onEnterApp} className="hover:underline">Workspace</button>
            <span>•</span>
            <button onClick={onOpenAuth} className="hover:underline">Sign In</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageView;