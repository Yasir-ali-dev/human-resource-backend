const { default: mongoose } = require("mongoose");

const employeeSalarySchema = mongoose.Schema({
  lastIncrementId: {
    type: mongoose.Types.ObjectId,
  },
  effectiveFromDate: {
    type: Date,
  },
  creationDate: {
    type: Date,
    default: new Date(),
  },
  currentSalary: {
    type: Number,
  },
  newSalary: {
    type: Number,
  },
  changeAmount: {
    type: Number,
  },
  changePercentage: {
    type: Number,
  },
  employeeInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EmployeeInfo",
  },
});
module.exports = mongoose.model("EmployeeSalary", employeeSalarySchema);

/* employee salary should be corrected tested*/
