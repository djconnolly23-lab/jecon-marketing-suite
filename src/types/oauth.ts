import { Platform } from './index';

export interface OAuthScope {
  id: string;
  name: string;
  description: string;
  required: boolean;
  granted?: boolean;
}

export interface PlatformOAuthDefinition {
  platform: Platform;
  displayName: string;
  apiName: string;
  apiVersion: string;
  authType: 'oauth2' | 'oauth2_pkce' | 'manual_queue';
  defaultScopes: OAuthScope[];
  authEndpoint?: string;
  tokenLifetimeDays?: number;
  rateLimitInfo: {
    limit: string;
    resetWindow: string;
  };
}

export interface ConnectedAccountRecord {
  id?: string;
  user_id: string;
  platform: Platform;
  account_name: string;
  account_handle: string;
  avatar_url?: string;
  access_token_masked?: string;
  token_expires_at?: string;
  scopes: string[];
  status: 'connected' | 'action_required' | 'manual_mode' | 'disconnected';
  api_version: string;
  last_synced: string;
  webhook_status?: 'active' | 'degraded' | 'inactive';
  metadata?: Record<string, any>;
}
