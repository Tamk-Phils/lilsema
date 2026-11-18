'use client';

import { FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Lock, LogIn, Loader2, ArrowLeft } from 'lucide-react';
import Logo from '@/components/Logo';

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Login failed. Invalid credentials.');
        return;
      }

      const from = searchParams.get('from') || '/admin';
      router.push(from);
      router.refresh();
    } catch {
      setError('Could not reach the server. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 selection:bg-blue-500/20">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 hover:text-blue-600 transition-colors uppercase"
          >
            <ArrowLeft className="w-4 h-4" /> Back to website
          </Link>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/60">
          <div className="flex flex-col items-center gap-3 mb-8">
            <Logo className="w-12 h-12" textClassName="text-xl" />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black tracking-widest uppercase border border-blue-200">
              <Lock className="w-3 h-3" />
              Admin Portal
            </div>
            <p className="text-slate-500 text-xs text-center font-medium mt-1">
              Sign in to manage photography &amp; videography media
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="username" className="text-[10px] font-black tracking-widest text-slate-700 uppercase">
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-sm font-bold text-slate-900 placeholder:text-slate-400"
                placeholder="Enter admin username"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-[10px] font-black tracking-widest text-slate-700 uppercase">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-sm font-bold text-slate-900 placeholder:text-slate-400"
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-xs font-bold text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-black tracking-widest text-xs transition-all flex items-center justify-center gap-2 uppercase bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/25 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" /> Sign In to Portal
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
