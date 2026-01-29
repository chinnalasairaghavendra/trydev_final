import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CourseCard from '../components/CourseCard';
import { getCourses } from '../services/courses';
import { getVideos } from '../services/videos';

function Stat({ value, label }) {
  return (
    <div>
      <div className="text-sm font-semibold text-slate-900">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.15 }} className="bg-white border border-slate-200 rounded-xl shadow-card p-5">
      <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center">
        <div className="w-4 h-4 rounded bg-brand-600" />
      </div>
      <div className="mt-4 text-sm font-semibold text-slate-900">{title}</div>
      <div className="mt-1 text-xs text-slate-500 leading-5">{desc}</div>
    </motion.div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [c, v] = await Promise.all([getCourses(), getVideos()]);
        if (!cancelled) {
          setCourses(c.courses || []);
          setVideos(v.videos || []);
        }
      } catch (e) {
        if (!cancelled) {
          setCourses([]);
          setVideos([]);
        }
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const topCourses = useMemo(() => (courses.length ? courses.slice(0, 3) : []), [courses]);
  const shownVideos = useMemo(
    () =>
      videos.length
        ? videos.slice(0, 6)
        : [
            { title: 'DSA Basics', youtubeId: '8hly31xKli0' },
            { title: 'React Fundamentals', youtubeId: 'bMknfKXIFA8' },
            { title: 'Node.js Crash Course', youtubeId: 'fBNz5xF-Kx4' }
          ],
    [videos]
  );

  return (
    <div className="bg-slate-50">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-4xl sm:text-5xl font-semibold text-slate-900 leading-[1.05]">
              Master coding with
              <br />
              hands-on practice
            </div>
            <p className="mt-4 text-sm text-slate-500 max-w-xl leading-6">
              Build real-world projects, sharpen your problem solving skills, and learn from expert-curated content.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button onClick={() => navigate('/courses')} className="h-10 px-5 rounded-md bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors">
                Start Learning Now
              </button>
              <button onClick={() => navigate('/courses')} className="h-10 px-5 rounded-md border border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                Explore Courses
              </button>
            </div>
            <div className="mt-8 flex items-center gap-10">
              <Stat value="150+" label="Interactive Courses" />
              <Stat value="50k+" label="Active Learners" />
              <Stat value="4.9/5" label="User Rating" />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-card overflow-hidden">
            <div className="h-64 sm:h-80 bg-slate-100 flex items-center justify-center">
              <div className="text-xs text-slate-500">Hero Image</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-100/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center">
            <div className="text-xs tracking-wider text-slate-500">WHAT MAKES CODEFLOW DIFFERENT</div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">The most effective way to learn</div>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            <FeatureCard title="Interactive Environment" desc="Practice in-browser with instant feedback and curated test cases." />
            <FeatureCard title="Project-Based Learning" desc="Build projects that simulate real workflows and strengthen fundamentals." />
            <FeatureCard title="Community & Mentors" desc="Get support when you’re stuck and learn faster with guidance." />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs tracking-wider text-slate-500">POPULAR COURSES</div>
            <div className="mt-2 text-xl font-semibold text-slate-900">Start with a career path</div>
          </div>
          <button onClick={() => navigate('/courses')} className="text-xs text-slate-500 hover:text-slate-700">
            View all courses
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          {(topCourses.length ? topCourses : [{ title: 'Complete Python Bootcamp', description: 'Learn Python from basics to projects.', level: 'Beginner', lecturesCount: 12 }, { title: 'Modern React & Redux', description: 'Build modern UIs with React.', level: 'Intermediate', lecturesCount: 16 }, { title: 'Advanced CSS Layouts', description: 'Master flexbox and grid.', level: 'Beginner', lecturesCount: 10 }]).map((c, idx) => (
            <CourseCard
              key={c._id || c.id || idx}
              title={c.title}
              subtitle={c.description}
              metaLeft={c.level || 'Beginner'}
              metaRight={`${c.lessonsCount || c.lecturesCount || 12} Lessons`}
              onClick={() => navigate('/courses')}
            />
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
        <div className="text-xs tracking-wider text-slate-500">POPULAR VIDEOS</div>
        <div className="mt-2 text-xl font-semibold text-slate-900">Watch and learn</div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {shownVideos.map((v, idx) => (
            <div key={v._id || v.youtubeId || idx} className="bg-white border border-slate-200 rounded-xl shadow-card overflow-hidden">
              <div className="aspect-video bg-slate-100">
                <iframe
                  title={v.title || 'video'}
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${v.youtubeId}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <div className="text-sm font-semibold text-slate-900">{v.title || 'Video'}</div>
                <div className="mt-1 text-xs text-slate-500">{v.channel || 'CodeFlow'}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
        <div className="bg-brand-600 rounded-2xl p-10 text-center text-white">
          <div className="text-2xl font-semibold">Ready to start your coding journey?</div>
          <div className="mt-2 text-sm text-white/80">Join now and start learning with guided courses, practice, and projects.</div>
          <div className="mt-6">
            <button onClick={() => navigate('/register')} className="h-10 px-5 rounded-md bg-white text-slate-900 text-sm font-medium hover:bg-slate-100 transition-colors">
              Get Started for Free
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
