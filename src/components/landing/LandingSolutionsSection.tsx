// jecon-marketing-suite/src/components/landing/LandingSolutionsSection.tsx

import React from 'react';
import { 
  Compass, 
  Briefcase, 
  Video, 
  Layers, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

interface LandingSolutionsSectionProps {
  onSelectSolutionCTA: () => void;
}

export const LandingSolutionsSection: React.FC<LandingSolutionsSectionProps> = ({
  onSelectSolutionCTA,
}) => {
  const solutions = [
    {
      id: 'solutions-travel',
      icon: Compass,
      badge: 'Hospitality & Advisors',
      title: 'Travel Advisors & Agency Hosts',
      tagline: 'Turn supplier deals & complex itineraries into high-converting bookings.',
      pain: 'Eliminates manually copying specs from supplier portals and PDFs into social posts.',
      bullets: [
        '1-Click supplier deal promotion blueprints',
        'Long-form destination guide generation with SEO schemas',
        'Pre-formatted itinerary showcase reels for TikTok & IG',
        'Consolidated travel inquiry triage & lead status flags',
      ],
    },
    {
      id: 'solutions-services',
      icon: Briefcase,
      badge: 'B2B & Professional',
      title: 'Consultants & Service Pros',
      tagline: 'Establish authority on LinkedIn and Facebook without spending hours drafting.',
      pain: 'Keeps inbound client pipelines warm without constant manual writing sessions.',
      bullets: [
        'Executive thought-leadership article frameworks',
        'Case study and client success transformation carousels',
        'Scheduled LinkedIn pulse posts with compliance hooks',
        'Direct inquiry management to capture inbound consultation leads',
      ],
    },
    {
      id: 'solutions-creators',
      icon: Video,
      badge: 'Creators & E-Commerce',
      title: 'E-Commerce & Digital Creators',
      tagline: 'Scale short-form video discovery across TikTok, Reels, and Shorts.',
      pain: 'Removes the friction of manually formatting and captioning videos across four apps.',
      bullets: [
        'Algorithm-tailored viral hooks and sound pairing ideas',
        'Direct short-form video dispatch and caption sequencing',
        'Product launch countdown scheduling and promo queues',
        'Engagement sentiment tracking to pinpoint top performing hooks',
      ],
    },
    {
      id: 'solutions-agencies',
      icon: Layers,
      badge: 'Agencies & Operators',
      title: 'Multi-Brand Agencies & Solo Operators',
      tagline: 'Coordinate distinct client campaigns and centralized DMs in one portal.',
      pain: 'Replaces 15 open browser tabs and separate credentials with isolated brand silos.',
      bullets: [
        'Isolated brand campaign workspaces with distinct tone settings',
        'Consolidated cross-channel comment & DM inbox',
        'Unified performance analytics comparing reach across client accounts',
        'One-click client demo seeding and sandbox resets',
      ],
    },
  ];

  return (
    <section id="solutions" className="py-20 bg-slate-950 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">
            Tailored Industry Workflows
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineered for High-Touch Service &amp; Creator Businesses
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Whether you are booking seven-figure itineraries, selling professional services, or launching digital drops, JECON structures your entire distribution engine.
          </p>
        </div>

        {/* Solutions 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                id={item.id}
                className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-6 shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-sky-950 border border-sky-500/30 flex items-center justify-center text-sky-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300 bg-sky-950/60 border border-sky-500/30 px-2.5 py-1 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-sky-400/90 font-medium mt-1">
                      {item.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed italic border-l-2 border-slate-700 pl-3 py-0.5">
                    {item.pain}
                  </p>

                  <ul className="space-y-2 pt-2 text-xs text-slate-300">
                    {item.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={onSelectSolutionCTA}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors cursor-pointer group"
                  >
                    <span>Deploy this workflow</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};