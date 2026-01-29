const axios = require('axios');

const config = require('../config');
const Problem = require('../models/Problem');
const Submission = require('../models/Submission');

function normalizeOutput(value) {
  return String(value || '').replace(/\r\n/g, '\n').trim();
}

function judge0Headers() {
  if (config.judge0.apiKey) {
    const headers = { 'X-RapidAPI-Key': config.judge0.apiKey };
    if (config.judge0.apiHost) headers['X-RapidAPI-Host'] = config.judge0.apiHost;
    return headers;
  }
  return {};
}

async function runOnJudge0({ sourceCode, languageId, stdin }) {
  const url = `${config.judge0.apiUrl.replace(/\/$/, '')}/submissions?base64_encoded=false&wait=true`;
  const { data } = await axios.post(
    url,
    {
      source_code: sourceCode,
      language_id: languageId,
      stdin: stdin || ''
    },
    { headers: judge0Headers(), timeout: 60000 }
  );
  return data;
}

function extractStdout(j0) {
  if (j0.compile_output) return j0.compile_output;
  if (j0.stderr) return j0.stderr;
  return j0.stdout || '';
}

exports.run = async function run(req, res, next) {
  try {
    const { problemId, sourceCode, languageId, language } = req.body;

    if (!problemId || !sourceCode || !languageId || !language) {
      return res.status(400).json({ message: 'problemId, sourceCode, languageId and language are required.' });
    }

    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found.' });
    }

    const test = (problem.sampleTests && problem.sampleTests[0]) || (problem.hiddenTests && problem.hiddenTests[0]) || null;
    const stdin = test ? test.input : '';

    const j0 = await runOnJudge0({ sourceCode, languageId, stdin });
    const output = extractStdout(j0);

    let verdict = 'Ran';
    if (test && test.expectedOutput) {
      verdict = normalizeOutput(output) === normalizeOutput(test.expectedOutput) ? 'Sample Passed' : 'Sample Failed';
    }

    return res.json({ verdict, output });
  } catch (e) {
    return next(e);
  }
};

exports.submit = async function submit(req, res, next) {
  try {
    const { problemId, sourceCode, languageId, language } = req.body;

    if (!problemId || !sourceCode || !languageId || !language) {
      return res.status(400).json({ message: 'problemId, sourceCode, languageId and language are required.' });
    }

    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found.' });
    }

    const tests = (problem.hiddenTests && problem.hiddenTests.length ? problem.hiddenTests : problem.sampleTests) || [];
    if (!tests.length) {
      return res.status(400).json({ message: 'No test cases configured for this problem.' });
    }

    let verdict = 'Accepted';
    let lastOutput = '';

    for (const t of tests) {
      const j0 = await runOnJudge0({ sourceCode, languageId, stdin: t.input });
      lastOutput = extractStdout(j0);

      const out = normalizeOutput(lastOutput);
      const exp = normalizeOutput(t.expectedOutput);
      if (exp && out !== exp) {
        verdict = 'Wrong Answer';
        break;
      }
      if (j0.status && j0.status.description && /error/i.test(j0.status.description)) {
        verdict = j0.status.description;
        break;
      }
    }

    await Submission.create({
      user: req.user.id,
      problem: problem._id,
      language,
      languageId,
      sourceCode,
      verdict,
      output: lastOutput
    });

    return res.json({ verdict, output: lastOutput });
  } catch (e) {
    return next(e);
  }
};
