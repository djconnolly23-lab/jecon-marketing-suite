import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Mail, ShieldCheck, Check, Search, Filter } from 'lucide-react';
import { fetchContacts, createContact, Contact } from '../lib/crmService';
import { useToast } from '../context/ToastContext';

export const ContactsView: React.FC = () => {
  const { showSuccess, showError } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    setLoading(true);
    const data = await fetchContacts();
    setContacts(data);
    setLoading(false);
  };

  const handleCreateContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const newContact = await createContact({
      email: email.trim(),
      first_name: firstName.trim() || undefined,
      last_name: lastName.trim() || undefined,
      status: 'active'
    });

    if (newContact) {
      setContacts([newContact, ...contacts]);
      setEmail('');
      setFirstName('');
      setLastName('');
      setIsAdding(false);
      showSuccess('Contact added successfully to audience list.');
    } else {
      showError('Failed to add contact. Please verify your input.');
    }
  };

  const filteredContacts = contacts.filter(c => 
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.first_name && c.first_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (c.last_name && c.last_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200">
              CRM AUDIENCE MANAGER
            </span>
            <span className="text-xs text-slate-500 font-medium">{contacts.length} Total Contacts</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">Contacts &amp; Subscriber Lists</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your mailing lists, subscriber status, and target segments.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-[#0b2545] text-white hover:bg-[#133966] transition-colors shadow-xs cursor-pointer"
        >
          <UserPlus className="w-4 h-4 text-sky-300" />
          <span>{isAdding ? 'Cancel' : 'Add Contact'}</span>
        </button>
      </div>

      {isAdding && (
        <div className="bg-white border border-sky-200 rounded-xl p-5 shadow-sm animate-fade-in space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Add New Audience Member</h3>
          <form onSubmit={handleCreateContact} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0284c7] outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Marcus"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0284c7] outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Vance"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0284c7] outline-none"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#0284c7] hover:bg-sky-600 text-white font-semibold rounded-lg text-xs transition-colors shadow-xs cursor-pointer"
              >
                Save Contact
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search contacts by name or email..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
          />
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Showing {filteredContacts.length} contacts
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
            <tr>
              <th className="py-3 px-4">Contact</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Added Date</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {loading ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-slate-400">Loading audience contacts...</td>
              </tr>
            ) : filteredContacts.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-slate-400">No contacts found. Add your first audience member above.</td>
              </tr>
            ) : (
              filteredContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">
                      {contact.first_name || contact.last_name ? `${contact.first_name || ''} ${contact.last_name || ''}` : 'Unnamed Subscriber'}
                    </div>
                    <div className="text-slate-500 font-mono text-[11px]">{contact.email}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                      contact.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                      contact.status === 'unsubscribed' ? 'bg-amber-100 text-amber-800' :
                      'bg-rose-100 text-rose-800'
                    }`}>
                      {contact.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                    {new Date(contact.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button 
                      onClick={() => alert(`View details for ${contact.email}`)}
                      className="text-xs font-semibold text-[#0284c7] hover:underline cursor-pointer"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ContactsView;