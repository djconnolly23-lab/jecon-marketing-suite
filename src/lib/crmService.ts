import { supabase } from './supabaseClient';

export interface Contact {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  status: 'active' | 'unsubscribed' | 'bounced';
  metadata?: Record<string, any>;
  created_at: string;
}

export interface ContactList {
  id: string;
  name: string;
  description?: string;
  created_at: string;
}

export async function fetchContacts(): Promise<Contact[]> {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.warn('Failed to fetch contacts from Supabase, using local fallback:', err);
    return [];
  }
}

export async function createContact(contact: {
  email: string;
  first_name?: string;
  last_name?: string;
  status?: 'active' | 'unsubscribed' | 'bounced';
}): Promise<Contact | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user found');

    const { data, error } = await supabase
      .from('contacts')
      .insert({
        user_id: user.id,
        email: contact.email,
        first_name: contact.first_name,
        last_name: contact.last_name,
        status: contact.status || 'active'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error creating contact:', err);
    return null;
  }
}

export async function fetchContactLists(): Promise<ContactList[]> {
  try {
    const { data, error } = await supabase
      .from('contact_lists')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.warn('Failed to fetch lists:', err);
    return [];
  }
}