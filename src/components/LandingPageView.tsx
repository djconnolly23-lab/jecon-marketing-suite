// jecon-marketing-suite/src/components/LandingPageView.tsx

import React, { useState } from 'react';
import { 
  Sun, 
  Moon, 
  Send, 
  ArrowRight, 
  Users, 
  Building2, 
  ShieldCheck, 
  BarChart3, 
  Sparkles,
  Zap,
  Globe,
  UserCheck,
  MessageSquare,
  Target
} from 'lucide-react';
import { CampaignSettings } from '../types';
import { UserProfile } from '../types/auth';

interface LandingPageViewProps {
  settings: CampaignSettings;
  currentUser?: UserProfile | null;
  onEnterApp: () => void;
  onOpenAuth: () => void;
  onOpenPricing?: () => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  settings,
  currentUser,
  onEnterApp,
  onOpenAuth,
  onOpenPricing
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
            <a href="#features" className={`transition-colors ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Platform</a>
            {onOpenPricing && (
              <button 
                type="button" 
                onClick={onOpenPricing} 
                className={`transition-colors cursor-pointer bg-transparent border-none p-0 text-xs font-semibold ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Pricing
              </button>
            )}
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
                <span>Enter Workspace</span>
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
                  <span>Get Started</span>
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
          <UserCheck className="w-3.5 h-3.5" />
          <span>Platform + Dedicated Human Marketers</span>
        </div>

        <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          Professional Digital Marketing.<br className="hidden sm:block" />
          With Your Own Human Marketer.
        </h1>

        <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}>
          JECON combines a modern marketing platform with a dedicated human Marketer who manages strategy, content, and execution for your business — across any industry.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onEnterApp}
            className="px-6 py-3 text-sm font-bold text-white bg-[#0284c7] hover:bg-sky-500 rounded-xl shadow-lg shadow-sky-500/20 transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Start with Your Marketer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          {onOpenPricing && (
            <button
              type="button"
              onClick={onOpenPricing}
              className={`px-6 py-3 text-sm font-bold border rounded-xl transition-all cursor-pointer ${
                isDark ? 'border-slate-700 hover:bg-slate-900 text-slate-200' : 'border-slate-200 hover:bg-slate-50 text-slate-800'
              }`}
            >
              View Plans
            </button>
          )}
        </div>

        {/* Quick Stats Bar */}
        <div className={`pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t mt-12 ${
          isDark ? 'border-slate-800' : 'border-slate-100'
        }`}>
          <div className="p-4 rounded-xl">
            <div className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>Human-Led</div>
            <div className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Dedicated Marketers</div>
          </div>
          <div className="p-4 rounded-xl">
            <div className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>All Niches</div>
            <div className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Industry Agnostic</div>
          </div>
          <div className="p-4 rounded-xl">
            <div className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>Full Stack</div>
            <div className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Strategy to Execution</div>
          </div>
          <div className="p-4 rounded-xl">
            <div className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>One Platform</div>
            <div className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Content, Channels, CRM</div>
          </div>
        </div>
      </section>

      {/* Solutions / Who It's For */}
      <section id="solutions" className={`py-20 border-t transition-colors ${
        isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Built for Every Business That Needs Marketing Done Right
            </h2>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Whether you sell services, products, or expertise, your dedicated Marketer adapts to your niche and executes with precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-500">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Professional Services</h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Consultants, agencies, and service firms that need consistent authority content and lead generation without building an internal team.
                </p>
              </div>
              <button 
                type="button"
                onClick={onEnterApp}
                className="mt-6 text-xs font-bold text-sky-500 hover:text-sky-400 flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
              >
                <span>Explore this path</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 2 */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Local & Retail Businesses</h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Restaurants, clinics, salons, and retail brands that require steady social presence, promotions, and local visibility.
                </p>
              </div>
              <button 
                type="button"
                onClick={onEnterApp}
                className="mt-6 text-xs font-bold text-sky-500 hover:text-sky-400 flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
              >
                <span>Explore this path</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 3 */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>E-Commerce & Creators</h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Online stores and personal brands that need high-volume content, multi-channel distribution, and conversion-focused campaigns.
                </p>
              </div>
              <button 
                type="button"
                onClick={onEnterApp}
                className="mt-6 text-xs font-bold text-sky-500 hover:text-sky-400 flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
              >
                <span>Explore this path</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 4 */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Founders & Operators</h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Solo founders and small teams who want professional marketing execution without the cost or complexity of a full agency.
                </p>
              </div>
              <button 
                type="button"
                onClick={onEnterApp}
                className="mt-6 text-xs font-bold text-sky-500 hover:text-sky-400 flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
              >
                <span>Explore this path</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Features / Platform Section */}
      <section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Platform Power. Human Precision.
          </h2>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Your Marketer works inside a purpose-built system designed for clarity, speed, and measurable results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-8 rounded-2xl border space-y-4 ${
            isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-500">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Dedicated Human Marketer</h3>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              A real marketing professional assigned to your account. They handle strategy, content direction, and ongoing optimization — not a chatbot.
            </p>
          </div>

          <div className={`p-8 rounded-2xl border space-y-4 ${
            isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <Target className="w-5 h-5" />
            </div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Multi-Channel Execution</h3>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Content, scheduling, and distribution across major platforms — coordinated from a single workspace with clear visibility.
            </p>
          </div>

          <div className={`p-8 rounded-2xl border space-y-4 ${
            isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Performance & Reporting</h3>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Transparent reporting on reach, engagement, and pipeline impact so you always know what is working and why.
            </p>
          </div>
        </div>

        {/* Secondary feature row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className={`p-8 rounded-2xl border space-y-4 ${
            isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Direct Collaboration</h3>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Communicate directly with your Marketer inside the platform. Briefs, feedback, and approvals stay organized and actionable.
            </p>
          </div>

          <div className={`p-8 rounded-2xl border space-y-4 ${
            isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-500">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Content & Campaign Engine</h3>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Structured workflows for content creation, approval, and publishing — supported by both human judgment and platform tools.
            </p>
          </div>
        </div>
      </section>

      {/* Security / Trust Section */}
      <section id="security" className={`py-16 border-t transition-colors ${
        isDark ? 'bg-slate-900/30 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-500 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Secure & Transparent</span>
            </div>
            <h3 className={`text-xl sm:text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Enterprise-grade infrastructure. Clear ownership of your data.
            </h3>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Built on reliable cloud infrastructure with strict access controls. Your brand assets, strategy, and performance data remain fully under your control.
            </p>
          </div>

          <button
            type="button"
            onClick={onEnterApp}
            className="px-6 py-3 text-sm font-bold text-white bg-[#0284c7] hover:bg-sky-500 rounded-xl shadow-md transition-all cursor-pointer shrink-0"
          >
            Meet Your Marketer
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t py-8 text-center text-xs transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} JECON Marketing Suite. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {onOpenPricing && (
              <button 
                type="button" 
                onClick={onOpenPricing} 
                className="hover:underline bg-transparent border-none p-0 text-xs text-inherit cursor-pointer"
              >
                Pricing
              </button>
            )}
            <span>•</span>
            <button type="button" onClick={onEnterApp} className="hover:underline bg-transparent border-none p-0 text-xs text-inherit cursor-pointer">Workspace</button>
            <span>•</span>
            <button type="button" onClick={onOpenAuth} className="hover:underline bg-transparent border-none p-0 text-xs text-inherit cursor-pointer">Sign In</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageView;