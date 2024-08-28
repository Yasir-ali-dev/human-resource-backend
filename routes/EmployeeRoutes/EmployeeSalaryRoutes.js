const express = require("express");
const router = express.Router();
const employeeSalaries = require("../../controllers/EmployeeControllers/EmployeeSalaryController");

router
  .route("/")
  .get(employeeSalaries.getAllEmployeeSalaries)
  .post(employeeSalaries.createEmployeeSalary);

router
  .route("/:employeeSalaryId")
  .get(employeeSalaries.getEmployeeSalary)
  .delete(employeeSalaries.deleteEmployeeSalary)
  .patch(employeeSalaries.updateEmployeeSalary);

module.exports = router;
