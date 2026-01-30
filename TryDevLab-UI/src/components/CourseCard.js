import React from 'react';
import { motion } from 'framer-motion';

export default function CourseCard({ title, subtitle, metaLeft, metaRight, onClick,image }) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      onClick={onClick}
      className="text-left bg-white border border-slate-200 rounded-xl shadow-card overflow-hidden hover:border-slate-300 transition-colors"
      type="button"
    >
      <div className="h-56 bg-[#E8E8E8]">
        <img src={image} alt={title}></img>
      </div>
      <div className="p-5 bg-[#E8E8E8] h-44">
        <div className="text-sm font-semibold text-slate-900">{title}</div>
        <div className="mt-1 text-xs text-slate-500 line-clamp-2">{subtitle}</div>
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-brand-500" />
            <span>{metaLeft}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-slate-300" />
            <span>{metaRight}</span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
