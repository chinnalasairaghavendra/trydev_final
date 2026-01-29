import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProblemById } from '../services/problems';
import { runCode, submitCode } from '../services/submissions';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const LANGUAGE_OPTIONS = [
  { key: 'cpp', label: 'C++', judge0Id: 54 },
  { key: 'java', label: 'Java', judge0Id: 62 },
  { key: 'python', label: 'Python', judge0Id: 71 }
];

function templateFor(langKey) {
  if (langKey === 'java') {
    return 'import java.util.*;\n\npublic class Main {\n  public static void main(String[] args) {\n    // write your code here\n  }\n}\n';
  }
  if (langKey === 'cpp') {
    return '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n  ios::sync_with_stdio(false);\n  cin.tie(nullptr);\n  // write your code here\n  return 0;\n}\n';
  }
  return '# write your code here\n';
}

export default function PracticeWorkspacePage() {
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  const [lang, setLang] = useState('python');
  const [code, setCode] = useState(templateFor('python'));

  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setCode(templateFor(lang));
  }, [lang]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const data = await getProblemById(problemId);
        if (!cancelled) setProblem(data.problem);
      } catch (e) {
        if (!cancelled) setProblem(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [problemId]);

  const fallback = useMemo(
    () => ({
      title: 'Reverse the Stack',
      description:
        'Given a stack [1,2,3,4,5] where 5 is the top, reverse the stack such that [5,4,3,2,1] where 1 is the top.',
      constraints: ['1 <= N <= 10^5'],
      input: 'First line contains N, then N integers representing the stack from bottom to top.',
      output: 'Print the reversed stack from bottom to top.',
      samples: [
        { input: '5\n1 2 3 4 5', output: '5 4 3 2 1' }
      ]
    }),
    []
  );

  const p = problem || fallback;
  const langMeta = LANGUAGE_OPTIONS.find((l) => l.key === lang) || LANGUAGE_OPTIONS[2];

  async function onRun() {
    setError('');
    setResult(null);
    setRunning(true);
    try {
      const payload = {
        problemId,
        language: langMeta.key,
        languageId: langMeta.judge0Id,
        sourceCode: code
      };
      const data = await runCode(payload);
      setResult(data);
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to run code.');
    } finally {
      setRunning(false);
    }
  }

  async function onSubmit() {
    setError('');
    setResult(null);
    setSubmitting(true);
    try {
      const payload = {
        problemId,
        language: langMeta.key,
        languageId: langMeta.judge0Id,
        sourceCode: code
      };
      const data = await submitCode(payload);
      setResult(data);
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to submit code.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[70vh]">
            <div className="lg:col-span-6 border-b lg:border-b-0 lg:border-r border-slate-200 p-6">
              {loading ? <div className="text-sm text-slate-500">Loading...</div> : null}
              <div className="text-xl font-semibold text-slate-900">{p.title}</div>
              <div className="mt-3 text-sm text-slate-600 leading-6">{p.description}</div>

              <div className="mt-6">
                <div className="text-sm font-semibold text-slate-900">Constraints</div>
                <ul className="mt-2 space-y-1 text-sm text-slate-600 list-disc pl-5">
                  {(p.constraints || []).map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-semibold text-slate-900">Input</div>
                  <div className="mt-2 text-sm text-slate-600 whitespace-pre-wrap">{p.input}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">Output</div>
                  <div className="mt-2 text-sm text-slate-600 whitespace-pre-wrap">{p.output}</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-sm font-semibold text-slate-900">Sample test cases</div>
                <div className="mt-3 space-y-3">
                  {(p.samples || []).map((s, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-lg p-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs font-semibold text-slate-700">Input</div>
                          <pre className="mt-1 text-xs bg-slate-50 border border-slate-200 rounded p-2 overflow-auto">{s.input}</pre>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-700">Output</div>
                          <pre className="mt-1 text-xs bg-slate-50 border border-slate-200 rounded p-2 overflow-auto">{s.output}</pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 p-6 flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-sm font-semibold text-slate-900">Code Editor</div>
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="h-9 rounded-md border border-slate-200 px-3 text-sm text-slate-700 bg-white outline-none focus:ring-2 focus:ring-brand-200"
                >
                  {LANGUAGE_OPTIONS.map((o) => (
                    <option key={o.key} value={o.key}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4 flex-1">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full min-h-[280px] font-mono text-xs bg-slate-900 text-slate-100 rounded-lg p-4 outline-none border border-slate-800 focus:ring-2 focus:ring-brand-300"
                  spellCheck={false}
                />
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={onRun}
                  disabled={running || submitting}
                  className={cn(
                    'h-10 px-5 rounded-md text-sm font-medium transition-colors',
                    running || submitting
                      ? 'bg-slate-200 text-slate-500'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  )}
                >
                  {running ? 'Running...' : 'Run'}
                </button>
                <button
                  type="button"
                  onClick={onSubmit}
                  disabled={running || submitting}
                  className={cn(
                    'h-10 px-5 rounded-md text-sm font-medium transition-colors',
                    running || submitting ? 'bg-brand-300 text-white' : 'bg-brand-600 text-white hover:bg-brand-700'
                  )}
                >
                  {submitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>

              {error ? (
                <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</div>
              ) : null}

              <div className="mt-4">
                <div className="text-sm font-semibold text-slate-900">Output</div>
                <div className="mt-2 border border-slate-200 rounded-lg bg-slate-50 p-3 text-sm text-slate-700 min-h-[90px]">
                  {result?.output || result?.stdout || result?.message || 'Run your code to see output here.'}
                </div>
                {result?.verdict ? (
                  <div className="mt-2 text-xs text-slate-500">Verdict: {result.verdict}</div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
