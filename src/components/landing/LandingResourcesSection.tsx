// jecon-marketing-suite/src/components/landing/LandingResourcesSection.tsx

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  HelpCircle, 
  ChevronDown, 
  FileText, 
  Layers, 
  Database, 
  Globe2, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

interface LandingResourcesSectionProps {
  onOpenAuth: () => void;
}

export const LandingResourcesSection: React.FC<LandingResourcesSectionProps> = ({
  onOpenAuth,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const playbooks = [
    {
      title: '7-Day High-Touch Client Conversion Cadence',
      audience: 'Travel Advisors & Boutique Hospitality',
      summary: 'Structured schedule balancing luxury destination inspiration, supplier rate drops, and direct consultation CTAs.',
      tags: ['Luxury Travel', 'Supplier Promos', 'Reel Framework'],
    },
    {
      title: 'Executive B2B Authority Blueprint',
      audience: 'Consultants & Professional Services',
      summary: 'Bi-weekly publication schedule for LinkedIn and Facebook targeting transformation case studies and problem breakdowns.',
      tags: ['Thought Leadership', 'LinkedIn Pulse', 'Case Studies'],
    },
    {
      title: 'Short-Form Hook & Product Drop Matrix',
      audience: 'Digital Creators & E-Commerce',
      summary: 'Fast-paced promotional framework using TikTok sound pairing, video hook triggers, and comment-to-DM funnels.',
      tags: ['TikTok Algorithm', 'IG Reels', 'Lead Funnels'],
    },
  ];

  const faqs = [
    {
      question: 'Do I need an active business account to connect TikTok and Instagram?',
      answer: 'Yes. TikTok Content Posting API and Meta Graph API require a Creator or Business account type. These account types are free to enable in your respective mobile apps and grant full access to auto-scheduling, sound licensing, and performance analytics.',
    },
    {
      question: 'Can I edit and approve AI posts before they are published?',
      answer: 'Absolutely. JECON enforces a strict advisor-in-the-loop workflow. AI-generated captions, hooks, and destination guides are saved to your workspace as drafts. Nothing dispatches to your live social channels until you click approve and schedule.',
    },
    {
      question: 'How does JECON secure my client inquiries and supplier data?',
      answer: 'All client direct messages, campaign settings, and CRM notes are protected by Supabase Row-Level Security (RLS). Each advisor or agency runs in an isolated database partition with encrypted token storage. We never share or sell client records or proprietary booking data.',
    },
    {
      question: 'What happens if I change or cancel my plan?',
      answer: 'You can upgrade, downgrade, or cancel at any time directly in your account settings. If you downgrade to Free, your connected channels adjust to the single-channel limit, but all previously published content and blog exports remain entirely yours.',
    },
  ];

  return (
    <section id="resources" className="py-20 bg-slate-950 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Playbooks Subsection */}
        <div id="resources-playbooks" className="scroll-mt-24 space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">
              Execution Blueprints
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready-to-Use Social Playbooks
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Never stare at a blank screen. Load pre-configured weekly workflows tailored to your operational vertical.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {playbooks.map((playbook, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider bg-sky-950/60 border border-sky-500/20 px-2.5 py-1 rounded-full inline-block">
                    {playbook.audience}
                  </span>
                  <h3 className="text-sm font-bold text-white leading-snug">
                    {playbook.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {playbook.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {playbook.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-medium bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={onOpenAuth}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors cursor-pointer"
                  >
                    <span>Load template</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Infrastructure & Security Architecture */}
        <div id="architecture" className="scroll-mt-24 p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Tech Stack</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Enterprise Data Security &amp; Official API Mesh
            </h3>
            <p className="text-xs text-slate-400">
              Direct API handshakes eliminate credential scraping, third-party pass-through risks, and unofficial bot behavior.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <Database className="w-5 h-5 text-sky-400" />
              <h4 className="text-xs font-bold text-white">Supabase PostgreSQL</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Row-Level Security guarantees your client DMs, inquiry notes, and draft strategies remain strictly confidential.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <Globe2 className="w-5 h-5 text-emerald-400" />
              <h4 className="text-xs font-bold text-white">Vercel Edge Global Mesh</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Static assets and edge caching ensure sub-second UI response across global advisory terminals.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <Lock className="w-5 h-5 text-blue-400" />
              <h4 className="text-xs font-bold text-white">Official OAuth2 Handshakes</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Tokens expire and renew safely using official TikTok Login Kit and Meta Graph API scopes.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <FileText className="w-5 h-5 text-purple-400" />
              <h4 className="text-xs font-bold text-white">Zero Vendor Lock-In</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Export generated guides and client contact records instantly as Markdown, JSON, or Word formats.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Subsection */}
        <div id="resources-faq" className="scroll-mt-24 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">
              Got Questions?
            </span>
            <h3 className="text-xl sm:text-3xl font-black text-white">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-slate-800 bg-slate-900/80 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-4 text-left text-xs sm:text-sm font-bold text-slate-100 hover:text-sky-400 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2 ${
                        isOpen ? 'rotate-180 text-sky-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};