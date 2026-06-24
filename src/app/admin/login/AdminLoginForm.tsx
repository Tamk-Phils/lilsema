'use client';

import { FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, Lock, LogIn } from 'lucide-react';

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
        setError(data.error ?? 'Login failed.');
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
    <div className="min-h-screen bg-black flex items-center justify-center p-6 selection:bg-blue-500/30">
      <div className="w-full max-w-md">
        <div className="glass-card p-10 border-white/5">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Lock className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase">Admin Login</h1>
              <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mt-1">
                Gallery management
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="username" className="text-[10px] font-black tracking-widest text-white/30 uppercase">
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-blue-500 transition-all text-sm font-bold placeholder:text-white/10"
                placeholder="Enter username"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-[10px] font-black tracking-widest text-white/30 uppercase">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-blue-500 transition-all text-sm font-bold placeholder:text-white/10"
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs font-bold tracking-wide">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 rounded-2xl font-black tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 uppercase bg-white text-black hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" /> Sign In
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
