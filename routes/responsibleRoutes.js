const express = require('express');
const router = express.Router();
const ResponsibleController = require('../controllers/ResponsibleController');


router.post('/responsibles', ResponsibleController.createResponsible);
router.get('/responsibles', ResponsibleController.getAllResponsibles);
router.get('/responsibles/:cpf', ResponsibleController.getOneResponsible);
router.put('/responsibles/:cpf', ResponsibleController.updateResponsible);
router.delete('/responsibles/:cpf', ResponsibleController.deleteResponsible);

module.exports = router;
