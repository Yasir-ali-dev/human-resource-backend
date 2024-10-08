const express = require("express");
const router = express.Router();
const employeePerFormanceCriteria = require("../../controllers/EmployeeControllers/EmployeePerFormanceCriteriaController");

router
  .route("/")
  .get(employeePerFormanceCriteria.getEmployeesPerFormanceCriteria)
  .post(employeePerFormanceCriteria.createEmployeePerFormanceCriteria);

router
  .route("/:performanceCriteriaId")
  .get(employeePerFormanceCriteria.getEmployeePerFormanceCriteriaById)
  .delete(employeePerFormanceCriteria.deleteEmployeePerFormanceCriteriaById)
  .patch(employeePerFormanceCriteria.updateEmployeePerFormanceCriteriaById);

module.exports = router;

// just test that employeePerFormanceCriteria
