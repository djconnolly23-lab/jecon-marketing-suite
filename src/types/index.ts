export type UserRole = 'employee' | 'customer';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  companyName?: string; // For customer accounts
  department?: string;  // For employee accounts
}

export type AuthView = 'signin' | 'signup' | 'forgot_password';

export type Platform = 'facebook' | 'instagram' | 'linkedin' | 'tiktok' | 'truth_social';

export type PostStatus = 'draft' | 'pending_approval' | 'approved' | 'scheduled' | 'published';

export type MediaType = 'reel' | 'video' | 'single_image' | 'carousel' | 'text_article';

export interface CampaignSettings {
  brandName: string;
  activeCampaign: string;
  targetAudience: string;
  toneOfVoice: string;
  ftcComplianceRules: string;
}

export type BrandCampaignConfig = CampaignSettings;

export * from './oauth';

export interface PlatformConfig {
  id: Platform;
  name: string;
  apiName?: string;
  apiVersion?: string;
  accountName?: string;
  icon: string;
  color: string;
  badgeBg: string;
  status: 'connected' | 'action_required' | 'manual_mode' | 'disconnected';
  accountHandle: string;
  connected: boolean;
  description: string;
  supportedFormats: string[];
  lastSynced?: string;
  canCreatePost?: boolean;
  canAutomateDm?: boolean;
  hasAnalyticsApi?: boolean;
  dmPolicyNote?: string;
  scopes?: string[];
  tokenExpiryDays?: number;
  tokenExpiresAt?: string;
  webhookStatus?: 'active' | 'degraded' | 'inactive';
}

export interface PostDraft {
  id: string;
  platform: Platform;
  title: string;
  mediaType: MediaType;
  hook: string;
  bodyCopy: string;
  callToAction: string;
  hashtags: string[];
  visualPromptSuggestion?: string;
  aspectRatio: '9:16' | '1:1' | '4:5' | '16:9';
  status: PostStatus;
  scheduledTime?: string;
  ftcDisclosures: {
    hasSponsoredContent: boolean;
    hasProperTags: boolean;
    complianceNotes: string;
  };
  metrics?: {
    reach: number;
    likes: number;
    comments: number;
    shares: number;
    clicks: number;
    engagementRate: number;
  };
  createdAt: string;
}

export interface DmMessage {
  id: string;
  sender: 'customer' | 'bot' | 'agent' | 'human_agent';
  text: string;
  timestamp: string;
}

export interface CustomerConversation {
  id: string;
  platform: Platform;
  customerName: string;
  customerHandle: string;
  avatar: string;
  status: 'bot_handled' | 'action_needed' | 'escalated_to_human' | 'resolved';
  sentiment: 'positive' | 'neutral' | 'urgent' | 'question' | 'frustrated';
  urgency: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  messages: DmMessage[];
  lastUpdated: string;
  suggestedReply?: string;
  windowExpiresAt?: string;
  receivedAt?: string;
  assignedAgent?: string;
  metadata?: Record<string, any>;
}

export interface AnalyticsMetric {
  date: string;
  facebook: number;
  instagram: number;
  linkedin: number;
  tiktok: number;
  totalReach?: number;
  totalImpressions: number;
  totalEngagements: number;
  handledDms?: number;
  dmConversations?: number;
  escalationCount?: number;
}

export interface PlatformAnalytics {
  platform: Platform;
  totalFollowers: number;
  followerGrowthPct: number;
  totalReach?: number;
  totalImpressions: number;
  engagementRate: number;
  postsPublished: number;
  dmsHandled: number;
  status: string;
  avgResponseTimeMin: number;
  dmEscalationRate: number;
}
