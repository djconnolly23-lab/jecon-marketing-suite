import { CampaignSettings, PlatformConfig, PostDraft, CustomerConversation, PlatformAnalytics, AnalyticsMetric } from '../types';

export const INITIAL_CAMPAIGN_SETTINGS: CampaignSettings = {
  brandName: "JECON LLC",
  activeCampaign: "Q3 2026 Executive Leadership & AI Growth",
  targetAudience: "B2B Executives, Enterprise Leaders, Tech Founders, and Growth Directors (ages 28-54)",
  toneOfVoice: "Confident, data-driven, concise, strategic, and professional",
  ftcComplianceRules: "Always include #ad or #sponsored on sponsored content. Clearly disclose partnerships and verify case-study claims."
};

export const PLATFORM_REGISTRY: PlatformConfig[] = [
  {
    id: 'facebook',
    name: 'Facebook Business Pages',
    apiName: 'Meta Graph API',
    apiVersion: 'v20.0',
    accountName: 'JECON Official Page',
    icon: 'Facebook',
    color: '#1877F2',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    status: 'connected',
    accountHandle: '@JECONOfficial',
    connected: true,
    description: 'Direct publishing for posts, links, carousels, and automated customer messaging via Meta Graph API.',
    supportedFormats: ['Feed Posts', 'Carousels', 'Reels', 'Messenger Triage'],
    scopes: ['pages_manage_posts', 'pages_read_engagement', 'pages_messaging', 'pages_show_list'],
    tokenExpiryDays: 54,
    tokenExpiresAt: '2026-10-25T12:00:00Z',
    canCreatePost: true,
    canAutomateDm: true,
    hasAnalyticsApi: true,
    webhookStatus: 'active',
    lastSynced: '2 mins ago'
  },
  {
    id: 'instagram',
    name: 'Instagram Professional',
    apiName: 'Meta Graph API',
    apiVersion: 'v20.0',
    accountName: 'JECON Global Profile',
    icon: 'Instagram',
    color: '#E4405F',
    badgeBg: 'bg-pink-50 text-pink-700 border-pink-200',
    status: 'connected',
    accountHandle: '@jecon_official',
    connected: true,
    description: 'Publish 9:16 vertical Reels, square grid posts, stories, and manage direct messages via Meta Business suite.',
    supportedFormats: ['9:16 Reels', 'Grid Carousels', 'Direct Messages', 'Story Insights'],
    scopes: ['instagram_basic', 'instagram_content_publish', 'instagram_manage_messages', 'instagram_manage_insights'],
    tokenExpiryDays: 54,
    tokenExpiresAt: '2026-10-25T12:00:00Z',
    canCreatePost: true,
    canAutomateDm: true,
    hasAnalyticsApi: true,
    webhookStatus: 'active',
    lastSynced: '1 min ago'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Organization / Profile',
    apiName: 'MDP API',
    apiVersion: '202405',
    accountName: 'JECON LLC Enterprise Page',
    icon: 'Linkedin',
    color: '#0A66C2',
    badgeBg: 'bg-sky-50 text-sky-800 border-sky-200',
    status: 'action_required',
    accountHandle: 'linkedin.com/company/jecon-llc',
    connected: true,
    description: 'Member & Organization Marketing Developer Platform API for corporate updates, executive articles, and B2B reach.',
    supportedFormats: ['Articles', 'Thought Leadership Posts', 'Document Carousels', 'Lead Gen'],
    scopes: ['w_organization_social', 'r_organization_social', 'w_member_social', 'r_organization_admin'],
    tokenExpiryDays: 0,
    tokenExpiresAt: '2026-08-30T00:00:00Z',
    canCreatePost: true,
    canAutomateDm: false,
    hasAnalyticsApi: true,
    webhookStatus: 'degraded',
    dmPolicyNote: 'Direct member messaging restricted to approved Partner tier; public comment triage active.',
    lastSynced: 'Token renewal needed'
  },
  {
    id: 'tiktok',
    name: 'TikTok for Business',
    apiName: 'Direct API',
    apiVersion: 'v2',
    accountName: 'JECON Media Hub',
    icon: 'Video',
    color: '#000000',
    badgeBg: 'bg-slate-900 text-white border-slate-700',
    status: 'connected',
    accountHandle: '@jecon_media',
    connected: true,
    description: 'Direct Content Posting API integration for 9:16 short-form video publishing, creator analytics, and comment automation.',
    supportedFormats: ['9:16 Videos', 'Commercial Sounds', 'Video Captions', 'Comment Triage'],
    scopes: ['video.upload', 'video.publish', 'user.info.basic', 'comment.list', 'comment.reply'],
    tokenExpiryDays: 310,
    tokenExpiresAt: '2027-07-08T00:00:00Z',
    canCreatePost: true,
    canAutomateDm: true,
    hasAnalyticsApi: true,
    webhookStatus: 'active',
    lastSynced: '5 mins ago'
  },
  {
    id: 'truth_social',
    name: 'Truth Social',
    apiName: 'Manual Clipboard Queue',
    apiVersion: 'v1 (Airgapped)',
    accountName: 'JECON Official Truth Account',
    icon: 'Share2',
    color: '#7C3AED',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
    status: 'manual_mode',
    accountHandle: '@JECONLLC',
    connected: false,
    description: 'Airgapped dispatch queue. Generates 1-click clipboard payloads and compliance audit logs for manual posting.',
    supportedFormats: ['Manual Clipboard Queue', 'External Dispatch', 'Audit Logs'],
    scopes: ['clipboard_export_payload', 'manual_verification_log'],
    canCreatePost: false,
    canAutomateDm: false,
    hasAnalyticsApi: false,
    webhookStatus: 'inactive',
    dmPolicyNote: 'Manual channel operates with zero API footprint. Automated DM triage is disabled.',
    lastSynced: 'Ready for export'
  }
];

