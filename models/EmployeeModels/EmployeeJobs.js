const { default: mongoose } = require("mongoose");

const employeeJobsSchema = mongoose.Schema({
  job: {
    type: String,
    required: [true, "employee job is required"],
    lowercase: true,
    trim: true,
  },
  description: {
    lowercase: true,
    type: String,
    trim: true,
  },
});

module.exports = {
  employeeJobsSchema,
  EmployeeJobs: mongoose.model("EmployeeJobs", employeeJobsSchema),
};
