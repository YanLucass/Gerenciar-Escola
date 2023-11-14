const express = require('express');
const router = express.Router();

const TeacherController = require('../controllers/TeacherController');

router.get('/getAllTeachers', TeacherController.getAllTeachers);
router.get('/getOneTeacher/:id', TeacherController.findTeacherById);
router.post('/createTeacher', TeacherController.createTeacher);

module.exports = router