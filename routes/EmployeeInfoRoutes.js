const express = require("express");
const router = express.Router();
const getEmployeesInfo = require("../controllers/EmployeeInfoController");

router
  .route("/")
  .get(getEmployeesInfo.getAllEmployeesInfo)
  .post(getEmployeesInfo.createEmployeeInfo);
router
  .route("/:employeeId")
  .get(getEmployeesInfo.getEmployeeInfo)
  .delete(getEmployeesInfo.deleteEmployeeInfo)
  .patch(getEmployeesInfo.updateEmployeeInfo);

router.route("/id/:employeeId").get(getEmployeesInfo.getEmployeeByEmployeeId);

router.route("/username/:username").get(getEmployeesInfo.getEmployeeByUsername);

module.exports = router;
