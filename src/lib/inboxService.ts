import { CustomerConversation, DmMessage, Platform } from '../types';
import { supabase } from './supabaseClient';
import { INITIAL_CONVERSATIONS } from '../data/initialData';

const LOCAL_STORAGE_INBOX_KEY = 'jecon_inbox_conversations';

/**
 * Loads inbox conversations from Supabase 'inbox_conversations' with fallback to localStorage / initial data.
 */
export async function fetchInboxConversations(): Promise<CustomerConversation[]> {
  try {
    const { data, error } = await supabase
      .from('inbox_conversations')
      .select('*')
      .order('last_updated', { ascending: false });

    if (error || !data || data.length === 0) {
      const saved = localStorage.getItem(LOCAL_STORAGE_INBOX_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return INITIAL_CONVERSATIONS;
        }
      }
      return INITIAL_CONVERSATIONS;
    }

    // Map Supabase snake_case fields to CustomerConversation if needed
    return data.map((item: any) => ({
      id: item.id,
      platform: item.platform,
      customerName: item.customer_name || item.customerName,
      customerHandle: item.customer_handle || item.customerHandle,
      avatar: item.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60',
      status: item.status || 'action_needed',
      sentiment: item.sentiment || 'neutral',
      urgency: item.urgency || 'medium',
      category: item.category || 'General Inquiry',
      messages: item.messages || [],
      lastUpdated: item.last_updated || item.lastUpdated || 'Just now',
      suggestedReply: item.suggested_reply || item.suggestedReply,
      windowExpiresAt: item.window_expires_at || item.windowExpiresAt || new Date(Date.now() + 23 * 3600000).toISOString(),
      metadata: item.metadata || {}
    }));
  } catch (err) {
    console.warn('Supabase fetch notice, loading cached conversations:', err);
    const saved = localStorage.getItem(LOCAL_STORAGE_INBOX_KEY);
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  }
}

/**
 * Saves or updates a conversation in Supabase and syncs to localStorage
 */
export async function saveConversationToSupabase(
  conv: CustomerConversation,
  allConversations: CustomerConversation[]
): Promise<void> {
  // Sync to localStorage
  const updatedList = allConversations.map(c => c.id === conv.id ? conv : c);
  localStorage.setItem(LOCAL_STORAGE_INBOX_KEY, JSON.stringify(updatedList));

  try {
    const record = {
      id: conv.id,
      platform: conv.platform,
      customer_name: conv.customerName,
      customer_handle: conv.customerHandle,
      avatar: conv.avatar,
      status: conv.status,
      sentiment: conv.sentiment,
      urgency: conv.urgency,
      category: conv.category,
      messages: conv.messages,
      last_updated: new Date().toISOString(),
      suggested_reply: conv.suggestedReply,
      window_expires_at: conv.windowExpiresAt,
      metadata: conv.metadata || {}
    };

    const { error } = await supabase
      .from('inbox_conversations')
      .upsert(record as any, { onConflict: 'id' });

    if (error) {
      console.warn('Supabase sync notice (using local state):', error.message);
    }
  } catch (err) {
    console.warn('Supabase sync skipped:', err);
  }
}

/**
 * Fetches AI suggested reply and triage analysis for a conversation
 */
export async function getAiDmSuggestion(
  customerMessage: string,
  platform: Platform,
  brandName: string = 'JECON LLC'
): Promise<{
  action: 'bot_handled' | 'action_needed';
  sentiment: 'positive' | 'neutral' | 'urgent' | 'question' | 'frustrated';
  urgency: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  suggestedReply: string;
}> {
  try {
    const res = await fetch('/api/gemini/dm-suggest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerMessage,
        platform,
        brandName
      })
    });

    if (res.ok) {
      const data = await res.json();
      return {
        action: data.action === 'bot_handled' ? 'bot_handled' : 'action_needed',
        sentiment: data.sentiment || 'neutral',
        urgency: data.urgency || 'medium',
        category: data.category || 'Customer Inquiry',
        suggestedReply: data.suggestedReply || 'Thank you for reaching out to JECON LLC. How can our team best assist you today?'
      };
    }
  } catch (err) {
    console.warn('Gemini DM suggestion endpoint error, falling back:', err);
  }

  // Smart heuristic fallback
  const lower = customerMessage.toLowerCase();
  const isAngry = lower.includes('refund') || lower.includes('charged') || lower.includes('broken') || lower.includes('error') || lower.includes('issue') || lower.includes('problem');
  const isEnterprise = lower.includes('enterprise') || lower.includes('pricing') || lower.includes('demo') || lower.includes('team') || lower.includes('quote');

  if (isAngry) {
    return {
      action: 'action_needed',
      sentiment: 'frustrated',
      urgency: 'high',
      category: 'Billing & Support',
      suggestedReply: `Hi! We deeply apologize for the inconvenience. I'm prioritizing your case right now—could you please confirm your account email so I can resolve this immediately?`
    };
  }

  if (isEnterprise) {
    return {
      action: 'action_needed',
      sentiment: 'positive',
      urgency: 'medium',
      category: 'Enterprise Sales',
      suggestedReply: `Hello! We'd love to partner with your team. I can share our enterprise executive briefing deck or set up a tailored walkthrough with our leadership team. What is the best email to reach you?`
    };
  }

  return {
    action: 'bot_handled',
    sentiment: 'neutral',
    urgency: 'low',
    category: 'General FAQ',
    suggestedReply: `Thanks for contacting JECON! You can access all our latest frameworks, masterclass links, and case studies at jecon.io/resources.`
  };
}

