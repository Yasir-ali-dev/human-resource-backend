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
  employeeInfo: {
    type: String,
    ref: "EmployeeInfo",
  },
});

employeeSalarySchema.post("findOneAndDelete", async (doc) => {
  if (doc) {
    try {
      await mongoose
        .model("EmployeeInfo")
        .updateOne(
          { username: doc.employeeInfo },
          { $pull: { employeeSalary: doc._id } }
        );
    } catch (error) {
      console.error(error.message);
    }
  }
});
module.exports = mongoose.model("EmployeeSalary", employeeSalarySchema);
