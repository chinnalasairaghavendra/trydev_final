import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProblems } from '../services/problems';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Pill({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'h-7 px-3 rounded-full text-xs border transition-colors',
        active
          ? 'bg-brand-600 text-white border-brand-600'
          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
      )}
    >
      {children}
    </button>
  );
}

function TagChip({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'h-7 px-3 rounded-full text-xs border transition-colors',
        active
          ? 'bg-brand-50 text-brand-700 border-brand-200'
          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
      )}
    >
      {children}
    </button>
  );
}

function ProblemCard({ problem, onClick }) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      onClick={onClick}
      className="relative w-full text-left bg-white border border-slate-200 rounded-xl shadow-card overflow-hidden hover:border-slate-300 transition-colors"
    >
      <div className="absolute -right-10 top-6 rotate-45 bg-brand-600 text-white text-[11px] px-10 py-1">Try This</div>
      <div className="p-7">
        <div className="text-lg font-semibold text-slate-900 text-center">{problem.title}</div>
        <div className="mt-2 text-xs text-slate-500 text-center max-w-2xl mx-auto">
          {problem.shortDescription}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {(problem.tags || []).slice(0, 3).map((t) => (
            <span key={t} className="inline-flex items-center h-6 px-2 rounded bg-brand-50 text-brand-700 text-xs">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="text-xs text-slate-500">Difficulty</div>
          <div className="flex items-center gap-2">
            <span className={cn('w-2 h-2 rounded-full', problem.difficulty === 'Hard' ? 'bg-red-500' : problem.difficulty === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500')} />
            <span className="text-xs text-slate-500">{problem.difficulty}</span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export default function PracticePage() {
  const navigate = useNavigate();
  const [difficultyMode, setDifficultyMode] = useState('easy_to_hard');
  const [selectedTags, setSelectedTags] = useState([]);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await getProblems();
        if (!cancelled) setProblems(data.problems || []);
      } catch (e) {
        if (!cancelled) setProblems([]);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const fallbackProblems = useMemo(
    () => [
      {
        _id: 'p1',
        title: 'Reverse the Stack',
        shortDescription: 'Given a stack [1,2,3,4,5] where 5 is the top, reverse the stack such that [5,4,3,2,1] where 1 is the top',
        difficulty: 'Easy',
        tags: ['Stack', 'DSA', 'Easy']
      },
      {
        _id: 'p2',
        title: 'Pre order traversal of binary tree',
        shortDescription: 'Given a binary tree, return an array which has the traversal of the tree, in a preorder manner',
        difficulty: 'Easy',
        tags: ['Binary Tree', 'DSA', 'Easy']
      },
      {
        _id: 'p3',
        title: 'is BST',
        shortDescription: 'Given a binary Tree, find out if the binary tree is a binary search tree or not',
        difficulty: 'Easy',
        tags: ['Binary Search Tree', 'DSA', 'Easy']
      }
    ],
    []
  );

  const allProblems = problems.length ? problems : fallbackProblems;

  const allTags = useMemo(() => {
    const set = new Set();
    allProblems.forEach((p) => (p.tags || []).forEach((t) => set.add(t)));
    return Array.from(set);
  }, [allProblems]);

  const filtered = useMemo(() => {
    const list = allProblems.filter((p) => {
      if (!selectedTags.length) return true;
      const tags = p.tags || [];
      return selectedTags.every((t) => tags.includes(t));
    });

    const order = { Easy: 1, Medium: 2, Hard: 3 };
    const dir = difficultyMode === 'easy_to_hard' ? 1 : -1;
    return [...list].sort((a, b) => (order[a.difficulty] - order[b.difficulty]) * dir);
  }, [allProblems, selectedTags, difficultyMode]);

  function toggleTag(tag) {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  return (
    <div className="bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3">
            <div className="text-sm font-semibold text-slate-900">Difficulty</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Pill active={difficultyMode === 'easy_to_hard'} onClick={() => setDifficultyMode('easy_to_hard')}>
                Easy to Hard
              </Pill>
              <Pill active={difficultyMode === 'hard_to_easy'} onClick={() => setDifficultyMode('hard_to_easy')}>
                Hard to Easy
              </Pill>
            </div>

            <div className="mt-6 text-sm font-semibold text-slate-900">Tags</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {allTags.map((t) => (
                <TagChip key={t} active={selectedTags.includes(t)} onClick={() => toggleTag(t)}>
                  {t}
                </TagChip>
              ))}
              {allTags.length === 0 ? (
                <>
                  <TagChip active={false} onClick={() => toggleTag('Stack')}>Stack</TagChip>
                  <TagChip active={false} onClick={() => toggleTag('DSA')}>DSA</TagChip>
                  <TagChip active={false} onClick={() => toggleTag('Binary Tree')}>Binary Tree</TagChip>
                </>
              ) : null}
            </div>
          </aside>

          <section className="lg:col-span-9">
            <div className="space-y-5">
              {filtered.map((p) => (
                <ProblemCard
                  key={p._id}
                  problem={p}
                  onClick={() => navigate(`/practice/${p._id}`)}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
