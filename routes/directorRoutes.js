const express = require('express');
const router = express.Router();
const DirectorController = require('../controllers/DirectorController');

router.post('/createDirector', DirectorController.createDirector);
router.get('/getAllDirectors', DirectorController.getAllDirectors);
router.get('/getDirectorByCpf/:cpf', DirectorController.getOneDirector);
router.patch('/updateDirectorByCpf/:cpf', DirectorController.updateDirector);
router.delete('/deleteDirectorByCpf/:cpf', DirectorController.deleteDirector);

module.exports = router;
