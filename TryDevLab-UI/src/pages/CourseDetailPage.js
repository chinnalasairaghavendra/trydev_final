import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCourseById } from '../services/courses';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function safeJsonParse(value) {
  try {
    return JSON.parse(value);
  } catch (e) {
    return null;
  }
}

function Breadcrumb() {
  return (
    <div className="text-xs text-slate-500">
      <Link to="/" className="hover:text-slate-700">
        Home
      </Link>
      <span className="px-1">&gt;</span>
      <span className="text-slate-500">Core Subjects</span>
      <span className="px-1">&gt;</span>
      <span className="text-slate-700">DBMS Placement Sheet</span>
    </div>
  );
}

function Tag({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'h-7 px-3 rounded-full text-xs border transition-colors',
        active ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
      )}
    >
      {children}
    </button>
  );
}

function IconLink({ href, title, children }) {
  return (
    <a
      href={href || '#'}
      target={href ? '_blank' : undefined}
      rel={href ? 'noreferrer' : undefined}
      title={title}
      className="inline-flex w-8 h-8 items-center justify-center rounded-md hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors"
      onClick={(e) => {
        if (!href) e.preventDefault();
      }}
    >
      {children}
    </a>
  );
}

function ProgressBar({ value }) {
  const safe = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div className="mt-3 h-2 rounded-full bg-slate-100 overflow-hidden">
      <div className="h-full bg-brand-600" style={{ width: `${safe}%` }} />
    </div>
  );
}

function Accordion({ title, isOpen, onToggle, children }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <button type="button" onClick={onToggle} className="w-full px-5 py-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-900">{title}</span>
        <span className="text-slate-500">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d={isOpen ? 'M18 15l-6-6-6 6' : 'M6 9l6 6 6-6'}
              stroke="#64748b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      {isOpen ? <div className="border-t border-slate-200">{children}</div> : null}
    </div>
  );
}