export const INITIAL_POST_DRAFTS: PostDraft[] = [
  {
    id: 'post-001',
    platform: 'instagram',
    title: '3 Daily Habits of High-Growth Enterprise Operators',
    mediaType: 'reel',
    hook: 'The difference between teams that plateau and those that scale 10x is disciplined execution.',
    bodyCopy: `Here is the framework top enterprise operators use:\n\n1. Deep Focus Block 08:00-10:00 (Zero notifications)\n2. High-Leverage Decision Protocol (Delegate tier-2 choices)\n3. 15-minute daily operational sync with department heads\n\nComment "GROWTH" below to receive our Q3 Executive Briefing.`,
    callToAction: 'Comment "GROWTH" or click link in bio for the full briefing.',
    hashtags: ['#Leadership', '#ScaleUp', '#Productivity', '#B2BStrategy', '#JECON'],
    visualPromptSuggestion: 'Crisp 9:16 vertical video with modern kinetic typography and minimalist boardroom background.',
    aspectRatio: '9:16',
    status: 'draft',
    scheduledTime: '2026-09-02T10:00:00Z',
    ftcDisclosures: {
      hasSponsoredContent: false,
      hasProperTags: true,
      complianceNotes: 'Organic educational content.'
    },
    createdAt: '2026-09-01T08:30:00Z'
  },
  {
    id: 'post-002',
    platform: 'linkedin',
    title: 'Why Strategic Focus Outperforms Raw Capital',
    mediaType: 'text_article',
    hook: 'Most scaling bottlenecks are focus problems, not capital problems.',
    bodyCopy: `Over the past four quarters, we tracked 35 mid-market enterprise transitions.\n\nThe single common denominator? Strategic subtraction.\n\nWhen you cut non-core product initiatives, you double down on the 20% that drives 80% of enterprise value.\n\nHow does your team evaluate initiative sunsetting?`,
    callToAction: 'Share your perspective in the comments or download the framework below.',
    hashtags: ['#Strategy', '#Leadership', '#B2B', '#EnterpriseGrowth', '#Operations'],
    aspectRatio: '1:1',
    status: 'scheduled',
    scheduledTime: '2026-09-03T14:30:00Z',
    ftcDisclosures: {
      hasSponsoredContent: false,
      hasProperTags: true,
      complianceNotes: 'Thought leadership post. Verified.'
    },
    metrics: {
      reach: 14200,
      likes: 428,
      comments: 67,
      shares: 34,
      clicks: 312,
      engagementRate: 5.9
    },
    createdAt: '2026-08-31T11:00:00Z'
  },
  {
    id: 'post-003',
    platform: 'tiktok',
    title: '5 SaaS Metric Red Flags You Cannot Ignore',
    mediaType: 'reel',
    hook: 'If your Net Revenue Retention is under 105%, stop investing in top-of-funnel ads right now.',
    bodyCopy: `Here is why leaky buckets kill growth before series B:\n\n1. Churn spikes look delayed by 90 days\n2. Customer Acquisition Cost goes up 3x\n3. Sales cycle friction doubles\n\nFix retention before accelerating spend.`,
    callToAction: 'Follow JECON for actionable weekly B2B playbooks.',
    hashtags: ['#SaaS', '#B2BMarketing', '#StartupLife', '#Finance', '#Growth'],
    visualPromptSuggestion: 'Fast-paced talking head with dynamic screen overlays showcasing charts and metrics.',
    aspectRatio: '9:16',
    status: 'published',
    scheduledTime: '2026-08-30T17:00:00Z',
    ftcDisclosures: {
      hasSponsoredContent: false,
      hasProperTags: true,
      complianceNotes: 'Standard compliant educational video.'
    },
    metrics: {
      reach: 58400,
      likes: 3890,
      comments: 245,
      shares: 412,
      clicks: 890,
      engagementRate: 9.3
    },
    createdAt: '2026-08-29T14:00:00Z'
  },
  {
    id: 'post-004',
    platform: 'facebook',
    title: 'Customer Spotlight: How Nexus Corp Scaled Enterprise Delivery',
    mediaType: 'single_image',
    hook: 'How one operations team reduced lead response time from 4 hours to 90 seconds.',
    bodyCopy: `By centralizing customer engagement workflows and deploying automated triage, Nexus Corp handled 4x inbound volume while increasing customer satisfaction to 98.4%.\n\nRead the full case study on our portal.`,
    callToAction: 'Click the link below to access the full enterprise case study.',
    hashtags: ['#CaseStudy', '#Enterprise', '#CustomerSuccess', '#B2B', '#JECON'],
    aspectRatio: '1:1',
    status: 'published',
    scheduledTime: '2026-08-28T12:00:00Z',
    ftcDisclosures: {
      hasSponsoredContent: true,
      hasProperTags: true,
      complianceNotes: 'Customer co-branded spotlight with explicit permission.'
    },
    metrics: {
      reach: 22100,
      likes: 640,
      comments: 88,
      shares: 51,
      clicks: 520,
      engagementRate: 5.8
    },
    createdAt: '2026-08-27T09:15:00Z'
  },
  {
    id: 'post-005',
    platform: 'truth_social',
    title: 'Resilient Supply Chains & Domestic Infrastructure Growth',
    mediaType: 'text_article',
    hook: 'Building domestic manufacturing resilience is the competitive advantage of the next decade.',
    bodyCopy: `American enterprises that invested early in diversified domestic supply chains are outperforming peers on margin stability and delivery predictability.\n\nKey takeaways from our quarterly economic briefing:\n- Lead time reduced by 40%\n- Working capital requirements stabilized\n\nFull insights at jecon.com.`,
    callToAction: 'Read the full report on jecon.com.',
    hashtags: ['#AmericanIndustry', '#SupplyChain', '#Business', '#Manufacturing'],
    aspectRatio: '1:1',
    status: 'draft',
    scheduledTime: '2026-09-04T15:00:00Z',
    ftcDisclosures: {
      hasSponsoredContent: false,
      hasProperTags: true,
      complianceNotes: 'Manual dispatch queue. Ready for clipboard export.'
    },
    createdAt: '2026-09-01T07:20:00Z'
  }
];

