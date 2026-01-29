const mongoose = require('mongoose');

const CourseLectureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    duration: { type: String, default: '' }
  },
  { _id: false }
);

const CourseSectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, default: '' }
  },
  { _id: false }
);

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    level: { type: String, default: 'Beginner' },
    playlistUrl: { type: String, default: '' },
    relatedTopics: { type: [String], default: [] },
    sections: { type: [CourseSectionSchema], default: [] },
    lectures: { type: [CourseLectureSchema], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', CourseSchema);
