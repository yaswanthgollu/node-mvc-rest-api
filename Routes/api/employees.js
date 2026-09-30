const express = require('express');
const router = express.Router();
// const path = require('path');
const employeeController = require('../../controllers/employeesController.js');


router.route('/')
    .get(employeeController.getAllEmployees)
    .post(employeeController.createNewEmployee)
    .put(employeeController.updateEmployee)
    .delete(employeeController.DeleteEmployee);

router.route('/:id')
    .get(employeeController.getEmployee);

module.exports = router;