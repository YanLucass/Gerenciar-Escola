const express = require('express');
const router = express.Router();

const StudentController = require('../controllers/StudentController');

router.get('/allStudent', StudentController.getAllStudents);
router.get('/:id', StudentController.getOneStudent);
router.post('/createStudent', StudentController.createStudent);
router.patch('/update/:id', StudentController.updateStudent);
router.delete('/deleteStudent/:id', StudentController.deleteStudent);   

module.exports = router