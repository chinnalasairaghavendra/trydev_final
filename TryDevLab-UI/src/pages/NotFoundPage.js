import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="bg-white border border-slate-200 rounded-xl shadow-card p-10 text-center">
        <div className="text-3xl font-semibold text-slate-900">Page not found</div>
        <div className="mt-2 text-sm text-slate-500">The page you’re looking for doesn’t exist.</div>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center h-10 px-5 rounded-md bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
