import React, { useState } from 'react';
import { 
  Check, 
  Sun, 
  Moon, 
  Sparkles, 
  Clock, 
  UserCheck 
} from 'lucide-react';

interface PricingPageViewProps {
  onBackToHome: () => void;
  onEnterDashboard: () => void;
}

interface SoftwareTier {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  accountLimit: string;
  features: string[];
  ctaLabel: string;
}

interface ConciergeTier {
  name: string;
  badge?: string;
  monthlyPrice: number;
  annualPrice: number;
  hours: string;
  focus: string;
}

const SOFTWARE_TIERS: SoftwareTier[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Essential toolkit for solo operators getting started with distribution.',
    monthlyPrice: 0,
    annualPrice: 0,
    accountLimit: '1 Account',
    features: [
      'Up to 15 scheduled posts/month',
      '2 connected social platforms',
      'Basic inquiry triage inbox',
      'Community knowledge base access',
      'Standard web analytics (7-day window)'
    ],
    ctaLabel: 'Start Free'
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Advanced scheduling and full automated publishing suite.',
    monthlyPrice: 19,
    annualPrice: 15,
    popular: true,
    accountLimit: '1 Account',
    features: [
      'Unlimited scheduled posts & reels',
      'All 6 connected social channels',
      'AI article and blog engine',
      'Priority inbound direct message inbox',
      'Unified 90-day performance telemetry',
      'Email and chat support'
    ],
    ctaLabel: 'Get Started with Pro'
  },
  {
    id: 'elite',
    name: 'Elite',
    description: 'Collaborative pipeline management designed for growing teams.',
    monthlyPrice: 79,
    annualPrice: 65,
    accountLimit: 'Up to 4 Accounts',
    features: [
      'Everything in Pro included',
      'Multi-seat workspace (up to 4 operators)',
      'Custom campaign approval workflows',
      'Dedicated partner webhook integrations',
      'Live audience growth benchmarking',
      'Priority 1-on-1 onboarding'
    ],
    ctaLabel: 'Upgrade to Elite'
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Tailored infrastructure and custom capacity for high-volume firms.',
    monthlyPrice: 199,
    annualPrice: 169,
    accountLimit: '5+ Accounts',
    features: [
      'Everything in Elite included',
      'Unlimited seats & brand workspaces',
      'Custom API rate limit allotments',
      'Dedicated account manager',
      'SLA-backed uptime guarantees',
      'Custom invoice billing'
    ],
    ctaLabel: 'Contact Sales'
  }
];

const CONCIERGE_TIERS: ConciergeTier[] = [
  {
    name: 'Marketer 10',
    monthlyPrice: 300,
    annualPrice: 3300,
    hours: '10 hrs/wk (40/mo)',
    focus: 'Client/customer message triage, basic content calendar upkeep, 1–2 scheduled social posts/week, email follow-ups'
  },
  {
    name: 'Marketer 20',
    badge: 'Most Popular',
    monthlyPrice: 470,
    annualPrice: 5170,
    hours: '20 hrs/wk (80/mo)',
    focus: 'Above, plus vendor/ad-platform coordination, 3–4 social posts/week, ad campaign setup & lead tracking, rent-reminder-style automated client touchpoints'
  },
  {
    name: 'Marketer 30',
    monthlyPrice: 800,
    annualPrice: 8800,
    hours: '30 hrs/wk (120/mo)',
    focus: 'Full client communications, campaign scheduling, content creation (blog/newsletter), organic growth strategy, analytics reporting'
  },
  {
    name: 'Marketer 40',
    badge: 'Dedicated Partner',
    monthlyPrice: 1550,
    annualPrice: 17050,
    hours: '40 hrs/wk (160/mo)',
    focus: 'Daily dedicated monitoring, 15-min SLA response, biweekly strategy sessions with client, full-funnel execution (ads, SEO, campaigns), cross-platform social management, advanced reporting dashboards'
  }
];

