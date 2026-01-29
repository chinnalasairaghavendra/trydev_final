import React, { useMemo, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function LogoMark() {
  return (
    <div className="w-7 h-7 rounded-md bg-brand-600 flex items-center justify-center">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 18l-6-6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { to: '/courses', label: 'Courses' },
      { to: '/practice', label: 'Practice' },
      { to: '/mentorship', label: 'Mentorship' },
      { to: '/pricing', label: 'Pricing' }
    ],
    []
  );

  const initial = (user?.username || user?.name || user?.email || 'U').slice(0, 1).toUpperCase();

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <LogoMark />
          <span className="font-semibold text-slate-900">CodeFlow</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm text-slate-500">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn('hover:text-slate-800 transition-colors', isActive ? 'text-slate-900 font-medium' : '')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => navigate('/login')}
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="h-9 px-4 rounded-md bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <button className="hidden sm:inline-flex w-9 h-9 items-center justify-center rounded-full hover:bg-slate-100 transition-colors" aria-label="Notifications">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13.73 21a2 2 0 01-3.46 0" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="relative">
                <button
                  onClick={() => setOpen((v) => !v)}
                  className="flex items-center gap-2"
                >
                  <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-sm font-semibold text-slate-700">
                    {initial}
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-sm text-slate-700">
                    <span className="max-w-[140px] truncate">{user?.username || user?.name || 'Account'}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9l6 6 6-6" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>

                {open ? (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-card overflow-hidden"
                    onMouseLeave={() => setOpen(false)}
                  >
                    <button
                      onClick={() => {
                        setOpen(false);
                        logout();
                        navigate('/');
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Log out
                    </button>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
