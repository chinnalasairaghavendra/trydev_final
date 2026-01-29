const mongoose = require('mongoose');

const TestCaseSchema = new mongoose.Schema(
  {
    input: { type: String, default: '' },
    expectedOutput: { type: String, default: '' }
  },
  { _id: false }
);

const SampleSchema = new mongoose.Schema(
  {
    input: { type: String, default: '' },
    output: { type: String, default: '' }
  },
  { _id: false }
);

const ProblemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortDescription: { type: String, default: '' },
    description: { type: String, default: '' },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
    tags: { type: [String], default: [] },
    constraints: { type: [String], default: [] },
    input: { type: String, default: '' },
    output: { type: String, default: '' },
    samples: { type: [SampleSchema], default: [] },
    sampleTests: { type: [TestCaseSchema], default: [] },
    hiddenTests: { type: [TestCaseSchema], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Problem', ProblemSchema);
