const express = require("express");
const router = express.Router();
const employeeDesignation = require("../controllers/EmployeeDesignationController");

router
  .route("/")
  .get(employeeDesignation.getAllEmployeeDesignations)
  .post(employeeDesignation.createEmployeeDesignation);

router
  .route("/:designationId")
  .get(employeeDesignation.getEmployeeDesignation)
  .delete(employeeDesignation.deleteEmployeeDesignation)
  .patch(employeeDesignation.updateEmployeeDesignation);

module.exports = router;
