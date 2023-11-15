const express = require('express');
const router = express.Router();

const EscolaController = require('../controllers/SchoolController');

router.get('/getAllEscolas', EscolaController.getAllEscolas);
router.get('/getOneEscola/:cnpj', EscolaController.findEscolaByCnpj);
router.patch('/updateEscola/:cnpj', EscolaController.updateEscolaByCnpj);
router.post('/createEscola', EscolaController.addEscola);
router.delete('/deleteEscola/:cnpj', EscolaController.deleteEscolaByCnpj);

module.exports = router;
