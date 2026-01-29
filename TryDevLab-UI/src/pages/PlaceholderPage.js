import React from 'react';

export default function PlaceholderPage({ title }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="bg-white border border-slate-200 rounded-xl shadow-card p-8">
        <div className="text-2xl font-semibold text-slate-900">{title}</div>
        <div className="mt-2 text-sm text-slate-500">This page is part of the student experience shell.</div>
      </div>
    </div>
  );
}
