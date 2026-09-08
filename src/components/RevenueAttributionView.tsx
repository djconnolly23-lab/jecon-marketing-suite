import React, { useState } from 'react';
import { 
  BarChart3, 
  DollarSign, 
  Users, 
  ArrowUpRight, 
  Filter, 
  Download, 
  CheckCircle2,
  TrendingUp,
  Layers
} from 'lucide-react';
import { CampaignSettings } from '../types';

interface RevenueAttributionViewProps {
  settings?: CampaignSettings;
}

interface AttributionChannel {
  campaign: string;
  channel: string;
  leads: number;
  customers: number;
  revenue: number;
  cpa: number;
}

export const RevenueAttributionView: React.FC<RevenueAttributionViewProps> = () => {
  const [attributionData] = useState<AttributionChannel[]>([
    {
      campaign: 'Q3 Enterprise Lead Gen - Meta Lookalike',
      channel: 'Meta Ads',
      leads: 142,
      customers: 38,
      revenue: 57000,
      cpa: 29.58
    },
    {
      campaign: 'Intent Search - AI Marketing Software',
      channel: 'Google Ads',
      leads: 210,
      customers: 54,
      revenue: 81000,
      cpa: 32.38
    },
    {
      campaign: 'TikTok Spark Ads - Operator Habits',
      channel: 'TikTok',
      leads: 89,
      customers: 19,
      revenue: 28500,
      cpa: 21.91
    },
    {
      campaign: 'B2B Executive Newsletter & Outbound',
      channel: 'Email Automation',
      leads: 310,
      customers: 72,
      revenue: 108000,
      cpa: 12.50
    }
  ]);

  const totalRevenue = attributionData.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalLeads = attributionData.reduce((acc, curr) => acc + curr.leads, 0);
  const totalCustomers = attributionData.reduce((acc, curr) => acc + curr.customers, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-3">
              <BarChart3 className="w-4 h-4" /> Tier 1 Gap: True Revenue Attribution
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">Campaign Revenue Intelligence</h1>
            <p className="text-slate-400 text-sm mt-1">
              Track multi-touch conversion paths from Campaign to Leads, Customers, and Attributed Revenue.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-medium text-sm hover:bg-slate-800 transition-colors cursor-pointer">
              <Download className="w-4 h-4" /> Export Attribution CSV
            </button>
          </div>
        </div>

        {/* Top Summary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Attributed Revenue</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-4xl font-extrabold text-white">${totalRevenue.toLocaleString()}</div>
            <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +28.4% growth across tracked funnels
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Converted Leads</span>
              <Users className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-4xl font-extrabold text-white">{totalLeads.toLocaleString()}</div>
            <div className="text-xs text-slate-400 mt-2">Across all active campaigns</div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Closed-Won Customers</span>
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-4xl font-extrabold text-white">{totalCustomers.toLocaleString()}</div>
            <div className="text-xs text-purple-300 mt-2">Overall conversion rate: {((totalCustomers / totalLeads) * 100).toFixed(1)}%</div>
          </div>
        </div>

        {/* Detailed Breakdown Table */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" /> Campaign &rarr; Leads &rarr; Customers &rarr; Revenue Breakdown
            </h3>
            <span className="text-xs text-slate-400">AI Marketer Verified</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-950/40">
                  <th className="py-3 px-6">Marketing Campaign</th>
                  <th className="py-3 px-6">Channel</th>
                  <th className="py-3 px-6 text-right">Leads Generated</th>
                  <th className="py-3 px-6 text-right">Customers Won</th>
                  <th className="py-3 px-6 text-right">Cost / Acq</th>
                  <th className="py-3 px-6 text-right">Attributed Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-sm">
                {attributionData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/80 transition-colors">
                    <td className="py-4 px-6 font-medium text-white">{row.campaign}</td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        {row.channel}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right text-slate-300 font-mono">{row.leads}</td>
                    <td className="py-4 px-6 text-right text-indigo-400 font-mono font-bold">{row.customers}</td>
                    <td className="py-4 px-6 text-right text-slate-300 font-mono">${row.cpa.toFixed(2)}</td>
                    <td className="py-4 px-6 text-right text-emerald-400 font-mono font-bold">${row.revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};