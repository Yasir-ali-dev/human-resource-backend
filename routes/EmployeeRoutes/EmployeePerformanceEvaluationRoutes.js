const express = require("express");
const router = express.Router();
const employeePerformanceEvaluation = require("../../controllers/EmployeeControllers/EmployeePerformanceEvaluationController");
router
  .route("/")
  .get(employeePerformanceEvaluation.getAllEmployeePerformanceEvaluations)
  .post(employeePerformanceEvaluation.createEmployeePerformanceEvaluation);

router
  .route("/:evaluationId")
  .get(employeePerformanceEvaluation.getEmployeePerformanceEvaluation)
  .delete(employeePerformanceEvaluation.deleteEmployeePerformanceEvaluation)
  .patch(employeePerformanceEvaluation.updateEmployeePerformanceEvaluation);

module.exports = router;
