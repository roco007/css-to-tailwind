'use client';

import { useState } from 'react';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Simulate API registration call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1200);
  };

  return (
    <div className="w-full rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 md:p-8 shadow-sm transition-colors duration-300 relative overflow-hidden">
      {/* Decorative colored glow in bottom corner */}
      <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-blue-500/10 blur-xl"></div>
      
      {status === 'success' ? (
        <div className="flex flex-col items-center text-center py-4">
          <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-[var(--foreground)]">You&apos;re on the list!</h3>
          <p className="text-sm text-[var(--text-muted)] mt-2 max-w-md">
            Check your inbox shortly. We&apos;ve sent you the **Tailwind Spacing & Colors CSS Cheat Sheet**!
          </p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1 max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Free Download
              </span>
              <span className="text-xs text-[var(--text-muted)]">• No Spam Ever</span>
            </div>
            <h3 className="text-lg font-bold text-[var(--foreground)] md:text-xl">
              Get the Ultimate Tailwind Spacing & Color Cheat Sheet
            </h3>
            <p className="text-xs text-[var(--text-muted)] mt-1.5 leading-relaxed">
              Join 5,000+ developers receiving monthly Tailwind CSS tips, updates, components, and conversion shortcuts.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 max-w-md w-full flex flex-col sm:flex-row gap-2">
            <div className="flex-1 relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--background)] px-4 py-3 text-xs text-[var(--foreground)] placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                disabled={status === 'loading'}
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-6 py-3 transition-colors flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50"
            >
              {status === 'loading' ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                'Grab Cheat Sheet'
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
