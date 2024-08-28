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
  employeeInfo: {
    type: String,
    ref: "EmployeeInfo",
  },
});

employeePayElementSchema.post("findOneAndDelete", async (doc) => {
  if (doc) {
    try {
      await mongoose
        .model("EmployeeInfo")
        .updateOne(
          { username: doc.employeeInfo },
          { $pull: { employeePayElement: doc._id } }
        );
    } catch (error) {
      console.error(error);
    }
  }
});

module.exports = mongoose.model("EmployeePayElement", employeePayElementSchema);
