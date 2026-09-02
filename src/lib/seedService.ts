import { PostDraft, CustomerConversation, CampaignSettings, PlatformConfig } from '../types';
import { INITIAL_CAMPAIGN_SETTINGS, PLATFORM_REGISTRY } from '../data/initialData';
import { MASTER_SUPPLIER_CAMPAIGNS } from '../data/supplierCampaigns';

// 1. Exactly 3 sample posts (1 Scheduled Reel, 1 Published Post, 1 Draft Carousel)
export const SEED_POSTS: PostDraft[] = [
  {
    id: 'post-seed-001',
    platform: 'instagram',
    title: '3 Daily Habits of High-Growth Enterprise Operators',
    mediaType: 'reel',
    hook: 'The difference between teams that plateau and those that scale 10x is disciplined execution.',
    bodyCopy: `Here is the framework top enterprise operators use:\n\n1. Deep Focus Block 08:00-10:00 (Zero notifications)\n2. High-Leverage Decision Protocol (Delegate tier-2 choices)\n3. 15-minute daily operational sync with department heads\n\nComment "GROWTH" below to receive our Q3 Executive Briefing.`,
    callToAction: 'Comment "GROWTH" or click link in bio for the full briefing.',
    hashtags: ['#Leadership', '#ScaleUp', '#Productivity', '#B2BStrategy', '#JECON'],
    visualPromptSuggestion: 'Crisp 9:16 vertical video with kinetic typography and executive boardroom overlay.',
    aspectRatio: '9:16',
    status: 'scheduled',
    scheduledTime: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
    ftcDisclosures: {
      hasSponsoredContent: false,
      hasProperTags: true,
      complianceNotes: 'Organic leadership and operational framework.'
    },
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'post-seed-002',
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
    scheduledTime: new Date(Date.now() - 86400000 * 3).toISOString(),
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
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString()
  },
  {
    id: 'post-seed-003',
    platform: 'linkedin',
    title: 'Enterprise Delivery Playbook: Scaling Cross-Functional Teams',
    mediaType: 'carousel',
    hook: 'How one tier-1 operations team reduced cycle time from 4 hours to 90 seconds.',
    bodyCopy: `By centralizing customer engagement workflows and deploying automated triage, high-velocity teams achieve 4x inbound volume while increasing customer satisfaction to 98.4%.\n\nSwipe through the 5-slide breakdown to view the organizational chart and deployment checklist.`,
    callToAction: 'Download the complete PDF framework slide deck at jecon.io/frameworks.',
    hashtags: ['#Operations', '#ScaleUp', '#EnterpriseLeadership', '#B2BStrategy', '#JECON'],
    visualPromptSuggestion: 'Clean 1:1 square document carousel layout with navy and sky-blue data charts.',
    aspectRatio: '1:1',
    status: 'draft',
    ftcDisclosures: {
      hasSponsoredContent: false,
      hasProperTags: true,
      complianceNotes: 'Draft carousel presentation awaiting final team review.'
    },
    createdAt: new Date().toISOString()
  }
];

// 2. Exactly 2 simulated customer DM threads (1 handled by AI, 1 requiring human review)
export const SEED_CONVERSATIONS: CustomerConversation[] = [
  {
    id: 'conv-seed-001',
    platform: 'instagram',
    customerName: 'Elena Rostova',
    customerHandle: '@elena_exec',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    status: 'bot_handled',
    sentiment: 'positive',
    urgency: 'low',
    category: 'Masterclass Cohort Access',
    lastUpdated: '15m ago',
    windowExpiresAt: new Date(Date.now() + 23 * 3600000).toISOString(),
    receivedAt: '09:42 AM',
    suggestedReply: 'Thanks Elena! The registration confirmation has been sent to your inbox.',
    messages: [
      {
        id: 'm-seed-1',
        sender: 'customer',
        text: 'Hi JECON team, where can I register for tomorrow\'s live executive masterclass cohort?',
        timestamp: '09:42 AM'
      },
      {
        id: 'm-seed-2',
        sender: 'bot',
        text: 'Hi Elena! Thanks for reaching out to JECON LLC. Here is your direct VIP access link: https://jecon.com/q3-masterclass. Let us know if you need anything else!',
        timestamp: '09:42 AM'
      },
      {
        id: 'm-seed-3',
        sender: 'customer',
        text: 'Got it, confirmed my seat. Thank you for the quick link!',
        timestamp: '09:45 AM'
      }
    ]
  },
  {
    id: 'conv-seed-002',
    platform: 'facebook',
    customerName: 'Marcus Vance',
    customerHandle: 'Marcus Vance (VP Operations)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'action_needed',
    sentiment: 'urgent',
    urgency: 'high',
    category: 'Enterprise Licensing (40 Seats)',
    lastUpdated: '5m ago',
    windowExpiresAt: new Date(Date.now() + 23 * 3600000 + 45 * 60000).toISOString(),
    receivedAt: '10:14 AM',
    suggestedReply: 'Hello Marcus! We would be delighted to prepare a custom multi-seat proposal for your 40-person team. What is the best email to send the briefing to?',
    messages: [
      {
        id: 'm-seed-4',
        sender: 'customer',
        text: 'Hello JECON team, we are scaling our leadership cohort to 40 directors in Q4. Can someone prepare an enterprise multi-seat proposal with custom invoice terms today?',
        timestamp: '10:14 AM'
      },
      {
        id: 'm-seed-5',
        sender: 'bot',
        text: 'Thank you for reaching out to JECON LLC! Your request has been flagged as high priority and routed to our executive solutions desk for immediate review.',
        timestamp: '10:15 AM'
      }
    ]
  }
];

const LOCAL_STORAGE_POSTS = 'jecon_post_drafts';
const LOCAL_STORAGE_INBOX = 'jecon_dm_conversations';
const LOCAL_STORAGE_SETTINGS = 'jecon_campaign_settings';
const LOCAL_STORAGE_CHANNELS = 'jecon_channels';

/**
 * Checks if local storage or database state is empty
 */
export function isWorkspaceEmpty(): boolean {
  const postsRaw = localStorage.getItem(LOCAL_STORAGE_POSTS);
  const inboxRaw = localStorage.getItem(LOCAL_STORAGE_INBOX);

  if (!postsRaw || !inboxRaw) return true;

  try {
    const posts = JSON.parse(postsRaw);
    const inbox = JSON.parse(inboxRaw);
    return !Array.isArray(posts) || posts.length === 0 || !Array.isArray(inbox) || inbox.length === 0;
  } catch {
    return true;
  }
}

/**
 * Seeds the demo state into localStorage and returns seeded entities
 */
export function seedDemoWorkspace(): {
  posts: PostDraft[];
  conversations: CustomerConversation[];
  settings: CampaignSettings;
  channels: PlatformConfig[];
} {
  localStorage.setItem(LOCAL_STORAGE_POSTS, JSON.stringify(SEED_POSTS));
  localStorage.setItem(LOCAL_STORAGE_INBOX, JSON.stringify(SEED_CONVERSATIONS));
  localStorage.setItem(LOCAL_STORAGE_SETTINGS, JSON.stringify(INITIAL_CAMPAIGN_SETTINGS));
  localStorage.setItem(LOCAL_STORAGE_CHANNELS, JSON.stringify(PLATFORM_REGISTRY));

  return {
    posts: SEED_POSTS,
    conversations: SEED_CONVERSATIONS,
    settings: INITIAL_CAMPAIGN_SETTINGS,
    channels: PLATFORM_REGISTRY
  };
}
