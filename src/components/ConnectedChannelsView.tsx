import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  ExternalLink, 
  Sliders, 
  Copy, 
  Check, 
  Share2, 
  ShieldCheck, 
  Plus, 
  Clock, 
  Radio, 
  Lock, 
  Unlink, 
  Key, 
  Activity, 
  Server, 
  ShieldAlert, 
  FileText,
  AlertCircle,
  Database,
  Sparkles,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';
import { PlatformConfig, Platform } from '../types';
import { UserProfile } from '../types/auth';
import { OAuthModal } from './OAuthModal';
import { useToast } from '../context/ToastContext';
import { 
  OAUTH_PLATFORM_DEFINITIONS, 
  checkUrlForOAuthCallback, 
  syncConnectedAccountToSupabase,
  removeConnectedAccountFromSupabase 
} from '../lib/oauthService';

interface ConnectedChannelsViewProps {
  channels: PlatformConfig[];
  currentUser?: UserProfile | null;
  onUpdateChannel: (updated: PlatformConfig) => void;
}

export const ConnectedChannelsView: React.FC<ConnectedChannelsViewProps> = ({
  channels,
  currentUser = null,
  onUpdateChannel,
}) => {
  const { showSuccess, showError, showInfo } = useToast();
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [selectedChannelForOAuth, setSelectedChannelForOAuth] = useState<PlatformConfig | null>(null);
  const [copiedHandle, setCopiedHandle] = useState<string | null>(null);
  const [callbackBanner, setCallbackBanner] = useState<{ platform: string; message: string } | null>(null);
  const [staffViewTab, setStaffViewTab] = useState<'matrix' | 'diagnostics' | 'webhooks'>('matrix');
  const [disconnectModalChannel, setDisconnectModalChannel] = useState<PlatformConfig | null>(null);

  const isStaffOrAdmin = currentUser?.role === 'employee';

  // 1. Check for inbound OAuth callbacks on component mount
  useEffect(() => {
    const callbackData = checkUrlForOAuthCallback();
    if (callbackData?.platform) {
      const targetChannel = channels.find(c => c.id === callbackData.platform);
      if (targetChannel) {
        const updated: PlatformConfig = {
          ...targetChannel,
          status: 'connected',
          connected: true,
          lastSynced: 'Just now via OAuth Callback',
          tokenExpiryDays: 60,
          tokenExpiresAt: new Date(Date.now() + 60 * 86400000).toISOString(),
          webhookStatus: 'active'
        };
        onUpdateChannel(updated);
        try {
          syncConnectedAccountToSupabase(currentUser, updated, targetChannel.scopes || []);
        } catch (err: any) {
          console.error(err);
        }
        showSuccess('OAuth connection updated.', targetChannel.name);
        setCallbackBanner({
          platform: targetChannel.name,
          message: `Successfully completed OAuth authorization for ${targetChannel.name} and synced credentials to Supabase!`
        });

        // Clean query params without reload
        if (window.history.replaceState) {
          const url = window.location.pathname;
          window.history.replaceState({}, document.title, url);
        }
      }
    }
  }, []);

  // Sync token & health check simulation
  const handleSync = async (channel: PlatformConfig) => {
    setSyncingId(channel.id);
    try {
      await new Promise(r => setTimeout(r, 600));
      const updated: PlatformConfig = {
        ...channel,
        status: channel.id === 'truth_social' ? 'manual_mode' : 'connected',
        connected: channel.id !== 'truth_social',
        lastSynced: 'Just now (Latency: 38ms)',
        webhookStatus: 'active'
      };

      onUpdateChannel(updated);
      await syncConnectedAccountToSupabase(currentUser, updated, channel.scopes || []);
      showSuccess('Channel synchronization completed.', channel.name);
    } catch (err: any) {
      showError(err.message || 'Sync failed.');
    } finally {
      setSyncingId(null);
    }
  };

  // Disconnect Channel
  const handleConfirmDisconnect = async () => {
    if (!disconnectModalChannel) return;
    const channel = disconnectModalChannel;
    
    try {
      const updated: PlatformConfig = {
        ...channel,
        connected: false,
        status: channel.id === 'truth_social' ? 'manual_mode' : 'disconnected',
        accountName: 'Not Connected',
        lastSynced: 'Disconnected'
      };

      onUpdateChannel(updated);
      await removeConnectedAccountFromSupabase(currentUser, channel.id);
      showInfo('OAuth connection updated.', `${channel.name} Disconnected`);
    } catch (err: any) {
      showError(err.message || 'Failed to revoke token.');
    } finally {
      setDisconnectModalChannel(null);
    }
  };

  const handleCopyHandle = (handle: string, id: string) => {
    navigator.clipboard.writeText(handle);
    setCopiedHandle(id);
    showInfo('Account handle copied to clipboard.');
    setTimeout(() => setCopiedHandle(null), 2000);
  };

  const handleOAuthSuccess = (updatedChannel: PlatformConfig) => {
    onUpdateChannel(updatedChannel);
    showSuccess('OAuth connection updated.', updatedChannel.name);
    setCallbackBanner({
      platform: updatedChannel.name,
      message: `Account ${updatedChannel.accountHandle} connected and synchronized with Supabase.`
    });
  };

  // Metrics
  const activeCount = channels.filter(c => c.connected && c.status === 'connected').length;
  const actionRequiredCount = channels.filter(c => c.status === 'action_required').length;
  const manualCount = channels.filter(c => c.status === 'manual_mode').length;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Inbound Callback Notification Banner */}
      {callbackBanner && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 shadow-xs flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-bold">{callbackBanner.platform} OAuth Authorization Verified</p>
              <p className="text-xs text-emerald-700">{callbackBanner.message}</p>
            </div>
          </div>
          <button
            onClick={() => setCallbackBanner(null)}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 px-2 py-1 rounded bg-emerald-100 hover:bg-emerald-200 transition-colors cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Top Integration Hub Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200">
              PLATFORM MATRIX
            </span>
            <span className="text-xs text-slate-500 font-medium">5 Platform Integrations</span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-[#0284c7]" />
              <span>Supabase connected_accounts sync</span>
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">Connected Channels & OAuth Router</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage live API authorization tokens, direct publishing scopes, and automated webhook routing.
          </p>
        </div>

        {/* Status Indicators & Role Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{activeCount} Active</span>
          </div>
          {actionRequiredCount > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>{actionRequiredCount} Reconnect Needed</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 text-purple-800 border border-purple-200 text-xs font-semibold">
            <Radio className="w-3.5 h-3.5 text-purple-600" />
            <span>{manualCount} Manual Clipboard</span>
          </div>

          {/* Role Mode Indicator */}
          <div className="pl-2 border-l border-slate-200">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${
              isStaffOrAdmin 
                ? 'bg-[#0b2545] text-white border-[#0b2545]' 
                : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}>
              {isStaffOrAdmin ? 'Staff Telemetry Mode' : 'Customer Account Mode'}
            </span>
          </div>
        </div>
      </div>

      {/* Staff Telemetry Tabs (Only if Staff or toggled for enterprise inspection) */}
      {isStaffOrAdmin && (
        <div className="bg-white border border-slate-200 rounded-xl p-1 shadow-2xs flex items-center gap-1 max-w-md">
          <button
            onClick={() => setStaffViewTab('matrix')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              staffViewTab === 'matrix' ? 'bg-[#0b2545] text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Platform Cards
          </button>
          <button
            onClick={() => setStaffViewTab('diagnostics')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              staffViewTab === 'diagnostics' ? 'bg-[#0b2545] text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            OAuth Health Diagnostics
          </button>
          <button
            onClick={() => setStaffViewTab('webhooks')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              staffViewTab === 'webhooks' ? 'bg-[#0b2545] text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Webhook Delivery
          </button>
        </div>
      )}

      {/* STAFF VIEW: OAuth Diagnostics */}
      {isStaffOrAdmin && staffViewTab === 'diagnostics' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#0284c7]" />
                <span>Enterprise API Rate Limits & Token Expiration Table</span>
              </h3>
              <p className="text-xs text-slate-500">Live monitoring of long-lived access tokens and platform quotas.</p>
            </div>
            <button
              onClick={() => {
                channels.forEach(c => handleSync(c));
              }}
              className="text-xs font-semibold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Ping All API Endpoints</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-y border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Platform</th>
                  <th className="py-2.5 px-3">API Specification</th>
                  <th className="py-2.5 px-3">Auth Scheme</th>
                  <th className="py-2.5 px-3">Token Expiry</th>
                  <th className="py-2.5 px-3">Rate Limit Quota</th>
                  <th className="py-2.5 px-3">Supabase Sync</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {channels.map(ch => {
                  const def = OAUTH_PLATFORM_DEFINITIONS[ch.id];
                  return (
                    <tr key={ch.id} className="hover:bg-slate-50/70">
                      <td className="py-3 px-3 font-semibold text-slate-900 flex items-center gap-2">
                        <div className="w-6 h-6 rounded flex items-center justify-center font-bold text-white text-[10px]" style={{ backgroundColor: ch.color }}>
                          {ch.name[0]}
                        </div>
                        <span>{ch.name}</span>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-600">
                        {ch.apiName} ({ch.apiVersion || 'v1'})
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 font-mono">
                          {def?.authType || 'oauth2'}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        {ch.status === 'action_required' ? (
                          <span className="text-amber-700 font-semibold flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5" /> Expired (Renew)
                          </span>
                        ) : ch.id === 'truth_social' ? (
                          <span className="text-purple-700 font-medium">N/A (Airgapped)</span>
                        ) : (
                          <span className="text-emerald-700 font-medium">
                            {ch.tokenExpiryDays ? `${ch.tokenExpiryDays} days remaining` : 'Active'}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        {def?.rateLimitInfo.limit || 'Standard'}
                      </td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                          <Check className="w-3 h-3" /> Synced
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => setSelectedChannelForOAuth(ch)}
                          className="px-2.5 py-1 text-[11px] font-semibold text-[#0284c7] hover:bg-sky-50 rounded transition-colors cursor-pointer"
                        >
                          Configure
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* STAFF VIEW: Webhook Delivery */}
      {isStaffOrAdmin && staffViewTab === 'webhooks' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Server className="w-4 h-4 text-emerald-600" />
                <span>Real-Time Webhook Listener & Inbound Payload Routing</span>
              </h3>
              <p className="text-xs text-slate-500">Live incoming events from Meta Graph API, LinkedIn MDP, and TikTok Direct API.</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              Webhook Gateway: Operational
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[11px] text-slate-500 font-semibold block">Meta Graph Webhook</span>
              <span className="text-sm font-bold text-slate-900">/api/webhooks/meta</span>
              <p className="text-[11px] text-emerald-700 mt-1">Status: Active (Latency 18ms)</p>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[11px] text-slate-500 font-semibold block">LinkedIn Lead Gen & Updates</span>
              <span className="text-sm font-bold text-slate-900">/api/webhooks/linkedin</span>
              <p className="text-[11px] text-amber-700 mt-1">Status: Standby (Token Refresh Pending)</p>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[11px] text-slate-500 font-semibold block">TikTok Creator Events</span>
              <span className="text-sm font-bold text-slate-900">/api/webhooks/tiktok</span>
              <p className="text-[11px] text-emerald-700 mt-1">Status: Active (Latency 22ms)</p>
            </div>
          </div>
        </div>
      )}

      {/* PLATFORM MATRIX CARDS (5 Core Platforms) */}
      {(staffViewTab === 'matrix' || !isStaffOrAdmin) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {channels.map((channel) => {
            const isConnected = channel.connected && channel.status === 'connected';
            const isActionRequired = channel.status === 'action_required';
            const isManual = channel.status === 'manual_mode' || channel.id === 'truth_social';
            const isDisconnected = channel.status === 'disconnected' || (!channel.connected && !isManual);
            const isSyncing = syncingId === channel.id;

            // Generate Scope/Permission Summary Line
            let scopeSummary = 'Publishing + Direct Messaging enabled';
            if (channel.id === 'facebook') {
              scopeSummary = 'Publishing + Direct Messaging + Graph Insights enabled';
            } else if (channel.id === 'instagram') {
              scopeSummary = 'Reels Publishing + DM Triage + Story Insights enabled';
            } else if (channel.id === 'linkedin') {
              scopeSummary = 'Page Posts + Thought Leadership + Demographics enabled';
            } else if (channel.id === 'tiktok') {
              scopeSummary = 'Direct Video Post API + Comment Triage enabled';
            } else if (channel.id === 'truth_social') {
              scopeSummary = 'Manual Clipboard Dispatch Queue (Zero API Footprint)';
            }

            return (
              <div
                key={channel.id}
                id={`card-channel-${channel.id}`}
                className={`bg-white border rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
                  isActionRequired ? 'border-amber-300 ring-1 ring-amber-200' : 'border-slate-200'
                }`}
              >
                {/* 1. Platform Header */}
                <div className="p-5 border-b border-slate-100 bg-white">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-11 h-11 rounded-lg flex items-center justify-center font-bold text-white shadow-xs shrink-0 text-base"
                        style={{ backgroundColor: channel.color }}
                      >
                        {channel.name[0]}
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="text-sm font-bold text-slate-900 leading-tight">
                            {channel.name}
                          </h3>
                        </div>
                        
                        <span className="inline-block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                          {channel.apiName || 'API Integration'}
                        </span>

                        {/* Account Name & Handle */}
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <span className={`text-xs font-mono font-medium ${
                            isDisconnected ? 'text-slate-400 italic' : 'text-slate-700'
                          }`}>
                            {isDisconnected ? 'Not Connected' : channel.accountHandle}
                          </span>
                          {!isDisconnected && (
                            <button
                              onClick={() => handleCopyHandle(channel.accountHandle, channel.id)}
                              className="text-slate-400 hover:text-slate-700 cursor-pointer p-0.5 rounded"
                              title="Copy account handle"
                            >
                              {copiedHandle === channel.id ? (
                                <Check className="w-3 h-3 text-emerald-600" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Live Status Badge */}
                    <div className="shrink-0">
                      {isConnected && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span>Active / Connected</span>
                        </span>
                      )}
                      {isActionRequired && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          <span>Action Required</span>
                        </span>
                      )}
                      {isManual && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-purple-50 text-purple-800 border border-purple-200">
                          <Radio className="w-3 h-3 text-purple-600" />
                          <span>Manual Mode</span>
                        </span>
                      )}
                      {isDisconnected && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                          <span>Disconnected</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. Card Body: Scope & Permissions Summary */}
                <div className="p-5 space-y-3.5 flex-1 bg-white">
                  {/* Scope Summary Banner */}
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-slate-700 flex items-center gap-1">
                        <Key className="w-3 h-3 text-[#0284c7]" />
                        <span>Scope & Permissions</span>
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {channel.scopes ? `${channel.scopes.length} Scopes Granted` : 'Default Policy'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-800 font-medium leading-snug">
                      {scopeSummary}
                    </p>
                  </div>

                  {/* Granted Scope Chips */}
                  {channel.scopes && channel.scopes.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {channel.scopes.slice(0, 3).map((scope) => (
                        <span
                          key={scope}
                          className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 text-slate-600 rounded text-[10px] font-mono"
                        >
                          {scope}
                        </span>
                      ))}
                      {channel.scopes.length > 3 && (
                        <span className="px-1.5 py-0.5 bg-slate-50 text-slate-500 rounded text-[10px] font-medium">
                          +{channel.scopes.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Capabilities Matrix */}
                  <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] pt-1">
                    <div className="p-1.5 rounded bg-slate-50 border border-slate-100">
                      <span className="text-slate-500 block">Publishing</span>
                      <span className={`font-bold ${channel.canCreatePost ? 'text-emerald-700' : 'text-purple-700'}`}>
                        {channel.canCreatePost ? 'Direct API' : 'Manual'}
                      </span>
                    </div>
                    <div className="p-1.5 rounded bg-slate-50 border border-slate-100">
                      <span className="text-slate-500 block">DM Triage</span>
                      <span className={`font-bold ${channel.canAutomateDm ? 'text-emerald-700' : 'text-slate-400'}`}>
                        {channel.canAutomateDm ? 'Automated' : 'Disabled'}
                      </span>
                    </div>
                    <div className="p-1.5 rounded bg-slate-50 border border-slate-100">
                      <span className="text-slate-500 block">Analytics</span>
                      <span className={`font-bold ${channel.hasAnalyticsApi ? 'text-emerald-700' : 'text-purple-700'}`}>
                        {channel.hasAnalyticsApi ? 'Real-time' : 'Self-Report'}
                      </span>
                    </div>
                  </div>

                  {/* Token & Health Note */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{channel.lastSynced || 'Never synced'}</span>
                    </span>
                    {channel.tokenExpiryDays !== undefined && channel.tokenExpiryDays > 0 && (
                      <span className="text-emerald-700 font-medium">
                        Token: {channel.tokenExpiryDays}d valid
                      </span>
                    )}
                  </div>
                </div>

                {/* 3. Card Footer Actions */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                  {/* Left: Configure / Scopes modal */}
                  <button
                    id={`btn-configure-${channel.id}`}
                    onClick={() => setSelectedChannelForOAuth(channel)}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Permissions</span>
                  </button>

                  {/* Right: Primary Action (Connect / Reconnect / Disconnect / Sync) */}
                  <div className="flex items-center gap-1.5">
                    {/* Disconnect button for connected non-manual channels */}
                    {!isDisconnected && !isManual && (
                      <button
                        onClick={() => setDisconnectModalChannel(channel)}
                        className="text-xs font-medium text-slate-500 hover:text-rose-600 p-1.5 rounded hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Disconnect account"
                      >
                        <Unlink className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* Sync Button */}
                    {!isDisconnected && (
                      <button
                        id={`btn-sync-${channel.id}`}
                        onClick={() => handleSync(channel)}
                        disabled={isSyncing}
                        className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center gap-1 shadow-2xs cursor-pointer disabled:opacity-60"
                        title="Test ping & sync metrics"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#0284c7]' : ''}`} />
                        <span>{isSyncing ? 'Syncing...' : 'Sync'}</span>
                      </button>
                    )}

                    {/* Main Connect / Reconnect Button */}
                    {isDisconnected && (
                      <button
                        id={`btn-connect-${channel.id}`}
                        onClick={() => setSelectedChannelForOAuth(channel)}
                        className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0b2545] hover:bg-[#133966] rounded-lg transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Connect Account</span>
                      </button>
                    )}

                    {isActionRequired && (
                      <button
                        id={`btn-reconnect-${channel.id}`}
                        onClick={() => setSelectedChannelForOAuth(channel)}
                        className="px-3.5 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reconnect</span>
                      </button>
                    )}

                    {isManual && (
                      <button
                        id={`btn-manual-${channel.id}`}
                        onClick={() => setSelectedChannelForOAuth(channel)}
                        className="px-3 py-1.5 text-xs font-semibold text-purple-800 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                      >
                        <Radio className="w-3.5 h-3.5" />
                        <span>Queue Config</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* OAuth Authorization & Scope Customizer Modal */}
      <OAuthModal
        isOpen={Boolean(selectedChannelForOAuth)}
        channel={selectedChannelForOAuth}
        currentUser={currentUser}
        onClose={() => setSelectedChannelForOAuth(null)}
        onSuccess={handleOAuthSuccess}
      />

      {/* Disconnect Confirmation Modal */}
      {disconnectModalChannel && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl p-6 border border-slate-200 space-y-4">
            <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto text-rose-600">
              <ShieldAlert className="w-5 h-5" />
            </div>
            
            <div className="text-center">
              <h3 className="text-base font-bold text-slate-900">Disconnect {disconnectModalChannel.name}?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Revoking access will pause automated publishing, scheduled posts, and DM triage on <span className="font-semibold text-slate-800">{disconnectModalChannel.accountHandle}</span>.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDisconnectModalChannel(null)}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDisconnect}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                Confirm Disconnect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
