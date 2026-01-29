import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register as registerApi } from '../services/auth';
import { useAuth } from '../context/AuthContext';

function SocialButton({ icon, label }) {
  return (
    <button
      type="button"
      className="w-full h-10 rounded-md border border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const data = await registerApi({ username, email, password });
      login({ token: data.token, user: data.user });
      navigate('/courses', { replace: true });
    } catch (err) {
      const msg = err?.response?.data?.message || 'Unable to create account. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 sm:py-16 flex justify-center">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl shadow-card p-7 sm:p-8">
            <div className="text-center">
              <div className="text-xl font-semibold text-slate-900">Create an account</div>
              <div className="mt-1 text-xs text-slate-500">Start your coding journey with CodeFlow today</div>
            </div>

            <form onSubmit={onSubmit} className="mt-7 space-y-4">
              {error ? (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</div>
              ) : null}

              <div>
                <label className="block text-xs font-medium text-slate-700">Username</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="johndoe"
                  className="mt-2 w-full h-10 rounded-md border border-slate-200 px-3 text-sm outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-300"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700">Email address</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="john@example.com"
                  className="mt-2 w-full h-10 rounded-md border border-slate-200 px-3 text-sm outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-300"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  className="mt-2 w-full h-10 rounded-md border border-slate-200 px-3 text-sm outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-300"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700">Confirm Password</label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  className="mt-2 w-full h-10 rounded-md border border-slate-200 px-3 text-sm outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-300"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-10 rounded-md bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors disabled:opacity-60"
              >
                {loading ? 'Creating...' : 'Create account'}
              </button>

              <div className="flex items-center gap-3 pt-2">
                <div className="h-px bg-slate-200 flex-1" />
                <div className="text-[11px] text-slate-400">Or continue with</div>
                <div className="h-px bg-slate-200 flex-1" />
              </div>

              <div className="space-y-2">
                <SocialButton
                  label="Continue with Google"
                  icon={
                    <span className="w-3.5 h-3.5 inline-flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.35 11.1H12v2.9h5.35c-.55 2.8-3.35 4.6-6.2 3.9-2.7-.65-4.5-3.35-3.9-6.1.55-2.8 3.35-4.6 6.2-3.9 1.3.3 2.3 1 3 1.8l2.1-2.1C16.7 5 14.6 4 12 4 7.6 4 4 7.6 4 12s3.6 8 8 8c4.6 0 8-3.2 8-8 0-.55-.05-1.05-.15-1.9Z" fill="#475569" />
                      </svg>
                    </span>
                  }
                />
                <SocialButton
                  label="Continue with GitHub"
                  icon={
                    <span className="w-3.5 h-3.5 inline-flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.9 9.6.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.6-1.1-1.6-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.5 1.1 3.1.9.1-.7.4-1.1.7-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.2-.4-1.2.1-2.6 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.4-.3.8 0 1.6.1 2.4.3 1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.6.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 4-1.3 6.9-5.1 6.9-9.6C22 6.6 17.5 2 12 2Z" fill="#475569" />
                      </svg>
                    </span>
                  }
                />
                <SocialButton
                  label="Continue with other email"
                  icon={
                    <span className="w-3.5 h-3.5 inline-flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6h16v12H4V6Z" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="m4 7 8 6 8-6" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  }
                />
              </div>

              <div className="pt-4 text-center text-xs text-slate-500">
                Already have an account?{' '}
                <Link to="/login" className="text-brand-600 hover:text-brand-700">
                  Log in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
