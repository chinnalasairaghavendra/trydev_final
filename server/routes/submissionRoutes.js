const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const submissionController = require('../controllers/submissionController');

router.post('/run', authMiddleware, submissionController.run);
router.post('/submit', authMiddleware, submissionController.submit);

module.exports = router;
