const express = require('express');
const router = express.Router();

const TeacherController = require('../controllers/TeacherController');

router.get('/getAllTeachers', TeacherController.getAllTeachers);
router.get('/getOneTeacher/:id', TeacherController.findTeacherById);
router.patch('/updateTeacher/:id', TeacherController.updateTeacher);
router.post('/createTeacher', TeacherController.createTeacher);
router.delete('/deleteTeacher/:id', TeacherController.deleteATeacher);

module.exports = router