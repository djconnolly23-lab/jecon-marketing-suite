// jecon-marketing-suite/src/components/PricingPageView.tsx

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface PricingPageViewProps {
  onBackToHome?: () => void;
  onEnterDashboard?: () => void;
}

// ---------------------------------------------------------------------------
// JECON Brand Tokens
// Sampled directly from JECON_LOGO-FINAL.pdf:
//   Navy globe   -> #0B2545  (matches existing app header/nav navy)
//   Sky blue arc -> #0284C7  (matches existing app CTA/accent blue)
//   Wordmark gray-> #5A5758
//   Shadow gray  -> #C8C7C7
// ---------------------------------------------------------------------------
const BRAND = {
  navy: '#0B2545',
  navyDark: '#081B33',
  blue: '#0284C7',
  blueLight: '#38BDF8',
  gray: '#5A5758',
  grayLight: '#C8C7C7',
};

export const PricingPageView: React.FC<PricingPageViewProps> = ({
  onBackToHome,
  onEnterDashboard,
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  // Auth & Checkout Modal State
  const [authOpen, setAuthOpen] = useState(false);
  const [authPlan, setAuthPlan] = useState<string>('Free');
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  // Contact / Business tier modal state (Business has no self-serve checkout)
  const [contactOpen, setContactOpen] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactCompany, setContactCompany] = useState('');
  const [contactAccounts, setContactAccounts] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('jecon-theme') as 'light' | 'dark' | null;
    if (savedTheme === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('jecon-theme', 'dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('jecon-theme', 'light');
    }
  };

  const openPlanSignup = (planName: string) => {
    setAuthPlan(planName);
    setIsSignUp(true);
    setMessage(null);
    setAuthOpen(true);
  };

  const openContactSales = () => {
    setContactSubmitted(false);
    setContactOpen(true);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName, portal: 'jecon', plan: authPlan },
          },
        });
        if (error) throw error;
        setMessage({ type: 'success', text: `Account created for ${authPlan} Plan! Redirecting...` });
        setTimeout(() => {
          if (onEnterDashboard) {
            onEnterDashboard();
          } else {
            window.location.reload();
          }
        }, 1200);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (onEnterDashboard) {
          onEnterDashboard();
        } else {
          window.location.reload();
        }
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'An error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  // NOTE FOR DEV TEAM: This does not currently submit anywhere. Wire this to
  // your actual lead-routing destination (CRM webhook, email API, etc.)
  // before launch. See SDOM note in accompanying message.
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  // ---------------------------------------------------------------------------
  // Tier data — order fixed per spec: Free, Pro, Elite, Business
  // ---------------------------------------------------------------------------
  const saasPlans = [
    {
      id: 'free',
      name: 'Free',
      badge: 'Starter',
      priceMonthly: '$0',
      priceAnnual: '$0',
      annualNote: 'Free forever',
      accounts: '1 account',
      description: 'A real, working version of the platform for individuals getting started.',
      buttonText: 'Start Free',
      popular: false,
      features: [
        'Personal Marketing Hub',
        'Automated social posting (1 channel)',
        'Basic analytics & reporting',
        'Inbox (basic)',
        'Standard email support',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      badge: 'Most Popular',
      priceMonthly: '$12',
      priceAnnual: '$132',
      annualNote: '12 months for the price of 11 ($11/mo)',
      accounts: '1 account',
      description: 'Full content and scheduling tools for a single operator running their own marketing.',
      buttonText: 'Upgrade to Pro',
      popular: true,
      features: [
        'Everything in Free, plus:',
        'Full post scheduling controls',
        'Multi-channel posting (Instagram, Facebook, LinkedIn)',
        'AI content assistant',
        'Blog / guide studio',
        'Unified calendar sync',
        'Custom hashtag automation',
        'Booking/appointment link integration',
      ],
    },
    {
      id: 'elite',
      name: 'Elite',
      badge: 'Team Workspace',
      priceMonthly: '$50',
      priceAnnual: '$550',
      annualNote: '12 months for the price of 11 ($45.83/mo)',
      accounts: 'Up to 4 accounts',
      description: 'Everything in Pro, extended to a small team sharing one workspace.',
      buttonText: 'Go Elite',
      popular: false,
      features: [
        'Everything in Pro, plus:',
        'Team workspace (up to 4 accounts)',
        'Role-based access',
        'Shared content calendar',
        'Advanced analytics',
        'Priority support',
      ],
    },
    {
      id: 'business',
      name: 'Business',
      badge: 'Custom Scale',
      priceMonthly: 'Contact Us',
      priceAnnual: 'Contact Us',
      annualNote: 'Custom pricing for your organization',
      accounts: '5+ accounts',
      description: 'Everything in Elite, scaled for organizations with 5 or more accounts.',
      buttonText: 'Contact Sales',
      popular: false,
      features: [
        'Everything in Elite, plus:',
        '5+ team accounts',
        'Custom onboarding',
        'Dedicated account contact',
        'Custom contract terms',
      ],
    },
  ];

  const comparisonRows = [
    { feature: 'Monthly Price', free: '$0', pro: '$12/mo', elite: '$50/mo', business: 'Contact Us' },
    { feature: 'Annual Price', free: '—', pro: '$132/yr (11 mos)', elite: '$550/yr (11 mos)', business: 'Contact Us' },
    { feature: 'Accounts', free: '1', pro: '1', elite: 'Up to 4', business: '5+' },
    { feature: 'Social Channels', free: '1 channel', pro: 'Multi-channel', elite: 'Multi-channel, shared', business: 'Multi-channel, shared' },
    { feature: 'AI Content Assistant', free: '—', pro: 'Included', elite: 'Included', business: 'Included' },
    { feature: 'Blog / Guide Studio', free: '—', pro: 'Included', elite: 'Included', business: 'Included' },
    { feature: 'Team Collaboration', free: '—', pro: '—', elite: 'Role-based access', business: 'Role-based access' },
    { feature: 'Analytics', free: 'Basic', pro: 'Basic', elite: 'Advanced', business: 'Advanced' },
    { feature: 'Support', free: 'Email', pro: 'Email', elite: 'Priority', business: 'Priority + dedicated contact' },
    { feature: 'Onboarding', free: 'Self-serve', pro: 'Self-serve', elite: 'Self-serve', business: 'Guided, custom' },
  ];

  return (
    <div
      id="pricing"
      className="min-h-screen flex flex-col relative overflow-hidden font-sans transition-colors duration-200 scroll-smooth"
      style={{
        backgroundColor: theme === 'dark' ? '#040D1A' : '#F8FAFC',
        color: theme === 'dark' ? '#FFFFFF' : '#0F172A',
      }}
    >
      {/* Background Ambient Glows */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] blur-[150px] rounded-full pointer-events-none"
        style={{ backgroundColor: theme === 'dark' ? 'rgba(2,132,199,0.12)' : 'rgba(2,132,199,0.08)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[550px] h-[550px] blur-[150px] rounded-full pointer-events-none"
        style={{ backgroundColor: theme === 'dark' ? 'rgba(11,37,69,0.5)' : 'rgba(11,37,69,0.06)' }}
      />

      {/* Header Navigation */}
      <header
        className="relative z-50 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between backdrop-blur-md sticky top-0"
        style={{ borderBottom: `1px solid ${theme === 'dark' ? '#081B33' : '#E2E8F0'}` }}
      >
        <div className="flex items-center">
          <button
            type="button"
            onClick={onBackToHome}
            className="rounded-2xl p-2 flex items-center justify-center shadow-md transition hover:opacity-90 cursor-pointer"
            style={{ backgroundColor: BRAND.navy, border: `1px solid ${BRAND.blue}4D` }}
          >
            <img
              src="/jecon-logo.png"
              alt="JECON"
              className="h-10 w-auto object-contain"
              onError={(e) => {
                // Graceful fallback if image is in vector component format
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="font-black text-white text-base tracking-tight px-2">JECON</span>
          </button>
        </div>

        <nav
          className="hidden lg:flex items-center space-x-7 text-sm font-semibold"
          style={{ color: theme === 'dark' ? '#CBD5E1' : BRAND.gray }}
        >
          <button type="button" onClick={onEnterDashboard} className="hover:opacity-70 transition cursor-pointer">Content Studio</button>
          <button type="button" onClick={onEnterDashboard} className="hover:opacity-70 transition cursor-pointer">Partner Hub</button>
          <button type="button" onClick={onEnterDashboard} className="hover:opacity-70 transition cursor-pointer">Analytics</button>
          <button type="button" onClick={onEnterDashboard} className="hover:opacity-70 transition cursor-pointer">Connected Channels</button>
          <span className="font-bold" style={{ color: BRAND.blue }}>Pricing</span>
        </nav>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2.5 rounded-xl border shadow-sm transition cursor-pointer"
            style={{
              borderColor: theme === 'dark' ? BRAND.navy : '#CBD5E1',
              backgroundColor: theme === 'dark' ? '#081B33CC' : '#FFFFFF',
              color: theme === 'dark' ? '#E2E8F0' : BRAND.gray,
            }}
          >
            {theme === 'light' ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthPlan('Free');
              setIsSignUp(false);
              setAuthOpen(true);
            }}
            className="px-4 py-2 text-sm font-semibold border rounded-xl transition cursor-pointer"
            style={{
              color: theme === 'dark' ? '#E2E8F0' : BRAND.gray,
              borderColor: theme === 'dark' ? BRAND.navy : '#CBD5E1',
              backgroundColor: theme === 'dark' ? '#081B3399' : '#FFFFFF',
            }}
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => openPlanSignup('Free')}
            className="px-4 py-2 text-sm font-bold text-white rounded-xl transition shadow-md cursor-pointer"
            style={{ backgroundColor: BRAND.blue, boxShadow: `0 4px 14px ${BRAND.blue}33` }}
          >
            Get Started Free
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-12 pb-8 text-center space-y-4">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm"
          style={{
            backgroundColor: theme === 'dark' ? '#081B33' : '#E0F2FE',
            border: `1px solid ${BRAND.blue}55`,
            color: theme === 'dark' ? BRAND.blueLight : BRAND.navy,
          }}
        >
          <span>Simple, Transparent Pricing</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
          JECON Pricing
        </h1>
        <p className="text-lg sm:text-xl font-semibold max-w-3xl mx-auto" style={{ color: BRAND.blue }}>
          One workspace for every stage of your marketing — from solo operator to full team.
        </p>
        <p
          className="text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
          style={{ color: theme === 'dark' ? '#CBD5E1' : BRAND.gray }}
        >
          Start free, grow into Pro as an individual, bring your team on with Elite, or talk to us
          about a custom Business plan.
        </p>

        {/* Monthly vs Annual Toggle */}
        <div className="pt-6 flex items-center justify-center">
          <div
            className="p-1.5 rounded-2xl inline-flex items-center gap-1 shadow-inner border"
            style={{
              backgroundColor: theme === 'dark' ? '#081B33' : '#E2E8F0',
              borderColor: theme === 'dark' ? BRAND.navy : '#CBD5E1',
            }}
          >
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className="px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition duration-150 cursor-pointer"
              style={
                billingCycle === 'monthly'
                  ? { backgroundColor: theme === 'dark' ? BRAND.navy : '#FFFFFF', color: theme === 'dark' ? '#FFF' : '#0F172A', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }
                  : { color: theme === 'dark' ? '#94A3B8' : BRAND.gray }
              }
            >
              Monthly Price
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className="px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition duration-150 flex items-center gap-1.5 cursor-pointer"
              style={
                billingCycle === 'annual'
                  ? { backgroundColor: BRAND.blue, color: '#FFFFFF', boxShadow: `0 2px 8px ${BRAND.blue}55` }
                  : { color: theme === 'dark' ? '#94A3B8' : BRAND.gray }
              }
            >
              <span>Annual Price</span>
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase"
                style={{
                  backgroundColor: billingCycle === 'annual' ? 'rgba(255,255,255,0.25)' : `${BRAND.blue}22`,
                  color: billingCycle === 'annual' ? '#FFFFFF' : BRAND.blue,
                }}
              >
                1 Month Free
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 4 Pricing Cards — Free, Pro, Elite, Business */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {saasPlans.map((plan) => (
            <div
              key={plan.id}
              className="relative rounded-3xl p-7 flex flex-col justify-between transition duration-200"
              style={
                plan.popular
                  ? {
                      backgroundColor: theme === 'dark' ? '#081B33' : '#FFFFFF',
                      border: `2px solid ${BRAND.blue}`,
                      boxShadow: `0 20px 40px ${BRAND.blue}22`,
                      transform: 'scale(1.02)',
                    }
                  : {
                      backgroundColor: theme === 'dark' ? '#081B33CC' : '#FFFFFF',
                      border: `1px solid ${theme === 'dark' ? BRAND.navy : '#E2E8F0'}`,
                      boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
                    }
              }
            >
              {plan.popular && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-white font-black text-xs uppercase px-4 py-1 rounded-full shadow-md tracking-wider"
                  style={{ backgroundColor: BRAND.blue }}
                >
                  {plan.badge}
                </div>
              )}

              <div className="space-y-4">
                {/* Tier name at top of column */}
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black">{plan.name}</h3>
                  <span
                    className="text-[10px] font-bold px-2.5 py-1 rounded-lg border"
                    style={{
                      color: theme === 'dark' ? '#94A3B8' : BRAND.gray,
                      backgroundColor: theme === 'dark' ? '#040D1A' : '#F1F5F9',
                      borderColor: theme === 'dark' ? BRAND.navy : '#E2E8F0',
                    }}
                  >
                    {plan.accounts}
                  </span>
                </div>

                {/* Price directly under tier name */}
                <div className="pb-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl font-black">
                      {billingCycle === 'monthly' ? plan.priceMonthly : plan.priceAnnual}
                    </span>
                    {plan.id !== 'business' && (
                      <span className="text-sm font-bold" style={{ color: theme === 'dark' ? '#94A3B8' : BRAND.gray }}>
                        {billingCycle === 'monthly' ? '/mo' : '/yr'}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-semibold mt-1" style={{ color: BRAND.blue }}>
                    {billingCycle === 'annual' ? plan.annualNote : plan.id === 'business' ? plan.annualNote : 'Flexible monthly billing'}
                  </p>
                </div>

                <p
                  className="text-xs sm:text-sm leading-relaxed pt-2 border-t"
                  style={{ color: theme === 'dark' ? '#CBD5E1' : BRAND.gray, borderColor: theme === 'dark' ? BRAND.navy : '#E2E8F0' }}
                >
                  {plan.description}
                </p>

                <ul className="pt-2 space-y-2.5 text-xs sm:text-sm">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="font-black text-base leading-none" style={{ color: BRAND.blue }}>✓</span>
                      <span style={{ color: theme === 'dark' ? '#E2E8F0' : '#1E293B' }}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => (plan.id === 'business' ? openContactSales() : openPlanSignup(plan.name))}
                  className="w-full py-3.5 rounded-xl font-bold text-sm transition shadow-lg text-white cursor-pointer"
                  style={
                    plan.popular
                      ? { backgroundColor: BRAND.blue, boxShadow: `0 8px 20px ${BRAND.blue}44` }
                      : { backgroundColor: BRAND.navy }
                  }
                >
                  {plan.buttonText} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full Feature Comparison Table */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="text-center space-y-3 mb-10">
          <p className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: BRAND.blue }}>
            Plans &amp; Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-black">Full Feature Specification</h2>
          <p className="text-sm max-w-2xl mx-auto" style={{ color: theme === 'dark' ? '#CBD5E1' : BRAND.gray }}>
            Review detailed capabilities across all four tiers.
          </p>
        </div>

        <div
          className="overflow-x-auto rounded-3xl border shadow-2xl"
          style={{ borderColor: theme === 'dark' ? BRAND.navy : '#E2E8F0', backgroundColor: theme === 'dark' ? '#081B33' : '#FFFFFF' }}
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                className="text-xs uppercase font-bold tracking-wider"
                style={{
                  backgroundColor: theme === 'dark' ? '#040D1AE6' : '#F1F5F9CC',
                  color: theme === 'dark' ? '#CBD5E1' : BRAND.gray,
                  borderBottom: `1px solid ${theme === 'dark' ? BRAND.navy : '#E2E8F0'}`,
                }}
              >
                <th className="py-4 px-6 min-w-[200px]">Feature</th>
                <th className="py-4 px-6 min-w-[140px]">Free</th>
                <th
                  className="py-4 px-6 min-w-[180px] font-black"
                  style={{ backgroundColor: `${BRAND.blue}14`, color: theme === 'dark' ? BRAND.blueLight : BRAND.blue, borderLeft: `1px solid ${BRAND.blue}33`, borderRight: `1px solid ${BRAND.blue}33` }}
                >
                  Pro
                </th>
                <th className="py-4 px-6 min-w-[180px]">Elite</th>
                <th className="py-4 px-6 min-w-[200px]">Business</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm">
              {comparisonRows.map((row, idx) => (
                <tr
                  key={idx}
                  style={{ borderBottom: `1px solid ${theme === 'dark' ? '#1E293B' : '#F1F5F9'}` }}
                >
                  <td className="py-3.5 px-6 font-bold">{row.feature}</td>
                  <td className="py-3.5 px-6" style={{ color: theme === 'dark' ? '#CBD5E1' : BRAND.gray }}>{row.free}</td>
                  <td
                    className="py-3.5 px-6 font-semibold"
                    style={{ backgroundColor: `${BRAND.blue}0D`, borderLeft: `1px solid ${BRAND.blue}22`, borderRight: `1px solid ${BRAND.blue}22` }}
                  >
                    {row.pro}
                  </td>
                  <td className="py-3.5 px-6 font-medium" style={{ color: theme === 'dark' ? '#E2E8F0' : '#1E293B' }}>{row.elite}</td>
                  <td className="py-3.5 px-6 font-medium" style={{ color: theme === 'dark' ? '#E2E8F0' : '#1E293B' }}>{row.business}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-16 text-center">
        <div
          className="rounded-3xl p-10 sm:p-14 shadow-2xl border space-y-6"
          style={{
            background: `linear-gradient(135deg, ${BRAND.navyDark}, ${BRAND.navy})`,
            borderColor: BRAND.navy,
            color: '#FFFFFF',
          }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{ backgroundColor: `${BRAND.blue}33`, color: BRAND.blueLight }}
          >
            Ready When You Are
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Pick the plan that fits your team today.
          </h2>
          <p className="text-sm sm:text-base max-w-xl mx-auto" style={{ color: '#CBD5E1' }}>
            Move between tiers any time as your team grows.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => openPlanSignup('Free')}
              className="px-8 py-4 rounded-xl font-bold text-base transition duration-150 shadow-xl text-white cursor-pointer"
              style={{ backgroundColor: BRAND.blue, boxShadow: `0 12px 30px ${BRAND.blue}44` }}
            >
              Start Free
            </button>
            <button
              type="button"
              onClick={() => openPlanSignup('Pro')}
              className="px-8 py-4 rounded-xl border font-semibold text-base transition duration-150 text-white cursor-pointer"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.2)' }}
            >
              Upgrade to Pro
            </button>
            <button
              type="button"
              onClick={openContactSales}
              className="px-8 py-4 rounded-xl border font-semibold text-base transition duration-150 text-white cursor-pointer"
              style={{ backgroundColor: BRAND.navyDark, borderColor: `${BRAND.blue}55` }}
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Auth / Plan Checkout Modal */}
      {authOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div
            className="relative w-full max-w-md rounded-3xl p-8 shadow-2xl"
            style={{
              backgroundColor: theme === 'dark' ? BRAND.navyDark : '#FFFFFF',
              border: `1px solid ${theme === 'dark' ? BRAND.navy : '#E2E8F0'}`,
              color: theme === 'dark' ? '#F1F5F9' : '#0F172A',
            }}
          >
            <button
              type="button"
              onClick={() => setAuthOpen(false)}
              className="absolute top-4 right-4 text-lg font-bold cursor-pointer"
              style={{ color: theme === 'dark' ? '#94A3B8' : BRAND.gray }}
            >
              ✕
            </button>

            <div className="text-center mb-6 space-y-1">
              <span
                className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                style={{ backgroundColor: `${BRAND.blue}22`, color: BRAND.blue }}
              >
                Selected: {authPlan}
              </span>
              <h2 className="text-2xl font-black">
                {isSignUp ? 'Create your JECON account' : 'Sign in to JECON'}
              </h2>
              <p className="text-xs" style={{ color: theme === 'dark' ? '#94A3B8' : BRAND.gray }}>
                {isSignUp ? 'Get started in under two minutes.' : 'Enter your credentials to continue.'}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-bold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                    style={{
                      backgroundColor: theme === 'dark' ? '#040D1A' : '#F8FAFC',
                      borderColor: theme === 'dark' ? BRAND.navy : '#CBD5E1',
                    }}
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                  style={{
                    backgroundColor: theme === 'dark' ? '#040D1A' : '#F8FAFC',
                    borderColor: theme === 'dark' ? BRAND.navy : '#CBD5E1',
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                  style={{
                    backgroundColor: theme === 'dark' ? '#040D1A' : '#F8FAFC',
                    borderColor: theme === 'dark' ? BRAND.navy : '#CBD5E1',
                  }}
                />
              </div>

              {message && (
                <div
                  className="p-3 rounded-xl text-xs font-medium"
                  style={
                    message.type === 'error'
                      ? { backgroundColor: '#FEE2E240', color: '#DC2626', border: '1px solid #FCA5A5' }
                      : { backgroundColor: `${BRAND.blue}1A`, color: BRAND.blue, border: `1px solid ${BRAND.blue}55` }
                  }
                >
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 font-bold rounded-xl text-sm transition duration-150 disabled:opacity-50 mt-2 text-white cursor-pointer"
                style={{ backgroundColor: BRAND.blue, boxShadow: `0 8px 20px ${BRAND.blue}33` }}
              >
                {loading ? 'Processing...' : isSignUp ? `Continue to ${authPlan}` : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center text-xs" style={{ color: theme === 'dark' ? '#94A3B8' : BRAND.gray }}>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setMessage(null);
                }}
                className="font-bold hover:underline ml-1 cursor-pointer"
                style={{ color: BRAND.blue }}
              >
                {isSignUp ? 'Log in' : 'Sign up'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Sales Modal — Business tier (no self-serve checkout) */}
      {contactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div
            className="relative w-full max-w-md rounded-3xl p-8 shadow-2xl"
            style={{
              backgroundColor: theme === 'dark' ? BRAND.navyDark : '#FFFFFF',
              border: `1px solid ${theme === 'dark' ? BRAND.navy : '#E2E8F0'}`,
              color: theme === 'dark' ? '#F1F5F9' : '#0F172A',
            }}
          >
            <button
              type="button"
              onClick={() => setContactOpen(false)}
              className="absolute top-4 right-4 text-lg font-bold cursor-pointer"
              style={{ color: theme === 'dark' ? '#94A3B8' : BRAND.gray }}
            >
              ✕
            </button>

            {!contactSubmitted ? (
              <>
                <div className="text-center mb-6 space-y-1">
                  <span
                    className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                    style={{ backgroundColor: `${BRAND.blue}22`, color: BRAND.blue }}
                  >
                    Business Plan
                  </span>
                  <h2 className="text-2xl font-black">Talk to our team</h2>
                  <p className="text-xs" style={{ color: theme === 'dark' ? '#94A3B8' : BRAND.gray }}>
                    Tell us a bit about your organization and we'll follow up with pricing.
                  </p>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                      style={{ backgroundColor: theme === 'dark' ? '#040D1A' : '#F8FAFC', borderColor: theme === 'dark' ? BRAND.navy : '#CBD5E1' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Work Email</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                      style={{ backgroundColor: theme === 'dark' ? '#040D1A' : '#F8FAFC', borderColor: theme === 'dark' ? BRAND.navy : '#CBD5E1' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Company</label>
                    <input
                      type="text"
                      required
                      value={contactCompany}
                      onChange={(e) => setContactCompany(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                      style={{ backgroundColor: theme === 'dark' ? '#040D1A' : '#F8FAFC', borderColor: theme === 'dark' ? BRAND.navy : '#CBD5E1' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Estimated Number of Accounts</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 8"
                      value={contactAccounts}
                      onChange={(e) => setContactAccounts(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                      style={{ backgroundColor: theme === 'dark' ? '#040D1A' : '#F8FAFC', borderColor: theme === 'dark' ? BRAND.navy : '#CBD5E1' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 font-bold rounded-xl text-sm transition duration-150 mt-2 text-white cursor-pointer"
                    style={{ backgroundColor: BRAND.blue, boxShadow: `0 8px 20px ${BRAND.blue}33` }}
                  >
                    Request Pricing
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8 space-y-3">
                <h2 className="text-2xl font-black">Thanks, {contactName.split(' ')[0] || 'there'}.</h2>
                <p className="text-sm" style={{ color: theme === 'dark' ? '#CBD5E1' : BRAND.gray }}>
                  Our team will reach out to {contactEmail} shortly to discuss Business pricing.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingPageView;