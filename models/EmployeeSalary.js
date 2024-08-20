const { default: mongoose } = require("mongoose");

const employeeSalarySchema = mongoose.Schema({
  lastIncrementId: {
    type: String,
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
});
module.exports = mongoose.model("EmployeeSalary", employeeSalarySchema);

/* employee grade should be corrected*/
