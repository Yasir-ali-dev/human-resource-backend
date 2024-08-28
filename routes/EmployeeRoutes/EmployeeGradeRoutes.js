const express = require("express");
const router = express.Router();
const employeeGrade = require("../../controllers/EmployeeControllers/EmployeeGradeController");
router
  .route("/")
  .get(employeeGrade.getAllEmployeeGrades)
  .post(employeeGrade.createEmployeeGrade);

router
  .route("/:employeeGradeId")
  .get(employeeGrade.getEmployeeGrade)
  .delete(employeeGrade.deleteEmployeeGrade)
  .patch(employeeGrade.updateEmployeeGrade);
module.exports = router;
