const { default: mongoose } = require("mongoose");
const { v4: uuid } = require("uuid");
const { randomUUID } = require("crypto");

const employeePerformanceEvaluationSchema = mongoose.Schema({
  transactionNumber: {
    type: String,
    default: () => randomUUID().toString(),
  },
  transactionDate: {
    type: Date,
    default: new Date(),
  },
  supervisor: {
    type: String,
  },
  totalScore: {
    type: Number,
    min: 0,
  },
  obtainScore: {
    type: Number,
    min: 0,
  },
  percentage: {
    type: Number,
    min: 0,
  },
  supervisor: {
    type: String,
  },
  employeeInfo: {
    type: String,
    ref: "EmployeeInfo",
  },
});

// should be redesigned
employeePerformanceEvaluationSchema.post("findOneAndDelete", async (doc) => {
  if (doc) {
    await mongoose
      .model("EmployeeInfo")
      .updateOne(
        { username: doc.employeeInfo },
        { $pull: { employeePerformanceEvaluation: doc._id } }
      );
  }
});

//
module.exports = mongoose.model(
  "EmployeePerformanceEvaluation",
  employeePerformanceEvaluationSchema
);
