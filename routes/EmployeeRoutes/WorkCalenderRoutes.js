const express = require("express");
const router = express.Router();
const workCalender = require("../../controllers/EmployeeControllers/WorkCalenderController");

router
  .route("/")
  .get(workCalender.getWorkCalender)
  .post(workCalender.createWorkCalenderInstance);
router
  .route("/:workCalenderId")
  .get(workCalender.getWorkCalenderInstance)
  .delete(workCalender.deleteWorkCalenderInstance)
  .patch(workCalender.updateWorkCalenderIntance);

module.exports = router;
