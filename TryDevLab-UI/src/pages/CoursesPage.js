import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import { useAuth } from '../context/AuthContext';
import { getCourses } from '../services/courses';

export default function CoursesPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const data = await getCourses();
        if (!cancelled) setCourses(data.courses || []);
      } catch (e) {
        if (!cancelled) setCourses([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const displayCourses = useMemo(
    () =>
      courses.length
        ? courses
        : [
            { _id: 'demo1', title: 'DBMS - Placement Sheet', description: 'Databases management systems for placements.', level: 'Intermediate', lecturesCount: 24 },
            { _id: 'demo2', title: 'DSA Foundations', description: 'Arrays, strings, recursion and sorting.', level: 'Beginner', lecturesCount: 36 },
            { _id: 'demo3', title: 'System Design Basics', description: 'Learn core patterns and scalability concepts.', level: 'Intermediate', lecturesCount: 18 }
          ],
    [courses]
  );

  function openCourse(course) {
    const id = course._id || course.id || course.slug;
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/courses/${id}` } });
      return;
    }
    navigate(`/courses/${id}`);
  }

  return (
    <div className="bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="text-2xl font-semibold text-slate-900">Courses</div>
        <div className="mt-2 text-sm text-slate-500">Explore curated paths designed to help you learn faster.</div>

        <div className="mt-6">
          {loading ? <div className="text-sm text-slate-500">Loading...</div> : null}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayCourses.map((c) => (
              <CourseCard
                key={c._id}
                title={c.title}
                subtitle={c.description}
                metaLeft={c.level || 'Beginner'}
                metaRight={`${c.lessonsCount || c.lecturesCount || 12} Lessons`}
                onClick={() => openCourse(c)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
