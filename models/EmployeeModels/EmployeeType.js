const { default: mongoose } = require("mongoose");

const employeeTypeSchema = mongoose.Schema({
  employeeType: {
    type: String,
    required: [true, "employee type is required"],
    lowercase: true,
    trim: true,
    enum: [
      "full-time",
      "part-time",
      "temporary",
      "seasonal",
      "leased",
      "at-will",
    ],
  },
  department_name: {
    lowercase: true,
    type: String,
    trim: true,
    required: [true, "department name is required"],
  },
  is_active: {
    type: Boolean,
    default: false,
  },
});

module.exports = {
  employeeTypeSchema,
  EmployeeType: mongoose.model("EmployeeType", employeeTypeSchema),
};
