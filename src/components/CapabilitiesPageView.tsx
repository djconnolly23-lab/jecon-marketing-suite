import React from 'react';
import { 
  Bot, 
  Megaphone, 
  PenTool, 
  BarChart3, 
  Workflow, 
  ShieldCheck, 
  Zap, 
  Target, 
  Layers, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

interface CapabilitiesPageViewProps {
  onNavigate?: (view: string) => void;
}

export const CapabilitiesPageView: React.FC<CapabilitiesPageViewProps> = ({ onNavigate }) => {
  const capabilities = [
    {
      icon: PenTool,
      title: "Autonomous Content Studio",
      description: "AI-driven blog posts, social media carousels, ad copy, and newsletter campaigns generated at scale, aligned with your brand voice.",
      features: ["Multi-format generation", "Brand voice tuning", "Automated scheduling", "SEO optimization"]
    },
    {
      icon: Megaphone,
      title: "Omnichannel Ad Deployment",
      description: "Intelligent media buying and creative optimization across Meta, LinkedIn, Google Ads, and TikTok with real-time budget reallocation.",
      features: ["Cross-platform sync", "AI creative variation", "Budget pacing safeguards", "ROAS auto-targeting"]
    },
    {
      icon: Workflow,
      title: "Lead Capture & CRM Automation",
      description: "Frictionless funnel workflows that ingest leads, trigger personalized multi-channel nurturing, and update CRM pipelines instantly.",
      features: ["Visual workflow builder", "Instant lead scoring", "SMS & Email sequences", "Webhook integrations"]
    },
    {
      icon: BarChart3,
      title: "Real-Time Attribution & BI",
      description: "Unified analytics dashboards replacing siloed reporting. Track true multi-touch attribution from initial click to closed-won revenue.",
      features: ["Custom data connectors", "Predictive forecasting", "Executive summaries", "Cohort analysis"]
    },
    {
      icon: Bot,
      title: "Custom AI Agent Swarms",
      description: "Deploy specialized autonomous agents trained on your proprietary data to execute continuous market research, SEO audits, and competitor tracking.",
      features: ["Dedicated agent memory", "Autonomous web scraping", "Automated alert triggers", "Secure data boundaries"]
    },
    {
      icon: ShieldCheck,
      title: "Enterprise Compliance & Guardrails",
      description: "Strict policy filters, human-in-the-loop approval gates, and role-based access control ensuring absolute brand safety.",
      features: ["Multi-tier approval workflows", "PII data redaction", "Audit logs", "SOC2 security standards"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">
            <Zap className="w-4 h-4" /> Platform Capabilities
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            Engineered for Autonomous Marketing Execution
          </h1>
          <p className="text-lg text-slate-400">
            Discover how our AI-powered infrastructure amplifies your team's output, automates repetitive execution, and drives predictable pipeline growth.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {capabilities.map((cap, index) => {
            const IconComponent = cap.icon;
            return (
              <div 
                key={index}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{cap.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{cap.description}</p>
                </div>
                <div className="border-t border-slate-800/80 pt-4">
                  <ul className="space-y-2">
                    {cap.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Call to Action */}
        <div className="bg-gradient-to-r from-indigo-900/40 via-purple-900/40 to-slate-900 border border-indigo-500/20 rounded-3xl p-10 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to transform your marketing operations?</h2>
            <p className="text-slate-300 mb-8">
              Explore our transparent software and concierge tiers tailored to match your precise execution cadence.
            </p>
            {onNavigate && (
              <button
                onClick={() => onNavigate('pricing')}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors shadow-lg shadow-indigo-600/20"
              >
                View Pricing & Tiers <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};