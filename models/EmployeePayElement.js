const { default: mongoose } = require("mongoose");

const employeePayElementSchema = mongoose.Schema({
  element_type: {
    type: String,
    required: [true, "element type is required"],
    lowercase: true,
    trim: true,
  },
  processing_type: {
    lowercase: true,
    type: String,
    enum: ["non recurring", "recurring"],
    default: "non recurring",
  },
  entry_type: {
    type: String,
    lowercase: true,
    default: "normal",
    enum: ["normal", "override", "additional"],
  },
  start_date: {
    type: Date,
    required: [true, "start date is required"],
  },
  end_date: {
    type: Date,
    required: [true, "end date is required"],
  },
});
module.exports = mongoose.model("EmployeePayElement", employeePayElementSchema);