export const INITIAL_CONVERSATIONS: CustomerConversation[] = [
  {
    id: 'conv-101',
    platform: 'instagram',
    customerName: 'Marcus Vance',
    customerHandle: '@marcus_vance_exec',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'action_needed',
    sentiment: 'urgent',
    urgency: 'high',
    category: 'Enterprise Licensing',
    lastUpdated: '10m ago',
    windowExpiresAt: new Date(Date.now() + 23 * 3600000 + 48 * 60000).toISOString(),
    receivedAt: '10:14 AM',
    suggestedReply: 'Hello Marcus! We would be delighted to prepare a custom multi-seat proposal for your 40-person team. What is the best email to send the briefing to?',
    messages: [
      {
        id: 'm-1',
        sender: 'customer',
        text: 'Hello, saw your post on operational frameworks. We have a team of 40 directors looking for enterprise licensing and onboarding. Who can we speak with today?',
        timestamp: '10:14 AM'
      },
      {
        id: 'm-2',
        sender: 'bot',
        text: 'Thank you for reaching out to JECON LLC! Your request has been routed to our enterprise team.',
        timestamp: '10:15 AM'
      }
    ]
  },
  {
    id: 'conv-102',
    platform: 'facebook',
    customerName: 'Elena Rostova',
    customerHandle: 'Elena Rostova (COO)',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    status: 'bot_handled',
    sentiment: 'positive',
    urgency: 'low',
    category: 'Masterclass Registration',
    lastUpdated: '42m ago',
    windowExpiresAt: new Date(Date.now() + 21 * 3600000 + 15 * 60000).toISOString(),
    receivedAt: '09:42 AM',
    suggestedReply: 'Thanks Elena! The registration confirmation has been sent to your inbox.',
    messages: [
      {
        id: 'm-3',
        sender: 'customer',
        text: 'SCALE',
        timestamp: '09:42 AM'
      },
      {
        id: 'm-4',
        sender: 'bot',
        text: 'Hi Elena! Thanks for your interest in the JECON Q3 Leadership Cohort. Here is your direct access link: https://jecon.com/q3-masterclass. Let us know if you have any questions!',
        timestamp: '09:42 AM'
      },
      {
        id: 'm-5',
        sender: 'customer',
        text: 'Got it, thank you!',
        timestamp: '09:44 AM'
      }
    ]
  },
  {
    id: 'conv-103',
    platform: 'tiktok',
    customerName: 'David Chen',
    customerHandle: '@dchen_tech',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'action_needed',
    sentiment: 'frustrated',
    urgency: 'high',
    category: 'Billing Inquiry',
    lastUpdated: '1h ago',
    windowExpiresAt: new Date(Date.now() + 18 * 3600000 + 30 * 60000).toISOString(),
    receivedAt: '08:50 AM',
    suggestedReply: 'Hi David, I apologize for the double billing issue. I am reviewing transaction #JC-8842 right now and will process an immediate credit refund to your card on file.',
    messages: [
      {
        id: 'm-6',
        sender: 'customer',
        text: 'Hi, our invoice was billed twice for the quarterly briefing subscription. Can someone please check transaction #JC-8842 and issue a credit? This is blocking our finance close.',
        timestamp: '08:50 AM'
      },
      {
        id: 'm-7',
        sender: 'bot',
        text: 'Thank you for reaching out David. I have flagged your billing inquiry as high priority for our finance team.',
        timestamp: '08:51 AM'
      }
    ]
  },
  {
    id: 'conv-104',
    platform: 'instagram',
    customerName: 'Sarah Jenkins',
    customerHandle: '@sarah_jenkins_design',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    status: 'bot_handled',
    sentiment: 'neutral',
    urgency: 'low',
    category: 'FAQ / Playbook Access',
    lastUpdated: '2h ago',
    windowExpiresAt: new Date(Date.now() + 14 * 3600000).toISOString(),
    receivedAt: '08:00 AM',
    messages: [
      {
        id: 'm-8',
        sender: 'customer',
        text: 'Hi! Where can I download the free B2B operations playbook mentioned in your reel?',
        timestamp: '08:00 AM'
      },
      {
        id: 'm-9',
        sender: 'bot',
        text: 'Hello Sarah! You can download the complete playbook instantly at jecon.com/playbook with zero paywall.',
        timestamp: '08:00 AM'
      },
      {
        id: 'm-10',
        sender: 'customer',
        text: 'Downloaded, thanks a lot!',
        timestamp: '08:05 AM'
      }
    ]
  },
  {
    id: 'conv-105',
    platform: 'facebook',
    customerName: 'Jonathan Brooks',
    customerHandle: 'Jonathan Brooks',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    status: 'resolved',
    sentiment: 'positive',
    urgency: 'low',
    category: 'Keynote & Events',
    lastUpdated: 'Yesterday',
    windowExpiresAt: new Date(Date.now() + 4 * 3600000).toISOString(),
    receivedAt: 'Yesterday 3:15 PM',
    messages: [
      {
        id: 'm-11',
        sender: 'customer',
        text: 'Do you offer custom speaking engagements for corporate leadership summits?',
        timestamp: 'Yesterday 3:15 PM'
      },
      {
        id: 'm-12',
        sender: 'agent',
        text: 'Hi Jonathan, yes we do! Our keynote calendar for Q4 is open. I have emailed our speaker kit to your team address.',
        timestamp: 'Yesterday 3:30 PM'
      },
      {
        id: 'm-13',
        sender: 'customer',
        text: 'Received, will follow up with our events committee.',
        timestamp: 'Yesterday 4:00 PM'
      }
    ]
  },
  {
    id: 'conv-106',
    platform: 'instagram',
    customerName: 'Victoria Chen (CTO)',
    customerHandle: '@vchen_techlead',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    status: 'action_needed',
    sentiment: 'urgent',
    urgency: 'high',
    category: 'API Partnership',
    lastUpdated: '5m ago',
    windowExpiresAt: new Date(Date.now() + 23 * 3600000 + 55 * 60000).toISOString(),
    receivedAt: '10:20 AM',
    suggestedReply: 'Hi Victoria! Our technical integration lead would be glad to share our GraphQL developer documentation and OAuth test sandbox credentials. What timeline are you targeting for deployment?',
    messages: [
      {
        id: 'm-14',
        sender: 'customer',
        text: 'We are evaluating JECON API integration for our marketing stack. Do you provide a sandbox environment and webhook test hooks?',
        timestamp: '10:20 AM'
      }
    ]
  }
];

