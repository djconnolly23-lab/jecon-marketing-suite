// jecon-marketing-suite/src/components/LandingNavConfig.ts

export interface NavSubItem {
  title: string;
  description: string;
  anchor: string;
  badge?: string;
}

export interface NavMenuCategory {
  id: 'solutions' | 'features' | 'pricing' | 'resources';
  label: string;
  isDirectLink?: boolean;
  anchor?: string;
  items?: NavSubItem[];
}

export const LANDING_NAV_CONFIG: NavMenuCategory[] = [
  {
    id: 'solutions',
    label: 'Solutions',
    items: [
      {
        title: 'Travel Advisors & Hospitality',
        description: 'Transform supplier deals and itineraries into high-converting client bookings.',
        anchor: '#solutions-travel',
      },
      {
        title: 'Consultants & Service Pros',
        description: 'Establish authority on LinkedIn and Facebook without spending hours drafting.',
        anchor: '#solutions-services',
      },
      {
        title: 'E-Commerce & Digital Creators',
        description: 'Scale short-form video hooks across TikTok, Reels, and Shorts.',
        anchor: '#solutions-creators',
      },
      {
        title: 'Multi-Brand Agencies & Solo Operators',
        description: 'Coordinate distinct client campaigns and centralized DMs in one dashboard.',
        anchor: '#solutions-agencies',
      },
    ],
  },
  {
    id: 'features',
    label: 'Features',
    items: [
      {
        title: 'AI Content Studio',
        description: 'Multi-tone copywriting with verified compliance and hashtag intelligence.',
        anchor: '#feature-studio',
      },
      {
        title: 'Long-Form Blog Architect',
        description: 'Turn ideas into publication-ready SEO articles with FAQ schemas.',
        anchor: '#feature-blog',
      },
      {
        title: 'Unified Dispatch Calendar',
        description: 'Multi-platform preview cards and scheduled API queue publishing.',
        anchor: '#feature-calendar',
      },
      {
        title: 'Consolidated DM & Inquiry Hub',
        description: 'Centralized lead management so client inquiries never get lost.',
        anchor: '#feature-inbox',
      },
    ],
  },
  {
    id: 'pricing',
    label: 'Pricing',
    isDirectLink: true,
    anchor: '#pricing',
  },
  {
    id: 'resources',
    label: 'Resources',
    items: [
      {
        title: 'Content Playbooks',
        description: 'Ready-to-use weekly posting cadences for travel and B2B workflows.',
        anchor: '#resources-playbooks',
      },
      {
        title: 'API & Developer Architecture',
        description: 'Details on our TikTok, Meta Graph, and Supabase integrations.',
        anchor: '#architecture',
      },
      {
        title: 'Help Center & FAQ',
        description: 'Common questions on account permissions, data privacy, and approvals.',
        anchor: '#resources-faq',
      },
    ],
  },
];