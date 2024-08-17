const express = require("express");
const router = express.Router();
const employeePayElement = require("../controllers/EmployeePayElementController");

router
  .route("/")
  .get(employeePayElement.getEmployeePayElements)
  .post(employeePayElement.createEmployeePayElement);

router
  .route("/:payElementId")
  .get(employeePayElement.getEmployeePayElement)
  .delete(employeePayElement.deleteEmployeePayElement)
  .patch(employeePayElement.updateEmployeePayElement);

module.exports = router;
