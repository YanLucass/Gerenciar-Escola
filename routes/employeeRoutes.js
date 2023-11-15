const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/EmployeeController');

router.get('/getAllEmployees', EmployeeController.getAllEmployees);
router.get('/getEmployeeByCpf/:cpf', EmployeeController.findEmployeeByCpf);
router.patch('/updateEmployeeByCpf/:cpf', EmployeeController.updateEmployeeByCpf);
router.post('/createEmployee', EmployeeController.addEmployee);
router.delete('/deleteEmployeeByCpf/:cpf', EmployeeController.deleteEmployeeByCpf);

module.exports = router;
