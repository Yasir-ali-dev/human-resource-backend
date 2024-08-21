const { default: mongoose } = require("mongoose");

const employeePerformanceCriteriaSchema = mongoose.Schema({
  type: {
    type: String,
    required: [true, "performance criteria type is required"],
    lowercase: true,
    enum: ["prohibition period", "annual evaluation"],
  },
  name: {
    type: String,
    lowercase: true,
    trim: true,
    required: [true, "performance criteria name is required"],
  },
  criteria: {
    type: String,
    lowercase: true,
    trim: true,
  },
  total: {
    type: Number,
    min: 0,
    max: 10,
  },
  is_group: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model(
  "EmployeePerformanceCriteria",
  employeePerformanceCriteriaSchema
);
module.exports = { employeePerformanceCriteriaSchema };
