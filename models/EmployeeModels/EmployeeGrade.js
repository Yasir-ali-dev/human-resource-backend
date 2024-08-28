const { default: mongoose } = require("mongoose");

const employeeGradeSchema = mongoose.Schema({
  employee_grade: {
    type: String,
    required: [true, "employee grade is required"],
    lowercase: true,
    trim: true,
    enum: ["high-level", "middle-level", "low-level"],
  },
  // descrition of employee grade
  description: {
    lowercase: true,
    type: String,
    trim: true,
  },
});

module.exports = {
  employeeGradeSchema,
  EmployeeGrade: mongoose.model("EmployeeGrade", employeeGradeSchema),
};
/* employee grade should be corrected*/
