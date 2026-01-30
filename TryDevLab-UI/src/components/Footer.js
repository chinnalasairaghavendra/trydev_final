import React from 'react';
import { Link } from 'react-router-dom';

function LogoMark() {
  return (
    <div className="w-7 h-7 rounded-md bg-[#0B99FF] flex items-center justify-center">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 18l-6-6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 font-inter">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="inline-flex items-center gap-2">
              <LogoMark />
              <span className="font-semibold text-slate-900">CodeFlow</span>
            </Link>
            <p className="mt-4 text-sm text-slate-500 leading-6">
              The best platform to learn coding. Interactive lessons, real-world projects, and expert mentorship to help you land your dream job.
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold tracking-wider text-slate-700">PLATFORM</div>
            <div className="mt-4 space-y-2 text-sm text-slate-500">
              <Link className="block hover:text-slate-700" to="/courses">Courses</Link>
              <Link className="block hover:text-slate-700" to="/practice">Practice</Link>
              <Link className="block hover:text-slate-700" to="/pricing">Pricing</Link>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold tracking-wider text-slate-700">RESOURCES</div>
            <div className="mt-4 space-y-2 text-sm text-slate-500">
              <Link className="block hover:text-slate-700" to="/blog">Blog</Link>
              <Link className="block hover:text-slate-700" to="/community">Community</Link>
              <Link className="block hover:text-slate-700" to="/help">Help Center</Link>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold tracking-wider text-slate-700">COMPANY</div>
            <div className="mt-4 space-y-2 text-sm text-slate-500">
              <Link className="block hover:text-slate-700" to="/about">About</Link>
              <Link className="block hover:text-slate-700" to="/careers">Careers</Link>
              <Link className="block hover:text-slate-700" to="/privacy">Privacy</Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
          <div>© {new Date().getFullYear()} CodeFlow Inc. All rights reserved.</div>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="hover:text-slate-700">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-700">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
