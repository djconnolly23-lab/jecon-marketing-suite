import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { UserProfile, UserRole } from '../types/auth';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://vyxqzjvdymvnhrqxctgc.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

if (!isSupabaseConfigured) {
  // Previously this failed silently: the client fell back to a fake key and
  // every auth/data call surfaced as a generic, hard-to-debug network error.
  console.error(
    '[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. ' +
    'Auth and data features will not work until these are set in your environment.'
  );
}

// Initialize Supabase Client
export const supabase: SupabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY || 'placeholder-anon-key'
);

/**
 * Transforms a Supabase Auth User object into the application's UserProfile model
 */
export function mapSupabaseUserToProfile(user: User): UserProfile {
  const metadata = user.user_metadata || {};
  const role: UserRole = (metadata.role as UserRole) || 'customer';
  
  const displayName = 
    metadata.full_name || 
    metadata.name || 
    user.email?.split('@')[0] || 
    (role === 'employee' ? 'Staff Operator' : 'Client Account');

  return {
    id: user.id,
    name: displayName,
    email: user.email || '',
    role,
    avatarUrl: metadata.avatar_url || metadata.picture,
    companyName: role === 'customer' ? metadata.company_name : undefined,
    department: role === 'employee' ? metadata.department : undefined,
  };
}