/**
 * Creates a simulated inbound DM from Facebook, Instagram, or TikTok
 */
export async function simulateInboundDm(
  platform: Platform,
  existingList: CustomerConversation[]
): Promise<CustomerConversation> {
  const sampleInquiries = [
    {
      name: 'Elena Rostova',
      handle: '@elena_exec',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=60',
      text: 'Hi JECON team, we are scaling our leadership cohort to 40 directors in Q4. Do you offer enterprise licensing for the Masterclass series?',
      category: 'Enterprise Sales',
      sentiment: 'positive' as const,
      urgency: 'medium' as const,
      status: 'action_needed' as const,
      suggestedReply: 'Hello Elena! Yes, we offer enterprise cohort licensing with custom leadership workshops. Would you like to review our Q4 executive syllabus?'
    },
    {
      name: 'Marcus Vance',
      handle: '@marcus_vance',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60',
      text: 'I submitted my registration for tomorrow\'s live Masterclass but have not received the calendar invite link yet. Can someone verify my email?',
      category: 'Masterclass Support',
      sentiment: 'urgent' as const,
      urgency: 'high' as const,
      status: 'action_needed' as const,
      suggestedReply: 'Hi Marcus, let me pull up your registration record right away. Could you confirm the email address you used to register?'
    },
    {
      name: 'Sophia Sterling',
      handle: '@sophiasterling_ai',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60',
      text: 'Loved the carousel post about decentralized team scaling! Where can I download the high-res PDF framework diagram?',
      category: 'Content Inquiry',
      sentiment: 'positive' as const,
      urgency: 'low' as const,
      status: 'bot_handled' as const,
      suggestedReply: 'Hi Sophia! Thank you! You can download the full high-resolution PDF framework directly from our resource portal at jecon.io/frameworks.'
    },
    {
      name: 'David Chen',
      handle: '@dchen_tech',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60',
      text: 'My credit card was charged twice for the quarterly executive pass. Please refund the duplicate transaction ASAP.',
      category: 'Billing / Dispute',
      sentiment: 'frustrated' as const,
      urgency: 'critical' as const,
      status: 'action_needed' as const,
      suggestedReply: 'Hi David, I sincerely apologize for the duplicate charge. I have initiated an immediate review with our billing desk to process your refund right away.'
    }
  ];

  const randomSample = sampleInquiries[Math.floor(Math.random() * sampleInquiries.length)];
  const newId = `conv-sim-${Date.now()}`;
  
  const now = new Date();
  const windowExpiry = new Date(now.getTime() + 24 * 3600000).toISOString();

  const newConv: CustomerConversation = {
    id: newId,
    platform: platform,
    customerName: randomSample.name,
    customerHandle: randomSample.handle,
    avatar: randomSample.avatar,
    status: randomSample.status,
    sentiment: randomSample.sentiment,
    urgency: randomSample.urgency,
    category: randomSample.category,
    messages: [
      {
        id: `msg-${Date.now()}`,
        sender: 'customer',
        text: randomSample.text,
        timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ],
    lastUpdated: 'Just now',
    suggestedReply: randomSample.suggestedReply,
    windowExpiresAt: windowExpiry,
    receivedAt: now.toISOString()
  };

  await saveConversationToSupabase(newConv, [newConv, ...existingList]);
  return newConv;
}
