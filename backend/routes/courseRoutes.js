const express = require('express');
const router = express.Router();
const { getCourses, createCourse, updateCourse, deleteCourse } = require('../controllers/courseController');

// CRUD routes for courses
router.get('/', getCourses);
router.post('/', createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;

