const { default: mongoose } = require("mongoose");

const employeeDesignationSchema = mongoose.Schema({
  designation: {
    lowercase: true,
    type: String,
    trim: true,
    required: [true, "employee type is required"],
  },
});

module.exports = {
  employeeDesignationSchema,
  EmployeeDesignation: mongoose.model(
    "EmployeeDesignation",
    employeeDesignationSchema
  ),
};
