const { default: mongoose } = require("mongoose");

const employeeTypeSchema = mongoose.Schema({
  employeeType: {
    type: String,
    required: [true, "employee type is required"],
    enum: [
      "full-time",
      "part-time",
      "temporary",
      "seasonal",
      "leased",
      "at-will",
    ],
  },
  designation: {
    type: String,
    required: [true, "employee type is required"],
  },
  is_active: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("EmployeeType", employeeTypeSchema);
