import React, { useState } from 'react';
import { 
  Mail, 
  Sparkles, 
  Sliders, 
  CheckCircle2, 
  Send, 
  Bot, 
  Layers, 
  Zap, 
  RefreshCw 
} from 'lucide-react';
import { CampaignSettings } from '../types';

interface EmailBuilderViewProps {
  settings?: CampaignSettings;
}

export const EmailBuilderView: React.FC<EmailBuilderViewProps> = ({ settings }) => {
  const [subjectA, setSubjectA] = useState('Exclusive Q3 Executive Briefing & Growth Playbook');
  const [subjectB, setSubjectB] = useState('How top operators scale 10x without capital bottlenecks');
  const [selectedWinner, setSelectedWinner] = useState<'A' | 'B' | 'auto'>('auto');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const handleRunABTest = () => {
    setIsTesting(true);
    setTestResult(null);

    setTimeout(() => {
      // AI automatically simulates test results and picks a winner
      const winner = Math.random() > 0.5 ? 'Subject B (Higher curiosity hook)' : 'Subject A (Direct executive positioning)';
      setTestResult(`AI Marketer (Jane) evaluated 5,000 recipient sample. Winner: ${winner} with a +34.2% higher open rate.`);
      setIsTesting(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-3">
              <Mail className="w-4 h-4" /> Tier 1 Gap: Email A/B Testing & Dynamic AI
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">Autonomous Email Studio & A/B Testing</h1>
            <p className="text-slate-400 text-sm mt-1">
              Configure subject-line, content, and CTA variations with automatic AI winner selection.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Configuration Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-purple-400" /> Subject-Line A/B Testing Matrix
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Variant A (Control)</label>
                  <input
                    type="text"
                    value={subjectA}
                    onChange={(e) => setSubjectA(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 font-medium"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-medium text-slate-400">Variant B (Challenger)</label>
                    <button 
                      onClick={() => setSubjectB('Scaling faster: The secret playbook top executives use')}
                      className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" /> Generate AI Alternative
                    </button>
                  </div>
                  <input
                    type="text"
                    value={subjectB}
                    onChange={(e) => setSubjectB(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 font-medium"
                  />
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <label className="block text-xs font-medium text-slate-400 mb-2">Winner Selection Protocol</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setSelectedWinner('auto')}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                        selectedWinner === 'auto' ? 'bg-purple-600/20 border-purple-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      🤖 AI Auto-Winner
                    </button>
                    <button
                      onClick={() => setSelectedWinner('A')}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                        selectedWinner === 'A' ? 'bg-purple-600/20 border-purple-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      Variant A
                    </button>
                    <button
                      onClick={() => setSelectedWinner('B')}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                        selectedWinner === 'B' ? 'bg-purple-600/20 border-purple-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      Variant B
                    </button>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={handleRunABTest}
                    disabled={isTesting}
                    className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/50 text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 cursor-pointer"
                  >
                    <RefreshCw className={`w-4 h-4 ${isTesting ? 'animate-spin' : ''}`} />
                    {isTesting ? 'Simulating A/B Test across 5k contacts...' : 'Run Autonomous A/B Test'}
                  </button>
                </div>

                {testResult && (
                  <div className="mt-4 p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs text-purple-200 leading-relaxed animate-fade-in">
                    <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Test Completed Successfully
                    </div>
                    {testResult}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar: AI Personalization & Dynamic Engine */}
          <div className="space-y-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                <Bot className="w-4 h-4 text-purple-400" /> Dynamic AI Personalization
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Instead of simple mail merge, DAKO generates individualized content paragraphs tailored to each recipient's purchase history and CRM engagement score[cite: 2].
              </p>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="font-semibold text-purple-400 block mb-1">Customer A (High Intent):</span>
                  <p className="text-slate-400">"Since you explored our enterprise scaling tiers last week, here is a custom ROI projection..."</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="font-semibold text-purple-400 block mb-1">Customer B (Dormant):</span>
                  <p className="text-slate-400">"We noticed you haven't reviewed your campaign dashboard in 30 days. Here is what has been automated..."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};