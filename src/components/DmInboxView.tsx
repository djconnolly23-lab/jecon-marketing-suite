import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Bot,
  User,
  MessageSquare,
  Clock,
  Tag,
  Filter,
  Check,
  ChevronRight,
  RefreshCw,
  PlusCircle,
  ShieldAlert,
  Zap,
  HelpCircle,
  Smile,
  AlertTriangle,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { CustomerConversation, Platform, DmMessage } from '../types';
import {
  saveConversationToSupabase,
  getAiDmSuggestion,
  simulateInboundDm,
  fetchInboxConversations
} from '../lib/inboxService';

interface DmInboxViewProps {
  conversations: CustomerConversation[];
  onUpdateConversation: (updated: CustomerConversation) => void;
  onAddConversation?: (newConv: CustomerConversation) => void;
}

export const DmInboxView: React.FC<DmInboxViewProps> = ({
  conversations: initialConversations,
  onUpdateConversation,
  onAddConversation,
}) => {
  const [conversations, setConversations] = useState<CustomerConversation[]>(initialConversations);
  const [selectedId, setSelectedId] = useState<string>(initialConversations[0]?.id || '');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');
  const [isGeneratingSuggestion, setIsGeneratingSuggestion] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [metaWindowSecondsLeft, setMetaWindowSecondsLeft] = useState<number>(23 * 3600 + 48 * 60);

  // Sync with prop updates
  useEffect(() => {
    if (initialConversations && initialConversations.length > 0) {
      setConversations(initialConversations);
      if (!selectedId && initialConversations[0]) {
        setSelectedId(initialConversations[0].id);
      }
    }
  }, [initialConversations]);

  const activeConversation = useMemo(() => {
    return conversations.find((c) => c.id === selectedId) || conversations[0];
  }, [conversations, selectedId]);

  // Live Meta 24-hr window countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setMetaWindowSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatMetaTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  const filteredConversations = useMemo(() => {
    return conversations.filter((c) => {
      const matchStatus =
        filterStatus === 'all' ||
        (filterStatus === 'action_needed' && (c.status === 'action_needed' || c.status === 'escalated_to_human')) ||
        (filterStatus === 'bot_handled' && c.status === 'bot_handled') ||
        (filterStatus === 'resolved' && c.status === 'resolved');
      
      const matchSearch =
        c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.customerHandle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.messages.some((m) => m.text.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchStatus && matchSearch;
    });
  }, [conversations, filterStatus, searchQuery]);

  const handleSendReply = async (textToSend?: string) => {
    const text = (textToSend || replyText).trim();
    if (!text || !activeConversation) return;

    const newMessage: DmMessage = {
      id: `msg-${Date.now()}`,
      sender: 'agent',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated: CustomerConversation = {
      ...activeConversation,
      status: 'resolved',
      messages: [...activeConversation.messages, newMessage],
      lastUpdated: 'Just now'
    };

    const updatedList = conversations.map(c => c.id === updated.id ? updated : c);
    setConversations(updatedList);
    onUpdateConversation(updated);
    await saveConversationToSupabase(updated, updatedList);
    setReplyText('');
  };

  const handleStatusChange = async (newStatus: 'bot_handled' | 'action_needed' | 'resolved') => {
    if (!activeConversation) return;
    const updated: CustomerConversation = {
      ...activeConversation,
      status: newStatus,
      lastUpdated: 'Just now'
    };

    const updatedList = conversations.map(c => c.id === updated.id ? updated : c);
    setConversations(updatedList);
    onUpdateConversation(updated);
    await saveConversationToSupabase(updated, updatedList);
  };

  const handleRegenerateAiSuggestion = async () => {
    if (!activeConversation) return;
    setIsGeneratingSuggestion(true);
    const lastCustomerMsg = [...activeConversation.messages]
      .reverse()
      .find(m => m.sender === 'customer')?.text || 'Inquiry regarding JECON services';

    const suggestion = await getAiDmSuggestion(lastCustomerMsg, activeConversation.platform, 'JECON LLC');
    
    const updated: CustomerConversation = {
      ...activeConversation,
      suggestedReply: suggestion.suggestedReply,
      sentiment: suggestion.sentiment,
      urgency: suggestion.urgency,
      category: suggestion.category
    };

    const updatedList = conversations.map(c => c.id === updated.id ? updated : c);
    setConversations(updatedList);
    onUpdateConversation(updated);
    await saveConversationToSupabase(updated, updatedList);
    setIsGeneratingSuggestion(false);
  };

  const getPlatformBadge = (platform: Platform) => {
    switch (platform) {
      case 'facebook': return { name: 'Facebook', color: 'text-blue-700 bg-blue-50 border-blue-200' };
      case 'instagram': return { name: 'Instagram', color: 'text-pink-700 bg-pink-50 border-pink-200' };
      case 'linkedin': return { name: 'LinkedIn', color: 'text-sky-800 bg-sky-50 border-sky-200' };
      case 'tiktok': return { name: 'TikTok', color: 'text-slate-900 bg-slate-100 border-slate-300' };
      case 'truth_social': return { name: 'Truth Social', color: 'text-purple-700 bg-purple-50 border-purple-200' };
      default: return { name: 'Social DM', color: 'text-slate-700 bg-slate-50 border-slate-200' };
    }
  };

  const getSentimentTag = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive':
        return <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">Positive</span>;
      case 'urgent':
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 animate-pulse">Urgent</span>;
      case 'frustrated':
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">Frustrated</span>;
      default:
        return <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">Neutral</span>;
    }
  };

  const actionNeededCount = conversations.filter(c => c.status === 'action_needed' || c.status === 'escalated_to_human').length;
  const botHandledCount = conversations.filter(c => c.status === 'bot_handled').length;
  const resolvedCount = conversations.filter(c => c.status === 'resolved').length;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Split-View Box */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col md:flex-row h-[720px]">
        {/* LEFT COLUMN: Conversation List */}
        <div className="w-full md:w-80 lg:w-96 border-r border-slate-200 flex flex-col bg-slate-50/50">
          {/* Search & Filters */}
          <div className="p-3.5 border-b border-slate-200 space-y-2.5 bg-white">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by customer, handle, text..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {[
                { id: 'all', label: 'All Messages', count: conversations.length },
                { id: 'action_needed', label: 'Action Needed', count: actionNeededCount },
                { id: 'bot_handled', label: 'Bot Handled', count: botHandledCount },
                { id: 'resolved', label: 'Resolved', count: resolvedCount }
              ].map((tab) => (
                <button
                  key={tab.id}
                  id={`filter-tab-${tab.id}`}
                  onClick={() => setFilterStatus(tab.id)}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                    filterStatus === tab.id
                      ? 'bg-[#0b2545] text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1 py-0.2 rounded-full ${
                    filterStatus === tab.id ? 'bg-sky-500/30 text-sky-100' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Conversation List Items */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No matching conversations found.
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const isSelected = activeConversation?.id === conv.id;
                const pBadge = getPlatformBadge(conv.platform);
                const lastMsg = conv.messages[conv.messages.length - 1];

                return (
                  <button
                    key={conv.id}
                    id={`conv-item-${conv.id}`}
                    onClick={() => setSelectedId(conv.id)}
                    className={`w-full text-left p-3.5 transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-white shadow-xs border-l-4 border-[#0284c7] ring-1 ring-sky-100'
                        : 'hover:bg-slate-100/70 bg-transparent'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={conv.avatar}
                        alt={conv.customerName}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                      <span
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white shadow-2xs ${
                          conv.platform === 'facebook' ? 'bg-blue-600' :
                          conv.platform === 'instagram' ? 'bg-pink-600' :
                          conv.platform === 'linkedin' ? 'bg-sky-700' :
                          conv.platform === 'tiktok' ? 'bg-slate-900' : 'bg-purple-600'
                        }`}
                      >
                        {conv.platform[0].toUpperCase()}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {conv.customerName}
                        </h4>
                        <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                          {conv.lastUpdated}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-500 truncate mb-2">
                        {conv.customerHandle} • {lastMsg ? lastMsg.text : 'New inquiry'}
                      </p>

                      <div className="flex items-center flex-wrap gap-1.5">
                        {conv.status === 'action_needed' && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                            Action Needed
                          </span>
                        )}
                        {conv.status === 'bot_handled' && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                            Bot Handled
                          </span>
                        )}
                        {conv.status === 'resolved' && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Resolved
                          </span>
                        )}

                        {getSentimentTag(conv.sentiment)}

                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${pBadge.color}`}>
                          {pBadge.name}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Active Chat Window */}
        {activeConversation ? (
          <div className="flex-1 flex flex-col bg-white">
            {/* Profile Header & Meta 24-hr messaging countdown */}
            <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={activeConversation.avatar}
                  alt={activeConversation.customerName}
                  className="w-11 h-11 rounded-full object-cover border border-slate-200 shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">
                      {activeConversation.customerName}
                    </h3>
                    <span className="text-xs text-slate-500 font-mono">
                      {activeConversation.customerHandle}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-600">
                    <span className="font-semibold">Category: <span className="text-slate-900">{activeConversation.category}</span></span>
                    <span className="text-slate-300">•</span>
                    <span>Sentiment: {getSentimentTag(activeConversation.sentiment)}</span>
                  </div>
                </div>
              </div>

              {/* Meta 24-hr timer & Status Switcher */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-2xs text-right">
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-500 justify-end">
                    <Clock className="w-3 h-3 text-[#0284c7]" />
                    <span>Meta 24h Window</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-emerald-700">
                    {formatMetaTimer(metaWindowSecondsLeft)}
                  </div>
                </div>

                {activeConversation.status === 'resolved' ? (
                  <button
                    onClick={() => handleStatusChange('action_needed')}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reopen Thread</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleStatusChange('resolved')}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark as Resolved</span>
                  </button>
                )}
              </div>
            </div>

            {/* Messages Bubble Thread */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/30">
              {activeConversation.messages.map((msg) => {
                const isCustomer = msg.sender === 'customer';
                const isBot = msg.sender === 'bot';

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 max-w-lg ${
                      isCustomer ? 'mr-auto' : 'ml-auto flex-row-reverse'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-xs ${
                        isCustomer
                          ? 'bg-slate-200 text-slate-700'
                          : isBot
                          ? 'bg-sky-100 text-sky-700'
                          : 'bg-[#0b2545] text-white'
                      }`}
                    >
                      {isCustomer ? <User className="w-4 h-4" /> : isBot ? <Bot className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                    </div>

                    <div className="space-y-1">
                      <div
                        className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                          isCustomer
                            ? 'bg-white border border-slate-200 text-slate-900 shadow-xs'
                            : isBot
                            ? 'bg-sky-50 border border-sky-200 text-sky-950 shadow-xs'
                            : 'bg-[#0b2545] text-white shadow-xs'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <p className={`text-[10px] text-slate-400 font-medium ${isCustomer ? 'text-left' : 'text-right'}`}>
                        {msg.timestamp} • {isCustomer ? activeConversation.customerName : isBot ? 'Auto-Reply Bot' : 'Human Operator'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AI Suggested Human Response Box */}
            {activeConversation.suggestedReply && (
              <div className="p-3.5 bg-gradient-to-r from-sky-50 via-sky-50/80 to-white border-t border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="w-6 h-6 rounded-md bg-sky-500/20 flex items-center justify-center shrink-0 text-[#0284c7] mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-sky-900">AI Suggested Human Response</span>
                      <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-sky-200/60 text-sky-900">
                        Context-Aware
                      </span>
                    </div>
                    <p className="text-xs text-slate-800 italic leading-snug">
                      "{activeConversation.suggestedReply}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <button
                    onClick={handleRegenerateAiSuggestion}
                    disabled={isGeneratingSuggestion}
                    className="p-1.5 text-xs text-sky-700 hover:bg-sky-100 rounded transition-colors cursor-pointer"
                    title="Regenerate AI suggestion"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingSuggestion ? 'animate-spin' : ''}`} />
                  </button>
                  <button
                    id="btn-use-suggestion"
                    onClick={() => setReplyText(activeConversation.suggestedReply || '')}
                    className="px-3 py-1.5 text-xs font-semibold text-sky-800 bg-white border border-sky-300 rounded-lg hover:bg-sky-50 transition-colors shadow-2xs cursor-pointer"
                  >
                    Use Suggestion
                  </button>
                  <button
                    id="btn-send-instant"
                    onClick={() => handleSendReply(activeConversation.suggestedReply)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0284c7] hover:bg-sky-600 rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    <span>Send Instantly</span>
                  </button>
                </div>
              </div>
            )}

            {/* Reply Input Bar */}
            <div className="p-3.5 border-t border-slate-200 bg-white flex items-center gap-2">
              <input
                id="input-dm-reply"
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
                placeholder={`Reply to ${activeConversation.customerName} on ${activeConversation.platform}...`}
                className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
              />

              <button
                id="btn-send-reply"
                onClick={() => handleSendReply()}
                disabled={!replyText.trim()}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#0b2545] hover:bg-[#133966] disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-400">
            Select a conversation from the list to view messages.
          </div>
        )}
      </div>
    </div>
  );
};