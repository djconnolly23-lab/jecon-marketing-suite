import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Share2, 
  MessageSquareText, 
  BarChart3, 
  Layers 
} from 'lucide-react';
import { CampaignSettings } from '../types';
import { UserProfile } from '../types/auth';
import { LandingHeader } from './LandingHeader';
import { LandingSolutionsSection } from './landing/LandingSolutionsSection';
import { LandingFeaturesSection } from './landing/LandingFeaturesSection';
import { LandingResourcesSection } from './landing/LandingResourcesSection';
import { PricingPageView } from './PricingPageView';

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
  onOpenAuth,
}) => {
  const [viewPricingStandalone, setViewPricingStandalone] = useState<boolean>(false);
  const [activePreview, setActivePreview] = useState<'content' | 'blog' | 'channels'>('content');

  const handleNavigateAnchor = (anchor: string) => {
    if (anchor === '#pricing') {
      setViewPricingStandalone(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (viewPricingStandalone) {
      setViewPricingStandalone(false);
      setTimeout(() => {
        executeScroll(anchor);
      }, 100);
      return;
    }

    executeScroll(anchor);
  };

  const executeScroll = (anchor: string) => {
    const targetId = anchor.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (viewPricingStandalone) {
    return (
      <PricingPageView
        onBackToHome={() => {
          setViewPricingStandalone(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onEnterDashboard={onEnterApp}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-[#0284c7] selection:text-white">
      {/* Top Universal Navbar */}
      <LandingHeader
        currentUser={currentUser}
        onNavigateAnchor={handleNavigateAnchor}
        onEnterApp={onEnterApp}
        onOpenAuth={onOpenAuth}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-950/40 via-slate-900 to-slate-950"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-950/80 border border-sky-400/40 text-sky-300 text-xs font-semibold shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Dedicated Social Operations for High-Touch Businesses &amp; Advisors</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-tight">
            Turn Deals &amp; Knowledge into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">
              Multi-Channel Client Pipeline
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            The unified command center for independent entrepreneurs, consultants, and service operators. Orchestrate long-form authority articles, schedule cross-platform social dispatches, and centralize customer inquiries in one ecosystem.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={onEnterApp}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[#0284c7] hover:bg-sky-500 rounded-xl shadow-lg shadow-sky-500/25 transition-all cursor-pointer"
            >
              <span>Explore Active Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleNavigateAnchor('#pricing')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-slate-800/90 hover:bg-slate-700 border border-slate-600 rounded-xl transition-colors cursor-pointer"
            >
              <span>View Pricing Plans</span>
            </button>
          </div>

          {/* Key Metrics Bar */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 backdrop-blur-xs">
              <div className="text-xl sm:text-2xl font-black text-white">6 Channels</div>
              <div className="text-xs text-slate-300 font-medium mt-1">Synced Social APIs</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 backdrop-blur-xs">
              <div className="text-xl sm:text-2xl font-black text-sky-400">1-Click</div>
              <div className="text-xs text-slate-300 font-medium mt-1">Article &amp; Blog Engine</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 backdrop-blur-xs">
              <div className="text-xl sm:text-2xl font-black text-white">100%</div>
              <div className="text-xs text-slate-300 font-medium mt-1">Operator Autonomy</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 backdrop-blur-xs">
              <div className="text-xl sm:text-2xl font-black text-emerald-400">Sub-Second</div>
              <div className="text-xs text-slate-300 font-medium mt-1">Edge Deployment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Platform Viewfinder Preview */}
      <section className="py-12 bg-slate-950/70 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Live Workspace Sandbox</span>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">Platform Viewfinder</h2>
            </div>

            <div className="inline-flex rounded-lg bg-slate-900 border border-slate-700 p-1">
              <button
                type="button"
                onClick={() => setActivePreview('content')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activePreview === 'content' ? 'bg-[#0284c7] text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Content Studio
              </button>
              <button
                type="button"
                onClick={() => setActivePreview('blog')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activePreview === 'blog' ? 'bg-[#0284c7] text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Blog Generator
              </button>
              <button
                type="button"
                onClick={() => setActivePreview('channels')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activePreview === 'channels' ? 'bg-[#0284c7] text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Distribution Hub
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl p-6 min-h-[280px]">
            {activePreview === 'content' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Scheduled Dispatches</span>
                  </div>
                  <span className="text-xs text-sky-400 font-mono">Campaign: {settings.activeCampaign}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-300 font-bold border border-sky-800">
                        TikTok Reel
                      </span>
                      <span>Scheduled 09:30 AM</span>
                    </div>
                    <p className="text-sm text-slate-100 font-medium">
                      "3 Daily habits of high-growth enterprise operators scaling execution..."
                    </p>
                    <div className="text-xs text-slate-400">Targeting: B2B Founders, Operations Leads</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 font-bold border border-blue-800">
                        LinkedIn Carousel
                      </span>
                      <span>Scheduled Tomorrow</span>
                    </div>
                    <p className="text-sm text-slate-100 font-medium">
                      "Enterprise delivery playbook: Scaling cross-platform social pipelines."
                    </p>
                    <div className="text-xs text-slate-400">Targeting: Executive Leadership, C-Suite</div>
                  </div>
                </div>
              </div>
            )}

            {activePreview === 'blog' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Long-Form Article Blueprint</span>
                  <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-mono">
                    SEO Score: 98/100
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="text-base font-bold text-white">The Operator's Guide to Centralized Brand Distribution</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Automated outlines with structured headings, high-intent callouts, metadata generation, and exportable formatting for direct CMS syndication.
                  </p>
                  <div className="flex gap-2 pt-2">
                    <span className="text-xs bg-slate-800 text-slate-200 px-2.5 py-1 rounded">2,200 Words</span>
                    <span className="text-xs bg-slate-800 text-slate-200 px-2.5 py-1 rounded">Cross-Channel Snippets</span>
                    <span className="text-xs bg-slate-800 text-slate-200 px-2.5 py-1 rounded">Editorial Ready</span>
                  </div>
                </div>
              </div>
            )}

            {activePreview === 'channels' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Universal Channel Feeds</span>
                  <span className="text-xs text-slate-300 font-mono">Live API Connectors</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-sky-400">
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm font-bold text-white">Social Sync</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Automated queue for LinkedIn, X, TikTok, and Instagram accounts.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-sky-400">
                      <MessageSquareText className="w-4 h-4" />
                      <span className="text-sm font-bold text-white">Direct Inquiries</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Central inbox triage for customer direct messages and leads.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-sky-400">
                      <BarChart3 className="w-4 h-4" />
                      <span className="text-sm font-bold text-white">Audience ROI</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Live reach telemetry, CTR metrics, and pipeline conversion analytics.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Solutions Persona Section */}
      <LandingSolutionsSection onSelectSolutionCTA={onOpenAuth} />

      {/* Features Deep Dive Section */}
      <LandingFeaturesSection onExploreFeature={onEnterApp} />

      {/* Resources, FAQ & Architecture Section */}
      <LandingResourcesSection onOpenAuth={onOpenAuth} />

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-[#081e38] border-t border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Ready to Automate Your Brand Distribution?
          </h2>
          <p className="text-sm text-slate-200 max-w-lg mx-auto leading-relaxed">
            Launch the workspace to review scheduled campaigns, write authority guides, and manage inbound inquiries.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={onEnterApp}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[#0284c7] hover:bg-sky-500 rounded-xl shadow-lg transition-all cursor-pointer"
            >
              <span>Enter Advisory Suite</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleNavigateAnchor('#pricing')}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl transition-colors cursor-pointer"
            >
              <span>Explore All Tiers</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-slate-300">&copy; {new Date().getFullYear()} Enterprise Marketing Suite.</span>
          <div className="flex items-center gap-4 text-slate-300">
            <button type="button" onClick={() => handleNavigateAnchor('#pricing')} className="hover:text-white transition-colors cursor-pointer">
              Pricing Plans
            </button>
            <span>&bull;</span>
            <button type="button" onClick={onEnterApp} className="hover:text-white transition-colors cursor-pointer">
              Workspace
            </button>
            <span>&bull;</span>
            <button type="button" onClick={onOpenAuth} className="hover:text-white transition-colors cursor-pointer">
              Sign In
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageView;