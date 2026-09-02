import React, { useState } from 'react';
import { Sliders, Save, Check, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';
import { CampaignSettings } from '../types';
import { useToast } from '../context/ToastContext';

interface CampaignSettingsViewProps {
  settings: CampaignSettings;
  onSaveSettings: (updated: CampaignSettings) => void;
}

const TONE_PRESETS = [
  {
    name: 'Strategic & Authoritative',
    value: 'Confident, data-driven, concise, strategic, and professional'
  },
  {
    name: 'Action-Oriented Operator',
    value: 'Direct, practical, execution-focused with clear step-by-step frameworks'
  },
  {
    name: 'Executive Thought Leadership',
    value: 'Intellectually rigorous, macro-economic insight, high-conviction, and visionary'
  }
];

export const CampaignSettingsView: React.FC<CampaignSettingsViewProps> = ({
  settings,
  onSaveSettings,
}) => {
  const { showSuccess } = useToast();
  const [formData, setFormData] = useState<CampaignSettings>({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setSavedSuccess(true);
    showSuccess('Settings saved.', 'Campaign Settings');
    setTimeout(() => {
      setSavedSuccess(false);
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0b2545] flex items-center justify-center text-white shrink-0">
              <Sliders className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Brand & Campaign Settings</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Define the global parameters used for content generation, voice alignment, and compliance.
              </p>
            </div>
          </div>

          <button
            id="btn-save-top"
            onClick={handleSubmit}
            className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#0b2545] text-white hover:bg-[#133966] transition-colors shadow-xs"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Saved Successfully!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>

        {/* Main Settings Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Brand Name */}
            <div>
              <label htmlFor="input-brand-name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Brand Name
              </label>
              <input
                id="input-brand-name"
                type="text"
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:border-transparent transition-all"
                placeholder="e.g. JECON LLC"
                required
              />
              <p className="text-[11px] text-slate-400 mt-1">Identifies the company across all channel headers and signatures.</p>
            </div>

            {/* Active Campaign Name */}
            <div>
              <label htmlFor="input-campaign-name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Active Campaign Name
              </label>
              <input
                id="input-campaign-name"
                type="text"
                value={formData.activeCampaign}
                onChange={(e) => setFormData({ ...formData, activeCampaign: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:border-transparent transition-all"
                placeholder="e.g. Q3 2026 Executive Leadership & AI Growth"
                required
              />
              <p className="text-[11px] text-slate-400 mt-1">Sets the active thematic goal for scheduled social posts and hooks.</p>
            </div>
          </div>

          {/* Target Audience Profile */}
          <div>
            <label htmlFor="input-target-audience" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Target Audience
            </label>
            <textarea
              id="input-target-audience"
              rows={2}
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:border-transparent transition-all"
              placeholder="e.g. B2B Executives, Enterprise Leaders, Tech Founders, and Growth Directors"
              required
            />
            <p className="text-[11px] text-slate-400 mt-1">Specifies ideal client profiles to optimize messaging hooks and vocabulary.</p>
          </div>

          {/* Tone of Voice */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="input-tone-of-voice" className="block text-xs font-semibold text-slate-700">
                Tone of Voice
              </label>
              <span className="text-[11px] text-slate-400">Quick Presets:</span>
            </div>

            {/* Presets Chips */}
            <div className="flex flex-wrap gap-2 mb-2">
              {TONE_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => setFormData({ ...formData, toneOfVoice: preset.value })}
                  className={`text-[11px] px-2.5 py-1 rounded-md border transition-colors ${
                    formData.toneOfVoice === preset.value
                      ? 'bg-sky-50 text-sky-800 border-sky-300 font-medium'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>

            <textarea
              id="input-tone-of-voice"
              rows={2}
              value={formData.toneOfVoice}
              onChange={(e) => setFormData({ ...formData, toneOfVoice: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:border-transparent transition-all"
              placeholder="e.g. Confident, data-driven, concise, strategic, and professional"
              required
            />
          </div>

          {/* FTC Disclaimer & Disclosure Rules */}
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-slate-700" />
              <label htmlFor="input-ftc-rules" className="block text-xs font-semibold text-slate-700">
                FTC Disclaimer & Compliance Rules
              </label>
            </div>
            <textarea
              id="input-ftc-rules"
              rows={2}
              value={formData.ftcComplianceRules}
              onChange={(e) => setFormData({ ...formData, ftcComplianceRules: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:border-transparent transition-all"
              placeholder="e.g. Always include #ad or #sponsored on sponsored content. Clearly disclose partnerships."
              required
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Automatically checked across all generated post drafts before publication.
            </p>
          </div>

          {/* Bottom Action Strip */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setFormData({ ...settings })}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>

            <button
              id="btn-save-settings"
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-lg bg-[#0b2545] text-white hover:bg-[#133966] transition-colors shadow-xs"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Settings Saved</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Campaign Settings</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
