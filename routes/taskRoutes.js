const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');

router.get('/getAllTasks', TaskController.getAllTasks);
router.get('/getTaskById/:id', TaskController.getOneTask);
router.post('/createTask', TaskController.createTask);
router.patch('/updateTaskById/:id', TaskController.updateTask);
router.delete('/deleteTaskById/:id', TaskController.deleteTask);

module.exports = router;