export const TIMELINE_ANALYTICS: AnalyticsMetric[] = [
  { date: 'Aug 03', facebook: 14200, instagram: 19800, linkedin: 8400, tiktok: 28500, totalReach: 70900, totalImpressions: 70900, totalEngagements: 4200, handledDms: 54, dmConversations: 54, escalationCount: 2 },
  { date: 'Aug 08', facebook: 16500, instagram: 22400, linkedin: 9900, tiktok: 34100, totalReach: 82900, totalImpressions: 82900, totalEngagements: 5120, handledDms: 68, dmConversations: 68, escalationCount: 3 },
  { date: 'Aug 13', facebook: 15100, instagram: 25100, linkedin: 11200, tiktok: 41000, totalReach: 92400, totalImpressions: 92400, totalEngagements: 5890, handledDms: 82, dmConversations: 82, escalationCount: 4 },
  { date: 'Aug 18', facebook: 18400, instagram: 29300, linkedin: 13400, tiktok: 52400, totalReach: 113500, totalImpressions: 113500, totalEngagements: 7420, handledDms: 112, dmConversations: 112, escalationCount: 5 },
  { date: 'Aug 23', facebook: 21000, instagram: 34200, linkedin: 15800, tiktok: 68000, totalReach: 139000, totalImpressions: 139000, totalEngagements: 9180, handledDms: 135, dmConversations: 135, escalationCount: 7 },
  { date: 'Aug 28', facebook: 24500, instagram: 41000, linkedin: 18200, tiktok: 88500, totalReach: 172200, totalImpressions: 172200, totalEngagements: 11400, handledDms: 168, dmConversations: 168, escalationCount: 8 },
  { date: 'Sep 01', facebook: 28900, instagram: 49400, linkedin: 22100, tiktok: 112000, totalReach: 212400, totalImpressions: 212400, totalEngagements: 14200, handledDms: 194, dmConversations: 194, escalationCount: 9 }
];