function buildDefaultContent() {
  return {
    DBMS: {
      sections: [
        {
          title: 'Intro to DBMS',
          rows: [
            {
              id: 'dbms-1',
              question: 'What is DBMS? Explain advantages over file system.',
              youtube: 'https://www.youtube.com/',
              code: '',
              article: 'https://www.geeksforgeeks.org/',
              company: 'Amazon'
            },
            {
              id: 'dbms-2',
              question: 'Keys in DBMS (Primary, Candidate, Super, Foreign).',
              youtube: 'https://www.youtube.com/',
              code: '',
              article: 'https://www.geeksforgeeks.org/',
              company: 'Microsoft'
            }
          ]
        },
        {
          title: 'ER and Relational Model',
          rows: [
            {
              id: 'dbms-3',
              question: 'ER model: entities, attributes, relationships.',
              youtube: 'https://www.youtube.com/',
              code: '',
              article: 'https://www.geeksforgeeks.org/',
              company: 'Google'
            }
          ]
        },
        {
          title: 'SQL for Interviews',
          rows: [
            {
              id: 'dbms-4',
              question: 'Write SQL to find the second highest salary.',
              youtube: 'https://www.youtube.com/',
              code: 'https://leetcode.com/',
              article: 'https://www.geeksforgeeks.org/',
              company: 'Uber'
            }
          ]
        },
        {
          title: 'Transactions and Concurrency Control',
          rows: [
            {
              id: 'dbms-5',
              question: 'ACID properties and isolation levels.',
              youtube: 'https://www.youtube.com/',
              code: '',
              article: 'https://www.geeksforgeeks.org/',
              company: 'Flipkart'
            }
          ]
        }
      ]
    },
    'Computer Networks': {
      sections: [
        {
          title: 'Networking Basics',
          rows: [
            {
              id: 'cn-1',
              question: 'OSI model vs TCP/IP model',
              youtube: 'https://www.youtube.com/',
              code: '',
              article: 'https://www.geeksforgeeks.org/',
              company: 'Cisco'
            }
          ]
        }
      ]
    },
    OOPS: {
      sections: [
        {
          title: 'Core OOP Concepts',
          rows: [
            {
              id: 'oops-1',
              question: 'Encapsulation, Inheritance, Polymorphism, Abstraction',
              youtube: 'https://www.youtube.com/',
              code: '',
              article: 'https://www.geeksforgeeks.org/',
              company: 'TCS'
            }
          ]
        }
      ]
    },
    'Operating System': {
      sections: [
        {
          title: 'OS Fundamentals',
          rows: [
            {
              id: 'os-1',
              question: 'Process vs Thread, Context Switching',
              youtube: 'https://www.youtube.com/',
              code: '',
              article: 'https://www.geeksforgeeks.org/',
              company: 'Infosys'
            }
          ]
        }
      ]
    },
    'Web Development': {
      sections: [
        {
          title: 'Web Basics',
          rows: [
            {
              id: 'web-1',
              question: 'HTTP methods and status codes',
              youtube: 'https://www.youtube.com/',
              code: '',
              article: 'https://developer.mozilla.org/',
              company: 'Startups'
            }
          ]
        }
      ]
    }
  };
}

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openIdx, setOpenIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('DBMS');
  const [bookmarked, setBookmarked] = useState(false);
  const [activeTopic, setActiveTopic] = useState('');
  const [completedMap, setCompletedMap] = useState({});

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const data = await getCourseById(courseId);
        if (!cancelled) setCourse(data.course);
      } catch (e) {
        if (!cancelled) setCourse(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [courseId]);

  useEffect(() => {
    const b = localStorage.getItem(`course_bookmark_${courseId}`);
    setBookmarked(b === '1');

    const saved = safeJsonParse(localStorage.getItem(`course_progress_${courseId}_${activeTab}`));
    setCompletedMap(saved && typeof saved === 'object' ? saved : {});
  }, [courseId, activeTab]);

  useEffect(() => {
    localStorage.setItem(`course_bookmark_${courseId}`, bookmarked ? '1' : '0');
  }, [bookmarked, courseId]);

  useEffect(() => {
    localStorage.setItem(`course_progress_${courseId}_${activeTab}`, JSON.stringify(completedMap));
  }, [completedMap, courseId, activeTab]);

  const fallback = useMemo(
    () => ({
      title: 'DBMS - Placement Sheet',
      description:
        'Database Management Systems (DBMS) is a core subject for placements. This sheet contains curated topics, resources, and structured practice to help you master DBMS efficiently.',
      playlistUrl: 'https://www.youtube.com/',
      curator: 'CodeFlow',
      relatedTopics: ['SQL', 'Normalization', 'Transactions', 'Indexing'],
      lectures: []
    }),
    []
  );

  const c = course || fallback;

  const tabs = useMemo(
    () => ['DBMS', 'Computer Networks', 'OOPS', 'Operating System', 'Web Development'],
    []
  );

  const contentByTab = useMemo(() => buildDefaultContent(), []);
  const activeContent = contentByTab[activeTab] || contentByTab.DBMS;

  const allRowIds = useMemo(() => {
    const ids = [];
    (activeContent.sections || []).forEach((s) => (s.rows || []).forEach((r) => ids.push(r.id)));
    return ids;
  }, [activeContent]);

  const progress = useMemo(() => {
    const total = allRowIds.length;
    if (!total) return 0;
    const completed = allRowIds.reduce((acc, id) => acc + (completedMap[id] ? 1 : 0), 0);
    return Math.round((completed / total) * 100);
  }, [allRowIds, completedMap]);

  const displayTitle = useMemo(() => {
    const raw = (c && c.title ? String(c.title) : 'DBMS - Placement Sheet').trim();
    const normalized = raw.replace(' - ', ' – ');
    if (normalized.includes('🔥')) return normalized;
    if (normalized.toLowerCase().includes('placement sheet')) return `${normalized} 🔥`;
    return normalized;
  }, [c]);

  async function onShare() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: c.title, url });
        return;
      }
    } catch (e) {
      // ignore
    }

    try {
      await navigator.clipboard.writeText(url);
    } catch (e) {
      // ignore
    }
  }

  return (
    <div className="bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="mt-2 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-200 rounded-xl shadow-card p-6">
              <Breadcrumb />

              <div className="mt-4 text-2xl sm:text-3xl font-semibold text-slate-900">
                {displayTitle}
              </div>
              <div className="mt-1 text-sm text-slate-500">Database Management Systems (DBMS) for Placements • Study Sheet</div>
              <div className="mt-2 text-sm text-slate-600 leading-6">{c.description}</div>
              <div className="mt-3 text-xs text-slate-500">
                Curated by <span className="text-slate-700">{c.curator || 'CodeFlow'}</span>
              </div>

              <div className="mt-6 border border-slate-200 rounded-lg p-4 bg-slate-50">
                <button
                  type="button"
                  onClick={() => window.open(c.playlistUrl, '_blank', 'noreferrer')}
                  className="inline-flex items-center justify-center h-10 px-4 rounded-md bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors"
                >
                  Explore the Complete Playlist
                </button>
                <div className="mt-2 text-xs text-slate-500">
                  <a href={c.playlistUrl} target="_blank" rel="noreferrer" className="text-brand-700 hover:text-brand-800">
                    {c.playlistUrl}
                  </a>
                </div>
              </div>

              <div className="mt-4 border border-amber-200 bg-amber-50 rounded-lg p-4">
                <div className="text-sm font-semibold text-slate-900">Support the creators</div>
                <div className="mt-1 text-sm text-slate-600 leading-6">
                  If you find the resources helpful, don’t forget to like, share, and subscribe to the channel to support creators.
                </div>
              </div>

              <div className="mt-7 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
                <div className="flex flex-wrap gap-2 px-3 py-3">
                  {tabs.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setActiveTab(t);
                        setOpenIdx(0);
                      }}
                      className={cn(
                        'h-10 px-4 rounded-md text-sm font-medium transition-colors',
                        activeTab === t
                          ? 'bg-brand-600 text-white'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {(activeContent.sections || []).map((section, idx) => (
                  <Accordion
                    key={section.title}
                    title={section.title}
                    isOpen={openIdx === idx}
                    onToggle={() => setOpenIdx((v) => (v === idx ? -1 : idx))}
                  >
                    <div className="overflow-x-auto">
                      <div className="min-w-[860px]">
                        <div className="grid grid-cols-12 px-4 py-2 text-xs text-slate-500 bg-slate-50 border-b border-slate-200">
                          <div className="col-span-5">Interview Question</div>
                          <div className="col-span-2 text-center">YouTube</div>
                          <div className="col-span-1 text-center">Code</div>
                          <div className="col-span-2 text-center">Article</div>
                          <div className="col-span-2">Company</div>
                        </div>

                        {(section.rows || []).map((row) => {
                          const done = !!completedMap[row.id];
                          return (
                            <div
                              key={row.id}
                              className="grid grid-cols-12 px-4 py-3 text-sm border-b border-slate-100 last:border-b-0"
                            >
                              <div className="col-span-5">
                                <div className="flex items-start gap-3">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setCompletedMap((m) => {
                                        const next = { ...m };
                                        next[row.id] = !m[row.id];
                                        return next;
                                      })
                                    }
                                    className={cn(
                                      'mt-0.5 w-5 h-5 rounded border flex items-center justify-center',
                                      done ? 'bg-brand-600 border-brand-600' : 'bg-white border-slate-300'
                                    )}
                                    title={done ? 'Mark as pending' : 'Mark as completed'}
                                  >
                                    {done ? (
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                    ) : null}
                                  </button>

                                  <div>
                                    <div className="text-slate-800 leading-6">{row.question}</div>
                                    <div className="mt-1">
                                      <span
                                        className={cn(
                                          'inline-flex items-center h-6 px-2 rounded text-xs border',
                                          done
                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                            : 'bg-slate-50 text-slate-600 border-slate-200'
                                        )}
                                      >
                                        {done ? 'Completed' : 'Pending'}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-span-2 flex justify-center">
                                <IconLink href={row.youtube} title="YouTube">
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 15l5-3-5-3v6z" fill="#ef4444" />
                                    <path
                                      d="M21.6 7.2s-.2-1.4-.8-2c-.8-.8-1.8-.8-2.2-.9C15.4 4 12 4 12 4h0s-3.4 0-6.6.3c-.4.1-1.4.1-2.2.9-.6.6-.8 2-.8 2S2 8.8 2 10.5v1c0 1.7.4 3.3.4 3.3s.2 1.4.8 2c.8.8 1.9.8 2.4.9C7.4 18 12 18 12 18s3.4 0 6.6-.3c.4-.1 1.4-.1 2.2-.9.6-.6.8-2 .8-2s.4-1.6.4-3.3v-1c0-1.7-.4-3.3-.4-3.3Z"
                                      stroke="#ef4444"
                                      strokeWidth="1.4"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </IconLink>
                              </div>

                              <div className="col-span-1 flex justify-center">
                                <IconLink href={row.code} title="Code">
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 18l6-6-6-6" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8 6l-6 6 6 6" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </IconLink>
                              </div>

                              <div className="col-span-2 flex justify-center">
                                <IconLink href={row.article} title="Article">
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" stroke="#0f172a" strokeWidth="2" />
                                    <path d="M8 7h8" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M8 11h8" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M8 15h5" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
                                  </svg>
                                </IconLink>
                              </div>

                              <div className="col-span-2 text-slate-600 flex items-center">{row.company}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Accordion>
                ))}
              </div>

              {loading ? <div className="mt-4 text-xs text-slate-500">Loading course…</div> : null}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-6 space-y-4">
              <div className="bg-white border border-slate-200 rounded-xl shadow-card p-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-900">Your progress</div>
                  <div className="text-xs text-brand-700">{progress}% Complete</div>
                </div>
                <ProgressBar value={progress} />

                <button
                  type="button"
                  onClick={() => setBookmarked((v) => !v)}
                  className={cn(
                    'mt-5 w-full h-10 rounded-md text-sm font-medium transition-colors',
                    bookmarked
                      ? 'bg-slate-900 text-white hover:bg-slate-800'
                      : 'bg-brand-600 text-white hover:bg-brand-700'
                  )}
                >
                  {bookmarked ? 'Bookmarked' : 'Bookmark Sheet'}
                </button>

                <button
                  type="button"
                  onClick={onShare}
                  className="mt-3 w-full h-10 rounded-md border border-slate-200 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Share Resource
                </button>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl shadow-card p-6">
                <div className="text-xs font-semibold text-slate-700 tracking-wider">RELATED TOPICS</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(c.relatedTopics || []).map((t) => (
                    <Tag key={t} active={activeTopic === t} onClick={() => setActiveTopic((v) => (v === t ? '' : t))}>
                      {t}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
