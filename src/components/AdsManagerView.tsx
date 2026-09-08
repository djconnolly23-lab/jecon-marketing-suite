import React, { useState } from 'react';
import { 
  Megaphone, 
  DollarSign, 
  Target, 
  TrendingUp, 
  Plus, 
  CheckCircle2, 
  Sliders, 
  BarChart2,
  Sparkles,
  Layers
} from 'lucide-react';
import { CampaignSettings } from '../types';

interface AdsManagerViewProps {
  settings?: CampaignSettings;
}

interface AdCampaign {
  id: string;
  name: string;
  platform: 'meta' | 'google' | 'tiktok';
  status: 'active' | 'paused' | 'optimizing';
  budgetDaily: number;
  spent: number;
  roas: number;
  conversions: number;
  targetAudience: string;
}

export const AdsManagerView: React.FC<AdsManagerViewProps> = ({ settings }) => {
  const [campaigns, setCampaigns] = useState<AdCampaign[]>([
    {
      id: 'ad-001',
      name: 'Q3 Enterprise Lead Gen - Meta Lookalike',
      platform: 'meta',
      status: 'active',
      budgetDaily: 250,
      spent: 4200,
      roas: 4.8,
      conversions: 142,
      targetAudience: 'B2B Tech Founders & VP of Growth (Lookalike 2%)'
    },
    {
      id: 'ad-002',
      name: 'Intent Search - AI Marketing Software',
      platform: 'google',
      status: 'optimizing',
      budgetDaily: 350,
      spent: 6800,
      roas: 5.2,
      conversions: 210,
      targetAudience: 'Intent Keywords: "autonomous marketing suite", "AI lead generation"'
    },
    {
      id: 'ad-003',
      name: 'TikTok Spark Ads - Operator Habits Reel',
      platform: 'tiktok',
      status: 'active',
      budgetDaily: 150,
      spent: 1950,
      roas: 3.4,
      conversions: 89,
      targetAudience: 'Entrepreneurs & Agency Directors (Ages 25-45)'
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [newCampaignName, setNewCampaignName] = useState('');
  const [newBudget, setNewBudget] = useState('200');
  const [selectedPlatform, setSelectedPlatform] = useState<'meta' | 'google' | 'tiktok'>('meta');

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaignName.trim()) return;

    const created: AdCampaign = {
      id: `ad-${Date.now()}`,
      name: newCampaignName,
      platform: selectedPlatform,
      status: 'active',
      budgetDaily: parseFloat(newBudget) || 100,
      spent: 0,
      roas: 0.0,
      conversions: 0,
      targetAudience: settings?.targetAudience || 'General B2B Professionals'
    };

    setCampaigns([created, ...campaigns]);
    setNewCampaignName('');
    setIsCreating(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-3">
              <Megaphone className="w-4 h-4" /> Tier 1 Gap: Google & Meta Ads Management
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">Omnichannel Ads Manager</h1>
            <p className="text-slate-400 text-sm mt-1">
              Deploy, monitor, and optimize paid acquisition across Meta, Google Ads, and TikTok with automated budget safeguards.
            </p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors shadow-lg shadow-indigo-600/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Launch New Ad Campaign
          </button>
        </div>

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Ad Spend</span>
              <DollarSign className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">$12,950</div>
            <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +14.2% pacing vs last month
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Blended ROAS</span>
              <BarChart2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">4.46x</div>
            <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Optimal threshold (&gt;3.0x)
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Conversions</span>
              <Target className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">441</div>
            <div className="text-xs text-slate-400 mt-2">Cost per acquisition: $29.36</div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">AI Optimization</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">Active</div>
            <div className="text-xs text-amber-300 mt-2">Auto-reallocating budget hourly</div>
          </div>
        </div>

        {/* Modal / Inline Creator for New Campaigns */}
        {isCreating && (
          <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-6 mb-8 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4">Create New AI-Optimized Ad Campaign</h3>
            <form onSubmit={handleCreateCampaign} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Campaign Name</label>
                  <input
                    type="text"
                    required
                    value={newCampaignName}
                    onChange={(e) => setNewCampaignName(e.target.value)}
                    placeholder="e.g. Q4 Retargeting Surge"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Ad Network</label>
                  <select
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="meta">Meta Ads (FB &amp; IG)</option>
                    <option value="google">Google Ads Manager</option>
                    <option value="tiktok">TikTok Ads Manager</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Daily Budget ($)</label>
                  <input
                    type="number"
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors shadow-md"
                >
                  Save &amp; Deploy Campaign
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Active Campaigns Table */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" /> Active Omnichannel Campaigns
            </h3>
            <span className="text-xs text-slate-400">Syncing live via API</span>
          </div>

          <div className="divide-y divide-slate-800">
            {campaigns.map((camp) => (
              <div key={camp.id} className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-slate-900/80 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      camp.platform === 'meta' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      camp.platform === 'google' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                    }`}>
                      {camp.platform}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      camp.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {camp.status}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">{camp.name}</h4>
                  <p className="text-xs text-slate-400">{camp.targetAudience}</p>
                </div>

                <div className="flex items-center gap-6 flex-wrap">
                  <div className="text-right">
                    <div className="text-xs text-slate-500 uppercase">Daily Budget</div>
                    <div className="text-sm font-bold text-white">${camp.budgetDaily}/day</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500 uppercase">Total Spent</div>
                    <div className="text-sm font-bold text-white">${camp.spent.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500 uppercase">ROAS</div>
                    <div className="text-sm font-bold text-emerald-400">{camp.roas}x</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500 uppercase">Conversions</div>
                    <div className="text-sm font-bold text-indigo-300">{camp.conversions}</div>
                  </div>
                  <button className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors">
                    <Sliders className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};