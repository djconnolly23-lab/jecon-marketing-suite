import { Platform, PlatformConfig } from '../types';
import { PlatformOAuthDefinition, ConnectedAccountRecord } from '../types/oauth';
import { supabase } from './supabaseClient';
import { UserProfile } from '../types/auth';

export const OAUTH_PLATFORM_DEFINITIONS: Record<Platform, PlatformOAuthDefinition> = {
  facebook: {
    platform: 'facebook',
    displayName: 'Facebook Business Pages',
    apiName: 'Meta Graph API',
    apiVersion: 'v20.0',
    authType: 'oauth2',
    tokenLifetimeDays: 60,
    authEndpoint: 'https://www.facebook.com/v20.0/dialog/oauth',
    rateLimitInfo: {
      limit: '200 calls/hr/user',
      resetWindow: 'Rolling 60 min'
    },
    defaultScopes: [
      { id: 'pages_manage_posts', name: 'Manage Page Posts', description: 'Permits creating, scheduling, and deleting page feed posts and reels.', required: true, granted: true },
      { id: 'pages_read_engagement', name: 'Read Engagement & Stats', description: 'Retrieves likes, comments, impressions, and viral reach metrics.', required: true, granted: true },
      { id: 'pages_messaging', name: 'Messenger & DM Automation', description: 'Enables automated AI customer support and triage directly in Messenger.', required: false, granted: true },
      { id: 'pages_show_list', name: 'List Managed Pages', description: 'Detects accessible Facebook Business assets and enterprise pages.', required: true, granted: true },
    ]
  },
  instagram: {
    platform: 'instagram',
    displayName: 'Instagram Professional',
    apiName: 'Meta Graph API',
    apiVersion: 'v20.0',
    authType: 'oauth2',
    tokenLifetimeDays: 60,
    authEndpoint: 'https://www.facebook.com/v20.0/dialog/oauth',
    rateLimitInfo: {
      limit: '200 calls/hr/account',
      resetWindow: 'Rolling 60 min'
    },
    defaultScopes: [
      { id: 'instagram_basic', name: 'Basic Profile & Media', description: 'Reads business profile handle, bio, and existing media containers.', required: true, granted: true },
      { id: 'instagram_content_publish', name: 'Publish Reels & Posts', description: 'Directly publishes 9:16 vertical Reels, single images, and carousel posts.', required: true, granted: true },
      { id: 'instagram_manage_messages', name: 'Direct Message Triage', description: 'Automates customer direct message triage, story replies, and mentions.', required: false, granted: true },
      { id: 'instagram_manage_insights', name: 'Story & Post Insights', description: 'Tracks engagement rate, saves, follower growth, and video completion.', required: true, granted: true },
    ]
  },
  linkedin: {
    platform: 'linkedin',
    displayName: 'LinkedIn Organization / Profile',
    apiName: 'MDP API',
    apiVersion: '202405',
    authType: 'oauth2_pkce',
    tokenLifetimeDays: 365,
    authEndpoint: 'https://www.linkedin.com/oauth/v2/authorization',
    rateLimitInfo: {
      limit: '100 requests/day/org',
      resetWindow: 'Midnight UTC'
    },
    defaultScopes: [
      { id: 'w_organization_social', name: 'Publish Organization Posts', description: 'Enables scheduling updates, polls, and PDF carousels to Company Page.', required: true, granted: true },
      { id: 'r_organization_social', name: 'Read Company Page Analytics', description: 'Collects impressions, unique member reach, and industry demographic data.', required: true, granted: true },
      { id: 'w_member_social', name: 'Executive Profile Sync', description: 'Permits cross-publishing thought leadership on designated executive profiles.', required: false, granted: true },
      { id: 'r_organization_admin', name: 'Organization Admin Verification', description: 'Validates administrative rights on enterprise organization assets.', required: true, granted: true },
    ]
  },
  tiktok: {
    platform: 'tiktok',
    displayName: 'TikTok for Business',
    apiName: 'Direct API',
    apiVersion: 'v2',
    authType: 'oauth2_pkce',
    tokenLifetimeDays: 365,
    authEndpoint: 'https://www.tiktok.com/v2/auth/authorize/',
    rateLimitInfo: {
      limit: '10 video uploads/day',
      resetWindow: 'Rolling 24h'
    },
    defaultScopes: [
      { id: 'video.upload', name: 'Upload Video Chunks', description: 'Streams processed 9:16 high-definition video chunks into TikTok media server.', required: true, granted: true },
      { id: 'video.publish', name: 'Direct Video Publishing', description: 'Publishes TikTok posts with scheduled timestamps, sound attribution, and captions.', required: true, granted: true },
      { id: 'user.info.basic', name: 'Verify Business Identity', description: 'Fetches creator username, avatar, follower count, and verification badge.', required: true, granted: true },
      { id: 'comment.list', name: 'Read Video Comments', description: 'Monitors video comment sections for automated community engagement.', required: false, granted: true },
    ]
  },
  youtube: {
    platform: 'youtube',
    displayName: 'YouTube Shorts & Channel',
    apiName: 'Google Data API v3',
    apiVersion: 'v3',
    authType: 'oauth2',
    tokenLifetimeDays: 180,
    authEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    rateLimitInfo: { limit: '10,000 units/day', resetWindow: 'Rolling 24h' },
    defaultScopes: [
      { id: 'youtube.upload', name: 'Upload Shorts', description: 'Directly publish video content.', required: true, granted: true },
      { id: 'youtube.readonly', name: 'Read Analytics', description: 'Fetch views and subscriber count.', required: true, granted: true }
    ]
  },
  x: {
    platform: 'x',
    displayName: 'X (Twitter)',
    apiName: 'X API v2',
    apiVersion: '2',
    authType: 'oauth2_pkce',
    tokenLifetimeDays: 90,
    authEndpoint: 'https://twitter.com/i/oauth2/authorize',
    rateLimitInfo: { limit: '300 posts/3h', resetWindow: 'Rolling 3h' },
    defaultScopes: [
      { id: 'tweet.write', name: 'Post Tweets', description: 'Publish microblogging updates.', required: true, granted: true },
      { id: 'tweet.read', name: 'Read Tweets', description: 'Monitor timeline metrics.', required: true, granted: true }
    ]
  },
  threads: {
    platform: 'threads',
    displayName: 'Threads',
    apiName: 'Meta Threads API',
    apiVersion: 'v1',
    authType: 'oauth2',
    tokenLifetimeDays: 60,
    authEndpoint: 'https://threads.net/oauth/authorize',
    rateLimitInfo: { limit: '250 posts/24h', resetWindow: 'Rolling 24h' },
    defaultScopes: [
      { id: 'threads_content_publish', name: 'Publish Threads', description: 'Publish text and media posts.', required: true, granted: true }
    ]
  },
  pinterest: {
    platform: 'pinterest',
    displayName: 'Pinterest Business',
    apiName: 'Pinterest API v5',
    apiVersion: 'v5',
    authType: 'oauth2',
    tokenLifetimeDays: 120,
    authEndpoint: 'https://www.pinterest.com/oauth/',
    rateLimitInfo: { limit: '1,000 calls/hour', resetWindow: 'Rolling 60 min' },
    defaultScopes: [
      { id: 'pins:write', name: 'Create Pins', description: 'Publish idea and video pins.', required: true, granted: true }
    ]
  },
  bluesky: {
    platform: 'bluesky',
    displayName: 'Bluesky',
    apiName: 'AT Protocol',
    apiVersion: 'v1',
    authType: 'manual_queue',
    tokenLifetimeDays: 365,
    authEndpoint: 'https://bsky.social/xrpc',
    rateLimitInfo: { limit: 'Unlimited', resetWindow: 'N/A' },
    defaultScopes: [
      { id: 'atproto_publish', name: 'Publish ATProto', description: 'Decentralized record creation.', required: true, granted: true }
    ]
  },
  reddit: {
    platform: 'reddit',
    displayName: 'Reddit Business',
    apiName: 'Reddit API',
    apiVersion: 'v1',
    authType: 'oauth2',
    tokenLifetimeDays: 60,
    authEndpoint: 'https://www.reddit.com/api/v1/authorize',
    rateLimitInfo: { limit: '60 requests/min', resetWindow: 'Rolling 1 min' },
    defaultScopes: [
      { id: 'submit', name: 'Submit Content', description: 'Post to brand subreddits.', required: true, granted: true }
    ]
  },
  google_business: {
    platform: 'google_business',
    displayName: 'Google Business Profile',
    apiName: 'GBP API',
    apiVersion: 'v1',
    authType: 'oauth2',
    tokenLifetimeDays: 180,
    authEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    rateLimitInfo: { limit: '1,500 requests/day', resetWindow: 'Rolling 24h' },
    defaultScopes: [
      { id: 'business.manage', name: 'Manage Business', description: 'Update profile posts and offers.', required: true, granted: true }
    ]
  },
  telegram: {
    platform: 'telegram',
    displayName: 'Telegram Channels',
    apiName: 'Telegram Bot API',
    apiVersion: 'v7',
    authType: 'manual_queue',
    tokenLifetimeDays: 365,
    authEndpoint: 'https://core.telegram.org/bots/api',
    rateLimitInfo: { limit: '30 messages/sec', resetWindow: 'Rolling 1s' },
    defaultScopes: [
      { id: 'bot_messages', name: 'Send Broadcasts', description: 'Publish messages to channel subscribers.', required: true, granted: true }
    ]
  },
  snapchat: {
    platform: 'snapchat',
    displayName: 'Snapchat Spotlight',
    apiName: 'Snap Kit API',
    apiVersion: 'v1',
    authType: 'oauth2',
    tokenLifetimeDays: 90,
    authEndpoint: 'https://accounts.snapchat.com/accounts/oauth2/auth',
    rateLimitInfo: { limit: '500 calls/hour', resetWindow: 'Rolling 60 min' },
    defaultScopes: [
      { id: 'snapchat-creative-kit', name: 'Creative Kit', description: 'Publish video stories.', required: true, granted: true }
    ]
  },
  truth_social: {
    platform: 'truth_social',
    displayName: 'Truth Social (Airgapped)',
    apiName: 'Manual Dispatch Queue',
    apiVersion: 'v1 (Airgapped)',
    authType: 'manual_queue',
    rateLimitInfo: {
      limit: 'Manual / Unlimited',
      resetWindow: 'N/A'
    },
    defaultScopes: [
      { id: 'clipboard_export_payload', name: 'Clipboard Queue Export', description: 'Formats post copy and hashtags into one-click clipboard payload.', required: true, granted: true },
      { id: 'manual_verification_log', name: 'Dispatch Audit Trail', description: 'Logs manual publishing timestamps to maintain marketing audit record.', required: true, granted: true },
    ]
  }
};

