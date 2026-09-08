// src/App.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { 
  CampaignSettings, 
  PlatformConfig, 
  PostDraft, 
  CustomerConversation, 
  PlatformAnalytics, 
  AnalyticsMetric 
} from './types';
import { 
  INITIAL_CAMPAIGN_SETTINGS, 
  PLATFORM_REGISTRY, 
  PLATFORM_PERFORMANCE, 
  TIMELINE_ANALYTICS 
} from './data/initialData';
import { SEED_POSTS, SEED_CONVERSATIONS, isWorkspaceEmpty, seedDemoWorkspace } from './lib/seedService';
import { ToastProvider, useToast } from './context/ToastContext';
import { Header } from './components/Header';
import { LandingPageView } from './components/LandingPageView';
import { PricingPageView } from './components/PricingPageView';
import { CampaignSettingsView } from './components/CampaignSettingsView';
import { ContentStudio } from './components/ContentStudio';
import { SupplierHubView } from './components/SupplierHubView';
import { DmInboxView } from './components/DmInboxView';
import { UnifiedAnalytics } from './components/UnifiedAnalytics';
import { ConnectedChannelsView } from './components/ConnectedChannelsView';
import { CalendarView } from './components/CalendarView';
import { BlogGeneratorView } from './components/BlogGeneratorView';
import { ContactsView } from './components/ContactsView';
import { EmailBuilderView } from './components/EmailBuilderView';
import { WorkflowBuilderView } from './components/WorkflowBuilderView';
import { AdsManagerView } from './components/AdsManagerView';
import { RevenueAttributionView } from './components/RevenueAttributionView';
import { AuthModal } from './components/AuthModal';
import { ChangePasswordModal } from './components/ChangePasswordModal';
import { UserProfile } from './types/auth';
import { supabase, mapSupabaseUserToProfile } from './lib/supabase';
import { RotateCcw } from 'lucide-react';

