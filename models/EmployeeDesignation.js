const { default: mongoose } = require("mongoose");

const employeeDesignationSchema = mongoose.Schema({
  designation: {
    lowercase: true,
    type: String,
    trim: true,
    required: [true, "employee type is required"],
  },
});
module.exports = mongoose.model(
  "EmployeeDesignation",
  employeeDesignationSchema
);

/* employee grade should be corrected*/
