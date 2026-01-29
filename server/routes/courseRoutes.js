const express = require('express');
const router = express.Router();

const courseController = require('../controllers/courseController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', courseController.listCourses);
router.get('/:courseId', authMiddleware, courseController.getCourse);

module.exports = router;
