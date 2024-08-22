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

employeeSalarySchema.post("findOneAndDelete", async (doc) => {
  if (doc) {
    await mongoose
      .model("EmployeeInfo")
      .updateOne(
        { _id: doc.employeeInfo },
        { $pull: { employeeSalary: doc.id } }
      );
  }
});

module.exports = mongoose.model("EmployeeSalary", employeeSalarySchema);

/* employee salary should be corrected tested*/
