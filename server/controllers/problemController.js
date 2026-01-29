const Problem = require('../models/Problem');

exports.listProblems = async function listProblems(req, res, next) {
  try {
    const problems = await Problem.find().sort({ createdAt: -1 });
    const normalized = problems.map((p) => ({
      _id: p._id,
      title: p.title,
      shortDescription: p.shortDescription,
      difficulty: p.difficulty,
      tags: p.tags
    }));
    return res.json({ problems: normalized });
  } catch (e) {
    return next(e);
  }
};

exports.getProblem = async function getProblem(req, res, next) {
  try {
    const problem = await Problem.findById(req.params.problemId);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found.' });
    }

    return res.json({
      problem: {
        _id: problem._id,
        title: problem.title,
        shortDescription: problem.shortDescription,
        description: problem.description,
        difficulty: problem.difficulty,
        tags: problem.tags,
        constraints: problem.constraints,
        input: problem.input,
        output: problem.output,
        samples: (problem.samples || []).map((s) => ({ input: s.input, output: s.output }))
      }
    });
  } catch (e) {
    return next(e);
  }
};
