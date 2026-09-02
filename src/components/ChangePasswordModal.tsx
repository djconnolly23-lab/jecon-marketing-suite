import React, { useState } from 'react';
import { Lock, Check, X, ShieldAlert, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (newPassword !== confirmPassword) {
      setStatus('error');
      setErrorMessage('New passwords do not match.');
      return;
    }

    if (newPassword.length < 8) {
      setStatus('error');
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    setStatus('loading');

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        throw error;
      }

      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        onClose();
      }, 1500);
    } catch (err: any) {
      console.error('Password change error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Failed to update password. Please check your session.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#0284c7]" />
            <span>Update Password</span>
          </h3>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleUpdate} className="space-y-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">Current Password (optional confirmation)</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-[#0284c7] outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">New Password (min. 8 chars)</label>
            <input
              type="password"
              required
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-[#0284c7] outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-[#0284c7] outline-none"
            />
          </div>

          {status === 'error' && (
            <div className="p-2 bg-rose-50 border border-rose-200 text-rose-800 text-[11px] rounded flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0" />
              <span>{errorMessage || 'Passwords must match and be at least 8 characters.'}</span>
            </div>
          )}

          {status === 'success' && (
            <div className="p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] rounded flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Password successfully updated!</span>
            </div>
          )}

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              disabled={status === 'loading'}
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-md transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-[#0b2545] hover:bg-[#133966] rounded-md transition flex items-center gap-1 cursor-pointer disabled:opacity-60"
            >
              {status === 'loading' && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {status === 'success' && <Check className="w-3.5 h-3.5" />}
              <span>{status === 'success' ? 'Updated!' : 'Save Password'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