export const PLATFORM_PERFORMANCE: PlatformAnalytics[] = [
  {
    platform: 'tiktok',
    totalFollowers: 22400,
    followerGrowthPct: 18.4,
    totalReach: 112000,
    totalImpressions: 112000,
    engagementRate: 9.3,
    postsPublished: 16,
    dmsHandled: 640,
    avgResponseTimeMin: 0.8,
    dmEscalationRate: 4.2,
    status: 'Optimal'
  },
  {
    platform: 'instagram',
    totalFollowers: 14800,
    followerGrowthPct: 12.2,
    totalReach: 49400,
    totalImpressions: 49400,
    engagementRate: 6.4,
    postsPublished: 14,
    dmsHandled: 520,
    avgResponseTimeMin: 1.2,
    dmEscalationRate: 6.8,
    status: 'Optimal'
  },
  {
    platform: 'facebook',
    totalFollowers: 8600,
    followerGrowthPct: 6.8,
    totalReach: 28900,
    totalImpressions: 28900,
    engagementRate: 4.8,
    postsPublished: 10,
    dmsHandled: 390,
    avgResponseTimeMin: 2.1,
    dmEscalationRate: 8.5,
    status: 'Stable'
  },
  {
    platform: 'linkedin',
    totalFollowers: 6400,
    followerGrowthPct: 9.5,
    totalReach: 22100,
    totalImpressions: 22100,
    engagementRate: 5.9,
    postsPublished: 8,
    dmsHandled: 290,
    avgResponseTimeMin: 3.5,
    dmEscalationRate: 12.0,
    status: 'Action Required'
  },
  {
    platform: 'truth_social',
    totalFollowers: 1200,
    followerGrowthPct: 2.1,
    totalReach: 4200,
    totalImpressions: 4200,
    engagementRate: 2.4,
    postsPublished: 4,
    dmsHandled: 0,
    avgResponseTimeMin: 0,
    dmEscalationRate: 0,
    status: 'Manual Queue'
  }
];

export const INITIAL_PLATFORM_ANALYTICS = PLATFORM_PERFORMANCE;
export const INITIAL_TIMELINE_METRICS = TIMELINE_ANALYTICS;
export const INITIAL_BRAND_SETTINGS = INITIAL_CAMPAIGN_SETTINGS;
export const INITIAL_DM_CONVERSATIONS = INITIAL_CONVERSATIONS;