export const PricingPageView: React.FC<PricingPageViewProps> = ({
  onBackToHome,
  onEnterDashboard
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [isDark, setIsDark] = useState<boolean>(false);

  return (
    <div className={`min-h-screen transition-colors duration-200 font-sans ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      {/* Expanded Header: High-clearance height to accommodate the full logo without clipping */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
        isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
          
          {/* Logo only: Clicking returns to Landing Page */}
          <button
            type="button"
            onClick={onBackToHome}
            className="group flex items-center cursor-pointer focus:outline-none select-none transition-transform hover:scale-[1.02]"
            title="Return to Home"
          >
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="h-16 w-auto max-w-[260px] object-contain shrink-0" 
            />
          </button>

          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
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
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              type="button"
              onClick={onEnterDashboard}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#0284c7] hover:bg-sky-500 rounded-xl shadow-sm transition-all cursor-pointer"
            >
              Launch Workspace
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16">
        
        {/* Title Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-wider">
            Simple, Transparent Pricing
          </div>
          <h1 className={`text-3xl sm:text-5xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            One workspace for every stage of your marketing
          </h1>
          <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Start free, scale into Pro as an individual, bring your team on with Elite, or speak with us about custom capacity.
          </p>

          {/* Billing Switch */}
          <div className="pt-4 flex items-center justify-center">
            <div className={`p-1 rounded-xl border flex items-center gap-1 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  billingCycle === 'monthly'
                    ? isDark 
                      ? 'bg-slate-800 text-white shadow-xs' 
                      : 'bg-white text-slate-900 shadow-xs'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Monthly Price
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  billingCycle === 'annual'
                    ? isDark 
                      ? 'bg-slate-800 text-white shadow-xs' 
                      : 'bg-white text-slate-900 shadow-xs'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <span>Annual Price</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase bg-sky-500/20 text-sky-600 dark:text-sky-400">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Section 1: Software Workspace Tiers */}
        <div>
          <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Software Subscription Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {SOFTWARE_TIERS.map((tier) => {
              const price = billingCycle === 'annual' ? tier.annualPrice : tier.monthlyPrice;

              return (
                <div
                  key={tier.id}
                  className={`relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 ${
                    tier.popular
                      ? isDark
                        ? 'bg-slate-900 border-2 border-sky-500 shadow-xl shadow-sky-950/50'
                        : 'bg-white border-2 border-sky-500 shadow-xl shadow-sky-100'
                      : isDark
                        ? 'bg-slate-900/60 border border-slate-800 hover:border-slate-700'
                        : 'bg-white border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#0284c7] text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                      Most Popular
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {tier.name}
                      </h3>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                        isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {tier.accountLimit}
                      </span>
                    </div>

                    <p className={`text-xs min-h-[36px] mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {tier.description}
                    </p>

                    <div className="mb-6 flex items-baseline gap-1">
                      <span className={`text-4xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        ${price}
                      </span>
                      <span className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        / month
                      </span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs">
                          <Check className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                          <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={onEnterDashboard}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      tier.popular
                        ? 'bg-[#0284c7] hover:bg-sky-500 text-white shadow-md shadow-sky-500/20'
                        : isDark
                          ? 'bg-slate-800 hover:bg-slate-700 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    {tier.ctaLabel}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Concierge Tier Structure */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-500 uppercase tracking-wider mb-1">
                <UserCheck className="w-4 h-4" />
                <span>Managed Execution</span>
              </div>
              <h2 className={`text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Concierge Tier Structure
              </h2>
              <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Hands-on digital marketing professionals handling outbound distribution, client touchpoints, and campaign setup.
              </p>
            </div>
            <div className={`text-xs px-3 py-1.5 rounded-lg border font-semibold ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
            }`}>
              Billed: {billingCycle === 'annual' ? 'Annually (Save with Year Commitment)' : 'Month-to-Month'}
            </div>
          </div>

          {/* Concierge Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {CONCIERGE_TIERS.map((tier, idx) => {
              const displayPrice = billingCycle === 'annual' 
                ? `$${tier.annualPrice.toLocaleString()} / yr`
                : `$${tier.monthlyPrice.toLocaleString()} / mo`;

              return (
                <div
                  key={idx}
                  className={`relative rounded-2xl p-6 flex flex-col justify-between border transition-all ${
                    tier.badge
                      ? isDark
                        ? 'bg-slate-900/90 border-sky-500 shadow-lg shadow-sky-950/40'
                        : 'bg-white border-sky-500 shadow-lg shadow-sky-100'
                      : isDark
                        ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {tier.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#0284c7] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                      {tier.badge}
                    </div>
                  )}

                  <div>
                    <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {tier.name}
                    </h3>
                    
                    {/* Hours allotment */}
                    <div className="flex items-center gap-1.5 mb-4 text-xs font-semibold text-sky-600 dark:text-sky-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{tier.hours}</span>
                    </div>

                    {/* Pricing */}
                    <div className="mb-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                      <div className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {displayPrice}
                      </div>
                      {billingCycle === 'monthly' && (
                        <div className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          ${tier.annualPrice.toLocaleString()} / yr commitment
                        </div>
                      )}
                    </div>

                    {/* Role Focus Description */}
                    <div>
                      <span className={`text-[11px] font-bold uppercase tracking-wider block mb-2 ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        Role Focus &amp; Responsibilities
                      </span>
                      <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        {tier.focus}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onEnterDashboard}
                    className={`mt-6 w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      tier.badge
                        ? 'bg-[#0284c7] hover:bg-sky-500 text-white shadow-md shadow-sky-500/20'
                        : isDark
                          ? 'bg-slate-800 hover:bg-slate-700 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    Select {tier.name}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className={`border-t py-8 text-center text-xs transition-colors ${
        isDark ? 'bg-slate-900/50 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
      }`}>
        <p>&copy; {new Date().getFullYear()} Marketing Suite. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PricingPageView;