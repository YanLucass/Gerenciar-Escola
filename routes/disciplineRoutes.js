const express = require('express');
const router = express.Router();
const DisciplineController = require('../controllers/DisciplineController');

router.post('/createDiscipline', DisciplineController.createDiscipline);
router.get('/getAllDisciplines', DisciplineController.getAllDisciplines);
router.get('/getDisciplineById/:id', DisciplineController.getOneDiscipline);
router.patch('/updateDisciplineById/:id', DisciplineController.updateDiscipline);
router.delete('/deleteDisciplineById/:id', DisciplineController.deleteDiscipline);

module.exports = router;