function AppContent() {
  const { showSuccess, showInfo, showError } = useToast();

  // Root View State: 'home' | 'pricing' | 'app'
  const [rootView, setRootView] = useState<'home' | 'pricing' | 'app'>('home');
  
  // App Workspace Tabs
  const [activeTab, setActiveTab] = useState<string>('content');

  // Authentication State
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('dako_current_user');
    if (!saved) return null;
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse stored user profile, clearing it:', e);
      localStorage.removeItem('dako_current_user');
      return null;
    }
  });

  // Core Data States with localStorage persistence & automatic initial seed fallback
  const [settings, setSettings] = useState<CampaignSettings>(() => {
    const saved = localStorage.getItem('dako_campaign_settings');
    if (!saved) return INITIAL_CAMPAIGN_SETTINGS;
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse stored campaign settings, resetting to defaults:', e);
      localStorage.removeItem('dako_campaign_settings');
      return INITIAL_CAMPAIGN_SETTINGS;
    }
  });

  const [posts, setPosts] = useState<PostDraft[]>(() => {
    const saved = localStorage.getItem('dako_post_drafts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return SEED_POSTS;
  });

  const [conversations, setConversations] = useState<CustomerConversation[]>(() => {
    const saved = localStorage.getItem('dako_dm_conversations');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return SEED_CONVERSATIONS;
  });

  const [channels, setChannels] = useState<PlatformConfig[]>(() => {
    const saved = localStorage.getItem('dako_channels');
    if (!saved) return PLATFORM_REGISTRY;
    try {
      const parsed: PlatformConfig[] = JSON.parse(saved);
      return PLATFORM_REGISTRY.map((registryChan) => {
        const existing = parsed.find((p) => p.id === registryChan.id);
        return existing ? { ...registryChan, ...existing, name: registryChan.name, apiName: registryChan.apiName } : registryChan;
      });
    } catch {
      return PLATFORM_REGISTRY;
    }
  });

  // Sync Supabase Auth state and active session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const profile = mapSupabaseUserToProfile(session.user);
        setCurrentUser(profile);
        localStorage.setItem('dako_current_user', JSON.stringify(profile));
      }
    }).catch((err) => {
      console.warn('Initial Supabase session fetch notice:', err);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const profile = mapSupabaseUserToProfile(session.user);
        setCurrentUser(profile);
        localStorage.setItem('dako_current_user', JSON.stringify(profile));

        if (isWorkspaceEmpty()) {
          const seeded = seedDemoWorkspace();
          setPosts(seeded.posts);
          setConversations(seeded.conversations);
          setSettings(seeded.settings);
          setChannels(seeded.channels);
          showSuccess('Initialized demo workspace with sample data.');
        }
      } else {
        setCurrentUser(null);
        localStorage.removeItem('dako_current_user');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [showSuccess]);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('dako_campaign_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('dako_post_drafts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('dako_dm_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('dako_channels', JSON.stringify(channels));
  }, [channels]);

  const handleResetDemoWorkspace = useCallback(() => {
    const seeded = seedDemoWorkspace();
    setPosts(seeded.posts);
    setConversations(seeded.conversations);
    setSettings(seeded.settings);
    setChannels(seeded.channels);
    showSuccess('Workspace reset to initial demo state.');
  }, [showSuccess]);

  const handleAuthSuccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const profile = mapSupabaseUserToProfile(session.user);
        setCurrentUser(profile);
        localStorage.setItem('dako_current_user', JSON.stringify(profile));
        showSuccess(`Welcome back, ${profile.name}!`);
        setRootView('app');
        setActiveTab('content');
      }
    } catch (err: any) {
      showError(err.message || 'Authentication error.');
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      showInfo('Signed out of session.');
    } catch (err: any) {
      console.error('Supabase sign out error:', err);
    }
    setCurrentUser(null);
    localStorage.removeItem('dako_current_user');
  };

  // Post Handlers
  const handleUpdatePost = (updatedPost: PostDraft) => {
    setPosts((prev) => prev.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
  };

  const handleAddPost = (newPost: PostDraft) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleDeletePost = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  // DM Conversation Handlers
  const handleUpdateConversation = (updatedConv: CustomerConversation) => {
    setConversations((prev) => prev.map((c) => (c.id === updatedConv.id ? updatedConv : c)));
  };

  const handleAddConversation = (newConv: CustomerConversation) => {
    setConversations((prev) => [newConv, ...prev.filter(c => c.id !== newConv.id)]);
  };

  // Channel Handlers
  const handleUpdateChannel = (updatedChannel: PlatformConfig) => {
    setChannels((prev) => prev.map((ch) => (ch.id === updatedChannel.id ? updatedChannel : ch)));
  };

  // Header badges
  const pendingApprovalsCount = posts.filter(
    (p) => p.status === 'draft' || (p.status as any) === 'pending_approval'
  ).length;

  const unreadInquiriesCount = conversations.filter(
    (c) => c.status === 'action_needed'
  ).length;

  // Render Public Pricing View
  if (rootView === 'pricing') {
    return (
      <PricingPageView
        onBackToHome={() => setRootView('home')}
        onEnterDashboard={() => setRootView('app')}
      />
    );
  }

  // Render Public Landing Page
  if (rootView === 'home') {
    return (
      <div className="min-h-screen bg-white">
        <LandingPageView
          settings={settings}
          currentUser={currentUser}
          onEnterApp={() => setRootView('app')}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenPricing={() => setRootView('pricing')}
        />
        {/* Auth Modal */}
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans antialiased selection:bg-[#0284c7] selection:text-white">
      {/* Workspace Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'home') {
            setRootView('home');
          } else {
            setActiveTab(tab);
          }
        }}
        settings={settings}
        pendingApprovalsCount={pendingApprovalsCount}
        unreadInquiriesCount={unreadInquiriesCount}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthOpen(true)}
        onOpenPasswordModal={() => setIsPasswordModalOpen(true)}
        onSignOut={handleSignOut}
        onResetDemoWorkspace={handleResetDemoWorkspace}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 space-y-5">
        {/* Active Campaign Status Indicator Card */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            id="btn-active-campaign-banner"
            onClick={() => setActiveTab('settings')}
            className="group flex items-center gap-3 bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-sky-300 rounded-xl px-3.5 py-2 shadow-2xs hover:shadow-xs transition-all text-left cursor-pointer"
            title="Click to modify campaign parameters and brand targets in Campaign Settings"
          >
            <div className="relative flex items-center justify-center shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-75"></span>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Active Campaign:
              </span>
              <span className="text-xs font-bold text-slate-900 group-hover:text-[#0284c7] transition-colors">
                {settings.activeCampaign}
              </span>
              <span className="text-[10px] font-medium text-slate-400 group-hover:text-sky-600 bg-slate-100 group-hover:bg-sky-50 px-2 py-0.5 rounded-md border border-slate-200 group-hover:border-sky-200 transition-colors ml-1">
                Change &rarr;
              </span>
            </div>
          </button>
        </div>

        {/* Tab Routing */}
        {activeTab === 'settings' && (
          <CampaignSettingsView
            settings={settings}
            onSaveSettings={setSettings}
          />
        )}

        {activeTab === 'content' && (
          <ContentStudio
            posts={posts}
            settings={settings}
            onUpdatePost={handleUpdatePost}
            onAddPost={handleAddPost}
            onDeletePost={handleDeletePost}
          />
        )}

        {activeTab === 'builder' && (
          <EmailBuilderView settings={settings} />
        )}

        {activeTab === 'contacts' && (
          <ContactsView />
        )}

        {activeTab === 'supplier_hub' && (
          <SupplierHubView
            settings={settings}
            onAddPost={handleAddPost}
            onNavigateToContentStudio={() => setActiveTab('content')}
          />
        )}

        {activeTab === 'inbox' && (
          <DmInboxView
            conversations={conversations}
            onUpdateConversation={handleUpdateConversation}
            onAddConversation={handleAddConversation}
          />
        )}

        {activeTab === 'analytics' && (
          <UnifiedAnalytics
            timeline={TIMELINE_ANALYTICS}
            performance={PLATFORM_PERFORMANCE}
            posts={posts}
            settings={settings}
          />
        )}

        {activeTab === 'channels' && (
          <ConnectedChannelsView
            channels={channels}
            currentUser={currentUser}
            onUpdateChannel={handleUpdateChannel}
          />
        )}

        {activeTab === 'calendar' && (
          <CalendarView
            posts={posts}
            onSelectPost={(_post) => {
              setActiveTab('content');
            }}
            onCreatePostForDate={(_dateStr) => {
              setActiveTab('content');
            }}
          />
        )}

        {activeTab === 'blog' && (
          <BlogGeneratorView
            settings={settings}
          />
        )}

        {/* New Advanced Routing (Accessible internally) */}
        {activeTab === 'workflows' && (
          <WorkflowBuilderView />
        )}
        
        {activeTab === 'ads' && (
          <AdsManagerView settings={settings} />
        )}
        
        {activeTab === 'revenue' && (
          <RevenueAttributionView settings={settings} />
        )}

      </main>

      {/* Minimal Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>{settings.brandName} Marketing Suite • Active Campaign: {settings.activeCampaign}</span>
          <div className="flex items-center gap-3">
            <button
              onClick={handleResetDemoWorkspace}
              className="text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Reset Demo Seed</span>
            </button>
            <span>•</span>
            <span>Social Distribution &amp; Customer Engagement</span>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
}

export function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;