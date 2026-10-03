const express = require('express');
const router = express.Router();
// const path = require('path');
const employeeController = require('../../controllers/employeesController.js');
const verifyJWT = require('../../middleware/verifyJWT');


router.route('/')
    .get(verifyJWT, employeeController.getAllEmployees)
    .post(employeeController.createNewEmployee)
    .put(employeeController.updateEmployee)
    .delete(employeeController.DeleteEmployee);

router.route('/:id')
    .get(employeeController.getEmployee);

module.exports = router;