const express = require("express");
const router = express.Router();
const employeeType = require("../controllers/EmployeeTypeController");

router
  .route("/")
  .get(employeeType.getAllEmployeeTypes)
  .post(employeeType.createEmployeeType);

router
  .route("/:employeeTypeId")
  .get(employeeType.getEmployeeType)
  .delete(employeeType.deleteEmployeeType)
  .patch(employeeType.updateEmployeeType);

module.exports = router;
