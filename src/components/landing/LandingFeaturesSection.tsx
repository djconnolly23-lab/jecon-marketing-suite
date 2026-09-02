// jecon-marketing-suite/src/components/landing/LandingFeaturesSection.tsx

import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Cpu,
  Share2
} from 'lucide-react';

interface LandingFeaturesSectionProps {
  onExploreFeature: () => void;
}

export const LandingFeaturesSection: React.FC<LandingFeaturesSectionProps> = ({
  onExploreFeature,
}) => {
  const features = [
    {
      id: 'feature-studio',
      icon: Sparkles,
      tag: 'Copywriting Engine',
      title: 'AI Content Studio',
      description: 'Generate platform-compliant, multi-tone social copy optimized for TikTok algorithms, Instagram Reels, LinkedIn posts, and Facebook updates.',
      highlights: [
        'Dynamic tone switching: Luxury, Executive, Urgent, Conversational',
        'Built-in character limits and hashtag intelligence per platform',
        'Pre-approved promotional hooks and supplier integration tags',
        'One-click draft push to scheduling queue with manual review step',
      ],
      badge: 'Multi-Tone Engine',
    },
    {
      id: 'feature-blog',
      icon: BookOpen,
      tag: 'SEO Publisher',
      title: 'Long-Form Blog Architect',
      description: 'Transform raw trip notes, supplier promos, or advisory knowledge into structured, search-ready destination guides and thought leadership pieces.',
      highlights: [
        'Structured layout: Summary box, sticky TOC, pull quotes, and comparison tables',
        'Integrated FAQ schema blocks formatted for Google Rich Results',
        'Editorial wireframe preview matching live digital publication standards',
        'Ready for direct export to Markdown, HTML, or Word document format',
      ],
      badge: 'Rich Schema Ready',
    },
    {
      id: 'feature-calendar',
      icon: Calendar,
      tag: 'Distribution Grid',
      title: 'Unified Dispatch Calendar',
      description: 'Coordinate your entire brand narrative across dates, channels, and campaigns with full visibility into past and upcoming releases.',
      highlights: [
        'Multi-platform visual preview cards (see exact Instagram and TikTok cards)',
        'Drag-and-drop schedule slot adjustments with time-zone precision',
        'Status tracking: Draft, Needs Review, Scheduled, and Published',
        'Direct connection to TikTok Login Kit and Meta Graph API endpoints',
      ],
      badge: 'Visual Scheduler',
    },
    {
      id: 'feature-inbox',
      icon: MessageSquare,
      tag: 'Lead Capture',
      title: 'Consolidated DM & Inquiry Hub',
      description: 'Aggregate comments, inquiries, and customer messages across social channels into a single triaged workflow so no high-value client slips away.',
      highlights: [
        'Priority tagging: Action Needed, Resolved, In Progress, VIP Prospect',
        'Pre-populated response templates tailored to brand tone settings',
        'Direct inquiry link back to original post context and offer details',
        'Protected by Supabase Row-Level Security for client confidentiality',
      ],
      badge: 'Lead Triage',
    },
  ];

  return (
    <section id="features" className="py-20 bg-slate-900 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">
            Core Architecture
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            High-Performance Tools Without Context Switching
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Eliminate fragmented apps and disjointed spreadsheets. Every tool is interconnected so content created in one module flows directly to publishing and analytics.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                id={feature.id}
                className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-6 shadow-md"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-sky-950 border border-sky-500/30 flex items-center justify-center text-sky-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300 bg-sky-950/60 border border-sky-500/30 px-2.5 py-1 rounded-full">
                      {feature.badge}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
                      {feature.tag}
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
                      {feature.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>

                  <ul className="space-y-2 pt-2 text-xs text-slate-300">
                    {feature.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={onExploreFeature}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors cursor-pointer group"
                  >
                    <span>Launch in Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                  <span className="text-[10px] text-slate-500 font-mono">Verified API Pipeline</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};