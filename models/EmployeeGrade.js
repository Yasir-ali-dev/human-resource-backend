const { default: mongoose } = require("mongoose");

const employeeGradeSchema = mongoose.Schema({
  employee_grade: {
    type: String,
    required: [true, "employee grade is required"],
    lowercase: true,
    trim: true,
    enum: ["high-level", "middle-level", "low-level"],
  },
  designation: {
    lowercase: true,
    type: String,
    trim: true,
    required: [true, "employee type is required"],
  },
});
module.exports = mongoose.model("EmployeeGrade", employeeGradeSchema);

/* employee grade should be corrected*/
