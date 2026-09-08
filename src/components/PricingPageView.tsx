// src/components/PricingPageView.tsx

import React, { useState } from 'react';
import { 
  Check, 
  Sun, 
  Moon, 
  Clock, 
  UserCheck, 
  CalendarDays, 
  ChevronDown 
} from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { CONCIERGE_SCHEDULES } from '../data/conciergeSchedules';

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
    name: 'Free Tier',
    description: 'Facebook posting, contact management, and access to 300+ integrations — forever free.',
    monthlyPrice: 0,
    annualPrice: 0,
    accountLimit: '1 User',
    features: [
      'Facebook posting only (plus basic web signup form)',
      'Contact management + 1 web sign-up form',
      'Monthly email sends: 5x your contact count',
      'Basic reach & engagement reporting',
      'Community & email support',
      'Access to 300+ integrations'
    ],
    ctaLabel: 'Start Free'
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Automated multi-channel posting and AI-assisted email marketing, with live onboarding.',
    monthlyPrice: 9.99,
    annualPrice: 109.99,
    accountLimit: '1 User',
    features: [
      'Easy-to-use drag-and-drop email editor & AI copy generator',
      'Automatic posting to Facebook, Instagram & LinkedIn',
      'Post 5 short-form videos/mo (Reels, TikTok, Shorts)',
      '1 automation template + 1 custom segment',
      'Monthly email sends: 10x your contact count',
      'Live 1:1 onboarding with marketing experts',
      'Events: registration, payments & product sales'
    ],
    ctaLabel: 'Get Started with Pro'
  },
  {
    id: 'elite',
    name: 'Elite',
    description: 'Full social scheduling across 13+ platforms, subject line testing, and a social ads manager.',
    monthlyPrice: 25.99,
    annualPrice: 285.99,
    popular: true,
    accountLimit: '3 Users',
    features: [
      'Scheduled email sends & subject line A/B testing',
      'Schedule all posts in advance across 13+ social platforms',
      '3 automation templates, AI campaign builder & auto-resend',
      '10 custom segments + engagement segmentation',
      'Social media ads manager',
      'Monthly email sends: 12x your contact count',
      'Drilldown reporting & marketing campaign calendar'
    ],
    ctaLabel: 'Upgrade to Elite'
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Unlimited users, custom automations, full-platform integration, and Google Ads & SEO tools.',
    monthlyPrice: 60.99,
    annualPrice: 670.99,
    accountLimit: 'Unlimited Users',
    features: [
      'Everything in Elite, plus dynamic content & AI personalization',
      'Full Multi-Platform Integration Suite (all 14+ channels)',
      'Unlimited automation templates, custom automations & ecommerce',
      'Unlimited custom segments, incl. ecommerce segmentation',
      'Facebook Lookalike targeting & Google Ads Manager',
      'AI SEO recommendations & keyword clustering',
      'True revenue attribution reporting & priority onboarding'
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
    focus: 'Client/customer message triage across core channels, basic content calendar upkeep, 1–2 scheduled social posts/week, routine email follow-ups & basic lead acknowledgments.'
  },
  {
    name: 'Marketer 20',
    badge: 'Most Popular',
    monthlyPrice: 470,
    annualPrice: 5170,
    hours: '20 hrs/wk (80/mo)',
    focus: 'All Marketer 10 capabilities, plus vendor & ad-platform coordination, 3–4 tailored social posts/week, initial ad campaign setup & lead tracking, automated touchpoints & custom segments.'
  },
  {
    name: 'Marketer 30',
    monthlyPrice: 800,
    annualPrice: 8800,
    hours: '30 hrs/wk (120/mo)',
    focus: 'Comprehensive client communications, proactive campaign scheduling, deep content creation (blog, newsletter, multi-step sequences), organic growth strategy, and detailed analytics reporting.'
  },
  {
    name: 'Marketer 40',
    badge: 'Dedicated Partner',
    monthlyPrice: 1550,
    annualPrice: 17050,
    hours: '40 hrs/wk (160/mo)',
    focus: 'Daily dedicated monitoring, 15-min SLA response, biweekly strategy sessions with client, full-funnel execution (ads, SEO, campaigns), cross-platform social community management, advanced custom KPI dashboards.'
  }
];

