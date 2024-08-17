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
  },
  days_per_week: {
    type: Number,
    default: 5,
  },
});
module.exports = mongoose.model("WorkCalender", workCalenderSchema);
