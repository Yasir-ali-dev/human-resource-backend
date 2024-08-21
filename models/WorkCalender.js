const { default: mongoose } = require("mongoose");

const workCalenderSchema = mongoose.Schema({
  work_calender: {
    type: String,
    required: [true, "work calender is required"],
    lowercase: true,
    trim: true,
  },
  work_hours_per_day: {
    type: Number,
    default: 8,
    min: [0, "work_hours_per_day should be greater than or eqaul 0"],
    max: [24, "work_hours_per_day should be less than or eqaul 24"],
  },
  days_per_week: {
    type: Number,
    default: 5,
    min: [0, "days_per_week should be greater than or eqaul 0"],
    max: [7, "work_hours_per_day should be less than or eqaul 7"],
  },
});

module.exports = {
  workCalenderSchema,
  WorkCalender: mongoose.model("WorkCalender", workCalenderSchema),
};