export const PricingPageView: React.FC<PricingPageViewProps> = ({
  onBackToHome,
  onEnterDashboard
}) => {
  const [saasBillingCycle, setSaasBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [conciergeBillingCycle, setConciergeBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [expandedScheduleTier, setExpandedScheduleTier] = useState<string | null>(null);
  const [activeScheduleDay, setActiveScheduleDay] = useState<Record<string, number>>({});

  const toggleSchedule = (tierName: string) => {
    setExpandedScheduleTier((prev) => (prev === tierName ? null : tierName));
  };

  const setDayForTier = (tierName: string, dayIdx: number) => {
    setActiveScheduleDay((prev) => ({ ...prev, [tierName]: dayIdx }));
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 font-sans ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      {/* Expanded Header */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
        isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
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

            <LanguageSelector variant="landing" />
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
            Start free, scale into Pro as an individual, grow into Elite with your team, or deploy Business for full-platform enterprise power.
          </p>

          {/* SaaS Hero Toggle (Centered) */}
          <div className="pt-4 flex items-center justify-center">
            <div className={`p-1 rounded-xl border flex items-center gap-1 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                type="button"
                onClick={() => setSaasBillingCycle('monthly')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  saasBillingCycle === 'monthly'
                    ? isDark ? 'bg-slate-800 text-white shadow-xs' : 'bg-white text-slate-900 shadow-xs'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Monthly Price
              </button>
              <button
                type="button"
                onClick={() => setSaasBillingCycle('annual')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  saasBillingCycle === 'annual'
                    ? isDark ? 'bg-slate-800 text-white shadow-xs' : 'bg-white text-slate-900 shadow-xs'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Annual Price
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
              const isAnnual = saasBillingCycle === 'annual';
              const displayPrice = isAnnual 
                ? (tier.annualPrice === 0 ? '$0' : `$${tier.annualPrice.toFixed(2)}`)
                : (tier.monthlyPrice === 0 ? '$0' : `$${tier.monthlyPrice.toFixed(2)}`);
              const periodLabel = tier.monthlyPrice === 0 ? '' : (isAnnual ? '/ year' : '/ month');

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

                    <div className="mb-2 flex items-baseline gap-1">
                      <span className={`text-4xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {displayPrice}
                      </span>
                      {periodLabel && (
                        <span className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {periodLabel}
                        </span>
                      )}
                    </div>

                    {isAnnual && tier.annualPrice > 0 && (
                      <div className="text-[11px] text-sky-500 font-semibold mb-6">
                        Includes 1 month free
                      </div>
                    )}
                    {(!isAnnual || tier.annualPrice === 0) && (
                      <div className="h-4 mb-6"></div>
                    )}

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
          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-500 uppercase tracking-wider mb-1">
              <UserCheck className="w-4 h-4" />
              <span>Managed Execution</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Concierge Tier Structure
            </h2>
            <p className={`text-xs sm:text-sm max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Hands-on digital marketing professionals handling outbound distribution, client touchpoints, and full campaign execution.
            </p>

            {/* Concierge Hero Toggle (Centered) */}
            <div className="pt-4 flex items-center justify-center">
              <div className={`p-1 rounded-xl border flex items-center gap-1 ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
              }`}>
                <button
                  type="button"
                  onClick={() => setConciergeBillingCycle('monthly')}
                  className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    conciergeBillingCycle === 'monthly'
                      ? isDark ? 'bg-slate-800 text-white shadow-xs' : 'bg-white text-slate-900 shadow-xs'
                      : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Monthly Price
                </button>
                <button
                  type="button"
                  onClick={() => setConciergeBillingCycle('annual')}
                  className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    conciergeBillingCycle === 'annual'
                      ? isDark ? 'bg-slate-800 text-white shadow-xs' : 'bg-white text-slate-900 shadow-xs'
                      : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Annual Commitment
                </button>
              </div>
            </div>
          </div>

          {/* Concierge Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mt-8">
            {CONCIERGE_TIERS.map((tier, idx) => {
              const isAnnual = conciergeBillingCycle === 'annual';
              const displayPrice = isAnnual 
                ? `$${tier.annualPrice.toLocaleString()} / yr`
                : `$${tier.monthlyPrice.toLocaleString()} / mo`;
              const schedule = CONCIERGE_SCHEDULES[tier.name];
              const isScheduleOpen = expandedScheduleTier === tier.name;
              const selectedDayIdx = activeScheduleDay[tier.name] ?? 0;
              const selectedDay = schedule?.[selectedDayIdx];

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
                      {!isAnnual && (
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

                    {/* Weekly Schedule Toggle */}
                    {schedule && (
                      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                        <button
                          type="button"
                          onClick={() => toggleSchedule(tier.name)}
                          className={`w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                            isDark ? 'text-slate-300 hover:text-sky-400' : 'text-slate-600 hover:text-sky-600'
                          }`}
                        >
                          <span className="inline-flex items-center gap-1.5">
                            <CalendarDays className="w-3.5 h-3.5" />
                            View Weekly Schedule
                          </span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${isScheduleOpen ? 'rotate-180' : ''}`}
                          />
                        </button>

                        {isScheduleOpen && selectedDay && (
                          <div className="mt-3 space-y-3">
                            <div className="flex flex-wrap gap-1">
                              {schedule.map((d, dayIdx) => (
                                <button
                                  key={d.day}
                                  type="button"
                                  onClick={() => setDayForTier(tier.name, dayIdx)}
                                  className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide transition-colors cursor-pointer ${
                                    dayIdx === selectedDayIdx
                                      ? 'bg-[#0284c7] text-white'
                                      : isDark
                                        ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                  }`}
                                >
                                  {d.day.slice(0, 3)}
                                </button>
                              ))}
                            </div>

                            <div className={`rounded-xl p-3 space-y-2 ${
                              isDark ? 'bg-slate-950/60 border border-slate-800' : 'bg-slate-50 border border-slate-200'
                            }`}>
                              <div className="flex items-center justify-between">
                                <span className={`text-[11px] font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                  {selectedDay.day}
                                </span>
                                <span className="text-[11px] font-bold text-sky-500">
                                  {selectedDay.totalHours}
                                </span>
                              </div>
                              <ul className="space-y-1.5">
                                {selectedDay.blocks.map((block, blockIdx) => (
                                  <li key={blockIdx} className="text-[11px] leading-relaxed">
                                    <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                                      {block.label} &mdash; {block.task}:
                                    </span>{' '}
                                    <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                                      {block.detail}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                              {selectedDay.flexNote && (
                                <p className={`text-[10px] italic pt-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                                  {selectedDay.flexNote}
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
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
        <p>&copy; {new Date().getFullYear()} DAKO Marketing Suite. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PricingPageView;