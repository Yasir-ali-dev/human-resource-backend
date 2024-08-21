const express = require("express");
const router = express.Router();
const employeeJobs = require("../controllers/EmployeeJobController");

router
  .route("/")
  .get(employeeJobs.getAllEmployeeJobs)
  .post(employeeJobs.createEmployeeJob);

router
  .route("/:jobId")
  .get(employeeJobs.getEmployeeJob)
  .delete(employeeJobs.deleteEmployeeJob)
  .patch(employeeJobs.updateEmployeeJob);

module.exports = router;
