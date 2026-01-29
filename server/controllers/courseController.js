const Course = require('../models/Course');

exports.listCourses = async function listCourses(req, res, next) {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    const normalized = courses.map((c) => ({
      _id: c._id,
      title: c.title,
      description: c.description,
      level: c.level,
      lessonsCount: (c.lectures || []).length
    }));
    return res.json({ courses: normalized });
  } catch (e) {
    return next(e);
  }
};

exports.getCourse = async function getCourse(req, res, next) {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    return res.json({
      course: {
        _id: course._id,
        title: course.title,
        description: course.description,
        level: course.level,
        playlistUrl: course.playlistUrl,
        relatedTopics: course.relatedTopics,
        sections: course.sections,
        lectures: (course.lectures || []).map((l, idx) => ({
          title: l.title,
          duration: l.duration,
          status: idx === 0 ? 'completed' : idx === 1 ? 'in_progress' : 'locked'
        })),
        progress: 65
      }
    });
  } catch (e) {
    return next(e);
  }
};
