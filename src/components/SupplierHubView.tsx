import React, { useState } from 'react';
import { 
  Building2, 
  Sparkles, 
  Send, 
  Check, 
  Layers, 
  ShieldCheck, 
  Share2, 
  ExternalLink, 
  Copy, 
  Zap, 
  Search, 
  Filter,
  Eye,
  CheckCircle2,
  TrendingUp,
  Sliders,
  X
} from 'lucide-react';
import { SupplierCampaign } from '../types/supplier';
import { CampaignSettings, PostDraft } from '../types';
import { MASTER_SUPPLIER_CAMPAIGNS, personalizeSupplierCampaign } from '../data/supplierCampaigns';
import { useToast } from '../context/ToastContext';

interface SupplierHubViewProps {
  settings: CampaignSettings;
  onAddPost: (post: PostDraft) => void;
  onNavigateToContentStudio: () => void;
}

export const SupplierHubView: React.FC<SupplierHubViewProps> = ({
  settings,
  onAddPost,
  onNavigateToContentStudio,
}) => {
  const { showSuccess, showInfo } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewCampaign, setPreviewCampaign] = useState<SupplierCampaign | null>(null);
  const [queuedIds, setQueuedIds] = useState<string[]>([]);

  // Filter campaigns
  const filteredCampaigns = MASTER_SUPPLIER_CAMPAIGNS.filter((camp) => {
    const matchCategory = selectedCategory === 'all' || camp.supplierCategory === selectedCategory;
    const matchSearch = 
      camp.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.campaignTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.hookTemplate.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const categories = ['all', ...Array.from(new Set(MASTER_SUPPLIER_CAMPAIGNS.map(c => c.supplierCategory)))];

  const handlePersonalizeAndQueue = (campaign: SupplierCampaign) => {
    const newPost = personalizeSupplierCampaign(campaign, settings);
    onAddPost(newPost);
    
    setQueuedIds((prev) => [...prev, campaign.id]);
    showSuccess('Supplier campaign branded and queued.', `${campaign.supplierName}`);

    if (previewCampaign?.id === campaign.id) {
      setPreviewCampaign(null);
    }
  };

  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case 'instagram': return { name: 'Instagram Reel', bg: 'bg-pink-50 text-pink-700 border-pink-200' };
      case 'linkedin': return { name: 'LinkedIn', bg: 'bg-sky-50 text-sky-700 border-sky-200' };
      case 'tiktok': return { name: 'TikTok Video', bg: 'bg-slate-900 text-white border-slate-700' };
      case 'facebook': return { name: 'Facebook', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
      default: return { name: platform, bg: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200">
              SUPPLIER HUB
            </span>
            <span className="text-xs text-slate-500 font-medium">3 Master B2B Campaigns Ready</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">Master Supplier Campaigns</h2>
          <p className="text-xs text-slate-500 mt-0.5 max-w-2xl">
            Pre-loaded enterprise supplier playbooks. Personalize in 1-click to inject <span className="font-semibold text-slate-800">{settings.brandName}</span> brand identity, campaign theme (<span className="text-sky-700 font-medium">{settings.activeCampaign}</span>), and FTC disclosures.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateToContentStudio}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            <span>View Queued Drafts</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-medium text-slate-500 mr-1">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0b2545] text-white shadow-2xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              {cat === 'all' ? 'All Suppliers' : cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search campaigns & suppliers..."
            className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#0284c7] w-full sm:w-60"
          />
        </div>
      </div>

      {/* Campaign Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCampaigns.map((camp) => {
          const platformBadge = getPlatformBadge(camp.recommendedPlatform);
          const isQueued = queuedIds.includes(camp.id);

          return (
            <div
              key={camp.id}
              id={`card-supplier-${camp.id}`}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Card Header */}
              <div className="p-5 border-b border-slate-100 bg-white">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${platformBadge.bg}`}>
                        {platformBadge.name} ({camp.aspectRatio})
                      </span>
                      <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                        {camp.supplierCategory}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mt-2 leading-tight">
                      {camp.campaignTitle}
                    </h3>
                    <p className="text-xs font-semibold text-[#0284c7] mt-0.5">
                      Partner: {camp.supplierName}
                    </p>
                  </div>

                  <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs shrink-0">
                    <Building2 className="w-4 h-4 text-slate-600" />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3.5 flex-1 bg-white">
                {/* Hook Box */}
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Calibrated Hook
                  </span>
                  <p className="text-xs text-slate-800 font-semibold italic leading-snug">
                    "{camp.hookTemplate}"
                  </p>
                </div>

                {/* Key Value Deliverables */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-slate-700 block">
                    Enterprise Deliverables:
                  </span>
                  {camp.keyBenefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="line-clamp-1">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Compliance Footnote */}
                <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="line-clamp-1">{camp.complianceNotes}</span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewCampaign(camp)}
                  className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview Copy</span>
                </button>

                <button
                  id={`btn-personalize-${camp.id}`}
                  type="button"
                  onClick={() => handlePersonalizeAndQueue(camp)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-xs cursor-pointer ${
                    isQueued
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-[#0b2545] hover:bg-[#133966] text-white'
                  }`}
                >
                  {isQueued ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-200" />
                      <span>Branded & Queued</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                      <span>1-Click Brand & Queue</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preview & Personalize Drawer / Modal */}
      {previewCampaign && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-slate-200 bg-[#0b2545] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300">
                  {previewCampaign.supplierName} • {previewCampaign.supplierCategory}
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {previewCampaign.campaignTitle}
                </h3>
              </div>
              <button
                onClick={() => setPreviewCampaign(null)}
                className="text-sky-200 hover:text-white p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs text-slate-700">
              <div className="p-3 bg-sky-50 rounded-lg border border-sky-200">
                <p className="font-semibold text-sky-950">
                  Targeted for: <span className="font-bold text-[#0b2545]">{settings.brandName}</span> ({settings.activeCampaign})
                </p>
              </div>

              <div>
                <label className="font-bold text-slate-900 uppercase text-[10px] block mb-1">Hook</label>
                <p className="p-2.5 bg-slate-50 border border-slate-200 rounded font-medium text-slate-800">
                  {previewCampaign.hookTemplate}
                </p>
              </div>

              <div>
                <label className="font-bold text-slate-900 uppercase text-[10px] block mb-1">Body Text</label>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded whitespace-pre-line leading-relaxed">
                  {previewCampaign.bodyTemplate.replace(/JECON/g, settings.brandName)}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-900 uppercase text-[10px] block mb-1">Call to Action</label>
                <p className="p-2.5 bg-slate-50 border border-slate-200 rounded font-medium text-slate-800">
                  {previewCampaign.ctaTemplate.replace(/JECON/g, settings.brandName)}
                </p>
              </div>

              <div>
                <label className="font-bold text-slate-900 uppercase text-[10px] block mb-1">FTC & Partner Disclosure</label>
                <p className="p-2.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-[11px]">
                  {previewCampaign.complianceNotes}
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setPreviewCampaign(null)}
                className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => handlePersonalizeAndQueue(previewCampaign)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0b2545] hover:bg-[#133966] rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                <span>Brand & Queue into Content Studio</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
