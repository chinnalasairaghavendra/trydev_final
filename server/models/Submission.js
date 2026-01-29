const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
    language: { type: String, required: true },
    languageId: { type: Number, required: true },
    sourceCode: { type: String, required: true },
    verdict: { type: String, default: 'Pending' },
    output: { type: String, default: '' },
    runtime: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Submission', SubmissionSchema);