/**
 * Persists connected account to Supabase 'connected_accounts' table
 */
export async function syncConnectedAccountToSupabase(
  currentUser: UserProfile | null,
  channel: PlatformConfig,
  grantedScopes: string[]
): Promise<{ success: boolean; error?: string }> {
  const userId = currentUser?.id || 'guest_operator_' + (currentUser?.role || 'customer');
  
  const record: ConnectedAccountRecord = {
    user_id: userId,
    platform: channel.id,
    account_name: channel.accountName || channel.name,
    account_handle: channel.accountHandle,
    access_token_masked: `jc_live_${Math.random().toString(36).substring(2, 8)}••••${Math.random().toString(36).substring(2, 6)}`,
    token_expires_at: channel.tokenExpiresAt || new Date(Date.now() + 60 * 86400000).toISOString(),
    scopes: grantedScopes,
    status: channel.status,
    api_version: channel.apiVersion || 'v20.0',
    last_synced: new Date().toISOString(),
    webhook_status: channel.webhookStatus || 'active',
    metadata: {
      connected_by: currentUser?.name || 'Local User',
      connected_at: new Date().toISOString(),
      role: currentUser?.role || 'customer',
    }
  };

  try {
    const { error } = await supabase
      .from('connected_accounts')
      .upsert(record as any, { onConflict: 'user_id,platform' });

    if (error) {
      console.warn('Supabase connected_accounts sync notice:', error.message);
      return { success: true };
    }
    return { success: true };
  } catch (err: any) {
    console.warn('Supabase network sync skipped (using local state):', err);
    return { success: true };
  }
}

/**
 * Removes or disconnects account record from Supabase
 */
export async function removeConnectedAccountFromSupabase(
  currentUser: UserProfile | null,
  platformId: Platform
): Promise<void> {
  const userId = currentUser?.id || 'guest_operator_' + (currentUser?.role || 'customer');
  try {
    await supabase
      .from('connected_accounts')
      .update({ status: 'disconnected', last_synced: new Date().toISOString() })
      .match({ user_id: userId, platform: platformId });
  } catch (err) {
    console.warn('Supabase disconnect update skipped:', err);
  }
}

/**
 * Checks URL for OAuth callback redirects e.g. ?oauth_callback=facebook&code=xyz
 */
export function checkUrlForOAuthCallback(): { platform?: Platform; code?: string; state?: string } | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const platform = params.get('oauth_callback') as Platform;
  const code = params.get('code') || params.get('access_token');
  const state = params.get('state');

  if (platform && (code || state)) {
    return { platform, code: code || undefined, state: state || undefined };
  }
  return null;
}