const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const problemController = require('../controllers/problemController');

router.get('/', authMiddleware, problemController.listProblems);
router.get('/:problemId', authMiddleware, problemController.getProblem);

module.exports = router;
