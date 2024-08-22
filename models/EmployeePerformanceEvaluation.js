const { default: mongoose } = require("mongoose");
const { v4: uuid } = require("uuid");

const employeePerformanceEvaluationSchema = mongoose.Schema({
  transactionNumber: {
    type: String,
    default: uuid,
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
  employeeInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EmployeeInfo",
  },
});

// should be redesigned
employeePerformanceEvaluationSchema.post("findOneAndDelete", async (doc) => {
  if (doc) {
    await mongoose
      .model("EmployeeInfo")
      .updateOne(
        { _id: doc.employeeInfo },
        { $pull: { employeePerformanceEvaluation: doc.id } }
      );
  }
});

//
module.exports = mongoose.model(
  "EmployeePerformanceEvaluation",
  employeePerformanceEvaluationSchema
);
